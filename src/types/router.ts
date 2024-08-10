import type { IncomingMessage, ServerResponse } from 'node:http';

export type Router = {
    [key: string]: RouteHandler;
};

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;
