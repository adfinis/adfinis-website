export default ({ env }) => ({
  proxy: true,
  url: `${env('APP_URL')}/custompath`,
  app: {
    keys: env.array('APP_KEYS')
  },
})
