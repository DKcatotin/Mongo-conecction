// src/autor/autor.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Autor } from './autor.schema';

@Injectable()
export class AutorService {
  constructor(@InjectModel('Autor') private autorModel: Model<Autor>) {}

  // Crear un autor
  async create(codigo: string, nombre: string, apellido: string, nacionalidad: string): Promise<Autor> {
    const newAutor = new this.autorModel({ codigo, nombre, apellido, nacionalidad, estado: 1 });
    return newAutor.save();
  }

  // Obtener todos los autores
  async findAll(): Promise<Autor[]> {
    return this.autorModel.find({ estado: 1 });
  }

  // Obtener un autor por su código
  async findOne(codigo: string): Promise<Autor> {
    return this.autorModel.findOne({ codigo });
  }
}
