import { Apps } from './apps.entity';
import { Categories } from './categories.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tbl_wallpapers')
export class Wallpapers {
  constructor(data?: Wallpapers) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' })
  url?: string;

  @Column({ type: 'boolean' })
  is_premium?: boolean;

  @ManyToOne(() => Categories, (categories) => categories.wallpapers)
  @JoinColumn({ name: 'category_id' })
  category?: Categories;

  @ManyToOne(() => Apps, (apps) => apps.wallpapers)
  @JoinColumn({ name: 'app_id' })
  app?: Apps;

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
