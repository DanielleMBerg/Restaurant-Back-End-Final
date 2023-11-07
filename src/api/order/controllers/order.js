"use strict";
// @ts-ignore
const stripe = require('stripe')("sk_test_51Ny4msJrJfFtrOy8fWf746h86vAW1LmTmEaXA5Z7tO2KC58KHktPSwohHjS7rwGKAWl4w4UATz17YpCE0VXSD3ih00R6j9IBfC");

/**
 *  order controller
 */
const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You are not authorized!");
    }
    // @ts-ignore
    const body = JSON.parse(ctx.request.body);
    console.log(body);
    console.log(ctx.state.user.id);
    console.log("order controller");''

    const { address, amount, dishes, token, city, state } =
      body.data;

    try {
      // Charge the customer
      await stripe.charges.create({
        amount: amount * 100,
        currency: "usd",
        description: `Order ${new Date()} by ${ctx.state.user.id}`,
        source: token,
      });

      // Create the order
      const order = await strapi.service("api::order.order").create({
        data: {
          amount,
          address,
          dishes,
          city,
          state,
          token,
          user: ctx.state.user.id,
        },
      });
      return order;
    } catch (err) {
      // return 500 error
      console.log("err", err);
      ctx.response.status = 500;
      return {
        error: { message: "There was a problem creating the charge" },
        address,
        amount,
        dishes,
        token,
        city,
        state,
      };
    }
  },
}));