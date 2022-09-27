const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const entitiesPath = isProduction ? 'build/models/entity/**/*.js' : 'src/models/entity/**/*.ts';
const database = isProduction ? 'magic' : 'template';

module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '19981020',
    database: database,
    synchronize: true,
    logging: false,
    entities: [entitiesPath],
    migrations: ['src/models/migration/**/*.ts'],
    subscribers: ['src/models/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/models/entity',
        migrationsDir: 'src/models/migration',
        subscribersDir: 'src/models/subscriber'
    }
};
