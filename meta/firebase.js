// =============================================
//  meta/firebase.js  –  Firebase-Initialisierung
//  Exportiert alle benötigten Firestore-Methoden
//  als window-Properties für die Tab-Skripte.
// =============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyD5Pd_fXpLGaXN1jKhh2ONSH_WZWLml0K4",
  authDomain:        "heterogenitaet-ac1b7.firebaseapp.com",
  projectId:         "heterogenitaet-ac1b7",
  storageBucket:     "heterogenitaet-ac1b7.firebasestorage.app",
  messagingSenderId: "311628994183",
  appId:             "1:311628994183:web:87097d218d6bd755ceca22",
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

window._db              = db;
window._collection      = collection;
window._addDoc          = addDoc;
window._serverTimestamp = serverTimestamp;
window._onSnapshot      = onSnapshot;
window._query           = query;
window._deleteDoc       = deleteDoc;
window._doc             = doc;
window._getDocs         = getDocs;
