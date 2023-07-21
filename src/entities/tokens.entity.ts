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

@Entity('tbl_tokens')
export class Tokens {
  constructor(data?: Tokens) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  device_id?: string;

  @Column({ type: 'varchar' })
  token?: string;

  @ManyToOne(() => Apps, (apps) => apps.categories)
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
