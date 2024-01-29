"use strict";

/**
 * donor controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

async function loadUserDetails(ctx) {
  const id = ctx.state.user?.id;
  if (id === undefined) return undefined;
  return await strapi.db.query("plugin::users-permissions.user").findOne({
    where: { id },
    populate: ["organisation"],
  });
}

module.exports = createCoreController("api::donor.donor", {
  async find(ctx) {
    const user = await loadUserDetails(ctx);

    if (!user) return ctx.unauthorized("You are not logged in");
    if (!user.organisation)
      return ctx.unauthorized("You are not assigned to an organisation");
    ctx.query.filters = {
      // @ts-ignore
      $and: [
        ctx.query.filters || {},
        {
          organisation: user.organisation.id,
        },
      ],
    };
    const result = await super.find(ctx);
    return result;
  },
});
