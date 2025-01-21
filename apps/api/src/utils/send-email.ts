import mjml2html from "mjml"
import nodemailer from "nodemailer"

import { env } from "$/constants"
import { emailTemplates } from "$/email-templates"

const mailer = nodemailer.createTransport(
    {
        host: env.MAILER_HOST,
        port: env.MAILER_PORT,
        secure: env.MAILER_PORT === 465,
        auth: {
            user: env.MAILER_EMAIL,
            pass: env.MAILER_PASSWORD
        }
    },
    {
        from: `${env.MAILER_NAME} <${env.MAILER_EMAIL}>`
    }
)

export async function sendEmail(
    to: string,
    subject: string,
    templateName: keyof typeof emailTemplates,
    data: Record<string, string> = {}
) {
    const template = emailTemplates[templateName]
    const entries = [["subject", subject], ...Object.entries(data)]

    const compiledTemplate = entries.reduce(
        (acc, [key, value]) => acc.replace(new RegExp(`{{${key}}}`, "g"), value),
        template
    )

    const { html, errors } = mjml2html(compiledTemplate)

    if (errors.length > 0) {
        console.error("MJML compilation errors:", errors)
        throw new Error("Failed to compile email template")
    }

    await mailer.sendMail({ to, subject, html })
}
