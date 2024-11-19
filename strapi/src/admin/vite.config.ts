import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  const base = config.mode === 'production' ? `/strapi${config.base}` : config.base;
  console.log('MAU', config)
  // Important: always return the modified config
  return mergeConfig(config, {
    base,
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};
