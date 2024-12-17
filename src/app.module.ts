// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutorModule } from './autor/autor.module';
import { LibroModule } from './libros/libro.module';
import { PersonaModule } from './persona/persona.module';
import { PrestamoModule } from './prestamo/prestamo.module';
import { VolumenModule } from './volumen/volumen.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/biblioteca'), 
    AutorModule,
    LibroModule,
    PersonaModule,
    PrestamoModule,
    VolumenModule,
  ],
})
export class AppModule {}
