// src/autor/autor.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { Autor, AutorSchema } from './autor.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Autor', schema: AutorSchema }])],
  controllers: [AutorController],
  providers: [AutorService],
  exports: [AutorService, MongooseModule],
    // Exporta el servicio para poder utilizarlo en otros módulos
})
export class AutorModule {}
