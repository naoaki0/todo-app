function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} = React;

// --- 音響エンジン ---
const AudioEngine = {
  ctx: null,
  init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  },
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
const SvgIcon = ({
  children,
  size = 20,
  className = "",
  ...props
}) => /*#__PURE__*/React.createElement("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: className
}, props), children);
const Icons = {
  Menu: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  })),
  Plus: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })),
  Check: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })),
  Trash2: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  })),
  Calendar: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  })),
  Flame: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3a1 1 0 0 1 .9 3.8z"
  })),
  Gem: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "M6 3h12l4 6-10 12L2 9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 3v18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 3l5 6 5-6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 9h20"
  })),
  ShoppingBag: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 10a4 4 0 0 1-8 0"
  })),
  ChevronDown: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })),
  ChevronUp: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "18 15 12 9 6 15"
  })),
  ChevronRight: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  })),
  ChevronLeft: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  })),
  Edit: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
  })),
  GripVertical: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "19",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "19",
    r: "1"
  })),
  Star: p => /*#__PURE__*/React.createElement(SvgIcon, _extends({}, p, {
    fill: p.active ? "currentColor" : "none"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
  })),
  Play: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polygon", {
    points: "5 3 19 12 5 21 5 3"
  })),
  Pause: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "4",
    width: "4",
    height: "16"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "4",
    width: "4",
    height: "16"
  })),
  AlertCircle: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })),
  Potion: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 2h7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.5 10a4.5 4.5 0 0 0-9 0l-.5 8h10l-.5-8Z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "12",
    x2: "12",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "15",
    x2: "10.5",
    y2: "15"
  })),
  Ticket: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 5v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 17v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 11v2"
  })),
  Sparkles: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 3v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 3v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 7h4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5h4"
  })),
  Cherry: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "M2 8a5 5 0 0 0 10 0c0-2.76-2.5-5-5-5-2.5 0-5 2.24-5 5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8a5 5 0 0 0 10 0c0-2.76-2.5-5-5-5-2.5 0-5 2.24-5 5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 3c2.5-1.5 5 0 10 2"
  })),
  Snowflake: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "22"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "12",
    x2: "4",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17.66",
    y1: "6.34",
    x2: "6.34",
    y2: "17.66"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17.66",
    y1: "17.66",
    x2: "6.34",
    y2: "6.34"
  })),
  Chest: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "8",
    width: "18",
    height: "4",
    rx: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v13"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.5 8a2.5 2.5 0 0 1 0-5A2.5 2.5 0 0 1 12 5.5V8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.5 8a2.5 2.5 0 0 1 0-5A2.5 2.5 0 0 1 12 5.5V8"
  })),
  Gift: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "8",
    width: "18",
    height: "4",
    rx: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v13"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.5 8a2.5 2.5 0 0 1 0-5A2.5 2.5 0 0 1 12 5.5V8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.5 8a2.5 2.5 0 0 1 0-5A2.5 2.5 0 0 1 12 5.5V8"
  })),
  Clock: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  Rocket: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
  })),
  Divide: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "6",
    r: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "18",
    r: "2"
  })),
  Merge: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "m8 6 4-4 4 4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v10.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 12.3v8.2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m8 18 4 4 4-4"
  })),
  Terminal: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "4 17 10 11 4 5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "19",
    x2: "20",
    y2: "19"
  })),
  Search: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })),
  Shield: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  })),
  Zap: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
  })),
  Trash: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  })),
  Bell: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("path", {
    d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.73 21a2 2 0 0 1-3.46 0"
  })),
  RotateCcw: p => /*#__PURE__*/React.createElement(SvgIcon, p, /*#__PURE__*/React.createElement("polyline", {
    points: "1 4 1 10 7 10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
  }))
};

// --- 共通UI部品 ---
const juicyBtnClass = "transition-all duration-150 transform hover:scale-105 active:scale-95 active:translate-y-1";
const IconButton = ({
  icon: Icon,
  onClick,
  className = "",
  active = false,
  size = 20,
  color = "text-google-textSec",
  ...props
}) => /*#__PURE__*/React.createElement("button", _extends({
  onClick: onClick,
  className: `p-2 rounded-full flex items-center justify-center hover:bg-google-hover ${active ? 'bg-google-selected text-google-blue' : color} ${className} ${juicyBtnClass}`
}, props), /*#__PURE__*/React.createElement(Icon, {
  size: size,
  active: active
}));
const Toast = ({
  message,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-floating z-[120] flex items-center gap-3 animate-toast-in font-black whitespace-nowrap border-b-4 border-red-700"
  }, /*#__PURE__*/React.createElement(Icons.AlertCircle, {
    size: 24
  }), /*#__PURE__*/React.createElement("span", null, message));
};
const FloatingText = ({
  x,
  y,
  text,
  color,
  scale
}) => /*#__PURE__*/React.createElement("div", {
  className: `fixed z-[150] pointer-events-none flex items-center gap-1 animate-float-up drop-shadow-md whitespace-nowrap ${color} ${scale}`,
  style: {
    left: x,
    top: y
  }
}, text);
const IgnitionModal = () => /*#__PURE__*/React.createElement("div", {
  className: "fixed inset-0 pointer-events-none z-[200] flex items-center justify-center"
}, /*#__PURE__*/React.createElement("div", {
  className: "absolute inset-0 bg-orange-500/20 animate-ignition"
}), /*#__PURE__*/React.createElement("div", {
  className: "text-9xl text-duo-orange animate-ignition flex items-center justify-center drop-shadow-2xl"
}, "\uD83D\uDD25"), /*#__PURE__*/React.createElement("div", {
  className: "absolute top-1/3 text-4xl font-black text-white animate-ignition drop-shadow-lg uppercase tracking-widest"
}, "STREAK IGNITED!"));

// 🔥 ストリーク警告バナー
const StreakWarningBanner = ({
  streak,
  onDismiss
}) => /*#__PURE__*/React.createElement("div", {
  className: "fixed top-20 left-1/2 -translate-x-1/2 z-[150] animate-bounce"
}, /*#__PURE__*/React.createElement("div", {
  className: "bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-2xl border-b-4 border-red-800 flex items-center gap-3"
}, /*#__PURE__*/React.createElement("span", {
  className: "text-2xl animate-pulse"
}, "\uD83D\uDD25"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "font-black text-sm"
}, "\u30B9\u30C8\u30EA\u30FC\u30AF\u6D88\u6EC5\u307E\u3067\u3042\u30681\u6642\u9593\uFF01"), /*#__PURE__*/React.createElement("div", {
  className: "text-xs text-red-200 font-bold"
}, streak, "\u65E5\u9023\u7D9A\u3092\u5B88\u308C\uFF01\u4ECA\u3059\u3050\u30BF\u30B9\u30AF\u3092\u5B8C\u4E86\u3057\u3088\u3046")), /*#__PURE__*/React.createElement("button", {
  onClick: onDismiss,
  className: "text-red-200 hover:text-white font-bold text-lg ml-2"
}, "\xD7")));

// --- Context Menu ---
const ContextMenu = ({
  x,
  y,
  onDivide,
  onMerge,
  onPurge,
  showMerge,
  showPurge
}) => /*#__PURE__*/React.createElement("div", {
  className: "fixed z-[9999] bg-white border-2 border-gray-200 rounded-xl shadow-floating py-1 w-56 animate-scale-in",
  style: {
    left: x,
    top: y
  }
}, /*#__PURE__*/React.createElement("button", {
  onClick: onDivide,
  className: "w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 font-bold text-gray-600 text-sm"
}, /*#__PURE__*/React.createElement(Icons.Divide, {
  size: 16
}), " \u3053\u3053\u3067\u533A\u5207\u308B"), showMerge && /*#__PURE__*/React.createElement("button", {
  onClick: onMerge,
  className: "w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 font-bold text-gray-600 text-sm"
}, /*#__PURE__*/React.createElement(Icons.Merge, {
  size: 16
}), " \u533A\u5207\u308A\u3092\u524A\u9664"), showPurge && /*#__PURE__*/React.createElement("div", {
  className: "border-t border-gray-100 mt-1 pt-1"
}, /*#__PURE__*/React.createElement("button", {
  onClick: onPurge,
  className: "w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 font-bold text-red-500 text-sm"
}, /*#__PURE__*/React.createElement(Icons.Trash, {
  size: 16
}), " Post-MVP\u3078\u30D1\u30FC\u30B8")));

// --- ユーティリティ ---
const getAdjustedToday = () => {
  const d = new Date();
  d.setHours(d.getHours() - 3);
  return d.toISOString().split('T')[0];
};

// 🎰 LDWS理論：報酬ティア決定関数（損失を勝利に偽装）
const determineRewardTier = (pityCounter, isFeverMode) => {
  // 基本確率（LDWS構造）
  let whiffChance = 45; // 完全ハズレ（悔しさ）
  let smallChance = 35; // 小当たり（延命措置・LDWs）
  let normalChance = 14; // 満足感（習慣化）
  let bigChance = 5; // 強い快楽（中毒の維持）
  let jackpotChance = 1; // 神話的成功（射幸心の核心）

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
    const boost = bigChance - originalBig + (jackpotChance - originalJackpot);
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
const Confetti = ({
  type,
  theme
}) => {
  const performanceColors = ['bg-yellow-400', 'bg-yellow-300', 'bg-gray-300', 'bg-gray-200'];
  const colors = performanceColors;

  // Checkbox Ignition (Small Confetti)
  const isSmall = type === 'ignition';
  const particlesCount = isSmall ? 8 : type === 'big' || type === 'performance' ? 45 : 12;
  const particles = Array.from({
    length: particlesCount
  }).map((_, i) => ({
    id: i,
    tx: (Math.random() - 0.5) * (isSmall ? 60 : 240),
    ty: (Math.random() - 0.5) * (isSmall ? 60 : 240),
    size: Math.random() * (isSmall ? 3 : 7) + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-visible"
  }, particles.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: `absolute rounded-full ${p.color}`,
    style: {
      width: p.size,
      height: p.size,
      '--tx': `${p.tx}px`,
      '--ty': `${p.ty}px`,
      animation: 'confetti-explode 0.4s ease-out forwards'
    }
  })));
};

// --- 完全依存レベル：4段階報酬演出システム ---

// ニアミス演出：金色のフラッシュ
const NearMissFlash = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 pointer-events-none z-[300]",
    style: {
      background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,165,0,0.3) 40%, transparent 70%)',
      animation: 'near-miss-intense 0.4s ease-out forwards'
    }
  });
};

// 🎰 結果テキスト演出: 画面中央に派手なテキスト
const WinText = ({
  tier,
  onComplete
}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, tier === 'jackpot' ? 2000 : tier === 'big' ? 1500 : 800);
    return () => clearTimeout(timer);
  }, [tier, onComplete]);
  const config = {
    whiff: {
      text: '...',
      color: 'text-gray-400',
      size: 'text-4xl',
      animate: ''
    },
    small: {
      text: 'SMALL WIN!',
      color: 'text-yellow-400',
      size: 'text-5xl',
      animate: 'animate-bounce'
    },
    normal: {
      text: 'WIN!',
      color: 'text-green-400',
      size: 'text-6xl',
      animate: 'animate-bounce'
    },
    big: {
      text: 'BIG WIN!!',
      color: 'text-orange-500',
      size: 'text-7xl',
      animate: 'animate-pulse'
    },
    jackpot: {
      text: '🎰 JACKPOT!!! 🎰',
      color: 'text-red-500',
      size: 'text-8xl',
      animate: 'animate-bounce'
    }
  };
  const c = config[tier] || config.whiff;
  if (!visible) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 flex items-center justify-center pointer-events-none z-[400]"
  }, /*#__PURE__*/React.createElement("div", {
    className: `${c.size} font-black ${c.color} ${c.animate} drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]`,
    style: {
      textShadow: tier === 'jackpot' ? '0 0 40px #ff0000, 0 0 80px #ff6600' : tier === 'big' ? '0 0 30px #ff8800, 0 0 60px #ffaa00' : tier === 'normal' ? '0 0 20px #00ff00' : 'none',
      animation: tier === 'jackpot' ? 'jackpot-text 0.3s ease-in-out infinite' : undefined
    }
  }, c.text));
};

// 🎰 レア予告確認モーメント: 虹/赤予告時の全画面フラッシュ
const RareForecastFlash = ({
  forecast,
  onComplete
}) => {
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
  const bgColor = forecast === 'rainbow' ? 'bg-gradient-to-br from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500' : 'bg-gradient-to-br from-red-600 to-orange-500';
  return /*#__PURE__*/React.createElement("div", {
    className: `fixed inset-0 pointer-events-none z-[450] ${bgColor} animate-pulse`,
    style: {
      opacity: 0.7,
      animation: 'forecast-flash 0.3s ease-out forwards'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-white text-9xl font-black animate-bounce drop-shadow-lg"
  }, forecast === 'rainbow' ? '🌈' : '🔥'), /*#__PURE__*/React.createElement("div", {
    className: "absolute text-white text-4xl font-black mt-40"
  }, forecast === 'rainbow' ? '虹予告！！' : '激アツ予告！')));
};

// 🎰 ジェム吸い込み演出: 獲得時に画面右上へ軌跡
const GemAbsorb = ({
  amount,
  startX,
  startY,
  onComplete
}) => {
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, gems.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.id,
    className: "fixed pointer-events-none z-[500]",
    style: {
      left: animating ? g.targetX : g.startX,
      top: animating ? g.targetY : g.startY,
      fontSize: animating ? '14px' : '28px',
      opacity: animating ? 0 : 1,
      transition: `all 0.8s ease-in ${g.delay}ms`,
      filter: 'drop-shadow(0 0 8px rgba(100, 200, 255, 0.8))'
    }
  }, "\uD83D\uDC8E")));
};

