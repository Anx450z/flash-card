import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'
import { Length, IsEmail } from 'class-validator'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  @Length(3, 15)
  userName: string

  @Column({})
  @Length(3, 20)
  firstName: string

  @Column({})
  @Length(3, 20)
  lastName: string

  @Index()
  @Column({
    unique: true,
  })
  @IsEmail()
  email: string

  @CreateDateColumn()
  createdOn: Date

  @UpdateDateColumn()
  updatedOn: Date

  @Column({
    default: false,
  })
  isAdmin: boolean

  @Column({
    nullable: true,
  })
  photo: string
}
