import * as API from '@integration/api';
import Colors from '@utils/colors';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

class NewCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: ''
    }
  }

  saveCard = () => {
    if (!this.validate()) {
      return;
    }

    const deck = this.props.navigation.state.params
    const card = {
      ...this.state
    };

    API.addCardToDeck(deck.deckId, card).then((alteredDeck) => {
      this.props.navigation.navigate('ShowDeck', {
        deckId: alteredDeck.deckId,
        deckName: alteredDeck.title,
        questions: alteredDeck.questions.length,
      }) && this.resetState();
    });
  }

  validate = () => {
    if (this.state.question === '' || this.state.answer === '') {
      alert('Hey, you can\'t add a new Card without a Question and a Answer. 😩');
      return false;
    }
    return true;
  }

  resetState = () =>
    this.setState({ question: '', answer: '' });

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.question}
          style={styles.input}
          placeholder='Question'
          onChangeText={question => this.setState({ question })} />

        <TextInput
          value={this.state.answer}
          style={styles.input}
          placeholder='Answer'
          onChangeText={answer => this.setState({ answer })} />

        <TouchableOpacity
          onPress={this.saveCard}
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
    paddingTop: 60,
    alignItems: 'center'
  },
  input: {
    backgroundColor: Colors.White,
    fontSize: 20,
    color: Colors.Black,
    height: 60,
    width: 300,
    margin: 10,
    padding: 10,
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
});

export default NewCard;