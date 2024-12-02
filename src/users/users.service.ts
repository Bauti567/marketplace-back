import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'; // importe JWT
import { access } from 'fs';

type Tokens = {
  access_token: string,
  refresh_token: string
}

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
      const user = await newUser.save();
      const {access_token,refresh_token} = await this.generateTokens(user);
      return await newUser.save();
      
    } catch (error) {
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
          access_token: await this.jwtSvc.signAsync(payload,{
            secret: 'jwt_secret',
            expiresIn: '1d'
          }), // Generar token
          refresh_token: await this.jwtSvc.signAsync(payload,{
            secret: 'jwt_secret_refresh',
            expiresIn: '7d'
          }),
          message: 'Login succesfuly'
        
        };
        
      } 
      } catch(error){
      throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED)
      
    }
  }

  async refreshToken(refreshToken: string){
    try{
      const user = this.jwtSvc.verify(refreshToken, {secret:'jwt_secret_refresh'})
      const payload = {sub: user._id, email: user.email, name: user.name}
      const{access_token, refresh_token}  = await this.generateTokens(payload)
      return{
        access_token,
        refreshToken,
        status: 200,
        message: 'Refresh token succesfuly '
      }     
    } catch(error){
      throw new HttpException('Refresh token failed',HttpStatus.UNAUTHORIZED)
    }
  }

  private async generateTokens(user):Promise<Tokens>{
    const jwtPayload = {sub: user._id, email:user.email, name:user.name}
    const [accessToken, refresh_token] = await Promise.all([
      this.jwtSvc.signAsync(jwtPayload,{
        secret: 'jwt_secret',
        expiresIn: '1d'
      }),
      this.jwtSvc.signAsync(jwtPayload,{
          secret: 'jwt_secret_refresh',
          expiresIn: '7d'
        })
    ])
    return {
      access_token: accessToken,
      refresh_token: refresh_token
    }
  }

}
