// src/libro/libros.schema.ts
import { Schema, Document } from 'mongoose';

export const LibroSchema = new Schema({
  codigo: { type: String, required: true, unique: true },  // Campo único
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editorial: { type: String, required: true },
  anioLanzamiento: { type: Number, required: true },
  estado: { type: Number, required: true, default: 1 },
});

export interface Libro extends Document {
  codigo: string;
  titulo: string;
  autor: string;
  editorial: string;
  anioLanzamiento: number;
  estado: number;
}
