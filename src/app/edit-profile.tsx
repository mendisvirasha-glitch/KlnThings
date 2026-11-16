
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';

import { useProfile } from '../context/ProfileContext';

export default function EditProfileScreen() {
  const { name, image, updateProfile } = useProfile();

  const [newName, setNewName] = useState(name);
  const [newImage, setNewImage] = useState<string | null>(image);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permission Required',
        'Please allow gallery access to select a profile picture.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!newName.trim()) {
      Alert.alert('Name Required', 'Please enter your name.');
      return;
    }

    try {
      await updateProfile(newName.trim(), newImage);

      Alert.alert(
        'Profile Updated',
        'Your profile has been saved successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Could not save your profile. Please try again.'
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.subtitle}>
        Personalize your KlnThings profile
      </Text>

      <Pressable
        style={styles.imageContainer}
        onPress={pickImage}
      >
        {newImage ? (
          <Image
            source={{ uri: newImage }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons
              name="person"
              size={65}
              color="#555555"
            />
          </View>
        )}

        <View style={styles.cameraIcon}>
          <Ionicons
            name="camera"
            size={20}
            color="#FFFFFF"
          />
        </View>
      </Pressable>

      <Text style={styles.photoHint}>
        Tap to choose a profile picture
      </Text>

      <Text style={styles.label}>Your Name</Text>

      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
        placeholder="Enter your name"
        placeholderTextColor="#999999"
        maxLength={40}
      />

      <Pressable
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>Save Profile</Text>
      </Pressable>

      <Pressable
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  content: {
    padding: 25,
    paddingTop: 55,
    alignItems: 'center',
  },
  backText: {
    alignSelf: 'flex-start',
    color: '#555555',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    color: '#777777',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 35,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 145,
    height: 145,
    borderRadius: 75,
  },
  placeholder: {
    width: 145,
    height: 145,
    borderRadius: 75,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoHint: {
    color: '#777777',
    fontSize: 13,
    marginBottom: 35,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#444444',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333333',
    marginBottom: 25,
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#333333',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 18,
    padding: 12,
  },
  cancelText: {
    color: '#666666',
    fontWeight: 'bold',
  },
});
