module.exports = {
    content: ['./index.html', './app.js'],
    safelist: [
        'animate-[screen-shake_0.3s_ease-in-out_3]',
        'animate-[screen-shake_0.3s_ease-in-out_infinite]',
        'z-[70]', 'z-[80]', 'z-[90]', 'z-[100]', 'z-[120]', 'z-[150]',
        'z-[200]', 'z-[240]', 'z-[250]', 'z-[275]', 'z-[280]', 'z-[282]',
        'z-[290]', 'z-[295]', 'z-[300]', 'z-[310]', 'z-[350]', 'z-[352]',
        'z-[360]', 'z-[400]', 'z-[450]', 'z-[500]', 'z-[9999]',
        'h-[32px]', 'h-[50vh]', 'h-[120px]', 'h-[200px]',
        'w-[200vw]', 'w-[500px]',
        'b-[4px]', 'border-[3px]',
        'perspective-[1000px]', 'scale-[2]',
        'shadow-[0_0_10px_rgba(255,215,0,0.5)]',
        'shadow-[0_0_20px_rgba(255,215,0,1)]',
        'shadow-[0_4px_20px_rgba(0,0,0,0.8)]',
        'text-[#e5e5e5]', 'text-[10px]', 'text-[11px]', 'text-[12rem]',
        'tracking-[0.2em]',
        'y-[2px]', 'y-[4px]',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'Noto Sans JP', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace']
            },
            colors: {
                google: {
                    blue: '#1a73e8', red: '#ea4335', yellow: '#fbbc04', green: '#34a853',
                    gray: '#f1f3f4', text: '#202124', textSec: '#5f6368', hover: '#f8f9fa',
                    selected: '#e8f0fe', selectedText: '#1967d2'
                },
                duo: {
                    green: '#58cc02', border: '#46a302', greenHighlight: '#89e219',
                    blue: '#1cb0f6', blueBorder: '#1899d6',
                    orange: '#ff9600', orangeBorder: '#cc7900',
                    pink: '#ff4b4b', pinkBorder: '#d42c2c',
                    gray: '#e5e5e5', lightGray: '#f7f7f7', text: '#4b4b4b',
                    gold: '#FFD700', silver: '#C0C0C0'
                }
            },
            boxShadow: {
                'card': '0 2px 0 0 #e5e5e5',
                'duo': '0 4px 0 0 #e5e5e5',
                'floating': '0 6px 16px 0 rgba(0,0,0,0.2)',
                'glow': '0 0 15px rgba(255, 255, 255, 0.8)',
            },
            animation: {
                'toast-in': 'toast-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'float-up': 'float-up 1s ease-out forwards',
                'spring': 'spring 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                'ignition': 'ignition 1.5s ease-out forwards',
                'scale-in': 'scale-in 0.2s ease-out forwards',
                'log-fade': 'log-fade 3s ease-out forwards',
                'checkbox-pop': 'checkbox-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                'bounce-hard': 'bounce-hard 0.5s infinite',
            },
            keyframes: {
                'bounce-hard': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px) scale(1.1)' } },
                'toast-in': { '0%': { transform: 'translate(-50%, 100%)', opacity: 0 }, '100%': { transform: 'translate(-50%, 0)', opacity: 1 } },
                'float-up': { '0%': { transform: 'translateY(0) scale(1)', opacity: 1 }, '100%': { transform: 'translateY(-60px) scale(1.1)', opacity: 0 } },
                'spring': { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(0.95)' }, '100%': { transform: 'scale(1)' } },
                'ignition': { '0%': { opacity: 0, transform: 'scale(0.8)' }, '20%': { opacity: 1, transform: 'scale(1.2)' }, '100%': { opacity: 0, transform: 'scale(2)' } },
                'scale-in': { '0%': { transform: 'scale(0.8)', opacity: 0 }, '100%': { transform: 'scale(1)', opacity: 1 } },
                'log-fade': { '0%': { color: '#FFD700', transform: 'translateX(-10px)' }, '20%': { color: '#FFD700', transform: 'translateX(0)' }, '100%': { color: '#4b5563' } },
                'checkbox-pop': { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.5)' }, '100%': { transform: 'scale(1)' } }
            }
        }
    }
}
