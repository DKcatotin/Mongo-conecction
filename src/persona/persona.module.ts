// src/persona/persona.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { PersonaSchema } from './persona.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Persona', schema: PersonaSchema }]),
  ],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule {}
