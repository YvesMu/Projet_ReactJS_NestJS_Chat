import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(username: string, password: string) {
    const user = this.userRepository.create({ username, password });
    return this.userRepository.save(user);
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  async save(user: User) {
    return this.userRepository.save(user);
}

}
