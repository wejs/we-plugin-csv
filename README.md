# we-plugin-csv

> We.js plugin do add csv response type and set ``we.csv`` attribute with https://github.com/wdavidw/node-csv module

# Configuration

## For responses related to model

file: config/local.js
```
    csv: {
      // configure your model coluns with this
      modelColumns: {
        // Example for user model:
        user: {
           userId: 'id',
           displayName: 'displayName',
           fullName: 'fullName',
           biography: 'biography',
           gender: 'gender'
        }
      }
    }
```

## For configure csv columns in controller:

```js
// in your controller
res.locals.csvResponseColumns = {
    userId: 'id',
    displayName: 'displayName',
    fullName: 'fullName',
    biography: 'biography',
    status: 'gender'
};
```

# API

## Use the responseType API

```
http://localhost:4000/user.csv
```

## Lib

> See https://github.com/wdavidw/node-csv how will be avaible in ``we.csv``


## Links

> * We.js site: http://wejs.org

# License

Under [the MIT license](LICENSE.md).