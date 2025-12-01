import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST'),      
        port: parseInt(configService.get<string>('DB_PORT','5432')),         
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),      
        autoLoadEntities: true,       
        synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
      }),
    }),
    PersonModule, 
    StudentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
