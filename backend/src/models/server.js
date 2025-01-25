import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import path from 'path';

export class Server {
    constructor(options) {
        const { port = 3100, routes } = options;

        this.app = express();
        this.port = port;
        this.routes = routes;

        this.middlewares();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    async start() {
        this.app.use(this.routes);

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        this.app.get('*', (_req, res) => {
            const indexPath = path.join(__dirname, '../../../public/index.html');
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}