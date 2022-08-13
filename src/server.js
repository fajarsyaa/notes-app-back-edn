const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {
    const Server = Hapi.server({
        port : 5000,
        host : 'localhost', 
        //  menangani same-origin-police ? caritau lebih lanjut di google
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    Server.route(routes);

    Server.start();
    console.log(`server berjalan di ${Server.info.uri}`);
}

init();