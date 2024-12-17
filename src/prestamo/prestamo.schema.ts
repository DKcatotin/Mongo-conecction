// src/prestamo/prestamo.schema.ts
import { Schema, Document } from 'mongoose';

export const PrestamoSchema = new Schema({
  codigo: { type: String, required: true, unique: true },
  libro: { type: String, required: true },  // Código del libro
  persona: { type: String, required: true },  // Código de la persona
  fechaPrestamo: { type: Date, required: true },
  fechaDevolucion: { type: Date, required: true },
  estado: { type: Number, required: true, default: 1 },  // 1: activo, 0: inactivo
});

export interface Prestamo extends Document {
  codigo: string;
  libro: string;
  persona: string;
  fechaPrestamo: Date;
  fechaDevolucion: Date;
  estado: number;
}
