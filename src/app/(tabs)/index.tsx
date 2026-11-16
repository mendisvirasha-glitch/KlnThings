
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { router } from 'expo-router';
import { useState } from 'react';
import { useFavorites } from '../../context/SavedEventsContext';
import { CampusEvent, events } from '../../data/events';

const eventImages = {
  '1': require('../../../assets/images/Openday.jpg'),
  '2': require('../../../assets/images/padura.jpg'),
  '3': require('../../../assets/images/zentro.jpg'),
  '4': require('../../../assets/images/sportsMeet.jpg'),
};

const categories = [
  'All Events',
  'Academic',
  'Entertainment',
  'Workshop',
  'Sports',
];

export default function HomeScreen() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState('All Events');

  const { toggleFavorite, isFavorite } = useFavorites();

  const filteredEvents =
    selectedCategory === 'All Events'
      ? events
      : events.filter(
          (event) => event.category === selectedCategory
        );

  const renderEvent = ({ item }: { item: CampusEvent }) => (
    <Pressable
      style={styles.eventCard}
      onPress={() =>
        router.push({
          pathname: '/event/[id]',
          params: { id: item.id },
        })
      }
    >
      <Image
        source={eventImages[item.id as keyof typeof eventImages]}
        style={styles.eventImage}
        resizeMode="cover"
      />

      <View style={styles.eventContent}>
        <Text style={styles.category}>{item.category}</Text>

        <Text style={styles.eventTitle}>{item.title}</Text>

        <Text style={styles.eventInfo}>
          📅 {item.date}
        </Text>

        <Text style={styles.eventInfo}>
          🕒 {item.time}
        </Text>

        <Text style={styles.eventInfo}>
          📍 {item.location}
        </Text>

        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item)}
        >
          <Text style={styles.favoriteText}>
            {isFavorite(item.id)
              ? '❤️ Saved'
              : '🤍 Add to Favorites'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.title}>KlnThings</Text>
          <Text style={styles.subtitle}>
            Discover what's happening on campus
          </Text>
        </View>

        <Pressable
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
        >
          <Text style={styles.filterButtonText}>
            ⚙ Filter
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No events found.
          </Text>
        }
      />

      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Filter Events
            </Text>

            {categories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryOption,
                  selectedCategory === category &&
                    styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={styles.categoryOptionText}>
                  {category}
                </Text>
              </Pressable>
            ))}

            <Pressable
              style={styles.applyButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={styles.applyButtonText}>
                Apply Filter
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setSelectedCategory('All Events');
                setFilterVisible(false);
              }}
            >
              <Text style={styles.clearText}>
                Clear Filter
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 15,
    color: '#666666',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 13,
    color: '#777777',
    marginTop: 5,
  },
  filterButton: {
    backgroundColor: '#E5E5E5',
    padding: 12,
    borderRadius: 10,
  },
  filterButtonText: {
    color: '#333333',
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventContent: {
    padding: 16,
  },
  category: {
    fontSize: 13,
    color: '#777777',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  eventTitle: {
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  eventInfo: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 7,
  },
  favoriteButton: {
    backgroundColor: '#E5E5E5',
    padding: 12,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteText: {
    color: '#555555',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 25,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 18,
  },
  categoryOption: {
    padding: 14,
    borderRadius: 9,
    backgroundColor: '#F2F2F2',
    marginBottom: 9,
  },
  selectedCategory: {
    backgroundColor: '#DCDCDC',
    borderWidth: 1,
    borderColor: '#777777',
  },
  categoryOptionText: {
    color: '#333333',
    fontSize: 15,
  },
  applyButton: {
    backgroundColor: '#333333',
    padding: 14,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  clearText: {
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: 'bold',
  },
});
