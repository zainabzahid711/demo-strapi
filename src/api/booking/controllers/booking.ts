import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::booking.booking",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        // Extract data from request
        const { data } = ctx.request.body;

        // Use our custom service
        const booking = await strapi
          .service("api::booking.booking")
          .createWithCode({
            ...data,
            status: data.status || "pending", // Default status
          });

        // Return created booking
        return this.transformResponse(booking);
      } catch (error) {
        ctx.throw(400, error.message);
      }
    },
  })
);
