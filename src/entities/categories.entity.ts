import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Apps } from './apps.entity';
import { Wallpapers } from './wallpapers.entity';

@Entity('tbl_categories')
export class Categories {
  constructor(data?: Categories) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name?: string;

  @Column({ type: 'text' })
  url?: string;

  @ManyToOne(() => Apps, (apps) => apps.categories)
  @JoinColumn({ name: 'app_id' })
  app?: Apps;

  @OneToMany(() => Wallpapers, (wallpapers) => wallpapers.category)
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
