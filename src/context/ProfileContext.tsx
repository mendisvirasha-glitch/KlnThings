
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileContextType = {
  name: string;
  image: string | null;
  updateProfile: (name: string, image: string | null) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export function ProfileProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [name, setName] = useState('Your Name');
  const [image, setImage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const savedName = await AsyncStorage.getItem('profileName');
        const savedImage = await AsyncStorage.getItem('profileImage');

        if (savedName !== null) {
          setName(savedName);
        }

        if (savedImage !== null) {
          setImage(savedImage);
        }
      } catch (error) {
        console.log('Profile loading error:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadProfile();
  }, []);

  const updateProfile = async (
    newName: string,
    newImage: string | null
  ) => {
    try {
      await AsyncStorage.setItem('profileName', newName);

      if (newImage) {
        await AsyncStorage.setItem('profileImage', newImage);
      } else {
        await AsyncStorage.removeItem('profileImage');
      }

      setName(newName);
      setImage(newImage);
    } catch (error) {
      console.log('Profile saving error:', error);
      throw error;
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <ProfileContext.Provider
      value={{ name, image, updateProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      'useProfile must be used inside ProfileProvider'
    );
  }

  return context;
}
