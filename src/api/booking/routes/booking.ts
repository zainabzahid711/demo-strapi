/**
 * booking router
 */
export default {
  routes: [
    {
      method: "GET",
      path: "/bookings/forecast",
      handler: "booking.getForecast",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
        query: {
          roomId: { type: "string", required: true },
        },
      },
    },
    {
      method: "GET",
      path: "/bookings", // Becomes /api/bookings
      handler: "booking.find", // Uses Strapi's default find method
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/bookings",
      handler: "booking.create",
      config: {
        /* ... */
      },
    },
  ],
};
