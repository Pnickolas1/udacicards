import React, { Component } from 'react'
import {
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';



class AddFlashcard extends Component {

    componentDidMount(){
        const {title} = this.props.navigation.state.params;

        const question = this.props.deck.questions.filter((obj) => {
            return obj.question === this.state.question
        }).map(quetion => { return answer });

        if(question.length > 0 ) {
            this.props.navigation.navigate(
                'DeckView',
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
        const { title } = this.props.navigation.state.params


        //calling actions creator below (actions creators >> reducers >> update state)
    
        if(question !== '' & answer !== ''){
            this.props.addCardToDeck(title, {question, answer});
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
            <KeyboardAvoidingView behavior='padding'>
                <MaterialCommunityIcons name='inbox' size={150} />

                <TextInput
                style={}
                placeholder='Question'
              />
              { this.state.questionError !== ''
                ?
                <Text
                  style={err}>
                  <MaterialCommunityIcons
                    name='textbox'
                    size={20}
                    color='#F00' 
                  />
                  {this.state.questionError}
                </Text>
                :
                <Text></Text> }
                

                <TextInput
                style={}
                placeholder='Answer'
                multiline={true}
                onChangeText={text => this.setState({ answer: text })}
                value={this.state.answer}
                />
                { this.state.answerError !== ''
                ?
                <Text
                    style={err}>
                    <MaterialCommunityIcons
                    name='close-circle-outline'
                    size={20} color='#F00'
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
                    style={}>
                    <Text style={{ fontSize: 20, color: '#FFF' }}>Add Card</Text>
                </TouchableOpacity>}
            </KeyboardAvoidingView>
    )
  }
}


export default AddFlashcard