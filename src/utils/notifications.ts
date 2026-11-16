
import { Platform } from 'react-native';
import { CampusEvent } from '../data/events';

async function getNotifications() {
  if (Platform.OS === 'web') {
    return null;
  }

  return await import('expo-notifications');
}

// Request notification permission
export async function requestNotificationPermission() {
  const Notifications = await getNotifications();

  if (!Notifications) {
    return false;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#333333',
      }
    );
  }

  return true;
}

// Send welcome notification
export async function sendWelcomeNotification() {
  const Notifications = await getNotifications();

  if (!Notifications) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Welcome to KlnThings!',
      body: 'Stay updated with campus events at the University of Kelaniya.',
    },
    trigger: null,
  });
}

// Schedule a reminder one hour before an event
export async function scheduleEventReminder(event: CampusEvent) {
  const Notifications = await getNotifications();

  if (!Notifications) {
    return false;
  }

  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    return false;
  }

  const eventDate = new Date(`${event.date}T00:00:00`);

  const [timeValue, period] = event.time.split(' ');
  const [hourString, minuteString] = timeValue.split(':');

  let hours = Number(hourString);
  const minutes = Number(minuteString);

  if (period.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  eventDate.setHours(hours, minutes, 0, 0);

  const reminderDate = new Date(
    eventDate.getTime() - 60 * 60 * 1000
  );

  if (reminderDate <= new Date()) {
    return false;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Upcoming Event: ${event.title}`,
      body: `${event.title} starts in one hour at ${event.location}.`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: reminderDate,
    },
  });

  return true;
}
