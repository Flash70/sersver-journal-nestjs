import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { PostEntity } from '../../post/entities/post.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comment, { nullable: false })
  public user: UserEntity;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comment,{ nullable: false })
  public post: number;
}
