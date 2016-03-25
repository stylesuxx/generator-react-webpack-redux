# generator-react-webpack-redux
> Generator-React-Webpack - with Flux Support (using Redux)

[![Build Status](https://travis-ci.org/stylesuxx/generator-react-webpack-redux.svg?branch=master)](https://travis-ci.org/stylesuxx/generator-react-webpack-redux) ![Amount of Downloads per month](https://img.shields.io/npm/dm/generator-react-webpack-redux.svg "Amount of Downloads") [![Dependency Status](https://david-dm.org/stylesuxx/generator-react-webpack-redux.svg)](https://david-dm.org/stylesuxx/generator-react-webpack-redux) [![devDependency Status](https://david-dm.org/stylesuxx/generator-react-webpack-redux/dev-status.svg)](https://david-dm.org/stylesuxx/generator-react-webpack-redux#info=devDependencies) ![Node Version](https://img.shields.io/node/v/generator-react-webpack-redux.svg "Node Version")

## What is it for?
This generator can be used to create and manage projects that use React, Webpack and Flux (using [Redux](https://github.com/rackt/redux) as implementation). It depends on [generator-react-webpack](https://github.com/newtriks/generator-react-webpack) as a base and extends it to create new reducers and actions.

## What is included?
generator-react-webpack-redux includes support for creating new reducers (and tests), as well as the creation of actions and components.

It also has support for the the features that are available in its parent project, generator-react-webpack. This includes the run-configuration, webpack, esLint and test-environment.

## Planned Features and updates
There are currently some features missing from the generator. These will be available in a later version:

- [ ] Add optional routing via [react-router-redux](https://github.com/rackt/react-router-redux)

## Installation
```bash
npm install -g yo
npm install -g generator-react-webpack-redux
```

## Setting up projects
```bash
# Create a new directory, and `cd` into it:
mkdir my-new-project && cd my-new-project

# Run the generator
yo react-webpack-redux
```

## Generating new reducers
```bash
yo react-webpack-redux:reducer my/namespaced/reducers/name
yo react-webpack-redux:reducer items
```

## Generating new actions
```bash
yo react-webpack-redux:action my/namespaced/actions/name
yo react-webpack-redux:action items/addItem
```

## Generating new components
```bash
yo react-webpack-redux:component my/namespaced/components/name
```

## Generating new containers
```bash
yo react-webpack-redux:container my/namespaced/container/Name
```

## Usage
Please take a look at [react-webpack-template](https://github.com/weblogixx/react-webpack-template) for an in depth explanation or use `npm run` to get a list of all commands available for building and running your application.

Basics are:
- `npm start`: Will start up the dev webserver
- `npm test`: Run unit tests
- `npm run dist`: Create the packed version

## Contribute
Contributions are welcome. If you find something is missing or there are errors hidden somewhere, feel free to add a new issue.

If you want to submit a pull request please to so from and against the *develop* branch.

### Running Tests
`npm test` or `node node_modules/.bin/mocha`

## License
[MIT license](http://opensource.org/licenses/MIT)
