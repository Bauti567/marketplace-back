import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Request } from 'express';
import { FilterProductsDto } from './dto/filter-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seller')
  @Post()
  create(@Body() dto: CreateProductDto, @Req() req: Request) {
    const userId = (req as any).user.userId;
    return this.productsService.create(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('seller')
  @Get('mine')
  getMyProducts(@Req() req: Request) {
    const userId = (req as any).user.userId;
    return this.productsService.findMyProducts(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('buyer')
  @Get()
  findProducts(@Query() filters: FilterProductsDto) {
    return this.productsService.findAllWithFilters(filters);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('all')
  findAllAsAdmin(@Query() filters: FilterProductsDto) {
    return this.productsService.findAllWithFilters(filters);
  }
}
