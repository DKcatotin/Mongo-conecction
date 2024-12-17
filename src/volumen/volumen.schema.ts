import { Schema, Document } from 'mongoose';

export const VolumenSchema = new Schema({
  codigo: { type: String, required: true, unique: true },  // Agregado código único
  autorCodigo: { type: String, required: true },
  libroCodigo: { type: String, required: true },
  cantidad: { type: Number, required: true },
  estado: { type: Number, required: true, default: 1 }, // 1 activo, 0 inactivo
});

export interface Volumen extends Document {
  codigo: string;  // Añadido al interfaz
  autorCodigo: string;
  libroCodigo: string;
  cantidad: number;
  estado: number;
}
