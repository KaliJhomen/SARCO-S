import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constants';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

// auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // 🔍 Debug completo
    console.log('\n🔍 === DEBUG AUTH GUARD ===');
    console.log('📍 URL:', request.url);
    console.log('📍 Method:', request.method);
    console.log('🍪 Todas las cookies:', request.cookies);
    // console.log('🔑 Headers Authorization:', request.headers.authorization);
    console.log('🌐 Origin:', request.headers.origin);
    console.log('=========================\n');

    const cookieToken = this.extractTokenFromCookie(request);
    const headerToken = this.extractTokenFromHeader(request);

    console.log("🍪 Cookie token extraído:", cookieToken ? "✅ Sí" : "❌ No");
    console.log("🔑 Header token extraído:", headerToken ? "✅ Sí" : "❌ No");

    const token = cookieToken ?? headerToken;
    if (!token) {
      console.log("❌ Token no proporcionado");
      throw new UnauthorizedException("Token no proporcionado");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log("✅ Token válido, usuario:", payload);
      request.user = payload;
    } catch (err) {
      console.log("❌ Error verificando token:", err.message);
      throw new UnauthorizedException("Token inválido o expirado");
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.['token'];
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}