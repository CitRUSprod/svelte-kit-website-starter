/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTables1631300660485 implements MigrationInterface {
    public async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "64",
                        isUnique: true
                    },
                    {
                        name: "username",
                        type: "varchar",
                        length: "32",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "role",
                        type: "varchar",
                        length: "16"
                    },
                    {
                        name: "registrationDate",
                        type: "timestamp"
                    }
                ]
            })
        )
        await queryRunner.createTable(
            new Table({
                name: "refresh-tokens",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "token",
                        type: "varchar",
                        length: "255",
                        isUnique: true
                    },
                    {
                        name: "userId",
                        type: "int"
                    },
                    {
                        name: "expirationDate",
                        type: "timestamp"
                    }
                ],
                foreignKeys: [
                    {
                        referencedTableName: "users",
                        columnNames: ["userId"],
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
        await queryRunner.createTable(
            new Table({
                name: "posts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "authorId",
                        type: "int"
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "body",
                        type: "text"
                    },
                    {
                        name: "creationDate",
                        type: "timestamp"
                    },
                    {
                        name: "editingDate",
                        type: "timestamp"
                    }
                ],
                foreignKeys: [
                    {
                        referencedTableName: "users",
                        columnNames: ["authorId"],
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable("posts")
        await queryRunner.dropTable("refresh-tokens")
        await queryRunner.dropTable("users")
    }
}
