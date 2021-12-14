import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private UsersRepository: Repository<UserEntity>,
    private readonly filesService: FilesService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.UsersRepository.create(dto);
    await this.UsersRepository.save(newUser);
    return newUser;
  }

  findAllUsers(): Promise<UserEntity[]> {
    return this.UsersRepository.find();
  }

  async setCurrentRefreshToken(
    currentHashedRefreshToken: string,
    userId: number,
  ) {
    await this.UsersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getById(id: number) {
    const user = await this.UsersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.UsersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
    const user = await this.getById(userId);
    await this.UsersRepository.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  getUserByEmail(email: string) {
    return this.UsersRepository.findOne({ where: { email } });
  }

  update(id: number, dto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
