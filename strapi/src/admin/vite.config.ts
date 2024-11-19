import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  console.log('MAU', {base})
  const base = config.mode === 'production' ? `/strapi${config.base}` : config.base;
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
