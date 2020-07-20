module.exports = {
    //HOST: "172.20.0.2",
    HOST: "localhost",
    USER: "dev1",
    PASSWORD: "dev1",
    DB: "ofo_dev",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
