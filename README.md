# A small API server

## Quick Setup

### .env

Rename the .env-example to .env and fill all the properties with the correct values for your setup

### node-config-ts

This project use the https://www.npmjs.com/package/node-config-ts for manage the configuration file.
Following the package instruction, you can edit the default.json file inside the `/config` directory.

Here an example:

```
{
    "server": {
        "port": "@@HTTP_PORT"
    },
    "database": {
        "host": "@@DB_HOSTADDRESS",
        "port": 3306,
        "username": "@@DB_USERNAME",
        "password": "@@DB_PASSWORD",
        "database": "@@DB_NAME",
        "dialect": "mysql",
        "define": {
            "paranoid": true,
            "timestamps": true,
            "underscored": false,
            "freezeTableName": true,
            "createdAt": "createdAt",
            "updatedAt": "updatedAt",
            "deletedAt": "deletedAt",
            "charset": "utf8",
            "schema": "public"
        }
    }
}
```
