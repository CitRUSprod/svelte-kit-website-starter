import { define } from "typeorm-seeding"
import { Role } from "$/enums"
import { User } from "../entities"

define(User, () => {
    const user = new User()
    user.email = "admin@google.com"
    user.username = "Admin"
    user.password = "12345678"
    user.role = Role.Admin

    return user
})
