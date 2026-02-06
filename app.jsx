        const { useState, useEffect, useRef, useMemo, useCallback } = React;

        // --- 音響エンジン ---
        const AudioEngine = {
            ctx: null,
            init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
            play(freqs, type = 'sine', volume = 0.1, interval = 0.08) {
                this.init();
                if (this.ctx.state === 'suspended') this.ctx.resume();
                const now = this.ctx.currentTime;
                freqs.forEach((f, i) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = type;
                    osc.frequency.setValueAtTime(f, now + i * interval);
                    gain.gain.setValueAtTime(0, now + i * interval);
                    gain.gain.linearRampToValueAtTime(volume, now + i * interval + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + i * interval + 0.25);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now + i * interval);
                    osc.stop(now + i * interval + 0.3);
                });
            }
        };

        // --- Icons ---
        const SvgIcon = ({ children, size = 20, className = "", ...props }) => (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>{children}</svg>
        );
        const Icons = {
            Menu: (p) => <SvgIcon {...p}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></SvgIcon>,
            Plus: (p) => <SvgIcon {...p}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></SvgIcon>,
            Check: (p) => <SvgIcon {...p}><polyline points="20 6 9 17 4 12" /></SvgIcon>,
            Trash2: (p) => <SvgIcon {...p}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></SvgIcon>,
            Calendar: (p) => <SvgIcon {...p}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></SvgIcon>,
            Flame: (p) => <SvgIcon {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3a1 1 0 0 1 .9 3.8z" /></SvgIcon>,
            Gem: (p) => <SvgIcon {...p}><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M11 3v18" /><path d="M6 3l5 6 5-6" /><path d="M2 9h20" /></SvgIcon>,
            ShoppingBag: (p) => <SvgIcon {...p}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></SvgIcon>,
            ChevronDown: (p) => <SvgIcon {...p}><polyline points="6 9 12 15 18 9" /></SvgIcon>,
            ChevronUp: (p) => <SvgIcon {...p}><polyline points="18 15 12 9 6 15" /></SvgIcon>,
            ChevronRight: (p) => <SvgIcon {...p}><polyline points="9 18 15 12 9 6" /></SvgIcon>,
            ChevronLeft: (p) => <SvgIcon {...p}><polyline points="15 18 9 12 15 6" /></SvgIcon>,
            Edit: (p) => <SvgIcon {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></SvgIcon>,
            GripVertical: (p) => <SvgIcon {...p}><circle cx="9" cy="12" r="1" /><circle cx="9" cy="5" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="19" r="1" /></SvgIcon>,
            Star: (p) => <SvgIcon {...p} fill={p.active ? "currentColor" : "none"}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></SvgIcon>,
            Play: (p) => <SvgIcon {...p}><polygon points="5 3 19 12 5 21 5 3" /></SvgIcon>,
            Pause: (p) => <SvgIcon {...p}><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></SvgIcon>,
            AlertCircle: (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></SvgIcon>,
            Potion: (p) => <SvgIcon {...p}><path d="M8.5 2h7" /><path d="M12 2v4" /><path d="M16.5 10a4.5 4.5 0 0 0-9 0l-.5 8h10l-.5-8Z" /><line x1="12" y1="12" x2="12" y2="14" /><line x1="10" y1="15" x2="10.5" y2="15" /></SvgIcon>,
            Ticket: (p) => <SvgIcon {...p}><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></SvgIcon>,
            Sparkles: (p) => <SvgIcon {...p}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M9 3v4" /><path d="M3 7h4" /><path d="M3 5h4" /></SvgIcon>,
            Cherry: (p) => <SvgIcon {...p}><path d="M2 8a5 5 0 0 0 10 0c0-2.76-2.5-5-5-5-2.5 0-5 2.24-5 5Z" /><path d="M12 8a5 5 0 0 0 10 0c0-2.76-2.5-5-5-5-2.5 0-5 2.24-5 5Z" /><path d="M7 3c2.5-1.5 5 0 10 2" /></SvgIcon>,
            Snowflake: (p) => <SvgIcon {...p}><line x1="12" y1="2" x2="12" y2="22" /><line x1="20" y1="12" x2="4" y2="12" /><line x1="17.66" y1="6.34" x2="6.34" y2="17.66" /><line x1="17.66" y1="17.66" x2="6.34" y2="6.34" /></SvgIcon>,
            Chest: (p) => <SvgIcon {...p}><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A2.5 2.5 0 0 1 12 5.5V8" /><path d="M16.5 8a2.5 2.5 0 0 1 0-5A2.5 2.5 0 0 1 12 5.5V8" /></SvgIcon>,
            Gift: (p) => <SvgIcon {...p}><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A2.5 2.5 0 0 1 12 5.5V8" /><path d="M16.5 8a2.5 2.5 0 0 1 0-5A2.5 2.5 0 0 1 12 5.5V8" /></SvgIcon>,
            Clock: (p) => <SvgIcon {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></SvgIcon>,
            Rocket: (p) => <SvgIcon {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></SvgIcon>,
            Divide: (p) => <SvgIcon {...p}><circle cx="12" cy="6" r="2" /><line x1="5" y1="12" x2="19" y2="12" /><circle cx="12" cy="18" r="2" /></SvgIcon>,
            Merge: (p) => <SvgIcon {...p}><path d="m8 6 4-4 4 4" /><path d="M12 2v10.3" /><path d="M12 12.3v8.2" /><path d="m8 18 4 4 4-4" /></SvgIcon>,
            Terminal: (p) => <SvgIcon {...p}><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></SvgIcon>,
            Search: (p) => <SvgIcon {...p}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></SvgIcon>,
            Shield: (p) => <SvgIcon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></SvgIcon>,
            Zap: (p) => <SvgIcon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></SvgIcon>,
            Trash: (p) => <SvgIcon {...p}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></SvgIcon>,
            Bell: (p) => <SvgIcon {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></SvgIcon>,
            RotateCcw: (p) => <SvgIcon {...p}><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></SvgIcon>,
        };

        // --- 共通UI部品 ---
        const juicyBtnClass = "transition-all duration-150 transform hover:scale-105 active:scale-95 active:translate-y-1";

        const IconButton = ({ icon: Icon, onClick, className = "", active = false, size = 20, color = "text-google-textSec", ...props }) => (
            <button onClick={onClick} className={`p-2 rounded-full flex items-center justify-center hover:bg-google-hover ${active ? 'bg-google-selected text-google-blue' : color} ${className} ${juicyBtnClass}`} {...props}>
                <Icon size={size} active={active} />
            </button>
        );

        const Toast = ({ message, onClose }) => {
            useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
            return (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-floating z-[120] flex items-center gap-3 animate-toast-in font-black whitespace-nowrap border-b-4 border-red-700">
                    <Icons.AlertCircle size={24} /><span>{message}</span>
                </div>
            );
        };

        const FloatingText = ({ x, y, text, color, scale }) => (
            <div className={`fixed z-[150] pointer-events-none flex items-center gap-1 animate-float-up drop-shadow-md whitespace-nowrap ${color} ${scale}`} style={{ left: x, top: y }}>
                {text}
            </div>
        );

        const IgnitionModal = () => (
            <div className="fixed inset-0 pointer-events-none z-[200] flex items-center justify-center">
                <div className="absolute inset-0 bg-orange-500/20 animate-ignition"></div>
                <div className="text-9xl text-duo-orange animate-ignition flex items-center justify-center drop-shadow-2xl">
                    🔥
                </div>
                <div className="absolute top-1/3 text-4xl font-black text-white animate-ignition drop-shadow-lg uppercase tracking-widest">
                    STREAK IGNITED!
                </div>
            </div>
        );



        // 🔥 ストリーク警告バナー
        const StreakWarningBanner = ({ streak, onDismiss }) => (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[150] animate-bounce">
                <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-2xl border-b-4 border-red-800 flex items-center gap-3">
                    <span className="text-2xl animate-pulse">🔥</span>
                    <div>
                        <div className="font-black text-sm">ストリーク消滅まであと1時間！</div>
                        <div className="text-xs text-red-200 font-bold">
                            {streak}日連続を守れ！今すぐタスクを完了しよう
                        </div>
                    </div>
                    <button
                        onClick={onDismiss}
                        className="text-red-200 hover:text-white font-bold text-lg ml-2"
                    >
                        ×
                    </button>
                </div>
            </div>
        );

        // --- Context Menu ---
        const ContextMenu = ({ x, y, onDivide, onMerge, onPurge, showMerge, showPurge }) => (
            <div className="fixed z-[9999] bg-white border-2 border-gray-200 rounded-xl shadow-floating py-1 w-56 animate-scale-in" style={{ left: x, top: y }}>
                <button onClick={onDivide} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 font-bold text-gray-600 text-sm">
                    <Icons.Divide size={16} /> ここで区切る
                </button>
                {showMerge && (
                    <button onClick={onMerge} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 font-bold text-gray-600 text-sm">
                        <Icons.Merge size={16} /> 区切りを削除
                    </button>
                )}
                {showPurge && (
                    <div className="border-t border-gray-100 mt-1 pt-1">
                        <button onClick={onPurge} className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 font-bold text-red-500 text-sm">
                            <Icons.Trash size={16} /> Post-MVPへパージ
                        </button>
                    </div>
                )}
            </div>
        );

        // --- ユーティリティ ---
        const getAdjustedToday = () => {
            const d = new Date(); d.setHours(d.getHours() - 3); return d.toISOString().split('T')[0];
        };

        // 🎰 LDWS理論：報酬ティア決定関数（損失を勝利に偽装）
        const determineRewardTier = (pityCounter, isFeverMode) => {
            // 基本確率（LDWS構造）
            let whiffChance = 45;      // 完全ハズレ（悔しさ）
            let smallChance = 35;      // 小当たり（延命措置・LDWs）
            let normalChance = 14;     // 満足感（習慣化）
            let bigChance = 5;         // 強い快楽（中毒の維持）
            let jackpotChance = 1;     // 神話的成功（射幸心の核心）

            // 天井システム：スカが続くと確率上昇
            const pityBonus = Math.min(pityCounter * 2, 30); // 最大30%ブースト
            jackpotChance += pityBonus * 0.5;
            bigChance += pityBonus * 0.5;
            whiffChance -= pityBonus;

            // フィーバーモード：レア確率2倍
            if (isFeverMode) {
                const originalBig = bigChance;
                const originalJackpot = jackpotChance;
                bigChance = Math.min(originalBig * 2, 40);
                jackpotChance = Math.min(originalJackpot * 2, 30);
                const boost = (bigChance - originalBig) + (jackpotChance - originalJackpot);
                whiffChance -= boost;
                smallChance = Math.max(smallChance - boost * 0.3, 10);
            }

            // 抽選
            const roll = Math.random() * 100;
            if (roll < jackpotChance) return 'jackpot';
            if (roll < jackpotChance + bigChance) return 'big';
            if (roll < jackpotChance + bigChance + normalChance) return 'normal';
            if (roll < jackpotChance + bigChance + normalChance + smallChance) return 'small';
            return 'whiff';
        };

        const Confetti = ({ type, theme }) => {
            const performanceColors = ['bg-yellow-400', 'bg-yellow-300', 'bg-gray-300', 'bg-gray-200'];
            const colors = performanceColors;

            // Checkbox Ignition (Small Confetti)
            const isSmall = type === 'ignition';
            const particlesCount = isSmall ? 8 : (type === 'big' || type === 'performance' ? 45 : 12);

            const particles = Array.from({ length: particlesCount }).map((_, i) => ({
                id: i,
                tx: (Math.random() - 0.5) * (isSmall ? 60 : 240),
                ty: (Math.random() - 0.5) * (isSmall ? 60 : 240),
                size: Math.random() * (isSmall ? 3 : 7) + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360
            }));

            return (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-visible">
                    {particles.map(p => (
                        <div key={p.id} className={`absolute rounded-full ${p.color}`}
                            style={{
                                width: p.size,
                                height: p.size,
                                '--tx': `${p.tx}px`, '--ty': `${p.ty}px`,
                                animation: 'confetti-explode 0.4s ease-out forwards',
                            }}
                        />
                    ))}
                </div>
            );
        };

        // --- 完全依存レベル：4段階報酬演出システム ---

        // ニアミス演出：金色のフラッシュ
        const NearMissFlash = () => {
            return (
                <div
                    className="fixed inset-0 pointer-events-none z-[300]"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,165,0,0.3) 40%, transparent 70%)',
                        animation: 'near-miss-intense 0.4s ease-out forwards',
                    }}
                />
            );
        };

        // 🎰 結果テキスト演出: 画面中央に派手なテキスト
        const WinText = ({ tier, onComplete }) => {
            const [visible, setVisible] = useState(true);

            useEffect(() => {
                const timer = setTimeout(() => {
                    setVisible(false);
                    if (onComplete) onComplete();
                }, tier === 'jackpot' ? 2000 : tier === 'big' ? 1500 : 800);
                return () => clearTimeout(timer);
            }, [tier, onComplete]);

            const config = {
                whiff: { text: '...', color: 'text-gray-400', size: 'text-4xl', animate: '' },
                small: { text: 'SMALL WIN!', color: 'text-yellow-400', size: 'text-5xl', animate: 'animate-bounce' },
                normal: { text: 'WIN!', color: 'text-green-400', size: 'text-6xl', animate: 'animate-bounce' },
                big: { text: 'BIG WIN!!', color: 'text-orange-500', size: 'text-7xl', animate: 'animate-pulse' },
                jackpot: { text: '🎰 JACKPOT!!! 🎰', color: 'text-red-500', size: 'text-8xl', animate: 'animate-bounce' }
            };
            const c = config[tier] || config.whiff;

            if (!visible) return null;

            return (
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[400]">
                    <div className={`${c.size} font-black ${c.color} ${c.animate} drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]`}
                        style={{
                            textShadow: tier === 'jackpot' ? '0 0 40px #ff0000, 0 0 80px #ff6600' :
                                tier === 'big' ? '0 0 30px #ff8800, 0 0 60px #ffaa00' :
                                    tier === 'normal' ? '0 0 20px #00ff00' : 'none',
                            animation: tier === 'jackpot' ? 'jackpot-text 0.3s ease-in-out infinite' : undefined
                        }}>
                        {c.text}
                    </div>
                </div>
            );
        };

        // 🎰 レア予告確認モーメント: 虹/赤予告時の全画面フラッシュ
        const RareForecastFlash = ({ forecast, onComplete }) => {
            useEffect(() => {
                // 派手な予告音
                if (forecast === 'rainbow') {
                    AudioEngine.play([800, 1000, 1200, 1400, 1600], 'sine', 0.3, 0.05);
                } else if (forecast === 'red') {
                    AudioEngine.play([600, 800, 1000, 1200], 'sine', 0.25, 0.06);
                }
                const timer = setTimeout(() => {
                    if (onComplete) onComplete();
                }, forecast === 'rainbow' ? 800 : 600);
                return () => clearTimeout(timer);
            }, [forecast, onComplete]);

            const bgColor = forecast === 'rainbow'
                ? 'bg-gradient-to-br from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500'
                : 'bg-gradient-to-br from-red-600 to-orange-500';

            return (
                <div className={`fixed inset-0 pointer-events-none z-[450] ${bgColor} animate-pulse`}
                    style={{
                        opacity: 0.7,
                        animation: 'forecast-flash 0.3s ease-out forwards'
                    }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-9xl font-black animate-bounce drop-shadow-lg">
                            {forecast === 'rainbow' ? '🌈' : '🔥'}
                        </div>
                        <div className="absolute text-white text-4xl font-black mt-40">
                            {forecast === 'rainbow' ? '虹予告！！' : '激アツ予告！'}
                        </div>
                    </div>
                </div>
            );
        };

        // 🎰 ジェム吸い込み演出: 獲得時に画面右上へ軌跡
        const GemAbsorb = ({ amount, startX, startY, onComplete }) => {
            const [gems, setGems] = useState([]);
            const [animating, setAnimating] = useState(false);

            useEffect(() => {
                // 目標位置（画面右上のジェム表示付近）
                const targetX = window.innerWidth - 80;
                const targetY = 50;

                // 複数のジェムパーティクルを生成
                const count = Math.min(amount, 10);
                const newGems = [];
                for (let i = 0; i < count; i++) {
                    const gemStartX = startX + (Math.random() - 0.5) * 100;
                    const gemStartY = startY + (Math.random() - 0.5) * 100;
                    newGems.push({
                        id: i,
                        startX: gemStartX,
                        startY: gemStartY,
                        targetX: targetX,
                        targetY: targetY,
                        delay: i * 80
                    });
                }
                setGems(newGems);

                // アニメーション開始
                setTimeout(() => setAnimating(true), 100);

                // 吸い込み音
                setTimeout(() => AudioEngine.play([800, 1000, 1200, 1400], 'sine', 0.2, 0.08), 300);

                // 到着音（チャリン）
                setTimeout(() => AudioEngine.play([2000, 2200], 'sine', 0.15, 0.05), 900);

                const timer = setTimeout(() => {
                    setGems([]);
                    if (onComplete) onComplete();
                }, 1200);
                return () => clearTimeout(timer);
            }, [amount, startX, startY, onComplete]);

            return (
                <>
                    {gems.map(g => (
                        <div
                            key={g.id}
                            className="fixed pointer-events-none z-[500]"
                            style={{
                                left: animating ? g.targetX : g.startX,
                                top: animating ? g.targetY : g.startY,
                                fontSize: animating ? '14px' : '28px',
                                opacity: animating ? 0 : 1,
                                transition: `all 0.8s ease-in ${g.delay}ms`,
                                filter: 'drop-shadow(0 0 8px rgba(100, 200, 255, 0.8))'
                            }}
                        >
                            💎
                        </div>
                    ))}
                </>
            );
        };

        // 📈 成長グラフコンポーネント
        const GrowthGraph = ({ history = {}, onClose }) => {
            const [period, setPeriod] = useState('week'); // 'week', 'month', 'all'

            // 過去7日間のデータを取得
            const getLast7Days = () => {
                const days = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dateStr = date.toISOString().split('T')[0];
                    days.push({
                        date: dateStr,
                        label: i === 0 ? '今日' : i === 1 ? '昨日' : `${date.getMonth() + 1}/${date.getDate()}`,
                        count: history[dateStr] || 0
                    });
                }
                return days;
            };

            // 過去30日間のデータを取得
            const getLast30Days = () => {
                const days = [];
                for (let i = 29; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dateStr = date.toISOString().split('T')[0];
                    days.push({
                        date: dateStr,
                        label: i === 0 ? '今日' : `${date.getMonth() + 1}/${date.getDate()}`,
                        count: history[dateStr] || 0
                    });
                }
                return days;
            };

            // 全期間のデータを取得（週単位で集計）
            const getAllTimeData = () => {
                const dates = Object.keys(history).sort();
                if (dates.length === 0) return [];

                const weeks = [];
                const firstDate = new Date(dates[0]);
                const today = new Date();

                // 週の開始日（日曜日）を取得
                const getWeekStart = (date) => {
                    const d = new Date(date);
                    const day = d.getDay();
                    d.setDate(d.getDate() - day);
                    return d.toISOString().split('T')[0];
                };

                let currentWeekStart = getWeekStart(firstDate);
                const todayWeekStart = getWeekStart(today);

                while (currentWeekStart <= todayWeekStart) {
                    let weekTotal = 0;
                    for (let i = 0; i < 7; i++) {
                        const d = new Date(currentWeekStart);
                        d.setDate(d.getDate() + i);
                        const dateStr = d.toISOString().split('T')[0];
                        weekTotal += history[dateStr] || 0;
                    }

                    const weekDate = new Date(currentWeekStart);
                    weeks.push({
                        date: currentWeekStart,
                        label: `${weekDate.getMonth() + 1}/${weekDate.getDate()}`,
                        count: weekTotal
                    });

                    // 次の週へ
                    const nextWeek = new Date(currentWeekStart);
                    nextWeek.setDate(nextWeek.getDate() + 7);
                    currentWeekStart = nextWeek.toISOString().split('T')[0];
                }

                return weeks;
            };

            // 期間に応じたデータ取得
            const getData = () => {
                if (period === 'week') return getLast7Days();
                if (period === 'month') return getLast30Days();
                return getAllTimeData();
            };

            // ランク判定関数
            const getRank = (count, periodType) => {
                // 期間に応じて基準を調整
                const thresholds = {
                    week: { S: 20, A: 15, B: 10 },
                    month: { S: 80, A: 60, B: 40 },
                    all: { S: 100, A: 70, B: 40 }
                };
                const t = thresholds[periodType];

                if (count >= t.S) return {
                    rank: 'S',
                    color: 'from-yellow-300 to-yellow-500',
                    textColor: 'text-yellow-600',
                    bgColor: 'bg-yellow-50',
                    borderColor: 'border-yellow-300',
                    icon: '🏆',
                    stars: '★★★',
                    label: 'EXCELLENT PERFORMANCE',
                    nextThreshold: null
                };
                if (count >= t.A) return {
                    rank: 'A',
                    color: 'from-gray-300 to-gray-400',
                    textColor: 'text-gray-600',
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-300',
                    icon: '🥈',
                    stars: '★★',
                    label: 'GREAT WORK',
                    nextThreshold: t.S
                };
                if (count >= t.B) return {
                    rank: 'B',
                    color: 'from-orange-300 to-orange-500',
                    textColor: 'text-orange-600',
                    bgColor: 'bg-orange-50',
                    borderColor: 'border-orange-300',
                    icon: '🥉',
                    stars: '★',
                    label: 'GOOD JOB',
                    nextThreshold: t.A
                };
                return {
                    rank: 'C',
                    color: 'from-gray-200 to-gray-300',
                    textColor: 'text-gray-500',
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-300',
                    icon: '📊',
                    stars: '',
                    label: 'KEEP GOING',
                    nextThreshold: t.B
                };
            };

            // 個人ベスト計算
            const getPersonalBest = () => {
                const allWeeks = getAllTimeData();
                if (allWeeks.length === 0) return { count: 0, week: null };

                let maxCount = 0;
                let maxWeek = null;
                allWeeks.forEach(week => {
                    if (week.count > maxCount) {
                        maxCount = week.count;
                        maxWeek = week.date;
                    }
                });

                return { count: maxCount, week: maxWeek };
            };

            const days = getData();
            const currentTotal = days.reduce((sum, d) => sum + d.count, 0);
            const maxCount = Math.max(...days.map(d => d.count), 1);
            const rankInfo = getRank(currentTotal, period);
            const personalBest = getPersonalBest();

            const periodLabel = {
                week: '今週',
                month: '今月',
                all: '全期間'
            };

            return (
                <div className="max-w-2xl mx-auto pt-8">
                    <h1 className="text-2xl font-black text-gray-800 mb-6">📈 成長グラフ</h1>

                    {/* 期間選択 */}
                    <div className="flex gap-2 mb-6">
                        {['week', 'month', 'all'].map(p => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${period === p
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                    }`}
                            >
                                {p === 'week' ? '週' : p === 'month' ? '月' : '全期間'}
                            </button>
                        ))}
                    </div>

                    {/* 達成ランク表示 */}
                    <div className={`text-center py-6 px-6 rounded-xl mb-6 shadow-lg border-2 ${rankInfo.borderColor} ${rankInfo.bgColor}`}>
                        <div className="text-sm font-bold text-gray-500 mb-2">{periodLabel[period]}の達成ランク</div>
                        <div className={`text-5xl font-black mb-2 bg-gradient-to-r ${rankInfo.color} bg-clip-text text-transparent`}>
                            {rankInfo.stars} {rankInfo.rank} {rankInfo.stars}
                        </div>
                        <div className="text-2xl mb-3">{rankInfo.icon}</div>
                        <div className={`text-sm font-black ${rankInfo.textColor} mb-4`}>{rankInfo.label}</div>

                        {/* 進捗バー */}
                        <div className="mb-3">
                            <div className="text-xs font-bold text-gray-500 mb-1">
                                {periodLabel[period]}: {currentTotal}タスク完了
                            </div>
                            {rankInfo.nextThreshold && (
                                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${rankInfo.color} transition-all duration-500`}
                                        style={{
                                            width: `${Math.min(100, (currentTotal / rankInfo.nextThreshold) * 100)}%`
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 次ランクまで */}
                        {rankInfo.nextThreshold && (
                            <div className="text-sm font-black text-blue-600">
                                🎯 あと{rankInfo.nextThreshold - currentTotal}タスクで次ランク！
                            </div>
                        )}
                        {!rankInfo.nextThreshold && (
                            <div className="text-sm font-black text-yellow-600">
                                ✨ 最高ランク達成！
                            </div>
                        )}
                    </div>

                    {/* 個人ベスト記録 */}
                    {personalBest.count > 0 && period === 'week' && (
                        <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border-2 border-purple-200 shadow-sm">
                            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">自己ベスト</div>
                            <div className="text-3xl font-black text-purple-600">{personalBest.count}タスク</div>
                            {currentTotal >= personalBest.count ? (
                                <div className="text-sm font-black text-pink-600 mt-2">
                                    🎉 自己ベスト更新中！
                                </div>
                            ) : (
                                <div className="text-sm font-bold text-gray-600 mt-2">
                                    あと{personalBest.count - currentTotal}タスクで自己ベスト！
                                </div>
                            )}
                        </div>
                    )}

                    {/* 棒グラフ */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 mb-6">
                        <div className={`flex items-end justify-between gap-${period === 'month' ? '1' : '3'} h-56`}>
                            {days.map((day, i) => {
                                const maxHeight = 224 * 0.8;
                                const heightPx = day.count === 0 ? 2 : Math.max(8, (day.count / maxCount) * maxHeight);
                                const isToday = period === 'week' ? i === 6 : period === 'month' ? i === 29 : i === days.length - 1;
                                return (
                                    <div key={day.date} className="flex-1 flex flex-col items-center">
                                        <div className={`text-${period === 'month' ? '2xs' : 'sm'} font-black text-gray-700 mb-2`}>
                                            {day.count}
                                        </div>
                                        <div
                                            className={`w-full rounded-t-xl transition-all ${isToday ? 'bg-gradient-to-t from-blue-500 to-blue-400 shadow-lg' : 'bg-gray-300'
                                                }`}
                                            style={{
                                                height: `${heightPx}px`
                                            }}
                                        />
                                        <div className={`text-${period === 'month' ? '2xs' : 'xs'} font-bold mt-2 ${isToday ? 'text-blue-500' : 'text-gray-500'
                                            }`}>
                                            {day.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 合計 */}
                    <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 shadow-sm">
                        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{periodLabel[period]}の合計</div>
                        <div className="text-4xl font-black text-blue-500">{currentTotal}</div>
                        <div className="text-xs font-bold text-gray-500 mt-1">タスク完了</div>
                    </div>
                </div>
            );
        };

        // 🔥 コンボ演出コンポーネント - 連続完了で表示
        const ComboDisplay = ({ comboCount, onComplete }) => {
            const [visible, setVisible] = useState(true);

            useEffect(() => {
                // コンボ数に応じたサウンド
                const baseFreq = 600 + comboCount * 100;
                if (comboCount >= 5) {
                    // 5コンボ以上: 派手なファンファーレ
                    AudioEngine.play([baseFreq, baseFreq + 200, baseFreq + 400, baseFreq + 600], 'sine', 0.35, 0.08);
                } else if (comboCount >= 3) {
                    // 3-4コンボ: 上昇音階
                    AudioEngine.play([baseFreq, baseFreq + 150, baseFreq + 300], 'sine', 0.25, 0.1);
                } else {
                    // 2コンボ: シンプルな音
                    AudioEngine.play([baseFreq, baseFreq + 100], 'sine', 0.2, 0.12);
                }

                const timer = setTimeout(() => {
                    setVisible(false);
                    if (onComplete) onComplete();
                }, comboCount >= 5 ? 1500 : 1000);
                return () => clearTimeout(timer);
            }, [comboCount, onComplete]);

            if (!visible) return null;

            // コンボ数に応じた表示テキストとスタイル
            let text = 'COMBO!';
            let textClass = 'text-yellow-400';
            let sizeClass = 'text-5xl';
            let bgClass = '';

            if (comboCount >= 5) {
                text = `🔥 ${comboCount}x UNSTOPPABLE! 🔥`;
                textClass = 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500';
                sizeClass = 'text-7xl';
                bgClass = 'animate-pulse';
            } else if (comboCount >= 3) {
                text = `⚡ ${comboCount}x COMBO! ⚡`;
                textClass = 'text-orange-500';
                sizeClass = 'text-6xl';
            } else {
                text = `${comboCount}x COMBO!`;
            }

            return (
                <>
                    {/* 背景フラッシュ（コンボ数に応じて強化） */}
                    {comboCount >= 3 && (
                        <div
                            className={`fixed inset-0 pointer-events-none z-[350] ${bgClass}`}
                            style={{
                                background: comboCount >= 5
                                    ? 'radial-gradient(circle, rgba(255,100,0,0.4) 0%, rgba(255,50,0,0.2) 50%, transparent 100%)'
                                    : 'radial-gradient(circle, rgba(255,200,0,0.3) 0%, rgba(255,150,0,0.15) 50%, transparent 100%)',
                                animation: 'normal-flash 0.8s ease-out forwards',
                            }}
                        />
                    )}
                    {/* 5コンボ以上で画面振動 */}
                    {comboCount >= 5 && (
                        <div className="fixed inset-0 pointer-events-none z-[352]"
                            style={{ animation: 'screen-shake 0.5s ease-out forwards' }}
                        />
                    )}
                    {/* コンボテキスト */}
                    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[360]">
                        <div className={`${sizeClass} font-black ${textClass} animate-bounce drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]`}
                            style={{
                                textShadow: comboCount >= 5
                                    ? '0 0 40px rgba(255,100,0,1), 0 0 80px rgba(255,50,0,0.8)'
                                    : comboCount >= 3
                                        ? '0 0 30px rgba(255,150,0,0.8)'
                                        : '0 0 20px rgba(255,200,0,0.6)',
                            }}>
                            {text}
                        </div>
                    </div>
                    {/* 倍率表示 */}
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 pointer-events-none z-[360]">
                        <div className="text-2xl font-black text-white">
                            報酬 {comboCount >= 5 ? '3' : comboCount >= 3 ? '2' : '1.5'}倍!
                        </div>
                    </div>
                </>
            );
        };

        const RewardWhiff = ({ onComplete, showNearMiss, nearMissIntensity = 'normal', consecutiveWhiff = 0 }) => {
            const [particles, setParticles] = useState([]);
            const [showText, setShowText] = useState(false);

            useEffect(() => {
                // 連続スカ回数に応じて演出強化
                const isConsecutive = consecutiveWhiff >= 3;
                const isLongStreak = consecutiveWhiff >= 5;

                // 悔しい演出：暗いパーティクルが消える（連続で増加）
                let particleCount = showNearMiss ? (nearMissIntensity === 'extreme' ? 40 : nearMissIntensity === 'strong' ? 25 : 20) : 15;
                particleCount += Math.min(consecutiveWhiff * 3, 30); // 連続ボーナス

                const newParticles = [];
                for (let i = 0; i < particleCount; i++) {
                    const angle = (Math.PI * 2 * i) / particleCount;
                    const speed = showNearMiss ? (nearMissIntensity === 'extreme' ? 150 : 100) : 80 + consecutiveWhiff * 5;
                    newParticles.push({
                        id: i,
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        color: isLongStreak ? '#ff0000' : isConsecutive ? '#ff4444' : showNearMiss ? (nearMissIntensity === 'extreme' ? '#ff4444' : '#ffaa00') : '#888888',
                        size: showNearMiss ? 8 : 6 + Math.min(consecutiveWhiff, 5),
                    });
                }
                setParticles(newParticles);

                // 🎰 残念SE: 連続スカで音が悲惨に
                if (isLongStreak) {
                    // 5連続スカ以上: 悲鳴のような音
                    AudioEngine.play([1500, 1200, 900, 600, 300, 100], 'sawtooth', 0.3, 0.1);
                    setShowText(true);
                } else if (isConsecutive) {
                    // 3連続スカ: 重い落胆音
                    AudioEngine.play([800, 600, 400, 200, 100], 'sawtooth', 0.25, 0.12);
                    setShowText(true);
                } else if (showNearMiss) {
                    if (nearMissIntensity === 'extreme') {
                        AudioEngine.play([1200, 1400, 1600], 'sine', 0.2, 0.05);
                        setTimeout(() => AudioEngine.play([800, 600, 400, 200, 100, 50], 'sawtooth', 0.25, 0.15), 150);
                        setShowText(true);
                    } else if (nearMissIntensity === 'strong') {
                        AudioEngine.play([1000, 1200], 'sine', 0.18, 0.08);
                        setTimeout(() => AudioEngine.play([600, 500, 400, 300, 200, 100], 'sawtooth', 0.18, 0.15), 100);
                        setShowText(true);
                    } else {
                        AudioEngine.play([800, 1000], 'sine', 0.15, 0.1);
                        setTimeout(() => AudioEngine.play([500, 400, 300, 200, 150, 100], 'sawtooth', 0.15, 0.2), 100);
                    }
                } else {
                    AudioEngine.play([500, 400, 300, 200, 150, 100], 'sawtooth', 0.12, 0.18);
                }

                const duration = isLongStreak ? 1500 : (showNearMiss && nearMissIntensity === 'extreme') ? 1200 : 600;
                setTimeout(() => {
                    setParticles([]);
                    setShowText(false);
                    onComplete();
                }, duration);
            }, [onComplete]);

            // 連続スカテキスト
            const getStreakText = () => {
                if (consecutiveWhiff >= 7) return '🔥 あと1回で天井！';
                if (consecutiveWhiff >= 5) return '😭 5連続スカ...でも天井が近い！';
                if (consecutiveWhiff >= 3) return '💢 3連続スカ...次こそ！';
                if (nearMissIntensity === 'extreme') return '虹だったのに...！';
                if (nearMissIntensity === 'strong') return '惜しかった！';
                return '';
            };

            // 連続スカで画面が赤くなる度合い
            const redIntensity = Math.min(consecutiveWhiff * 0.05, 0.3);

            return (
                <>
                    {showNearMiss && <NearMissFlash />}
                    {/* 暗転エフェクト（連続スカで赤くなる） */}
                    <div
                        className={`fixed inset-0 pointer-events-none z-[290] ${nearMissIntensity === 'extreme' || consecutiveWhiff >= 5 ? 'animate-[screen-shake_0.3s_ease-in-out_3]' : ''}`}
                        style={{
                            background: consecutiveWhiff >= 5
                                ? `rgba(255, 0, 0, ${0.3 + redIntensity})`
                                : consecutiveWhiff >= 3
                                    ? `rgba(255, 50, 0, ${0.2 + redIntensity})`
                                    : showNearMiss && nearMissIntensity === 'extreme'
                                        ? 'rgba(255, 0, 0, 0.3)'
                                        : showNearMiss && nearMissIntensity === 'strong'
                                            ? 'rgba(255, 100, 0, 0.2)'
                                            : 'rgba(0, 0, 0, 0.3)',
                            animation: consecutiveWhiff >= 5 || nearMissIntensity === 'extreme'
                                ? 'whiff-darken 1.5s ease-out forwards'
                                : 'whiff-darken 0.6s ease-out forwards',
                        }}
                    />
                    {/* 悔しいテキスト（連続スカ or 強いニアミス時） */}
                    {showText && (
                        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[300]">
                            <div className="text-center">
                                <div className={`text-4xl font-black ${consecutiveWhiff >= 5 ? 'text-red-600' : consecutiveWhiff >= 3 ? 'text-red-500' : nearMissIntensity === 'extreme' ? 'text-red-500' : 'text-yellow-500'} animate-pulse drop-shadow-lg`}>
                                    {getStreakText()}
                                </div>
                                <div className="text-lg text-white/80 mt-2">
                                    {consecutiveWhiff >= 7 ? '天井まであと1回！' : consecutiveWhiff >= 3 ? '天井が近づいている...' : 'あと少しだった...'}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* 悔しいパーティクル */}
                    {particles.map(p => (
                        <div
                            key={p.id}
                            style={{
                                position: 'fixed',
                                left: p.x,
                                top: p.y,
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                backgroundColor: p.color,
                                borderRadius: '50%',
                                pointerEvents: 'none',
                                zIndex: 295,
                                animation: `whiff-fade ${showNearMiss && nearMissIntensity === 'extreme' ? '1s' : '0.6s'} ease-out forwards`,
                                '--vx': `${p.vx}px`,
                                '--vy': `${p.vy}px`,
                            }}
                        />
                    ))}
                </>
            );
        };

        // 🎰 小当たり演出（40%）: LDWs + ニアミスフェイント
        const RewardSmallWin = ({ onComplete, centerX, centerY }) => {
            const [particles, setParticles] = useState([]);
            const [phase, setPhase] = useState('feint'); // feint → reveal

            useEffect(() => {
                // === フェイントフェーズ: 一瞬「BIG!?」と思わせる ===
                // 派手なフラッシュ音
                AudioEngine.play([400, 600, 800], 'sawtooth', 0.2, 0.05);

                // 0.4秒後に実際の結果へ
                setTimeout(() => {
                    setPhase('reveal');

                    // 落胆音（ガッカリ音程下降）
                    AudioEngine.play([600, 400, 300], 'sine', 0.15, 0.08);

                    // 控えめな金色パーティクル（30個）
                    const goldShades = ['#FFD700', '#FFC700', '#FFB700'];
                    const newParticles = [];
                    for (let i = 0; i < 30; i++) {
                        const fromLeft = i % 2 === 0;
                        const startX = fromLeft ? '5%' : '95%';
                        const startY = '5%';
                        const spreadX = (Math.random() - 0.5) * 200;
                        const spreadY = (Math.random() - 0.5) * 200;
                        newParticles.push({
                            id: i, startX, startY,
                            targetX: `${centerX + spreadX}px`, targetY: `${centerY + spreadY}px`,
                            color: goldShades[i % goldShades.length],
                            delay: Math.random() * 0.2, duration: 0.7 + Math.random() * 0.3,
                            size: 6 + Math.random() * 4,
                        });
                    }
                    setParticles(newParticles);

                    // 控えめなチリン音
                    setTimeout(() => AudioEngine.play([1047], 'sine', 0.12, 0.06), 200);
                }, 400);

                setTimeout(() => {
                    setParticles([]);
                    onComplete();
                }, 1600);
            }, [centerX, centerY, onComplete]);

            return (
                <>
                    {/* フェイントフェーズ: 一瞬BIGかと思わせる */}
                    {phase === 'feint' && (
                        <>
                            <div className="fixed inset-0 pointer-events-none z-[280]"
                                style={{
                                    background: 'radial-gradient(circle, rgba(255,140,0,0.4) 0%, rgba(255,100,0,0.3) 50%, transparent 100%)',
                                    animation: 'feint-flash 0.4s ease-out forwards',
                                }}
                            />
                            <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[290]">
                                <div className="text-5xl font-black text-orange-500 animate-pulse">BIG...!?</div>
                            </div>
                        </>
                    )}
                    {/* 実際の結果フェーズ */}
                    {phase === 'reveal' && (
                        <>
                            <div className="fixed inset-0 pointer-events-none z-[280]"
                                style={{
                                    background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 50%)',
                                    animation: 'normal-flash 0.5s ease-out forwards',
                                }}
                            />
                            {/* 「惜しい！」テキスト */}
                            <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[290]"
                                style={{ animation: 'near-miss-text 1s ease-out forwards' }}>
                                <div className="text-2xl font-black text-yellow-500">惜しい！あと少しでBIG...</div>
                            </div>
                            {particles.map(p => (
                                <CrackerConfettiParticle key={p.id} {...p} />
                            ))}
                        </>
                    )}
                </>
            );
        };

        // ノーマル演出（22%）: 虹色クラッカー
        const RewardNormal = ({ onComplete, centerX, centerY }) => {
            const [particles, setParticles] = useState([]);
            const [rings, setRings] = useState([]);

            useEffect(() => {
                // 虹色のクラッカーパーティクル（100個）
                const rainbowColors = ['#FF6B9D', '#C44569', '#F8B500', '#4ECDC4', '#95E1D3', '#38B6FF', '#A8E6CF'];
                const newParticles = [];
                for (let i = 0; i < 100; i++) {
                    const fromLeft = i % 2 === 0;

                    // 左下または右下からの発射
                    const startX = fromLeft ? '5%' : '95%';
                    const startY = '5%';

                    // 中央付近へのランダムな着地点
                    const spreadX = (Math.random() - 0.5) * 500;
                    const spreadY = (Math.random() - 0.5) * 500;
                    const targetX = `${centerX + spreadX}px`;
                    const targetY = `${centerY + spreadY}px`;

                    newParticles.push({
                        id: i,
                        startX,
                        startY,
                        targetX,
                        targetY,
                        color: rainbowColors[i % rainbowColors.length],
                        delay: Math.random() * 0.3,
                        duration: 0.9 + Math.random() * 0.4,
                        size: 10 + Math.random() * 8,
                    });
                }
                setParticles(newParticles);

                // 拡散リング3つ
                setRings([{ id: 1 }, { id: 2 }, { id: 3 }]);

                // 🎰 当たりSE: ベル音 → コイン音連続
                // ベル音（チーン！）
                AudioEngine.play([2093, 2093], 'sine', 0.25, 0.12);
                // コインがチャリンチャリン落ちる音
                setTimeout(() => AudioEngine.play([880, 1047], 'triangle', 0.18, 0.06), 150);
                setTimeout(() => AudioEngine.play([932, 1109], 'triangle', 0.16, 0.05), 250);
                setTimeout(() => AudioEngine.play([987, 1175], 'triangle', 0.14, 0.05), 340);
                setTimeout(() => AudioEngine.play([1047, 1245], 'triangle', 0.12, 0.04), 420);
                setTimeout(() => AudioEngine.play([1109, 1319], 'triangle', 0.1, 0.04), 490);

                setTimeout(() => {
                    setParticles([]);
                    setRings([]);
                    onComplete();
                }, 2000);
            }, [centerX, centerY, onComplete]);

            return (
                <>
                    {/* 虹色フラッシュ */}
                    <div
                        className="fixed inset-0 pointer-events-none z-[280]"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,107,157,0.4) 0%, rgba(62,207,196,0.3) 50%, transparent 70%)',
                            animation: 'normal-flash 0.8s ease-out forwards',
                        }}
                    />
                    {/* 拡散リング */}
                    {rings.map((r, i) => (
                        <div
                            key={r.id}
                            style={{
                                position: 'fixed',
                                left: centerX,
                                top: centerY,
                                width: '50px',
                                height: '50px',
                                marginLeft: '-25px',
                                marginTop: '-25px',
                                border: '4px solid rgba(255, 107, 157, 0.8)',
                                borderRadius: '50%',
                                pointerEvents: 'none',
                                zIndex: 285,
                                animation: `ring-expand 1s ease-out ${i * 0.15}s forwards`,
                            }}
                        />
                    ))}
                    {/* 虹色クラッカーパーティクル */}
                    {particles.map(p => (
                        <CrackerConfettiParticle key={p.id} {...p} />
                    ))}
                </>
            );
        };

        // ビッグ演出（10%）: 圧倒的レインボー爆発 - 段階的盛り上がり
        const RewardBig = ({ onComplete }) => {
            const [particles, setParticles] = useState([]);
            const [explosions, setExplosions] = useState([]);
            const [lightBeams, setLightBeams] = useState([]);
            const [phase, setPhase] = useState('buildup'); // buildup → explode

            useEffect(() => {
                // === フェーズ1: ビルドアップ（ドドドド...） ===
                // 画面が徐々に明るく、振動が増す
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        AudioEngine.play([100 + i * 30], 'sawtooth', 0.15 + i * 0.02, 0.03);
                    }, i * 100);
                }

                // 1秒後に爆発フェーズへ
                setTimeout(() => {
                    setPhase('explode');

                    // === フェーズ2: 爆発（ドン！） ===
                    // 重低音 + 高音の衝撃
                    AudioEngine.play([60, 80, 100], 'sawtooth', 0.4, 0.15);
                    AudioEngine.play([1500, 2000, 2500], 'sine', 0.3, 0.1);

                    // 連続爆発エフェクト
                    setExplosions([
                        { id: 1, delay: 0, x: '30%', y: '30%' },
                        { id: 2, delay: 0.1, x: '70%', y: '40%' },
                        { id: 3, delay: 0.2, x: '50%', y: '60%' },
                        { id: 4, delay: 0.3, x: '20%', y: '70%' },
                        { id: 5, delay: 0.4, x: '80%', y: '20%' },
                    ]);

                    // 光線エフェクト
                    setLightBeams([
                        { id: 1, angle: 0 }, { id: 2, angle: 60 }, { id: 3, angle: 120 },
                        { id: 4, angle: 180 }, { id: 5, angle: 240 }, { id: 6, angle: 300 },
                    ]);

                    // レインボークラッカー大量（300個）
                    const rainbowColors = ['#FF0080', '#FF8C00', '#FFD700', '#00FF00', '#00CED1', '#4169E1', '#9370DB'];
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    const newParticles = [];
                    for (let i = 0; i < 300; i++) {
                        const fromLeft = i % 2 === 0;
                        const startX = fromLeft ? '5%' : '95%';
                        const startY = '5%';
                        const spreadX = (Math.random() - 0.5) * 700;
                        const spreadY = (Math.random() - 0.5) * 700;
                        newParticles.push({
                            id: i, startX, startY,
                            targetX: `${centerX + spreadX}px`, targetY: `${centerY + spreadY}px`,
                            color: rainbowColors[i % rainbowColors.length],
                            delay: Math.random() * 0.5, duration: 1 + Math.random() * 0.6,
                            size: 14 + Math.random() * 10,
                        });
                    }
                    setParticles(newParticles);

                    // ファンファーレ
                    setTimeout(() => AudioEngine.play([523, 659, 784, 1047, 1319, 1568], 'triangle', 0.32, 0.2), 200);
                    setTimeout(() => AudioEngine.play([659, 784, 1047, 1319, 1568, 2093], 'sine', 0.3, 0.18), 400);

                    // ベル連打
                    setTimeout(() => AudioEngine.play([2093], 'sine', 0.28, 0.08), 700);
                    setTimeout(() => AudioEngine.play([2349], 'sine', 0.3, 0.08), 850);
                    setTimeout(() => AudioEngine.play([2637], 'sine', 0.32, 0.08), 1000);
                    setTimeout(() => AudioEngine.play([2093, 2349, 2637], 'sine', 0.35, 0.12), 1150);
                }, 800);

                setTimeout(() => {
                    setParticles([]);
                    setExplosions([]);
                    setLightBeams([]);
                    onComplete();
                }, 4500);
            }, [onComplete]);

            return (
                <>
                    {/* ビルドアップフェーズ: 画面オレンジ + 振動 */}
                    {phase === 'buildup' && (
                        <>
                            <div className="fixed inset-0 pointer-events-none z-[275]"
                                style={{
                                    background: 'radial-gradient(circle, rgba(255,140,0,0.3) 0%, rgba(255,100,0,0.2) 50%, transparent 100%)',
                                    animation: 'buildup-pulse 0.1s ease-in-out infinite',
                                }}
                            />
                            <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[290]"
                                style={{ animation: 'buildup-shake 0.1s ease-in-out infinite' }}>
                                <div className="text-6xl font-black text-orange-400 opacity-80">BIG...?</div>
                            </div>
                        </>
                    )}
                    {/* 爆発フェーズ: レインボーフラッシュ */}
                    {phase === 'explode' && (
                        <div
                            className="fixed inset-0 pointer-events-none z-[280]"
                            style={{
                                background: 'radial-gradient(circle, rgba(255,0,128,0.5) 0%, rgba(255,215,0,0.4) 30%, rgba(0,206,209,0.3) 60%, transparent 100%)',
                                animation: 'big-rainbow-flash 1.5s ease-out forwards',
                            }}
                        />
                    )}
                    {/* 光線 */}
                    {lightBeams.map(b => (
                        <div
                            key={b.id}
                            style={{
                                position: 'fixed',
                                left: '50%',
                                top: '50%',
                                width: '1000px',
                                height: '8px',
                                marginLeft: '-500px',
                                marginTop: '-4px',
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.8) 50%, transparent 100%)',
                                transform: `rotate(${b.angle}deg)`,
                                transformOrigin: 'center',
                                pointerEvents: 'none',
                                zIndex: 285,
                                animation: 'beam-pulse 2s ease-in-out infinite',
                            }}
                        />
                    ))}
                    {/* 連続爆発 */}
                    {explosions.map(exp => (
                        <div
                            key={exp.id}
                            style={{
                                position: 'fixed',
                                left: exp.x,
                                top: exp.y,
                                width: '100px',
                                height: '100px',
                                marginLeft: '-50px',
                                marginTop: '-50px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(255,215,0,0.9) 0%, rgba(255,0,128,0.6) 50%, transparent 100%)',
                                pointerEvents: 'none',
                                zIndex: 288,
                                animation: `explosion ${0.8}s ease-out ${exp.delay}s forwards`,
                            }}
                        />
                    ))}
                    {/* レインボークラッカーパーティクル */}
                    {particles.map(p => (
                        <CrackerConfettiParticle key={p.id} {...p} />
                    ))}
                    {/* BIG!! テキスト */}
                    <div
                        className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[295]"
                        style={{ animation: 'big-text 2.5s ease-out forwards' }}
                    >
                        <div className="text-9xl font-black" style={{
                            background: 'linear-gradient(45deg, #FF0080, #FF8C00, #FFD700, #00FF00, #00CED1, #4169E1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 40px rgba(255,215,0,0.8)',
                        }}>
                            BIG!!!
                        </div>
                    </div>
                </>
            );
        };

        // ジャックポット演出（5%）: 究極の黄金爆発 - 完全依存レベル
        const RewardJackpot = ({ onComplete }) => {
            const [particles, setParticles] = useState([]);
            const [starBursts, setStarBursts] = useState([]);
            const [spirals, setSpirals] = useState([]);
            const [waves, setWaves] = useState([]);

            useEffect(() => {
                // 画面振動（強烈）
                if (navigator.vibrate) {
                    navigator.vibrate([150, 50, 150, 50, 200, 50, 300]);
                }

                // 星型バースト
                const newStarBursts = [];
                for (let i = 0; i < 12; i++) {
                    const angle = (Math.PI * 2 * i) / 12;
                    newStarBursts.push({
                        id: i,
                        angle,
                        delay: i * 0.05,
                    });
                }
                setStarBursts(newStarBursts);

                // 螺旋エフェクト
                setSpirals([
                    { id: 1, direction: 1, delay: 0 },
                    { id: 2, direction: -1, delay: 0.2 },
                    { id: 3, direction: 1, delay: 0.4 },
                ]);

                // 波動エフェクト
                setWaves([
                    { id: 1, delay: 0 },
                    { id: 2, delay: 0.3 },
                    { id: 3, delay: 0.6 },
                    { id: 4, delay: 0.9 },
                ]);

                // 金色クラッカー超大量（500個）
                const goldShades = ['#FFD700', '#FFA500', '#FFDB58', '#FFE55C', '#FFF8DC'];
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const newParticles = [];
                for (let i = 0; i < 500; i++) {
                    const fromLeft = i % 2 === 0;
                    const startX = fromLeft ? '5%' : '95%';
                    const startY = '5%';

                    // 中央付近への着地点（超広範囲）
                    const spreadX = (Math.random() - 0.5) * 900;
                    const spreadY = (Math.random() - 0.5) * 900;
                    const targetX = `${centerX + spreadX}px`;
                    const targetY = `${centerY + spreadY}px`;

                    newParticles.push({
                        id: i,
                        startX,
                        startY,
                        targetX,
                        targetY,
                        color: goldShades[i % goldShades.length],
                        delay: Math.random() * 0.6,
                        duration: 1.2 + Math.random() * 0.8,
                        size: 12 + Math.random() * 16,
                    });
                }
                setParticles(newParticles);

                // 🎰 JACKPOT究極SE: サイレン → 爆発 → ファンファーレ → ベル狂乱 → 5秒間鳴り続ける
                // サイレン音（上昇下降を繰り返す）
                AudioEngine.play([400, 800], 'sawtooth', 0.3, 0.15);
                setTimeout(() => AudioEngine.play([800, 400], 'sawtooth', 0.3, 0.15), 150);
                setTimeout(() => AudioEngine.play([400, 900], 'sawtooth', 0.32, 0.15), 300);
                setTimeout(() => AudioEngine.play([900, 400], 'sawtooth', 0.32, 0.15), 450);

                // 爆発音（ドカーン！）
                setTimeout(() => AudioEngine.play([100, 80, 60, 40], 'sawtooth', 0.4, 0.2), 600);

                // 究極ファンファーレ（3連続上昇音階）
                setTimeout(() => AudioEngine.play([659, 784, 1047, 1319, 1568, 2093], 'sine', 0.38, 0.22), 850);
                setTimeout(() => AudioEngine.play([784, 1047, 1319, 1568, 2093, 2637], 'triangle', 0.36, 0.2), 1050);
                setTimeout(() => AudioEngine.play([1047, 1319, 1568, 2093, 2637, 3136], 'sine', 0.34, 0.18), 1250);

                // ベル狂乱連打（10回以上のベル音）
                setTimeout(() => AudioEngine.play([2093], 'sine', 0.35, 0.08), 1500);
                setTimeout(() => AudioEngine.play([2349], 'sine', 0.36, 0.08), 1620);
                setTimeout(() => AudioEngine.play([2637], 'sine', 0.37, 0.08), 1740);
                setTimeout(() => AudioEngine.play([2093, 2349], 'sine', 0.38, 0.09), 1860);
                setTimeout(() => AudioEngine.play([2349, 2637], 'sine', 0.38, 0.09), 1980);
                setTimeout(() => AudioEngine.play([2637, 3136], 'sine', 0.38, 0.09), 2100);
                setTimeout(() => AudioEngine.play([2093, 2349, 2637], 'sine', 0.39, 0.1), 2220);
                setTimeout(() => AudioEngine.play([2349, 2637, 3136], 'sine', 0.39, 0.1), 2340);
                setTimeout(() => AudioEngine.play([2093, 2637], 'sine', 0.4, 0.1), 2460);
                setTimeout(() => AudioEngine.play([2349, 3136], 'sine', 0.4, 0.1), 2580);
                setTimeout(() => AudioEngine.play([2093, 2349, 2637, 3136], 'sine', 0.42, 0.15), 2700);

                // 最後の大爆発音（超強調）
                setTimeout(() => AudioEngine.play([3136, 2637, 2093, 1568, 1319, 1047], 'sine', 0.45, 0.3), 2900);

                setTimeout(() => {
                    setParticles([]);
                    setStarBursts([]);
                    setSpirals([]);
                    setWaves([]);
                    onComplete();
                }, 5000);
            }, [onComplete]);

            return (
                <>
                    {/* 黄金フラッシュ（強烈） */}
                    <div
                        className="fixed inset-0 pointer-events-none z-[280]"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,215,0,0.9) 0%, rgba(255,165,0,0.7) 30%, rgba(255,215,0,0.5) 60%, transparent 100%)',
                            animation: 'jackpot-mega-flash 2s ease-out forwards',
                        }}
                    />
                    {/* 画面振動エフェクト（強化） */}
                    <div
                        className="fixed inset-0 pointer-events-none z-[282]"
                        style={{ animation: 'screen-shake-intense 1s ease-out forwards' }}
                    />
                    {/* 波動リング */}
                    {waves.map(w => (
                        <div
                            key={w.id}
                            style={{
                                position: 'fixed',
                                left: '50%',
                                top: '50%',
                                width: '50px',
                                height: '50px',
                                marginLeft: '-25px',
                                marginTop: '-25px',
                                border: '6px solid rgba(255, 215, 0, 0.9)',
                                borderRadius: '50%',
                                pointerEvents: 'none',
                                zIndex: 285,
                                animation: `mega-wave-expand 2s ease-out ${w.delay}s forwards`,
                            }}
                        />
                    ))}
                    {/* 螺旋 */}
                    {spirals.map(sp => (
                        <div
                            key={sp.id}
                            style={{
                                position: 'fixed',
                                left: '50%',
                                top: '50%',
                                width: '2000px',
                                height: '2000px',
                                marginLeft: '-1000px',
                                marginTop: '-1000px',
                                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,215,0,0.3) 10%, transparent 20%, rgba(255,215,0,0.3) 30%, transparent 40%)',
                                borderRadius: '50%',
                                pointerEvents: 'none',
                                zIndex: 283,
                                animation: `spiral-rotate-${sp.direction > 0 ? 'cw' : 'ccw'} 3s linear ${sp.delay}s infinite`,
                            }}
                        />
                    ))}
                    {/* 星型バースト */}
                    {starBursts.map(sb => (
                        <div
                            key={sb.id}
                            style={{
                                position: 'fixed',
                                left: '50%',
                                top: '50%',
                                width: '2000px',
                                height: '20px',
                                marginLeft: '-1000px',
                                marginTop: '-10px',
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.9) 50%, transparent 100%)',
                                transform: `rotate(${sb.angle}rad)`,
                                transformOrigin: 'center',
                                pointerEvents: 'none',
                                zIndex: 288,
                                animation: `starburst-pulse 2s ease-out ${sb.delay}s forwards`,
                            }}
                        />
                    ))}
                    {/* 黄金クラッカーパーティクル超大量 */}
                    {particles.map(p => (
                        <CrackerConfettiParticle key={p.id} {...p} />
                    ))}
                    {/* JACKPOT!!! テキスト（巨大＆脈動） */}
                    <div
                        className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[295]"
                        style={{ animation: 'jackpot-mega-text 3s ease-out forwards' }}
                    >
                        <div className="text-[12rem] font-black" style={{
                            background: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700, #FFF8DC, #FFD700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 60px rgba(255,215,0,1), 0 0 120px rgba(255,215,0,0.8), 0 0 180px rgba(255,165,0,0.6)',
                            filter: 'drop-shadow(0 0 40px rgba(255,215,0,1))',
                        }}>
                            JACKPOT!!!
                        </div>
                    </div>
                    {/* サブテキスト */}
                    <div
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 pointer-events-none z-[295]"
                        style={{ animation: 'jackpot-subtext 3s ease-out 0.5s forwards', opacity: 0 }}
                    >
                        <div className="text-4xl font-black text-yellow-300" style={{ textShadow: '0 0 20px rgba(255,215,0,1)' }}>
                            🔥 FEVER MODE ACTIVATED 🔥
                        </div>
                    </div>
                </>
            );
        };

        // --- クラッカー風花吹雪パーティクルシステム（宝箱用）---
        const CrackerConfettiParticle = ({ startX, startY, targetX, targetY, color, delay, duration, size }) => {
            const randomRotation = Math.random() * 1080 - 540;

            return (
                <div
                    style={{
                        position: 'fixed',
                        left: startX,
                        bottom: startY,
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: color,
                        opacity: 0.95,
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: 250,
                        animation: `cracker-shoot ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s forwards`,
                        transform: 'scale(1)',
                        boxShadow: color === '#FFD700' ? '0 0 15px rgba(255, 215, 0, 1)' : '0 0 15px rgba(192, 192, 192, 1)',
                        '--target-x': targetX,
                        '--target-y': targetY,
                        '--rotation': `${randomRotation}deg`,
                    }}
                />
            );
        };

        const ConfettiSystem = ({ rarity }) => {
            const [particles, setParticles] = useState([]);

            useEffect(() => {
                // レアリティに応じてパーティクル数を決定
                let count = 0;
                // let goldRatio = 0; // 使われていないため省略可

                if (rarity === 'common') {
                    count = 30;
                } else if (rarity === 'rare') {
                    count = 60;
                } else if (rarity === 'epic') {
                    count = 100;
                } else if (rarity === 'legendary') {
                    count = 200;
                } else if (rarity === 'mythic') {
                    count = 500;
                }

                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const newParticles = [];
                const colors = ['#FFD700', '#FFA500', '#FF6B9D', '#4ECDC4', '#A8E6CF'];

                for (let i = 0; i < count; i++) {
                    const fromLeft = i % 2 === 0;
                    const startX = fromLeft ? '5%' : '95%';
                    const startY = '5%';

                    const spreadX = (Math.random() - 0.5) * 600;
                    const spreadY = (Math.random() - 0.5) * 600;

                    newParticles.push({
                        id: i,
                        startX,
                        startY,
                        targetX: `${centerX + spreadX}px`,
                        targetY: `${centerY + spreadY}px`,
                        color: colors[i % colors.length],
                        delay: Math.random() * 0.5,
                        duration: 1 + Math.random() * 0.5,
                        size: 8 + Math.random() * 8,
                    });
                }
                setParticles(newParticles);

                // クリーンアップ
                return () => setParticles([]);
            }, [rarity]);

            return (
                <>
                    {particles.map(p => (
                        <CrackerConfettiParticle key={p.id} {...p} />
                    ))}
                </>
            );
        };


        const TaskItem = ({ task, onToggle, onUpdate, onDelete, onDragStart, isDragging, isMobile, onXpGain, isDeadlineView, activeTheme, onContextMenu, isFocusedSection = true, isLastInSection = false, setRewardEffect, stats, setStats, setToastMessage }) => {
            const [isCompleting, setIsCompleting] = useState(false);
            const [isStarting, setIsStarting] = useState(false);
            const [confettiType, setConfettiType] = useState(null);
            const [animateCheckbox, setAnimateCheckbox] = useState(false);
            const [showActions, setShowActions] = useState(false);
            const [currentForecast, setCurrentForecast] = useState(null); // 予告枠色
            const buttonRef = useRef(null);

            // 🎰 ギャンブルデザイン最大化: handleToggle
            // 予告演出、音変化、ニアミス強化、天井可視化、The Freezeを統合
            const handleToggle = async (e) => {
                e.stopPropagation();

                // 既に完了している場合は単純にトグル（未完了に戻す）
                if (task.completed) return onToggle(task);
                if (isCompleting || isStarting) return;

                const rect = buttonRef.current ? buttonRef.current.getBoundingClientRect() : null;
                const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
                const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

                // --- 共通演出ロジック（開始・完了で使用） ---
                const runGamblingSequence = async (isStartPhase) => {
                    const isFeverMode = stats.feverEndTime > Date.now();

                    // 🎰 1. 予告枠色を先に決定（結果とは独立）
                    // 予告は結果を示唆するが、確定ではない（裏切りあり）
                    const forecastRoll = Math.random() * 100;
                    let forecast = 'white'; // 白=通常
                    if (forecastRoll < 3) {
                        forecast = 'rainbow'; // 虹=激アツ
                    } else if (forecastRoll < 10) {
                        forecast = 'red'; // 赤=チャンス大
                    } else if (forecastRoll < 25) {
                        forecast = 'gold'; // 金=チャンス
                    } else if (forecastRoll < 45) {
                        forecast = 'green'; // 緑=ちょいアツ
                    }

                    // 🎰 2. 予告演出の表示（枠色変化）
                    setAnimateCheckbox(true);
                    setCurrentForecast(forecast); // 枠色をUIに反映

                    // 予告音（枠色に応じて変化）
                    if (forecast === 'rainbow') {
                        AudioEngine.play([1200, 1400, 1600, 1800], 'sine', 0.15, 0.08);
                        // 虹予告確認: 全画面フラッシュ
                        setRewardEffect(<RareForecastFlash forecast="rainbow" onComplete={() => setRewardEffect(null)} />);
                        await new Promise(resolve => setTimeout(resolve, 800));
                    } else if (forecast === 'red') {
                        AudioEngine.play([800, 1000, 1200], 'sine', 0.12, 0.06);
                        // 赤予告確認: 全画面フラッシュ
                        setRewardEffect(<RareForecastFlash forecast="red" onComplete={() => setRewardEffect(null)} />);
                        await new Promise(resolve => setTimeout(resolve, 600));
                    } else if (forecast === 'gold') {
                        AudioEngine.play([800, 1000, 1200], 'sine', 0.12, 0.06);
                    } else if (forecast === 'green') {
                        AudioEngine.play([600, 800], 'sine', 0.1, 0.05);
                    } else {
                        AudioEngine.play([1200, 600], 'square', 0.08, 0.02);
                    }

                    // 🎰 3. ドラムロール（枠色と結果に応じて音程変化）
                    // 音程が段階的に変化し、結果を予測させない
                    const tier = determineRewardTier(stats.pityCounter, isFeverMode);
                    const isGoodResult = tier === 'big' || tier === 'jackpot';
                    const isMediumResult = tier === 'normal' || tier === 'small';

                    // ドラムロール音（途中でフェイントあり）
                    const basePitch = 500;
                    for (let i = 0; i < 10; i++) {
                        const time = i * 80;
                        const pitch = basePitch + (i * 30);
                        // 途中で音程が下がる（フェイント）
                        const fakeDown = (i === 5 || i === 6) && Math.random() < 0.3;
                        const finalPitch = fakeDown ? pitch - 200 : pitch;
                        setTimeout(() => AudioEngine.play([finalPitch], 'square', 0.05 + i * 0.005, 0.025), time);
                    }

                    await new Promise(resolve => setTimeout(resolve, 800));

                    // 🎰 4. The Freeze（結果発表直前の静寂）
                    // 0.3秒の完全停止 + 心音
                    AudioEngine.play([60, 80], 'sine', 0.1, 0.15);
                    await new Promise(resolve => setTimeout(resolve, 300));

                    // リール停止音（結果に応じて変化）
                    if (isGoodResult) {
                        // 重低音 + 金属音
                        AudioEngine.play([100, 150], 'sawtooth', 0.25, 0.1);
                        AudioEngine.play([1500, 2000], 'sine', 0.15, 0.05);
                    } else {
                        AudioEngine.play([300, 200], 'square', 0.18, 0.08);
                    }

                    // 🎰 5. 天井カウンター可視化
                    const newPityCounter = tier === 'whiff' ? stats.pityCounter + 1 : 0;
                    if (newPityCounter >= 5) {
                        setToastMessage(`⚡ 天井まで残り${8 - newPityCounter}回！`);
                    }

                    // 🎰 6. ニアミス判定（強化版）
                    // 予告が良いのに結果が悪い = 強いニアミス演出
                    let showNearMiss = false;
                    let nearMissIntensity = 'normal';
                    if (tier === 'whiff') {
                        if (forecast === 'rainbow' || forecast === 'red') {
                            showNearMiss = true;
                            nearMissIntensity = 'extreme'; // 虹予告→スカ = 超悔しい
                        } else if (forecast === 'gold' && Math.random() < 0.5) {
                            showNearMiss = true;
                            nearMissIntensity = 'strong';
                        } else if (forecast === 'green' && Math.random() < 0.3) {
                            showNearMiss = true;
                        } else if (Math.random() < 0.1) {
                            showNearMiss = true;
                        }
                    }

                    return { tier, showNearMiss, nearMissIntensity, newPityCounter, forecast };
                };

                // === 1回目クリック: 開始 ===
                // 🛑 ワンクリック動作モード（ここを false にすると即完了、元に戻すには && false を削除）
                if (!task.started && false) {
                    setIsStarting(true);

                    const result = await runGamblingSequence(true);
                    const { tier, showNearMiss, nearMissIntensity, forecast } = result;

                    // 開始状態に更新
                    onUpdate(task.id, { started: true, startedAt: Date.now() });

                    // 報酬演出の発火（開始時）
                    const effectComplete = () => {
                        setRewardEffect(null);
                        setIsStarting(false);
                        setAnimateCheckbox(false);
                        setCurrentForecast(null); // 枠色リセット
                    };

                    // WinText + 報酬演出を同時表示
                    if (tier === 'whiff') {
                        setRewardEffect(<><WinText tier={tier} /><RewardWhiff onComplete={effectComplete} showNearMiss={showNearMiss} nearMissIntensity={nearMissIntensity} consecutiveWhiff={stats.pityCounter} /></>);
                    } else if (tier === 'small') {
                        setRewardEffect(<><WinText tier={tier} /><RewardSmallWin onComplete={effectComplete} centerX={centerX} centerY={centerY} /></>);
                    } else if (tier === 'normal') {
                        setRewardEffect(<><WinText tier={tier} /><RewardNormal onComplete={effectComplete} centerX={centerX} centerY={centerY} /></>);
                    } else if (tier === 'big') {
                        setRewardEffect(<><WinText tier={tier} /><RewardBig onComplete={effectComplete} /></>);
                        setToastMessage('🚀 START BIG!! 期待が高まる！');
                    } else if (tier === 'jackpot') {
                        setRewardEffect(<><WinText tier={tier} /><RewardJackpot onComplete={effectComplete} /></>);
                        setToastMessage('🎰 JACKPOT START!!! 完了時にさらなる報酬が！');
                    }

                    return;
                }

                // === 開始取り消し（Alt+クリック） ===
                if (task.started && e.altKey) {
                    onUpdate(task.id, { started: false, startedAt: null });
                    AudioEngine.play([300, 250, 200], 'sine', 0.1, 0.05);
                    setToastMessage('↩️ タスク開始を取り消しました');
                    return;
                }

                // === 2回目クリック: 完了 ===
                setIsCompleting(true);

                const result = await runGamblingSequence(false);
                const { tier, showNearMiss, nearMissIntensity, newPityCounter } = result;

                // タスク完了処理
                onToggle(task);
                onXpGain(task, rect, setConfettiType);

                // 報酬演出の発火
                const effectComplete = () => {
                    setRewardEffect(null);
                    setIsCompleting(false);
                    setAnimateCheckbox(false);
                    setCurrentForecast(null); // 枠色リセット
                };

                // WinText + 報酬演出 + ジェム吸い込み演出を同時表示
                const gemAmounts = { whiff: 0, small: 3, normal: 5, big: 10, jackpot: 20 };
                let gemCount = gemAmounts[tier] || 0;

                // 📈 成長グラフ用: 今日の日付を取得
                const todayStr = new Date().toISOString().split('T')[0];
                const updateHistory = (prev) => {
                    const history = prev.dailyCompletionHistory || {};
                    return {
                        ...history,
                        [todayStr]: (history[todayStr] || 0) + 1
                    };
                };

                // 🔥 コンボ判定: 3分以内の連続完了でコンボ発動
                const now = Date.now();
                const COMBO_WINDOW = 180000; // 3分（タスク粒度に合わせて調整）
                const timeSinceLast = now - (stats.lastCompletionTime || 0);
                const isCombo = timeSinceLast < COMBO_WINDOW && stats.lastCompletionTime > 0;

                let newComboCount = 0;
                let comboMultiplier = 1;

                if (tier !== 'whiff') { // スカではコンボ継続しない
                    if (isCombo) {
                        newComboCount = stats.comboCount + 1;
                        // コンボ倍率: 2=1.5x, 3-4=2x, 5+=3x
                        if (newComboCount >= 5) {
                            comboMultiplier = 3;
                        } else if (newComboCount >= 3) {
                            comboMultiplier = 2;
                        } else {
                            comboMultiplier = 1.5;
                        }
                        gemCount = Math.floor(gemCount * comboMultiplier);
                    } else {
                        newComboCount = 1; // コンボ開始
                    }
                }

                // コンボ演出を追加（2コンボ以上で表示）
                const showCombo = newComboCount >= 2;

                if (tier === 'whiff') {
                    setRewardEffect(<><WinText tier={tier} /><RewardWhiff onComplete={effectComplete} showNearMiss={showNearMiss} nearMissIntensity={nearMissIntensity} consecutiveWhiff={newPityCounter} /></>);
                    setStats(prev => ({ ...prev, pityCounter: newPityCounter, comboCount: 0, lastCompletionTime: now, dailyCompletionHistory: updateHistory(prev) }));
                } else if (tier === 'small') {
                    setRewardEffect(<><WinText tier={tier} /><RewardSmallWin onComplete={effectComplete} centerX={centerX} centerY={centerY} /><GemAbsorb amount={gemCount} startX={centerX} startY={centerY} />{showCombo && <ComboDisplay comboCount={newComboCount} />}</>);
                    setStats(prev => ({ ...prev, pityCounter: 0, gems: prev.gems + gemCount, comboCount: newComboCount, lastCompletionTime: now, dailyCompletionHistory: updateHistory(prev) }));
                    if (showCombo) setToastMessage(`🔥 ${newComboCount}x COMBO! +${gemCount}💎`);
                } else if (tier === 'normal') {
                    setRewardEffect(<><WinText tier={tier} /><RewardNormal onComplete={effectComplete} centerX={centerX} centerY={centerY} /><GemAbsorb amount={gemCount} startX={centerX} startY={centerY} />{showCombo && <ComboDisplay comboCount={newComboCount} />}</>);
                    setStats(prev => ({ ...prev, pityCounter: 0, gems: prev.gems + gemCount, comboCount: newComboCount, lastCompletionTime: now, dailyCompletionHistory: updateHistory(prev) }));
                    if (showCombo) setToastMessage(`🔥 ${newComboCount}x COMBO! +${gemCount}💎`);
                } else if (tier === 'big') {
                    setRewardEffect(<><WinText tier={tier} /><RewardBig onComplete={effectComplete} /><GemAbsorb amount={gemCount} startX={window.innerWidth / 2} startY={window.innerHeight / 2} />{showCombo && <ComboDisplay comboCount={newComboCount} />}</>);
                    const feverEnd = Date.now() + 3 * 60 * 1000;
                    setStats(prev => ({ ...prev, pityCounter: 0, feverEndTime: feverEnd, gems: prev.gems + gemCount, comboCount: newComboCount, lastCompletionTime: now, dailyCompletionHistory: updateHistory(prev) }));
                    setToastMessage(showCombo ? `🔥 ${newComboCount}x COMBO! FEVER MODE!! +${gemCount}💎` : '🔥 FEVER MODE!! 3分間レア確率2倍！');
                } else if (tier === 'jackpot') {
                    setRewardEffect(<><WinText tier={tier} /><RewardJackpot onComplete={effectComplete} /><GemAbsorb amount={gemCount} startX={window.innerWidth / 2} startY={window.innerHeight / 2} />{showCombo && <ComboDisplay comboCount={newComboCount} />}</>);
                    const feverEnd = Date.now() + 3 * 60 * 1000;
                    setStats(prev => ({ ...prev, pityCounter: 0, feverEndTime: feverEnd, gems: prev.gems + gemCount, comboCount: newComboCount, lastCompletionTime: now, dailyCompletionHistory: updateHistory(prev) }));
                    setToastMessage(showCombo ? `🎰 ${newComboCount}x COMBO! JACKPOT!!! +${gemCount}💎` : '🎰 JACKPOT!!! 🔥 FEVER MODE 発動！');
                }
            };

            const springClass = isCompleting ? "animate-spring" : "";
            const checkboxPop = animateCheckbox ? "animate-checkbox-pop" : "";
            const anticipationGlow = animateCheckbox ? "animate-anticipation-glow animate-anticipation-pulse" : "";
            // Section 1以外はクリック不可 (pointer-events-none)
            const disabledClass = !isFocusedSection && !task.completed ? "pointer-events-none opacity-50 grayscale" : "";

            return (
                <div
                    className={`group flex items-start py-5 px-5 border-b-2 transition-all ${springClass} ${disabledClass} ${isDragging ? 'opacity-50 bg-blue-50' : ''} ${task.completed
                        ? 'bg-gray-50 opacity-60 border-gray-100'
                        : isFocusedSection
                            ? 'bg-white border-gray-200 hover:bg-gray-50'
                            : 'bg-gray-100 border-gray-200'
                        }`}
                    draggable={!task.completed}
                    onDragStart={(e) => {
                        if (!task.completed && onDragStart) {
                            onDragStart(e, task);
                        }
                    }}
                    onContextMenu={(e) => onContextMenu && onContextMenu(e, task)}
                    onClick={() => { if (isMobile) setShowActions(prev => !prev); }}
                >
                    {/* ドラッグハンドル */}
                    {!task.completed && (
                        <div className="pt-0.5 pr-2 flex-shrink-0 cursor-move text-gray-300 hover:text-gray-500 transition-colors">
                            <Icons.GripVertical size={18} />
                        </div>
                    )}

                    <div className="pt-0.5 pr-4 flex-shrink-0 relative" ref={buttonRef} onClick={(e) => handleToggle(e)}>
                        {(isCompleting || confettiType === 'ignition') && <Confetti type={confettiType} theme={activeTheme} />}
                        {/* 予告枠色オーラ（演出中のみ表示） */}
                        {currentForecast && currentForecast !== 'white' && (
                            <div className={`absolute inset-0 rounded-xl animate-pulse ${currentForecast === 'rainbow' ? 'bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500' :
                                currentForecast === 'red' ? 'bg-red-500' :
                                    currentForecast === 'gold' ? 'bg-yellow-400' :
                                        'bg-green-400'
                                }`} style={{ opacity: 0.4, transform: 'scale(1.5)' }} />
                        )}
                        <div className={`relative w-6 h-6 rounded-xl flex items-center justify-center transition-all ${checkboxPop} ${anticipationGlow} ${currentForecast && currentForecast !== 'white'
                            ? `border-4 scale-125 ${currentForecast === 'rainbow' ? 'border-purple-500 bg-gradient-to-br from-pink-200 to-yellow-200' :
                                currentForecast === 'red' ? 'border-red-500 bg-red-100' :
                                    currentForecast === 'gold' ? 'border-yellow-500 bg-yellow-100' :
                                        'border-green-500 bg-green-100'
                            }`
                            : task.completed || isCompleting
                                ? 'bg-duo-blue border-duo-blue border-2 scale-110'
                                : (task.started || isStarting)
                                    ? 'bg-green-100 border-green-500 border-[3px]'
                                    : isFocusedSection
                                        ? 'border-gray-300 border-2 bg-white text-white group-hover:bg-gray-50'
                                        : 'border-gray-300 border-2 bg-gray-200'
                            }`}>
                            {/* 虹予告時の特殊アイコン */}
                            {currentForecast === 'rainbow' && <span className="text-xs">🌈</span>}
                            {currentForecast === 'red' && !task.completed && !isCompleting && <span className="text-xs">🔥</span>}
                            {currentForecast === 'gold' && !task.completed && !isCompleting && <span className="text-xs">✨</span>}
                            {currentForecast === 'green' && !task.completed && !isCompleting && <span className="text-xs">⚡</span>}
                            {!currentForecast && (task.completed || isCompleting) && <Icons.Check size={16} className="text-gray-500" strokeWidth={4} />}
                            {!currentForecast && (task.started || isStarting) && !task.completed && !isCompleting && <Icons.Play size={12} className="text-green-600" fill="currentColor" />}
                        </div>
                    </div>
                    <div className="flex-grow min-w-0 pr-2 pt-0.5">
                        <div className={`text-lg font-black leading-tight ${task.completed
                            ? 'text-gray-400 line-through'
                            : isFocusedSection
                                ? 'text-gray-900'
                                : 'text-gray-500'
                            }`}>{task.title}</div>
                    </div>
                    <div className="flex items-center gap-1">
                        {/* ボタン群: PC=ホバーで表示、モバイル=タップで表示 */}
                        {!task.completed && (
                            <div className="flex items-center gap-1">
                                <div className={`flex items-center gap-1 transition-opacity duration-200 ${isMobile ? (showActions ? 'opacity-100' : 'opacity-0') : 'opacity-0 group-hover:opacity-100'}`}>
                                    <IconButton icon={Icons.Trash2} size={18} className="text-gray-300 hover:text-duo-pink hover:bg-red-50" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} />
                                </div>
                            </div>
                        )}

                        {/* 完了済みタスクのボタン */}
                        {task.completed && (
                            <div className={`flex items-center gap-1 transition-opacity duration-200 ${isMobile ? (showActions ? 'opacity-100' : 'opacity-0') : 'opacity-0 group-hover:opacity-100'}`}>
                                <IconButton icon={Icons.Trash2} size={18} className="text-gray-300 hover:text-duo-pink" onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} />
                            </div>
                        )}
                    </div>
                </div>
            );
        };

        // --- ログインモーダル ---
        const AuthModal = ({ onClose, onGoogleLogin, onEmailLogin }) => {
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');

            const handleEmailSubmit = (e) => {
                e.preventDefault();
                if (email && password) {
                    onEmailLogin(email, password);
                }
            };

            return (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]" onClick={onClose}>
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-floating" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-duo-text">🔐 ログイン</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                        </div>

                        <div className="space-y-4">
                            {/* Googleログイン */}
                            <button
                                onClick={onGoogleLogin}
                                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Googleでログイン
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">または</span>
                                </div>
                            </div>

                            {/* メールログイン */}
                            <form onSubmit={handleEmailSubmit} className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="メールアドレス"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-duo-blue"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="パスワード"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-duo-blue"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-duo-blue hover:bg-duo-blueBorder text-white font-bold py-3 px-4 rounded-xl transition-colors border-b-4 border-duo-blueBorder"
                                >
                                    ログイン / 新規登録
                                </button>
                            </form>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                ※ ログインすると、スマホとPCでデータが自動同期されます
                            </p>
                        </div>
                    </div>
                </div>
            );
        };

        // --- メインアプリ ---
        const App = () => {
            const load = (k, d) => {
                try {
                    const loaded = JSON.parse(localStorage.getItem(k));
                    if (!loaded) return d;

                    // 配列の場合（tasks）
                    if (Array.isArray(d)) {
                        // ロードデータも配列ならそれを返す。そうでなければデフォルト（空配列）
                        return Array.isArray(loaded) ? loaded : d;
                    }

                    // オブジェクトの場合（stats）: 既存データに新フィールドがない場合の対策（マージ）
                    return { ...d, ...loaded, dailyCompletionHistory: loaded.dailyCompletionHistory || {} };
                } catch {
                    return d;
                }
            };

            // 📅 内部用ヘルパー: 確実に利用可能な日付取得関数（外部定義に依存しないようシャドーイング）
            const getAdjustedToday = () => {
                const now = new Date();
                if (now.getHours() < 3) now.setDate(now.getDate() - 1);
                return now.toISOString().split('T')[0];
            };

            const [tasks, setTasks] = useState(() => load('duo_v18_tasks', []));
            const [stats, setStats] = useState(() => load('duo_v18_stats', {
                xp: 0, level: 1, gems: 100, streak: 0, lastDate: null, streakFreeze: 0,
                wager: { active: false },
                focusPotion: false,
                resurrectionTickets: 0,
                themes: ['default'], currentTheme: 'default',
                streakBroken: false, savedStreak: 0,
                completedSections: 0,
                devLogs: [],
                mvpScrutinizerActive: true, // デフォルトで有効
                devOathActive: false,
                flowCapacitorEndTime: 0,
                tasksCreated: 0,
                tasksPurged: 0,
                pityCounter: 0, // 天井カウンター（スカが続くと上昇）
                feverEndTime: 0, // フィーバーモード終了時刻
                tempGems: 0,
                initialTempGems: 0,
                isBurning: false,
                burnStartTime: 0,
                // 🔥 コンボシステム用
                comboCount: 0, // 現在のコンボ数
                lastCompletionTime: 0, // 最後のタスク完了時刻
                // 📈 成長グラフ用
                dailyCompletionHistory: {}, // { '2026-01-16': 5, '2026-01-15': 3, ... }
                goal: null, // ユーザーの目標
            }));

            const SECTION_SIZE = 4;

            const [isSidebarOpen, setIsSidebarOpen] = useState(false);
            const [activeListId, setActiveListId] = useState('default');
            const [isShopOpen, setIsShopOpen] = useState(false);
            const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
            const [timerState, setTimerState] = useState({ active: false, time: 10 * 60, mode: 'break' });
            const [isCompletedOpen, setIsCompletedOpen] = useState(false);
            const [toastMessage, setToastMessage] = useState(null);
            const [levelGlow, setLevelGlow] = useState(false);
            const [progressGlow, setProgressGlow] = useState(false);
            const [showIgnition, setShowIgnition] = useState(false);
            const [floatingTexts, setFloatingTexts] = useState([]);

            // 中毒性MAX：報酬演出システムのstate
            const [rewardEffect, setRewardEffect] = useState(null);

            // 🔥 ストリーク警告用state
            const [showStreakWarning, setShowStreakWarning] = useState(false);
            // 📈 成長グラフ用state（削除：activeListIdで管理）

            // 🔔 通知許可状態（granted/denied/default）
            const [notificationPermission, setNotificationPermission] = useState(
                typeof Notification !== 'undefined' ? Notification.permission : 'default'
            );

            const [contextMenu, setContextMenu] = useState(null);

            // Progress Bar Animation State
            const [progressBounce, setProgressBounce] = useState(false);

            // Drag & Drop State
            const [draggedTaskId, setDraggedTaskId] = useState(null);
            const [dragOverTaskId, setDragOverTaskId] = useState(null);

            // 🔐 認証状態
            const [user, setUser] = useState(null);
            const [authLoading, setAuthLoading] = useState(true);
            const [showAuthModal, setShowAuthModal] = useState(false);
            const [syncStatus, setSyncStatus] = useState('synced'); // 'synced' | 'syncing' | 'error'

            const closeToast = useCallback(() => {
                setToastMessage(null);
            }, []);

            useEffect(() => {
                if (!stats.isBurning || stats.tempGems <= 0) return;

                const 消滅までの秒数 = 150; // 2分30秒 = 150秒

                const 燃焼タイマー = setInterval(() => {
                    setStats(prev => {
                        if (!prev.isBurning || prev.tempGems <= 0) return prev;

                        const 現在時刻 = Date.now();
                        const 経過秒数 = Math.floor((現在時刻 - prev.burnStartTime) / 1000);

                        // 残量 = 初期額 × (1 - 経過秒 / 150)
                        const 残りのダイヤ = Math.max(0, Math.floor(
                            prev.initialTempGems * (1 - 経過秒数 / 消滅までの秒数)
                        ));

                        if (残りのダイヤ === 0) {
                            AudioEngine.play([100, 80, 60, 40], 'sawtooth', 0.3, 0.3);
                            return {
                                ...prev,
                                tempGems: 0,
                                isBurning: false,
                                devLogs: [{ id: Date.now(), text: "💀 報酬が完全に燃え尽きました。朝の勝負に敗北。", colorClass: "text-red-600 font-black" }, ...prev.devLogs]
                            };
                        }

                        return { ...prev, tempGems: 残りのダイヤ };
                    });

                    AudioEngine.play([80, 100], 'sine', 0.05, 0.1);
                }, 1000);

                return () => clearInterval(燃焼タイマー);
            }, [stats.isBurning]);

            useEffect(() => {
                const h = () => { const m = window.innerWidth < 768; setIsMobile(m); if (!m) setIsSidebarOpen(true); };
                window.addEventListener('resize', h); return () => window.removeEventListener('resize', h);
            }, []);

            useEffect(() => {
                const handleClick = () => setContextMenu(null);
                window.addEventListener('click', handleClick);
                return () => window.removeEventListener('click', handleClick);
            }, []);


            // 🔐 認証状態の監視とFirestoreからのデータ読み込み
            useEffect(() => {
                if (!window.firebaseAuth) {
                    setAuthLoading(false);
                    return;
                }

                const unsubscribe = window.firebaseAuth.onAuthStateChanged(async (currentUser) => {
                    console.log('[Auth] Auth state changed:', currentUser?.email || 'Not logged in');
                    setUser(currentUser);

                    if (currentUser) {
                        // ログイン済み：Firestoreからデータを読み込む
                        try {
                            setSyncStatus('syncing');
                            const userDocRef = window.firebaseDB.collection('users').doc(currentUser.uid);
                            const docSnap = await userDocRef.get();

                            if (docSnap.exists) {
                                const cloudData = docSnap.data();
                                console.log('[Sync] Loaded data from Firestore');

                                // 🛡️ データ保護ロジック：タスク数で比較
                                const cloudTasks = cloudData.tasks || [];
                                const localTasks = tasks || [];
                                const cloudTaskCount = cloudTasks.length;
                                const localTaskCount = localTasks.length;

                                console.log(`[Sync] Cloud tasks: ${cloudTaskCount}, Local tasks: ${localTaskCount}`);

                                // データが多い方を優先（空のデータでの上書きを防止）
                                if (cloudTaskCount === 0 && localTaskCount > 0) {
                                    // クラウドが空で、ローカルにデータがある → ローカルをアップロード
                                    console.log('[Sync] Cloud is empty, uploading local data');
                                    await userDocRef.set({
                                        tasks: localTasks,
                                        stats,
                                        lastSync: Date.now(),
                                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                    }, { merge: true });
                                    localStorage.setItem('duo_v18_lastSync', Date.now().toString());
                                } else if (localTaskCount === 0 && cloudTaskCount > 0) {
                                    // ローカルが空で、クラウドにデータがある → クラウドを採用
                                    console.log('[Sync] Local is empty, using cloud data');
                                    setTasks(cloudTasks);
                                    if (cloudData.stats) setStats(cloudData.stats);
                                    localStorage.setItem('duo_v18_lastSync', (cloudData.lastSync || Date.now()).toString());
                                } else if (cloudTaskCount > localTaskCount) {
                                    // クラウドの方が多い → クラウドを採用
                                    console.log('[Sync] Cloud has more tasks, using cloud data');
                                    setTasks(cloudTasks);
                                    if (cloudData.stats) setStats(cloudData.stats);
                                    localStorage.setItem('duo_v18_lastSync', (cloudData.lastSync || Date.now()).toString());
                                } else if (localTaskCount > cloudTaskCount) {
                                    // ローカルの方が多い → ローカルをアップロード
                                    console.log('[Sync] Local has more tasks, uploading local data');
                                    await userDocRef.set({
                                        tasks: localTasks,
                                        stats,
                                        lastSync: Date.now(),
                                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                    }, { merge: true });
                                    localStorage.setItem('duo_v18_lastSync', Date.now().toString());
                                } else {
                                    // タスク数が同じ → タイムスタンプで比較
                                    const localTimestamp = parseInt(localStorage.getItem('duo_v18_lastSync') || '0');
                                    const cloudTimestamp = cloudData.lastSync || 0;

                                    if (cloudTimestamp > localTimestamp) {
                                        console.log('[Sync] Same task count, cloud is newer');
                                        setTasks(cloudTasks);
                                        if (cloudData.stats) setStats(cloudData.stats);
                                        localStorage.setItem('duo_v18_lastSync', cloudTimestamp.toString());
                                    } else {
                                        console.log('[Sync] Same task count, local is newer, uploading');
                                        await userDocRef.set({
                                            tasks: localTasks,
                                            stats,
                                            lastSync: Date.now(),
                                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                        }, { merge: true });
                                        localStorage.setItem('duo_v18_lastSync', Date.now().toString());
                                    }
                                }
                            } else {
                                // 初回ログイン：ローカルデータをアップロード（空でもOK）
                                console.log('[Sync] First login, uploading local data to Firestore');
                                await userDocRef.set({
                                    tasks,
                                    stats,
                                    lastSync: Date.now(),
                                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                });
                                localStorage.setItem('duo_v18_lastSync', Date.now().toString());
                            }

                            setSyncStatus('synced');
                        } catch (error) {
                            console.error('[Sync] Error loading from Firestore:', error);
                            setSyncStatus('error');
                        }
                    } else {
                        // ログアウト状態：ローカルデータのみ使用
                        console.log('[Auth] Not logged in, using local data only');
                    }

                    setAuthLoading(false);
                });

                return () => unsubscribe();
            }, []); // 初回のみ実行

            // 🔄 リアルタイム同期：他のデバイスからの変更を検知
            useEffect(() => {
                if (!user || !window.firebaseDB) return;

                console.log('[Realtime] Setting up realtime sync listener');
                const userDocRef = window.firebaseDB.collection('users').doc(user.uid);

                const unsubscribe = userDocRef.onSnapshot((docSnap) => {
                    if (!docSnap.exists) return;

                    const cloudData = docSnap.data();
                    const cloudTimestamp = cloudData.lastSync || 0;
                    const localTimestamp = parseInt(localStorage.getItem('duo_v18_lastSync') || '0');

                    // 🛡️ データ保護：タスク数とタイムスタンプを組み合わせて判断
                    const cloudTasks = cloudData.tasks || [];
                    const localTaskCount = tasks.length;
                    const cloudTaskCount = cloudTasks.length;
                    const taskCountDiff = Math.abs(cloudTaskCount - localTaskCount);

                    console.log(`[Realtime] Cloud tasks: ${cloudTaskCount}, Local tasks: ${localTaskCount}, Diff: ${taskCountDiff}, Cloud time: ${cloudTimestamp}, Local time: ${localTimestamp}`);

                    // クラウドのデータが新しい場合のみ更新（自分自身の変更は無視）
                    if (cloudTimestamp > localTimestamp) {
                        // 🛡️ ケース1: 一方が空の場合は特別扱い
                        if (cloudTaskCount === 0 && localTaskCount > 0) {
                            console.log('[Realtime] Ignoring empty cloud data (local has tasks)');
                            // 空のクラウドデータは無視し、ローカルをアップロード
                            userDocRef.set({
                                tasks: tasks,
                                stats: stats,
                                lastSync: Date.now(),
                                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                            }, { merge: true }).catch(err => console.error('[Realtime] Upload error:', err));
                        } else if (localTaskCount === 0 && cloudTaskCount > 0) {
                            console.log('[Realtime] Local is empty, using cloud data');
                            setTasks(cloudTasks);
                            if (cloudData.stats) setStats(cloudData.stats);
                            localStorage.setItem('duo_v18_lastSync', cloudTimestamp.toString());
                            setToastMessage('🔄 他のデバイスから同期されました');
                        }
                        // 🛡️ ケース2: タスク数の差が大きい（5個以上）場合は、多い方を優先
                        else if (taskCountDiff >= 5) {
                            if (cloudTaskCount > localTaskCount) {
                                console.log('[Realtime] Cloud has significantly more tasks, using cloud data');
                                setTasks(cloudTasks);
                                if (cloudData.stats) setStats(cloudData.stats);
                                localStorage.setItem('duo_v18_lastSync', cloudTimestamp.toString());
                                setToastMessage('🔄 他のデバイスから同期されました');
                            } else {
                                console.log('[Realtime] Local has significantly more tasks, ignoring cloud data');
                            }
                        }
                        // 🛡️ ケース3: タスク数の差が小さい（4個以内）→ タイムスタンプで判断
                        else {
                            console.log('[Realtime] Task count difference is small, using timestamp');
                            setTasks(cloudTasks);
                            if (cloudData.stats) setStats(cloudData.stats);
                            localStorage.setItem('duo_v18_lastSync', cloudTimestamp.toString());

                            // タスクの完了状態の変更など、通知は控えめに
                            if (taskCountDiff > 0) {
                                setToastMessage('🔄 他のデバイスから同期されました');
                            }
                        }
                    }
                }, (error) => {
                    console.error('[Realtime] Error in realtime listener:', error);
                    setSyncStatus('error');
                });

                return () => {
                    console.log('[Realtime] Cleaning up realtime sync listener');
                    unsubscribe();
                };
            }, [user, tasks, stats]);


            // 💾 ローカルストレージとFirestoreへの保存
            useEffect(() => {
                // ローカルストレージに保存
                localStorage.setItem('duo_v18_tasks', JSON.stringify(tasks));
                localStorage.setItem('duo_v18_stats', JSON.stringify(stats));

                // ログイン済みの場合はFirestoreにも保存
                if (user && window.firebaseDB && !authLoading) {
                    const saveToFirestore = async () => {
                        try {
                            setSyncStatus('syncing');
                            const userDocRef = window.firebaseDB.collection('users').doc(user.uid);
                            const timestamp = Date.now();

                            await userDocRef.set({
                                tasks,
                                stats,
                                lastSync: timestamp,
                                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                            }, { merge: true });

                            localStorage.setItem('duo_v18_lastSync', timestamp.toString());
                            setSyncStatus('synced');
                            console.log('[Sync] Saved to Firestore');
                        } catch (error) {
                            console.error('[Sync] Error saving to Firestore:', error);
                            setSyncStatus('error');
                        }
                    };

                    // デバウンス処理（連続した変更を5秒後にまとめて保存）
                    const timeoutId = setTimeout(saveToFirestore, 5000);
                    return () => clearTimeout(timeoutId);
                }
            }, [tasks, stats, user, authLoading]);



            // 🔥 ストリーク警告チェック（毎分チェック）
            useEffect(() => {
                const checkStreakDanger = () => {
                    if (!stats.lastDate || stats.streakBroken || stats.streak === 0) return;

                    const now = new Date();
                    const lastActivity = new Date(stats.lastDate + 'T03:00:00'); // 3AM reset
                    const nextReset = new Date(lastActivity);
                    nextReset.setDate(nextReset.getDate() + 1);

                    const msUntilReset = nextReset.getTime() - now.getTime();
                    const hoursUntilReset = msUntilReset / (1000 * 60 * 60);

                    // 残り1時間以下で警告
                    if (hoursUntilReset <= 1 && hoursUntilReset > 0) {
                        setShowStreakWarning(true);
                        console.log('[Streak Warning] Only', Math.ceil(hoursUntilReset * 60), 'minutes left!');
                    } else {
                        setShowStreakWarning(false);
                    }
                };

                checkStreakDanger();
                const interval = setInterval(checkStreakDanger, 60000); // 1分ごと
                return () => clearInterval(interval);
            }, [stats.lastDate, stats.streakBroken, stats.streak]);


            useEffect(() => {
                const today = getAdjustedToday();
                // Dev's Oath Check
                if (stats.devOathActive && stats.lastDate !== today) {
                    // Logic for oath check would go here
                }

                if (stats.lastDate && stats.lastDate !== today) {
                    const last = new Date(stats.lastDate); const curr = new Date(today);
                    const diff = (curr - last) / (1000 * 60 * 60 * 24);
                    if (diff > 1 && stats.streak > 0 && !stats.streakBroken) {
                        if (stats.streakFreeze > 0) {
                            setStats(s => ({ ...s, streakFreeze: s.streakFreeze - 1, lastDate: today }));
                            setToastMessage("フリーズ発動！Streakは守られました❄️");
                        } else {
                            setStats(s => ({ ...s, streakBroken: true, savedStreak: s.streak, streak: 0 }));
                        }
                    }
                }
            }, []);

            // Antigravity Integration - Auto-create tasks from URL parameters
            useEffect(() => {
                const params = new URLSearchParams(window.location.search);

                // Support multiple task parameters: ?task=A&task=B&task=C
                // Also split each parameter by semicolons or pipes: ?task=A;B||C
                const taskParams = params.getAll('task')
                    .flatMap(t => t.split(/[;|]+/).map(s => s.trim()).filter(s => s));

                // Support comma-separated tasks: ?tasks=A,B,C
                // Also split by semicolons or pipes: ?tasks=A,B;C||D
                const tasksParam = params.get('tasks');
                const tasksFromComma = tasksParam
                    ? tasksParam.split(/[,;|]+/).map(t => t.trim()).filter(t => t)
                    : [];

                // Combine all tasks
                const allTasks = [...taskParams, ...tasksFromComma];

                if (allTasks.length > 0) {
                    const newTasks = [];
                    let addedCount = 0;
                    let skippedCount = 0;

                    allTasks.forEach((taskTitle, index) => {
                        // Check if task already exists to avoid duplicates
                        const taskExists = tasks.some(t => t.title === taskTitle);

                        if (!taskExists) {
                            const newTask = {
                                id: (Date.now() + index).toString(),
                                title: taskTitle,
                                completed: false,
                                listId: activeListId,
                                createdAt: Date.now() + index,
                                isSectionHead: tasks.length === 0 && newTasks.length === 0
                            };
                            newTasks.push(newTask);
                            addedCount++;
                        } else {
                            skippedCount++;
                        }
                    });

                    if (newTasks.length > 0) {
                        setTasks(prevTasks => [...prevTasks, ...newTasks]);
                        setStats(s => ({ ...s, tasksCreated: s.tasksCreated + newTasks.length }));

                        if (newTasks.length === 1) {
                            setToastMessage(`✨ Task added from Antigravity: ${newTasks[0].title}`);
                        } else {
                            setToastMessage(`✨ ${newTasks.length} tasks added from Antigravity`);
                        }
                    }

                    if (skippedCount > 0 && addedCount === 0) {
                        setToastMessage(`⚠️ All tasks already exist (${skippedCount} skipped)`);
                    }

                    // Clear URL parameters to avoid re-adding on refresh
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            }, []);

            useEffect(() => {
                let timer = null;
                if (timerState.active && timerState.time > 0) {
                    timer = setInterval(() => setTimerState(s => ({ ...s, time: s.time - 1 })), 1000);
                } else if (timerState.time === 0 && timerState.active) {
                    // 休憩タイマー終了：リセットして停止
                    setTimerState({ active: false, mode: 'break', time: 10 * 60 });
                    AudioEngine.play([880, 440], 'sine', 0.15, 0.2);
                    setToastMessage("🎉 休憩終了！さあタスクに戻りましょう");
                }
                return () => clearInterval(timer);
            }, [timerState.active, timerState.time]);

            const resetBreakTimer = () => {
                setTimerState({ active: false, mode: 'break', time: 10 * 60 });
            };

            // 🔐 認証関数
            const handleGoogleLogin = async () => {
                try {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    await window.firebaseAuth.signInWithPopup(provider);
                    setShowAuthModal(false);
                    setToastMessage('✅ ログインしました');
                } catch (error) {
                    console.error('[Auth] Google login error:', error);
                    setToastMessage('❌ ログインに失敗しました');
                }
            };

            const handleEmailLogin = async (email, password) => {
                try {
                    await window.firebaseAuth.signInWithEmailAndPassword(email, password);
                    setShowAuthModal(false);
                    setToastMessage('✅ ログインしました');
                } catch (error) {
                    console.error('[Auth] Email login error:', error);
                    if (error.code === 'auth/user-not-found') {
                        // ユーザーが存在しない場合は新規作成
                        try {
                            await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
                            setShowAuthModal(false);
                            setToastMessage('✅ アカウントを作成しました');
                        } catch (createError) {
                            console.error('[Auth] Email signup error:', createError);
                            setToastMessage('❌ アカウント作成に失敗しました');
                        }
                    } else {
                        setToastMessage('❌ ログインに失敗しました');
                    }
                }
            };

            const handleLogout = async () => {
                try {
                    await window.firebaseAuth.signOut();
                    setToastMessage('✅ ログアウトしました');
                } catch (error) {
                    console.error('[Auth] Logout error:', error);
                    setToastMessage('❌ ログアウトに失敗しました');
                }
            };

            const resurrectStreak = () => {
                if (stats.resurrectionTickets > 0 && stats.streakBroken) {
                    setStats(s => ({
                        ...s,
                        streak: s.savedStreak,
                        streakBroken: false,
                        resurrectionTickets: s.resurrectionTickets - 1,
                        lastDate: getAdjustedToday()
                    }));
                    setToastMessage("Streak復活！🔥");
                    AudioEngine.play([523, 659, 784, 1046], 'sine', 0.2, 0.1);
                }
            };

            const handleContextMenu = (e, task) => {
                e.preventDefault();
                setContextMenu({ x: e.clientX, y: e.clientY, task });
            };

            const toggleSectionBreak = () => {
                if (!contextMenu) return;
                const currentIndex = tasks.findIndex(t => t.id === contextMenu.task.id);
                if (currentIndex === -1 || currentIndex === tasks.length - 1) return;

                const nextTask = tasks[currentIndex + 1];
                const isHead = nextTask.isSectionHead;

                // セクション区切りを設定/解除し、全タスクのsectionIdを再計算
                const updatedTasks = tasks.map((t, idx) =>
                    idx === currentIndex + 1 ? { ...t, isSectionHead: !isHead } : t
                );

                // sectionIdを再計算（完了済みタスクは変更しない）
                let sectionId = 1;
                const tasksWithSectionId = updatedTasks.map((t, idx) => {
                    if (t.completed) return t; // 完了済みはそのまま
                    if (idx > 0 && t.isSectionHead) sectionId++;
                    return { ...t, sectionId };
                });

                setTasks(tasksWithSectionId);
                setContextMenu(null);
            };

            // MVP Scrutinizer: パージ機能
            const purgeTask = () => {
                if (!contextMenu) return;
                const taskToPurge = contextMenu.task;

                // タスクを末尾へ移動
                const newTasks = tasks.filter(t => t.id !== taskToPurge.id);
                newTasks.push(taskToPurge);

                setTasks(newTasks);
                setContextMenu(null);

                // パージ報酬: MVP最適化行動なので高報酬
                const purgeReward = 25;
                setStats(s => ({
                    ...s,
                    gems: s.gems + purgeReward,
                    tasksPurged: s.tasksPurged + 1
                }));

                setToastMessage(`✨ MVP最適化！+${purgeReward}💎`);
                AudioEngine.play([400, 600, 800], 'sine', 0.15, 0.08);
            };

            const checkSectionCompletion = (completedTaskId) => {
                let sectionTasks = [];
                let currentSection = [];

                for (let i = 0; i < tasks.length; i++) {
                    const t = tasks[i];
                    if (i > 0 && t.isSectionHead) {
                        if (currentSection.length > 0) sectionTasks.push(currentSection);
                        currentSection = [];
                    }
                    currentSection.push(t);
                }
                if (currentSection.length > 0) sectionTasks.push(currentSection);

                const targetSection = sectionTasks.find(section => section.some(t => t.id === completedTaskId));

                if (targetSection) {
                    const allCompleted = targetSection.every(t => t.id === completedTaskId || t.completed);
                    if (allCompleted) {
                        return true;
                    }
                }
                return false;
            };

            const handleXpGain = (task, rect, setConfettiType, manualXp = 0) => {
                const today = getAdjustedToday();
                const now = new Date();
                const currentHour = now.getHours();

                // Section 1判定
                let section1Tasks = [];
                for (let t of tasks) {
                    if (section1Tasks.length > 0 && t.isSectionHead) break;
                    section1Tasks.push(t);
                }
                const isSection1Task = section1Tasks.some(t => t.id === task.id);

                // 1. Determine Reward Type & Amount
                let rewardAmount = 2; // Default: Focus (Normal)
                let rewardType = 'normal'; // normal, velocity, morning, milestone, mvpSprint
                let logText = "";

                // Milestone (100💎): Section 1 Complete - 最高報酬
                const isSectionComplete = checkSectionCompletion(task.id);
                if (isSectionComplete && isSection1Task) {
                    rewardAmount = 100;
                    rewardType = 'milestone';
                    logText = "[🚀 MVP SPRINT] Section 1クリア！MVP機能が完成しました。";
                } else if (isSectionComplete) {
                    rewardAmount = 50;
                    rewardType = 'milestone';
                    logText = "[Milestone] Section クリア。";
                }

                // Morning Ignition (30💎): Before 13PM & First Task
                const isFirstTaskToday = stats.lastDate !== today;
                if (currentHour < 13 && isFirstTaskToday && rewardAmount < 30) {
                    rewardAmount = 30;
                    rewardType = 'morning';
                    logText = `[Early Bird] 朝の着火成功。${task.title} を完了。`;
                }

                // High Velocity (20💎 for Section 1, 15💎 for others)
                const isFlowActive = Date.now() < stats.flowCapacitorEndTime;

                if (isFlowActive && rewardAmount < 15) {
                    rewardAmount = isSection1Task ? 20 : 15;
                    rewardType = 'velocity';
                    logText = isSection1Task
                        ? `[⚡ MVP Focus] ${task.title} を最速で完遂。リリースが近づいています。`
                        : `[High Velocity] ${task.title} を最短工数で完遂しました。`;
                }

                // MVP Task Bonus: Section 1のタスクは基礎報酬増加
                if (isSection1Task && rewardAmount < 10) {
                    rewardAmount = 10;
                    rewardType = 'mvpFocus';
                    logText = `[MVP Task] ${task.title} 完了。MVP開発を前進させました。`;
                }

                // Normal log if not specified
                if (!logText) {
                    logText = `[Focus] ${task.title} 完了。`;
                }

                let wagerBonus = 0;
                let wagerComplete = false;

                // Progress Bar Shimmer & Bounce
                setLevelGlow(true);
                setProgressBounce(true);
                setTimeout(() => setLevelGlow(false), 500);
                setTimeout(() => setProgressBounce(false), 500);

                setProgressGlow(true);
                setTimeout(() => setProgressGlow(false), 700);

                // Confetti & Floating Text Setup
                if (setConfettiType) {
                    // Always show small sparks (ignition) for normal
                    // Show performance confetti for higher rewards
                    if (rewardAmount >= 15) {
                        setConfettiType('performance');
                        AudioEngine.play([440, 554, 659, 880], 'square', 0.2, 0.1);
                    } else {
                        setConfettiType('ignition');
                    }
                }

                setStats(prev => {
                    const isFirstTaskToday = prev.lastDate !== today;
                    if (isFirstTaskToday) {
                        setShowIgnition(true);
                        setTimeout(() => setShowIgnition(false), 2000);
                        AudioEngine.play([100, 150, 200, 300, 500], 'sawtooth', 0.2, 0.1);
                    }

                    // Dev's Oath Success
                    let oathBonus = 0;
                    if (isFirstTaskToday && prev.devOathActive) {
                        oathBonus = 100;
                        setToastMessage("Dev's Oath 達成！100💎返還！");
                    }

                    // XP加算削除
                    let newXp = prev.xp;
                    let newLevel = prev.level;
                    let newStreak = prev.streak;
                    let newWager = { ...prev.wager };
                    let newGems = prev.gems + rewardAmount; // Use calculated reward

                    if (isFirstTaskToday) {
                        if (!prev.lastDate) {
                            newStreak = 1;
                        } else {
                            const last = new Date(prev.lastDate); const curr = new Date(today);
                            const diff = (curr - last) / (1000 * 60 * 60 * 24);

                            if (diff <= 1) {
                                newStreak++;
                            } else {
                                newStreak = 1;
                            }
                        }
                    }

                    // Wager Logic (Simplified: Active & Flow = Win)
                    if (prev.wager.active && isFlowActive) {
                        wagerBonus = 100;
                        wagerComplete = true;
                        newWager = { active: false };
                    }

                    if (wagerBonus > 0) newGems += wagerBonus;
                    if (oathBonus > 0) newGems += oathBonus;

                    if (wagerComplete) setToastMessage("倍か無か達成！100💎獲得！");

                    // Floating Text Style Logic
                    let floatColor = "text-slate-400 text-sm";
                    let floatScale = "scale-100";
                    let floatText = `+${rewardAmount}💎`;

                    if (rewardAmount >= 100) {
                        floatColor = "text-yellow-400 font-black";
                        floatScale = "scale-[2] animate-bounce-hard";
                        floatText = `🚀 +${rewardAmount}💎`;
                    } else if (rewardAmount >= 50) {
                        floatColor = "text-fuchsia-500 font-black";
                        floatScale = "scale-150 animate-bounce-hard";
                    } else if (rewardAmount >= 30) {
                        floatColor = "text-amber-500 font-bold";
                        floatScale = "scale-125";
                    } else if (rewardAmount >= 15) {
                        floatColor = "text-cyan-400 font-bold";
                        floatScale = "scale-110";
                    } else if (rewardAmount >= 10) {
                        floatColor = "text-blue-400 font-bold";
                        floatScale = "scale-105";
                    }

                    // Log Logic
                    let newLogs = prev.devLogs || [];
                    // Log Color based on reward type for display logic later
                    let logColorClass = "text-gray-600";
                    if (rewardType === 'milestone') logColorClass = "text-yellow-600 font-black";
                    else if (rewardType === 'morning') logColorClass = "text-amber-600 font-bold";
                    else if (rewardType === 'velocity') logColorClass = "text-cyan-600 font-bold";
                    else if (rewardType === 'mvpFocus') logColorClass = "text-blue-600 font-bold";

                    // Prepend timestamp to text for simple display or store structure
                    const logEntry = {
                        id: Date.now(),
                        text: logText,
                        date: new Date().toLocaleTimeString(),
                        colorClass: logColorClass
                    };
                    newLogs = [logEntry, ...newLogs].slice(0, 20);

                    // Add Floating Text
                    if (rect) {
                        const id = Date.now();
                        setFloatingTexts(prev => [...prev, { id, x: rect.left + 50, y: rect.top - 20, text: floatText, color: floatColor, scale: floatScale }]);
                        setTimeout(() => setFloatingTexts(prev => prev.filter(t => t.id !== id)), 1000);
                    }

                    return {
                        ...prev, xp: newXp, level: newLevel, gems: newGems, streak: newStreak, lastDate: today,
                        wager: newWager,
                        streakBroken: false,
                        devLogs: newLogs,
                        devOathActive: oathBonus > 0 ? false : prev.devOathActive
                    };
                });
            };

            const buyItem = (cost, action) => {
                if (stats.gems < cost) {
                    setToastMessage("ジェムが足りません！💎");
                    AudioEngine.play([150, 100], 'sawtooth', 0.1, 0.1);
                    return;
                }
                setStats(prev => ({ ...prev, gems: prev.gems - cost }));
                action();
                AudioEngine.play([783, 1046], 'sine', 0.1, 0.1);
            };


            const unlockTheme = (themeName, cost) => {
                if (stats.themes.includes(themeName)) {
                    setStats(s => ({ ...s, currentTheme: themeName }));
                    setToastMessage("テーマを変更しました🎨");
                } else {
                    buyItem(cost, () => {
                        setStats(s => ({ ...s, themes: [...s.themes, themeName], currentTheme: themeName }));
                        setToastMessage("新テーマ獲得！✨");
                    });
                }
            };

            const updateTask = (id, updates) => setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));

            // タスクの並び替え機能
            // ドラッグ&ドロップ関数
            const handleDragStart = (e, task) => {
                setDraggedTaskId(task.id);
                e.dataTransfer.effectAllowed = 'move';
            };

            const handleDragOver = (e, task) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                setDragOverTaskId(task.id);
            };

            const handleDrop = (e, dropTask) => {
                e.preventDefault();

                if (!draggedTaskId || draggedTaskId === dropTask.id) {
                    setDraggedTaskId(null);
                    setDragOverTaskId(null);
                    return;
                }

                const draggedIndex = tasks.findIndex(t => t.id === draggedTaskId);
                const dropIndex = tasks.findIndex(t => t.id === dropTask.id);

                if (draggedIndex === -1 || dropIndex === -1) {
                    setDraggedTaskId(null);
                    setDragOverTaskId(null);
                    return;
                }

                const newTasks = [...tasks];
                const [draggedTask] = newTasks.splice(draggedIndex, 1);
                newTasks.splice(dropIndex, 0, draggedTask);

                // ドラッグ&ドロップ後にsectionIdを再計算（完了済みタスクは変更しない）
                let sectionId = 1;
                const tasksWithSectionId = newTasks.map((t, idx) => {
                    if (t.completed) return t; // 完了済みはそのまま
                    if (idx > 0 && t.isSectionHead) sectionId++;
                    return { ...t, sectionId };
                });

                setTasks(tasksWithSectionId);
                setDraggedTaskId(null);
                setDragOverTaskId(null);
            };

            const handleDragEnd = () => {
                setDraggedTaskId(null);
                setDragOverTaskId(null);
            };

            const visibleTasks = tasks.filter(t => activeListId === 'default' ? !t.listId || t.listId === 'default' : t.listId === activeListId);
            const incomplete = visibleTasks.filter(t => !t.completed);
            const completed = visibleTasks.filter(t => t.completed);

            // ヘッダーMVP進捗バー用（全タスクベース）
            const allIncompleteTasks = tasks.filter(t => !t.completed);

            const totalTasks = tasks.length;
            const completedTasksCount = tasks.filter(t => t.completed).length;
            const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasksCount / totalTasks) * 100);
            const nextCompletionRate = totalTasks === 0 ? 0 : Math.round(((completedTasksCount + 1) / totalTasks) * 100);
            const progressDelta = nextCompletionRate - completionRate;

            // Calculate Section 1 completion for Rocket Pulse
            let section1Tasks = [];
            for (let t of tasks) {
                if (section1Tasks.length > 0 && t.isSectionHead) break;
                section1Tasks.push(t);
            }
            const section1Total = section1Tasks.length;
            const section1Completed = section1Tasks.filter(t => t.completed).length;
            const section1Rate = section1Total === 0 ? 0 : section1Completed / section1Total;
            // Pulse speed depends on rate. 0.2s (fast) to 2s (slow)
            const pulseDuration = section1Rate > 0 ? Math.max(0.2, 2 - (section1Rate * 1.8)) + 's' : '0s';


            const btn3DClass = "transition-all active:translate-y-[4px] active:border-b-0 border-b-[4px] hover:scale-105 active:scale-95 duration-150";

            const isStreakActive = stats.lastDate === getAdjustedToday();

            let sectionCounter = 0;

            // Helper to determine if a task is the last in its section (of incomplete tasks)
            const isLastTaskInSection = (index) => {
                const nextTask = incomplete[index + 1];
                return !nextTask || nextTask.isSectionHead;
            };

            return (
                <div className="flex h-screen w-full bg-white overflow-hidden relative selection:bg-duo-green/20 font-bold text-duo-text">

                    {/* Header */}
                    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-gray-100 z-[100] flex items-center justify-between px-6">
                        {/* Left: Menu Button */}
                        <div className="flex-shrink-0 z-20">
                            <IconButton icon={Icons.Menu} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                        </div>

                        {/* Center: Project Progress Bar (MVP Progress) */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] px-4 hidden md:block">
                            <div className={`relative h-8 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200 shadow-inner ${levelGlow ? 'animate-pulse' : ''}`}>
                                {/* 現在の進捗（グレー系・控えめ） */}
                                <div className={`h-full bg-gradient-to-r from-slate-300 to-slate-400 relative ${levelGlow ? 'progress-glow brightness-125' : ''}`} style={{
                                    width: `${completionRate}%`,
                                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}>
                                    <div className="absolute inset-0 bg-white/10" style={{ backgroundSize: '200% 100%' }} />
                                </div>

                                {/* 次タスク完了時の進捗予告（控えめなストライプ） */}
                                {allIncompleteTasks.length > 0 && (
                                    <div
                                        className="absolute top-0 h-full"
                                        style={{
                                            left: `${completionRate}%`,
                                            width: `${progressDelta}%`,
                                            background: 'repeating-linear-gradient(45deg, rgba(148, 163, 184, 0.5), rgba(148, 163, 184, 0.5) 8px, rgba(100, 116, 139, 0.5) 8px, rgba(100, 116, 139, 0.5) 16px)',
                                            transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, width 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                                            animation: completionRate >= 90 ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
                                        }}
                                    />
                                )}

                                <div className={`absolute inset-0 flex items-center justify-center gap-2 z-10 transition-transform ${progressBounce ? 'scale-110' : ''}`}>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-40" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.8)' }}>MVP Progress</span>
                                    <span className={`text-xs font-black ${progressBounce ? 'text-slate-700' : 'text-slate-600'}`} style={{ textShadow: '0 1px 0 rgba(255,255,255,0.6)' }}>
                                        {completionRate >= 70 ? `残り${100 - completionRate}%` : `${completionRate}%`}
                                    </span>
                                </div>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg z-20" style={{ animation: section1Rate > 0 && section1Rate < 1 ? `pulse ${pulseDuration} cubic-bezier(0.4, 0, 0.6, 1) infinite` : 'none', color: section1Rate > 0.8 ? '#ef4444' : 'currentColor', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }}>🚀</div>
                            </div>
                        </div>

                        {/* Right: Reward Units (Streak & Gem) */}
                        <div className="flex items-center gap-2 z-20">
                            {/* 📈 成長グラフボタン */}
                            <button onClick={() => { setActiveListId(activeListId === 'growthGraph' ? 'default' : 'growthGraph'); if (isMobile) setIsSidebarOpen(false); }} className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors font-bold text-xl ${activeListId === 'growthGraph' ? 'bg-blue-100 text-blue-500' : 'bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-blue-500'}`}>
                                📈
                            </button>

                            {/* Streak Unit */}
                            <div className="relative">
                                <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all group ${isStreakActive ? 'hover:bg-gray-50' : ''}`}>
                                    <Icons.Flame
                                        size={26}
                                        fill="currentColor"
                                        className={`transition-colors duration-500 ${!stats.streakBroken && isStreakActive ? "text-duo-orange" : "text-[#e5e5e5]"}`}
                                    />
                                    <span className={`text-lg font-black transition-colors duration-500 ${!stats.streakBroken && isStreakActive ? "text-duo-orange" : "text-[#e5e5e5]"}`}>
                                        {stats.streakBroken ? 0 : stats.streak}
                                    </span>
                                </button>
                                {stats.streakBroken && stats.resurrectionTickets > 0 && (
                                    <button onClick={resurrectStreak} className={`absolute -bottom-8 left-1/2 -translate-x-1/2 bg-duo-blue text-white text-xs font-black px-3 py-1 rounded-xl whitespace-nowrap animate-bounce border-b-4 border-duo-blueBorder ${btn3DClass} z-50`}>
                                        復活！
                                    </button>
                                )}
                            </div>

                            {/* Gem Unit */}
                            <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all group ${isStreakActive ? 'hover:bg-gray-50' : ''}`}>
                                <Icons.Gem
                                    size={26}
                                    fill="currentColor"
                                    className={`transition-transform duration-500 ${!stats.streakBroken && isStreakActive ? "text-cyan-400" : "text-[#e5e5e5]"}`}
                                />
                                <span className={`text-lg font-black transition-colors duration-500 ${!stats.streakBroken && isStreakActive ? "text-cyan-400" : "text-[#e5e5e5]"}`}>
                                    {stats.gems}
                                </span>
                            </button>

                            {/* Morning Burn Counter */}
                            {stats.isBurning && stats.tempGems > 0 && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-2xl animate-pulse shadow-lg">
                                    <span className="text-lg">🔥</span>
                                    <span className="text-lg font-black">{stats.tempGems}💎</span>
                                    <span className="text-xs font-bold">燃焼中</span>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* 🎰 天井ステータスバー */}
                    {(stats.pityCounter >= 3 || stats.feverEndTime > Date.now()) && (
                        <div className="fixed top-16 left-0 right-0 z-[70] px-4 py-2 flex justify-center gap-3 pointer-events-none">
                            {/* 天井カウンター（3回以上のスカで表示） */}
                            {stats.pityCounter >= 3 && (
                                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-2xl shadow-lg animate-pulse pointer-events-auto">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">⚡</span>
                                        <div>
                                            <div className="text-xs font-bold opacity-80">天井まで</div>
                                            <div className="text-lg font-black">{8 - stats.pityCounter}回</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* フィーバーモード表示 */}
                            {stats.feverEndTime > Date.now() && (
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-2xl shadow-lg animate-pulse pointer-events-auto">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🔥</span>
                                        <div>
                                            <div className="text-xs font-bold opacity-80">FEVER</div>
                                            <div className="text-lg font-black">確率2倍</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Sidebar */}
                    {isMobile && isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-[80] backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}
                    <aside className={`fixed inset-y-0 left-0 transform transition-all duration-300 z-[90] w-72 bg-white border-r-2 border-duo-gray pt-20 flex flex-col ${isSidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}`}>
                        {/* Streak Section */}
                        <div className="p-4 mb-2">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">今日の記録</h3>
                            <div className={`flex items-center gap-4 p-3 rounded-2xl border-2 transition-colors duration-500 ${isStreakActive ? 'bg-orange-50 border-orange-100' : 'bg-gray-50 border-gray-200'}`}>
                                <div className="relative group cursor-pointer transition-transform hover:scale-110">
                                    <Icons.Flame size={32} className={`transition-colors duration-1000 ${isStreakActive ? "text-duo-orange" : "text-gray-300"}`} fill="currentColor" />
                                    {stats.streakBroken && stats.resurrectionTickets > 0 && (
                                        <button onClick={resurrectStreak} className="absolute -bottom-2 -right-4 bg-duo-blue text-white text-[10px] font-black px-2 py-0.5 rounded-lg whitespace-nowrap animate-bounce shadow-sm">
                                            復活！
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <div className={`text-xl font-black transition-colors duration-1000 ${isStreakActive ? "text-duo-orange" : "text-gray-400"}`}>
                                        {stats.streakBroken ? 0 : stats.streak}日連続
                                    </div>
                                    <div className="text-xs text-gray-400 font-bold">{isStreakActive ? "Keep it burning!" : "タスク完了で着火！"}</div>
                                </div>
                            </div>
                        </div>

                        {/* 休憩タイマー (Moved to Sidebar) */}
                        <div className="px-4 mb-6">
                            <div className="w-full bg-white border-2 border-gray-200 border-b-4 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all">
                                <div className="text-xs font-bold text-gray-500 mb-2 text-center">☕ 休憩タイマー (10分)</div>
                                <div className="flex items-center justify-between gap-3">
                                    <button onClick={() => setTimerState(s => ({ ...s, active: !s.active }))}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${btn3DClass} ${timerState.active ? 'bg-gray-100 text-gray-400 border-gray-300' : 'bg-duo-green text-white border-green-600'}`}>
                                        {timerState.active ? <Icons.Pause size={20} fill="currentColor" /> : <Icons.Play size={20} fill="currentColor" className="ml-0.5" />}
                                    </button>
                                    <div className="flex-1 text-center text-2xl font-black font-mono tracking-tight text-duo-text">
                                        {Math.floor(timerState.time / 60)}:{(timerState.time % 60).toString().padStart(2, '0')}
                                    </div>
                                    <button onClick={resetBreakTimer}
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${btn3DClass} bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200`}
                                        title="リセット">
                                        <Icons.RotateCcw size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6 border-t-2 border-duo-gray">
                            <div className="space-y-3">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Lists</h3>
                                <button className={`w-full p-4 flex items-center gap-4 rounded-2xl font-black ${btn3DClass} ${activeListId === 'default' ? 'bg-duo-blue/10 text-duo-blue border-duo-blue/20' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-500'}`} onClick={() => { setActiveListId('default'); if (isMobile) setIsSidebarOpen(false); }}><Icons.Check size={24} />マイタスク</button>
                                <button className={`w-full p-4 flex items-center gap-4 rounded-2xl font-black ${btn3DClass} ${activeListId === 'deadline' ? 'bg-duo-pink/10 text-duo-pink border-duo-pink/20' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-500'}`} onClick={() => { setActiveListId('deadline'); if (isMobile) setIsSidebarOpen(false); }}><Icons.Calendar size={24} />締切リスト</button>
                                <button className={`w-full p-4 flex items-center gap-4 rounded-2xl font-black ${btn3DClass} ${activeListId === 'growthGraph' ? 'bg-green-100 text-green-600 border-green-200' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-500'}`} onClick={() => { setActiveListId('growthGraph'); if (isMobile) setIsSidebarOpen(false); }}>📈 成長グラフ</button>
                            </div>

                            {/* MVP Stats */}
                            <div className="mb-4">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-2">MVP開発指標</h3>
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-600">🎯 作成タスク数</span>
                                        <span className="text-sm font-black text-blue-600">{stats.tasksCreated || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-600">✨ 最適化回数</span>
                                        <span className="text-sm font-black text-purple-600">{stats.tasksPurged || 0}</span>
                                    </div>
                                    <div className="mt-3 pt-2 border-t border-blue-200">
                                        <div className="text-[10px] font-bold text-gray-500 text-center">
                                            {stats.tasksPurged >= 3 ? "🏆 マスター級の最適化！" : stats.tasksPurged >= 1 ? "👍 MVP思考が身についています" : "💡 不要なタスクはパージしよう"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dev Log Moved Here (Above Gem Shop) */}
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-2">開発ログ</h3>
                                <div className="bg-white rounded-xl p-4 border-2 border-gray-200 h-56 overflow-y-auto space-y-3">
                                    {stats.devLogs && stats.devLogs.length > 0 ? (
                                        stats.devLogs.map((log, i) => (
                                            <div key={log.id} className={`text-xs font-medium leading-relaxed border-l-4 border-l-gray-300 pl-3 py-2 ${i === 0 ? 'animate-log-fade bg-blue-50' : 'bg-gray-50'} rounded-r ${log.colorClass}`}>
                                                <span className="text-gray-500 block mb-1 font-bold text-[11px]">{log.date}</span>
                                                <span className="block">{log.text}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-xs text-gray-500 text-center py-6 font-medium">ログがまだありません</div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 border-t-2 border-duo-gray/50 pb-20">
                                <button onClick={() => setIsShopOpen(!isShopOpen)} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-black text-gray-500 bg-white border-2 border-transparent hover:bg-gray-50 ${isShopOpen ? 'text-duo-text' : ''} ${juicyBtnClass}`}>
                                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest"><Icons.ShoppingBag size={18} /> Gem Shop</div>
                                    {isShopOpen ? <Icons.ChevronDown size={18} /> : <Icons.ChevronRight size={18} />}
                                </button>
                                {isShopOpen && (
                                    <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-1 pb-20 px-1">
                                        <div className={`p-3 border-2 border-gray-200 border-b-4 rounded-2xl flex justify-between items-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all bg-white hover:scale-105 active:scale-95`} onClick={() => buyItem(200, () => setStats(s => ({ ...s, streakFreeze: s.streakFreeze + 1 })))}>
                                            <div className="text-left"><div className="font-black text-sm text-duo-blue flex items-center gap-1"><Icons.Snowflake size={16} /> 連続フリーズ ({stats.streakFreeze})</div><div className="text-[10px] text-gray-400 font-bold">Streakを1日守る</div></div>
                                            <div className="text-duo-pink font-black text-sm">200💎</div>
                                        </div>

                                        {/* MVP Scrutinizer */}
                                        <div className={`p-3 border-2 border-gray-200 border-b-4 rounded-2xl flex justify-between items-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all hover:scale-105 active:scale-95 ${stats.mvpScrutinizerActive ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}
                                            onClick={() => !stats.mvpScrutinizerActive && buyItem(100, () => setStats(s => ({ ...s, mvpScrutinizerActive: true })))}>
                                            <div className="text-left">
                                                <div className="font-black text-sm text-duo-blue flex items-center gap-1"><Icons.Search size={16} /> MVP Scrutinizer</div>
                                                <div className="text-[10px] text-gray-400 font-bold">右クリックでタスクをパージ</div>
                                            </div>
                                            {!stats.mvpScrutinizerActive ? <div className="text-duo-pink font-black text-sm">100💎</div> : <div className="text-[10px] font-black text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">ON</div>}
                                        </div>

                                        {/* Dev's Oath */}
                                        <div className={`p-3 border-2 border-gray-200 border-b-4 rounded-2xl flex justify-between items-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all hover:scale-105 active:scale-95 ${stats.devOathActive ? 'bg-purple-50 border-purple-200' : 'bg-white'}`}
                                            onClick={() => !stats.devOathActive && buyItem(50, () => setStats(s => ({ ...s, devOathActive: true })))}>
                                            <div className="text-left">
                                                <div className="font-black text-sm text-purple-600 flex items-center gap-1"><Icons.Shield size={16} /> Dev's Oath</div>
                                                <div className="text-[10px] text-gray-400 font-bold">明日のタスク完了を誓う</div>
                                            </div>
                                            {!stats.devOathActive ? <div className="text-duo-pink font-black text-sm">50💎</div> : <div className="text-[10px] font-black text-purple-600 bg-purple-100 px-2 py-1 rounded-lg">誓約済</div>}
                                        </div>

                                        {/* Flow Capacitor */}
                                        <div className={`p-3 border-2 border-gray-200 border-b-4 rounded-2xl flex justify-between items-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all hover:scale-105 active:scale-95 ${Date.now() < stats.flowCapacitorEndTime ? 'bg-yellow-50 border-yellow-200' : 'bg-white'}`}
                                            onClick={() => Date.now() > stats.flowCapacitorEndTime && buyItem(150, () => setStats(s => ({ ...s, flowCapacitorEndTime: Date.now() + 15 * 60 * 1000 })))}>
                                            <div className="text-left">
                                                <div className="font-black text-sm text-yellow-600 flex items-center gap-1"><Icons.Zap size={16} /> Flow Capacitor</div>
                                                <div className="text-[10px] text-gray-400 font-bold">15分間、演出確率100%</div>
                                            </div>
                                            {Date.now() > stats.flowCapacitorEndTime ? <div className="text-duo-pink font-black text-sm">150💎</div> : <div className="text-[10px] font-black text-yellow-600 bg-yellow-100 px-2 py-1 rounded-lg">Active</div>}
                                        </div>

                                        <div className="p-3 border-2 border-gray-200 border-b-4 rounded-2xl flex justify-between items-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all bg-white hover:scale-105 active:scale-95" onClick={() => buyItem(150, () => setStats(s => ({ ...s, resurrectionTickets: s.resurrectionTickets + 1 })))}>
                                            <div className="text-left"><div className="font-black text-sm text-gray-600 flex items-center gap-1"><Icons.Ticket size={16} /> 蘇生チケット ({stats.resurrectionTickets})</div><div className="text-[10px] text-gray-400 font-bold">Streak切れを復活</div></div>
                                            <div className="text-duo-pink font-black text-sm">150💎</div>
                                        </div>

                                        <div className="mt-4 text-[10px] font-black text-gray-400 px-2 uppercase tracking-widest">THEMES</div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className={`p-3 border-2 border-b-4 rounded-2xl text-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all hover:scale-105 active:scale-95 ${stats.currentTheme === 'cherry' ? 'border-pink-400 bg-pink-50' : 'border-gray-200 bg-white'}`} onClick={() => unlockTheme('cherry', 500)}>
                                                <Icons.Cherry size={24} className="mx-auto text-pink-400 mb-2" />
                                                <div className="text-[10px] font-bold text-gray-600">桜吹雪</div>
                                                {!stats.themes.includes('cherry') && <div className="text-duo-pink text-xs font-black mt-1">500💎</div>}
                                            </div>
                                            <div className={`p-3 border-2 border-b-4 rounded-2xl text-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all hover:scale-105 active:scale-95 ${stats.currentTheme === 'fireworks' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'}`} onClick={() => unlockTheme('fireworks', 500)}>
                                                <Icons.Sparkles size={24} className="mx-auto text-blue-400 mb-2" />
                                                <div className="text-[10px] font-bold text-gray-600">花火</div>
                                                {!stats.themes.includes('fireworks') && <div className="text-duo-pink text-xs font-black mt-1">500💎</div>}
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>

                            {/* 🔐 認証・同期セクション */}
                            {!authLoading && (
                                <div className="pt-6 border-t-2 border-duo-gray/50 pb-6">
                                    {user ? (
                                        <div className="px-4 space-y-3">
                                            {/* ユーザー情報 */}
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="font-bold">👤</span>
                                                <span className="font-medium truncate">{user.email}</span>
                                            </div>

                                            {/* 同期状態 */}
                                            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold ${syncStatus === 'synced' ? 'bg-green-50 text-green-600' :
                                                syncStatus === 'syncing' ? 'bg-blue-50 text-blue-600' :
                                                    'bg-red-50 text-red-600'
                                                }`}>
                                                <span>
                                                    {syncStatus === 'synced' && '✓ 同期完了'}
                                                    {syncStatus === 'syncing' && '⟳ 同期中...'}
                                                    {syncStatus === 'error' && '! 同期エラー'}
                                                </span>
                                            </div>

                                            {/* ログアウトボタン */}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-600 transition-colors"
                                            >
                                                <span>ログアウト</span>
                                                <span>🚪</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="px-4">
                                            <button
                                                onClick={() => setShowAuthModal(true)}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-duo-blue hover:bg-duo-blueBorder text-white rounded-xl text-sm font-bold transition-colors border-b-4 border-duo-blueBorder active:border-b-2 active:translate-y-[2px]"
                                            >
                                                <span>🔐</span>
                                                <span>ログインして同期</span>
                                            </button>
                                            <p className="mt-2 text-[10px] text-gray-400 text-center">
                                                スマホとPCでデータを同期
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main Area */}
                    <main className={`flex-1 pt-20 transition-all duration-300 ${isSidebarOpen && !isMobile ? 'pl-72' : 'pl-0'}`}>
                        <div className="h-full overflow-y-auto px-6 md:px-20 lg:px-32 pb-40">
                            {/* 📈 成長グラフページ */}
                            {activeListId === 'growthGraph' ? (
                                <GrowthGraph
                                    history={stats.dailyCompletionHistory || {}}
                                    onClose={() => setActiveListId('default')}
                                />
                            ) : (
                                <div className="max-w-2xl mx-auto pt-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <h1 className="text-lg font-bold tracking-tight text-gray-500">{activeListId === 'default' ? 'マイタスク' : '締切リスト'}</h1>
                                        {notificationPermission !== 'granted' && (
                                            <button
                                                onClick={async () => {
                                                    if (window.requestNotificationPermission) {
                                                        await window.requestNotificationPermission();
                                                        // 許可状態を更新
                                                        if (typeof Notification !== 'undefined') {
                                                            setNotificationPermission(Notification.permission);
                                                        }
                                                    }
                                                }}
                                                className="ml-auto p-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors"
                                                title="通知を許可"
                                            >
                                                <Icons.Bell size={18} />
                                            </button>
                                        )}
                                    </div>

                                    {/* 崇高な意味：1%成長メッセージ */}
                                    <div className="mb-3 px-2">
                                        <p className="text-xs text-gray-500">
                                            {stats.streak > 0 ? (
                                                <>
                                                    <span className="text-green-600 font-bold">📈 Day {stats.streak}:</span>
                                                    {' '}<span className="font-bold text-gray-700">{Math.pow(1.01, stats.streak).toFixed(2)}倍</span>の自分。
                                                    あと<span className="text-blue-600 font-bold">{365 - stats.streak > 0 ? 365 - stats.streak : 0}日</span>で37倍。
                                                </>
                                            ) : (
                                                <>
                                                    📈 毎日1%の成長で、1年後<span className="font-bold text-green-600">37倍</span>。今日から始めよう。
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    {/* タスク入力エリア */}
                                    <div className={`mb-8 bg-gray-100 border-2 border-gray-200 rounded-xl p-1 shadow-sm ${btn3DClass} focus-within:translate-y-[4px] focus-within:border-b-0`}>
                                        <div className="w-full h-full flex items-center px-3 py-2 gap-2">
                                            <Icons.Plus className="text-gray-400 opacity-80" size={20} />
                                            <textarea
                                                className="bg-transparent outline-none flex-1 font-medium text-base text-gray-700 placeholder-gray-400 resize-none min-h-[32px] max-h-[200px]"
                                                placeholder="MVP必須機能のみを追加"
                                                rows="1"
                                                onInput={(e) => {
                                                    e.target.style.height = 'auto';
                                                    e.target.style.height = e.target.scrollHeight + 'px';
                                                }}
                                                onKeyDown={(e) => {
                                                    // 📱 モバイル: Enterで送信、Shift+Enterで改行
                                                    // 💻 PC: Ctrl+Enterで送信、Enterで改行
                                                    const shouldSubmit = isMobile
                                                        ? (e.key === 'Enter' && !e.shiftKey)
                                                        : ((e.ctrlKey || e.metaKey) && e.key === 'Enter');

                                                    if (shouldSubmit) {
                                                        e.preventDefault();
                                                        const value = e.target.value.trim();
                                                        if (!value) return;

                                                        // Split by newlines and semicolons
                                                        const taskTitles = value
                                                            .split(/[\n;]/)
                                                            .map(t => t.trim())
                                                            .filter(t => t);

                                                        if (taskTitles.length === 0) return;

                                                        // Section 1のタスク数をカウント
                                                        let section1Count = 0;
                                                        for (let t of tasks) {
                                                            if (!t.completed && section1Count > 0 && t.isSectionHead) break;
                                                            if (!t.completed) section1Count++;
                                                        }

                                                        // Section 1が5つ以上の場合は警告
                                                        if (section1Count + taskTitles.length > 5) {
                                                            setToastMessage("⚠️ MVP開発はシンプルに！タスクを減らすと集中力UP");
                                                            AudioEngine.play([200, 150], 'sawtooth', 0.1, 0.1);
                                                        }

                                                        // 現在のセクション数を計算（isSectionHeadの数 + 1）
                                                        let currentSectionCount = 1;
                                                        for (let t of tasks) {
                                                            if (t.isSectionHead) currentSectionCount++;
                                                        }

                                                        // Create multiple tasks
                                                        const newTasks = taskTitles.map((title, index) => ({
                                                            id: (Date.now() + index).toString(),
                                                            title: title,
                                                            completed: false,
                                                            listId: activeListId,
                                                            createdAt: Date.now() + index,
                                                            isSectionHead: tasks.length === 0 && index === 0,
                                                            sectionId: currentSectionCount // 最後のセクションに追加
                                                        }));

                                                        setTasks([...tasks, ...newTasks]);
                                                        setStats(s => ({ ...s, tasksCreated: s.tasksCreated + newTasks.length }));

                                                        if (newTasks.length > 1) {
                                                            setToastMessage(`✨ ${newTasks.length} tasks added`);
                                                        }

                                                        e.target.value = '';
                                                        e.target.style.height = 'auto';
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* 🔥 Morning Burn Fuse Bar - タスク入力の下に配置 */}
                                    {stats.isBurning && stats.tempGems > 0 && (() => {
                                        const remainingPercent = (stats.tempGems / stats.initialTempGems) * 100;

                                        // 段階的メッセージ（心理学的損失回避を最大化）
                                        let burnMessage = '🔥 導火線燃焼中 - 今すぐタスクを着手せよ！';
                                        let messageClass = 'text-red-600';

                                        if (remainingPercent <= 5) {
                                            burnMessage = '🔴 もう間に合わない...？';
                                            messageClass = 'text-red-800 animate-pulse';
                                        } else if (remainingPercent <= 10) {
                                            burnMessage = '‼️ 消滅間近 ‼️';
                                            messageClass = 'text-red-700 font-black';
                                        } else if (remainingPercent <= 25) {
                                            burnMessage = '💀 残りわずか...消えるぞ';
                                            messageClass = 'text-red-700';
                                        } else if (remainingPercent <= 50) {
                                            burnMessage = '⚠️ 半分消滅！急げ！';
                                            messageClass = 'text-orange-600';
                                        } else if (remainingPercent <= 75) {
                                            burnMessage = '🔥 導火線燃焼中 - 今すぐタスクを着手せよ！';
                                        }

                                        // 10%以下で点滅、5%以下で画面揺れ
                                        const barFlash = remainingPercent <= 10;
                                        const screenShake = remainingPercent <= 5;

                                        return (
                                            <div className={`mb-4 px-2 ${screenShake ? 'animate-[screen-shake_0.3s_ease-in-out_infinite]' : ''}`}>
                                                <div className={`bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner ${barFlash ? 'ring-2 ring-red-500 ring-opacity-75' : ''}`}>
                                                    <div
                                                        className={`h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-300 relative ${barFlash ? 'animate-pulse' : ''}`}
                                                        style={{ width: `${remainingPercent}%` }}
                                                    >
                                                        <div className={`absolute inset-0 bg-white/20 ${barFlash ? 'animate-ping' : 'animate-pulse'}`}></div>
                                                    </div>
                                                </div>
                                                <div className={`text-center text-xs font-bold mt-1 ${messageClass} ${barFlash ? 'text-sm' : ''}`}>
                                                    {burnMessage}
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <div className="space-y-3 relative">
                                        {(() => {
                                            // セクションヘッダーを含む全タスクからセクション構造を計算
                                            const sections = [];
                                            let currentSection = { header: null, tasks: [] };

                                            for (const task of incomplete) {
                                                if (task.isSectionHead) {
                                                    if (currentSection.header !== null || currentSection.tasks.length > 0) {
                                                        sections.push(currentSection);
                                                    }
                                                    currentSection = { header: task, tasks: [] };
                                                } else {
                                                    currentSection.tasks.push(task);
                                                }
                                            }
                                            if (currentSection.header !== null || currentSection.tasks.length > 0) {
                                                sections.push(currentSection);
                                            }

                                            return sections.map((section, sectionIndex) => {
                                                const sectionNum = sectionIndex + 1;
                                                // セクション名はヘッダーまたはセクション内の最初のタスクから取得
                                                const sectionName = section.header?.sectionName || section.header?.title ||
                                                    section.tasks.find(t => t.sectionName)?.sectionName || `Section ${sectionNum}`;

                                                return (
                                                    <React.Fragment key={`section-${sectionIndex}`}>
                                                        {/* セクションヘッダー */}
                                                        <div className="py-4 flex items-center justify-center gap-2" data-section={sectionNum}>
                                                            <div
                                                                className={`font-black text-xs px-4 py-1 rounded-full uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform ${sectionNum === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}
                                                                onContextMenu={(e) => {
                                                                    e.preventDefault();
                                                                    if (section.header) {
                                                                        const newName = prompt('セクション名を入力してください:', sectionName);
                                                                        if (newName !== null && newName.trim()) {
                                                                            updateTask(section.header.id, { sectionName: newName.trim() });
                                                                        }
                                                                    }
                                                                }}
                                                                title="右クリックで名前を変更"
                                                            >
                                                                {sectionName}
                                                            </div>
                                                            {sectionNum === 1 && (
                                                                <div className="flex items-center gap-1 bg-yellow-100 border-2 border-yellow-300 rounded-full px-3 py-1 animate-pulse">
                                                                    <span className="text-lg">🚀</span>
                                                                    <span className="text-[10px] font-black text-yellow-700 uppercase tracking-wider">MVP Focus</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* 📊 セクション進捗バー - Section 1のみ */}
                                                        {sectionNum === 1 && section.tasks.length > 0 && (() => {
                                                            const currentSectionId = section.tasks[0]?.sectionId;
                                                            const currentSectionAllTasks = tasks.filter(t => t.sectionId === currentSectionId && !t.isSectionHead);
                                                            const completedCount = currentSectionAllTasks.filter(t => t.completed).length;
                                                            const incompleteCount = currentSectionAllTasks.filter(t => !t.completed).length;
                                                            const sectionTotal = currentSectionAllTasks.length;
                                                            const progressPercent = sectionTotal > 0 ? Math.round((completedCount / sectionTotal) * 100) : 0;
                                                            const nextProgressPercent = sectionTotal > 0 ? Math.round(((completedCount + 1) / sectionTotal) * 100) : 0;
                                                            const progressDelta = nextProgressPercent - progressPercent;

                                                            return (
                                                                <div className="px-4 pb-3">
                                                                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-2">
                                                                        <div
                                                                            className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                                                                            style={{
                                                                                width: `${progressPercent}%`,
                                                                                transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                                                                            }}
                                                                        >
                                                                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                                                        </div>
                                                                        {incompleteCount > 0 && (
                                                                            <div
                                                                                className="absolute top-0 h-full overflow-hidden"
                                                                                style={{
                                                                                    left: `${progressPercent}%`,
                                                                                    width: `${progressDelta}%`,
                                                                                    background: 'repeating-linear-gradient(45deg, rgb(251, 191, 36), rgb(251, 191, 36) 8px, rgb(234, 179, 8) 8px, rgb(234, 179, 8) 16px)',
                                                                                    boxShadow: 'inset 0 0 10px rgba(255, 215, 0, 0.6), 0 0 15px rgba(251, 191, 36, 0.4)',
                                                                                    transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, width 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
                                                                                }}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div className="text-center text-xs text-gray-600 font-bold">
                                                                        {section.tasks.length === 1 ? (
                                                                            <span className="text-green-600">🎁 あと1つで達成！完了時50💎ボーナス</span>
                                                                        ) : (
                                                                            <span>あと{section.tasks.length}タスクで50💎</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })()}

                                                        {/* セクション内のタスク */}
                                                        {section.tasks.map((t, taskIndex) => {
                                                            const isLast = taskIndex === section.tasks.length - 1;
                                                            return (
                                                                <div
                                                                    key={t.id}
                                                                    onDragOver={(e) => handleDragOver(e, t)}
                                                                    onDrop={(e) => handleDrop(e, t)}
                                                                >
                                                                    <TaskItem
                                                                        task={t}
                                                                        isMobile={isMobile}
                                                                        onXpGain={handleXpGain}
                                                                        onToggle={() => updateTask(t.id, { completed: true, completedAt: Date.now() })}
                                                                        onUpdate={updateTask}
                                                                        onDelete={(id) => setTasks(tasks.filter(x => x.id !== id))}
                                                                        onDragStart={handleDragStart}
                                                                        isDragging={draggedTaskId === t.id}
                                                                        isDeadlineView={activeListId === 'deadline'}
                                                                        activeTheme={stats.currentTheme}
                                                                        onContextMenu={handleContextMenu}
                                                                        isFocusedSection={sectionNum === 1}
                                                                        isLastInSection={isLast}
                                                                        setRewardEffect={setRewardEffect}
                                                                        stats={stats}
                                                                        setStats={setStats}
                                                                        setToastMessage={setToastMessage}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </React.Fragment>
                                                );
                                            });
                                        })()}
                                    </div>

                                    {/* 完了タスクセクション */}
                                    {completed.length > 0 && (
                                        <div className="mt-16 mb-20">
                                            <button onClick={() => setIsCompletedOpen(!isCompletedOpen)} className={`flex items-center gap-2 text-sm font-black text-gray-400 hover:text-gray-600 px-4 py-3 rounded-xl transition-colors bg-gray-50 border-2 border-transparent hover:border-gray-200 ${juicyBtnClass}`}>
                                                {isCompletedOpen ? <Icons.ChevronDown size={18} /> : <Icons.ChevronRight size={18} />}
                                                完了済み ({completed.length})
                                            </button>

                                            {isCompletedOpen && (
                                                <div className="mt-4 space-y-2 opacity-75">
                                                    {completed.map(t => (
                                                        <TaskItem
                                                            key={t.id}
                                                            task={t}
                                                            isMobile={isMobile}
                                                            onXpGain={handleXpGain}
                                                            onToggle={() => updateTask(t.id, { completed: false })}
                                                            onUpdate={updateTask}
                                                            onDelete={(id) => setTasks(tasks.filter(x => x.id !== id))}
                                                            onDragStart={null}
                                                            isDragging={false}
                                                            isDeadlineView={activeListId === 'deadline'}
                                                            activeTheme={stats.currentTheme}
                                                            setRewardEffect={setRewardEffect}
                                                            stats={stats}
                                                            setStats={setStats}
                                                            setToastMessage={setToastMessage}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </main>

                    {/* Effects */}
                    {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
                    {floatingTexts.map(t => <FloatingText key={t.id} x={t.x} y={t.y} text={t.text} color={t.color} scale={t.scale} />)}
                    {/* 中毒性MAX：報酬演出 */}
                    {rewardEffect}
                    {/* PerformanceOverlay removed */}
                    {showIgnition && <IgnitionModal />}



                    {/* 🔥 ストリーク警告バナー */}
                    {showStreakWarning && !stats.streakBroken && (
                        <StreakWarningBanner
                            streak={stats.streak}
                            onDismiss={() => setShowStreakWarning(false)}
                        />
                    )}

                    {contextMenu && (
                        <ContextMenu
                            x={contextMenu.x}
                            y={contextMenu.y}
                            onDivide={toggleSectionBreak}
                            onMerge={toggleSectionBreak}
                            showMerge={tasks.findIndex(t => t.id === contextMenu.task.id) < tasks.length - 1 && tasks[tasks.findIndex(t => t.id === contextMenu.task.id) + 1].isSectionHead}
                            showPurge={stats.mvpScrutinizerActive}
                            onPurge={purgeTask}
                        />
                    )}

                    {/* 📈 成長グラフモーダル - 削除：ページに移行 */}

                    {/* 🔐 ログインモーダル */}
                    {showAuthModal && (
                        <AuthModal
                            onClose={() => setShowAuthModal(false)}
                            onGoogleLogin={handleGoogleLogin}
                            onEmailLogin={handleEmailLogin}
                        />
                    )}

                    <style>{`
                        @keyframes warp-fade-in { from { opacity: 0; } to { opacity: 1; } }
                        @keyframes warp-lines { from { opacity: 0; transform: scale(1); } to { opacity: 0.8; transform: scale(3); } }
                        @keyframes warp-ring { from { opacity: 0; transform: scale(0); border-width: 100px; } to { opacity: 0.5; transform: scale(1.5); border-width: 0px; } }
                        @keyframes warp-text { from { opacity: 0; transform: scale(3); } to { opacity: 1; transform: scale(1); } }
                    `}</style>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
