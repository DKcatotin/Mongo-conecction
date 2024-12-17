// src/prestamo/prestamo.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prestamo } from './prestamo.schema';
import { Libro } from '../libros/libros.schema';
import { Persona } from '../persona/persona.schema';

@Injectable()
export class PrestamoService {
  constructor(
    @InjectModel('Prestamo') private prestamoModel: Model<Prestamo>,
    @InjectModel('Libro') private libroModel: Model<Libro>,
    @InjectModel('Persona') private personaModel: Model<Persona>,
  ) {}

  // Método POST para crear un préstamo
  async create(prestamoData: any): Promise<Prestamo> {
    try {
      // Verificar si ya existe un préstamo con el mismo código
      const existingPrestamo = await this.prestamoModel.findOne({ codigo: prestamoData.codigo });
      if (existingPrestamo) {
        throw new Error(`El préstamo con el código ${prestamoData.codigo} ya existe.`);
      }

      // Verificar si el libro existe
      const libro = await this.libroModel.findOne({ codigo: prestamoData.codigoLibro });
      if (!libro) {
        throw new Error(`El libro con el código ${prestamoData.codigoLibro} no existe.`);
      }

      // Verificar si la persona existe
      const persona = await this.personaModel.findOne({ codigo: prestamoData.codigoPersona });
      if (!persona) {
        throw new Error(`La persona con el código ${prestamoData.codigoPersona} no existe.`);
      }

      // Crear el préstamo
      const prestamo = new this.prestamoModel({
        codigo: prestamoData.codigo,
        libro: prestamoData.codigoLibro,  // Usamos el código del libro
        persona: prestamoData.codigoPersona,  // Usamos el código de la persona
        fechaPrestamo: prestamoData.fechaPrestamo,
        fechaDevolucion: prestamoData.fechaDevolucion,
        // Otros campos...
      });

      return await prestamo.save();
    } catch (error) {
      console.error('Error al crear el préstamo:', error);
      throw new Error(`Error al crear el préstamo: ${error.message || error}`);
    }
  }

  // Método GET para obtener todos los préstamos
  async findAll(): Promise<Prestamo[]> {
    return this.prestamoModel.find({ estado: 1 });  // Solo préstamos activos
  }

  // Método GET para obtener un préstamo por su código
  async findOne(codigo: string): Promise<Prestamo | null> {
    return this.prestamoModel.findOne({ codigo, estado: 1 });  // Asegura que el préstamo esté activo
  }

  // Método PUT para actualizar un préstamo
  async update(codigo: string, prestamoData: any): Promise<Prestamo> {
    const prestamo = await this.prestamoModel.findOne({ codigo, estado: 1 });

    if (!prestamo) {
      throw new Error('Préstamo no encontrado o ya está borrado');
    }

    // Actualiza los campos si se pasan nuevos datos
    prestamo.fechaPrestamo = prestamoData.fechaPrestamo || prestamo.fechaPrestamo;
    prestamo.fechaDevolucion = prestamoData.fechaDevolucion || prestamo.fechaDevolucion;

    // Guarda los cambios
    return prestamo.save();
  }

  // Método para realizar un "borrado lógico" de un préstamo
  async deleteLogical(codigo: string): Promise<Prestamo> {
    const prestamo = await this.prestamoModel.findOne({ codigo, estado: 1 });

    if (!prestamo) {
      throw new Error('Préstamo no encontrado o ya está borrado');
    }

    // Cambia el estado a 0 para simular el borrado lógico
    prestamo.estado = 0;
    return prestamo.save();
  }
}
