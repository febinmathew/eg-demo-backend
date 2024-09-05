import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, instanceToPlain } from 'class-transformer';
import User from 'src/user/entity/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private logger: Logger,
  ) {}
  async getUserData(userEmail: string): Promise<Record<string, string>> {
    const user: User = await this.userRepository.findOneBy({
      email: userEmail,
    });
    if (!user) {
      throw new NotFoundException();
    }
    const userDto: Record<string, string> = instanceToPlain(user);
    this.logger.log(`User data fetched - ${userDto.name}`);

    return userDto;
  }
}
