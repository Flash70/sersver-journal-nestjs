import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PublicFile from './entity/publicFile.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]), ConfigModule],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
