const ENV = import.meta.env;
export const env = {
  app_name: ENV.VITE_APP_NAME,
  base_url: ENV.VITE_BASE_URL,
};
