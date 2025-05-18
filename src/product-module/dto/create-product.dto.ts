import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;
  
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}
