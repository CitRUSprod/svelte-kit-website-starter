import * as constantsEnums from "@repo/constants/enums"
import * as _ from "lodash-es"

export function match(param: string) {
    const oAuthProvider = _.upperFirst(_.camelCase(param))
    return Object.values(constantsEnums.OAuthProvider).includes(oAuthProvider)
}
