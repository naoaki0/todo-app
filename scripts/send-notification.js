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

        console.log(`Current JST Hour: ${hour}`);

        let title = 'Todo App';
        let body = 'タスクを確認しましょう！';

        // 時間帯によるメッセージ分岐（ユーザーの13-14時起床リズム、12:00通知設定などを考慮）
        // GitHub ActionsのスケジュールはUTCなので、JSTに直して判定

        if (hour >= 12 && hour < 14) {
            // 12:00 keep - モーニングボーナス
            title = '🎁 今日のランダムボーナス: ???💎';
            body = '開けてみないと分からない...大当たりかも？';
        } else if (hour >= 14 && hour < 15) {
            // 14:00 - 緊急通知
            title = '⏰ ボーナス消滅まであと2時間';
            body = '今日の報酬を開封していません...';
        } else if (hour >= 15 && hour < 16) {
            // 15:00 - 最終警告
            title = '🔥 あと1時間で消滅！';
            body = '未開封のボーナスが24時間後までロックされます';
        } else if (hour >= 21 && hour < 22) {
            // 21:00 - ストリーク警告
            title = '🔥 あなたのストリークが危険です';
            body = '今日タスク未完了で全てリセット...';
        } else {
            // デフォルト
            title = '📈 1%成長の時間です';
            body = '昨日の自分を超えましょう';
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
