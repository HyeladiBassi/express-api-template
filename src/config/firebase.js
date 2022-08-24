import admin from 'firebase-admin';
import config from './config';

const serviceAccountKey = {}; // Service account key

const defaultApp = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: config.fb.defaultUrl,
  },
  'default'
);
const auth = admin.auth(defaultApp);
const db = admin.database(defaultApp);

const collectionRef = db.ref('collection');

export { db, auth, collectionRef };
