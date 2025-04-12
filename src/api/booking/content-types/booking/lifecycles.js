"use strict";

module.exports = {
  async beforeCreate(event) {
    console.log("🔥🔥🔥 HOOK EXECUTION STARTED");
    try {
      const { data } = event.params;

      if (!data.confirmation_code) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        data.confirmation_code = code;
        console.log("✅✅✅ GENERATED CODE:", code);

        // Force the change to be recognized
        event.params.data = { ...event.params.data, confirmation_code: code };
      }
    } catch (error) {
      console.error("❌ HOOK ERROR:", error);
    }
  },
};
