import React, {Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';


import { getDeck } from '../utils/helpers';
import { deleteDeck } from '../actions';



class FlashcardDeckView extends Component {
    static navigationOptions = ({ navigation }) => {
      const { title } = navigation.state.params;
  
      return {
        title
      }
    }


    deleteFlashcardDeck() {
        const { deck } = this.props
    
      Alert.alert(
          `Delete: ${deck.title}`,
          `Please confirm delete: "${deck.title}"`,
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Delete', onPress: () => {

              /// action create called to deleteDeck()
            this.props.deleteDeck(deck.title);
            this.props.navigation.goBack();
            }},
          ],
        {cancelable: true}
      )
    }
    
    beginQuiz(){    
        const { deck } = this.props;
        
            if(deck.questions.length > 0) {
            this.props.navigation.navigate(
                'Quiz',
                {title: deck.title}
            )
          } else if(deck.questions.length === 0 && Platform.OS !== 'ios') {
            ToastAndroid.show('No Cards in this Deck', ToastAndroid.SHORT);
        }
    }

    render() {
        const { container, headerText, detailText, addCardButton, startQuizButton } = styles;
        const { deck } = this.props;
    
        return (
          <View style={{flex: 1}}>
            <View style={styles.container}>
              <MaterialCommunityIcons name='cube-outline' size={100} color='#1C2841' />
              <Text style={styles.headerText}>Topic: {deck.title}</Text>
              <Text style={styles.detailText}>Flashcards: {deck.questions.length}</Text>
    
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                  'AddFlashcard',
                  {title: deck.title}
                )}
                style={styles.addCardButton}>
                <Text style={{ fontSize: 20 }}>
                <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color="#1C2841"
                    />Add Card</Text>
              </TouchableOpacity>
    
              <TouchableOpacity
                onPress={this.beginQuiz.bind(this)}
                style={styles.startQuizButton}>

                <Text style={{ fontSize: 20, color: '#FFF' }}>
                <MaterialCommunityIcons
                        name="arrow-right-thick"
                        size={20}
                        color="#FFF"
                    /> Begin Quiz</Text>
              </TouchableOpacity>
    
            <TouchableOpacity onPress={this.deleteFlashcardDeck.bind(this)}
              style={styles.deleteTopicButton}>
                <Text style={{ fontSize: 20, color: '#FFF' }}>
                <MaterialCommunityIcons
                        name="delete-forever"
                        size={20}
                        color="#FFF"
                    /> Delete Topic</Text>
            </TouchableOpacity>
            </View>
          </View>
        )
      }
    }



    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
        headerText: {
          fontSize: 30,
        },
        detailText: {
          fontSize: 25,
          color: '#BBB'
        },
        addCardButton: {
          width: 200,
          borderWidth: 1,
          borderColor: '#1C2841',
          borderRadius: 5,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50
        },
        startQuizButton: {
          width: 200,
          backgroundColor: '#1C2841',
          borderWidth: 1,
          borderColor: '#FFF',
          borderRadius: 5,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20
        },        
        deleteTopicButton: {
          width: 200,
          backgroundColor: '#c70400',
          borderWidth: 1,
          borderColor: '#FFF',
          borderRadius: 5,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20
        }
      });
      
      

      function mapStateToProps(state, { navigation }) {
        const { title } = navigation.state.params;
      
        return {
          deck: state[title]
        }
      }
      
export default connect(mapStateToProps, { deleteDeck })(FlashcardDeckView);
      