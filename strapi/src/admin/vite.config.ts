import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // const base = config.mode === 'production' ? `/strapi${config.base}` : config.base;
  const newConfig = mergeConfig(config, {
    base: '/strapi/admin',
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
  // Important: always return the modified config
  return newConfig;
};
