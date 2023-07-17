export default () => {
  const env = process.env.ENV;
  if (env == 'dev') {
    return {
      port: 3000,
      database: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'wallpapers',
        synchronize: true,
        logging: true,
        type: 'mysql',
      },
      api_key: 'f4371ab7-2a36-4fe1-9d9f-7e309c30aaf6',
    };
  } else {
    return {
      port: 3000,
      database: {
        host: '50.63.27.58',
        port: 3306,
        user: 'wallpapers_apps',
        password: 'k7pt-[l*XI;V',
        database: 'wallpapers-apps',
        synchronize: false,
        logging: false,
        type: 'mysql',
      },
      api_key: 'f4371ab7-2a36-4fe1-9d9f-7e309c30aaf6',
    };
  }
};
