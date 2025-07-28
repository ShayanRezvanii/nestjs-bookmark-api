import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkEntity } from './bookmark.entity/bookmark.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookmarkEntity]), AuthModule],
  providers: [BookmarksService],
  controllers: [BookmarksController],
})
export class BookmarksModule {}
