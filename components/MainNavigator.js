import MainComponent from '@components/MainComponent';
import NewCard from '@components/NewCard';
import NewDeck from '@components/NewDeck';
import Quiz from '@components/Quiz';
import ShowDeck from '@components/ShowDeck';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@utils/colors';
import { Constants } from 'expo';
import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

const DeckTabs = TabNavigator({
  Main: {
    screen: MainComponent,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) =>
        <Ionicons name="apps" size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) =>
        <Ionicons name="add-circle-outline" size={30} color={tintColor} />
    },
  }
}, {
    navigationOptions: { header: null },
    tabBarOptions: {
      activeTintColor: Colors.Yellow,
      inactiveTintColor: Colors.White,
      indicatorStyle: {
        backgroundColor: Colors.Yellow,
        height: 2.5
      },
      labelStyle: { fontSize: Platform.OS === 'android' ? 16 : 13, },
      style: {
        backgroundColor: Colors.DarkPurple,
        height: 58,
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: {
          width: 0,
          height: 3
        },
      },
    }
  });

const MainNavigator = StackNavigator({
  Home: { screen: DeckTabs },
  Quiz: {
    screen: Quiz,
    navigationOptions: () => ({
      title: 'Quiz',
      headerTintColor: Colors.Yellow,
      headerStyle: {
        backgroundColor: Colors.DarkPurple,
        marginTop: 0 - Constants.statusBarHeight
      }
    }),
  },
  ShowDeck: {
    screen: ShowDeck,
    navigationOptions: () => ({
      title: `${navigation.state.params.deckName} Deck`,
      headerTintColor: Colors.Yellow,
      headerStyle: {
        backgroundColor: Colors.DarkPurple,
        marginTop: 0 - Constants.statusBarHeight
      }
    }),
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: () => ({
      title: 'New Card',
      headerTintColor: Colors.Yellow,
      headerStyle: {
        backgroundColor: Colors.DarkPurple,
        marginTop: 0 - Constants.statusBarHeight
      }
    }),
  }
});

export default MainNavigator;