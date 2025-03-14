# Login-SignUp Page

A modern and responsive authentication system built with HTML, CSS, and JavaScript, featuring Firebase integration for secure user management.

## 🌟 Features

- **User Authentication**
  - Secure email and password registration
  - User login with email verification
  - Password reset functionality
  - Firebase Authentication integration

- **Modern UI/UX**
  - Responsive design for all devices
  - Clean and intuitive interface
  - Smooth transitions and animations
  - Form validation with real-time feedback

- **Security**
  - Firebase secure authentication
  - Protected routes and data
  - Secure password handling
  - Session management

##  Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Firebase Authentication
- Firebase Realtime Database

## 📁 Project Structure

```
Login-SignUp-Page/
├── index.html          # Login/Signup page
├── homepage.html       # Dashboard/Home page
├── style.css          # Main stylesheet
├── script.js          # Main JavaScript file
├── homepage.js        # Homepage specific JavaScript
├── firebaseauth.js    # Firebase authentication logic
└── README.md          # Project documentation
```

## 🛠️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/akshayk7k/Login-SignUp-Page.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Add your Firebase configuration in `firebaseauth.js`
   - Enable Email/Password authentication in Firebase Console

4. Run the application:
   - Open `index.html` in your browser
   - Start using the authentication system

## 🔒 Firebase Configuration

To configure Firebase, add your credentials in `firebaseauth.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## 📧 Contact

Akshay K - [@akshayk7k](https://github.com/akshayk7k)

Project Link: [https://github.com/akshayk7k/Login-SignUp-Page](https://github.com/akshayk7k/Login-SignUp-Page)
