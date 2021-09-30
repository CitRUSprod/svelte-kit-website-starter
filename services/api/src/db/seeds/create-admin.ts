import { Seeder, Factory } from "typeorm-seeding"
import { Role } from "$/enums"
import { User } from "../entities"

export default class CreateAdmin implements Seeder {
    // eslint-disable-next-line class-methods-use-this
    public async run(factory: Factory) {
        await factory(User)().create({
            email: "admin@example.com",
            username: "Admin",
            password: "admin123",
            role: Role.Admin,
            verified: true
        })
    }
}
