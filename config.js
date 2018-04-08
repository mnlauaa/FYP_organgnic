const config = {
    PORT: 3000,
    JWT_SECRET_KEY: '{dkuTLU~nQ_A)eV',
    database: {
        database: 'fyp_organgnic',
        user: 'root',
        password: 'root1234',
        host: 'localhost'
    },
    USER_IDENTITY: {
        BUYER: 0,
        SELLER: 1
    },
    ORDER_STATUS: {
        SHOPPING_CART: 0
    },
    SERVER: {
        IP: 'vml1wk037.cse.ust.hk:3000/'
        // IP: 'http://localhost:3000/'
    }

}

module.exports = config