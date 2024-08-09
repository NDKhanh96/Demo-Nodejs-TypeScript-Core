import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';

const PORT: number = Number(process.env.PORT);

if (!PORT) {
    console.error('Please set PORT environment variable, PORT must be a number');
    process.exit(2);
}

const server: Server = createServer((req: IncomingMessage, res: ServerResponse): void => {
    console.log(req);
    console.log(res);
});

server.listen(PORT, '127.0.0.1', (): void => {
    console.clear();
    console.warn(`Listening on 127.0.0.1:${PORT}`);
});

