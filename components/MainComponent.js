import * as API from '@integration/api';
import Colors from '@utils/colors';
import React from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';
import DeckGridItem from './DeckGridItem';

class MainComponent extends React.Component {

  state = {
    decks: [],
    loading: false
  }

  handleRefresh = () => {
    API.getDecks().then(decks => {
      this.setState({ decks: decks, loading: false });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.decks !== this.props.decks) {
      this.setState({ decks: this.props.decks })
    }
  }

  componentDidMount() {
    API.getDecks().then(decks => {
      this.setState({ decks });
    });
  }

  render() {
    return (
      <View style={styles.appBg}>
        {(this.state.decks && this.state.decks.length > 0) ?
          <FlatList
            data={this.state.decks}
            onRefresh={this.handleRefresh}
            refreshing={this.state.loading}
            numColumns={1}
            renderItem={({ item }) =>
              <DeckGridItem
                deckId={item.key}
                navigation={this.props.navigation}
                questions={item.questions.length}
                deckName={item.title} />
            } />
          :
          <ActivityIndicator size="large" color={Colors.White} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appBg: {
    backgroundColor: Colors.Purple, 
    flex: 1, 
    paddingTop: 20 
  },
});

export default MainComponent;