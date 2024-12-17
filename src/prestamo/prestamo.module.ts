// src/prestamo/prestamo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrestamoController } from './prestamo.controller';
import { PrestamoService } from './prestamo.service';
import { PrestamoSchema } from './prestamo.schema';
import { LibroSchema } from '../libros/libros.schema';
import { PersonaSchema } from '../persona/persona.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Prestamo', schema: PrestamoSchema },
      { name: 'Libro', schema: LibroSchema },
      { name: 'Persona', schema: PersonaSchema },
    ]),
  ],
  controllers: [PrestamoController],
  providers: [PrestamoService],
})
export class PrestamoModule {}
