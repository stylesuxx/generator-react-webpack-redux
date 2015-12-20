var reducer = require('../../src/reducers/<%= reducerName %>');

describe('<%= reducerName %>', () => {

  it('should not change the passed state', (done) => {

    const state = Object.freeze({});
    reducer(state, {type: 'INVALID'});

    done();
  });
});
