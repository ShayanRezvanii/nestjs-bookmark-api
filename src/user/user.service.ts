import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}

  async find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async findOne(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async update(id: number, attrs: Partial<UserEntity>) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async findWithRefreshToken() {
    return this.repo.find({
      where: {
        refreshToken: Not(IsNull()),
      },
    });
  }
}
