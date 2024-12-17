import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VolumenController } from './volumen.controller';
import { VolumenService } from './volumen.service';
import { VolumenSchema } from './volumen.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Volumen', schema: VolumenSchema }]),  // Conexión al modelo de volumen
  ],
  controllers: [VolumenController],
  providers: [VolumenService],
})
export class VolumenModule {}
