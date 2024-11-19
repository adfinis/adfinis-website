import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  const base = config.mode === 'production' ? `/strapi${config.base}` : config.base;
  console.log('MAU2', config)
  const newConfig = mergeConfig(config, {
    base,
    define: {
      'process.env': {
        ADMIN_PATH: '/strapi/admin',
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
  console.log('MAU4', newConfig)
  // Important: always return the modified config
  return newConfig;
};
