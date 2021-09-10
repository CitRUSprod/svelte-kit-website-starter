/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1631300660485 implements MigrationInterface {
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
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable("users")
    }
}
