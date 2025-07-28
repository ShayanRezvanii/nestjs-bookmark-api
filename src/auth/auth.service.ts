import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private userSerivce: UserService,
    private jwtService: JwtService,
  ) {}

  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: 'refresh-secret',
      expiresIn: '10m',
    });
  }

  //signup
  async signup(email: string, password: string) {
    const users = await this.userSerivce.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use ');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await this.userSerivce.create(email, hash);

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
    const refreshToken = this.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userSerivce.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return {
      id: user.id,
      email: user.id,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  //login
  async login(email: string, password: string) {
    const user = await this.userSerivce.findOne(email);

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }

    const validateUser = await bcrypt.compare(password, user.password);
    if (!validateUser) {
      throw new UnauthorizedException('Missed User Detail');
    }
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = this.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userSerivce.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return { access_token: token, refresh_token: refreshToken };
  }

  //refresh
  async refresh(refreshToken?: string) {
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token is required');

    const users = await this.userSerivce.findWithRefreshToken();

    for (const user of users) {
      if (!user.refreshToken) continue;

      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
      if (isMatch) {
        const access_token = this.jwtService.sign({
          id: user.id,
          email: user.email,
          role: user.role,
        });
        return { access_token };
      }
    }

    throw new UnauthorizedException('Invalid refresh token');
  }

  //logout
  async logout(userId: number) {
    await this.userSerivce.update(userId, { refreshToken: null });
  }
}
