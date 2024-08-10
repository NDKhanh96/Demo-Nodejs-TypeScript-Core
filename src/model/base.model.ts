import type { QueryResult, QueryResultRow } from 'pg';
import { database } from 'src/model/database.model';

export class BaseModel {
    query<T extends QueryResultRow>(sql: string): Promise<T[]> {
        return new Promise((resolve: (value: T[]) => void, reject: (reason: string) => void): void => {
            database.query(sql, (error: Error, result: QueryResult<T>): void => {
                if (error) {
                    reject(error.message);
                }
                resolve(result.rows);
            });
        });
    }
}
