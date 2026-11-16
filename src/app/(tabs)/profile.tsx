
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useProfile } from '../../context/ProfileContext';
import { useFavorites } from '../../context/SavedEventsContext';
import { events } from '../../data/events';

export default function ProfileScreen() {
  const { favorites } = useFavorites();
  const { name, image } = useProfile();

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.profileImage}
          />
        ) : (
          <Ionicons
            name="person"
            size={55}
            color="#555555"
          />
        )}
      </View>

      <Text style={styles.title}>
        {name}
      </Text>

      <Text style={styles.subtitle}>
        Welcome to KlnThings!
      </Text>

      <Pressable
        style={styles.editButton}
        onPress={() => router.push('/edit-profile')}
      >
        <Ionicons
          name="create-outline"
          size={18}
          color="#FFFFFF"
        />
        <Text style={styles.editButtonText}>
          Edit Profile
        </Text>
      </Pressable>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons
            name="calendar-outline"
            size={28}
            color="#555555"
          />
          <Text style={styles.statNumber}>
            {events.length}
          </Text>
          <Text style={styles.statLabel}>
            Total Events
          </Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons
            name="heart-outline"
            size={28}
            color="#555555"
          />
          <Text style={styles.statNumber}>
            {favorites.length}
          </Text>
          <Text style={styles.statLabel}>
            Saved Events
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Ionicons
          name="school-outline"
          size={24}
          color="#555555"
        />

        <Text style={styles.university}>
          University of Kelaniya
        </Text>

        <Text style={styles.description}>
          Discover campus events, save your favourites
          and stay connected with university life.
        </Text>
      </View>

      <Text style={styles.version}>
        App Version 1.0.0
      </Text>

      <Text style={styles.footer}>
        KlnThings © 2026
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  profileImageContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 15,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 8,
    marginBottom: 25,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },
  statNumber: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 13,
    color: '#666666',
    marginTop: 5,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },
  university: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
  },
  version: {
    color: '#777777',
    fontSize: 12,
    marginTop: 20,
  },
  footer: {
    color: '#888888',
    fontSize: 12,
    marginTop: 10,
  },
});