// 📈 成長グラフコンポーネント
const GrowthGraph = ({
  history = {},
  onClose
}) => {
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
    const getWeekStart = date => {
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
      week: {
        S: 20,
        A: 15,
        B: 10
      },
      month: {
        S: 80,
        A: 60,
        B: 40
      },
      all: {
        S: 100,
        A: 70,
        B: 40
      }
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
    if (allWeeks.length === 0) return {
      count: 0,
      week: null
    };
    let maxCount = 0;
    let maxWeek = null;
    allWeeks.forEach(week => {
      if (week.count > maxCount) {
        maxCount = week.count;
        maxWeek = week.date;
      }
    });
    return {
      count: maxCount,
      week: maxWeek
    };
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
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto pt-8"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-black text-gray-800 mb-6"
  }, "\uD83D\uDCC8 \u6210\u9577\u30B0\u30E9\u30D5"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-6"
  }, ['week', 'month', 'all'].map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => setPeriod(p),
    className: `flex-1 py-2 px-4 rounded-lg font-bold transition-all ${period === p ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`
  }, p === 'week' ? '週' : p === 'month' ? '月' : '全期間'))), /*#__PURE__*/React.createElement("div", {
    className: `text-center py-6 px-6 rounded-xl mb-6 shadow-lg border-2 ${rankInfo.borderColor} ${rankInfo.bgColor}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-gray-500 mb-2"
  }, periodLabel[period], "\u306E\u9054\u6210\u30E9\u30F3\u30AF"), /*#__PURE__*/React.createElement("div", {
    className: `text-5xl font-black mb-2 bg-gradient-to-r ${rankInfo.color} bg-clip-text text-transparent`
  }, rankInfo.stars, " ", rankInfo.rank, " ", rankInfo.stars), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl mb-3"
  }, rankInfo.icon), /*#__PURE__*/React.createElement("div", {
    className: `text-sm font-black ${rankInfo.textColor} mb-4`
  }, rankInfo.label), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold text-gray-500 mb-1"
  }, periodLabel[period], ": ", currentTotal, "\u30BF\u30B9\u30AF\u5B8C\u4E86"), rankInfo.nextThreshold && /*#__PURE__*/React.createElement("div", {
    className: "relative w-full h-3 bg-gray-200 rounded-full overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full bg-gradient-to-r ${rankInfo.color} transition-all duration-500`,
    style: {
      width: `${Math.min(100, currentTotal / rankInfo.nextThreshold * 100)}%`
    }
  }))), rankInfo.nextThreshold && /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-black text-blue-600"
  }, "\uD83C\uDFAF \u3042\u3068", rankInfo.nextThreshold - currentTotal, "\u30BF\u30B9\u30AF\u3067\u6B21\u30E9\u30F3\u30AF\uFF01"), !rankInfo.nextThreshold && /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-black text-yellow-600"
  }, "\u2728 \u6700\u9AD8\u30E9\u30F3\u30AF\u9054\u6210\uFF01")), personalBest.count > 0 && period === 'week' && /*#__PURE__*/React.createElement("div", {
    className: "text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border-2 border-purple-200 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-black text-gray-400 uppercase tracking-widest mb-1"
  }, "\u81EA\u5DF1\u30D9\u30B9\u30C8"), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-black text-purple-600"
  }, personalBest.count, "\u30BF\u30B9\u30AF"), currentTotal >= personalBest.count ? /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-black text-pink-600 mt-2"
  }, "\uD83C\uDF89 \u81EA\u5DF1\u30D9\u30B9\u30C8\u66F4\u65B0\u4E2D\uFF01") : /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-gray-600 mt-2"
  }, "\u3042\u3068", personalBest.count - currentTotal, "\u30BF\u30B9\u30AF\u3067\u81EA\u5DF1\u30D9\u30B9\u30C8\uFF01")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-end justify-between gap-${period === 'month' ? '1' : '3'} h-56`
  }, days.map((day, i) => {
    const maxHeight = 224 * 0.8;
    const heightPx = day.count === 0 ? 2 : Math.max(8, day.count / maxCount * maxHeight);
    const isToday = period === 'week' ? i === 6 : period === 'month' ? i === 29 : i === days.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: day.date,
      className: "flex-1 flex flex-col items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: `text-${period === 'month' ? '2xs' : 'sm'} font-black text-gray-700 mb-2`
    }, day.count), /*#__PURE__*/React.createElement("div", {
      className: `w-full rounded-t-xl transition-all ${isToday ? 'bg-gradient-to-t from-blue-500 to-blue-400 shadow-lg' : 'bg-gray-300'}`,
      style: {
        height: `${heightPx}px`
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: `text-${period === 'month' ? '2xs' : 'xs'} font-bold mt-2 ${isToday ? 'text-blue-500' : 'text-gray-500'}`
    }, day.label));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-black text-gray-400 uppercase tracking-widest mb-2"
  }, periodLabel[period], "\u306E\u5408\u8A08"), /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-black text-blue-500"
  }, currentTotal), /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold text-gray-500 mt-1"
  }, "\u30BF\u30B9\u30AF\u5B8C\u4E86")));
};

// 🔥 コンボ演出コンポーネント - 連続完了で表示
const ComboDisplay = ({
  comboCount,
  onComplete
}) => {
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, comboCount >= 3 && /*#__PURE__*/React.createElement("div", {
    className: `fixed inset-0 pointer-events-none z-[350] ${bgClass}`,
    style: {
      background: comboCount >= 5 ? 'radial-gradient(circle, rgba(255,100,0,0.4) 0%, rgba(255,50,0,0.2) 50%, transparent 100%)' : 'radial-gradient(circle, rgba(255,200,0,0.3) 0%, rgba(255,150,0,0.15) 50%, transparent 100%)',
      animation: 'normal-flash 0.8s ease-out forwards'
    }
  }), comboCount >= 5 && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 pointer-events-none z-[352]",
    style: {
      animation: 'screen-shake 0.5s ease-out forwards'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 flex items-center justify-center pointer-events-none z-[360]"
  }, /*#__PURE__*/React.createElement("div", {
    className: `${sizeClass} font-black ${textClass} animate-bounce drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]`,
    style: {
      textShadow: comboCount >= 5 ? '0 0 40px rgba(255,100,0,1), 0 0 80px rgba(255,50,0,0.8)' : comboCount >= 3 ? '0 0 30px rgba(255,150,0,0.8)' : '0 0 20px rgba(255,200,0,0.6)'
    }
  }, text)), /*#__PURE__*/React.createElement("div", {
    className: "fixed top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 pointer-events-none z-[360]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-black text-white"
  }, "\u5831\u916C ", comboCount >= 5 ? '3' : comboCount >= 3 ? '2' : '1.5', "\u500D!")));
};
const RewardWhiff = ({
  onComplete,
  showNearMiss,
  nearMissIntensity = 'normal',
  consecutiveWhiff = 0
}) => {
  const [particles, setParticles] = useState([]);
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    // 連続スカ回数に応じて演出強化
    const isConsecutive = consecutiveWhiff >= 3;
    const isLongStreak = consecutiveWhiff >= 5;

    // 悔しい演出：暗いパーティクルが消える（連続で増加）
    let particleCount = showNearMiss ? nearMissIntensity === 'extreme' ? 40 : nearMissIntensity === 'strong' ? 25 : 20 : 15;
    particleCount += Math.min(consecutiveWhiff * 3, 30); // 連続ボーナス

    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.PI * 2 * i / particleCount;
      const speed = showNearMiss ? nearMissIntensity === 'extreme' ? 150 : 100 : 80 + consecutiveWhiff * 5;
      newParticles.push({
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: isLongStreak ? '#ff0000' : isConsecutive ? '#ff4444' : showNearMiss ? nearMissIntensity === 'extreme' ? '#ff4444' : '#ffaa00' : '#888888',
        size: showNearMiss ? 8 : 6 + Math.min(consecutiveWhiff, 5)
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
    const duration = isLongStreak ? 1500 : showNearMiss && nearMissIntensity === 'extreme' ? 1200 : 600;
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, showNearMiss && /*#__PURE__*/React.createElement(NearMissFlash, null), /*#__PURE__*/React.createElement("div", {
    className: `fixed inset-0 pointer-events-none z-[290] ${nearMissIntensity === 'extreme' || consecutiveWhiff >= 5 ? 'animate-[screen-shake_0.3s_ease-in-out_3]' : ''}`,
    style: {
      background: consecutiveWhiff >= 5 ? `rgba(255, 0, 0, ${0.3 + redIntensity})` : consecutiveWhiff >= 3 ? `rgba(255, 50, 0, ${0.2 + redIntensity})` : showNearMiss && nearMissIntensity === 'extreme' ? 'rgba(255, 0, 0, 0.3)' : showNearMiss && nearMissIntensity === 'strong' ? 'rgba(255, 100, 0, 0.2)' : 'rgba(0, 0, 0, 0.3)',
      animation: consecutiveWhiff >= 5 || nearMissIntensity === 'extreme' ? 'whiff-darken 1.5s ease-out forwards' : 'whiff-darken 0.6s ease-out forwards'
    }
  }), showText && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 flex items-center justify-center pointer-events-none z-[300]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: `text-4xl font-black ${consecutiveWhiff >= 5 ? 'text-red-600' : consecutiveWhiff >= 3 ? 'text-red-500' : nearMissIntensity === 'extreme' ? 'text-red-500' : 'text-yellow-500'} animate-pulse drop-shadow-lg`
  }, getStreakText()), /*#__PURE__*/React.createElement("div", {
    className: "text-lg text-white/80 mt-2"
  }, consecutiveWhiff >= 7 ? '天井まであと1回！' : consecutiveWhiff >= 3 ? '天井が近づいている...' : 'あと少しだった...'))), particles.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
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
      '--vy': `${p.vy}px`
    }
  })));
};

// 🎰 小当たり演出（40%）: LDWs + ニアミスフェイント
const RewardSmallWin = ({
  onComplete,
  centerX,
  centerY
}) => {
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
          id: i,
          startX,
          startY,
          targetX: `${centerX + spreadX}px`,
          targetY: `${centerY + spreadY}px`,
          color: goldShades[i % goldShades.length],
          delay: Math.random() * 0.2,
          duration: 0.7 + Math.random() * 0.3,
          size: 6 + Math.random() * 4
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, phase === 'feint' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 pointer-events-none z-[280]",
    style: {
      background: 'radial-gradient(circle, rgba(255,140,0,0.4) 0%, rgba(255,100,0,0.3) 50%, transparent 100%)',
      animation: 'feint-flash 0.4s ease-out forwards'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[290]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl font-black text-orange-500 animate-pulse"
  }, "BIG...!?"))), phase === 'reveal' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 pointer-events-none z-[280]",
    style: {
      background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 50%)',
      animation: 'normal-flash 0.5s ease-out forwards'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[290]",
    style: {
      animation: 'near-miss-text 1s ease-out forwards'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl font-black text-yellow-500"
  }, "\u60DC\u3057\u3044\uFF01\u3042\u3068\u5C11\u3057\u3067BIG...")), particles.map(p => /*#__PURE__*/React.createElement(CrackerConfettiParticle, _extends({
    key: p.id
  }, p)))));
};

// ノーマル演出（22%）: 虹色クラッカー
const RewardNormal = ({
  onComplete,
  centerX,
  centerY
}) => {
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
        size: 10 + Math.random() * 8
      });
    }
    setParticles(newParticles);

    // 拡散リング3つ
    setRings([{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }]);

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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 pointer-events-none z-[280]",
    style: {
      background: 'radial-gradient(circle, rgba(255,107,157,0.4) 0%, rgba(62,207,196,0.3) 50%, transparent 70%)',
      animation: 'normal-flash 0.8s ease-out forwards'
    }
  }), rings.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
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
      animation: `ring-expand 1s ease-out ${i * 0.15}s forwards`
    }
  })), particles.map(p => /*#__PURE__*/React.createElement(CrackerConfettiParticle, _extends({
    key: p.id
  }, p))));
};

// ビッグ演出（10%）: 圧倒的レインボー爆発 - 段階的盛り上がり
const RewardBig = ({
  onComplete
}) => {
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
      setExplosions([{
        id: 1,
        delay: 0,
        x: '30%',
        y: '30%'
      }, {
        id: 2,
        delay: 0.1,
        x: '70%',
        y: '40%'
      }, {
        id: 3,
        delay: 0.2,
        x: '50%',
        y: '60%'
      }, {
        id: 4,
        delay: 0.3,
        x: '20%',
        y: '70%'
      }, {
        id: 5,
        delay: 0.4,
        x: '80%',
        y: '20%'
      }]);

      // 光線エフェクト
      setLightBeams([{
        id: 1,
        angle: 0
      }, {
        id: 2,
        angle: 60
      }, {
        id: 3,
        angle: 120
      }, {
        id: 4,
        angle: 180
      }, {
        id: 5,
        angle: 240
      }, {
        id: 6,
        angle: 300
      }]);

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
          id: i,
          startX,
          startY,
          targetX: `${centerX + spreadX}px`,
          targetY: `${centerY + spreadY}px`,
          color: rainbowColors[i % rainbowColors.length],
          delay: Math.random() * 0.5,
          duration: 1 + Math.random() * 0.6,
          size: 14 + Math.random() * 10
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, phase === 'buildup' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 pointer-events-none z-[275]",
    style: {
      background: 'radial-gradient(circle, rgba(255,140,0,0.3) 0%, rgba(255,100,0,0.2) 50%, transparent 100%)',
      animation: 'buildup-pulse 0.1s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[290]",
    style: {
      animation: 'buildup-shake 0.1s ease-in-out infinite'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl font-black text-orange-400 opacity-80"
  }, "BIG...?"))), phase === 'explode' && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 pointer-events-none z-[280]",
    style: {
      background: 'radial-gradient(circle, rgba(255,0,128,0.5) 0%, rgba(255,215,0,0.4) 30%, rgba(0,206,209,0.3) 60%, transparent 100%)',
      animation: 'big-rainbow-flash 1.5s ease-out forwards'
    }
  }), lightBeams.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.id,
    style: {
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
      animation: 'beam-pulse 2s ease-in-out infinite'
    }
  })), explosions.map(exp => /*#__PURE__*/React.createElement("div", {
    key: exp.id,
    style: {
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
      animation: `explosion ${0.8}s ease-out ${exp.delay}s forwards`
    }
  })), particles.map(p => /*#__PURE__*/React.createElement(CrackerConfettiParticle, _extends({
    key: p.id
  }, p))), /*#__PURE__*/React.createElement("div", {
    className: "fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[295]",
    style: {
      animation: 'big-text 2.5s ease-out forwards'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-9xl font-black",
    style: {
      background: 'linear-gradient(45deg, #FF0080, #FF8C00, #FFD700, #00FF00, #00CED1, #4169E1)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 0 40px rgba(255,215,0,0.8)'
    }
  }, "BIG!!!")));
};

// ジャックポット演出（5%）: 究極の黄金爆発 - 完全依存レベル
const RewardJackpot = ({
  onComplete
}) => {
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
      const angle = Math.PI * 2 * i / 12;
      newStarBursts.push({
        id: i,
        angle,
        delay: i * 0.05
      });
    }
    setStarBursts(newStarBursts);

    // 螺旋エフェクト
    setSpirals([{
      id: 1,
      direction: 1,
      delay: 0
    }, {
      id: 2,
      direction: -1,
      delay: 0.2
    }, {
      id: 3,
      direction: 1,
      delay: 0.4
    }]);

    // 波動エフェクト
    setWaves([{
      id: 1,
      delay: 0
    }, {
      id: 2,
      delay: 0.3
    }, {
      id: 3,
      delay: 0.6
    }, {
      id: 4,
      delay: 0.9
    }]);

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
        size: 12 + Math.random() * 16
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 pointer-events-none z-[280]",
    style: {
      background: 'radial-gradient(circle, rgba(255,215,0,0.9) 0%, rgba(255,165,0,0.7) 30%, rgba(255,215,0,0.5) 60%, transparent 100%)',
      animation: 'jackpot-mega-flash 2s ease-out forwards'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 pointer-events-none z-[282]",
    style: {
      animation: 'screen-shake-intense 1s ease-out forwards'
    }
  }), waves.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.id,
    style: {
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
      animation: `mega-wave-expand 2s ease-out ${w.delay}s forwards`
    }
  })), spirals.map(sp => /*#__PURE__*/React.createElement("div", {
    key: sp.id,
    style: {
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
      animation: `spiral-rotate-${sp.direction > 0 ? 'cw' : 'ccw'} 3s linear ${sp.delay}s infinite`
    }
  })), starBursts.map(sb => /*#__PURE__*/React.createElement("div", {
    key: sb.id,
    style: {
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
      animation: `starburst-pulse 2s ease-out ${sb.delay}s forwards`
    }
  })), particles.map(p => /*#__PURE__*/React.createElement(CrackerConfettiParticle, _extends({
    key: p.id
  }, p))), /*#__PURE__*/React.createElement("div", {
    className: "fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[295]",
    style: {
      animation: 'jackpot-mega-text 3s ease-out forwards'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[12rem] font-black",
    style: {
      background: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700, #FFF8DC, #FFD700)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 0 60px rgba(255,215,0,1), 0 0 120px rgba(255,215,0,0.8), 0 0 180px rgba(255,165,0,0.6)',
      filter: 'drop-shadow(0 0 40px rgba(255,215,0,1))'
    }
  }, "JACKPOT!!!")), /*#__PURE__*/React.createElement("div", {
    className: "fixed top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 pointer-events-none z-[295]",
    style: {
      animation: 'jackpot-subtext 3s ease-out 0.5s forwards',
      opacity: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-black text-yellow-300",
    style: {
      textShadow: '0 0 20px rgba(255,215,0,1)'
    }
  }, "\uD83D\uDD25 FEVER MODE ACTIVATED \uD83D\uDD25")));
};

// --- クラッカー風花吹雪パーティクルシステム（宝箱用）---
const CrackerConfettiParticle = ({
  startX,
  startY,
  targetX,
  targetY,
  color,
  delay,
  duration,
  size
}) => {
  const randomRotation = Math.random() * 1080 - 540;
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
      '--rotation': `${randomRotation}deg`
    }
  });
};
const ConfettiSystem = ({
  rarity
}) => {
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
        size: 8 + Math.random() * 8
      });
    }
    setParticles(newParticles);

    // クリーンアップ
    return () => setParticles([]);
  }, [rarity]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, particles.map(p => /*#__PURE__*/React.createElement(CrackerConfettiParticle, _extends({
    key: p.id
  }, p))));
};
const TaskItem = ({
  task,
  onToggle,
  onUpdate,
  onDelete,
  onDragStart,
  isDragging,
  isMobile,
  onXpGain,
  isDeadlineView,
  activeTheme,
  onContextMenu,
  isFocusedSection = true,
  isLastInSection = false,
  setRewardEffect,
  stats,
  setStats,
  setToastMessage,
  onMoveToSection1
}) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [confettiType, setConfettiType] = useState(null);
  const [animateCheckbox, setAnimateCheckbox] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [currentForecast, setCurrentForecast] = useState(null); // 予告枠色
  const buttonRef = useRef(null);

  // 🎰 ギャンブルデザイン最大化: handleToggle
  // 予告演出、音変化、ニアミス強化、天井可視化、The Freezeを統合
  const handleToggle = async e => {
    e.stopPropagation();

    // 既に完了している場合は単純にトグル（未完了に戻す）
    if (task.completed) return onToggle(task);
    // Section 1以外の未完了タスクはチェック不可
    if (!isFocusedSection) return;
    if (isCompleting || isStarting) return;
    const rect = buttonRef.current ? buttonRef.current.getBoundingClientRect() : null;
    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    // --- 共通演出ロジック（開始・完了で使用） ---
    const runGamblingSequence = async isStartPhase => {
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
        setRewardEffect(/*#__PURE__*/React.createElement(RareForecastFlash, {
          forecast: "rainbow",
          onComplete: () => setRewardEffect(null)
        }));
        await new Promise(resolve => setTimeout(resolve, 800));
      } else if (forecast === 'red') {
        AudioEngine.play([800, 1000, 1200], 'sine', 0.12, 0.06);
        // 赤予告確認: 全画面フラッシュ
        setRewardEffect(/*#__PURE__*/React.createElement(RareForecastFlash, {
          forecast: "red",
          onComplete: () => setRewardEffect(null)
        }));
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
        const pitch = basePitch + i * 30;
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
      return {
        tier,
        showNearMiss,
        nearMissIntensity,
        newPityCounter,
        forecast
      };
    };

    // === 1回目クリック: 開始 ===
    // 🛑 ワンクリック動作モード（ここを false にすると即完了、元に戻すには && false を削除）
    if (!task.started && false) {
      setIsStarting(true);
      const result = await runGamblingSequence(true);
      const {
        tier,
        showNearMiss,
        nearMissIntensity,
        forecast
      } = result;

      // 開始状態に更新
      onUpdate(task.id, {
        started: true,
        startedAt: Date.now()
      });

      // 報酬演出の発火（開始時）
      const effectComplete = () => {
        setRewardEffect(null);
        setIsStarting(false);
        setAnimateCheckbox(false);
        setCurrentForecast(null); // 枠色リセット
      };

      // WinText + 報酬演出を同時表示
      if (tier === 'whiff') {
        setRewardEffect(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WinText, {
          tier: tier
        }), /*#__PURE__*/React.createElement(RewardWhiff, {
          onComplete: effectComplete,
          showNearMiss: showNearMiss,
          nearMissIntensity: nearMissIntensity,
          consecutiveWhiff: stats.pityCounter
        })));
      } else if (tier === 'small') {
        setRewardEffect(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WinText, {
          tier: tier
        }), /*#__PURE__*/React.createElement(RewardSmallWin, {
          onComplete: effectComplete,
          centerX: centerX,
          centerY: centerY
        })));
      } else if (tier === 'normal') {
        setRewardEffect(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WinText, {
          tier: tier
        }), /*#__PURE__*/React.createElement(RewardNormal, {
          onComplete: effectComplete,
          centerX: centerX,
          centerY: centerY
        })));
      } else if (tier === 'big') {
        setRewardEffect(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WinText, {
          tier: tier
        }), /*#__PURE__*/React.createElement(RewardBig, {
          onComplete: effectComplete
        })));
        setToastMessage('🚀 START BIG!! 期待が高まる！');
      } else if (tier === 'jackpot') {
        setRewardEffect(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WinText, {
          tier: tier
        }), /*#__PURE__*/React.createElement(RewardJackpot, {
          onComplete: effectComplete
        })));
        setToastMessage('🎰 JACKPOT START!!! 完了時にさらなる報酬が！');
      }
      return;
    }

    // === 開始取り消し（Alt+クリック） ===
    if (task.started && e.altKey) {
      onUpdate(task.id, {
        started: false,
        startedAt: null
      });
      AudioEngine.play([300, 250, 200], 'sine', 0.1, 0.05);
      setToastMessage('↩️ タスク開始を取り消しました');
      return;
    }

    // === 2回目クリック: 完了 ===
    setIsCompleting(true);
    const result = await runGamblingSequence(false);
    const {
      tier,
      showNearMiss,
      nearMissIntensity,
      newPityCounter
    } = result;

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
    const gemAmounts = {
      whiff: 0,
      small: 3,
      normal: 5,
      big: 10,
      jackpot: 20
    };
    let gemCount = gemAmounts[tier] || 0;

    // 📈 成長グラフ用: 今日の日付を取得
    const todayStr = new Date().toISOString().split('T')[0];
    const updateHistory = prev => {
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
    if (tier !== 'whiff') {
      // スカではコンボ継続しない
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
      setRewardEffect(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WinText, {
        tier: tier
      }), /*#__PURE__*/React.createElement(RewardWhiff, {
        onComplete: effectComplete,
        showNearMiss: showNearMiss,
        nearMissIntensity: nearMissIntensity,
        consecutiveWhiff: newPityCounter
      })));
      setStats(prev => ({
        ...prev,
        pityCounter: newPityCounter,
        comboCount: 0,
        lastCompletionTime: now,
        dailyCompletionHistory: updateHistory(prev)
      }));
    } else if (tier === 'small') {
      setRewardEffect(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WinText, {
        tier: tier
      }), /*#__PURE__*/React.createElement(RewardSmallWin, {
        onComplete: effectComplete,
        centerX: centerX,
        centerY: centerY
      }), /*#__PURE__*/React.createElement(GemAbsorb, {
        amount: gemCount,
        startX: centerX,
        startY: centerY
      }), showCombo && /*#__PURE__*/React.createElement(ComboDisplay, {
        comboCount: newComboCount
      })));
      setStats(prev => ({
        ...prev,
        pityCounter: 0,
        gems: prev.gems + gemCount,
        comboCount: newComboCount,
        lastCompletionTime: now,
        dailyCompletionHistory: updateHistory(prev)
      }));
      if (showCombo) setToastMessage(`🔥 ${newComboCount}x COMBO! +${gemCount}💎`);
    } else if (tier === 'normal') {
      setRewardEffect(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WinText, {
        tier: tier
      }), /*#__PURE__*/React.createElement(RewardNormal, {
        onComplete: effectComplete,
        centerX: centerX,
        centerY: centerY
      }), /*#__PURE__*/React.createElement(GemAbsorb, {
        amount: gemCount,
        startX: centerX,
        startY: centerY
      }), showCombo && /*#__PURE__*/React.createElement(ComboDisplay, {
        comboCount: newComboCount
      })));
      setStats(prev => ({
        ...prev,
        pityCounter: 0,
        gems: prev.gems + gemCount,
        comboCount: newComboCount,
        lastCompletionTime: now,
        dailyCompletionHistory: updateHistory(prev)
      }));
      if (showCombo) setToastMessage(`🔥 ${newComboCount}x COMBO! +${gemCount}💎`);
    } else if (tier === 'big') {
      setRewardEffect(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WinText, {
        tier: tier
      }), /*#__PURE__*/React.createElement(RewardBig, {
        onComplete: effectComplete
      }), /*#__PURE__*/React.createElement(GemAbsorb, {
        amount: gemCount,
        startX: window.innerWidth / 2,
        startY: window.innerHeight / 2
      }), showCombo && /*#__PURE__*/React.createElement(ComboDisplay, {
        comboCount: newComboCount
      })));
      const feverEnd = Date.now() + 3 * 60 * 1000;
      setStats(prev => ({
        ...prev,
        pityCounter: 0,
        feverEndTime: feverEnd,
        gems: prev.gems + gemCount,
        comboCount: newComboCount,
        lastCompletionTime: now,
        dailyCompletionHistory: updateHistory(prev)
      }));
      setToastMessage(showCombo ? `🔥 ${newComboCount}x COMBO! FEVER MODE!! +${gemCount}💎` : '🔥 FEVER MODE!! 3分間レア確率2倍！');
    } else if (tier === 'jackpot') {
      setRewardEffect(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WinText, {
        tier: tier
      }), /*#__PURE__*/React.createElement(RewardJackpot, {
        onComplete: effectComplete
      }), /*#__PURE__*/React.createElement(GemAbsorb, {
        amount: gemCount,
        startX: window.innerWidth / 2,
        startY: window.innerHeight / 2
      }), showCombo && /*#__PURE__*/React.createElement(ComboDisplay, {
        comboCount: newComboCount
      })));
      const feverEnd = Date.now() + 3 * 60 * 1000;
      setStats(prev => ({
        ...prev,
        pityCounter: 0,
        feverEndTime: feverEnd,
        gems: prev.gems + gemCount,
        comboCount: newComboCount,
        lastCompletionTime: now,
        dailyCompletionHistory: updateHistory(prev)
      }));
      setToastMessage(showCombo ? `🎰 ${newComboCount}x COMBO! JACKPOT!!! +${gemCount}💎` : '🎰 JACKPOT!!! 🔥 FEVER MODE 発動！');
    }
  };
  const springClass = isCompleting ? "animate-spring" : "";
  const checkboxPop = animateCheckbox ? "animate-checkbox-pop" : "";
  const anticipationGlow = animateCheckbox ? "animate-anticipation-glow animate-anticipation-pulse" : "";
  // Section 1以外は薄く表示（pointer-events-noneは外し、ボタン操作を可能にする）
  const disabledClass = !isFocusedSection && !task.completed ? "opacity-50 grayscale" : "";
  return /*#__PURE__*/React.createElement("div", {
    className: `group flex items-start py-5 px-5 border-b-2 transition-all ${springClass} ${disabledClass} ${isDragging ? 'opacity-50 bg-blue-50' : ''} ${task.completed ? 'bg-gray-50 opacity-60 border-gray-100' : isFocusedSection ? 'bg-white border-gray-200 hover:bg-gray-50' : 'bg-gray-100 border-gray-200'}`,
    draggable: !task.completed,
    onDragStart: e => {
      if (!task.completed && onDragStart) {
        onDragStart(e, task);
      }
    },
    onContextMenu: e => onContextMenu && onContextMenu(e, task),
    onClick: () => {
      if (isMobile) setShowActions(prev => !prev);
    }
  }, !task.completed && /*#__PURE__*/React.createElement("div", {
    className: "pt-0.5 pr-2 flex-shrink-0 cursor-move text-gray-300 hover:text-gray-500 transition-colors"
  }, /*#__PURE__*/React.createElement(Icons.GripVertical, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "pt-0.5 pr-4 flex-shrink-0 relative",
    ref: buttonRef,
    onClick: e => handleToggle(e)
  }, (isCompleting || confettiType === 'ignition') && /*#__PURE__*/React.createElement(Confetti, {
    type: confettiType,
    theme: activeTheme
  }), currentForecast && currentForecast !== 'white' && /*#__PURE__*/React.createElement("div", {
    className: `absolute inset-0 rounded-xl animate-pulse ${currentForecast === 'rainbow' ? 'bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500' : currentForecast === 'red' ? 'bg-red-500' : currentForecast === 'gold' ? 'bg-yellow-400' : 'bg-green-400'}`,
    style: {
      opacity: 0.4,
      transform: 'scale(1.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `relative w-6 h-6 rounded-xl flex items-center justify-center transition-all ${checkboxPop} ${anticipationGlow} ${currentForecast && currentForecast !== 'white' ? `border-4 scale-125 ${currentForecast === 'rainbow' ? 'border-purple-500 bg-gradient-to-br from-pink-200 to-yellow-200' : currentForecast === 'red' ? 'border-red-500 bg-red-100' : currentForecast === 'gold' ? 'border-yellow-500 bg-yellow-100' : 'border-green-500 bg-green-100'}` : task.completed || isCompleting ? 'bg-duo-blue border-duo-blue border-2 scale-110' : task.started || isStarting ? 'bg-green-100 border-green-500 border-[3px]' : isFocusedSection ? 'border-gray-300 border-2 bg-white text-white group-hover:bg-gray-50' : 'border-gray-300 border-2 bg-gray-200'}`
  }, currentForecast === 'rainbow' && /*#__PURE__*/React.createElement("span", {
    className: "text-xs"
  }, "\uD83C\uDF08"), currentForecast === 'red' && !task.completed && !isCompleting && /*#__PURE__*/React.createElement("span", {
    className: "text-xs"
  }, "\uD83D\uDD25"), currentForecast === 'gold' && !task.completed && !isCompleting && /*#__PURE__*/React.createElement("span", {
    className: "text-xs"
  }, "\u2728"), currentForecast === 'green' && !task.completed && !isCompleting && /*#__PURE__*/React.createElement("span", {
    className: "text-xs"
  }, "\u26A1"), !currentForecast && (task.completed || isCompleting) && /*#__PURE__*/React.createElement(Icons.Check, {
    size: 16,
    className: "text-gray-500",
    strokeWidth: 4
  }), !currentForecast && (task.started || isStarting) && !task.completed && !isCompleting && /*#__PURE__*/React.createElement(Icons.Play, {
    size: 12,
    className: "text-green-600",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-grow min-w-0 pr-2 pt-0.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: `text-lg font-black leading-tight ${task.completed ? 'text-gray-400 line-through' : isFocusedSection ? 'text-gray-900' : 'text-gray-500'}`
  }, task.title)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, !task.completed && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-1 transition-opacity duration-200 ${isMobile ? showActions ? 'opacity-100' : 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`
  }, !isFocusedSection && onMoveToSection1 && /*#__PURE__*/React.createElement(IconButton, {
    icon: Icons.ChevronUp,
    size: 18,
    className: "text-blue-400 hover:text-blue-600 hover:bg-blue-50",
    onClick: e => {
      e.stopPropagation();
      onMoveToSection1(task.id);
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: Icons.Trash2,
    size: 18,
    className: "text-gray-300 hover:text-duo-pink hover:bg-red-50",
    onClick: e => {
      e.stopPropagation();
      onDelete(task.id);
    }
  }))), task.completed && /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-1 transition-opacity duration-200 ${isMobile ? showActions ? 'opacity-100' : 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: Icons.Trash2,
    size: 18,
    className: "text-gray-300 hover:text-duo-pink",
    onClick: e => {
      e.stopPropagation();
      onDelete(task.id);
    }
  }))));
};

