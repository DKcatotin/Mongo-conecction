// src/autor/autor.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AutorService } from './autor.service';
import { Autor } from './autor.schema';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  // Crear un autor
  @Post('crear')
  async create(@Body() autorData: { codigo: string, nombre: string, apellido: string, nacionalidad: string }): Promise<Autor> {
    return this.autorService.create(autorData.codigo, autorData.nombre, autorData.apellido, autorData.nacionalidad);
  }

  // Obtener todos los autores
  @Get()
  async findAll(): Promise<Autor[]> {
    return this.autorService.findAll();
  }

  // Obtener un autor por su código
  @Get(':codigo')
  async findOne(@Param('codigo') codigo: string): Promise<Autor> {
    return this.autorService.findOne(codigo);
  }
}
