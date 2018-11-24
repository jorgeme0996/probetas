var mongoose = require("mongoose");

var BecaSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    celular: String,
    whats: String,
    actividades: String,
    programar: String,
    conocimientos: String,
    porque: String,
    compromiso: String,
    pagar: String
});

module.exports = mongoose.model("Becas", BecaSchema);