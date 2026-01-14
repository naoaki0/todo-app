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

        // 通知戦略に基づく分岐
        if (hour === 12 && minute < 15) {
            // 12:00 先行通知（希少性）
            title = '🎁 もうすぐモーニングボーナスタイム開始！';
            body = '12:00〜16:00限定。見逃すと24時間待ち。';
        } else if (hour === 12 && minute >= 15) { // cron 12:30 -> around 12:30-45
            // 12:30 メイン通知（可変報酬 + 謎）
            title = '🎰 今日のモーニングボーナス: ???💎';
            body = '開けてみないと分からない...大当たりかも？';
        } else if (hour === 13) {
            // 13:00 ニアミス or 進捗報告（ランダム）
            if (Math.random() > 0.5) {
                title = '📊 昨日の統計:';
                body = '・大当たりまであと1マス...惜しかった！\n・今日こそ777を揃えよう🎰';
            } else {
                title = '📈 Day 15: 1.16倍の自分になりました。';
                body = '毎日1%。1年後に37倍。今日も積み上げよう。';
            }
        } else if (hour === 14 && minute < 15) {
            // 14:00 緊急通知（損失回避・中）
            title = '⏰ モーニングボーナス消滅まであと2時間';
            body = '今日の報酬: ???💎（未開封）\n開けないと消えます...';
        } else if (hour === 14 && minute >= 15) { // cron 14:30
            // 14:30 天井予告
            title = '🔥 連続ハズレ4回...';
            body = 'あと1回で天井到達！次は高確率で大当たり！';
        } else if (hour === 15 && minute < 15) {
            // 15:00 最終警告（損失回避・強）
            title = '🔥 あと1時間で消滅！';
            body = '今日のモーニングボーナス\n未開封 → 24時間後まで待機';
        } else if (hour === 15 && minute >= 15) { // cron 15:30
            // 15:30 最強警告（損失回避・最強）
            title = '💀 最後の30分';
            body = 'もう通知送りません。\n開けるなら今です。';
        } else if (hour === 21) {
            // 21:00 ストリーク警告（サンクコスト）or 達成予告
            if (Math.random() > 0.3) {
                title = '🔥 あなたの15日連続ストリーク';
                body = 'これまでの努力: 累計847💎\n今日タスク未完了で全てリセット...';
            } else {
                title = '🏆 あと1タスクでレベルアップ！';
                body = 'Level 12まであとXP120。今日中に達成できそう！';
            }
        } else if (hour === 2) {
            // 2:00 深夜最終（恐怖）
            title = '😱 15日連続が消滅まで残り1時間';
            body = 'もう1度言います。\nあなたの15日間が消えます。\n1タスク。たった1つ。';
        } else {
            // デフォルト（想定外の時間帯）
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
