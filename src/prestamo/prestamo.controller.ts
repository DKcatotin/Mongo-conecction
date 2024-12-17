// src/prestamo/prestamo.controller.ts
import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { Prestamo } from './prestamo.schema';

@Controller('prestamos')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}

  // POST: Crear un préstamo
  @Post()
  async create(@Body() prestamoData: any): Promise<Prestamo> {
    return this.prestamoService.create(prestamoData);
  }

  // GET: Obtener todos los préstamos
  @Get()
  async findAll(): Promise<Prestamo[]> {
    return this.prestamoService.findAll();
  }

  // GET: Obtener un préstamo por código
  @Get(':codigo')
  async findOne(@Param('codigo') codigo: string): Promise<Prestamo | null> {
    return this.prestamoService.findOne(codigo);
  }

  // PUT: Actualizar un préstamo por código
  @Put(':codigo')
  async update(@Param('codigo') codigo: string, @Body() prestamoData: any): Promise<Prestamo> {
    return this.prestamoService.update(codigo, prestamoData);
  }

  // DELETE (lógico): Realizar borrado lógico de un préstamo
  @Put(':codigo/borrar')
  async deleteLogical(@Param('codigo') codigo: string): Promise<Prestamo> {
    return this.prestamoService.deleteLogical(codigo);
  }
}
