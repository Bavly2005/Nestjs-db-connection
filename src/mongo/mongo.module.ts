import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        connectionErrorFactory: (error: Error) =>
          new Error(`Error connecting to database: ${error.message}`),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
