import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {AppRole} from "../types";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  username!: string

  @Column()
  password!: string

  @Column({
    type: 'enum',
    enum: AppRole,
    default: AppRole.USER
  })
  role!: AppRole

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @DeleteDateColumn()
  deletedAt!: Date
}

export default User