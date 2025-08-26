export default {
  /**
   * @see https://docs.strapi.io/cms/backend-customization/models#declarative-and-programmatic-usage
   */
  beforeCreate(event) {
    const { data } = event.params;
    data.publication_date ??= new Date();
  },

  // afterCreate(event) {
  //   const { result, params } = event;

  //   // do something to the result;
  // },
};
