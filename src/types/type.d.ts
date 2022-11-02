
type IProxyService = {
    [service: string]: {
        path: string,
        protocol: string,
        host: string,
        port?: number,
        changeOrigin: boolean
    }
}


type IReverseProxyMapper = {
    http: Required<Http>;
    [serviceEndpoints: string]: IProxyService;
    policies?: string[];
}

type Http = {
    port: number;
}
