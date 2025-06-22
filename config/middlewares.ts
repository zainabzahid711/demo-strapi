module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": [
            "'self'",
            "http:",
            "https:",
            "http://localhost:8002", // Add your Python server
            "http://127.0.0.1:8002",
          ],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "http://localhost:1337", // Your local Strapi URL
            "https://your-strapi-domain.com", // Your production Strapi URL
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "http://localhost:1337",
            "https://your-strapi-domain.com",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:3000", // Local frontend
        "https://demo-project-gamma-tawny.vercel.app", // Your Vercel deployment
        "http://localhost:1337", // Strapi admin panel
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
