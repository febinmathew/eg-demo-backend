import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import CreateUserDto from './dto/CreateUser.dto';
import { Repository } from 'typeorm';
import User from '../user/entity/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/SignIn.dto';
import { instanceToPlain } from 'class-transformer';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private logger: Logger,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email };
      this.logger.log(`User authenticated successfully - ${user.name}`);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      this.logger.error(`Authentication failed! - ${user ? user.name : email}`);
      throw new UnauthorizedException('Invalid credentials!');
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
      this.logger.log(`New User registration - ${user.name}`);
    } catch (error) {
      this.logger.error(`User registration failed - ${error.message}`);
      throw new ConflictException(error.message);
    }
    const userDto = instanceToPlain(user);

    return userDto;
  }
}
