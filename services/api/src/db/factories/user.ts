import { define } from "typeorm-seeding"
import { Role } from "$/enums"
import { User } from "../entities"

define(User, faker => {
    const user = new User()
    user.email = faker.internet.email().toLowerCase()
    user.username = faker.internet.userName()
    user.password = "12345678"
    user.role = Role.User

    return user
})
