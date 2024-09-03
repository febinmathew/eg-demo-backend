import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import CreateUserDto from './dto/CreateUser.dto';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import User from './entity/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/SignIn.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const entity = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    let user;
    try {
      user = await this.userRepository.save(entity);
    } catch (error) {
      throw new ConflictException(error.message);
    }

    return user;
  }
}
