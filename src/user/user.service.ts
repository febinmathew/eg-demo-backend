import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, instanceToPlain } from 'class-transformer';
import User from 'src/user/entity/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getUserData(userEmail: string) {
    const user = await this.userRepository.findOneBy({
      email: userEmail,
    });
    const userDto = instanceToPlain(user);
    if (!user) {
      throw new NotFoundException();
    }

    return userDto;
  }
}
