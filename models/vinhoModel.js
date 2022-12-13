import mongoose from "mongoose";

const vinhoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },

  denominacao: {
    type: String,
    required: true,
  },
  ano_colheita: {
    type: String,
    required: true,
  },
  casta: {
    type: String,
    required: true,
  },
  notas_prova: {
    type: String,
    required: true,
  },
  sugestao: {
    type: String,
    required: true,
  },
  analises1: {
    type: String,
    required: true,
  },
  analises2: {
    type: String,
    required: true,
  },
  analises3: {
    type: String,
    required: true,
  },
  analises4: {
    type: String,
    required: true,
  },
  embalagem1: {
    type: String,
    required: true,
  },
  embalagem2: {
    type: String,
    required: true,
  },
  embalagem3: {
    type: String,
    required: true,
  },
  embalagem4: {
    type: String,
    required: true,
  },
  enologo: {
    type: String,
    required: true,
  },
});

const vinhoModel = mongoose.model("Vinho", vinhoSchema);

export default vinhoModel;
