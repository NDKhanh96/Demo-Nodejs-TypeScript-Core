import { Client } from 'pg';

class Database {
    /**
     * Sử dụng Singleton Pattern để tạo ra một instance duy nhất của Database
     * việc này giúp chúng ta không tạo ra nhiều kết nối tới database mà chỉ sử dụng một kết nối duy nhất
     * tránh lỗi "Client has already been connected. You cannot reuse a client".
     */
    private static instance: Client;

    public static getInstance(): Client {
        if (!Database.instance) {
            Database.instance = new Client({
                host: 'localhost',
                user: 'postgres',
                port: 5432,
                password: '123456',
                database: 'homestay'
            });
            Database.instance.connect();
        }

        return Database.instance;
    }
}

export const database: Client = Database.getInstance();
