# nucleus-gateway-cli

### nucleus-gateway-cli is a zero code reverse proxy server embeded as a cli to ace the local development. 


[![NPM version](https://badge.fury.io/js/nucleus-gateway-cli.svg)](https://registry.npmjs.org/nucleus-gateway-cli)


# Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):
## Installing packages globally

```bash
npm install -g nucleus-gateway-cli
```

nucleus-gateway-cli will be installed globally to your system path.


# Usage

![Alt text](./assets/demo_cli.gif)

Start nucleus-gateway-cli with the below commands:

```bash
nucleus-gateway-cli --file path/to/gateway-config.[yaml|json]
```

Execute nucleus-gateway-cli with npx commands:

```bash
npx nucleus-gateway-cli --file path/to/gateway-config.[yaml|json]
```

For CLI options, use the `--help` argument:

```bash
nucleus-gateway-cli --help
```


# Configuration

**Warning** : nucleus-gateway-cli **requires**  `gateway-config.yaml` or `gateway-config.json` as an input to the cli.

Create a yaml file `gateway-config.yaml` in your file system and configure rules in the below format:

```yaml
http:
  port: 3000    

service-endpoints: 
  payment-service:
    path: '/api/payment/'  
    protocol: 'http'                     
    host: 'localhost'                    
    port: 9005                           
    changeOrigin: true                   

  order-service:
    path: '/api/order/'
    protocol: 'https'
    host: 'order.foo.com'
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
        "payment-service": {
            "path": "/api/payment/",
            "protocol": "http",
            "host": "localhost",
            "port": 9005,
            "changeOrigin": true
        },
        "order-service": {
            "path": "/api/order/",
            "protocol": "https",
            "host": "order.foo.com",
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