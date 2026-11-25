import express from "express";
import Habitante from "../models/Habitantes.js";

const router = express.Router();

const createHabitante = async (req, res) => {
  try {
    const {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      edad,
      fechaExpDocumento,
      autorizacionHabeasData,
    } = req.body;
    const habitante = new Habitante({
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      edad,
      fechaExpDocumento,
      autorizacionHabeasData: autorizacionHabeasData || false,
    });

    // 1. Validación legal: Ley 1581 de 2012 (Habeas Data)
    if (autorizacionHabeasData !== true) {
      return res
        .status(400)
        .json({ exito: false, message: "Debe aceptar la autorización de Habeas Data" });
    }

    // 2. Validación de campos mínimos requeridos
    if (
      !primerNombre.trim() ||
      !segundoNombre.trim() ||
      !primerApellido.trim() ||
      !segundoApellido.trim() ||
      !tipoDocumento.trim() ||
      !numeroDocumento.trim() ||
      !fechaNacimiento.trim() ||
      !edad.trim() ||
      !fechaExpDocumento.trim()
    ) {
      return res
        .status(400)
        .json({ exito: false, message: "Todos los campos son requeridos" });
    }
    await habitante.save();
    res.status(201).json(habitante);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createHabitante };
