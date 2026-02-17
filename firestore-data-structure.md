# Firestore Data Structure for CFM Management System

This document describes the complete Firestore data structure for the Charity And Faith Mission (CFM) Management System.

## Collections Overview

### 1. Users Collection
**Path:** `/users/{userId}`

Stores user authentication and role information.

```javascript
{
  uid: "user_unique_id",
  email: "user@example.com",
  displayName: "John Doe",
  role: "admin" | "branchAdmin" | "member",
  branch: "Main Branch",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastLogin: Timestamp,
  photoURL: "https://storage.../profile.jpg",
  phoneNumber: "+1234567890",
  settings: {
    theme: "light",
    notifications: true,
    language: "en"
  }
}
```

### 2. Members Collection
**Path:** `/members/{memberId}`

Main member database with comprehensive profile information.

```javascript
{
  id: "member_unique_id",
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+1234567890",
  whatsapp: "+1234567890",
  address: "123 Main St, City, State",
  dateOfBirth: "1990-01-15",
  gender: "Female" | "Male" | "Other",
  maritalStatus: "Single" | "Married" | "Widowed" | "Divorced",
  occupation: "Engineer",
  
  // Church Information
  branch: "Main Branch",
  ministry: "Choir",
  cellGroup: "Cell A",
  membershipDate: "2020-06-15",
  baptismDate: "2020-07-20",
  status: "Active" | "Inactive" | "Transferred",
  
  // Leadership Roles
  isLeader: false,
  leadershipRole: "Cell Leader" | "Ministry Leader" | null,
  
  // Emergency Contact
  emergencyContact: {
    name: "John Smith",
    relationship: "Spouse",
    phone: "+1234567890"
  },
  
  // Additional Information
  photo: "https://storage.../member_photo.jpg",
  notes: "Additional notes about the member",
  tags: ["Youth", "Tech Team"],
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  createdBy: "user_id",
  lastModifiedBy: "user_id"
}
```

### 3. Visitors Collection
**Path:** `/visitors/{visitorId}`

Tracks church visitors and first-time attendees.

