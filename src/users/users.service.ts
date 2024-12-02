import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'; // importe JWT
import { access } from 'fs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>, private jwtSvc: JwtService ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashsedPassword = await bcrypt.hash(createUserDto.password,10);
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashsedPassword

      });
      return await newUser.save();
      
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Duplicate key error', HttpStatus.BAD_REQUEST); 
      }
      throw new HttpException('Check login credentials', HttpStatus.UNAUTHORIZED);
    }
  
  }
  
  async loginUser(email: string, password:string ) {
    try{
      const user = await this.userModel.findOne({email})
      const isMatch = await bcrypt.compare(password, user.password)
      
      if(!isMatch) throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED)
      
      if(user && isMatch){
        const payload = {sub: user._id, email: user.email, name: user.name}
        const {email, name} = user;
        return {
          // Creando el access token
          access_token: await this.jwtSvc.signAsync(payload) // Generar token
                    
        };
        
      } 
      } catch(error){
      throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED)
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }


}
