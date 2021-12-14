import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindIdParams } from '../../utils/findIdParams';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { Express } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() req: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addAvatar(
      req.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Get(':id')
  findOne(@Param() { id }: FindIdParams) {
    return this.usersService.getById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
