import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import uuid from 'uuid';
import Colors from '@utils/colors'
import * as API from '@integration/api'

class NewDeck extends React.Component {

  constructor(props) {
    super(props);
    this.state = { key: uuid(), deckTitle: '' };
  }

  saveDeck = () => {
    if (!this.validate()) {
      return;
    }

    const deck = {
      key: this.state.key,
      title: this.state.deckTitle,
      questions: [],
    }

    API.saveDeck(deck.title, deck.key).then(() => {
      this.props.navigation.navigate('ShowDeck', {
        deckId: deck.key,
        deckName: deck.title,
        questions: deck.questions.length,
      }) && this.resetState();
    });
  }

  validate = () => {
    if (this.state.deckTitle === '') {
      alert('Hey, you can\'t add a new deck without a name. 😩');
      return false;
    }
    return true;
  }

  resetState = () =>
    this.setState({ id: uuid(), deckTitle: '' });

  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          What is the title of your new deck?
        </Text>
        <TextInput
          placeholder='Deck Title'
          onChangeText={deckTitle => this.setState({ deckTitle })}
          style={styles.input}
          value={this.state.deckTitle} />
        <TouchableOpacity
          onPress={this.saveDeck}
          style={styles.buttonTouchable}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Purple,
    flex: 1,
    paddingTop: 20,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 10,
    marginBottom: 50,
    color: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 25,
  },
  buttonTouchable: {
    borderRadius: 6,
    backgroundColor: Colors.Yellow,
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 15
  },
  input: {
    backgroundColor: Colors.White,
    fontSize: 20,
    color: Colors.Black,
    height: 60,
    width: 300,
    margin: 10,
    padding: 10,
  }
});

export default NewDeck;