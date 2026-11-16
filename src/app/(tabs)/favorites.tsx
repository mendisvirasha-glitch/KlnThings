
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useFavorites } from '../../context/SavedEventsContext';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Favorites ❤️</Text>

      <Text style={styles.subtitle}>
        Your saved campus events
      </Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🤍</Text>
          <Text style={styles.emptyTitle}>
            No Saved Events Yet
          </Text>
          <Text style={styles.emptyText}>
            Go to Home and save your favorite events!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.category}>
                {item.category}
              </Text>

              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.details}>
                📅 {item.date}
              </Text>

              <Text style={styles.details}>
                🕒 {item.time}
              </Text>

              <Text style={styles.details}>
                📍 {item.location}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>

              <Pressable
                style={styles.removeButton}
                onPress={() => toggleFavorite(item)}
              >
                <Text style={styles.removeText}>
                  ❤️ Remove from Favorites
                </Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4FC',
    padding: 20,
    paddingTop: 55,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4B247A',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B247A',
  },
  emptyText: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 3,
  },
  category: {
    color: '#7546A5',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#292333',
  },
  details: {
    color: '#555',
    marginBottom: 5,
  },
  description: {
    color: '#666',
    marginTop: 10,
    lineHeight: 20,
  },
  removeButton: {
    backgroundColor: '#FCE8EF',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  removeText: {
    color: '#B8325A',
    fontWeight: 'bold',
  },
});
