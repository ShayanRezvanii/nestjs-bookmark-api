import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookmarkEntity } from './bookmark.entity/bookmark.entity';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(BookmarkEntity)
    private repo: Repository<BookmarkEntity>,
  ) {}

  async create(dto: CreateBookmarkDto, userId: number) {
    const bookmark = this.repo.create({
      ...dto,
      user: { id: userId },
    });

    return this.repo.save(bookmark);
  }

  async findAll() {
    const bookMarks = await this.repo.find({
      relations: ['user'],
    });
    return bookMarks;
  }

  async findByUser(userId: number) {
    const bookMarks = await this.repo.find({
      where: {
        user: { id: userId },
      },
    });
    return bookMarks;
  }
}
