import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'
import * as API from '@integration/api'
import * as DT from '@utils/date'

// Configurable hours interval to send notifications
const DEFAULT_NOTIFICATION_HOURS_INTERVAL = 24;

// Android notification config
const DEFAULT_ANDROID_NOTFICATION_CONFIG = {
  sound: true,
  sticky: false,
  vibrate: false,
  priority: 'high',
};

// IOs notification config
const DEFAULT_IOS_NOTFICATION_CONFIG = {
  sound: true,
};

/**
 * Schedule local notifications
 */
export const turnOnNotification = () => {
  API.getNotification()
    .then((notification) => {
      // Only scheduling if there aren't any scheduled notification
      if (notification === null) {
        setUpNotification();
      }
    })
}

/**
 * Removes any local scheduled notifications
 */
export const turnOffNotification = () => {
  return API.removeNotification()
    .then(() => Notifications.cancelAllScheduledNotificationsAsync())
}

/**
 * Returns notification JSON injecting a custom title and body text
 * 
 * @param {string} title 
 * @param {string} body 
 */
const getNotification = (title, body) => {
  return {
    title,
    body,
    android: DEFAULT_ANDROID_NOTFICATION_CONFIG,
    ios: DEFAULT_IOS_NOTFICATION_CONFIG,
  }
}

/**
 * Asks permission to schedule a local notification and scheduled it.
 */
const setUpNotification = () => {
  Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({ status }) => {
      if (status !== "granted") {
        return;
      }

      const nextNotificationDate = DT.getNextDateInterval(DEFAULT_NOTIFICATION_HOURS_INTERVAL);
      console.debug(`Scheduling notification for: ${nextNotificationDate}`);

      Notifications.scheduleLocalNotificationAsync(
        getNotification("Time to improve your knowledge!",
          "Are you ready to challenge yourself today?"), {
          repeat: 'day',
          time: nextNotificationDate,
        }
      )

      API.setNotification();
    })
}