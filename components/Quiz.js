import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';



class Quiz extends Component {
    // setting state with this component 
    state = {
        currentQuestion: 1,
        correctScore: 0,
        currentlyViewing: 'Question',
        bounceValue: new Animated.Value(1)
    }

    render(){

        const { bounceValue } = this.state;
    
        if(this.state.currentQuestion <= this.props.deck.questions.length){
            return(
                <View style={container}>
                    <Text style={styles.counterText}> Question: {this.state.currentQuestion} of {this.props.deck.questions.length} total questions</Text>
                
                    <View style={styles.mainview}>
                        <Animated.Text style={[mainFontStyle, { transform: [{ scale: bounceValue }] }]}>
                            { this.state.currentlyViewing === 'Question'
                            ? 
                            this.props.decks.questions[this.state.currentQuestion-1].question
                            :
                            this.props.deck.questions[this.state.currentQuestion-1].answer}
                        </Animated.Text>

                    <TouchableOpacity
                        onPress={() => {
                            const { bounceValue } = this.state;

                            Animate.sequence([
                                Animated.timing(bounceValue, { duration: 200, toValue: 1.10 }),
                                Animated.spring(bounceValue, { toValue: 1, friction: 4 })
                            ]).start();

                            this.state.currentlyViewing === 'Question'
                            ?
                            this.setState({
                                currentlyViewing: 'Answer'
                            })
                            :
                            this.setState({
                                currentlyViewing: 'Question'
                            });
                        }}
                        style={styles.toggleButton}>
                        <Text style={styles.toggleButtonText}>
                            { this.state.currentlyViewing === 'Question'
                            ?
                            'Answer': 'Question' }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => (
                            this.setState({ 
                            currentQuestion: this.state.currentQuestion + 1,
                            correctScore: this.state.correctScore + 1,
                            currentlyViewing: 'Question'
                            }))
                        }
                    style={styles.correctButton}>
                    <Text style={styles.buttonText}>Correct</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => (
                            this.setState({
                            currentQuestion: this.state.currentQuestion + 1,
                            currentlyViewing: 'Question'
                            })
                        )}
                        style={incorrectButton}>
                        <Text style={buttonText}>Incorrect</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <Text style={styles.mainFontStyle}>Quiz Complete</Text>
                    <View style={styles.mainView}>
                        <Text style={styles.scoreHeading}> Results: </Text>
                        <View style={styles.circle}>
                            <Text style={styles.score}>{Math.round((this.state.correctScore/  this.props.deck.questions.length) * 100 )} %</Text>
                        </View>
                        <Text style={{fontSize: 25, marginTop: 10}}>{ (this.state.correctScore / this.props.deck.questions.length) * 100 > 80 
                        ? 
                        'Good Work!'
                        :
                        'Review your notes! You can do better!'
                        }</Text>
                    </View>
                <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                currentQuestion: 1,
                                correctScore: 0
                                });
                            }}
                            style={styles.correctButton}>
                            <Text style={styles.buttonText}>Redo Test</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={backToViewButton}>
                            <Text style={{ fontSize: 20, color: '#00B300' }}>View Flashcards</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
            )
        }
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  counterText: {
    fontSize: 20
  },
  mainView: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  mainFontStyle: {
    fontSize: 35,
    textAlign: 'center'
  },
  toggleButtonText: {
    fontSize: 20,
    color: '#F00'
  },
  toggleButton: {
    marginTop: 20
  },
  correctButton: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#00B300',
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  incorrectButton: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#F00',
    marginTop: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backToViewButton: {
    padding: 20,
    borderRadius: 5,
    borderColor: '#00B300',
    borderWidth: 1,
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20
  },
  scoreHeading: {
    fontSize: 30
  },
  score: {
    fontSize: 50,
    color: '#FFF'
  },
  buttonContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200/2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B300'
  }
});


function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params;
  
    return {
      deck: state[title]
    }
  }
  
  export default connect(mapStateToProps)(Quiz);