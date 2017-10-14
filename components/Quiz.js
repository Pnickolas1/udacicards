import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity,Animate, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



class Quiz extends Component {
    // setting state with this component 
    state = {
        currentQuestion: 1,
        correctScore: 0,
        currentlyViewing: 'See Question',
        bounceValue: new Animated.Value(1)
    }

    render(){

        const { bounceValue } = this.state;
    
        if(this.state.currentQuestion <= this.props.deck.questions.length){
        
            return(
                <View style={styles.container}>
                    <Text style={styles.counter}> Question: {this.state.currentQuestion} of {this.props.deck.questions.length} </Text>
                
                    <View style={styles.mainview}>
                        <Animated.Text style={[styles.mainTextStyle, { transform: [{ scale: bounceValue }] }]}>
                            { this.state.currentlyViewing === 'See Question'
                            ? 
                            this.props.deck.questions[this.state.currentQuestion-1].question
                            :
                            this.props.deck.questions[this.state.currentQuestion-1].answer}
                        </Animated.Text>

                    <TouchableOpacity
                            style={[{textAlign:'center'}, {color: "c70400"}]}
                            onPress={() => {
                            const { bounceValue } = this.state;

                            Animated.sequence([
                                Animated.timing(bounceValue, { duration: 300, toValue: 1.50 }),
                                Animated.spring(bounceValue, { toValue: 1, friction: 4 })
                            ]).start();

                            this.state.currentlyViewing === 'See Question'
                            ?
                            this.setState({
                                currentlyViewing: 'See Answer'
                            })
                            :
                            this.setState({
                                currentlyViewing: 'See Question'
                            });
                        }}
                        style={styles.toggleBtn}>
                        <Text style={styles.toggleBtnText}>
                            { this.state.currentlyViewing === 'See Question'
                            ?
                            'See Answer': 'See Question' }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => (
                            this.setState({ 
                            currentQuestion: this.state.currentQuestion + 1,
                            correctScore: this.state.correctScore + 1,
                            currentlyViewing: 'See Question'
                            }))
                        }
                    style={styles.correctBtn}>
                    <Text style={styles.buttonTextStyle}>
                    <MaterialCommunityIcons
                        name="thumb-up-outline"
                        size={20}
                        color="#FFF"
                    />  Correct</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => (
                            this.setState({
                            currentQuestion: this.state.currentQuestion + 1,
                            currentlyViewing: 'See Question'
                            })
                        )}
                            style={styles.incorrectBtn}>
                        <Text style={styles.buttonTextStyle}>
                        <MaterialCommunityIcons
                        name="thumb-down-outline"
                        size={20}
                        color="#FFF"
                    />  Incorrect</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <Text style={[styles.mainTextStyle, {color: '#1C2841'}]}>Quiz Complete</Text>
                    <View style={styles.mainViews}>
                        <Text style={[styles.scoreHeader, {color:'#1C2841'}]}> SCORE </Text>
                        <View>
                            <Text style={styles.scoreBoard}>{Math.round((this.state.correctScore/  this.props.deck.questions.length) * 100 )} %</Text>
                        </View>
                        <Text style={{fontSize: 25, marginTop: 10}}>{ (this.state.correctScore / this.props.deck.questions.length) * 100 > 80 
                        ? 
                        '👏🏼 Good Work'
                        :
                        '👎🏼 You can do better!'
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
                            style={styles.correctBtn}>
                            <Text style={styles.buttonTextStyle}>
                            <MaterialCommunityIcons
                                name="rotate-3d"
                                size={20}
                                color="#FFF"
                            /> Retake Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={styles.backToViewsButton}>
                            <Text style={{ fontSize: 20, color: '#c70400' }}>
                            <MaterialCommunityIcons
                                name="home-outline"
                                size={20}
                                color="#c70400"
                            /> Topic Home</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}

//home-outline

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:  'center',
    justifyContent: 'center',
  },
  counter: {
    fontSize: 20,
    textAlign: 'center'
  },
  mainViews: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  mainTextStyle: {
    fontSize: 35,
    textAlign: 'center'
  },
  toggleBtnText: {
    fontSize: 20,
    color: '#F00'
  },
  toggleBtn: {
    marginTop: 20
  },
  correctBtn: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#1C2841',
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  incorrectBtn: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#c70400',
    marginTop: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backToViewsButton: {
    padding: 20,
    borderRadius: 5,
    borderColor: '#c70400',
    borderWidth: 1,
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: '#FFF',
    fontSize: 20
  },
  scoreHeader: {
    fontSize: 30
  },
  scoreBoard: {
    fontSize: 50,
    color: '#c70400'
  },
  buttonContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});


function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params;
  
    return {
        deck: state[title]
    }
}   
  
  export default connect(mapStateToProps)(Quiz);