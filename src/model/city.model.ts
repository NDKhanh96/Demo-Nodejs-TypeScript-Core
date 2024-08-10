import { BaseModel } from 'src/model/base.model';
import type { CityDAO } from 'src/types';

export class CityModel extends BaseModel {
    async getAll(): Promise<CityDAO[]> {
        const sql = 'SELECT * FROM city';

        return await this.query(sql);
    }

    async getCityById(id: number): Promise<CityDAO[]> {
        const sql = `SELECT * FROM city WHERE id = ${id}`;

        return await this.query(sql);
    }

    async createCity(city: CityDAO): Promise<CityDAO[]> {
        const sql = `INSERT INTO city (name, description) VALUES ('${city.name}')`;

        return await this.query(sql);
    }

    async updateCity(id: number, city: CityDAO): Promise<CityDAO[]> {
        const sql = `UPDATE city SET name = '${city.name}' WHERE id = ${id}`;

        return await this.query(sql);
    }

    async deleteCity(id: number): Promise<CityDAO[]> {
        const sql = `DELETE FROM city WHERE id = ${id}`;

        return await this.query(sql);
    }
}
