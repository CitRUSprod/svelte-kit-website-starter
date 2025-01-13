// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from "lodash-es"
import * as constantsEnums from "@local/constants/enums"

export function match(param: string) {
    const oAuthProvider = _.upperFirst(_.camelCase(param))
    return Object.values(constantsEnums.OAuthProvider).includes(oAuthProvider)
}
