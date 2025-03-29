export default ({
  env,
}: {
  env: (key: string, defaultValue?: string) => string;
}) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  flags: {
    nps: env("FLAG_NPS", "true") === "true", // Manually convert to boolean
    promoteEE: env("FLAG_PROMOTE_EE", "true") === "true", // Manually convert to boolean
  },
});
