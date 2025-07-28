import { Exclude, Expose } from 'class-transformer';
import { BookmarkEntity } from 'src/bookmarks/bookmark.entity/bookmark.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => BookmarkEntity, (BookmarkEntity) => BookmarkEntity.user)
  @Expose()
  bookmarks: BookmarkEntity[];

  @Column({ type: 'text', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;
}
