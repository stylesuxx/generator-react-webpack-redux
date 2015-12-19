# generator-react-webpack-redux
> Generator-React-Webpack - with Flux Support (using Redux)

[![Build Status](https://travis-ci.org/stylesuxx/generator-react-webpack-redux.svg?branch=master)](https://travis-ci.org/stylesuxx/generator-react-webpack-redux) ![Amount of Downloads per month](https://img.shields.io/npm/dm/generator-react-webpack-redux.svg "Amount of Downloads") ![Dependency Tracker](https://img.shields.io/david/stylesuxx/generator-react-webpack-redux.svg "Dependency Tracker") ![Dependency Tracker](https://img.shields.io/david/dev/stylesuxx/generator-react-webpack-redux.svg "Dependency Tracker") ![Node Version](https://img.shields.io/node/v/generator-react-webpack-redux.svg "Node Version")


## What is it for?
This generator can be used to create and manage projects that use React, Webpack and Flux (using [Redux](https://github.com/rackt/redux) as implementation). It depends on [generator-react-webpack](https://github.com/newtriks/generator-react-webpack) as a base and extends it to create new stores and actions.

## What is included?
Generator-React-Webpack-Alt includes support for creating new stores (and tests), as well as the creation of actions, components and sources.

It also has support for the the features that are available in its parent project, generator-react-webpack. This includes the run-configuration, webpack, esLint and test-environment.

## Planned Features and updates
There are currently some features missing from the generator. These will be available in a later version:

- [x] Creation of Components like in Generator-React-Webpack
- [x] Creation of Datasources
- [x] Creation of Action/Store-Pairs via a single subgenerator (react-webpack-alt:all).
- [ ] Automatic inclusion of generated actions into stores when using subgenerator "all"
- [ ] Creation of Unittests for Actions
- [x] Add a correct versioning for [generator-react-webpack](https://github.com/newtriks/generator-react-webpack) so we dont need to draw the current git master.

---

## Installation
```bash
npm install -g yo
npm install -g generator-react-webpack-alt
```

## Setting up projects
```bash
# Create a new directory, and `cd` into it:
mkdir my-new-project && cd my-new-project

# Run the generator
yo react-webpack-alt
```

## Generating new components
```bash
yo react-webpack-alt:component my/namespaced/components/name
```

## Generating new stores and actions
```bash
# After setup of course :)
# cd my-new-project
yo react-webpack-alt:action my/namespaced/actions/name
yo react-webpack-alt:store my/namespaced/stores/name

# Create a new store, as well as a dedicated action for it
yo react-webpack-alt:all my/namespaced/functions/name
```

## Generating sources
Stores in alt.js can use so called __sources__ to make the usage of async actions easier for you. Please look at [the alt.js documentation for this feature](http://alt.js.org/docs/async/) to see how this can be implemented.

You can create an empty source by using the following command:
```bash
yo react-webpack-alt:source my/namespaced/sources/name
```

You will then be able to include it in your stores via
```javascript
import NameSource from 'sources/my/namespaces/sources/nameSource';
NameSource.remoteAction();
```

## Usage
Please take a look at [react-webpack-template](https://github.com/weblogixx/react-webpack-template) for an in depth explanation or use `npm run` to get a list of all commands available for building and running your application.

Basics are:
- `npm start`: Will start up the dev webserver
- `npm test`: Run unit tests
- `npm run dist`: Create the packed version

## Contribute
Contributions are welcomed. If you find something is missing or there are errors hidden somewhere, feel free to add a new issue.

### Running Tests
`npm test` or `node node_modules/.bin/mocha`

## License
[MIT license](http://opensource.org/licenses/MIT)
