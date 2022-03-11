class Whatsapp {

    constructor(clientId) {
        const {Client, LocalAuth} = require('whatsapp-web.js')
        const client = new Client({
            authStrategy: new LocalAuth({
                clientId: clientId
            })
        })
    }

    Auth() {

    }
}

export default Whatsapp;