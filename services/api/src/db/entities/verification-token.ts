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
    return new Date(Date.now() + TokenTtl.Verification * 1000)
}

@Entity("verification-tokens")
export class VerificationToken {
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
        const verificationTokensRepository = getRepository(VerificationToken)
        const verificationTokens = await verificationTokensRepository.find({
            expirationDate: LessThan(new Date())
        })
        await verificationTokensRepository.remove(verificationTokens)
    }

    @BeforeUpdate()
    public updateExpiredDate() {
        this.expirationDate = getExpirationDate()
    }
}
