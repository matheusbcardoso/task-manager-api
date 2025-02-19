import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { authUserDto } from './dto/auth-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  login(user: User) {
    const payload = { username: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authUserDto: authUserDto): Promise<User | null> {
    const { username, password } = authUserDto;
    let validPassword: boolean = false;

    const user = await this.usersService.findOneByUsername(username);
    if (!user) throw new UnauthorizedException('User not found');

    console.info(user.password);
    console.info(password);

    validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      return user;
    }

    throw new UnauthorizedException('Invalid username or password');
  }
}