// --- ログインモーダル ---
const AuthModal = ({
  onClose,
  onGoogleLogin,
  onEmailLogin
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailSubmit = e => {
    e.preventDefault();
    if (email && password) {
      onEmailLogin(email, password);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/50 flex items-center justify-center z-[200]",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-floating",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-black text-duo-text"
  }, "\uD83D\uDD10 \u30ED\u30B0\u30A4\u30F3"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-gray-400 hover:text-gray-600 text-2xl leading-none"
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onGoogleLogin,
    className: "w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#4285F4",
    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#34A853",
    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FBBC05",
    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#EA4335",
    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
  })), "Google\u3067\u30ED\u30B0\u30A4\u30F3"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full border-t border-gray-300"
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative flex justify-center text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2 bg-white text-gray-500"
  }, "\u307E\u305F\u306F"))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleEmailSubmit,
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
    value: email,
    onChange: e => setEmail(e.target.value),
    className: "w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-duo-blue",
    required: true
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9",
    value: password,
    onChange: e => setPassword(e.target.value),
    className: "w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-duo-blue",
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full bg-duo-blue hover:bg-duo-blueBorder text-white font-bold py-3 px-4 rounded-xl transition-colors border-b-4 border-duo-blueBorder"
  }, "\u30ED\u30B0\u30A4\u30F3 / \u65B0\u898F\u767B\u9332")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 text-center mt-4"
  }, "\u203B \u30ED\u30B0\u30A4\u30F3\u3059\u308B\u3068\u3001\u30B9\u30DE\u30DB\u3068PC\u3067\u30C7\u30FC\u30BF\u304C\u81EA\u52D5\u540C\u671F\u3055\u308C\u307E\u3059"))));
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
      return {
        ...d,
        ...loaded,
        dailyCompletionHistory: loaded.dailyCompletionHistory || {}
      };
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
    xp: 0,
    level: 1,
    gems: 100,
    streak: 0,
    lastDate: null,
    streakFreeze: 0,
    wager: {
      active: false
    },
    focusPotion: false,
    resurrectionTickets: 0,
    themes: ['default'],
    currentTheme: 'default',
    streakBroken: false,
    savedStreak: 0,
    completedSections: 0,
    devLogs: [],
    mvpScrutinizerActive: true,
    // デフォルトで有効
    devOathActive: false,
    flowCapacitorEndTime: 0,
    tasksCreated: 0,
    tasksPurged: 0,
    pityCounter: 0,
    // 天井カウンター（スカが続くと上昇）
    feverEndTime: 0,
    // フィーバーモード終了時刻
    tempGems: 0,
    initialTempGems: 0,
    isBurning: false,
    burnStartTime: 0,
    // 🔥 コンボシステム用
    comboCount: 0,
    // 現在のコンボ数
    lastCompletionTime: 0,
    // 最後のタスク完了時刻
    // 📈 成長グラフ用
    dailyCompletionHistory: {},
    // { '2026-01-16': 5, '2026-01-15': 3, ... }
    goal: null // ユーザーの目標
  }));
  const SECTION_SIZE = 4;

  // 初回ロード時: 空セクションを作る不要なisSectionHeadを除去
  useEffect(() => {
    const incompleteTasks = tasks.filter(t => !t.completed);
    let needsCleanup = false;
    // 連続するisSectionHeadをチェック（後ろにタスクが無いheadは不要）
    for (let i = 0; i < incompleteTasks.length - 1; i++) {
      if (incompleteTasks[i].isSectionHead && incompleteTasks[i + 1].isSectionHead) {
        needsCleanup = true;
        break;
      }
    }
    // 最後のタスクがisSectionHead（その後にタスクがない）場合も不要
    if (incompleteTasks.length > 0 && incompleteTasks[incompleteTasks.length - 1].isSectionHead && incompleteTasks.length > 1) {
      needsCleanup = true;
    }
    if (needsCleanup) {
      // isSectionHeadの直後にタスクがあるもののみ残す
      const incompleteIds = new Set(incompleteTasks.map(t => t.id));
      const validHeadIds = new Set();
      for (let i = 0; i < incompleteTasks.length; i++) {
        if (incompleteTasks[i].isSectionHead && i < incompleteTasks.length - 1 && !incompleteTasks[i + 1].isSectionHead) {
          validHeadIds.add(incompleteTasks[i].id);
        }
      }
      const cleaned = tasks.map(t => {
        if (t.completed || !t.isSectionHead) return t;
        if (validHeadIds.has(t.id)) return t;
        return {
          ...t,
          isSectionHead: false
        };
      });
      // sectionIdを再計算
      let sectionId = 1;
      const updated = cleaned.map((t, idx) => {
        if (t.completed) return t;
        if (idx > 0 && t.isSectionHead) sectionId++;
        return {
          ...t,
          sectionId
        };
      });
      setTasks(updated);
    }
  }, []); // 初回のみ実行

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeListId, setActiveListId] = useState('default');
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [timerState, setTimerState] = useState({
    active: false,
    time: 10 * 60,
    mode: 'break'
  });
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
  const [notificationPermission, setNotificationPermission] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'default');
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
  const [focusMode, setFocusMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('duo_v18_focusMode')) === true;
    } catch {
      return false;
    }
  });
  const localLastModifiedRef = useRef(parseInt(localStorage.getItem('duo_v18_lastSync') || '0')); // ローカルでの最終変更時刻を追跡（LWW用）
  const isApplyingCloudRef = useRef(false); // クラウドデータ適用中フラグ

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
        const 残りのダイヤ = Math.max(0, Math.floor(prev.initialTempGems * (1 - 経過秒数 / 消滅までの秒数)));
        if (残りのダイヤ === 0) {
          AudioEngine.play([100, 80, 60, 40], 'sawtooth', 0.3, 0.3);
          return {
            ...prev,
            tempGems: 0,
            isBurning: false,
            devLogs: [{
              id: Date.now(),
              text: "💀 報酬が完全に燃え尽きました。朝の勝負に敗北。",
              colorClass: "text-red-600 font-black"
            }, ...prev.devLogs]
          };
        }
        return {
          ...prev,
          tempGems: 残りのダイヤ
        };
      });
      AudioEngine.play([80, 100], 'sine', 0.05, 0.1);
    }, 1000);
    return () => clearInterval(燃焼タイマー);
  }, [stats.isBurning]);
  useEffect(() => {
    localStorage.setItem('duo_v18_focusMode', JSON.stringify(focusMode));
  }, [focusMode]);
  useEffect(() => {
    const h = () => {
      const m = window.innerWidth < 768;
      setIsMobile(m);
      if (!m) setIsSidebarOpen(true);
    };
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
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
    const unsubscribe = window.firebaseAuth.onAuthStateChanged(async currentUser => {
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

            // 🛡️ Last Write Wins（LWW）同期ロジック
            const cloudTasks = cloudData.tasks || [];
            const localTasks = tasks || [];
            const cloudTaskCount = cloudTasks.length;
            const localTaskCount = localTasks.length;
            const cloudTimestamp = cloudData.lastSync || 0;
            const localTimestamp = localLastModifiedRef.current;
            console.log(`[Sync] Cloud tasks: ${cloudTaskCount}, Local tasks: ${localTaskCount}`);
            console.log(`[Sync] Cloud timestamp: ${cloudTimestamp}, Local timestamp: ${localTimestamp}`);
            if (cloudTaskCount === 0 && localTaskCount > 0) {
              // クラウドが空で、ローカルにデータがある → ローカルをアップロード
              console.log('[Sync] Cloud is empty, uploading local data');
              const timestamp = localLastModifiedRef.current || Date.now();
              await userDocRef.set({
                tasks: localTasks,
                stats,
                lastSync: timestamp,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
              }, {
                merge: true
              });
              localLastModifiedRef.current = timestamp;
              localStorage.setItem('duo_v18_lastSync', timestamp.toString());
            } else if (localTaskCount === 0 && cloudTaskCount > 0) {
              // ローカルが空で、クラウドにデータがある → クラウドを採用
              console.log('[Sync] Local is empty, using cloud data');
              isApplyingCloudRef.current = true;
              setTasks(cloudTasks);
              if (cloudData.stats) setStats(cloudData.stats);
              localLastModifiedRef.current = cloudTimestamp;
              localStorage.setItem('duo_v18_lastSync', cloudTimestamp.toString());
            } else if (cloudTimestamp > localTimestamp) {
              // クラウドの方が新しい → クラウドを採用（LWW）
              console.log('[Sync] Cloud is newer (LWW), using cloud data');
              isApplyingCloudRef.current = true;
              setTasks(cloudTasks);
              if (cloudData.stats) setStats(cloudData.stats);
              localLastModifiedRef.current = cloudTimestamp;
              localStorage.setItem('duo_v18_lastSync', cloudTimestamp.toString());
            } else {
              // ローカルの方が新しい、または同じ → ローカルをアップロード
              console.log('[Sync] Local is newer or equal (LWW), uploading local data');
              const timestamp = localLastModifiedRef.current || Date.now();
              await userDocRef.set({
                tasks: localTasks,
                stats,
                lastSync: timestamp,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
              }, {
                merge: true
              });
              localLastModifiedRef.current = timestamp;
              localStorage.setItem('duo_v18_lastSync', timestamp.toString());
            }
          } else {
            // 初回ログイン：ローカルデータをアップロード（空でもOK）
            console.log('[Sync] First login, uploading local data to Firestore');
            const timestamp = localLastModifiedRef.current || Date.now();
            await userDocRef.set({
              tasks,
              stats,
              lastSync: timestamp,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            localLastModifiedRef.current = timestamp;
            localStorage.setItem('duo_v18_lastSync', timestamp.toString());
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
    const unsubscribe = userDocRef.onSnapshot(docSnap => {
      if (!docSnap.exists) return;
      const cloudData = docSnap.data();
      const cloudTimestamp = cloudData.lastSync || 0;

      // LWW: クラウドのタイムスタンプがローカルの最終変更時刻より新しい場合のみ採用
      if (cloudTimestamp <= localLastModifiedRef.current) {
        console.log('[Realtime] Ignoring: cloud is not newer than local (LWW)');
        return;
      }
      const cloudTasks = cloudData.tasks || [];
      const cloudTaskCount = cloudTasks.length;
      console.log(`[Realtime] Cloud tasks: ${cloudTaskCount}, Cloud time: ${cloudTimestamp}, Local modified: ${localLastModifiedRef.current}`);

      // 他のデバイスからの変更を適用（LWW: クラウドの方が新しい）
      if (cloudTaskCount > 0) {
        console.log('[Realtime] Applying cloud data (LWW: cloud is newer)');
        isApplyingCloudRef.current = true;
        setTasks(cloudTasks);
        if (cloudData.stats) setStats(cloudData.stats);
        localLastModifiedRef.current = cloudTimestamp;
        localStorage.setItem('duo_v18_lastSync', cloudTimestamp.toString());
        console.log('[Realtime] Synced from another device');
      }
    }, error => {
      console.error('[Realtime] Error in realtime listener:', error);
      setSyncStatus('error');
    });
    return () => {
      console.log('[Realtime] Cleaning up realtime sync listener');
      unsubscribe();
    };
  }, [user]);

  // 💾 ローカルストレージとFirestoreへの保存
  useEffect(() => {
    // ローカルストレージに保存
    localStorage.setItem('duo_v18_tasks', JSON.stringify(tasks));
    localStorage.setItem('duo_v18_stats', JSON.stringify(stats));

    // ログイン済みの場合はFirestoreにも保存
    if (user && window.firebaseDB && !authLoading) {
      // クラウドデータ適用による状態変更の場合はFirestoreへの再保存をスキップ
      if (isApplyingCloudRef.current) {
        isApplyingCloudRef.current = false;
        console.log('[Sync] Skipping save: change originated from cloud');
        return;
      }

      // LWW: ローカル変更時刻を即時記録
      localLastModifiedRef.current = Date.now();
      localStorage.setItem('duo_v18_lastSync', localLastModifiedRef.current.toString());
      const saveToFirestore = async () => {
        try {
          setSyncStatus('syncing');
          const userDocRef = window.firebaseDB.collection('users').doc(user.uid);
          // LWW: 保存時のタイムスタンプは変更時刻を使用（新しいDate.now()ではない）
          const timestamp = localLastModifiedRef.current;
          await userDocRef.set({
            tasks,
            stats,
            lastSync: timestamp,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, {
            merge: true
          });
          localStorage.setItem('duo_v18_lastSync', timestamp.toString());
          setSyncStatus('synced');
          console.log('[Sync] Saved to Firestore (LWW timestamp:', timestamp, ')');
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
      const last = new Date(stats.lastDate);
      const curr = new Date(today);
      const diff = (curr - last) / (1000 * 60 * 60 * 24);
      if (diff > 1 && stats.streak > 0 && !stats.streakBroken) {
        if (stats.streakFreeze > 0) {
          setStats(s => ({
            ...s,
            streakFreeze: s.streakFreeze - 1,
            lastDate: today
          }));
          setToastMessage("フリーズ発動！Streakは守られました❄️");
        } else {
          setStats(s => ({
            ...s,
            streakBroken: true,
            savedStreak: s.streak,
            streak: 0
          }));
        }
      }
    }
  }, []);

  // Antigravity Integration - Auto-create tasks from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Support multiple task parameters: ?task=A&task=B&task=C
    // Also split each parameter by semicolons or pipes: ?task=A;B||C
    const taskParams = params.getAll('task').flatMap(t => t.split(/[;|]+/).map(s => s.trim()).filter(s => s));

    // Support comma-separated tasks: ?tasks=A,B,C
    // Also split by semicolons or pipes: ?tasks=A,B;C||D
    const tasksParam = params.get('tasks');
    const tasksFromComma = tasksParam ? tasksParam.split(/[,;|]+/).map(t => t.trim()).filter(t => t) : [];

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
          // 現在のセクション数を計算（最後のセクションに追加）
          let currentSectionCount = 1;
          for (let t of tasks) {
            if (t.isSectionHead) currentSectionCount++;
          }
          const newTask = {
            id: (Date.now() + index).toString(),
            title: taskTitle,
            completed: false,
            listId: activeListId,
            createdAt: Date.now() + index,
            isSectionHead: tasks.length === 0 && newTasks.length === 0,
            sectionId: currentSectionCount
          };
          newTasks.push(newTask);
          addedCount++;
        } else {
          skippedCount++;
        }
      });
      if (newTasks.length > 0) {
        setTasks(prevTasks => [...prevTasks, ...newTasks]);
        setStats(s => ({
          ...s,
          tasksCreated: s.tasksCreated + newTasks.length
        }));
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
      timer = setInterval(() => setTimerState(s => ({
        ...s,
        time: s.time - 1
      })), 1000);
    } else if (timerState.time === 0 && timerState.active) {
      // 休憩タイマー終了：リセットして停止
      setTimerState({
        active: false,
        mode: 'break',
        time: 10 * 60
      });
      AudioEngine.play([880, 440], 'sine', 0.15, 0.2);
      setToastMessage("🎉 休憩終了！さあタスクに戻りましょう");
    }
    return () => clearInterval(timer);
  }, [timerState.active, timerState.time]);
  const resetBreakTimer = () => {
    setTimerState({
      active: false,
      mode: 'break',
      time: 10 * 60
    });
  };

  // 🔐 認証関数
  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await window.firebaseAuth.signInWithRedirect(provider);
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
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      task
    });
  };
  const toggleSectionBreak = () => {
    if (!contextMenu) return;
    const currentIndex = tasks.findIndex(t => t.id === contextMenu.task.id);
    if (currentIndex === -1 || currentIndex === tasks.length - 1) return;
    const nextTask = tasks[currentIndex + 1];
    const isHead = nextTask.isSectionHead;

    // セクション区切りを設定/解除し、全タスクのsectionIdを再計算
    const updatedTasks = tasks.map((t, idx) => idx === currentIndex + 1 ? {
      ...t,
      isSectionHead: !isHead
    } : t);

    // sectionIdを再計算（完了済みタスクは変更しない）
    let sectionId = 1;
    const tasksWithSectionId = updatedTasks.map((t, idx) => {
      if (t.completed) return t; // 完了済みはそのまま
      if (idx > 0 && t.isSectionHead) sectionId++;
      return {
        ...t,
        sectionId
      };
    });
    setTasks(tasksWithSectionId);
    setContextMenu(null);
  };

  // MVP Scrutinizer: パージ機能
  const purgeTask = () => {
    if (!contextMenu) return;
    const taskToPurge = contextMenu.task;

    // isSectionHeadタスクをパージする際、次タスクへisSectionHead/sectionNameを引き継ぐ
    let updatedTasks = tasks;
    if (taskToPurge.isSectionHead) {
      const taskIndex = tasks.findIndex(t => t.id === taskToPurge.id);
      let nextHeadIndex = -1;
      for (let i = taskIndex + 1; i < tasks.length; i++) {
        const t = tasks[i];
        if (!t.completed && t.isSectionHead) break; // 次のセクション境界
        if (!t.completed) {
          nextHeadIndex = i;
          break;
        }
      }
      updatedTasks = tasks.map((t, i) => {
        if (i === nextHeadIndex) return {
          ...t,
          isSectionHead: true,
          sectionName: taskToPurge.sectionName || t.sectionName
        };
        return t;
      });
    }

    // タスクを末尾へ移動（isSectionHeadを解除）
    const newTasks = updatedTasks.filter(t => t.id !== taskToPurge.id);
    newTasks.push({
      ...taskToPurge,
      isSectionHead: false
    });

    // sectionIdを再計算
    let sectionId = 1;
    const tasksWithSectionId = newTasks.map((t, idx) => {
      if (t.completed) return t;
      if (idx > 0 && t.isSectionHead) sectionId++;
      return {
        ...t,
        sectionId
      };
    });
    setTasks(tasksWithSectionId);
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
  const checkSectionCompletion = completedTaskId => {
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
      logText = isSection1Task ? `[⚡ MVP Focus] ${task.title} を最速で完遂。リリースが近づいています。` : `[High Velocity] ${task.title} を最短工数で完遂しました。`;
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
      let newWager = {
        ...prev.wager
      };
      let newGems = prev.gems + rewardAmount; // Use calculated reward

      if (isFirstTaskToday) {
        if (!prev.lastDate) {
          newStreak = 1;
        } else {
          const last = new Date(prev.lastDate);
          const curr = new Date(today);
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
        newWager = {
          active: false
        };
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
      if (rewardType === 'milestone') logColorClass = "text-yellow-600 font-black";else if (rewardType === 'morning') logColorClass = "text-amber-600 font-bold";else if (rewardType === 'velocity') logColorClass = "text-cyan-600 font-bold";else if (rewardType === 'mvpFocus') logColorClass = "text-blue-600 font-bold";

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
        setFloatingTexts(prev => [...prev, {
          id,
          x: rect.left + 50,
          y: rect.top - 20,
          text: floatText,
          color: floatColor,
          scale: floatScale
        }]);
        setTimeout(() => setFloatingTexts(prev => prev.filter(t => t.id !== id)), 1000);
      }
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        gems: newGems,
        streak: newStreak,
        lastDate: today,
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
    setStats(prev => ({
      ...prev,
      gems: prev.gems - cost
    }));
    action();
    AudioEngine.play([783, 1046], 'sine', 0.1, 0.1);
  };
  const unlockTheme = (themeName, cost) => {
    if (stats.themes.includes(themeName)) {
      setStats(s => ({
        ...s,
        currentTheme: themeName
      }));
      setToastMessage("テーマを変更しました🎨");
    } else {
      buyItem(cost, () => {
        setStats(s => ({
          ...s,
          themes: [...s.themes, themeName],
          currentTheme: themeName
        }));
        setToastMessage("新テーマ獲得！✨");
      });
    }
  };
  const updateTask = (id, updates) => setTasks(tasks.map(t => t.id === id ? {
    ...t,
    ...updates
  } : t));

  // isSectionHeadタスクを完了する際、次タスクへisSectionHead/sectionNameを引き継ぐ
  const completeTask = taskId => {
    setTasks(prev => {
      const taskIndex = prev.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return prev;
      const task = prev[taskIndex];
      let nextHeadIndex = -1;
      if (task.isSectionHead) {
        for (let i = taskIndex + 1; i < prev.length; i++) {
          const t = prev[i];
          if (!t.completed && t.isSectionHead) break; // 次のセクション境界
          if (!t.completed) {
            nextHeadIndex = i;
            break;
          }
        }
      }
      return prev.map((t, i) => {
        if (i === taskIndex) return {
          ...t,
          completed: true,
          completedAt: Date.now()
        };
        if (i === nextHeadIndex) return {
          ...t,
          isSectionHead: true,
          sectionName: task.sectionName || t.sectionName
        };
        return t;
      });
    });
  };

  // isSectionHeadタスクを削除する際、次タスクへisSectionHead/sectionNameを引き継ぐ
  const deleteTask = taskId => {
    setTasks(prev => {
      const taskIndex = prev.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return prev;
      const task = prev[taskIndex];
      let nextHeadIndex = -1;
      if (task.isSectionHead) {
        for (let i = taskIndex + 1; i < prev.length; i++) {
          const t = prev[i];
          if (!t.completed && t.isSectionHead) break; // 次のセクション境界
          if (!t.completed) {
            nextHeadIndex = i;
            break;
          }
        }
      }
      return prev.filter((t, i) => i !== taskIndex).map((t, i, arr) => {
        // nextHeadIndexはfilter前のインデックスなので、filter後に対応するタスクを探す
        if (nextHeadIndex !== -1 && t.id === prev[nextHeadIndex].id) {
          return {
            ...t,
            isSectionHead: true,
            sectionName: task.sectionName || t.sectionName
          };
        }
        return t;
      });
    });
  };

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
      return {
        ...t,
        sectionId
      };
    });
    setTasks(tasksWithSectionId);
    setDraggedTaskId(null);
    setDragOverTaskId(null);
  };
  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverTaskId(null);
  };

  // Section 1の末尾にタスクを移動する
  const moveToSection1 = taskId => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    // tasksの中でsection 1の最後のインデックスを探す
    // (最初の未完了タスク群の中で、2つ目以降のisSectionHeadが出る直前まで)
    let section1EndIndex = -1;
    let passedFirstIncomplete = false;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed) continue;
      if (!passedFirstIncomplete) {
        passedFirstIncomplete = true;
        section1EndIndex = i;
        continue;
      }
      if (tasks[i].isSectionHead) break; // section 2の開始
      section1EndIndex = i;
    }
    if (section1EndIndex === -1 || taskIndex <= section1EndIndex) return;
    const newTasks = [...tasks];
    const [movedTask] = newTasks.splice(taskIndex, 1);
    // taskIndexがsection1EndIndexより後なので、splice後のインデックス調整不要
    newTasks.splice(section1EndIndex + 1, 0, movedTask);

    // sectionIdを再計算
    let sectionId = 1;
    const updated = newTasks.map((t, idx) => {
      if (t.completed) return t;
      if (idx > 0 && t.isSectionHead) sectionId++;
      return {
        ...t,
        sectionId
      };
    });
    setTasks(updated);
  };
  const visibleTasks = tasks.filter(t => activeListId === 'default' ? !t.listId || t.listId === 'default' : t.listId === activeListId);
  const incomplete = visibleTasks.filter(t => !t.completed);
  const completed = visibleTasks.filter(t => t.completed);

  // ヘッダーMVP進捗バー用（全タスクベース）
  const allIncompleteTasks = tasks.filter(t => !t.completed);
  const totalTasks = tasks.length;
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round(completedTasksCount / totalTasks * 100);
  const nextCompletionRate = totalTasks === 0 ? 0 : Math.round((completedTasksCount + 1) / totalTasks * 100);
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
  const pulseDuration = section1Rate > 0 ? Math.max(0.2, 2 - section1Rate * 1.8) + 's' : '0s';
  const btn3DClass = "transition-all active:translate-y-[4px] active:border-b-0 border-b-[4px] hover:scale-105 active:scale-95 duration-150";
  const isStreakActive = stats.lastDate === getAdjustedToday();
  let sectionCounter = 0;

  // Helper to determine if a task is the last in its section (of incomplete tasks)
  const isLastTaskInSection = index => {
    const nextTask = incomplete[index + 1];
    return !nextTask || nextTask.isSectionHead;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "flex h-screen w-full bg-white overflow-hidden relative selection:bg-duo-green/20 font-bold text-duo-text"
  }, /*#__PURE__*/React.createElement("header", {
    className: "fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-gray-100 z-[100] flex items-center justify-between px-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-shrink-0 z-20"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: Icons.Menu,
    onClick: () => setIsSidebarOpen(!isSidebarOpen)
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] px-4 hidden md:block"
  }, /*#__PURE__*/React.createElement("div", {
    className: `relative h-8 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200 shadow-inner ${levelGlow ? 'animate-pulse' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `h-full bg-gradient-to-r from-slate-300 to-slate-400 relative ${levelGlow ? 'progress-glow brightness-125' : ''}`,
    style: {
      width: `${completionRate}%`,
      transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-white/10",
    style: {
      backgroundSize: '200% 100%'
    }
  })), allIncompleteTasks.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 h-full",
    style: {
      left: `${completionRate}%`,
      width: `${progressDelta}%`,
      background: 'repeating-linear-gradient(45deg, rgba(148, 163, 184, 0.5), rgba(148, 163, 184, 0.5) 8px, rgba(100, 116, 139, 0.5) 8px, rgba(100, 116, 139, 0.5) 16px)',
      transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, width 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
      animation: completionRate >= 90 ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `absolute inset-0 flex items-center justify-center gap-2 z-10 transition-transform ${progressBounce ? 'scale-110' : ''}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-40",
    style: {
      textShadow: '0 1px 0 rgba(255,255,255,0.8)'
    }
  }, "MVP Progress"), /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-black ${progressBounce ? 'text-slate-700' : 'text-slate-600'}`,
    style: {
      textShadow: '0 1px 0 rgba(255,255,255,0.6)'
    }
  }, completionRate >= 70 ? `残り${100 - completionRate}%` : `${completionRate}%`)), /*#__PURE__*/React.createElement("div", {
    className: "absolute right-2 top-1/2 transform -translate-y-1/2 text-lg z-20",
    style: {
      animation: section1Rate > 0 && section1Rate < 1 ? `pulse ${pulseDuration} cubic-bezier(0.4, 0, 0.6, 1) infinite` : 'none',
      color: section1Rate > 0.8 ? '#ef4444' : 'currentColor',
      filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))'
    }
  }, "\uD83D\uDE80"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 z-20"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setActiveListId(activeListId === 'growthGraph' ? 'default' : 'growthGraph');
      if (isMobile) setIsSidebarOpen(false);
    },
    className: `flex items-center justify-center w-10 h-10 rounded-full transition-colors font-bold text-xl ${activeListId === 'growthGraph' ? 'bg-blue-100 text-blue-500' : 'bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-blue-500'}`
  }, "\uD83D\uDCC8"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("button", {
    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all group ${isStreakActive ? 'hover:bg-gray-50' : ''}`
  }, /*#__PURE__*/React.createElement(Icons.Flame, {
    size: 26,
    fill: "currentColor",
    className: `transition-colors duration-500 ${!stats.streakBroken && isStreakActive ? "text-duo-orange" : "text-[#e5e5e5]"}`
  }), /*#__PURE__*/React.createElement("span", {
    className: `text-lg font-black transition-colors duration-500 ${!stats.streakBroken && isStreakActive ? "text-duo-orange" : "text-[#e5e5e5]"}`
  }, stats.streakBroken ? 0 : stats.streak)), stats.streakBroken && stats.resurrectionTickets > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: resurrectStreak,
    className: `absolute -bottom-8 left-1/2 -translate-x-1/2 bg-duo-blue text-white text-xs font-black px-3 py-1 rounded-xl whitespace-nowrap animate-bounce border-b-4 border-duo-blueBorder ${btn3DClass} z-50`
  }, "\u5FA9\u6D3B\uFF01")), /*#__PURE__*/React.createElement("button", {
    className: `flex items-center gap-1.5 px-3 py-1.5 rounded-2xl transition-all group ${isStreakActive ? 'hover:bg-gray-50' : ''}`
  }, /*#__PURE__*/React.createElement(Icons.Gem, {
    size: 26,
    fill: "currentColor",
    className: `transition-transform duration-500 ${!stats.streakBroken && isStreakActive ? "text-cyan-400" : "text-[#e5e5e5]"}`
  }), /*#__PURE__*/React.createElement("span", {
    className: `text-lg font-black transition-colors duration-500 ${!stats.streakBroken && isStreakActive ? "text-cyan-400" : "text-[#e5e5e5]"}`
  }, stats.gems)), stats.isBurning && stats.tempGems > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-2xl animate-pulse shadow-lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "\uD83D\uDD25"), /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-black"
  }, stats.tempGems, "\uD83D\uDC8E"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold"
  }, "\u71C3\u713C\u4E2D")))), (stats.pityCounter >= 3 || stats.feverEndTime > Date.now()) && /*#__PURE__*/React.createElement("div", {
    className: "fixed top-16 left-0 right-0 z-[70] px-4 py-2 flex justify-center gap-3 pointer-events-none"
  }, stats.pityCounter >= 3 && /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-2xl shadow-lg animate-pulse pointer-events-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "\u26A1"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold opacity-80"
  }, "\u5929\u4E95\u307E\u3067"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-black"
  }, 8 - stats.pityCounter, "\u56DE")))), stats.feverEndTime > Date.now() && /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-2xl shadow-lg animate-pulse pointer-events-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "\uD83D\uDD25"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold opacity-80"
  }, "FEVER"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-black"
  }, "\u78BA\u73872\u500D"))))), isMobile && isSidebarOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/40 z-[80] backdrop-blur-sm",
    onClick: () => setIsSidebarOpen(false)
  }), /*#__PURE__*/React.createElement("aside", {
    className: `fixed inset-y-0 left-0 transform transition-all duration-300 z-[90] w-72 bg-white border-r-2 border-duo-gray pt-20 flex flex-col ${isSidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 mb-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-black text-gray-400 uppercase tracking-widest mb-3"
  }, "\u4ECA\u65E5\u306E\u8A18\u9332"), /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-4 p-3 rounded-2xl border-2 transition-colors duration-500 ${isStreakActive ? 'bg-orange-50 border-orange-100' : 'bg-gray-50 border-gray-200'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative group cursor-pointer transition-transform hover:scale-110"
  }, /*#__PURE__*/React.createElement(Icons.Flame, {
    size: 32,
    className: `transition-colors duration-1000 ${isStreakActive ? "text-duo-orange" : "text-gray-300"}`,
    fill: "currentColor"
  }), stats.streakBroken && stats.resurrectionTickets > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: resurrectStreak,
    className: "absolute -bottom-2 -right-4 bg-duo-blue text-white text-[10px] font-black px-2 py-0.5 rounded-lg whitespace-nowrap animate-bounce shadow-sm"
  }, "\u5FA9\u6D3B\uFF01")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: `text-xl font-black transition-colors duration-1000 ${isStreakActive ? "text-duo-orange" : "text-gray-400"}`
  }, stats.streakBroken ? 0 : stats.streak, "\u65E5\u9023\u7D9A"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400 font-bold"
  }, isStreakActive ? "Keep it burning!" : "タスク完了で着火！")))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-white border-2 border-gray-200 border-b-4 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold text-gray-500 mb-2 text-center"
  }, "\u2615 \u4F11\u61A9\u30BF\u30A4\u30DE\u30FC (10\u5206)"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setTimerState(s => ({
      ...s,
      active: !s.active
    })),
    className: `w-12 h-12 rounded-xl flex items-center justify-center transition-all ${btn3DClass} ${timerState.active ? 'bg-gray-100 text-gray-400 border-gray-300' : 'bg-duo-green text-white border-green-600'}`
  }, timerState.active ? /*#__PURE__*/React.createElement(Icons.Pause, {
    size: 20,
    fill: "currentColor"
  }) : /*#__PURE__*/React.createElement(Icons.Play, {
    size: 20,
    fill: "currentColor",
    className: "ml-0.5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 text-center text-2xl font-black font-mono tracking-tight text-duo-text"
  }, Math.floor(timerState.time / 60), ":", (timerState.time % 60).toString().padStart(2, '0')), /*#__PURE__*/React.createElement("button", {
    onClick: resetBreakTimer,
    className: `w-12 h-12 rounded-xl flex items-center justify-center transition-all ${btn3DClass} bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200`,
    title: "\u30EA\u30BB\u30C3\u30C8"
  }, /*#__PURE__*/React.createElement(Icons.RotateCcw, {
    size: 18
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto p-4 space-y-6 border-t-2 border-duo-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-black text-gray-400 uppercase tracking-widest px-2"
  }, "Lists"), /*#__PURE__*/React.createElement("button", {
    className: `w-full p-4 flex items-center gap-4 rounded-2xl font-black ${btn3DClass} ${activeListId === 'default' ? 'bg-duo-blue/10 text-duo-blue border-duo-blue/20' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-500'}`,
    onClick: () => {
      setActiveListId('default');
      if (isMobile) setIsSidebarOpen(false);
    }
  }, /*#__PURE__*/React.createElement(Icons.Check, {
    size: 24
  }), "\u30DE\u30A4\u30BF\u30B9\u30AF"), /*#__PURE__*/React.createElement("button", {
    className: `w-full p-4 flex items-center gap-4 rounded-2xl font-black ${btn3DClass} ${activeListId === 'deadline' ? 'bg-duo-pink/10 text-duo-pink border-duo-pink/20' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-500'}`,
    onClick: () => {
      setActiveListId('deadline');
      if (isMobile) setIsSidebarOpen(false);
    }
  }, /*#__PURE__*/React.createElement(Icons.Calendar, {
    size: 24
  }), "\u7DE0\u5207\u30EA\u30B9\u30C8"), /*#__PURE__*/React.createElement("button", {
    className: `w-full p-4 flex items-center gap-4 rounded-2xl font-black ${btn3DClass} ${activeListId === 'growthGraph' ? 'bg-green-100 text-green-600 border-green-200' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-500'}`,
    onClick: () => {
      setActiveListId('growthGraph');
      if (isMobile) setIsSidebarOpen(false);
    }
  }, "\uD83D\uDCC8 \u6210\u9577\u30B0\u30E9\u30D5")), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-2"
  }, "MVP\u958B\u767A\u6307\u6A19"), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-gray-600"
  }, "\uD83C\uDFAF \u4F5C\u6210\u30BF\u30B9\u30AF\u6570"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-black text-blue-600"
  }, stats.tasksCreated || 0)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-gray-600"
  }, "\u2728 \u6700\u9069\u5316\u56DE\u6570"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-black text-purple-600"
  }, stats.tasksPurged || 0)), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-2 border-t border-blue-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-bold text-gray-500 text-center"
  }, stats.tasksPurged >= 3 ? "🏆 マスター級の最適化！" : stats.tasksPurged >= 1 ? "👍 MVP思考が身についています" : "💡 不要なタスクはパージしよう")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-2"
  }, "\u958B\u767A\u30ED\u30B0"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-xl p-4 border-2 border-gray-200 h-56 overflow-y-auto space-y-3"
  }, stats.devLogs && stats.devLogs.length > 0 ? stats.devLogs.map((log, i) => /*#__PURE__*/React.createElement("div", {
    key: log.id,
    className: `text-xs font-medium leading-relaxed border-l-4 border-l-gray-300 pl-3 py-2 ${i === 0 ? 'animate-log-fade bg-blue-50' : 'bg-gray-50'} rounded-r ${log.colorClass}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500 block mb-1 font-bold text-[11px]"
  }, log.date), /*#__PURE__*/React.createElement("span", {
    className: "block"
  }, log.text))) : /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-500 text-center py-6 font-medium"
  }, "\u30ED\u30B0\u304C\u307E\u3060\u3042\u308A\u307E\u305B\u3093"))), /*#__PURE__*/React.createElement("div", {
    className: "pt-6 border-t-2 border-duo-gray/50 pb-20"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsShopOpen(!isShopOpen),
    className: `w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-black text-gray-500 bg-white border-2 border-transparent hover:bg-gray-50 ${isShopOpen ? 'text-duo-text' : ''} ${juicyBtnClass}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs uppercase tracking-widest"
  }, /*#__PURE__*/React.createElement(Icons.ShoppingBag, {
    size: 18
  }), " Gem Shop"), isShopOpen ? /*#__PURE__*/React.createElement(Icons.ChevronDown, {
    size: 18
  }) : /*#__PURE__*/React.createElement(Icons.ChevronRight, {
    size: 18
  })), isShopOpen && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-3 animate-in fade-in slide-in-from-top-1 pb-20 px-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-3 border-2 border-gray-200 border-b-4 rounded-2xl flex justify-between items-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all bg-white hover:scale-105 active:scale-95`,
    onClick: () => buyItem(200, () => setStats(s => ({
      ...s,
      streakFreeze: s.streakFreeze + 1
    })))
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-black text-sm text-duo-blue flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icons.Snowflake, {
    size: 16
  }), " \u9023\u7D9A\u30D5\u30EA\u30FC\u30BA (", stats.streakFreeze, ")"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-400 font-bold"
  }, "Streak\u30921\u65E5\u5B88\u308B")), /*#__PURE__*/React.createElement("div", {
    className: "text-duo-pink font-black text-sm"
  }, "200\uD83D\uDC8E")), /*#__PURE__*/React.createElement("div", {
    className: `p-3 border-2 border-gray-200 border-b-4 rounded-2xl flex justify-between items-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all hover:scale-105 active:scale-95 ${stats.mvpScrutinizerActive ? 'bg-blue-50 border-blue-200' : 'bg-white'}`,
    onClick: () => !stats.mvpScrutinizerActive && buyItem(100, () => setStats(s => ({
      ...s,
      mvpScrutinizerActive: true
    })))
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-black text-sm text-duo-blue flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icons.Search, {
    size: 16
  }), " MVP Scrutinizer"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-400 font-bold"
  }, "\u53F3\u30AF\u30EA\u30C3\u30AF\u3067\u30BF\u30B9\u30AF\u3092\u30D1\u30FC\u30B8")), !stats.mvpScrutinizerActive ? /*#__PURE__*/React.createElement("div", {
    className: "text-duo-pink font-black text-sm"
  }, "100\uD83D\uDC8E") : /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-black text-blue-600 bg-blue-100 px-2 py-1 rounded-lg"
  }, "ON")), /*#__PURE__*/React.createElement("div", {
    className: `p-3 border-2 border-gray-200 border-b-4 rounded-2xl flex justify-between items-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all hover:scale-105 active:scale-95 ${stats.devOathActive ? 'bg-purple-50 border-purple-200' : 'bg-white'}`,
    onClick: () => !stats.devOathActive && buyItem(50, () => setStats(s => ({
      ...s,
      devOathActive: true
    })))
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-black text-sm text-purple-600 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icons.Shield, {
    size: 16
  }), " Dev's Oath"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-400 font-bold"
  }, "\u660E\u65E5\u306E\u30BF\u30B9\u30AF\u5B8C\u4E86\u3092\u8A93\u3046")), !stats.devOathActive ? /*#__PURE__*/React.createElement("div", {
    className: "text-duo-pink font-black text-sm"
  }, "50\uD83D\uDC8E") : /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-black text-purple-600 bg-purple-100 px-2 py-1 rounded-lg"
  }, "\u8A93\u7D04\u6E08")), /*#__PURE__*/React.createElement("div", {
    className: `p-3 border-2 border-gray-200 border-b-4 rounded-2xl flex justify-between items-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all hover:scale-105 active:scale-95 ${Date.now() < stats.flowCapacitorEndTime ? 'bg-yellow-50 border-yellow-200' : 'bg-white'}`,
    onClick: () => Date.now() > stats.flowCapacitorEndTime && buyItem(150, () => setStats(s => ({
      ...s,
      flowCapacitorEndTime: Date.now() + 15 * 60 * 1000
    })))
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-black text-sm text-yellow-600 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icons.Zap, {
    size: 16
  }), " Flow Capacitor"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-400 font-bold"
  }, "15\u5206\u9593\u3001\u6F14\u51FA\u78BA\u7387100%")), Date.now() > stats.flowCapacitorEndTime ? /*#__PURE__*/React.createElement("div", {
    className: "text-duo-pink font-black text-sm"
  }, "150\uD83D\uDC8E") : /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-black text-yellow-600 bg-yellow-100 px-2 py-1 rounded-lg"
  }, "Active")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 border-2 border-gray-200 border-b-4 rounded-2xl flex justify-between items-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all bg-white hover:scale-105 active:scale-95",
    onClick: () => buyItem(150, () => setStats(s => ({
      ...s,
      resurrectionTickets: s.resurrectionTickets + 1
    })))
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-black text-sm text-gray-600 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icons.Ticket, {
    size: 16
  }), " \u8607\u751F\u30C1\u30B1\u30C3\u30C8 (", stats.resurrectionTickets, ")"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-gray-400 font-bold"
  }, "Streak\u5207\u308C\u3092\u5FA9\u6D3B")), /*#__PURE__*/React.createElement("div", {
    className: "text-duo-pink font-black text-sm"
  }, "150\uD83D\uDC8E")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 text-[10px] font-black text-gray-400 px-2 uppercase tracking-widest"
  }, "THEMES"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-3 border-2 border-b-4 rounded-2xl text-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all hover:scale-105 active:scale-95 ${stats.currentTheme === 'cherry' ? 'border-pink-400 bg-pink-50' : 'border-gray-200 bg-white'}`,
    onClick: () => unlockTheme('cherry', 500)
  }, /*#__PURE__*/React.createElement(Icons.Cherry, {
    size: 24,
    className: "mx-auto text-pink-400 mb-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-bold text-gray-600"
  }, "\u685C\u5439\u96EA"), !stats.themes.includes('cherry') && /*#__PURE__*/React.createElement("div", {
    className: "text-duo-pink text-xs font-black mt-1"
  }, "500\uD83D\uDC8E")), /*#__PURE__*/React.createElement("div", {
    className: `p-3 border-2 border-b-4 rounded-2xl text-center cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all hover:scale-105 active:scale-95 ${stats.currentTheme === 'fireworks' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'}`,
    onClick: () => unlockTheme('fireworks', 500)
  }, /*#__PURE__*/React.createElement(Icons.Sparkles, {
    size: 24,
    className: "mx-auto text-blue-400 mb-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] font-bold text-gray-600"
  }, "\u82B1\u706B"), !stats.themes.includes('fireworks') && /*#__PURE__*/React.createElement("div", {
    className: "text-duo-pink text-xs font-black mt-1"
  }, "500\uD83D\uDC8E"))))), !authLoading && /*#__PURE__*/React.createElement("div", {
    className: "pt-6 border-t-2 border-duo-gray/50 pb-6"
  }, user ? /*#__PURE__*/React.createElement("div", {
    className: "px-4 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs text-gray-500"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, "\uD83D\uDC64"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium truncate"
  }, user.email)), /*#__PURE__*/React.createElement("div", {
    className: `flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold ${syncStatus === 'synced' ? 'bg-green-50 text-green-600' : syncStatus === 'syncing' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`
  }, /*#__PURE__*/React.createElement("span", null, syncStatus === 'synced' && '✓ 同期完了', syncStatus === 'syncing' && '⟳ 同期中...', syncStatus === 'error' && '! 同期エラー')), /*#__PURE__*/React.createElement("button", {
    onClick: handleLogout,
    className: "w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-600 transition-colors"
  }, /*#__PURE__*/React.createElement("span", null, "\u30ED\u30B0\u30A2\u30A6\u30C8"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDEAA"))) : /*#__PURE__*/React.createElement("div", {
    className: "px-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowAuthModal(true),
    className: "w-full flex items-center justify-center gap-2 px-4 py-3 bg-duo-blue hover:bg-duo-blueBorder text-white rounded-xl text-sm font-bold transition-colors border-b-4 border-duo-blueBorder active:border-b-2 active:translate-y-[2px]"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD10"), /*#__PURE__*/React.createElement("span", null, "\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u540C\u671F")), /*#__PURE__*/React.createElement("p", {
    className: "mt-2 text-[10px] text-gray-400 text-center"
  }, "\u30B9\u30DE\u30DB\u3068PC\u3067\u30C7\u30FC\u30BF\u3092\u540C\u671F"))))), /*#__PURE__*/React.createElement("main", {
    className: `flex-1 pt-20 transition-all duration-300 ${isSidebarOpen && !isMobile ? 'pl-72' : 'pl-0'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full overflow-y-auto px-6 md:px-20 lg:px-32 pb-40"
  }, activeListId === 'growthGraph' ? /*#__PURE__*/React.createElement(GrowthGraph, {
    history: stats.dailyCompletionHistory || {},
    onClose: () => setActiveListId('default')
  }) : /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto pt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-6"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold tracking-tight text-gray-500"
  }, activeListId === 'default' ? 'マイタスク' : '締切リスト'), notificationPermission !== 'granted' && /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      if (window.requestNotificationPermission) {
        await window.requestNotificationPermission();
        // 許可状態を更新
        if (typeof Notification !== 'undefined') {
          setNotificationPermission(Notification.permission);
        }
      }
    },
    className: "ml-auto p-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors",
    title: "\u901A\u77E5\u3092\u8A31\u53EF"
  }, /*#__PURE__*/React.createElement(Icons.Bell, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3 px-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, stats.streak > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "text-green-600 font-bold"
  }, "\uD83D\uDCC8 Day ", stats.streak, ":"), ' ', /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-gray-700"
  }, Math.pow(1.01, stats.streak).toFixed(2), "\u500D"), "\u306E\u81EA\u5206\u3002 \u3042\u3068", /*#__PURE__*/React.createElement("span", {
    className: "text-blue-600 font-bold"
  }, 365 - stats.streak > 0 ? 365 - stats.streak : 0, "\u65E5"), "\u306737\u500D\u3002") : /*#__PURE__*/React.createElement(React.Fragment, null, "\uD83D\uDCC8 \u6BCE\u65E51%\u306E\u6210\u9577\u3067\u30011\u5E74\u5F8C", /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-green-600"
  }, "37\u500D"), "\u3002\u4ECA\u65E5\u304B\u3089\u59CB\u3081\u3088\u3046\u3002"))), !focusMode && /*#__PURE__*/React.createElement("div", {
    className: `mb-8 bg-gray-100 border-2 border-gray-200 rounded-xl p-1 shadow-sm ${btn3DClass} focus-within:translate-y-[4px] focus-within:border-b-0`
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full h-full flex items-center px-3 py-2 gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Plus, {
    className: "text-gray-400 opacity-80",
    size: 20
  }), /*#__PURE__*/React.createElement("textarea", {
    className: "bg-transparent outline-none flex-1 font-medium text-base text-gray-700 placeholder-gray-400 resize-none min-h-[32px] max-h-[200px]",
    placeholder: "MVP\u5FC5\u9808\u6A5F\u80FD\u306E\u307F\u3092\u8FFD\u52A0",
    rows: "1",
    onInput: e => {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    },
    onKeyDown: e => {
      // 📱 モバイル: Enterで送信、Shift+Enterで改行
      // 💻 PC: Ctrl+Enterで送信、Enterで改行
      const shouldSubmit = isMobile ? e.key === 'Enter' && !e.shiftKey : (e.ctrlKey || e.metaKey) && e.key === 'Enter';
      if (shouldSubmit) {
        e.preventDefault();
        const value = e.target.value.trim();
        if (!value) return;

        // Split by newlines and semicolons
        const taskTitles = value.split(/[\n;]/).map(t => t.trim()).filter(t => t);
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
        setStats(s => ({
          ...s,
          tasksCreated: s.tasksCreated + newTasks.length
        }));
        if (newTasks.length > 1) {
          setToastMessage(`✨ ${newTasks.length} tasks added`);
        }
        e.target.value = '';
        e.target.style.height = 'auto';
      }
    }
  }))), stats.isBurning && stats.tempGems > 0 && (() => {
    const remainingPercent = stats.tempGems / stats.initialTempGems * 100;

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
    return /*#__PURE__*/React.createElement("div", {
      className: `mb-4 px-2 ${screenShake ? 'animate-[screen-shake_0.3s_ease-in-out_infinite]' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner ${barFlash ? 'ring-2 ring-red-500 ring-opacity-75' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: `h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-300 relative ${barFlash ? 'animate-pulse' : ''}`,
      style: {
        width: `${remainingPercent}%`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `absolute inset-0 bg-white/20 ${barFlash ? 'animate-ping' : 'animate-pulse'}`
    }))), /*#__PURE__*/React.createElement("div", {
      className: `text-center text-xs font-bold mt-1 ${messageClass} ${barFlash ? 'text-sm' : ''}`
    }, burnMessage));
  })(), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 relative"
  }, (() => {
    // セクションヘッダーを含む全タスクからセクション構造を計算
    const sections = [];
    let currentSection = {
      header: null,
      tasks: []
    };
    for (const task of incomplete) {
      if (task.isSectionHead) {
        if (currentSection.header !== null || currentSection.tasks.length > 0) {
          sections.push(currentSection);
        }
        // isSectionHeadタスク自身もタスクリストに含める
        currentSection = {
          header: task,
          tasks: [task]
        };
      } else {
        currentSection.tasks.push(task);
      }
    }
    if (currentSection.header !== null || currentSection.tasks.length > 0) {
      sections.push(currentSection);
    }
    const visibleSections = focusMode ? sections.filter(s => s.tasks.length > 0).slice(0, 1) : sections.filter(s => s.tasks.length > 0);
    return visibleSections.map((section, sectionIndex) => {
      const sectionNum = sectionIndex + 1;
      // セクション名はheaderのsectionNameプロパティから取得（なければSection Nをフォールバック）
      const sectionName = section.header?.sectionName || section.tasks.find(t => t.sectionName)?.sectionName || `Section ${sectionNum}`;
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: `section-${sectionIndex}`
      }, /*#__PURE__*/React.createElement("div", {
        className: "py-4 flex items-center justify-center gap-2",
        "data-section": sectionNum
      }, /*#__PURE__*/React.createElement("div", {
        className: `font-black text-xs px-4 py-1 rounded-full uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform ${sectionNum === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`,
        onContextMenu: e => {
          e.preventDefault();
          if (section.header) {
            const newName = prompt('セクション名を入力してください:', sectionName);
            if (newName !== null && newName.trim()) {
              updateTask(section.header.id, {
                sectionName: newName.trim()
              });
            }
          }
        },
        title: "\u53F3\u30AF\u30EA\u30C3\u30AF\u3067\u540D\u524D\u3092\u5909\u66F4"
      }, sectionName), sectionNum === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, !focusMode && /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-1 bg-yellow-100 border-2 border-yellow-300 rounded-full px-3 py-1 animate-pulse"
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-lg"
      }, "\uD83D\uDE80"), /*#__PURE__*/React.createElement("span", {
        className: "text-[10px] font-black text-yellow-700 uppercase tracking-wider"
      }, "MVP Focus")), /*#__PURE__*/React.createElement("button", {
        onClick: () => setFocusMode(!focusMode),
        className: `font-black text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider transition-all border-2 ${juicyBtnClass} ${focusMode ? 'bg-purple-100 border-purple-300 text-purple-700 shadow-md' : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300'}`,
        title: focusMode ? '全タスク表示に切替' : '集中モード：1タスクだけ表示'
      }, focusMode ? '🎯 集中' : '📋 全部'))), !focusMode && sectionNum === 1 && section.tasks.length > 0 && (() => {
        const currentSectionId = section.tasks[0]?.sectionId;
        const currentSectionAllTasks = tasks.filter(t => t.sectionId === currentSectionId);
        const completedCount = currentSectionAllTasks.filter(t => t.completed).length;
        const incompleteCount = currentSectionAllTasks.filter(t => !t.completed).length;
        const sectionTotal = currentSectionAllTasks.length;
        const progressPercent = sectionTotal > 0 ? Math.round(completedCount / sectionTotal * 100) : 0;
        const nextProgressPercent = sectionTotal > 0 ? Math.round((completedCount + 1) / sectionTotal * 100) : 0;
        const progressDelta = nextProgressPercent - progressPercent;
        return /*#__PURE__*/React.createElement("div", {
          className: "px-4 pb-3"
        }, /*#__PURE__*/React.createElement("div", {
          className: "relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-2"
        }, /*#__PURE__*/React.createElement("div", {
          className: "h-full bg-gradient-to-r from-blue-400 to-blue-500",
          style: {
            width: `${progressPercent}%`,
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: "absolute inset-0 bg-white/20 animate-pulse"
        })), incompleteCount > 0 && /*#__PURE__*/React.createElement("div", {
          className: "absolute top-0 h-full overflow-hidden",
          style: {
            left: `${progressPercent}%`,
            width: `${progressDelta}%`,
            background: 'repeating-linear-gradient(45deg, rgb(251, 191, 36), rgb(251, 191, 36) 8px, rgb(234, 179, 8) 8px, rgb(234, 179, 8) 16px)',
            boxShadow: 'inset 0 0 10px rgba(255, 215, 0, 0.6), 0 0 15px rgba(251, 191, 36, 0.4)',
            transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, width 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
          }
        })), /*#__PURE__*/React.createElement("div", {
          className: "text-center text-xs text-gray-600 font-bold"
        }, section.tasks.length === 1 ? /*#__PURE__*/React.createElement("span", {
          className: "text-green-600"
        }, "\uD83C\uDF81 \u3042\u30681\u3064\u3067\u9054\u6210\uFF01\u5B8C\u4E86\u664250\uD83D\uDC8E\u30DC\u30FC\u30CA\u30B9") : /*#__PURE__*/React.createElement("span", null, "\u3042\u3068", section.tasks.length, "\u30BF\u30B9\u30AF\u306750\uD83D\uDC8E")));
      })(), (() => {
        const tasksToShow = focusMode && sectionNum === 1 ? section.tasks.slice(0, 1) : section.tasks;

        // 集中モード: ミッションカード風表示
        if (focusMode && sectionNum === 1 && tasksToShow.length > 0) {
          const currentTask = tasksToShow[0];
          const nextTask = section.tasks.length > 1 ? section.tasks[1] : null;
          const totalTasks = section.tasks.length;
          const completedInSection = tasks.filter(t => t.sectionId === currentTask.sectionId && t.completed).length;
          const allInSection = tasks.filter(t => t.sectionId === currentTask.sectionId).length;
          const focusCardRef = React.createRef();

          // 報酬プレビュー計算
          const isSection1 = currentTask.sectionId === 1;
          const remainingAfterThis = totalTasks - 1;
          const previewReward = remainingAfterThis === 0 ? 50 : isSection1 ? 10 : 2;
          return /*#__PURE__*/React.createElement("div", {
            className: "px-2 py-2"
          }, /*#__PURE__*/React.createElement("div", {
            ref: focusCardRef,
            className: "relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-2 border-blue-200 rounded-2xl p-5 shadow-lg"
          }, /*#__PURE__*/React.createElement("div", {
            className: "flex items-center justify-between mb-4"
          }, /*#__PURE__*/React.createElement("span", {
            className: "text-[10px] font-black text-blue-400 uppercase tracking-widest"
          }, "Step ", completedInSection + 1, " / ", allInSection), /*#__PURE__*/React.createElement("span", {
            className: "text-[10px] font-bold text-amber-500 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5"
          }, "+", previewReward, "\uD83D\uDC8E")), /*#__PURE__*/React.createElement("div", {
            onDragOver: e => handleDragOver(e, currentTask),
            onDrop: e => handleDrop(e, currentTask)
          }, /*#__PURE__*/React.createElement(TaskItem, {
            task: currentTask,
            isMobile: isMobile,
            onXpGain: handleXpGain,
            onToggle: () => completeTask(currentTask.id),
            onUpdate: updateTask,
            onDelete: id => deleteTask(id),
            onDragStart: handleDragStart,
            isDragging: draggedTaskId === currentTask.id,
            isDeadlineView: activeListId === 'deadline',
            activeTheme: stats.currentTheme,
            onContextMenu: handleContextMenu,
            isFocusedSection: true,
            isLastInSection: true,
            setRewardEffect: setRewardEffect,
            stats: stats,
            setStats: setStats,
            setToastMessage: setToastMessage,
            onMoveToSection1: undefined
          })), /*#__PURE__*/React.createElement("button", {
            onClick: () => {
              const checkbox = focusCardRef.current?.querySelector('[class*="w-6 h-6 rounded-xl"]');
              if (checkbox) {
                checkbox.parentElement.click();
              }
            },
            className: `w-full mt-4 py-3 rounded-xl font-black text-sm tracking-wide transition-all ${juicyBtnClass} bg-gradient-to-r from-blue-500 to-blue-600 text-white border-2 border-blue-400 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95`
          }, "\u5B8C\u4E86\u3059\u308B"), /*#__PURE__*/React.createElement("p", {
            className: "text-center text-[11px] text-gray-400 font-bold mt-3"
          }, remainingAfterThis === 0 ? '🎉 ラストタスク！これで完了' : remainingAfterThis === 1 ? '✨ あと2つだけ' : '👆 タップするだけでOK')), nextTask && /*#__PURE__*/React.createElement("div", {
            className: "mt-3 px-4 py-2.5 flex items-center gap-3 opacity-40"
          }, /*#__PURE__*/React.createElement("div", {
            className: "w-4 h-4 rounded-lg border-2 border-gray-300 flex-shrink-0"
          }), /*#__PURE__*/React.createElement("span", {
            className: "text-sm font-bold text-gray-400 truncate"
          }, "\u6B21: ", nextTask.title)), totalTasks > 1 && /*#__PURE__*/React.createElement("div", {
            className: "flex items-center justify-center gap-2 pt-3"
          }, section.tasks.map((_, i) => /*#__PURE__*/React.createElement("div", {
            key: i,
            className: `rounded-full transition-all ${i === 0 ? 'w-6 h-2 bg-blue-500 rounded-full' : 'w-2 h-2 bg-gray-300'}`
          }))));
        }
        return tasksToShow.map((t, taskIndex) => {
          const isLast = taskIndex === tasksToShow.length - 1;
          return /*#__PURE__*/React.createElement("div", {
            key: t.id,
            onDragOver: e => handleDragOver(e, t),
            onDrop: e => handleDrop(e, t)
          }, /*#__PURE__*/React.createElement(TaskItem, {
            task: t,
            isMobile: isMobile,
            onXpGain: handleXpGain,
            onToggle: () => completeTask(t.id),
            onUpdate: updateTask,
            onDelete: id => deleteTask(id),
            onDragStart: handleDragStart,
            isDragging: draggedTaskId === t.id,
            isDeadlineView: activeListId === 'deadline',
            activeTheme: stats.currentTheme,
            onContextMenu: handleContextMenu,
            isFocusedSection: sectionNum === 1,
            isLastInSection: isLast,
            setRewardEffect: setRewardEffect,
            stats: stats,
            setStats: setStats,
            setToastMessage: setToastMessage,
            onMoveToSection1: sectionNum !== 1 ? moveToSection1 : undefined
          }));
        });
      })());
    });
  })()), !focusMode && completed.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-16 mb-20"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsCompletedOpen(!isCompletedOpen),
    className: `flex items-center gap-2 text-sm font-black text-gray-400 hover:text-gray-600 px-4 py-3 rounded-xl transition-colors bg-gray-50 border-2 border-transparent hover:border-gray-200 ${juicyBtnClass}`
  }, isCompletedOpen ? /*#__PURE__*/React.createElement(Icons.ChevronDown, {
    size: 18
  }) : /*#__PURE__*/React.createElement(Icons.ChevronRight, {
    size: 18
  }), "\u5B8C\u4E86\u6E08\u307F (", completed.length, ")"), isCompletedOpen && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-2 opacity-75"
  }, completed.map(t => /*#__PURE__*/React.createElement(TaskItem, {
    key: t.id,
    task: t,
    isMobile: isMobile,
    onXpGain: handleXpGain,
    onToggle: () => updateTask(t.id, {
      completed: false
    }),
    onUpdate: updateTask,
    onDelete: id => deleteTask(id),
    onDragStart: null,
    isDragging: false,
    isDeadlineView: activeListId === 'deadline',
    activeTheme: stats.currentTheme,
    setRewardEffect: setRewardEffect,
    stats: stats,
    setStats: setStats,
    setToastMessage: setToastMessage
  }))))))), toastMessage && /*#__PURE__*/React.createElement(Toast, {
    message: toastMessage,
    onClose: closeToast
  }), floatingTexts.map(t => /*#__PURE__*/React.createElement(FloatingText, {
    key: t.id,
    x: t.x,
    y: t.y,
    text: t.text,
    color: t.color,
    scale: t.scale
  })), rewardEffect, showIgnition && /*#__PURE__*/React.createElement(IgnitionModal, null), showStreakWarning && !stats.streakBroken && /*#__PURE__*/React.createElement(StreakWarningBanner, {
    streak: stats.streak,
    onDismiss: () => setShowStreakWarning(false)
  }), contextMenu && /*#__PURE__*/React.createElement(ContextMenu, {
    x: contextMenu.x,
    y: contextMenu.y,
    onDivide: toggleSectionBreak,
    onMerge: toggleSectionBreak,
    showMerge: tasks.findIndex(t => t.id === contextMenu.task.id) < tasks.length - 1 && tasks[tasks.findIndex(t => t.id === contextMenu.task.id) + 1].isSectionHead,
    showPurge: stats.mvpScrutinizerActive,
    onPurge: purgeTask
  }), showAuthModal && /*#__PURE__*/React.createElement(AuthModal, {
    onClose: () => setShowAuthModal(false),
    onGoogleLogin: handleGoogleLogin,
    onEmailLogin: handleEmailLogin
  }), /*#__PURE__*/React.createElement("style", null, `
                        @keyframes warp-fade-in { from { opacity: 0; } to { opacity: 1; } }
                        @keyframes warp-lines { from { opacity: 0; transform: scale(1); } to { opacity: 0.8; transform: scale(3); } }
                        @keyframes warp-ring { from { opacity: 0; transform: scale(0); border-width: 100px; } to { opacity: 0.5; transform: scale(1.5); border-width: 0px; } }
                        @keyframes warp-text { from { opacity: 0; transform: scale(3); } to { opacity: 1; transform: scale(1); } }
                    `));
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
