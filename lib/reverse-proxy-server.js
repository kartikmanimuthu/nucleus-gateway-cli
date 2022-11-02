"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapProxyServer = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const logger_1 = __importDefault(require("./logger"));
const config_1 = require("./config");
function bootstrapProxyServer({ http, policies, serviceEndpoints }) {
    const app = (0, express_1.default)();
    app.get('/healthcheck', (_, res) => {
        res.send(`${config_1.configs.commandLineInterface} healthcheck status ok.`);
    });
    const registerProxy = function () {
        const logSeverity = (policies === null || policies === void 0 ? void 0 : policies.indexOf('log')) !== -1 ? 'debug' : 'silent';
        const arr = [];
        for (const [_, service] of Object.entries(serviceEndpoints)) {
            if (service.path && service.protocol && service.host) {
                const host = service.port ? `${service.protocol}://${service.host}:${service.port}` : `${service.protocol}://${service.host}`;
                app.use(service.path, (0, http_proxy_middleware_1.createProxyMiddleware)({ target: host, changeOrigin: service.changeOrigin, logLevel: logSeverity }));
                arr.push({
                    path: `${service.path}`,
                    proxy: `${host}`
                });
            }
        }
        logger_1.default.table(arr);
    };
    const startServer = function () {
        app.listen(http.port, () => logger_1.default.info(config_1.configs.console.color.green, `${config_1.configs.console.emojis.world} ${config_1.configs.commandLineInterface}  ${config_1.configs.console.emojis.monitor}  is running on port ${http.port}  ${config_1.configs.console.emojis.plug} ${config_1.configs.console.emojis.smileyNerd}`));
    };
    return [registerProxy, startServer];
}
exports.bootstrapProxyServer = bootstrapProxyServer;
//# sourceMappingURL=reverse-proxy-server.js.map