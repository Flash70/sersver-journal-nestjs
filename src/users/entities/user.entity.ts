import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PostEntity } from '../../post/entities/post.entity';

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

  @Column()
  @Exclude()
  public currentHashedRefreshToken?: string;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.user)
  public post?: PostEntity[];
}
