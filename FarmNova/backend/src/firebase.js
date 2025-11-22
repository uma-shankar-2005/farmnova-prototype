// Firebase config and initialization for Node.js backend

const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Only initialize once
if (!global._firebaseApp) {
  global._firebaseApp = initializeApp({
    credential: applicationDefault(),
    // Or use serviceAccount: require("./serviceAccountKey.json"),
    projectId: "farmnova-83ab8",
  });
}
const db = getFirestore();

module.exports = db;
