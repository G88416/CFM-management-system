# CFM Management System

**Charity And Faith Mission Management System** - A comprehensive church management platform with Firebase backend.

## 🌟 Features

- **Member Management** - Track members, contact info, ministries, and leadership roles
- **Visitor Tracking** - Register and follow up with church visitors
- **Event Management** - Plan and track church events and programs
- **Financial Management** - Record tithes, offerings, and donations
- **Attendance Tracking** - Monitor service attendance across all ministries
- **Leadership Management** - Organize ministry leaders, cell leaders, elders, and pastors
- **Follow-up System** - Schedule and track visitor and member follow-ups
- **WhatsApp Integration** - Broadcast messages to members and groups
- **Reporting** - Generate conference, financial, and visitor reports
- **Bible Quiz** - Interactive Bible quiz with leaderboard
- **Secure Vault** - Admin-only secure notes storage
- **Multi-branch Support** - Manage multiple church branches

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Firebase account
- Firebase CLI installed globally

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/G88416/CFM-management-system.git
   cd CFM-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Login to Firebase:**
   ```bash
   firebase login
   ```

4. **Deploy Firebase configuration:**
   ```bash
   npm run deploy
   ```

5. **Import sample data (optional):**
   ```bash
   # Download service account key from Firebase Console
   npm run import-data
   ```

6. **Open the application:**
   ```bash
   # Simply open index.html in a web browser
   open index.html
   ```

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get up and running in 5 minutes
- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** - Detailed Firebase setup and deployment guide
- **[firestore-data-structure.md](firestore-data-structure.md)** - Complete database schema documentation

## 🗂️ Project Structure

```
CFM-management-system/
├── index.html                      # Main application
├── valuable                        # Backup/legacy HTML
├── firebase.json                   # Firebase configuration
├── firestore.rules                 # Firestore security rules
├── firestore.indexes.json          # Database indexes
├── storage.rules                   # Storage security rules
├── firestore-seed-data.json        # Sample data
├── firestore-data-structure.md     # Database schema docs
├── import-seed-data.js             # Data import script
├── package.json                    # NPM configuration
├── FIREBASE_SETUP.md               # Setup guide
├── QUICKSTART.md                   # Quick start guide
├── README.md                       # This file
└── .gitignore                      # Git ignore rules
```

## 🔐 Security

### Firestore Rules

Role-based access control with three roles:
- **Admin** - Full access to all collections
- **Branch Admin** - Can create/update most data, limited delete access
- **Member** - Read-only access to most collections

### Storage Rules

File upload security:
- **Size limits**: 2MB - 100MB based on file type
- **MIME type validation**: Only allows specific file types
- **Role-based permissions**: Controlled by user role
- **Path-based security**: Different rules for different storage paths

## 📊 Data Collections

The system manages 18+ Firestore collections:

**Core Data:**
- `members` - Church member profiles
- `visitors` - Visitor registrations
- `events` - Church events and programs
- `tithes` - Donations and tithes
- `attendance` - Service attendance records

**Leadership:**
- `ministryLeaders` - Ministry leadership
- `cellLeaders` - Cell group leaders
- `elders` - Church elders
- `pastors` - Pastoral staff
- `branchCoordinators` - Branch coordinators

**Operations:**
- `followUps` - Visitor and member follow-ups
- `reminders` - Task reminders
- `whatsappHistory` - WhatsApp broadcast logs

**Reports:**
- `conferenceReports` - Conference reports
- `titheReports` - Financial reports
- `visitorsReports` - Visitor reports

**Other:**
- `users` - User accounts and roles
- `vault` - Secure notes (admin only)
- `savedImports` - Import history
- `conferenceBudgets` - Budget planning
- `bibleQuizScores` - Quiz leaderboard
- `userSettings` - User preferences
- `systemSettings` - System configuration

## 🛠️ Available NPM Scripts

```bash
npm run import-data          # Import seed data to Firestore
npm run import-data-clear    # Clear all data, then import
npm run deploy               # Deploy everything to Firebase
npm run deploy:rules         # Deploy security rules only
npm run deploy:indexes       # Deploy indexes only
npm run emulators            # Start Firebase emulators for testing
```

## 🧪 Testing

### Local Testing with Emulators

```bash
# Start Firebase emulators
npm run emulators

# Access emulator UI at http://localhost:4000
```

**Emulator Ports:**
- Firestore: `localhost:8080`
- Storage: `localhost:9199`
- Authentication: `localhost:9099`
- Emulator UI: `localhost:4000`

## 🔄 Migration from localStorage

The current application uses localStorage for data storage. To migrate to Firebase:

1. **Export existing data** using the backup feature in the app
2. **Transform data** to match Firestore schema (see `firestore-data-structure.md`)
3. **Import data** using the `import-seed-data.js` script as a template
4. **Update application code** to use Firestore SDK instead of localStorage
5. **Test thoroughly** before removing localStorage code

## 🔑 Authentication

### Current Login Credentials

**Main Portal:**
- Username: `charity`
- Password: `faith`

**Branch Admin Portal:**
- Username: `faith`
- Password: `charity`

### Recommended: Firebase Authentication

Replace hardcoded login with Firebase Authentication:

1. Enable Email/Password authentication in Firebase Console
2. Create admin users with proper roles
3. Update login logic to use `firebase.auth().signInWithEmailAndPassword()`
4. Implement proper session management

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions.

## 📦 Dependencies

### Runtime
- **Firebase SDK** - Backend services
  - Realtime Database
  - Authentication
  - Storage

### Development
- **firebase-admin** - Server-side Firebase operations
- **firebase-tools** - CLI for deployment

### Frontend Libraries
- Chart.js - Data visualization
- XLSX.js - Excel file parsing
- PDF.js - PDF file parsing
- Mammoth.js - Word document parsing
- Fuzzysort - Fuzzy search
- Stripe - Payment processing
- PayPal - Payment processing

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 License

MIT License - see LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🆘 Support

- **Firebase Console**: https://console.firebase.google.com/project/g-19systems
- **Firebase Documentation**: https://firebase.google.com/docs
- **Issues**: Submit issues on GitHub

## 🎯 Roadmap

- [ ] Implement Firebase Authentication
- [ ] Add real-time data synchronization
- [ ] Create mobile app version
- [ ] Add SMS notifications
- [ ] Implement advanced analytics
- [ ] Add multi-language support
- [ ] Create API for third-party integrations
- [ ] Add automated backups

## ⚠️ Important Notes

1. **Service Account Keys**: Never commit `service-account-key.json` to version control
2. **Test First**: Always test in emulator before deploying to production
3. **Backup Data**: Regular backups are essential - use the built-in backup feature
4. **Security Rules**: Review and update security rules as needed
5. **Quota Monitoring**: Monitor Firebase quota usage to avoid unexpected charges

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for Charity And Faith Mission**
