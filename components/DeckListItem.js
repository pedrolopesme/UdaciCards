import Colors from '@utils/colors';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class DeckListItem extends Component {
    render() {
        return <TouchableOpacity
            style={styles.card}
            disabled={this.props.nolink ? true : false}
            onPress={() =>
                this.props.navigation.navigate('ShowDeck', {
                    deckName: this.props.deckName,
                    questions: this.props.questions,
                    deckId: this.props.deckId
                })}>
            <View style={styles.leftColumn}>
                <Text style={styles.deckName}> {this.props.deckName} </Text>
            </View>
            <View style={styles.rightColumn}>
                <Text style={styles.deckItemsQtt}> {this.props.questions} </Text>
                <Text style={styles.deckMeta}> card(s). </Text>
            </View>
        </TouchableOpacity>
    }
};

const styles = StyleSheet.create({
    deckName: {
        fontSize: 30,
        color: Colors.Blue,
        paddingTop: 10
    },
    deckItemsQtt: {
        fontSize: 34,
        color: Colors.Yellow
    },
    deckMeta: {
        fontSize: 15,
        color: Colors.Blue
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        backgroundColor: Colors.White,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    leftColumn: {
        width: '80%'
    },
    rightColumn: {
        width: '20%',
        justifyContent: 'center',
    }
});

export default DeckListItem;