import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  const base = config.mode === 'production' ? `/strapi${config.base}` : config.base;
  console.log('MAU2', config)
  const newConfig = mergeConfig(config, {
    base,
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
  console.log('MAU3', newConfig)
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
