import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async createPost(post: CreatePostDto, user: UserEntity) {
    const newPost = await this.postRepository.create({
      ...post,
      user: user,
    });
    await this.postRepository.save(newPost);
    return newPost;
  }

  findAll() {
    return `This action returns all post`;
  }
}
