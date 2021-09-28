/* eslint-disable new-cap */

import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import argon2 from "argon2"
import { Role } from "$/enums"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column("varchar", { unique: true, length: 64 })
    public email!: string

    @Column("varchar", { unique: true, length: 32 })
    public username!: string

    @Column("varchar", { length: 255 })
    public password!: string

    @Column("varchar", { length: 16 })
    public role!: Role

    @Column("timestamp")
    public registrationDate!: Date

    @BeforeInsert()
    public async setDefaultValues() {
        this.password = await argon2.hash(this.password)
        this.role ??= Role.User
        this.registrationDate = new Date()
    }
}
