import { readFile } from 'fs';
import type { IncomingMessage, ServerResponse } from 'node:http';

export class BaseController {
    notImplementedNotGetMethod(req: IncomingMessage, res: ServerResponse): void {
        if (req.method !== 'GET') {
            res.writeHead(501, { 'Content-Type': 'text/plain' });
            res.write('Not Implemented');
            res.end();

            return;
        }
    }

    async getHtml(req: IncomingMessage, res: ServerResponse, htmlPath: string): Promise<string> {
        const html: string | undefined = await this.readFileData(htmlPath);

        if (!html) {
            res.writeHead(404, { location: '/error' });
            res.write('HTML not found');
            res.end();
        }

        return html;
    }

    async readFileData(filePath: string): Promise<string> {
        return new Promise<string> ((resolve: (value: string) => void, reject: (reason: string) => void): void => {
            readFile(filePath, 'utf-8', (err: NodeJS.ErrnoException | null, data: string): void => {
                if (err) {
                    reject(err.message);
                }

                resolve(data);
            });
        });
    }
}
