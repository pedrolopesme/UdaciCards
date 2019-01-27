import * as API from '@integration/api';
import Colors from '@utils/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardFlip from 'react-native-card-flip';

const ANSWER = { CORRECT: 1, WRONG: 0 };

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.quizScore = 0;
    this.state = {
      cardsQuantity: null,
      deck: { deckId: this.props.navigation.state.params.deckId },
      deckLoaded: false,
      questionIndex: 0,
    }
  }

  componentDidMount() {
    API.getDeck(this.state.deck.deckId).then((deck) =>
      this.setState({
        deck,
        deckLoaded: true,
        cardsQuantity: deck.questions.length,
      })
    );
  }

  /**
   * Takes care of flipping a card and finish the quiz if it has reached to the end.
   */
  answerCard = (answer) => {
    if (answer) {
      this.quizScore++;
    }

    if (this.hasReachedToTheEnd()) {
      this.moveToEnd();
      return;
    }
    this.card.flip();
  }

  /**
   * Calculates if user has reached to the end
   */
  hasReachedToTheEnd = () => {
    const nextQuestion = this.state.questionIndex + 1;
    if (nextQuestion > this.state.deck.questions.length - 1) {
      return true;
    }
    return false;
  }

  /**
   * Move user to the Quiz End
   */
  moveToEnd = () => {
    console.log("QUIZ SCORE >>> ", this.quizScore);
    console.log("CARDS QTT >>> ", this.state.cardsQuantity);
    console.log("PERCENTAGE >>> ", this.quizScore / this.state.cardsQuantity);

    this.props.navigation.navigate('Score', {
      deck: this.state.deck,
      percentage: this.quizScore / this.state.cardsQuantity
    });
  }

  /**
   * Groups all front card elements
   */
  frontCardElements = (question) => {
    return <View style={styles.questionWrapper}>
      <Text style={styles.questionText}>
        {question.question}
      </Text>
      <TouchableOpacity
        style={[styles.buttonTouchable, styles.spacingFlipButton]}
        onPress={() => this.card.flip()}>
        <Text style={styles.button}> View Answer </Text>
      </TouchableOpacity>
    </View>
  }

  /**
   * Groups all back card elements
   */
  backCardElements = (question) => {
    const cardsLeft = (this.state.deck.questions.length - 1) - this.state.questionIndex;

    return <View style={styles.answerWrapper}>
      <Text style={styles.answerTitle}>
        {this.state.deck.title}
      </Text>
      {cardsLeft > 0 ?
        <Text style={styles.answerCardsLeft}> Still {cardsLeft} card(s). </Text>
        :
        <Text style={styles.answerCardsLeft}> This is the last card. </Text>
      }
      <View>
        <Text style={styles.answerText}> {question.answer} </Text>
        <TouchableOpacity
          style={[styles.buttonTouchable, styles.answerButtons]}
          onPress={() => this.answerCard(ANSWER.CORRECT)}>
          <Text style={[styles.button, styles.answerButtons]}> Correct </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonTouchable, styles.answerButtons]}
          onPress={() => this.answerCard(ANSWER.WRONG)}>
          <Text style={[styles.button, styles.answerButtons]}> Incorrect </Text>
        </TouchableOpacity>
      </View>
    </View>
  }

  render() {
    const question = this.state.deckLoaded ? this.state.deck.questions[this.state.questionIndex] : null;

    return <View style={styles.container}>
      {this.state.deckLoaded && (
        <CardFlip
          style={styles.card}
          ref={(card) => this.card = card}
          duration={300}
          flipDirection={'x'}
          onFlipEnd={(side) => {
            side === 0 && this.setState(prev => ({ questionIndex: prev.questionIndex + 1 }))
          }
          }>
          {this.frontCardElements(question)}
          {this.backCardElements(question)}
        </CardFlip>
      )}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Purple,
    paddingTop: 60,
    alignItems: 'center'
  },
  card: {
    alignItems: 'center',
    paddingTop: 30,
    height: '100%',
    width: '80%',
    justifyContent: 'center',
  },
  questionWrapper: {
    alignItems: 'center',
    paddingVertical: 40,
    borderRadius: 8,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.White,
    backgroundColor: Colors.DarkPurple,
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    textAlign: 'center',
    color: Colors.Yellow
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
  spacingFlipButton: {
    marginTop: 60
  },
  questionText: {
    alignItems: 'center',
    fontSize: 20,
    marginTop: 20,
    justifyContent: 'center',
    color: Colors.Yellow
  },
  answerWrapper: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 6,
    justifyContent: 'center',
    backgroundColor: Colors.Yellow,
  },
  answerText: {
    fontSize: 20,
    color: Colors.DarkPurple,
    alignItems: 'center',
    marginTop: 30,
    padding: 15,
    textAlign: 'center',
    justifyContent: 'center',
  },
  answerTitle: {
    fontSize: 30,
    color: Colors.DarkPurple,
    alignItems: 'center',
    marginTop: 20,
    padding: 0,
    textAlign: 'center',
    justifyContent: 'center',
  },
  answerCardsLeft: {
    fontSize: 10,
    color: Colors.DarkPurple,
    alignItems: 'center',
    marginTop: 0,
    textAlign: 'center',
    justifyContent: 'center',
  },
  answerButtons: {
    textAlign: 'center',
    backgroundColor: Colors.White,
    fontSize: 20
  }
});

export default Quiz;