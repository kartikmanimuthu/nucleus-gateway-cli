import express, { Request, Response } from 'express';
import { createProxyMiddleware as proxy } from 'http-proxy-middleware';

import logger from './logger';
import { configs } from './config';

export function bootstrapProxyServer({ http, policies, serviceEndpoints }: IReverseProxyMapper): [() => void, () => void] {
    const app = express();

    app.get('/healthcheck', (_: Request, res: Response) => {
        res.send(`${configs.commandLineInterface} healthcheck status ok.`);
    })

    const registerProxy = function () {
        const logSeverity = policies?.indexOf('log') !== -1 ? 'debug' : 'silent';
        const arr = [];
        for (const [_, service] of Object.entries(serviceEndpoints)) {
            if (service.path && service.protocol && service.host) {
                const host = service.port ? `${service.protocol}://${service.host}:${service.port}` : `${service.protocol}://${service.host}`;
                app.use(service.path, proxy({ target: host, changeOrigin: service.changeOrigin, logLevel: logSeverity }));
                arr.push({
                    path: `${service.path}`,
                    proxy: `${host}`
                });
            }
        }
        logger.table(arr);
    }

    const startServer = function () {
        app.listen(http.port, () => logger.info(configs.console.color.green, `${configs.console.emojis.world} ${configs.commandLineInterface}  ${configs.console.emojis.monitor}  is running on port ${http.port}  ${configs.console.emojis.plug} ${configs.console.emojis.smileyNerd}`));
    }

    return [registerProxy, startServer];
}
