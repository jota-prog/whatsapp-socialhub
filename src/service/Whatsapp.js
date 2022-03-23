class Whatsapp {

    constructor(clientId) {
        const {Client, LocalAuth} = require('whatsapp-web.js')
        const client = new Client({
            authStrategy: new LocalAuth({
                clientId: clientId
            })
        })
        client.initialize();
    }
    

    Auth() {

    }
}

export default Whatsapp;