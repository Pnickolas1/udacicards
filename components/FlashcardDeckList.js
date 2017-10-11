import React, { Component } from 'react'
import { Text, 
        View, 
        StyleSheet,
         FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import Deck from './Deck';
import {
    fetchDecks
} from '../actions'

class FlashcardDeckList extends Component{

    render() {
        let decks = '';
        let decksData = '';
        if(this.props.decks){
            decks = this.props.decks;
            decksData = Object.keys(decks).map((key) => {
                return decks[key];
            })
        }

        return (
            <View>
                {Object.keys(decksData).length > 0 
                ?
                <FlatList
                data={decksData}
                renderItem={({item}) => 
                    <Deck
                        navigation={this.props.navigation}
                        title={item.title}
                        cardNumber={item.questions.length}
                    />
                }
                keyExtractor={(item, index) => index}
                /> : (
                    <View style={styles.subContainer}>
                        <MaterialCommunityIcons name='information-outline' size={200} color='#1485ff' />
                        <Text style={styles.textStyle}>No Deck Available. Add a new Deck!</Text>
                    </View>
                    )}
            </View>
        )
    }
}


function mapStateToProps(state, { navigation }) {
    return {
      decks: state
    }
  }
  
  export default connect(mapStateToProps, { fetchDecks })(DeckList);