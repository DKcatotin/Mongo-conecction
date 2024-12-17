import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { VolumenService } from './volumen.service';
import { Volumen } from './volumen.schema';

@Controller('volumenes')
export class VolumenController {
  constructor(private readonly volumenService: VolumenService) {}

  // POST: Crear un volumen
  @Post()
  async create(@Body() volumenData: any): Promise<Volumen> {
    return this.volumenService.create(volumenData);
  }

  // GET: Obtener todos los volúmenes
  @Get()
  async findAll(): Promise<Volumen[]> {
    return this.volumenService.findAll();
  }

  // GET: Obtener un volumen por código
  @Get(':codigo')
  async findOne(@Param('codigo') codigo: string): Promise<Volumen | null> {
    return this.volumenService.findOne(codigo);
  }

  // PUT: Actualizar un volumen por código
  @Put(':codigo')
  async update(@Param('codigo') codigo: string, @Body() volumenData: any): Promise<Volumen> {
    return this.volumenService.update(codigo, volumenData);
  }

  // DELETE: Eliminar un volumen por código
  @Put(':codigo/borrar')
  async deleteLogical(@Param('codigo') codigo: string): Promise<Volumen> {
    return this.volumenService.deleteLogical(codigo);
  }
}
