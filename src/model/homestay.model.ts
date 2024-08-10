import { BaseModel } from 'src/model/base.model';
import type { HomestayDAO, HomestayDTO, HomestayWithCity } from 'src/types';


export class HomestayModel extends BaseModel {
    async getAll(): Promise<HomestayWithCity[]> {
        const sql = `
            SELECT homestay.*, city.name as city_name
            FROM homestay
            JOIN city ON homestay.city_id = city.id
        `;

        return await this.query(sql);
    }

    async getHomestayById(id: number): Promise<HomestayWithCity[]> {
        const sql = `
            SELECT homestay.*, city.name as city_name
            FROM homestay
            JOIN city ON homestay.city_id = city.id
            WHERE homestay.id = ${id}
        `;

        return await this.query(sql);
    }

    async getHomestayByCity(city_id: number): Promise<HomestayDAO[]> {
        const sql = `SELECT * FROM homestay WHERE city_id = ${city_id}`;

        return await this.query(sql);
    }

    async createHomestay(homestay: HomestayDTO): Promise<HomestayDAO[]> {
        const sql = `INSERT INTO homestay (name, city_id, num_bedroom, price, num_bathroom, description) VALUES ('${homestay.name}', 
        ${homestay.city_id}, ${homestay.num_bedroom}, ${homestay.price}, ${homestay.num_bathroom}, '${homestay.description}')`;

        return await this.query(sql);
    }

    async updateHomestay(id: number, homestay: HomestayDTO): Promise<HomestayDAO[]> {
        const sql = `UPDATE homestay SET name = '${homestay.name}', city_id = ${homestay.city_id}, num_bedroom = ${homestay.num_bedroom}, 
        price = ${homestay.price}, num_bathroom = ${homestay.num_bathroom}, description = '${homestay.description}' WHERE id = ${id}`;

        return await this.query(sql);
    }

    async deleteHomestay(id: number): Promise<HomestayDAO[]> {
        const sql = `DELETE FROM homestay WHERE id = ${id}`;

        return await this.query(sql);
    }
}
