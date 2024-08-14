import type { IncomingMessage, ServerResponse } from 'node:http';
import { join } from 'node:path';
import type { ParsedUrlQuery } from 'node:querystring';
import querystring from 'node:querystring';
import { BaseController } from 'src/controller/base.controller';
import { CityModel } from 'src/model/city.model';
import { HomestayModel } from 'src/model/homestay.model';
import type { CityDAO, HomestayDTO, HomestayWithCity, ParsedAddHomestayDTO, ParsedUpdateHomestayDTO } from 'src/types';
import url from 'url';

export class HomestayController extends BaseController {
    homestayModel: HomestayModel;
    cityModel: CityModel;

    constructor() {
        super();
        this.homestayModel = new HomestayModel();
        this.cityModel = new CityModel();
        /**
         * Do không dùng arrow function, nên phải bind this để sử dụng được các method khác của class
         */
        this.getListHomestayPage = this.getListHomestayPage.bind(this);
        this.getDetailPage = this.getDetailPage.bind(this);
        this.addHomestay = this.addHomestay.bind(this);
        this.updateHomestay = this.updateHomestay.bind(this);
        this.deleteHomestay = this.deleteHomestay.bind(this);
    }

    async getListHomestayPage(req: IncomingMessage, res: ServerResponse): Promise<void> {
        this.notImplementedNotGetMethod(req, res);
        const homestayData: HomestayWithCity[] | void = await this.homestayModel.getAll().catch((error: string) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write(error);
            res.end();
        });

        if (!homestayData) {
            return;
        }
        let newHtml: string = '';

        homestayData.forEach((homestay: HomestayWithCity, index: number): void => {
            newHtml += '<tr>';
            newHtml += `<td>${index + 1}</td>`;
            newHtml += `<td><a href='/detail?id=${homestay.id}'>${homestay.name}</a></td>`;
            newHtml += `<td>${homestay.city_name}</td>`;
            newHtml += `<td>${homestay.price}</td>`;
            newHtml += `<td>
                <button class='btn btn-primary'><a href='/update?id=${homestay.id}' class="text-decoration-none" style="color: white;">Sửa</a></button>
                <button class='btn btn-danger'><a href='/delete?id=${homestay.id}' class="text-decoration-none" style="color: white;">Xóa</a></button>
                </td>`;
        });

        const htmlPath: string = join(__dirname, '../view/list.html');
        let html: string = await this.getHtml(req, res, htmlPath);

