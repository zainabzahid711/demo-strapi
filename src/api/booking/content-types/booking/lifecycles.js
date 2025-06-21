module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // Use the correct field names from your content-type
    const { customer_email, customer_name, room, startDate, endDate } = result;

    try {
      await strapi.plugins["email"].services.email.send({
        to: customer_email,
        from: process.env.EMAIL_FROM,
        subject: "Booking Confirmed",
        text: `Hi ${customer_name}, your booking for ${room} from ${startDate} to ${endDate} is confirmed.`,
        html: `<p>Hi ${customer_name},</p>
              <p>Your booking for <strong>${room}</strong> from <strong>${startDate}</strong> to <strong>${endDate}</strong> is confirmed.</p>`,
      });
      console.log("Email sent successfully");
    } catch (err) {
      console.error("Error sending email:", err);
    }
  },
};
