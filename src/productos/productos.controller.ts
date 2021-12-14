import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductDTO } from './dto/products.dto';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productoService: ProductosService) {}

  @Get()
  async getProducts(): Promise<ProductDTO[]> {
    return this.productoService.getProducts();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createProduct(@Body() product: ProductDTO): Promise<ProductDTO> {
    return this.productoService.createProduct(product);
  }

  @Put()
  async updateProduct(
    @Param('id') idProduct: string,
    @Body() product: ProductDTO,
  ): Promise<ProductDTO> {
    return this.productoService.updateProduct(idProduct, product);
  }

  @Delete()
  async deleteProduct(@Param('id') idProduct: string): Promise<void> {
    return this.productoService.deleteProduct(idProduct);
  }
}
