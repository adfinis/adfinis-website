export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        baseUrl: env("DO_SPACE_CDN_URL", "https://cdn.adfinis-staging.0x2.nl"),
        rootPath: env("DO_SPACE_DIRECTORY", "strapi-assets"),
        s3Options: {
          credentials: {
            accessKeyId: env("DO_SPACE_ACCESS_KEY"),
            secretAccessKey: env("DO_SPACE_SECRET_KEY"),
          },
          region: env("DO_SPACE_REGION"),
          endpoint: env("DO_SPACE_ENDPOINT"),
          params: {
            Bucket: env("DO_SPACE_BUCKET"),
            CacheControl: "public, max-age=31536000", // 1 year: 60*60*24*365 = 31536000
            ['Cache-Control']: "public, max-age=31536000", // 1 year: 60*60*24*365 = 31536000
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
