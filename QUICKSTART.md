# Quick Start Guide - Firebase for CFM Management System

## 🚀 Get Started in 5 Minutes

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Select Project
```bash
firebase use g-19systems
```

### Step 4: Deploy Rules
```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

### Step 5 (Optional): Import Sample Data
```bash
# Install dependencies
npm install

# Download service account key from Firebase Console
# Project Settings > Service Accounts > Generate New Private Key
# Save as service-account-key.json

# Import data
npm run import-data
```

## 📁 What Was Created

| File | Purpose |
|------|---------|
| `firebase.json` | Main Firebase configuration |
| `firestore.rules` | Database security rules |
| `firestore.indexes.json` | Query optimization indexes |
| `storage.rules` | File upload security rules |
| `firestore-seed-data.json` | Sample data for testing |
| `firestore-data-structure.md` | Complete data schema documentation |
| `FIREBASE_SETUP.md` | Detailed setup instructions |
| `import-seed-data.js` | Script to import sample data |
| `package.json` | Node.js dependencies and scripts |

## 🔐 Security Features

### Firestore Rules
- ✅ Role-based access (Admin, Branch Admin, Member)
- ✅ Authentication required for all operations
- ✅ Data validation on create/update
- ✅ Owner-based access for user settings
- ✅ Admin-only access for vault and system settings

### Storage Rules
- ✅ File size limits (2MB - 100MB based on type)
- ✅ MIME type validation
- ✅ Role-based upload permissions
- ✅ User-specific profile pictures

## 📊 Data Collections

The system includes 18+ data collections:

**Core Data:**
- Members, Visitors, Events, Tithes, Attendance

**Leadership:**
- Ministry Leaders, Cell Leaders, Elders, Pastors, Branch Coordinators

**Management:**
- Follow-ups, Reminders, WhatsApp History

**Reports:**
- Conference Reports, Tithe Reports, Visitor Reports

**Other:**
- Vault, Saved Imports, Conference Budgets, Bible Quiz Scores

**Settings:**
- Users, User Settings, System Settings

## 🧪 Testing with Emulators

Run Firebase locally for testing:

```bash
# Start all emulators
firebase emulators:start

# Access emulator UI
# Open http://localhost:4000
```

**Emulator Ports:**
- Firestore: `localhost:8080`
- Storage: `localhost:9199`
- Auth: `localhost:9099`
- UI: `localhost:4000`

## 📖 Sample Data

The seed data includes:
- 2 admin/branch admin users
- 3 sample members
- 2 visitors
- 3 events (including past and upcoming)
- 3 tithe records
- 2 attendance records
- Leadership records
- Follow-ups and reminders
- Bible quiz scores

## 🔄 Migration from localStorage

Current app uses localStorage. To migrate:

1. Export data using backup feature
2. Transform to Firestore format (see `firestore-data-structure.md`)
3. Import using `import-seed-data.js` as template
4. Update app code to use Firestore SDK
5. Test thoroughly

## 📝 NPM Scripts Available

```bash
npm run import-data          # Import seed data
npm run import-data-clear    # Clear all data, then import
npm run deploy               # Deploy everything to Firebase
npm run deploy:rules         # Deploy only security rules
npm run deploy:indexes       # Deploy only indexes
npm run emulators            # Start Firebase emulators
```

## ⚠️ Important Notes

1. **Service Account Key**: Never commit `service-account-key.json` to git
2. **Test First**: Always test rules in emulator before deploying
3. **Backup Data**: Regular backups are essential
4. **Authentication**: Replace hardcoded login with Firebase Auth
5. **Environment**: Use different projects for dev/staging/production

## 🆘 Need Help?

- **Detailed Setup**: See `FIREBASE_SETUP.md`
- **Data Schema**: See `firestore-data-structure.md`
- **Firebase Docs**: https://firebase.google.com/docs
- **Support**: https://firebase.google.com/support

## ✅ Next Steps

1. Deploy security rules to Firebase
2. Set up Firebase Authentication
3. Import sample data for testing
4. Update application to use Firestore instead of localStorage
5. Test thoroughly in emulator
6. Deploy to production

---

**Ready to Deploy?**

```bash
firebase deploy
```

That's it! Your CFM Management System is now backed by Firebase! 🎉
