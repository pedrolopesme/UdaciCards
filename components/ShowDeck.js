import Colors from '@utils/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class ShowDeck extends React.Component {

  render() {
    const { questions, deckName, deckId, ...others } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.deckHeader}>
          <Text style={styles.deckName}>{deckName}</Text>
          <Text style={styles.deckItemsQtt}> {questions} card(s) </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.buttonTouchable, { backgroundColor: Colors.White }]} onPress={() =>
            this.props.navigation.navigate('NewCard', {
              deckId: deckId,
              deckName: deckName,
              questions: questions })}>
            <Text style={styles.button}>Add Card</Text>
          </TouchableOpacity>

          {questions > 0 && (
            <TouchableOpacity style={styles.buttonTouchable} onPress={() =>
              this.props.navigation.navigate('Quiz', { deckId: deckId })}>
              <Text style={styles.button}>Start Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Purple,
    flexBasis: "100%",
    paddingTop: "10%",
    flexBasis: "100%",
    alignItems: "center",
    flexDirection: 'column',
    justifyContent: 'center'
  },
  deckHeader: {
    flex: 1,
    alignItems: "center",
  },
  deckName: {
    fontSize: 50,
    color: Colors.White
  },
  deckItemsQtt: {
    color: Colors.White,
    fontSize: 20,
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  buttonTouchable: {
    borderRadius: 6,
    backgroundColor: Colors.Yellow,
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 15
  },
  button: {
    fontSize: 20,
    color: Colors.Black
  }
});

export default ShowDeck;