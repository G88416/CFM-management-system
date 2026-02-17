# Firebase Setup and Deployment Guide

This guide explains how to set up and deploy the Firestore rules, storage rules, and initial data for the CFM Management System.

## Prerequisites

1. **Firebase CLI** - Install globally:
   ```bash
   npm install -g firebase-tools
   ```

2. **Firebase Project** - You should already have a Firebase project:
   - Project ID: `g-19systems`
   - Project URL: https://console.firebase.google.com/project/g-19systems

## Files Overview

This repository includes the following Firebase configuration files:

- **`firebase.json`** - Main Firebase configuration file
- **`firestore.rules`** - Security rules for Firestore database
- **`firestore.indexes.json`** - Database indexes for query optimization
- **`storage.rules`** - Security rules for Firebase Storage
- **`firestore-seed-data.json`** - Sample data to seed the database
- **`firestore-data-structure.md`** - Complete documentation of data structure

## Setup Instructions

### 1. Login to Firebase

```bash
firebase login
```

This will open a browser window for authentication.

### 2. Initialize Firebase Project

Link your local repository to the Firebase project:

```bash
firebase use g-19systems
```

Or if you need to add the project:

```bash
firebase use --add
# Select "g-19systems" from the list
# Give it an alias like "production"
```

### 3. Deploy Firestore Rules

Deploy the security rules to Firestore:

```bash
firebase deploy --only firestore:rules
```

### 4. Deploy Firestore Indexes

Deploy the database indexes:

```bash
firebase deploy --only firestore:indexes
```

### 5. Deploy Storage Rules

Deploy the storage security rules:

```bash
firebase deploy --only storage
```

### 6. Deploy Everything at Once

To deploy all Firebase features:

```bash
firebase deploy
```

## Seeding Initial Data

### Option 1: Using Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/project/g-19systems/firestore)
2. Navigate to Firestore Database
3. Click "Start Collection"
4. Manually create collections and documents based on `firestore-seed-data.json`

### Option 2: Using Firebase Admin SDK (Recommended)

Create a Node.js script to import the seed data:

1. **Install dependencies:**
   ```bash
   npm install firebase-admin
   ```

2. **Create import script** (`import-seed-data.js`):
   ```javascript
   const admin = require('firebase-admin');
   const seedData = require('./firestore-seed-data.json');
   
   // Initialize Firebase Admin with service account
   const serviceAccount = require('./service-account-key.json');
   admin.initializeApp({
     credential: admin.credential.cert(serviceAccount)
   });
   
   const db = admin.firestore();
   
   async function importData() {
     const batch = db.batch();
     
     for (const [collection, documents] of Object.entries(seedData)) {
       console.log(`Importing ${collection}...`);
       for (const [docId, docData] of Object.entries(documents)) {
         const docRef = db.collection(collection).doc(docId);
         batch.set(docRef, docData);
       }
     }
     
     await batch.commit();
     console.log('✅ All seed data imported successfully!');
   }
   
   importData().catch(console.error);
   ```

