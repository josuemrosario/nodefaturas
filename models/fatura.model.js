const { Schema, model } = require("mongoose");

const FaturaSchema = new Schema({
  total: { type: Number, required: true },
  data_vencto: { type: String, required: true },
  status: { type: String, required: true },
  usuarioRef: { type: Schema.Types.ObjectId, ref: "Usuario" },
  clienteRef: { type: Schema.Types.ObjectId, ref: "Cliente" },
});

const Fatura = model("Fatura", FaturaSchema);
module.exports = Fatura;
