export default ({ env }) => ({
  proxy: true,
  url: `${env('APP_URL')}/strapi`,
  app: {
    keys: env.array('APP_KEYS')
  },
})
