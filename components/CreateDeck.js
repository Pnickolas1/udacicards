import React, { Component } from 'react';
import { 
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
 } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { sendDeckTitle } from '../actions';

class CreateDeck extends Component{
    componentDidMount(){
        const title = this.state.deckTitle;

        if(this.props.decks[title]){
            this.props.navigation.navigate(
                'FlashcardDeckView',
                {title}
            )
            this.setState({ deckTitle: '', loading: false});
        }
    }

    //Setting the state within the component

    state = {
        deckTitle: '',
        errorMessage: '',
        loading: false
    }

    onSubmit(){
        if(this.state.deckTitle !== ''){

            // Send Title of Flashcard Deck action creator
            this.props.sendDeckTitle(this.state.deckTitle);
            this.setState({ errorMessage: '', loading: true})
        } else {
            this.setState({ errorMessage: 'Enter a quiz topic!'})
        }
    }

render(){

        return(
            <KeyboardAvoidingView
                behavior='padding'
                style={styles.containerStyle}>
                <MaterialCommunityIcons name="console" color="#1C2841" size={125} />
                <Text style={styles.headingText}>Enter Topic</Text>

                <TextInput
                    style={[styles.inputStyle, {textAlign:'center'}]}
                    placeholder='ex. React Native'

                    // setting state on on change text value
                    onChangeText={(text) => this.setState({ deckTitle: text })}
                    //value = this.state.deckTitle
                    value={this.state.deckTitle}
                />

                { this.state.errorMessage !== ''
                ?
                <Text
                    style={styles.err}>
                    <MaterialCommunityIcons
                        name='theater'
                        size={20} color="#1C2841"
                    />
                    {this.state.errorMessage}
                </Text>
                :
                <Text></Text> }
                { this.state.loading
                ?
                <ActivityIndicator size="large" />
                :
                <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={this.onSubmit.bind(this)}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>}
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    headingText: {
      fontSize: 40,
      alignItems: 'center',
      textAlign: 'center',
      color: '#1C2841',
    },
    inputStyle: {
      width: 400,
      height: 80,
      fontSize: 30
    },
    buttonStyle: {
      padding: 10,
      width: 100,
      backgroundColor: '#1C2841',
      borderWidth: 1,
      borderColor: '#1C2841',
      marginTop: 5,
      borderRadius: 3
    },
    buttonText: {
      color: '#FFF',
      fontSize: 20,
      textAlign: 'center'
    },
    err: {
      color: '#F00',
      fontSize: 20
    }
  });


  function mapStateToProps(state) {
    return {
      decks: state
    }
  }

  export default connect(mapStateToProps, { sendDeckTitle })(CreateDeck);