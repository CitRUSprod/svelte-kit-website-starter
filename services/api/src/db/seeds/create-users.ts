import { Seeder, Factory } from "typeorm-seeding"
import { User } from "../entities"

export default class CreateUsers implements Seeder {
    // eslint-disable-next-line class-methods-use-this
    public async run(factory: Factory) {
        await factory(User)().create()
    }
}
