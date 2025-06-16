export default {
  routes: [
    {
      method: 'GET',
      path: '/pages/:slug(.*)',
      handler: 'api::page.page.findOne',
      config: {
        middlewares: [
          'global::populate-sections-with-intro-and-localizations'
        ]
      }
    },
  ]
}
