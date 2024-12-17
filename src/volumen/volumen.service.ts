import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Volumen } from './volumen.schema';

@Injectable()
export class VolumenService {
  constructor(
    @InjectModel('Volumen') private volumenModel: Model<Volumen>,
  ) {}

  // Método POST para crear un volumen
  async create(volumenData: any): Promise<Volumen> {
    try {
      // Verificar si ya existe un volumen con el mismo código
      const existingVolumen = await this.volumenModel.findOne({ codigo: volumenData.codigo });
      if (existingVolumen) {
        throw new Error(`El volumen con el código ${volumenData.codigo} ya existe.`);
      }

      // Crear el volumen
      const volumen = new this.volumenModel({
        codigo: volumenData.codigo,  // Aseguramos que se incluya el código
        autorCodigo: volumenData.autorCodigo,
        libroCodigo: volumenData.libroCodigo,
        cantidad: volumenData.cantidad,
        estado: volumenData.estado,
      });

      return await volumen.save();
    } catch (error) {
      console.error('Error al crear el volumen:', error);
      throw new Error(`Error al crear el volumen: ${error.message || error}`);
    }
  }

  // Método GET para obtener todos los volúmenes
  async findAll(): Promise<Volumen[]> {
    return this.volumenModel.find();  // Obtenemos todos los volúmenes
  }

  // Método GET para obtener un volumen por código
  async findOne(codigo: string): Promise<Volumen | null> {
    return this.volumenModel.findOne({ codigo });  // Buscamos el volumen por código
  }

  // Método PUT para actualizar un volumen por código
  async update(codigo: string, volumenData: any): Promise<Volumen> {
    const volumen = await this.volumenModel.findOne({ codigo });

    if (!volumen) {
      throw new Error('Volumen no encontrado');
    }

    // Actualiza los campos si se pasan nuevos datos
    volumen.autorCodigo = volumenData.autorCodigo || volumen.autorCodigo;
    volumen.libroCodigo = volumenData.libroCodigo || volumen.libroCodigo;
    volumen.cantidad = volumenData.cantidad || volumen.cantidad;
    volumen.estado = volumenData.estado || volumen.estado;

    // Guarda los cambios
    return volumen.save();
  }

  // Método para realizar un "borrado lógico" de un volumen
  async deleteLogical(codigo: string): Promise<Volumen> {
    const volumen = await this.volumenModel.findOne({ codigo });

    if (!volumen) {
      throw new Error('Volumen no encontrado');
    }

    // Cambia el estado a 0 para simular el borrado lógico
    volumen.estado = 0;
    return volumen.save();
  }
}
