// src/libro/libro.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Libro } from './libros.schema';
import { Autor } from '../autor/autor.schema';  // Importamos el modelo de Autor

@Injectable()
export class LibroService {
  constructor(
    @InjectModel('Libro') private libroModel: Model<Libro>,
    @InjectModel('Autor') private autorModel: Model<Autor>,  // Importamos el modelo de Autor
  ) {}

  // Método POST para crear un libro
  async create(libroData: any): Promise<Libro> {
    try {
      // Verificar si el libro ya existe por el código
      const existingLibro = await this.libroModel.findOne({ codigo: libroData.codigo });
      if (existingLibro) {
        throw new Error(`El libro con el código ${libroData.codigo} ya existe.`);
      }

      // Buscar si el autor con el código proporcionado existe
      let autor = await this.autorModel.findOne({ codigo: libroData.autorCodigo });

      // Si el autor no existe, lo creamos
      if (!autor) {
        autor = new this.autorModel({
          codigo: libroData.autorCodigo,
          nombre: libroData.autorNombre,  // Asumimos que pasamos el nombre del autor también
        });
        await autor.save();
      }

      // Crear el libro y asignar el código del autor
      const libro = new this.libroModel({
        codigo: libroData.codigo,
        titulo: libroData.titulo,
        autor: libroData.autorCodigo,  // Usamos el código del autor
        editorial: libroData.editorial,
        anioLanzamiento: libroData.anioLanzamiento,
        estado: libroData.estado || 1,  // Si no se pasa estado, asignamos el valor 1 por defecto
      });

      return await libro.save();
    } catch (error) {
      console.error('Error al crear el libro:', error);  // Log completo del error
      throw new Error(`Error al crear el libro: ${error.message || error}`);
    }
  }
  // Método GET para obtener todos los libros
  async findAll(): Promise<Libro[]> {
    return this.libroModel.find({ estado: 1 });  // Solo libros que no estén "borrados" lógicamente
  }

  // Método GET para obtener un libro por su código
  async findOne(codigo: string): Promise<Libro | null> {
    return this.libroModel.findOne({ codigo, estado: 1 });  // Asegura que el libro no esté "borrado"
  }

  // Método para actualizar un libro
  async update(codigo: string, libroData: any): Promise<Libro> {
    const libro = await this.libroModel.findOne({ codigo, estado: 1 });

    if (!libro) {
      throw new Error('Libro no encontrado o ya está borrado');
    }

    // Actualiza los campos si se pasan nuevos datos
    libro.titulo = libroData.titulo || libro.titulo;
    libro.editorial = libroData.editorial || libro.editorial;
    libro.anioLanzamiento = libroData.anioLanzamiento || libro.anioLanzamiento;
    libro.autor = libroData.autorCodigo || libro.autor;  // Actualiza el código del autor si es necesario

    // Guarda los cambios
    return libro.save();
  }

  // Método para realizar un "borrado lógico" de un libro
  async deleteLogical(codigo: string): Promise<Libro> {
    const libro = await this.libroModel.findOne({ codigo, estado: 1 });

    if (!libro) {
      throw new Error('Libro no encontrado o ya está borrado');
    }

    // Cambia el estado a 0 para simular el borrado lógico
    libro.estado = 0;  // Asumiendo que 0 es el estado de "borrado lógico"
    return libro.save();
  }
}
