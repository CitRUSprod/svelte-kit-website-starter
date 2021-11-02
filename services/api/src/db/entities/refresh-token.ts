/* eslint-disable new-cap */

import {
    getRepository,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    LessThan,
    BeforeInsert,
    BeforeUpdate
} from "typeorm"
import { TokenTtl } from "$/enums"
import { User } from "./user"

function getExpirationDate() {
    return new Date(Date.now() + TokenTtl.Refresh * 1000)
}

@Entity("refresh-tokens")
export class RefreshToken {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column("varchar", { unique: true, length: 255 })
    public token!: string

    @OneToOne(() => User)
    @JoinColumn()
    public user!: User

    @Column("timestamptz")
    public expirationDate!: Date

    @BeforeInsert()
    public setDefaultValues() {
        this.expirationDate = getExpirationDate()
    }

    // eslint-disable-next-line class-methods-use-this
    @BeforeInsert()
    public async removeExpiredTokens() {
        const refreshTokensRepository = getRepository(RefreshToken)
        const refreshTokens = await refreshTokensRepository.find({
            expirationDate: LessThan(new Date())
        })
        await refreshTokensRepository.remove(refreshTokens)
    }

    @BeforeUpdate()
    public updateExpiredDate() {
        this.expirationDate = getExpirationDate()
    }
}
