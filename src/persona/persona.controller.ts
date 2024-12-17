// src/persona/persona.controller.ts
import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { Persona } from './persona.schema';

@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  // POST: Crear una persona
  @Post()
  async create(@Body() personaData: any): Promise<Persona> {
    return this.personaService.create(personaData);
  }

  // GET: Obtener todas las personas
  @Get()
  async findAll(): Promise<Persona[]> {
    return this.personaService.findAll();
  }

  // GET: Obtener una persona por código
  @Get(':codigo')
  async findOne(@Param('codigo') codigo: string): Promise<Persona | null> {
    return this.personaService.findOne(codigo);
  }

  // PUT: Actualizar una persona por código
  @Put(':codigo')
  async update(@Param('codigo') codigo: string, @Body() personaData: any): Promise<Persona> {
    return this.personaService.update(codigo, personaData);
  }

  // DELETE (lógico): Realizar borrado lógico de una persona
  @Put(':codigo/borrar')
  async deleteLogical(@Param('codigo') codigo: string): Promise<Persona> {
    return this.personaService.deleteLogical(codigo);
  }
}
