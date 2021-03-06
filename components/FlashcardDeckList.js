import React, { Component } from 'react'
import { Text, 
        View, 
        StyleSheet,
         FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import Deck from './Deck';
import {
    fetchAllDecks
} from '../actions'

class FlashcardDeckList extends Component{

    componentDidMount() {
      this.props.fetchAllDecks();
    }


    render() {
        let decks = '';
        let decksData = '';
        if(this.props.decks){
            decks = this.props.decks;
            decksData = Object.keys(decks).map((key) => {
                return decks[key];
            });
        }

        return (
            <View style={styles.container}>
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
                    <View style={styles.subclassContainer}>
                      <MaterialCommunityIcons name='database-plus' size={200} color='#1C2841' />
                      <Text style={styles.textStyles}>Create Topic</Text>
                    </View>
                  )}
            </View>
          )
        }
      }
      


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },
    textStyles: {
      fontSize: 30,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100
    },
    subclassContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

function mapStateToProps(state, { navigation }) {
    return {
      decks: state
    }
  }
  
  export default connect(mapStateToProps, { fetchAllDecks })(FlashcardDeckList);