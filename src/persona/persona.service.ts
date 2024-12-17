// src/persona/persona.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Persona } from './persona.schema';

@Injectable()
export class PersonaService {
  constructor(
    @InjectModel('Persona') private personaModel: Model<Persona>,
  ) {}

  // Método POST para crear una persona
  async create(personaData: any): Promise<Persona> {
    try {
      // Verificar si la persona ya existe por el código
      const existingPersona = await this.personaModel.findOne({ codigo: personaData.codigo });
      if (existingPersona) {
        throw new Error(`La persona con el código ${personaData.codigo} ya existe.`);
      }

      // Crear la persona
      const persona = new this.personaModel({
        codigo: personaData.codigo,
        nombre: personaData.nombre,
        apellido: personaData.apellido,
        // Otros campos...
      });

      return await persona.save();
    } catch (error) {
      console.error('Error al crear la persona:', error);
      throw new Error(`Error al crear la persona: ${error.message || error}`);
    }
  }

  // Método GET para obtener todas las personas
  async findAll(): Promise<Persona[]> {
    return this.personaModel.find({ estado: 1 });  // Solo personas activas
  }

  // Método GET para obtener una persona por su código
  async findOne(codigo: string): Promise<Persona | null> {
    return this.personaModel.findOne({ codigo, estado: 1 });  // Asegura que la persona esté activa
  }

  // Método PUT para actualizar una persona
  async update(codigo: string, personaData: any): Promise<Persona> {
    const persona = await this.personaModel.findOne({ codigo, estado: 1 });

    if (!persona) {
      throw new Error('Persona no encontrada o ya está borrada');
    }

    // Actualiza los campos si se pasan nuevos datos
    persona.nombre = personaData.nombre || persona.nombre;
    persona.apellido = personaData.apellido || persona.apellido;

    // Guarda los cambios
    return persona.save();
  }

  // Método para realizar un "borrado lógico" de una persona
  async deleteLogical(codigo: string): Promise<Persona> {
    const persona = await this.personaModel.findOne({ codigo, estado: 1 });

    if (!persona) {
      throw new Error('Persona no encontrada o ya está borrada');
    }

    // Cambia el estado a 0 para simular el borrado lógico
    persona.estado = 0;
    return persona.save();
  }
}
