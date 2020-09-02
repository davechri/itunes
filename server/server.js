'use strict'

const express = require('express')
const proxy = require('express-http-proxy')
const fetch = require('node-fetch')
const fs = require('fs')
const os = require('os')
var URL = require('url').URL;

const app = express();

require('dotenv').config({path:`${process.cwd()}/.env`}); // read .env file

// Get the iTunes search URL
let url;
try {
    url = new URL(process.env.ITUNES_URL);
}
catch(e) {
    console.error('Invalid URL: '+process.env.ITUNES_URL, e);
    return;
}

// When deployed locally, disable certificate verification
if(url.host.includes('localhost')) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

if(process.env.ITUNES_URL === undefined || process.env.ITUNES_URL.length === 0) {
    console.error('The ITUNES_URL variable is not defined in the .env file.');
    return;
}

const host = url.protocol+'//'+url.host;

// in production, the client react app is served here
app.use(express.static(`${process.cwd()}/client/build`));

// proxy to iTunes service
app.use('/', proxy(host, {
  proxyReqPathResolver: function(req) {
      const path = url.href + req.url;
      console.log('proxy:', host, path);
      return path;
  },
  proxyReqOptDecorator: addRequestHeaders,
  userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
      let data = JSON.parse(proxyResData.toString('utf8'));
      console.log(data);
      return JSON.stringify(data);
  }
})
);

async function addRequestHeaders(proxyReqOpts, srcReq) {
    //const bearToken = await TokenManager.getAuthHeader().catch((e) => {throw e;});
    // add authorization header, if needed
    proxyReqOpts.headers['Host'] = url.host;
    //proxyReqOpts.headers['Authorization'] = bearToken;
    //console.log(srcReq.url, proxyReqOpts);
    return proxyReqOpts;
}

const port = process.env.PORT || 3001;
const server = app.listen(port, async () => {
    console.log('Server listening on port ' + port);    

    console.log('iTunes API url: '+url.href);
    fetch(url.href)
    .then((res) => {
        if(res.ok) {
            res.json()
            .then((json) => {
                console.log('Successfully contacted iTunes search API');
            })
        }
        else {
          console.error(res.statusText);
          server.close();
        }
    })
    .catch((e) => {
      console.error(e);
      server.close();
    })
})