import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.post, { nullable: true })
  public user: UserEntity;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post, { nullable: true, cascade: true })
  public comment: CommentEntity;
}
