import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from './User'

export enum ColorTypes {
  WHITE = '#ffffff',
  YELLOW = '#fff1cc',
  BLUE = '#cce5ff',
  GREEN = '#dbffcc',
  RED = '#ffcccc',
}

@Entity('flash')
export class Flash extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'simple-json' })
  question: {
    initVector: string
    content: string
  }

  @Column({ type: 'simple-json' })
  answer: {
    initVector: string
    content: string
  }

  @Column({ default: 'default' })
  tag: string

  @Column({ type: 'enum', enum: ColorTypes, default: ColorTypes.WHITE })
  flashColor: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, user => user.flashes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User
}
