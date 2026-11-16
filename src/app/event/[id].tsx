
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { useFavorites } from '../../context/SavedEventsContext';
import { events } from '../../data/events';
import { scheduleEventReminder } from '../../utils/notifications';

const eventImages = {
  '1': require('../../../assets/images/Openday.jpg'),
  '2': require('../../../assets/images/padura.jpg'),
  '3': require('../../../assets/images/zentro.jpg'),
  '4': require('../../../assets/images/sportsMeet.jpg'),
};

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = events.find((item) => item.id === id);

  const { toggleFavorite, isFavorite } = useFavorites();

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found.</Text>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const handleReminder = async () => {
    try {
      const scheduled = await scheduleEventReminder(event);

      if (scheduled) {
        Alert.alert(
          'Reminder Scheduled!',
          `You will receive a notification one hour before ${event.title}.`
        );
      } else {
        Alert.alert(
          'Reminder Not Scheduled',
          'Please check notification permissions and make sure the event is more than one hour away.'
        );
      }
    } catch (error) {
      console.error('Reminder error:', error);

      Alert.alert(
        'Error',
        'Could not schedule the event reminder.'
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Image
        source={eventImages[event.id as keyof typeof eventImages]}
        style={styles.eventImage}
        resizeMode="cover"
      />

      <Text style={styles.category}>{event.category}</Text>

      <Text style={styles.title}>{event.title}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📅 Date</Text>
        <Text style={styles.value}>{event.date}</Text>

        <Text style={styles.label}>🕒 Time</Text>
        <Text style={styles.value}>{event.time}</Text>

        <Text style={styles.label}>📍 Location</Text>
        <Text style={styles.value}>{event.location}</Text>
      </View>

      <Text style={styles.heading}>About this Event</Text>

      <Text style={styles.description}>
        {event.description}
      </Text>

      <Pressable
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(event)}
      >
        <Text style={styles.favoriteText}>
          {isFavorite(event.id)
            ? '❤️ Saved'
            : '🤍 Add to Favorites'}
        </Text>
      </Pressable>

      <Pressable
        style={styles.reminderButton}
        onPress={handleReminder}
      >
        <Text style={styles.reminderText}>
          🔔 Remind Me
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
    paddingTop: 55,
  },
  backText: {
    color: '#555555',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventImage: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginBottom: 20,
  },
  category: {
    color: '#666666',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    elevation: 3,
  },
  label: {
    color: '#666666',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 5,
  },
  value: {
    color: '#333333',
    fontSize: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 25,
    marginBottom: 10,
  },
  description: {
    color: '#666666',
    fontSize: 15,
    lineHeight: 24,
  },
  favoriteButton: {
    backgroundColor: '#E5E5E5',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
  favoriteText: {
    color: '#555555',
    fontWeight: 'bold',
    fontSize: 15,
  },
  reminderButton: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  reminderText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