```javascript
{
  id: "visitor_unique_id",
  name: "Michael Johnson",
  phone: "+1234567890",
  email: "michael@example.com",
  address: "456 Oak Ave",
  visitDate: "2024-01-15",
  service: "Sunday Service" | "Mid-week Service" | "Special Event",
  howDidYouHearAboutUs: "Friend" | "Social Media" | "Flyer" | "Other",
  interestedInMembership: true,
  prayerRequest: "Prayer for family",
  followUpStatus: "Pending" | "Contacted" | "Visited" | "Completed",
  assignedTo: "user_id",
  notes: "Visitor notes",
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 4. Events Collection
**Path:** `/events/{eventId}`

Church events and programs.

```javascript
{
  id: "event_unique_id",
  title: "Sunday Worship Service",
  description: "Weekly Sunday worship and praise",
  date: "2024-01-21",
  startTime: "10:00",
  endTime: "12:00",
  location: "Main Sanctuary",
  branch: "Main Branch",
  eventType: "Service" | "Conference" | "Seminar" | "Outreach" | "Social",
  organizer: "user_id",
  
  // Event Details
  expectedAttendance: 200,
  registrationRequired: false,
  registrationLink: "https://...",
  
  // Media
  bannerImage: "https://storage.../event_banner.jpg",
  attachments: ["https://storage.../flyer.pdf"],
  
  // Status
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled",
  
  createdAt: Timestamp,
  updatedAt: Timestamp,
  createdBy: "user_id"
}
```

### 5. Tithes Collection
**Path:** `/tithes/{titheId}`

Donation and tithe records.

```javascript
{
  id: "tithe_unique_id",
  memberId: "member_id",
  memberName: "Jane Smith",
  amount: 500.00,
  currency: "USD",
  date: "2024-01-15",
  
  // Type
  type: "Tithe" | "Offering" | "Special Offering" | "Building Fund" | "Missions",
  purpose: "General Tithe",
  
  // Payment Details
  paymentMethod: "Cash" | "Check" | "Card" | "Bank Transfer" | "Mobile Money",
  transactionId: "TXN123456",
  receiptNumber: "RCP-2024-001",
  receiptURL: "https://storage.../receipt.pdf",
  
  // Branch
  branch: "Main Branch",
  
  // Notes
  notes: "Monthly tithe",
  
  // Metadata
  recordedBy: "user_id",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 6. Attendance Collection
**Path:** `/attendance/{attendanceId}`

Service attendance tracking.

```javascript
{
  id: "attendance_unique_id",
  date: "2024-01-21",
  service: "Sunday Morning Service",
  branch: "Main Branch",
  
  // Counts
  adults: 150,
  children: 45,
  teenagers: 30,
  visitors: 12,
  totalAttendance: 237,
  
  // Breakdown by Ministry
  ministryBreakdown: {
    "Choir": 25,
    "Ushers": 15,
    "Media": 8
  },
  
  // Notes
  notes: "Special guest speaker",
  weather: "Clear",
  
  // Metadata
  recordedBy: "user_id",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 7. Leadership Collections

#### Ministry Leaders
**Path:** `/ministryLeaders/{leaderId}`

```javascript
{
  id: "leader_unique_id",
  memberId: "member_id",
  name: "Pastor John",
  ministry: "Music Ministry",
  position: "Ministry Leader",
  appointedDate: "2023-01-15",
  branch: "Main Branch",
  contactInfo: {
    phone: "+1234567890",
    email: "leader@example.com"
  },
  responsibilities: ["Coordinate weekly rehearsals", "Plan special programs"],
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Cell Leaders
**Path:** `/cellLeaders/{leaderId}`

```javascript
{
  id: "leader_unique_id",
  memberId: "member_id",
  name: "Sarah Williams",
  cellGroup: "Cell Group A",
  zone: "North Zone",
  members: ["member_id_1", "member_id_2"],
  memberCount: 12,
  meetingDay: "Wednesday",
  meetingTime: "19:00",
  meetingLocation: "123 Main St",
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Elders, Pastors, Branch Coordinators
Similar structure with role-specific fields.

### 8. Follow-ups Collection
**Path:** `/followUps/{followUpId}`

Visitor and member follow-up tracking.

```javascript
{
  id: "followup_unique_id",
  visitorId: "visitor_id",
  visitorName: "Michael Johnson",
  type: "Visitor Follow-up" | "Member Care" | "Prayer Request",
  
  assignedTo: "user_id",
  assignedToName: "John Doe",
  
  dueDate: "2024-01-25",
  status: "Pending" | "In Progress" | "Completed" | "Cancelled",
  priority: "High" | "Medium" | "Low",
  
  method: "Phone Call" | "Home Visit" | "WhatsApp" | "Email",
  notes: "Called and scheduled home visit",
  outcome: "Positive response, interested in membership",
  
  createdAt: Timestamp,
  updatedAt: Timestamp,
  completedAt: Timestamp | null
}
```

### 9. Reminders Collection
**Path:** `/reminders/{reminderId}`

Task and event reminders.

```javascript
{
  id: "reminder_unique_id",
  title: "Follow up with visitor",
  description: "Call Michael Johnson about membership",
  dueDate: "2024-01-25",
  dueTime: "14:00",
  
  relatedTo: {
    type: "visitor" | "member" | "event" | "general",
    id: "related_item_id"
  },
  
  assignedTo: "user_id",
  priority: "High" | "Medium" | "Low",
  completed: false,
  completedAt: Timestamp | null,
  
  notificationSent: false,
  notificationTime: Timestamp | null,
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 10. WhatsApp History Collection
**Path:** `/whatsappHistory/{historyId}`

WhatsApp broadcast and messaging logs.

```javascript
{
  id: "whatsapp_unique_id",
  type: "Broadcast" | "Group Message" | "Individual",
  
  // Recipients
  recipientType: "All Members" | "Ministry" | "Cell Group" | "Custom List",
  recipientCount: 150,
  recipients: ["phone_1", "phone_2"],
  
  // Message
  subject: "Sunday Service Reminder",
  message: "Join us for worship this Sunday at 10am!",
  mediaURL: "https://storage.../flyer.jpg",
  
  // Status
  status: "Sent" | "Pending" | "Failed",
  sentAt: Timestamp,
  deliveredCount: 145,
  failedCount: 5,
  
  // Metadata
  sentBy: "user_id",
  createdAt: Timestamp
}
```

### 11. Conference Reports Collection
**Path:** `/conferenceReports/{reportId}`

Conference and event reports.

```javascript
{
  id: "report_unique_id",
  conferenceName: "Annual Convention 2024",
  conferenceDate: "2024-03-15",
  location: "Main Auditorium",
  branch: "Main Branch",
  
  // Statistics
  totalAttendance: 500,
  numberOfSpeakers: 5,
  numberOfSessions: 8,
  
  // Financials
  budget: 10000.00,
  actualExpenditure: 9500.00,
  income: 12000.00,
  
  // Content
  summary: "Successful conference with great turnout...",
  highlights: ["Powerful worship", "Inspiring messages"],
  challenges: ["Parking space limited"],
  recommendations: ["Book larger venue next time"],
  
  // Attachments
  photos: ["https://storage.../photo1.jpg"],
  documents: ["https://storage.../report.pdf"],
  
  // Metadata
  submittedBy: "user_id",
  approvedBy: "user_id" | null,
  status: "Draft" | "Submitted" | "Approved",
  
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 12. Tithe Reports Collection
**Path:** `/titheReports/{reportId}`

Financial summary reports.

```javascript
{
  id: "report_unique_id",
  reportType: "Monthly" | "Quarterly" | "Annual",
  period: "2024-01",
  startDate: "2024-01-01",
  endDate: "2024-01-31",
  branch: "Main Branch",
  
  // Summary
  totalTithes: 25000.00,
  totalOfferings: 8000.00,
  totalSpecialOfferings: 5000.00,
  grandTotal: 38000.00,
  
  // Breakdown
  breakdown: {
    "Cash": 15000.00,
    "Check": 10000.00,
    "Card": 8000.00,
    "Bank Transfer": 5000.00
  },
  
  // Comparison
  previousPeriodTotal: 35000.00,
  percentageChange: 8.57,
  
  // Metadata
  generatedBy: "user_id",
  generatedAt: Timestamp,
  createdAt: Timestamp
}
```

### 13. Vault Collection
**Path:** `/vault/{vaultId}`

Secure notes and sensitive information (admin only).

```javascript
{
  id: "vault_unique_id",
  title: "Bank Account Details",
  content: "Encrypted or sensitive content",
  category: "Financial" | "Legal" | "Personal" | "Other",
  tags: ["Banking", "Official"],
  
  // Access Control
  accessLevel: "Admin Only",
  sharedWith: ["user_id_1"],
  
  // Metadata
  createdBy: "user_id",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastAccessedAt: Timestamp,
  lastAccessedBy: "user_id"
}
```

### 14. Saved Imports Collection
**Path:** `/savedImports/{importId}`

Import history and audit trail.

```javascript
{
  id: "import_unique_id",
  importType: "Members" | "Visitors" | "Tithes" | "Events",
  fileName: "members_import_2024.csv",
  fileURL: "https://storage.../imports/file.csv",
  
  // Import Details
  totalRecords: 150,
  successfulRecords: 145,
  failedRecords: 5,
  duplicatesFound: 3,
  
  // Errors
  errors: [
    {
      row: 10,
      field: "email",
      error: "Invalid email format",
      value: "notanemail"
    }
  ],
  
  // Settings
  mappings: {
    "Name": "name",
    "Email Address": "email",
    "Phone Number": "phone"
  },
  
  // Metadata
  importedBy: "user_id",
  importedAt: Timestamp,
  createdAt: Timestamp
}
```

### 15. Conference Budgets Collection
**Path:** `/conferenceBudgets/{budgetId}`

Conference budget planning.

```javascript
{
  id: "budget_unique_id",
  conferenceName: "Youth Conference 2024",
  conferenceDate: "2024-06-15",
  branch: "Main Branch",
  
  // Budget Items
  budgetItems: [
    {
      category: "Venue",
      description: "Conference hall rental",
      estimatedCost: 2000.00,
      actualCost: 1800.00
    },
    {
      category: "Catering",
      description: "Lunch for 200 people",
      estimatedCost: 3000.00,
      actualCost: 0.00
    }
  ],
  
  // Totals
  totalEstimated: 10000.00,
  totalActual: 8500.00,
  variance: 1500.00,
  
  // Status
  status: "Draft" | "Approved" | "In Progress" | "Completed",
  approvedBy: "user_id" | null,
  approvalDate: Timestamp | null,
  
  // Metadata
  createdBy: "user_id",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 16. Bible Quiz Scores Collection
**Path:** `/bibleQuizScores/{scoreId}`

Bible quiz game scores and leaderboard.

```javascript
{
  id: "score_unique_id",
  playerName: "John Doe",
  memberId: "member_id" | null,
  
  score: 850,
  questionsAnswered: 10,
  correctAnswers: 8,
  wrongAnswers: 2,
  timeElapsed: 120, // seconds
  
  difficulty: "Easy" | "Medium" | "Hard",
  category: "Old Testament" | "New Testament" | "General",
  
  completedAt: Timestamp,
  createdAt: Timestamp
}
```

### 17. User Settings Collection
**Path:** `/userSettings/{userId}`

User-specific preferences and settings.

```javascript
{
  userId: "user_id",
  theme: {
    mode: "light" | "dark",
    primaryColor: "#2c3e50",
    brightness: 100,
    contrast: 100,
    saturation: 100
  },
  
  notifications: {
    email: true,
    push: true,
    sms: false,
    reminders: true,
    followUps: true
  },
  
  display: {
    language: "en",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h" | "24h",
    currency: "USD"
  },
  
  privacy: {
    profileVisibility: "Public" | "Private",
    showContactInfo: true
  },
  
  updatedAt: Timestamp
}
```

### 18. System Settings Collection
**Path:** `/systemSettings/{settingId}`

Global system configuration (admin only).

```javascript
{
  id: "settings_unique_id",
  category: "General" | "Email" | "SMS" | "Payment",
  
  settings: {
    churchName: "Charity And Faith Mission",
    mainBranch: "Main Branch",
    defaultCurrency: "USD",
    timezone: "America/New_York",
    
    // Contact
    email: "info@cfm.org",
    phone: "+1234567890",
    address: "123 Church St, City, State",
    
    // Features
    enableMemberPortal: true,
    enableOnlineGiving: true,
    enableEventRegistration: true,
    
    // Limits
    maxFileUploadSize: 10485760, // 10MB in bytes
    sessionTimeout: 3600 // 1 hour in seconds
  },
  
  updatedBy: "user_id",
  updatedAt: Timestamp
}
```

## Data Validation Rules

### Required Fields by Collection

**Members:**
- name, email, phone, branch, createdAt

**Visitors:**
- name, phone, visitDate

**Events:**
- title, date, location

**Tithes:**
- amount, date, type

**Attendance:**
- date, service, totalAttendance

### Data Types

- **Timestamps:** Use Firestore Timestamp objects
- **Dates:** ISO 8601 format strings (YYYY-MM-DD)
- **Currency:** Number with 2 decimal places
- **Phone Numbers:** E.164 format recommended
- **Email:** Valid email format

## Indexes

See `firestore.indexes.json` for all configured indexes.

## Security

All collections are protected by security rules defined in `firestore.rules`. Key principles:

1. **Authentication Required:** All operations require authentication
2. **Role-Based Access:** Admin, Branch Admin, and Member roles
3. **Data Validation:** Server-side validation of required fields
4. **Audit Trail:** CreatedAt, updatedAt, createdBy, updatedBy fields

## Migration from localStorage

To migrate existing localStorage data to Firestore:

1. Export data using the backup function in the app
2. Transform data to match Firestore schema
3. Import using Firebase Admin SDK or batch operations
4. Verify data integrity
5. Update application code to use Firestore SDK

## Best Practices

1. **Use subcollections** for related data that grows unbounded
2. **Denormalize data** where appropriate for read performance
3. **Use batch writes** for multiple related updates
4. **Implement proper error handling** for all Firestore operations
5. **Monitor quota usage** and optimize queries
