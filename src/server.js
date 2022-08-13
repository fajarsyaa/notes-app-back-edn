const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {
    const Server = Hapi.server({
        port : 5000,

        // kondisi digunakan untuk membedakan server dijalanakn di local pc / internet
        host : process.env.NODE_ENV !== 'production'  ? 'localhost' : '0.0.0.0', 
        
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