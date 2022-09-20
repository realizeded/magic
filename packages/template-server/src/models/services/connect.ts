import { getConnection } from 'typeorm';
import { Connection, createConnection } from 'typeorm';



class Sql {
    connect: Connection;
    async creatConnect() {
        const connect = await createConnection();
        this.connect = connect;
        console.log(`mysql ---- connected-----${connect.name}`);
    }
    
    createQueryBuilder() {
        const connect = getConnection();
        if(!connect) {
            throw new Error('mysql is not connected');
        }
        return connect.createQueryBuilder();
    }
    

}


const createSqlInstance =  () => {
    const sql = new Sql();
    return sql;
}

export const templateSql = createSqlInstance();

