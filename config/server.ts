export default ({
  env,
}: {
  env: (key: string, defaultValue?: string) => string;
}) => ({
  host: env("HOST", "0.0.0.0"),
  port: parseInt(env("PORT", "1337"), 10), // Use parseInt for int conversion
  app: {
    keys: env("APP_KEYS", "").split(","), // Assuming APP_KEYS is a comma-separated string
  },
});
