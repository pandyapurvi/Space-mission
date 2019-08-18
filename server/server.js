'use strict';

const Hapi = require('@hapi/hapi');
const cors = require('cors');

const launches = require('./resources/launches.json');
const launchpads = require('./resources/launchpads.json');






const getLaunchesHandler = (req, resp) => {
  console.log('GET /launches');
  return resp(launches);
  
};

const getLaunchPadsHandler = (req, resp) => {
  console.log('GET /launchpads');
  return resp(launchpads);
};

const init = async () => {

    const server = Hapi.server({
        port: 8001,
        host: 'localhost',
        routes: {
          cors: true
        }

    });

    // server.use(cors());

    // server.use((req, res, next ) => {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   // res.header("Access-Control-Allow-Headers", "*");
    //   // if (req.method === 'OPTIONS') {
    //   //   res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //   //   return res.status(200).json({});
    //   // }
    //   // next();
    // });

    server.route({
        method: 'GET',
        path:'/launches',
        handler: (req, resp) => {

          return launches ;
        }

    });

    server.route({
      method: 'GET',
      path: '/launchpads',
      handler: (req, resp) => {

        return launchpads ;
      }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
