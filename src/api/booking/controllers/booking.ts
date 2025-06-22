import { factories } from "@strapi/strapi";

import axios from "axios";

interface ForecastItem {
  date: string;
  demand: number;
  confidence_min?: number;
  confidence_max?: number;
}

interface ForecastResponse {
  room_type: string;
  forecast?: ForecastItem[];
}

export default factories.createCoreController(
  "api::booking.booking",
  ({ strapi }) => ({
    async getForecast(ctx) {
      try {
        const { roomId } = ctx.query;

        // 1. Validation
        if (!roomId) {
          return ctx.badRequest("roomId is required");
        }

        // 2. Get room details
        const room = await strapi.entityService.findOne(
          "api::room.room",
          roomId as string, // Cast to string since query params can be string|string[]|undefined
          { fields: "id, room_type, name" }
        );

        if (!room) {
          return ctx.notFound("Room not found");
        }

        // 3. Get bookings for this room
        const bookings = await strapi.entityService.findMany(
          "api::booking.booking",
          {
            filters: { room: roomId },
            fields: ["startDate", "endDate"],
          }
        );

        // 4. Prepare date ranges in ISO format (YYYY-MM-DD)
        const bookingDates = bookings.flatMap((booking: any) => {
          const dates: string[] = [];
          let current = new Date(booking.startDate);
          const end = new Date(booking.endDate);
          while (current <= end) {
            dates.push(current.toISOString().split("T")[0]);
            current.setDate(current.getDate() + 1);
          }
          return dates;
        });

        // 5. Call AI Service with proper error handling
        const aiServiceUrl = "http://localhost:8002/demand/forecast";
        const requestBody = {
          room_type:
            (room as any).room_type || (room as any).name.toLowerCase(), // Prefer room_type if available
          booking_dates: bookingDates,
        };

        console.log("Sending to AI service:", {
          url: aiServiceUrl,
          body: requestBody,
        });

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        try {
          const response = await axios
            .post("http://127.0.0.1:8002/demand/forecast", requestBody, {
              timeout: 5000,
            })
            .catch((err) => {
              console.error("AXIOS ERROR:", err.message, err.response?.data);
              throw err;
            });

          // if (!response.ok) {
          //   const errorData = await response.json().catch(() => ({}));
          //   throw new Error(
          //     `AI service error: ${response.status} - ${
          //       (errorData as any).message || response.statusText
          //     }`
          //   );
          // }

          const { forecast } = response.data;

          // 6. Transform response to match frontend expectations
          return forecast
            ? forecast.map((item) => ({
                date: item.date,
                demand: typeof item.demand === "number" ? item.demand : 0,
              }))
            : [];
        } finally {
          clearTimeout(timeout);
        }
      } catch (err: any) {
        console.error("Forecast error:", {
          message: err.message,
          code: err.code,
          syscall: err.syscall,
          address: err.address,
          port: err.port,
          stack: err.stack,
          roomId: ctx.query.roomId,
        });
        return ctx.internalServerError(`Forecast failed: ${err.message}`);
      }
    },
  })
);
