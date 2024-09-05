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

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
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

  async createUser(createUserDto: CreateUserDto): Promise<Record<string, any>> {
    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      salt,
    );
    const entity: User = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    let user: User;
    try {
      user = await this.userRepository.save(entity);
      this.logger.log(`New User registration - ${user.name}`);
    } catch (error) {
      this.logger.error(`User registration failed - ${error.message}`);
      throw new ConflictException(error.message);
    }
    const userDto: Record<string, any> = instanceToPlain(user);

    return userDto;
  }
}
