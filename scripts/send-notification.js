const admin = require('firebase-admin');

// 環境変数からサービスアカウントキーを読み込む
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const messaging = admin.messaging();

async function sendNotifications() {
    try {
        console.log('Fetching tokens from Firestore...');
        const tokensSnapshot = await db.collection('fcmTokens').get();

        if (tokensSnapshot.empty) {
            console.log('No tokens found.');
            return;
        }

        const tokens = [];
        tokensSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.token) {
                tokens.push(data.token);
            }
        });

        console.log(`Found ${tokens.length} tokens.`);

        // 日本時間の現在時刻を取得
        const now = new Date();
        // UTCからJSTへ変換 (+9時間)
        const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
        const hour = jstNow.getUTCHours();
        const minute = jstNow.getUTCMinutes();

        console.log(`Current JST Time: ${hour}:${minute}`);

        let title = 'Todo App';
        let body = 'タスクを確認しましょう！';

        // Tier 1 & 2 通知戦略
        if (hour === 8) {
            // 08:00 朝の第一タスク通知
            title = '☀️ おはよう！今日の最初のタスクを始めよう';
            body = '朝は意志力が最も高い時間。\n最初の1つを完了すれば弾みがつきます！';
        } else if (hour === 18) {
            // 18:00 未完了タスク通知
            title = '📋 今日のタスクは進んでいますか？';
            body = '夕方は集中しやすい時間帯。\n今から始めれば22時までに完了できます！';
        } else if (hour === 22) {
            // 22:00 ストリーク危機通知
            title = '🔥 ストリークが途切れます！';
            body = 'あと2時間で日付が変わります。\nたった1タスク完了でストリーク継続！';
        } else {
            // デフォルト（想定外の時間帯）
            title = '📋 タスクの時間です';
            body = '今日のタスクを確認しましょう';
        }

        // firebase-admin v13対応: sendEachを使用するためにメッセージ配列を作成
        const messages = tokens.map(token => ({
            notification: {
                title: title,
                body: body,
            },
            token: token,
        }));

        // sendEachで一括送信 (最大500件までだが、今回は件数少ないと仮定)
        // 500件超える場合は分割が必要だが、個人用なので省略
        const response = await messaging.sendEach(messages);
        console.log(`${response.successCount} messages were sent successfully`);

        if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(tokens[idx]);
                    console.error(`Failure for token ${tokens[idx]}: ${resp.error}`);
                }
            });
            console.log('List of tokens that caused failures: ' + failedTokens);
        }

    } catch (error) {
        console.error('Error sending notifications:', error);
        process.exit(1);
    }
}

sendNotifications();
