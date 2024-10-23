const { Schema, model } = require("mongoose");

const ClienteSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  endereco: { type: String, required: true },
  usuarioRef: { type: Schema.Types.ObjectId, ref: "Usuario" },
});

const Cliente = model("Cliente", ClienteSchema);

module.exports = Cliente;
