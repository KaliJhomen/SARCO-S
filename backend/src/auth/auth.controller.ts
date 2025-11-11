import { Controller, Get, Post, Body, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import type { Response } from 'express';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: any, @Res() res: Response) {
    const { token, user } = await this.authService.login(loginDto);    
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // false para localhost
      path: '/',
      maxAge: 60 * 1000 * 60, // 60 minutos
    });
    
    console.log('✅ Cookie guardada exitosamente');

    return res.json({ user }); // solo devuelves datos no sensibles
  }

  // auth.controller.ts
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,  // en dev false, en prod true (https)
      sameSite: 'strict',
    });
    return res.json({ message: 'Logout successful' });
  }


  @Post('register')
  //@UseGuards(AuthGuard)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  //@UseGuards(AuthGuard)
  profile(@Request() req) {
    return req.user;
  }

  // auth.controller.ts
  // @Post("logina")
  // async logina(@Body() body: { login: string; clave: string }) {
  //   const user = await this.authService.validateUser(body.login, body.clave);

  //   if (!user) {
  //     throw new UnauthorizedException("Usuario o contraseña incorrectos");
  //   }

  //   // 🔥 Devuelves solo info básica del usuario (sin password)
  //   return {
  //     id: user.idUsuario,
  //     logina: user.login,
  //     nombre: user.nombre,
  //   };
  // }

}
