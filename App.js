import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import ReduxThunk from 'redux-thunk';

import FlashcardDeckList from './components/FlashcardDeckList';
import CreateDeck from './components/CreateDeck';
import FlashcardDeckView from './components/FlashcardDeckView';
import AddFlashcard from './components/AddFlashCard';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helpers';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

function CardStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}



export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const Tabs = TabNavigator({
      FlashcardDeckList: {
        screen: FlashcardDeckList,
        navigationOptions: {
          tabBarLabel: 'Topics',
          tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={25} color={tintColor} />
        },
      },
      CreateDeck: {
        screen: CreateDeck,
        navigationOptions: {
          tabBarLabel: 'Create New Topic',
          tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={25} color={tintColor} />
        },
      }
    });

    const navOptions = {
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#1C2841'
      }
    }

    const MainNavigator = StackNavigator({
      Home: {
        screen: Tabs,
        navigationOptions: { ...navOptions, title: 'Udacity Flashcards' }
      },
      FlashcardDeckView: {
        screen: FlashcardDeckView,
        navigationOptions: navOptions
      },
      AddFlashcard: {
        screen: AddFlashcard,
        navigationOptions: { ...navOptions, title: 'Add Card' }
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: { ...navOptions, title: 'Quiz' }
      }
    })


    return (
      <Provider store={createStore(reducer, applyMiddleware(ReduxThunk))}>
        <View style={{flex: 1}}>
          <CardStatusBar backgroundColor={'#1C2841'} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});