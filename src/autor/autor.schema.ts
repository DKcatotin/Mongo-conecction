// src/autor/autor.schema.ts
import { Schema, Document } from 'mongoose';

export const AutorSchema = new Schema({
  codigo: { type: String, required: true, unique: true },  // Código único
  nombre: { type: String, required: true },
});

export interface Autor extends Document {
  codigo: string;
  nombre: string;
}
