import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/requestWithUser.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() dto: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postService.createPost(dto, req.user);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }
}
