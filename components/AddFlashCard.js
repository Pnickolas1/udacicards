import React, { Component } from 'react'
import {
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { sendCardToDeck } from '../actions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';


class AddFlashcard extends Component {

    componentDidMount(){
        const {title} = this.props.navigation.state.params;

        const question = this.props.deck.questions.filter((obj) => {
            return obj.question === this.state.question
        }).map(question => { return answer });

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
            this.props.sendCardToDeck(title, {question, answer});
            this.setState({ questionError: '', answerError: '', loading: true})
        }

        if(question == ''){
            this.setState({questionError: "Please enter a question"})

        } else {
          this.setState({ questionError: ''})  
        }

        if(answer === ''){
            this.setState({ answerError: "Please enter an answer"})
        } else {
            this.setState({ answerError: ''})
        }
    }
    
    
    render() {
    
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <MaterialCommunityIcons name='inbox' size={150} color='#1C2841' />

                <TextInput
                    style={[styles.inputStyle, {textAlign: 'center'}]}
                    placeholder='Enter Question'
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
                    style={[styles.inputStyle, {textAlign: 'center'}]}
                    placeholder='Answer'
                    multiline={true}
                    onChangeText={text => this.setState({ answer: text })}
                    value={this.state.answer}
                    />
                { this.state.answerError !== ''
                ?
                <Text
                    style={styles.err}>
                    <MaterialCommunityIcons
                    name='close-circle-outline'
                    size={20} color='#c70400'
                    />
                     {this.state.answerError}
                </Text>
                :
                <Text></Text> }
                { this.state.loading
                ?
                <ActivityIndicator size='large' />
                :
                <TouchableOpacity
                    onPress={this.submitCardToDeck.bind(this)}
                    style={styles.addCardButton}>

                    <Text style={{ fontSize: 20, color: '#FFF' }}>
                    <MaterialCommunityIcons
                        name="plus"
                        size={20}
                        color="#FFF"
                    />Add Flashcard</Text>
                </TouchableOpacity>}
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
    inputStyle: {
      width: 400,
      height: 80,
      fontSize: 25
    },
    addCardButton: {
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
    err: {
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
  
export default connect(mapStateToProps, { sendCardToDeck })(AddFlashcard);
