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
    return new Date(Date.now() + TokenTtl.Reset * 1000)
}

@Entity("reset-tokens")
export class ResetToken {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column("varchar", { unique: true, length: 36 })
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

    @BeforeInsert()
    // eslint-disable-next-line class-methods-use-this
    public async removeExpiredTokens() {
        const resetTokensRepository = getRepository(ResetToken)
        const resetTokens = await resetTokensRepository.find({
            expirationDate: LessThan(new Date())
        })
        await resetTokensRepository.remove(resetTokens)
    }

    @BeforeUpdate()
    public updateExpiredDate() {
        this.expirationDate = getExpirationDate()
    }
}
