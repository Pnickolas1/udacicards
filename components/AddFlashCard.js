import React, { Component } from 'react'
import {
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator, View
} from 'react-native';
import { sendFlashcardToDeck } from '../actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';


class AddFlashcard extends Component {

    componentDidUpdate(){
        const {title} = this.props.navigation.state.params;

        const question = this.props.deck.questions.filter((obj) => {
            return obj.question === this.state.question
        }).map(question => { return question });

        if(question.length > 0 ) {
            this.props.navigation.navigate(
                'FlashcardDeckView',
                {title}
            )
            this.setState({ question:'', answer:'', loading:false})
        }
    }

    //setting state within component
    state = {
        question:'',
        answer:'',
        questionError:'',
        answerError:'',
        loading:false
    }

    submitCardToDeck(){
        const { question, answer } = this.state;
        const { title } = this.props.navigation.state.params;


        //calling actions creator below (actions creators >> reducers >> update state)
    
        if(question !== '' & answer !== ''){
            this.props.sendFlashcardToDeck(title, {question, answer});
            this.setState({ questionError: '', answerError: '', loading: true})
        }

        if(question == ''){
            this.setState({questionError: " Enter a question"})

        } else {
          this.setState({ questionError: ''})  
        }

        if(answer === ''){
            this.setState({ answerError: " Enter an answer"})
        } else {
            this.setState({ answerError: ''})
        }
    }
    
    
    render() {
    
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                { this.state.loading
                ?
                <ActivityIndicator size='large' />
                :
                <TouchableOpacity
                    onPress={this.submitCardToDeck.bind(this)}
                    style={styles.addFlashcardButton}>

                    <Text style={{ fontSize: 20, color: '#FFF' }}>
                    <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color="#FFF"
                    />Add Flashcard</Text>
                </TouchableOpacity>}
                <MaterialCommunityIcons name='inbox' size={100} color='#1C2841' />

                    <TextInput
                        style={[styles.inputStyles, {textAlign: 'center'}]}
                        placeholder='Enter Question'
                        autoCapitalize = "words"
                        onChangeText={text => this.setState({ question: text })}
                        value={this.state.question}
                    />
                    { this.state.questionError !== ''
                    ?
                    <Text
                    style={styles.err}>
                    <MaterialCommunityIcons
                        name='textbox'
                        size={20}
                        color='#c70400' 
                    />
                    {this.state.questionError}
                    </Text>
                    :
                    <Text></Text> }
                    

                    <TextInput
                        style={[styles.inputStyles, {textAlign: 'center'}]}
                        placeholder='Answer'
                        multiline={true}
                        autoCapitalize = "words"
                        onChangeText={text => this.setState({ answer: text })}
                        value={this.state.answer}
                        />
                    { this.state.answerError !== ''
                    ?
                    <Text
                        style={styles.error}>
                        <MaterialCommunityIcons
                        name='close-circle-outline'
                        size={20} color='#c70400'
                        />
                        {this.state.answerError}
                    </Text>
                    :
                    <Text></Text> }
            </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputMeta:{
      marginLeft: .9,
      marginRight: .9, 
    },
    inputStyles: {
      width: 400,
      height: 60,
      borderColor: '#1c2841',
      borderWidth: 1,
      fontSize: 25
    },
    addFlashcardButton: {
      width: 200,
      backgroundColor: '#1c2841',
      borderWidth: 1,
      borderColor: '#1c2841',
      borderRadius: 5,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30
    },
    error: {
      color: '#c70400',
      fontSize: 20
    }
  })
  
  function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params;
  
    return {
      deck: state[title]
    }
  }
  
export default connect(mapStateToProps, { sendFlashcardToDeck })(AddFlashcard);
