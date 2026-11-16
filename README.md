
# KlnThings 🎓

A University of Kelaniya Campus Events Discovery Mobile Application built using React Native and Expo.

## 📱 About the Project

KlnThings is a mobile application designed to help University of Kelaniya students discover campus events, explore event details, save their favourite events, and receive reminders about upcoming events.

The application provides a simple and user-friendly interface for staying connected with university activities.

## ✨ Features

- **Home Screen:** Browse available campus events.
- **Event Images:** View images related to each event.
- **Category Filtering:** Filter events by Academic, Entertainment, Workshop, and Sports categories.
- **Event Details:** View event dates, times, locations, and descriptions.
- **Favorites:** Save and remove favourite events.
- **User Profile:** View event statistics and personalize the profile.
- **Profile Customization:** Select a profile picture from the device gallery and update the user's name.
- **Persistent Storage:** Save profile information using AsyncStorage.
- **Local Notifications:** Receive welcome notifications and event reminders.
- **App State Monitoring:** Detect when the application returns to the foreground.

## 🛠️ Technologies Used

- React Native
- Expo
- TypeScript
- Expo Router
- React Hooks
- React Native FlatList
- React Native Modal
- Expo Image Picker
- Expo Notifications
- AsyncStorage
- React Native AppState
- Git and GitHub

## 📂 Project Structure

```text
KlnThings/
│
├── assets/
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── favorites.tsx
│   │   │   └── profile.tsx
│   │   │
│   │   ├── event/
│   │   │   └── [id].tsx
│   │   │
│   │   ├── edit-profile.tsx
│   │   └── _layout.tsx
│   │
│   ├── context/
│   │   ├── SavedEventsContext.tsx
│   │   └── ProfileContext.tsx
│   │
│   ├── data/
│   │   └── events.ts
│   │
│   └── utils/
│       └── notifications.ts
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/mendisvirasha-glitch/KlnThings.git
```

### 2. Navigate to the project folder

```bash
cd KlnThings
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the Expo development server

```bash
npx expo start
```

### 5. Run the application

- Scan the QR code using Expo Go on an Android device.
- Alternatively, run the application using an available emulator.

## 📸 Screenshots

Add application screenshots here.

## 🎥 Demo Video

Add the application demonstration video link here.

## 👩‍💻 Developer

**Virasha Mendis**

University of Kelaniya  
Faculty of Science

## 📌 Note

The application currently uses sample campus event data for demonstration purposes. Event details are illustrative and are not official university event announcements.

## 📄 License

This project was developed for academic purposes as part of a Mobile Application Development assignment.
```

Save the file.

### Step 5 — Complete the merge

After saving, return to the terminal and run:

```bash
git add README.md
```

Then:

```bash
git commit -m "Merge GitHub repository and update project README"
```

**Stop after these commands and send me the terminal output.** Then we'll push KlnThings to GitHub. 🚀