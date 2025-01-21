const fs = require("node:fs")
const path = require("node:path")

const types = {
    feat: "A new feature",
    fix: "A bug fix",
    docs: "Documentation only changes",
    style: "Changes that do not affect the meaning of the code",
    refactor: "A code change that neither fixes a bug nor adds a feature",
    perf: "A code change that improves performance",
    test: "Adding missing tests or correcting existing tests",
    build: "Changes that affect the build system or external dependencies",
    ci: "Changes to our CI configuration files and scripts",
    chore: "Other changes that don't modify src or test files",
    revert: "Reverts a previous commit"
}

function getRootPath(...pathParts) {
    return path.join(__dirname, "../..", ...pathParts)
}

function getScopes(...pathParts) {
    const scopesPath = getRootPath(...pathParts)

    if (fs.existsSync(scopesPath)) {
        const filesAndFolders = fs.readdirSync(scopesPath)
        const scopes = filesAndFolders.filter(item => {
            const p = getRootPath(...pathParts, item)
            return fs.statSync(p).isDirectory()
        })
        return scopes
    }

    return []
}

module.exports = { types, getScopes }
