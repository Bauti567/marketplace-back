import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product,  } from './entities/product.entity';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductsDto } from './dto/filter-product.dto';
import { ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto, userId: string) {
    const product = new this.productModel({
      ...createProductDto,
      createdBy: userId,
    });
    return product.save();
  }

  async findMyProducts(userId: string) {
    return this.productModel.find({ createdBy: userId });
  }

  async findAllWithFilters(filters: FilterProductsDto) {
    const query: any = {};

    if (filters.name) query.name = { $regex: filters.name, $options: 'i' };
    if (filters.sku) query.sku = filters.sku;
    if (filters.minPrice) query.price = { ...query.price, $gte: filters.minPrice };
    if (filters.maxPrice) query.price = { ...query.price, $lte: filters.maxPrice };
    if (filters.sellerId) query.createdBy = filters.sellerId;

    return this.productModel.find(query).populate('createdBy', 'name email');
  }
}
