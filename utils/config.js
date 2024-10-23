const { BEARER_TOKEN = "token-backup-my-is-this" } = process.env;
const { JWT_SECRET = "this-is-my-backup-secret" } = process.env;

module.exports = { BEARER_TOKEN, JWT_SECRET };
