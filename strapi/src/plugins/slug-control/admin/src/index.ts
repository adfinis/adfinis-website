import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
    app.customFields.register({
      name: PLUGIN_ID,
      icon: PluginIcon,
      pluginId: PLUGIN_ID,
      type: "string",
      intlLabel: {
        id: `${PLUGIN_ID}.label`,
        defaultMessage: "Prefix slug",
      },
      intlDescription: {
        id: `${PLUGIN_ID}.description`,
        defaultMessage: "Prefix slug with locale and collection ID mapping",
      },
      components: {
        Input: async () => import ("./components/Input"),
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: `${PLUGIN_ID}.form.pattern`,
              defaultMessage: "Configure slug input fields",
            },
            items: [
              {
                intlLabel: {
                  id: `${PLUGIN_ID}.form.pattern.label`,
                  defaultMessage: "Slug base",
                },
                name: "options.pattern",
                type: "select",
                options: [
                  {
                    key: "title",
                    value: "title",
                    metadatas: {
                      intlLabel: {
                        id: `${PLUGIN_ID}.form.pattern.title`,
                        defaultMessage: "title",
                      },
                    },
                  },
                  {
                    key: "name",
                    value: "name",
                    metadatas: {
                      intlLabel: {
                        id: `${PLUGIN_ID}.form.pattern.name`,
                        defaultMessage: "name",
                      },
                    },
                  },
                ],
              },
              {
                intlLabel: {
                  id: `${PLUGIN_ID}.form.override.label`,
                  defaultMessage: "Slug override",
                },
                name: "options.override",
                type: "select",
                options: [
                  {
                    key: "metadata_title",
                    value: "metadata_title",
                    metadatas: {
                      intlLabel: {
                        id: `${PLUGIN_ID}.form.override.title`,
                        defaultMessage: "metadata_title",
                      },
                    },
                  },
                  {
                    key: "unique_slug",
                    value: "unique_slug",
                    metadatas: {
                      intlLabel: {
                        id: `${PLUGIN_ID}.form.override.name`,
                        defaultMessage: "unique_slug",
                      },
                    },
                  },
                ],
              },
            ],
          }
        ]
      }
    })

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
