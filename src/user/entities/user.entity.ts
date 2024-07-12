import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '../../article/entities/article.entity';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  username: string;
  @Column({ select: false })
  password: string;
  @Column({ default: '' })
  image: string;
  @Column({ default: '' })
  bio: string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];
  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];
}
