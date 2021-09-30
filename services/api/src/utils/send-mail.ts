import nodemailer from "nodemailer"

const host = process.env.MAILER_HOST!
const port = parseInt(process.env.MAILER_PORT!)
const user = process.env.MAILER_USER!
const password = process.env.MAILER_PASSWORD!
const name = process.env.MAILER_NAME!

const mailer = nodemailer.createTransport(
    {
        host,
        port,
        secure: port === 465,
        auth: {
            user,
            pass: password
        }
    },
    {
        from: `${name} <${user}>`
    }
)

export function sendMail(to: string, subject: string, message: string) {
    return new Promise((resolve, reject) => {
        mailer.sendMail({ to, subject, html: message }, (err, info) => {
            if (err) {
                reject(err)
            } else {
                resolve(info)
            }
        })
    })
}
