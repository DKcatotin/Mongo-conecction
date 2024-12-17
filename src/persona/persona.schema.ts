// src/persona/persona.schema.ts
import { Schema, Document } from 'mongoose';

export const PersonaSchema = new Schema({
  codigo: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  estado: { type: Number, required: true, default: 1 },  // 1: activo, 0: inactivo
});

export interface Persona extends Document {
  codigo: string;
  nombre: string;
  apellido: string;
  estado: number;
}
