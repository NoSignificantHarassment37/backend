import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma/prisma.service';
import { LocalCacheService } from '../cache/cache.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private cache: LocalCacheService,
    private email: EmailService,
  ) {}

  async request(email: string, contrasena: string) {
    const existe = await this.prisma.usuario.findUnique({ where: { email } });
    if (existe) throw new ConflictException('El email ya está registrado');

    const codigo: number | null = this.generarCodigo(email, contrasena);
    if (codigo === null) {
      return null;
    }
    await this.email.enviarCorreo(
      email,
      'Codigo de verificacion para ViajesNova',
      `<p>${codigo}</p>`,
    );
    return true;
  }

  async login(email: string, contrasena: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
      include: { rol: true },
    });

    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');
    if (!usuario.rol) throw new Error('El usuario no tiene rol');

    const valido = await compare(contrasena, usuario.contrasena);
    if (!valido) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol.nombre,
      },
      {
        expiresIn: '23h',
        secret: process.env.JWT_SECRET,
      },
    );

    return {
      token,
      usuario: {
        email: usuario.email,
        rol: usuario.rol.nombre,
      },
    };
  }
  generarCodigo(email: string, contrasena: string): number | null {
    const valorDesconocido: any = this.cache.get(`verify:${email}`);
    if (!(valorDesconocido === undefined)) {
      return null;
    }
    const code = Math.floor(100000 + Math.random() * 900000);
    this.cache.set(`verify:${email}`, { code, contrasena }, 5 * 60 * 1000); // 5 minutos
    return code;
  }
  async verify(email: string, codigo: number): Promise<boolean> {
    // true = correo y codigo validos, false = correo o codigo invalidos.
    const guardado: any = this.cache.get(`verify:${email}`);
    if (!guardado) return false;
    if (guardado.code !== codigo)
      throw new UnauthorizedException({
        verified: false,
        razon: 'El codigo o email no es correcto.',
      });

    this.cache.delete(`verify:${email}`);

    const hashed = await hash(guardado.contrasena, 10);

    const rol = await this.prisma.rol.findFirst({
      where: { nombre: 'Usuario' },
    });
    if (!rol) throw new Error('Rol por defecto no encontrado');

    const usuario = await this.prisma.usuario.create({
      data: {
        email,
        contrasena: hashed,
        rol: { connect: { id: rol.id } },
      },
      select: {
        id: true,
        email: true,
      },
    });

    return Boolean(usuario);
  }
}
