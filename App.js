import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import NavigationContainer from './src/navigations/NavigationContainer';
import rootReducer from './src/store/reducers/index';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

console.disableYellowBox = true;

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer props={this.props} />
      </Provider>
    );
  }
}

// AppRegistry.registerComponent("rn_starter_kit", () => App);

export default App;
