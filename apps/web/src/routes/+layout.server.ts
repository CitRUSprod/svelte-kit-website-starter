export function load(e) {
    return {
        locale: e.locals.locale,
        tz: e.locals.tz,
        user: e.locals.user
    }
}
