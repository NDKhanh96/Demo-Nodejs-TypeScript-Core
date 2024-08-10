import type { IncomingMessage, ServerResponse } from 'node:http';



export class HandlerTabIcon {
    /**
     * Not implemented
     * @param req 
     * @param res 
     */
    static async handleTabIcon(req: IncomingMessage, res: ServerResponse): Promise<void> {
        res.writeHead(204);
        res.end();
    }
}
