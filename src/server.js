import App from './App';
import React from 'react';
import { join } from 'path';
import express from 'express';
import { router, getState } from './api';
import { renderToString } from 'react-dom/server';
var bodyParser = require('body-parser')

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .use(bodyParser.json({ limit: '5mb' }))
  .disable('x-powered-by')
  .use('/api', router)
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/', (req, res) => {
    const context = {};
    let state = getState();
    const markup = renderToString(
      <App state={state} />
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Message Board</title>
        <script>
        navigator.serviceWorker.register('worker.js').then(e => console.log('registered')).catch(console.log)
        </script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
        }
        ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <script>
        window.__INITIAL_DATA__=${JSON.stringify(state)} 
        </script>
        <script>
        window.addEventListener('online', alert)
        window.addEventListener('offline', alert)
        </script>
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  })
  .get('/worker.js', (req, res) => {
      res.download('./src/worker.js')
  })
  .use('*', (req, res) => {
    let asset = req.originalUrl.substring(req.originalUrl.indexOf('/static'))
    asset = join('./build/public/', asset);
    res.download(asset)
  })

export default server;
