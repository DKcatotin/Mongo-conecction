// src/libro/libro.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { Libro, LibroSchema } from './libros.schema';
import { AutorModule } from '../autor/autor.module'; // Importa el módulo de Autor

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Libro', schema: LibroSchema }]),
    AutorModule,  // Asegúrate de importar AutorModule para poder inyectar el servicio Autor
  ],
  controllers: [LibroController],
  providers: [LibroService],
})
export class LibroModule {}
