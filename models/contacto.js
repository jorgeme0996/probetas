var mongoose = require("mongoose");

var ContactoSchema = new mongoose.Schema({
    name: String,
    lastName:String,
    email: String,
    celular: String
});

module.exports = mongoose.model("Contacto", ContactoSchema);