import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose"

@modelOptions({ options: { customName: "User" } })
class User {
    @prop({ type: String, required: true })
    public username!: string

    @prop({ type: String, required: true })
    public email!: string

    @prop({ type: String, required: true })
    public password!: string

    @prop({ type: Boolean, default: false })
    public verified?: boolean
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UserModel = getModelForClass(User)
