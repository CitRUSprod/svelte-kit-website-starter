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
                        length: "64",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
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
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable("refresh-tokens")
        await queryRunner.dropTable("users")
    }
}
