// src/libro/libro.controller.ts
import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { LibroService } from './libro.service';
import { Libro } from './libros.schema';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  // POST: Crear un libro
  @Post()
  async create(@Body() libroData: any): Promise<Libro> {
    return this.libroService.create(libroData);
  }

  // GET: Obtener todos los libros
  @Get()
  async findAll(): Promise<Libro[]> {
    return this.libroService.findAll();
  }

  // GET: Obtener un libro por código
  @Get(':codigo')
  async findOne(@Param('codigo') codigo: string): Promise<Libro> {
    return this.libroService.findOne(codigo);
  }

  // PUT: Actualizar un libro por código
  @Put(':codigo')
  async update(@Param('codigo') codigo: string, @Body() libroData: any): Promise<Libro> {
    return this.libroService.update(codigo, libroData);
  }

  // DELETE (lógico): Realizar borrado lógico de un libro
  @Put(':codigo/borrar')
  async deleteLogical(@Param('codigo') codigo: string): Promise<Libro> {
    return this.libroService.deleteLogical(codigo);
  }
}
