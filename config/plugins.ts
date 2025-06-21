module.exports = ({ env }) => ({
  // Email designer plugin (optional)
  "email-designer": {
    enabled: true,
    config: {
      editor: {
        tools: {
          heading: true,
          text: true,
          button: true,
          divider: true,
        },
        options: {
          features: {
            colorPicker: {
              presets: ["#D9E3F0", "#F47373", "#697689", "#37D67A"],
            },
          },
          fonts: {
            showDefaultFonts: true,
          },
        },
        appearance: {
          theme: "dark",
          panels: {
            tools: {
              dock: "left",
            },
          },
        },
      },
      // Design your emails here or use the Strapi admin panel
      templates: [
        {
          name: "booking-confirmation",
          subject: "Your booking has been confirmed!",
          body: `<p>Dear {{= username }},</p>
                <p>Your booking for {{= bookingDetails }} has been confirmed.</p>
                <p>Thank you for choosing us!</p>`,
        },
      ],
    },
  },

  // Email provider configuration
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 587),
        auth: {
          user: env("SMTP_USERNAME", "zynabzahid877@gmail.com"),
          pass: env("SMTP_PASSWORD", "epic zpgw dlsa nytl"),
        },
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        tls: {
          rejectUnauthorized: false,
        },
      },
      settings: {
        defaultFrom: "no-reply@azureStay.com",
        defaultReplyTo: env("EMAIL_FROM", "zynabzahid877@gmail.com"),
      },
    },
  },
});
