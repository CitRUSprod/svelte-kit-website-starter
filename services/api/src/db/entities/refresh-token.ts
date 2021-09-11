/* eslint-disable new-cap */

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./user"

@Entity("refresh-tokens")
export class RefreshToken {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column("varchar", { length: 255 })
    public token!: string

    @OneToOne(() => User)
    @JoinColumn()
    public user!: User
}