        html = html.replace('{list-homestay}', newHtml);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }

    async getDetailPage(req: IncomingMessage, res: ServerResponse): Promise<void> {
        this.notImplementedNotGetMethod(req, res);

        /**
         * Request trước khi đến controller, đã được xử lý bởi router để loại bỏ trường hợp req.url không tồn tại
         */
        const queryParams: ParsedUrlQuery = url.parse(req.url as string, true).query;

        if (!queryParams.id) {
            res.writeHead(422, { 'Content-Type': 'text/plain' });
            res.write('Id is required');
            res.end();

            return;
        }

        const data: HomestayWithCity[] | void = await this.homestayModel.getHomestayById(Number(queryParams.id)).catch((error: string) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write(error);
            res.end();
        });

        if (!data) {
            return;
        }

        if (data.length === 0) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('Homestay not found');
            res.end();

            return;
        }
        const { id, name, num_bedroom, num_bathroom, price, description, city_name } = data[0];
        const htmlPath: string = join(__dirname, '../view/detail.html');
        let html: string = await this.getHtml(req, res, htmlPath);
        let newHtml: string = '';

        newHtml += `<button class='btn btn-primary'><a href='/update?id=${id}'class="text-decoration-none" style="color: white;">Sửa</a></button>
            <button class='btn btn-danger'><a href='/delete?id=${id}'class="text-decoration-none" style="color: white;">Xóa</a></button>`;
        html = html.replace('{name1}', name);
        html = html.replace('{name2}', name);
        html = html.replace('{city}', city_name);
        html = html.replace('{num_bedroom}', num_bedroom.toString());
        html = html.replace('{num_bathroom}', num_bathroom.toString());
        html = html.replace('{price}', price.toString());
        html = html.replace('{description}', description);
        html = html.replace('{btn-content}', newHtml);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }

    async addHomestay(req: IncomingMessage, res: ServerResponse): Promise<void> {
        if (req.method === 'GET') {
            const htmlPath: string = join(__dirname, '../view/add.html');
            const listCity: CityDAO[] | void = await this.cityModel.getAll().catch((error: string) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write(error);
                res.end();
            });

            if (!listCity) {
                return;
            }
            let html: string = await this.getHtml(req, res, htmlPath);
            let newHtml: string = '';

            listCity.forEach((city: CityDAO): void => {
                newHtml += `<option value="${city.id}">${city.name}</option>`;
            });

            html = html.replace('{listCity}', newHtml);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
            res.end();
        }

        if (req.method === 'POST') {
            let data: string = '';

            req.on('data', (chunk: Buffer): string => data += chunk);
            req.on('end', async (): Promise<void> => {
                const dataParse: ParsedAddHomestayDTO = querystring.decode(data);
                const { name, city_id, num_bedroom, num_bathroom, price, description } = dataParse;
                const Homestay: HomestayDTO = {
                    name: name ?? '',
                    city_id: Number(city_id),
                    num_bedroom: Number(num_bedroom),
                    num_bathroom: Number(num_bathroom),
                    price: Number(price),
                    description: description ?? '',
                };

                this.homestayModel.createHomestay(Homestay)
                    .then((): void => {
                        res.writeHead(201, { location: '/' });
                        res.end();
                    })
                    .catch((error: unknown): void => {
                        let message: string = 'Error when create homestay';

                        if (error instanceof Error) {
                            message = error.message;
                        }

                        res.writeHead(422, { location: '/error' });
                        res.write(message);
                        res.end();
                    });
            });
            
        }
    }

    async updateHomestay(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const queryParams: ParsedUrlQuery = url.parse(req.url as string, true).query;

        if (queryParams.id && req.method === 'GET') {
            const listCity: CityDAO[] | void = await this.cityModel.getAll().catch((error: string) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write(error);
                res.end();
            });
            const data: HomestayWithCity[] | void = await this.homestayModel.getHomestayById(Number(queryParams.id)).catch((error: string) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write(error);
                res.end();
            });

            if (!listCity || !data) {
                return;
            }
            const { name, num_bedroom, num_bathroom, price, description, city_id, city_name } = data[0];
            const htmlPath: string = join(__dirname, '../view/update.html');
            let html: string = await this.getHtml(req, res, htmlPath);
            let newHtml: string = '';

            listCity.forEach((city: CityDAO): void => {
                newHtml += `<option value="${city.id}">${city.name}</option>`;
            });

            html = html.replace('{name}', `<label for="name" class="form-label">Tên</label>
            <input type="text" class="form-control" id="name" name="name" value = ${name}>`);
            html = html.replace('{city}', `<option value="${city_id}" selected>${city_name}</option>`);
            html = html.replace('{num_bedroom}', `<label for="num_bedroom" class="form-label">Số Phòng Ngủ</label>
            <input type="number" class="form-control" id="num_bedroom" name="num_bedroom" value = ${num_bedroom}>`);
            html = html.replace('{num_bathroom}', `<label for="num_bathroom" class="form-label">Số Phòng Vệ Sinh</label>
            <input type="number" class="form-control" id="num_bathroom" name="num_bathroom" value = ${num_bathroom}>`);
            html = html.replace('{price}', `<label for="price" class="form-label">Giá</label>
            <input type="number" class="form-control" id="price" name="price" value = ${price}>`);
            html = html.replace('{description}', `${description}`);
            html = html.replace('{listCity}', newHtml);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
            res.end();
        } 
        
        if (req.method === 'POST') {
            let data: string = '';

            req.on('data', (chunk: Buffer): string => data += chunk);
            req.on('end', async (): Promise<void> => {
                const dataParse: ParsedUpdateHomestayDTO = querystring.decode(data);
                const { name, city_id, num_bedroom, num_bathroom, price, description } = dataParse;
                const Homestay: HomestayDTO = {
                    name: name ?? '',
                    city_id: Number(city_id),
                    num_bedroom: Number(num_bedroom),
                    num_bathroom: Number(num_bathroom),
                    price: Number(price),
                    description: description ?? '',
                };

                this.homestayModel.updateHomestay(Number(queryParams.id), Homestay)
                    .then((): void => {
                        res.writeHead(301, { location: '/' });
                        res.end();
                    })
                    .catch((error: unknown): void => {
                        let message: string = 'Error when update homestay';

                        if (error instanceof Error) {
                            message = error.message;
                        }

                        res.writeHead(422, { location: '/error' });
                        res.write(message);
                        res.end();
                    });
            });
        }
    }

    async deleteHomestay(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const queryParams: ParsedUrlQuery = url.parse(req.url as string, true).query;

        if (req.method === 'GET') {
            const htmlPath: string = join(__dirname, '../view/delete.html');
            const html: string = await this.getHtml(req, res, htmlPath);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
            res.end();
        } 
        
        if (req.method === 'POST') {
            this.homestayModel.deleteHomestay(Number(queryParams.id))
                .then((): void => {
                    res.writeHead(301, { location: '/' });
                    res.end();
                })
                .catch((error: unknown): void => {
                    let message: string = 'Error when update homestay';

                    if (error instanceof Error) {
                        message = error.message;
                    }

                    res.writeHead(422, { location: '/error' });
                    res.write(message);
                    res.end();
                });
        }
    }
}
