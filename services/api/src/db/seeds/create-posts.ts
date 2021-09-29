import { Seeder, Factory } from "typeorm-seeding"
import { Post } from "../entities"

export default class CreatePosts implements Seeder {
    // eslint-disable-next-line class-methods-use-this
    public async run(factory: Factory) {
        await factory(Post)().createMany(30)
    }
}
