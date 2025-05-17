import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './product-module/product.module';
import { AuthModule } from './auth-module/auth.module.module';

@Module({
  imports: [UsersModule,MongooseModule.forRoot('mongodb+srv://JuanBautista:dd5kHSJmMSuAWokT@atlascluster.lazttss.mongodb.net/marketplace?retryWrites=true&w=majority&appName=AtlasCluster'), AuthModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
