import { envs } from './config/index.js';
import { seedDatabase } from './db/seedDatabase.js';
import { Server } from './models/server.js';
import appRoutes from './routes/index.js';

(async () => {
    await main();
})();

async function main() {
    await seedDatabase();
    new Server({
        port: envs.PORT,
        routes: appRoutes,
    }).start();
}
