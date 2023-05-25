import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()

export class AuthService extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
      super({usernameField:'login', passwordField: 'psw'});
    }
    async validate(login: string, psw: string): Promise<any> {
      const user = await this.userService.checkAuthUser(login, psw);
      console.log('user', user)
      if (!user) {
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            errorText: 'Пользователь не найден в базе',
        }, HttpStatus.CONFLICT);
      }
      return true;
    }
  }