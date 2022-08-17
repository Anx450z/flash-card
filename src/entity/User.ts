import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm'
import { Length, IsEmail } from 'class-validator'
import { Flash } from './Flash'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true,
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

  @Column({ nullable: true, unique: true })
  googleId: string

  @Column({ nullable: true, unique: true })
  twitterId: string

  @Column({ nullable: true, unique: true })
  githubId: string

  @OneToMany(() => Flash, flash => flash.client)
  flashes: Flash[]
}
