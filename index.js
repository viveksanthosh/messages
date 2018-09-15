const app = require('./build/server').default;
const serverless = require('serverless-http');
module.exports.handler = serverless(app);
//app.listen(4000)