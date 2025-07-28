import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/user.entity/user.entity';
import { BookmarkEntity } from './bookmark.entity/bookmark.entity';
import { plainToInstance } from 'class-transformer';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarkService: BookmarksService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  createBookMark(@Body() body: CreateBookmarkDto, @Request() req) {
    return this.bookmarkService.create(body, req.user.id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllBookmarks() {
    const bookMarks = await this.bookmarkService.findAll();
    return plainToInstance(BookmarkEntity, bookMarks, {
      excludeExtraneousValues: true,
    });
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.USER)
  @Get('me')
  getAllBookmarksMe(@Request() req) {
    const userId = req.user.id;
    return this.bookmarkService.findByUser(userId);
  }
}
