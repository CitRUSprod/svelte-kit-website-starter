import { define, factory } from "typeorm-seeding"
import { User, Post } from "../entities"

define(Post, faker => {
    const post = new Post()
    post.author = factory(User)() as any
    post.title = faker.lorem.sentence()
    post.body = faker.lorem.paragraphs()

    return post
})
