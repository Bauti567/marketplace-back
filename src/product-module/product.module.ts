import { Module } from '@nestjs/common';
import { ProductModuleService } from './product.service';
import { ProductModuleController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [ProductModuleController],
  providers: [ProductModuleService]
})
export class ProductsModule {}
