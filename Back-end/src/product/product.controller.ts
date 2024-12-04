import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() productData: Partial<Product>) {
    try {
      const product = await this.productService.create(productData);
      return { success: true, message: 'Produto criado com sucesso!', product };
    } catch {
      throw new BadRequestException('Erro ao criar o produto.');
    }
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() productData: Partial<Product>,
  ): Promise<any> {
    try {
      const updatedProduct = await this.productService.update(id, productData);
      return {
        success: true,
        message: 'Produto atualizado com sucesso!',
        product: updatedProduct,
      };
    } catch {
      throw new BadRequestException('Erro ao atualizar o produto.');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    try {
      await this.productService.remove(id);
      return { success: true, message: 'Produto removido com sucesso!' };
    } catch {
      throw new BadRequestException('Erro ao remover o produto.');
    }
  }
}
