# KlnThings – University of Kelaniya Campus Events App

**Student Name:** Virasha Mendis  
**Student ID:** PS/2022/169  

---

## 1. Application Overview

KlnThings is a mobile application developed to help University of Kelaniya students discover and keep track of campus events.

Students often need a convenient way to find information about university activities, including academic events, workshops, entertainment programmes, and sports events. KlnThings provides a centralized platform where students can browse event information, view event details, save their favourite events, and receive reminders about upcoming activities.

The application provides a simple and user-friendly interface to make campus event discovery easier and more convenient.

## 2. Application Features

- **Home Screen:** Browse available campus events.
- **Event Categories:** Filter events by Academic, Entertainment, Workshop, and Sports.
- **Event Images:** View images related to each campus event.
- **Event Details:** View event descriptions, dates, times, and locations.
- **Favorites:** Save favourite events and access them through the Favorites tab.
- **User Profile:** View profile information and event statistics.
- **Profile Customization:** Update the profile name and select a profile picture from the device gallery.
- **Persistent Storage:** Store profile information using AsyncStorage so it remains available after restarting the application.
- **Local Notifications:** Receive a welcome notification and schedule reminders one hour before upcoming events.
- **App State Monitoring:** Detect when the application moves into the background and returns to the foreground.

## 3. Application Screens

The application contains five main screen types.

### 3.1 Home Screen
Displays the available campus events using a list of event cards. Students can browse events, view their images, filter events by category, and save favourite events.

### 3.2 Favorites Screen
Displays the events saved by the user. Students can access their favourite events and remove events from the saved list.

### 3.3 Profile Screen
Displays the user's profile picture, name, university information, total number of events, and saved event count.

### 3.4 Event Details Screen
Displays detailed information about a selected event, including its title, image, category, date, time, location, and description. Users can also save the event and schedule a reminder.

### 3.5 Edit Profile Screen
Allows users to update their display name and select a profile picture from the device gallery.

## 4. React Native Components and Implementation

The application uses several React Native components and features.

| Component / Feature | Purpose | Implementation |
|---|---|---|
| View | Organizes screen layouts and content | Home, Favorites, Profile and Event Details |
| Text | Displays titles, descriptions and labels | All screens |
| Image | Displays event and profile images | Home, Event Details and Profile |
| Pressable | Handles user interactions and navigation | Event cards, buttons and favorites |
| FlatList | Efficiently displays event lists | Home and Favorites |
| Modal | Displays the event category filtering interface | Home |
| TextInput | Accepts the user's profile name | Edit Profile |
| ImagePicker | Allows selection of a profile picture | Edit Profile |
| React Context API | Shares favorites and profile data between screens | SavedEventsContext.tsx and ProfileContext.tsx |
| React Hooks | Manages component state and lifecycle | Context providers and application screens |
| AsyncStorage | Persists profile information locally | ProfileContext.tsx |
| AppState | Detects application background and foreground transitions | _layout.tsx |
| Expo Notifications | Handles notification permissions and scheduled reminders | notifications.ts |

## 5. Expo Router Navigation Structure

KlnThings uses Expo Router for file-based navigation.

The application screens are organized inside the `src/app/` directory.

```text
src/
├── app/
│   ├── _layout.tsx
│   │
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── favorites.tsx
│   │   └── profile.tsx
│   │
│   ├── event/
│   │   └── [id].tsx
│   │
│   └── edit-profile.tsx
│
├── components/
│
├── context/
│   ├── SavedEventsContext.tsx
│   └── ProfileContext.tsx
│
├── data/
│   └── events.ts
│
├── hooks/
│
└── utils/
    └── notifications.ts
```

### Navigation Explanation

- `_layout.tsx` defines the root navigation stack and wraps the application with the shared Favorites and Profile providers.
- `(tabs)/_layout.tsx` defines the bottom tab navigation.
- `index.tsx` displays the Home screen.
- `favorites.tsx` displays saved events.
- `profile.tsx` displays the user profile.
- `event/[id].tsx` provides dynamic navigation to individual event details using the event ID.
- `edit-profile.tsx` provides the profile editing screen.

## 6. State Management

The application uses React Context API to share data between screens.

### Favorites Management

`SavedEventsContext.tsx` manages the saved events using shared state. The `FavoritesProvider` makes the favorites data available throughout the application.

The `useFavorites()` hook provides access to:
- `favorites`
- `toggleFavorite`
- `isFavorite`

When a user saves an event on the Home screen, it also appears on the Favorites screen.

### Profile Management

`ProfileContext.tsx` manages the user's name and profile image. The `ProfileProvider` shares this information between the Profile and Edit Profile screens.

AsyncStorage is used to save profile information locally so that it remains available after the application is closed and reopened.

## 7. Local Notifications – Research and Implementation

Local notifications were implemented using the Expo Notifications library.

The implementation involved researching the Expo Notifications documentation to understand how notification permissions, notification scheduling, and platform-specific configuration work.

The following steps were implemented:

1. Installed the Expo Notifications package using `npx expo install expo-notifications`.
2. Configured the notification plugin in the Expo application configuration.
3. Requested notification permissions from the user.
4. Configured an Android notification channel.
5. Implemented a welcome notification when the application starts.
6. Implemented event reminders that are scheduled one hour before the selected event begins.
7. Checked the event date and time to avoid scheduling reminders for events that have already started.

The notification functionality is implemented in `src/utils/notifications.ts` and integrated into the application.

**Note:** Native notification functionality should be tested on a physical device or supported native environment. The web version does not support this implementation.

## 8. App State Monitoring

The React Native `AppState` API is used to monitor the application's lifecycle.

An AppState change listener is implemented in `src/app/_layout.tsx`.

When the application moves into the background or inactive state and subsequently returns to the foreground, the application detects the transition and logs a message.

This demonstrates how the application can respond to changes in its lifecycle.

## 9. Technologies and Tools Used

- React Native
- Expo
- TypeScript
- Expo Router
- React Context API
- React Hooks
- React Native FlatList
- React Native Modal
- Expo Image Picker
- Expo Notifications
- AsyncStorage
- React Native AppState
- Git and GitHub
- Visual Studio Code

## 10. Installation and Setup

Follow these steps to run the project locally.

### Step 1: Clone the Repository

```bash
git clone https://github.com/mendisvirasha-glitch/KlnThings.git
```

### Step 2: Navigate to the Project Directory

```bash
cd KlnThings
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Expo Development Server

```bash
npx expo start
```

### Step 5: Run the Application

- Install Expo Go on an Android device.
- Connect the device and development computer to the appropriate network.
- Scan the QR code displayed by the Expo development server.
- Alternatively, run the application using a supported emulator.

For tunnel-based access, use:

```bash
npx expo start --tunnel
```

## 11. Application Demonstration Video

The following video demonstrates the KlnThings mobile application and its main features.

**YouTube Demonstration:**

Watch the KlnThings Application Demonstration :
https://youtube.com/shorts/Qc5rlkjfzA0?si=z_M8TEwGP075uhTm)

## 12. Sample Event Data

The application uses hard-coded sample campus event data stored in `src/data/events.ts`.

The sample events include:

- Open Day – Academic
- Padura – Entertainment
- Zentro – Workshop
- Inter Faculty Sports Meet – Sports

Each event contains a title, category, date, time, location, and description.

**Note:** These event details are illustrative sample data for the application demonstration and are not official university event announcements.

## 13. Developer

**Virasha Mendis**  
Student ID: PS/2022/169  


---

*Developed as an academic project for the Mobile Application Development module.*