3. **Download Service Account Key:**
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save as `service-account-key.json` (don't commit this!)

4. **Run import:**
   ```bash
   node import-seed-data.js
   ```

### Option 3: Using Firestore Emulator (For Testing)

1. **Start emulators:**
   ```bash
   firebase emulators:start
   ```

2. Access the Emulator UI at http://localhost:4000

3. Import data through the UI or use the Admin SDK pointing to the emulator

## Authentication Setup

The current system uses hardcoded authentication. To enable proper Firebase Authentication:

### 1. Enable Authentication in Firebase Console

1. Go to Authentication → Sign-in method
2. Enable "Email/Password" provider
3. Optionally enable other providers (Google, Facebook, etc.)

### 2. Create Admin Users

Using Firebase Console or Admin SDK, create initial users:

```javascript
// Create admin user
admin.auth().createUser({
  email: 'charity@cfm.org',
  password: 'YourSecurePassword',
  displayName: 'Charity Admin',
  emailVerified: true
}).then((userRecord) => {
  // Add user to Firestore with admin role
  return db.collection('users').doc(userRecord.uid).set({
    uid: userRecord.uid,
    email: 'charity@cfm.org',
    displayName: 'Charity Admin',
    role: 'admin',
    branch: 'Main Branch',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
});
```

### 3. Update Application Code

Modify `index.html` to use Firebase Authentication instead of hardcoded login:

```javascript
// Replace hardcoded login with:
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    // Fetch user role from Firestore
    return db.collection('users').doc(user.uid).get();
  })
  .then((doc) => {
    const userData = doc.data();
    // Check role and grant access
    if (userData.role === 'admin' || userData.role === 'branchAdmin') {
      // Show dashboard
    }
  })
  .catch((error) => {
    console.error('Login error:', error);
  });
```

## Security Rules Explained

### Firestore Rules

The rules implement role-based access control (RBAC):

- **Admin**: Full access to all collections
- **Branch Admin**: Can create/update most data, limited delete access
- **Authenticated Users**: Read-only access to most collections

Key security features:
- All operations require authentication
- Data validation on create/update operations
- Ownership checks for user-specific data
- Special protection for vault and system settings

### Storage Rules

Storage rules control file uploads:

- **Size limits**: 2MB-100MB depending on file type
- **File type validation**: Only allows specific MIME types
- **Access control**: Based on user roles
- **Path-based security**: Different rules for different storage paths

## Testing

### Test Firestore Rules

```bash
firebase emulators:start --only firestore
```

Then run your tests against the emulator.

### Test Storage Rules

```bash
firebase emulators:start --only storage
```

## Monitoring and Maintenance

### 1. Monitor Usage

Check Firebase Console for:
- Database reads/writes quota
- Storage usage
- Authentication activity
- Security rule violations

### 2. Backup Data

Regular backups are important:

```bash
# Export Firestore data
firebase firestore:export gs://g-19systems.firebasestorage.app/backups/$(date +%Y%m%d)
```

### 3. Update Rules

When updating rules, test first in emulator:

```bash
firebase emulators:start
# Test your changes
firebase deploy --only firestore:rules
```

## Troubleshooting

### Permission Denied Errors

1. Check that user is authenticated
2. Verify user role in `/users/{userId}` document
3. Check Firestore rules match your access patterns
4. Check browser console for detailed error messages

### Slow Queries

1. Check Firestore usage tab for query performance
2. Add indexes as suggested by Firebase
3. Consider denormalizing data for faster reads

### Storage Upload Failures

1. Verify file size is within limits
2. Check file MIME type is allowed
3. Ensure user has proper role/permissions
4. Check browser console for CORS issues

## Migration from localStorage

To migrate existing localStorage data:

1. **Export current data** using the app's backup feature
2. **Transform data** to match Firestore schema (see `firestore-data-structure.md`)
3. **Import using script** or Firebase console
4. **Update application** to use Firestore SDK instead of localStorage
5. **Test thoroughly** before removing localStorage code

Example transformation:

```javascript
// localStorage format
const members = JSON.parse(localStorage.getItem('members')) || [];

// Convert to Firestore format
members.forEach(member => {
  db.collection('members').add({
    ...member,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
});
```

## Best Practices

1. **Never commit service account keys** - Add to `.gitignore`
2. **Use environment variables** for sensitive config
3. **Test rules thoroughly** before deploying to production
4. **Monitor quota usage** to avoid unexpected charges
5. **Implement proper error handling** in application code
6. **Use batch operations** for multiple related writes
7. **Cache frequently accessed data** in application
8. **Set up security alerts** in Firebase Console

## Additional Resources

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Storage Documentation](https://firebase.google.com/docs/storage)
- [Security Rules Guide](https://firebase.google.com/docs/rules)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## Support

For issues with Firebase setup, refer to:
- Firebase Console: https://console.firebase.google.com/project/g-19systems
- Firebase Support: https://firebase.google.com/support
- Stack Overflow: Tag questions with `firebase` and `google-cloud-firestore`

---

**Note**: Remember to replace the hardcoded credentials in the application with proper Firebase Authentication once the setup is complete.
