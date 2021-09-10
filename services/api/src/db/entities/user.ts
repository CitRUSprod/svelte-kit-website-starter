/* eslint-disable new-cap */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column("varchar", { length: 64 })
    public email!: string

    @Column("varchar", { length: 64 })
    public username!: string

    @Column("varchar", { length: 255 })
    public password!: string
}
