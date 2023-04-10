import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { and } from 'sequelize';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any>{
        const user = await this.authService.validateUser(username, password);

        if (user.status==false && user.user==null) {
         throw new UnauthorizedException('Too many tries! Account locked');
        }
        else if(user.status==true && user.user==null){
            throw new UnauthorizedException("Invalid credentials");  
        }
        else{
            return user;
        }
    }
}