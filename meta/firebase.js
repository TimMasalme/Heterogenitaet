// =============================================
//  meta/firebase.js  –  Firebase-Initialisierung
//  CDN: jsdelivr (kein gstatic.com) → Uni-Firewall-safe
//  Fallback: sichtbare Fehlermeldung statt stiller Fehler
// =============================================

import { initializeApp } from "https://cdn.jsdelivr.net/npm/firebase@10.12.0/app/+esm";
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
} from "https://cdn.jsdelivr.net/npm/firebase@10.12.0/firestore/+esm";

const firebaseConfig = {
  apiKey:            "AIzaSyD5Pd_fXpLGaXN1jKhh2ONSH_WZWLml0K4",
  authDomain:        "heterogenitaet-ac1b7.firebaseapp.com",
  projectId:         "heterogenitaet-ac1b7",
  storageBucket:     "heterogenitaet-ac1b7.firebasestorage.app",
  messagingSenderId: "311628994183",
  appId:             "1:311628994183:web:87097d218d6bd755ceca22",
};

let app, db;

try {
  app = initializeApp(firebaseConfig);
  db  = getFirestore(app);

  window._db              = db;
  window._collection      = collection;
  window._addDoc          = addDoc;
  window._serverTimestamp = serverTimestamp;
  window._onSnapshot      = onSnapshot;
  window._query           = query;
  window._deleteDoc       = deleteDoc;
  window._doc             = doc;
  window._getDocs         = getDocs;

  // Signal für andere Scripts dass Firebase bereit ist
  window._firebaseReady = true;
  window.dispatchEvent(new Event("firebase-ready"));

} catch (err) {
  console.error("Firebase konnte nicht initialisiert werden:", err);
  window._firebaseReady = false;
  window._firebaseError = err.message;
  window.dispatchEvent(new Event("firebase-error"));

  // Sichtbare Fehlermeldung einblenden falls vorhanden
  window.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("firebaseErrorBanner");
    if (banner) {
      banner.textContent = "⚠ Keine Verbindung zum Server. Bitte WLAN/Netz prüfen und Seite neu laden.";
      banner.style.display = "block";
    }
  });
}
