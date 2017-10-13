import { AsyncStorage } from 'react-native';;
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'flashCards:notification';
const CARD_STORAGE_KEY = 'flashCards:key';

export function getDecks() {
  return AsyncStorage.getItem(CARD_STORAGE_KEY, (err, result) => {
    return JSON.parse(result);
  })
}

export function getDeck(title) {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(result => {
      const data = JSON.parse(result);
      return data[title];
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(CARD_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then(result => {
      const data = JSON.parse(result);
      data[title].questions.push(card);
      AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data));
    })
}

export function removeEntry (title) {
  return AsyncStorage.getItem(CARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[title] = undefined;
      delete data[title];
      AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data));
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync());
}

export function createNotification () {
  return {
    title: '👋🏼 Study Reminder',
    body: "Don't forget to study today 👍🏽 ",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null || data === false) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(8);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              );
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}
