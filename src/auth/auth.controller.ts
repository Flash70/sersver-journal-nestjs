import { Body, Controller, Delete, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guard/localAuth.guard';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthGuard from './guard/jwt-auth.guard';
import JwtRefreshGuard from './guard/jwt-refresh.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  authenticate(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post('registration')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    const { user } = req;
    const accessTokenCookie = this.authService.getCookieJwtAccessToken(
      user.id,
      user.email,
    );
    const refreshTokenCookie = this.authService.getCookieJwtRefreshToken(
      user.id,
      user.email,
    );
    await this.authService.getCurrentRefreshToken(
      refreshTokenCookie.token,
      user.id,
    );
    req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie]);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('login')
  async logOut(@Req() req: RequestWithUser) {
    await this.usersService.removeRefreshToken(req.user.id);
    req.res.setHeader('Set-Cookie', this.authService.getCookieLogOut());
    return 'HttpCode(200)';
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() req: RequestWithUser) {
    const { user } = req;
    const accessTokenCookie = this.authService.getCookieJwtAccessToken(
      user.id,
      user.email,
    );
    const refreshTokenCookie = this.authService.getCookieJwtRefreshToken(
      user.id,
      user.email,
    );
    await this.authService.getCurrentRefreshToken(
      refreshTokenCookie.token,
      user.id,
    );
    req.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie.cookie,
    ]);
    return req.user;
  }
}