import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = this.userRepository.create(createUserDto);
            await this.userRepository.save(user);

            const token = this.getJwtToken({ id: user.id });

            return {
                user: plainToClass(User, user),
                token
            };
        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    async login(loginUserDto: LoginUserDto) {
        const { password, email } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: { email },
            select: {
                email: true,    
                password: true,
                id: true,
                firstName: true,
                lastName: true,
                roles: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true
              }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials1.');
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Invalid credentials2.');
        }

        return {
            user: plainToClass(User, user),
            token: this.getJwtToken({ id: user.id })
        };
    }

    private getJwtToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    async checkAuthStatus(user: User) {
        return {
            ...user,
            token: this.getJwtToken({ id: user.id }),
        };
    }

    private handleDBErrors(error: any): never {
        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        }

        console.log(error);

        throw new InternalServerErrorException('Please check the logs for more information.');
    }
}
