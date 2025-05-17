import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  phone?: string;

  @IsIn(['seller', 'buyer', 'admin'])
  role: string; 
}
