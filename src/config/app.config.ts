export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  baseURL: process.env.BASE_URL,
});
