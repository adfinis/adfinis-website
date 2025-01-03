"use strict";

const populate = {
  localizations: true,
  hero: {
    populate: '*'
  },
  intro: {
    populate: true,
  },
  sections: {
    populate: '*'
  }
};

module.exports = (config, {strapi}) => {
  return async (ctx, next) => {

    ctx.query = {
      populate,
    }

    return next();
  };
};
