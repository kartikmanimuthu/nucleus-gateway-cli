# Nucleus Gateway CLI

**Nucleus Gateway CLI** is a versatile, code-free reverse proxy server tool encapsulated as a command-line interface (CLI), specifically tailored to enhance local microservices-based development environments.

Born out of a need to simplify the orchestration of multiple microservices, this CLI tool operates seamlessly in the background as a daemon, contributing to a clean and distraction-free workspace. It enhances usability by being service-agnostic, allowing flexibility across various service configurations.

The tool boosts productivity by handling the intricacies of traffic routing, allowing developers to concentrate on coding. Its implementation draws inspiration from Express Gateway, but with a more minimalistic design requiring less configuration. Incorporating CLI for Nucleus Gateway into your workflow will significantly streamline processes, reduce complexities, and bolster productivity. For developers navigating a microservices-based local setup, this tool is indispensable.

[![NPM version](https://badge.fury.io/js/nucleus-gateway-cli.svg)](https://registry.npmjs.org/nucleus-gateway-cli)

## Installation

The recommended method of installation is via npm, though cloning with git is also an option.

### Installing from Local Directory

To install Nucleus Gateway CLI from a local directory, navigate to the directory containing the package and use the following command:

```bash
cd path/to/nucleus-gateway-cli
npm install -g .
```

This command installs Nucleus Gateway CLI globally. After executing this command, `nucleus-gateway-cli` will be accessible globally from your system's path.

Replace `path/to/nucleus-gateway-cli` with the actual path to the directory containing the Nucleus Gateway CLI package.

## Usage

![CLI Demo](./assets/demo_cli.gif)

You can start `nucleus-gateway-cli` by executing the following command:

```bash
nucleus-gateway-cli --file path/to/gateway-config.[yaml|json]
```

To execute `nucleus-gateway-cli` with npx, use the following command:

```bash
npx nucleus-gateway-cli --file path/to/gateway-config.[yaml|json]
```

For additional CLI options, append the `--help` argument:

```bash
nucleus-gateway-cli --help
```

## Configuration

**Note:** Nucleus Gateway CLI **requires** a `gateway-config.yaml` or `gateway-config.json` input file.

To configure, create either a `gateway-config.yaml` or `gateway-config.json` file in your local file system and establish rules according to the examples provided below.

**YAML Example:**

```yaml
http:
  port: 3000

service-endpoints:
  payment-service:
    path: "/api/payment/"
    protocol: "http"
    host: "localhost"
    port: 9005
    changeOrigin: true

  order-service:
    path: "/api/order/"
    protocol: "https"
    host: "order.foo.com"
    changeOrigin: true

policies:
  - proxy
```

**JSON Example:**

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
  "policies": ["proxy"]
}
```

## Documentation

Below are the various configuration options that can be used in the `gateway-config` file.

### http

- **port** (Number): The port on which the gateway will listen for HTTP requests.

### service-endpoints (object)

Register services in the specified order with unique user-defined names.

- **path** (String): The URI to match.
- **protocol** (String): The protocol to forward to.
- **host** (String): The host to forward to.
- **port** (Optional String): The port to forward to (optional).
- **changeOrigin** (Boolean): Enable changing the base origin.

### policies (Optional Array)

Add various policies to the gateway.

- **proxy** (String): Enable proxying.
- **log** (String): Enable logging.

### Placeholder Strings

- `[--file, -f]` - File path of the configuration file
- `[--help]` - Show help
- `[--version]` - Show version number

With Nucleus Gateway CLI, you'll streamline your development workflow, making it more efficient and productive. If you have any questions or need help, feel free to open an issue in our repository.
