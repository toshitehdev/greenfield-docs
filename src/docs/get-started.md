---
title: Get Started
icon: creative
dir:
  order: 2
order: 2
---

# Get Started

## Interact Greenfield with greenfield-cmd

### Build greenfield-cmd

1. Clone greenfield-cmd repo

```shell
git clone https://github.com/bnb-chain/greenfield-cmd.git
```

2. Build gnfd-cmd

```shell
cd greenfield-cmd
make build
```
The `gnfd-cmd` binary would be in the ./build directory, you can install it or specify the specific path when you use it.

### Configuration

Before using the `gnfd-cmd`, set the correct configuration in the config.toml.

```shell
cp ./cmd/config.toml ./
```

Copy the config.toml example, and edit it according to your needs, the configuration example for Greenfield Testnet:
``` 
endpoint = "http://127.0.0.1:8888"
host = "nodereal.gnfd.com"
grpcAddr = "127.0.0.1:26750"
chainId = "greenfield_9000-1741"
privateKey = "ec9577ceafbfa462d510e505df63aba8f8b23886fefbbda4xxxxxxxx"
```

### Usages

1. List SPs
```
 gnfd-cmd  --config=config.toml list-sp
```

2. Create Bucket
```
  gnfd-cmd --config=config.toml mb  gnfd://bucketname
```

3. Create Object

4. Download Object
```
gnfd-cmd --config=config.toml  get gnfd://bucketname/objectname  test.txt  
```

For more usages, refer to [greenfield-cmd readme](https://github.com/bnb-chain/greenfield-cmd/blob/master/README.md)