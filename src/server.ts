import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { ErrorController } from 'src/controller/error.controller';
import { HomestayController } from 'src/controller/homestay.controller';
import type { RouteHandler, Router } from 'src/types';
import { HandlerTabIcon } from 'src/utilities/handlerTabIcon';
import url from 'url';


const PORT: number = Number(process.env.PORT);

if (!PORT) {
    console.error('Hãy cung cấp biến môi trường PORT trong file .env, PORT phải là một số');
    process.exit(2);
}

const homestayController: HomestayController = new HomestayController();
const errorController: ErrorController = new ErrorController();

const router: Router = {
    '/favicon.ico': HandlerTabIcon.handleTabIcon,
    '/': homestayController.getListHomestayPage,
    '/detail': homestayController.getDetailPage,
    '/add': homestayController.addHomestay,
    '/update': homestayController.updateHomestay,
    '/delete': homestayController.deleteHomestay,
    '/notfound': errorController.handlerNotFound,
    '/error': errorController.handlerError,
};

const server: Server = createServer((req: IncomingMessage, res: ServerResponse): void => {
    /**
     * Nếu req.url không tồn tại, thì sẽ điều hướng về trang /error
     */
    const path: string | null = req.url ? url.parse(req.url, true).pathname : '/error';

    /**
     * Nếu pathname = null thì sẽ điều hướng về trang /
     */
    const chosenUrl: string = path ? path : '/';

    /**
     * Nếu url chưa được đinh nghĩa trên router, thì sẽ điều hướng về trang /notfound
     */
    const chosenRouter: RouteHandler = router[chosenUrl] ? router[chosenUrl] : router['/notfound'];

    chosenRouter(req, res)
        .catch((error: unknown): void => {
            if (error instanceof Error) {
                console.error('Chosen router error:', error.message);
            }
        });
});

server.listen(PORT, '127.0.0.1', (): void => {
    console.clear();
    console.warn(`Listening on 127.0.0.1:${PORT}`);
});
