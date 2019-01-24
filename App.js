import * as API from '@integration/api';
import Colors from '@utils/colors';
import MainNavigator from '@components/MainNavigator';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import AppStatusBar from './components/AppStatusBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { decks: [] }
  }

  componentDidMount() {
    API.getDecks().then(decks => {
      this.setState({ decks });
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar barStyle="default" />
        <MainNavigator decks={this.state} />
      </View>
    );
  }
}

export default App;