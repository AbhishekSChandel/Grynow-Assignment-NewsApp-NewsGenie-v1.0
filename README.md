# Assignment-NewsGenie-v1.0
Contains the source code for the news app created with react native
# NewsGenie 📰

A modern, feature-rich news application built with React Native and Expo, powered by the MediaStack API.

## Features ✨

- 🔍 Real-time news updates from multiple categories
- 🔍search functionalality 
- 📰 Breaking news carousel
- 🔖 Bookmark your favorite articles
- 🎨 Modern UI with NativeWind (Tailwind CSS)
- 📊 Category-based news filtering
- 🔄 Pull-to-refresh functionality
- 🔍Discover section to find and search news

## Tech Stack 🛠

- React Native
- Expo
- TypeScript
- NativeWind (Tailwind CSS)
- MediaStack API
- AsyncStorage for local data persistence

## Prerequisites 📋

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- MediaStack API key

## Installation 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/newsgenie.git
   cd newsgenie
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MediaStack API key:
   ```
   MEDIASTACK_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

## Building for Production 🏗

### Android
```bash
npx eas build -p android --profile preview
```

### iOS
```bash
npx eas build -p ios --profile preview
```

## Project Structure 📁

```
newsgenie/
├── app/                 # Main application code
│   ├── (tabs)/         # Tab-based navigation
│   └── _layout.tsx     # Root layout configuration
├── components/         # Reusable components
├── context/           # React Context providers
├── assets/            # Static assets
└── ...
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [MediaStack](https://mediastack.com/)

---

Made with ❤️ by [Your Name]

