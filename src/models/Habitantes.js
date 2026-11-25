import moongose from "mongoose";

const HabitantesSchema = moongose.Schema({
    primerNombre: {
        type: String,
        required: true,
    },
    segundoNombre: {
        type: String,
        required: true,
    },
    primerApellido: {
        type: String,
        required: true,
    },
    segundoApellido: {
        type: String,
        required: true,
    },
    tipoDocumento: {
        type: String,
        required: true,
        enum: ['CC','RC','TI', 'CE', 'PA']
    },
    numeroDocumento: {
        type: String,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        type: Date,
        required: true,
        immutable: true
    },
    edad: {
        type: Number,
        required: true,
        min: 0
    },
    fechaExpDocumento: {
        type: Date,
        required: true,
    },
    autorizacionHabeasData: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Habitantes = moongose.model('Habitantes', HabitantesSchema);
export default Habitantes;