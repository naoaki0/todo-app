// Firebase Messaging Service Worker
// プッシュ通知をバックグラウンドで受信するためのService Worker

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase設定
firebase.initializeApp({
  apiKey: "AIzaSyBzIHjUneCjIRToqkdsyYL9b1RzVKSEoxg",
  authDomain: "todo-1c26a.firebaseapp.com",
  projectId: "todo-1c26a",
  storageBucket: "todo-1c26a.firebasestorage.app",
  messagingSenderId: "697462680954",
  appId: "1:697462680954:web:5e9f08ecd07b814ccffac3",
  measurementId: "G-6BFDKWQ5ZL"
});

const messaging = firebase.messaging();

// バックグラウンドメッセージ受信時の処理
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  const notificationTitle = payload.notification?.title || '🎁 Todoアプリ';
  const notificationOptions = {
    body: payload.notification?.body || '新しい通知があります',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'todo-notification',
    requireInteraction: true,
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 通知クリック時の処理
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked');
  event.notification.close();
  
  // アプリを開く
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // 既に開いているタブがあればフォーカス
        for (const client of clientList) {
          if (client.url.includes('todo-1c26a.web.app') && 'focus' in client) {
            return client.focus();
          }
        }
        // なければ新しいタブで開く
        if (clients.openWindow) {
          return clients.openWindow('https://todo-1c26a.web.app');
        }
      })
  );
});
