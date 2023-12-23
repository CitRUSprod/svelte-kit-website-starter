import { $Enums } from "@prisma/client"
import { checkPrismaEnum } from "./_utils"

export enum Permission {
    DeleteOtherUserPost = "DeleteOtherUserPost",
    BanUser = "BanUser",
    CreateRole = "CreateRole",
    GetOtherUserEmail = "GetOtherUserEmail",
    AssignRole = "AssignRole"
}

checkPrismaEnum("Permission", $Enums.Permission, Permission)
