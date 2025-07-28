import { Expose } from 'class-transformer';
import { UserEntity } from 'src/user/user.entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookmarkEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  title: string;

  @Expose()
  @Column()
  url: string;

  @Expose()
  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.bookmarks)
  @Expose()
  user: UserEntity;
}
