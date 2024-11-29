import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}
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
        const {email, name} = user;
        return {email, name};
        
      } 

      } catch(error){
      throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED)
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }


}
