/**
 * booking service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::booking.booking",
  ({ strapi }) => ({
    async createWithCode(data: any) {
      if (!data.confirmation_code) {
        data.confirmation_code = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
      }
      return await strapi.entityService.create("api::booking.booking", {
        data,
      });
    },

    // Optional: Extend other core service methods if needed
    async find(...args: any[]) {
      // Custom find implementation if needed
      return super.find(...args);
    },
  })
);
