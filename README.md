# nucleus-gateway

nucleus-gateway is a node command line interface (CLI) which is a reverse proxy server.

nucleus-gateway  **requires**  `gateway-config.yaml` or `gateway-config.json` as an input in the cli.

[![NPM version](https://badge.fury.io/js/nucleus-gateway.svg)](https://npm.pkg.github.com/nucleus-gateway)


# Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):
## Installing scoped packages globally

Create a `.npmrc` file in the system root directory and configure as below with the auth token to install any scoped global dependency.  

```bash
registry=https://registry.npmjs.org/
@byjus-orders:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<XXXXXXXXXX>
```

**Note** if the `.npmrc` file is omitted, npm will instead attempt to install from https://registry.npmjs.org 


```bash
npm install -g @byjus-orders/nucleus-gateway
```

And nucleus-gateway will be installed globally to your system path.

## Installing scoped packages as development dependency

You can also install nucleus-gateway as a development dependency:

```bash
npm install --save-dev @byjus-orders/nucleus-gateway
```

With a local installation, nucleus-gateway will not be available in your system path or you can't use it directly from the command line. Instead, the local installation of nucleus-gateway can be run by calling it from within an npm script such as `npm start` (example : `"gateway": "nucleus-gateway -f ../gateway-config.yaml"`).

# Usage

![Alt text](./assets/demo_cli.gif)

Start nucleus-gateway with the below commands:

```bash
nucleus-gateway --file path/to/gateway-config.[yaml|json]
```

For CLI options, use the `--help` argument:

```bash
nucleus-gateway --help
```


# Configuration

Create a yaml file `gateway-config.yaml` in your file system and configure rules in the below format:

```yaml
http:
  port: 3000    

service-endpoints: 
  ums-service:
    path: '/nucleusapi/usermanagement/'  
    protocol: 'http'                     
    host: 'localhost'                    
    port: 9005                           
    changeOrigin: true                   

  oms-service:
    path: '/nucleusapi/ordermanagement/'
    protocol: 'https'
    host: 'dev-nucleus.byjusorders.com'
    changeOrigin: true        

policies:
  - proxy   

```

Create a json file `gateway-config.json` in your file system and configure rules in the below format:

```json
{
    "http": {
        "port": 3000
    },
    "service-endpoints": {
        "ums-service": {
            "path": "/nucleusapi/usermanagement/",
            "protocol": "http",
            "host": "localhost",
            "port": 9005,
            "changeOrigin": true
        },
        "oms-service": {
            "path": "/nucleusapi/ordermanagement/",
            "protocol": "https",
            "host": "dev-nucleus.byjusorders.com",
            "changeOrigin": true
        }
    },
    "policies": [
        "proxy"
    ]
}
```
# Documentation

## http

#### port (Number)

Gateway will listen for http requests on port.

## service-endpoints (object)

Register the services with the unique userdefined name in the order.

#### path (String)

Uri to match.

#### protocol (String)

Forward to protocol.                      

#### host (String)

Forward to host.

#### port (?String)

Forward to port (optional).


#### changeOrigin (Boolean)

Change the base origin


## policies (?Array)

Add policies to the gateway.

#### proxy (String)

Enable proxying.                      

#### log (String)

Enable logging.                      

### Placeholder strings

Name | Description
--- | ---
`[--file, -f]` | File path of the configuration file
`[--help]` | Show help
`[--version]` | Show version number