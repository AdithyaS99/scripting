import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RedisService } from '../redis/redis.service';
import { emit } from 'process';

@Injectable()
export class AuthService {
    constructor(
        @Inject('redisClient') private readonly redisClient: RedisService,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string) {
        this.redisClient.setIfNotExist(username, 5);
        console.log(await this.redisClient.getValue(username));
        // find if user exist with this email
        const user = await this.userService.findOneByEmail(username);
        if (!user) {
            return null;
        }

        // find if user password match
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            let count = Number(await this.redisClient.getValue(username))
            if(count>0){
                console.log("first try")
                this.redisClient.decrement(username);
                return {status: true, user: null};
            }
            else
            {
                this.redisClient.invalidate(username);
                return {status: false, user: null};
            }
            
        }

        else{
            this.redisClient.invalidate(username);
        }

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = user['dataValues'];
        return {status: true, user: result};
    }

    public async login(user) {
        const token = await this.generateToken(user);
        return { user, token };
    }

    generateOTP(length = 6) {
        let otp = '';
        const characters =
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
        for (let i = 0; i < length; i++) {
          const index = Math.floor(Math.random() * characters.length);
          otp += characters[index];
        }
    
        return otp;
    }

    public async requestOtp(email:string){
        if(this.userService.findOneByEmail(email))
        {
            let otp = this.generateOTP();
            this.redisClient.setOtp(email, otp);
            return otp;
        }
        else
        {
            return null;
        }
    }

    public async verifyOtp(email: string, otp: string){
        let originalOtp = await this.redisClient.getValue(email)
        if(originalOtp)
        {
            if(originalOtp.match(otp))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }

    public async create(user) {
        // hash the password
        const pass = await this.hashPassword(user.password);

        // create the user
        const newUser = await this.userService.create({ ...user, password: pass });

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = newUser['dataValues'];

        // generate token
        const token = await this.generateToken(result);

        // return the user and the token
        return { user: result, token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}