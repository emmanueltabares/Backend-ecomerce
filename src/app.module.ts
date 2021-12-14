import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductSchema } from './productos/dto/products.schema';
import { ProductosController } from './productos/productos.controller';
import { ProductosService } from './productos/productos.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_ATLAS_SRV || 'mongosrv'),
    MongooseModule.forFeature([{ name: 'Productos', schema: ProductSchema }]),
  ],
  controllers: [AppController, ProductosController],
  providers: [AppService, ProductosService],
})
export class AppModule {}
