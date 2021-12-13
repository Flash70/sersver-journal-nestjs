import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PostEntity } from '../../post/entities/post.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.user, { nullable: true })
  public post?: PostEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user, { nullable: true })
  public comment?: PostEntity[];
}
