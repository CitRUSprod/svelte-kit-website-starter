/* eslint-disable new-cap */

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate
} from "typeorm"
import { User } from "./user"

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    public id!: number

    @OneToOne(() => User)
    @JoinColumn()
    public author!: User

    @Column("varchar", { length: 255 })
    public title!: string

    @Column("text")
    public body!: string

    @Column("timestamptz")
    public creationDate!: Date

    @Column("timestamptz", { nullable: true })
    public editingDate!: Date | null

    @BeforeInsert()
    public setDefaultValues() {
        this.creationDate = new Date()
    }

    @BeforeUpdate()
    public updateEditedDate() {
        this.editingDate = new Date()
    }
}
