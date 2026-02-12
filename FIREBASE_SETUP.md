# Firebase User & Project Setup Guide

This guide explains how to set up the Firebase project and user accounts using the provided code configuration.

## Prerequisites
1.  **Node.js** installed.
2.  **Firebase CLI** installed (optional, can use `npx`).
    ```bash
    npm install -g firebase-tools
    ```

## Step 1: Login to Firebase
Run the following command in your terminal to log in to your Google account:
```bash
npx firebase login
```

## Step 2: Initialize / Link Project
1.  Run the initialization command:
    ```bash
    npx firebase init firestore
    ```
2.  **Select**: "Use an existing project" (if you created one in console) OR "Create a new project".
3.  **Firestore Rules**: Press Enter to accept `firestore.rules`.
4.  **Firestore Indexes**: Press Enter to accept `firestore.indexes.json` (if prompted, otherwise it creates it).

## Step 3: Deploy Rules
Now that the project is linked, deploy the security rules defined in `firestore.rules`:
```bash
npm run deploy:rules
```
*This command sends the rules from your code to the Firebase cloud, enabling access.*

## Step 4: Create Initial Admin User
Since registration is disabled in the app, you must create the first user in the Firebase Console.

1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Navigate to **Authentication** > **Sign-in method** and enable **Email/Password**.
3.  Navigate to **Users** and click **Add user**.
4.  Enter email (e.g., `admin@example.com`) and a temporary password (e.g., `password123`).
5.  **Copy the User UID** after creation.

## Step 5: Verify Access
1.  Start the app (`npm run dev`).
2.  Login with the email and password from Step 4.
3.  The app will **automatically create your user profile** in the database upon first login.
4.  You should initially see zero RSVPs (if none exist), but **no permission errors**.

## Troubleshooting
If you see "Missing or insufficient permissions":
1.  Ensure you ran **Step 3** (`npm run deploy:rules`) successfully.
2.  Ensure you are logged in with the created user.
