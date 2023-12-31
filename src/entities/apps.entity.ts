import { Categories } from './categories.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Tokens } from './tokens.entity';
import { Wallpapers } from './wallpapers.entity';

@Entity('tbl_apps')
export class Apps {
  constructor(data?: Apps) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', unique: true })
  name?: string;

  @OneToMany(() => Categories, (categories) => categories.app)
  categories?: Categories[];

  @OneToMany(() => Tokens, (token) => token.app)
  toekn?: Tokens[];

  @OneToMany(() => Wallpapers, (wallpapers) => wallpapers.app)
  wallpapers?: Wallpapers[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
