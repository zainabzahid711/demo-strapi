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
  ],
};
