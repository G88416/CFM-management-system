const admin = require('firebase-admin');
const seedData = require('./firestore-seed-data.json');

// Initialize Firebase Admin
// Option 1: Using service account key file
const serviceAccount = require('./service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Option 2: Using application default credentials (uncomment if using this method)
// admin.initializeApp({
//   credential: admin.credential.applicationDefault()
// });

const db = admin.firestore();

/**
 * Import seed data to Firestore
 */
async function importSeedData() {
  console.log('🚀 Starting seed data import...\n');
  
  try {
    let totalDocuments = 0;
    
    for (const [collectionName, documents] of Object.entries(seedData)) {
      console.log(`📦 Importing collection: ${collectionName}`);
      let batch = db.batch();
      let batchCount = 0;
      
      for (const [docId, docData] of Object.entries(documents)) {
        const docRef = db.collection(collectionName).doc(docId);
        
        // Convert date strings to Firestore Timestamps where appropriate
        const processedData = processDocumentData(docData);
        
        batch.set(docRef, processedData);
        batchCount++;
        totalDocuments++;
        
        // Firestore batch limit is 500 operations
        if (batchCount >= 500) {
          await batch.commit();
          console.log(`  ✓ Committed batch of ${batchCount} documents`);
          batch = db.batch(); // Create new batch after commit
          batchCount = 0;
        }
      }
      
      // Commit remaining documents in batch
      if (batchCount > 0) {
        await batch.commit();
        console.log(`  ✓ Committed ${batchCount} documents`);
      }
      
      console.log(`✅ Collection ${collectionName} imported successfully\n`);
    }
    
    console.log(`\n🎉 Import complete! Total documents imported: ${totalDocuments}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing seed data:', error);
    process.exit(1);
  }
}

/**
 * Process document data to convert date strings to Firestore Timestamps
 */
function processDocumentData(data) {
  const processed = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && isISODateString(value)) {
      // Convert ISO date string to Firestore Timestamp
      processed[key] = admin.firestore.Timestamp.fromDate(new Date(value));
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively process nested objects
      processed[key] = processDocumentData(value);
    } else {
      processed[key] = value;
    }
  }
  
  return processed;
}

/**
 * Check if a string is an ISO date string
 */
function isISODateString(str) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) {
    return false;
  }
  const date = new Date(str);
  return date instanceof Date && !isNaN(date);
}

/**
 * Clear all collections (USE WITH CAUTION!)
 */
async function clearAllCollections() {
  console.log('⚠️  WARNING: This will delete all data in Firestore!');
  console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const collections = await db.listCollections();
  
  for (const collection of collections) {
    console.log(`🗑️  Deleting collection: ${collection.id}`);
    await deleteCollection(collection, 100);
  }
  
  console.log('✅ All collections cleared\n');
}

/**
 * Delete all documents in a collection
 */
async function deleteCollection(collectionRef, batchSize) {
  const query = collectionRef.limit(batchSize);
  
  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve, reject);
  });
}

/**
 * Delete documents in batches
 */
async function deleteQueryBatch(query, resolve, reject) {
  try {
    const snapshot = await query.get();
    
    if (snapshot.size === 0) {
      resolve();
      return;
    }
    
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    
    // Recurse on the next process tick to avoid rate limiting
    process.nextTick(() => {
      deleteQueryBatch(query, resolve, reject);
    });
  } catch (error) {
    reject(error);
  }
}

// Command line interface
const args = process.argv.slice(2);

if (args.includes('--clear')) {
  console.log('🧹 Running in CLEAR mode - will delete all data first\n');
  clearAllCollections().then(() => {
    importSeedData();
  });
} else if (args.includes('--help')) {
  console.log(`
Firestore Seed Data Import Script

Usage:
  node import-seed-data.js [options]

Options:
  --clear     Clear all existing data before importing (DANGEROUS!)
  --help      Show this help message

Examples:
  node import-seed-data.js                Import seed data
  node import-seed-data.js --clear        Clear all data, then import seed data

Note: You need a service-account-key.json file to run this script.
Download it from Firebase Console > Project Settings > Service Accounts
  `);
  process.exit(0);
} else {
  importSeedData();
}
