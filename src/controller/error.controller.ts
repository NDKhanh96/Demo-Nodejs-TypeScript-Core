import type { IncomingMessage, ServerResponse } from 'node:http';
import { join } from 'node:path';
import { BaseController } from 'src/controller/base.controller';

export class ErrorController extends BaseController {
    constructor() {
        super();
        /**
         * Do không dùng arrow function, nên phải bind this để sử dụng được các method khác của class
         */
        this.handlerNotFound = this.handlerNotFound.bind(this);
        this.handlerError = this.handlerError.bind(this);
    }

    async handlerNotFound(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const htmlPath: string = join(__dirname, '../view/notfound.html');
        const html: string = await this.readFileData(htmlPath);

        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }

    async handlerError(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const htmlPath: string = join(__dirname, '../view/error.html');
        const html: string = await this.readFileData(htmlPath);

        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }
}
