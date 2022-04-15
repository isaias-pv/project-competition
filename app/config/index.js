
const APP_PORT = process.env.APP_PORT;
const APP_URLS = process.env.APP_URLS;
const APP_NAME = process.env.APP_NAME;
const APP_MODB = process.env.MONGOCNN;

const PATHS = {
  user: APP_URLS + '/user',
  auth: APP_URLS + '/auth'
}

module.exports = {
  APP_NAME,
  APP_PORT,
  APP_URLS,
  APP_MODB,
  PATHS
}