import { Ionicons } from '@expo/vector-icons';
import Colors from '@utils/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DEFAULT_MINIMUM_PERCENTAGE = 0.7

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: this.props.navigation.state.params.percentage,
      deck: {
        deckName: this.props.navigation.state.params.deck.title,
        questions: this.props.navigation.state.params.deck.questions,
        key: this.props.navigation.state.params.deck.key
      }
    }
  }

  /**
   * Calculates the score percentage and outputs the proper message.
   */
  showPercentage = () => {
    const { percentage } = this.state;
    const formattedPercentage = Math.floor(percentage * 100);
    if (percentage > DEFAULT_MINIMUM_PERCENTAGE) {
      return <View style={styles.percentageWrapper}>
        <Ionicons name="md-happy" size={65} style={styles.scoreIcon} />
        <Text style={styles.score}> Congratulations! You've got a {formattedPercentage}%. </Text>
      </View>
    }
    return <View style={styles.percentageWrapper}>
      <Ionicons name="md-sad" size={65} style={styles.scoreIcon} />
      <Text style={styles.score}> Ohh no! Your score was just {formattedPercentage}%! Try again! </Text>
    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        {this.showPercentage()}
        <View>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() =>
              this.props.navigation.navigate('ShowDeck', {
                deckName: this.state.deck.deckName,
                questions: this.state.deck.questions.length,
                deckId: this.state.deck.key,
              })}>
            <Text style={styles.button}>Back to Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                deckId: this.state.deck.key
              })
            }>
            <Text style={styles.button}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
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
  percentageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  score: {
    fontSize: 15,
    color: Colors.White,
    marginTop: 30,
    marginBottom: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  scoreIcon: {
    color: Colors.White, 
    paddingTop: 5
  },
  buttonTouchable: {
    borderRadius: 6,
    backgroundColor: Colors.Yellow,
    borderWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 15
  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: '50%',
    justifyContent: 'center'
  },
});

export default Score;