import { Controller, Body, Post, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        let userinfo =  await this.authService.login(req.user);
        return userinfo;
    }

    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return this.authService.create(user);
    }

    @UseGuards(DoesUserExist)
    @Post('requestOtp')
    async requestOtp(@Body() payload: { email: string }) {
        console.log(payload.email)
        let otp = await this.authService.requestOtp(payload.email);
        if(!otp)
        {
            throw new UnauthorizedException('Invalid user credentials');
        }
        else
        {
            return otp;
        }
    }

    @Post('verifyOtp')
    async verifyOtp(@Body()  payload: { email: string, otp: string }) {
        const { email, otp} = payload
        let trf:boolean= await this.authService.verifyOtp(email, otp);
        if(!trf)
        {
            throw new UnauthorizedException('Otp mismatched or expired. Try again later!');
        }
        else
        {
            return {'status': 'successful login!'}
        }
    }
}