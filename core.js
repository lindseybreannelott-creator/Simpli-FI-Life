// --- CORE.JS: SHARED COMPONENTS ---
const { useState, useEffect, useRef } = React;
const { HashRouter, Routes, Route, Link, useLocation, useNavigate } = ReactRouterDOM;

// --- 1. SHARED TOOLS ---
const usePageTitle = (title) => {
    useEffect(() => { document.title = `${title} | Simpli-FI Life`; }, [title]);
};

// --- 2. ICON COMPONENT (Self-contained SVGs) ---
const Icon = ({ name, className }) => {
    const icons = {
        "menu": <path d="M4 6h16M4 12h16M4 18h16" />,
        "x": <path d="M18 6 6 18M6 6l12 12" />,
        "instagram": <><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></>,
        "youtube": <><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></>,
        "arrow-right": <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
        "chevron-left": <polyline points="15 18 9 12 15 6"/>,
        "chevron-right": <polyline points="9 18 15 12 9 6"/>,
        "building-2": <><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></>,
        "home": <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
        "bar-chart": <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
        "check": <polyline points="20 6 9 17 4 12"/>,
        "gem": <><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></>
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            {icons[name] || null}
        </svg>
    );
};

// --- 3. GRID BEAMS ANIMATION ---
const GridBeams = ({ beamColor = "182, 188, 255", spawnRate = 200, beamWidth = 1 }) => {
    const [beams, setBeams] = useState([]);
    useEffect(() => {
        let count = 0; let active = true;
        const spawn = () => {
            if (!active) return;
            const id = count++;
            const beamDuration = 3.5 + Math.random() * 2.0; 
            const isHorizontal = Math.random() > 0.5;
            setBeams(prev => [...prev, { 
                id, isHorizontal, isReverse: Math.random() > 0.5, 
                offset: Math.floor(Math.random() * 100) * 40, 
                duration: beamDuration, color: (id % 4 === 0) ? "214, 227, 30" : beamColor 
            }]);
            setTimeout(() => { if (active) setBeams(prev => prev.filter(b => b.id !== id)); }, beamDuration * 1000);
        };
        spawn(); spawn(); spawn();
        const interval = setInterval(spawn, spawnRate);
        return () => { active = false; clearInterval(interval); };
    }, [beamColor, spawnRate]);
    
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {beams.map(b => (
                <div key={b.id} className="absolute" style={{
                    height: b.isHorizontal ? `${beamWidth}px` : '400px', 
                    width: b.isHorizontal ? '400px' : `${beamWidth}px`,
                    top: b.isHorizontal ? `${b.offset}px` : (b.isReverse ? '100%' : '-400px'),
                    left: !b.isHorizontal ? `${b.offset}px` : (b.isReverse ? '100%' : '-400px'),
                    filter: `drop-shadow(0 0 6px rgba(${b.color}, 0.6))`,
                    background: b.isHorizontal 
                        ? `linear-gradient(90deg, transparent, rgba(${b.color}, 1), transparent)` 
                        : `linear-gradient(180deg, transparent, rgba(${b.color}, 1), transparent)`,
                    animation: `${b.isHorizontal ? (b.isReverse ? 'beam-h-rev' : 'beam-h') : (b.isReverse ? 'beam-v-rev' : 'beam-v')} ${b.duration}s linear forwards`
                }} />
            ))}
        </div>
    );
};

// --- 4. LOADING SCREEN ---
const LoadingScreen = ({ onComplete }) => {
    useEffect(() => { 
        const t = setTimeout(onComplete, 4800); 
        return () => clearTimeout(t); 
    }, [onComplete]);
    
    return (
        <div className="fixed inset-0 z-[100] bg-brand-base grid place-items-center loader-exit overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
            <GridBeams spawnRate={150} />
            <div className="relative z-20 loading-logo-reveal text-center px-4">
                <h1 className="font-display text-4xl md:text-6xl tracking-[0.25em] text-brand-dark uppercase">
                    <span className="font-bold">SIMPLI-FI</span> <span className="font-light text-brand-medium">LIFE</span>
                </h1>
            </div>
        </div>
    );
};

// --- 5. NAVBAR ---
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const loc = useLocation();
    const isDark = loc.pathname === '/professional-spaces';
    
    return (
        <nav className="absolute top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 h-[80px] flex justify-between items-center">
                <Link to="/" className="font-display font-bold text-2xl md:text-3xl tracking-tight flex items-center h-full pl-5 md:pl-4 transition-transform active:scale-95">
                    <span className={isDark ? 'text-brand-base' : 'text-brand-dark'}>
                        SIMPLI-FI <span className="font-light opacity-70">LIFE</span>
                    </span>
                </Link>
                <div className="hidden md:flex items-center space-x-10 h-full">
                    {['HOME', 'PROFESSIONAL SPACES', 'RESIDENTIAL SPACES'].map((name) => (
                        <Link key={name} to={name === 'HOME' ? '/' : `/${name.toLowerCase().replace(' ', '-')}`} 
                            className={`text-[15px] font-display font-medium tracking-[0.1em] uppercase transition-all duration-300 leading-none flex items-center ${isDark ? 'text-brand-base hover:text-brand-periwinkle-light' : 'text-brand-medium hover:text-brand-periwinkle'}`}>
                            {name}
                        </Link>
                    ))}
                    <Link to="/booking" className="bg-brand-lemon text-brand-dark px-7 py-2 rounded-full font-display font-bold text-sm tracking-widest uppercase hover:bg-brand-periwinkle hover:text-brand-white transition-all shadow-lg active:scale-95 flex items-center">
                        BOOK CLARITY CALL
                    </Link>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center justify-center w-12 h-12 z-[60] relative" aria-label="Toggle Menu">
                    <Icon name={isOpen ? "x" : "menu"} className={`w-8 h-8 ${isDark && !isOpen ? 'text-brand-base' : 'text-brand-dark'}`} />
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden fixed inset-0 bg-brand-white z-50 flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-3xl font-display font-bold text-brand-dark uppercase tracking-widest">Home</Link>
                    <Link to="/professional-spaces" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium text-brand-medium uppercase tracking-widest">Professional Spaces</Link>
                    <Link to="/residential" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium text-brand-medium uppercase tracking-widest">Residential Spaces</Link>
                    <Link to="/booking" onClick={() => setIsOpen(false)} className="bg-brand-lemon text-brand-dark px-10 py-5 rounded-full font-display font-bold text-xl uppercase tracking-widest shadow-2xl">BOOK CLARITY CALL</Link>
                    <button onClick={() => setIsOpen(false)} className="mt-12 text-brand-periwinkle font-bold uppercase tracking-widest border-b-2 border-brand-periwinkle pb-1">Close Menu</button>
                </div>
            )}
        </nav>
    );
};

// --- 6. FOOTER ---
const Footer = () => (
    <section className="bg-brand-dark text-brand-base py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
                <span className="font-display text-2xl font-bold uppercase tracking-tight">Simpli-FI <span className="font-light opacity-50">Life</span></span>
                <p className="text-stone-400 text-sm mt-2">Serving the Greater DFW Area | Available Virtually</p>
            </div>
            <div className="flex gap-6 items-center">
                <a href="https://www.instagram.com/simpli_fi_life/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lemon transition"><Icon name="instagram" className="w-5 h-5"/></a>
                <a href="https://www.youtube.com/@Simpli-FILife" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lemon transition"><Icon name="youtube" className="w-5 h-5"/></a>
            </div>
            <div className="text-center md:text-right">
                <p className="text-stone-500 text-xs">&copy; 2026 Simpli-FI Life LLC. All Rights Reserved.</p>
                <Link to="/new-space-intake" className="text-stone-600 text-[10px] hover:text-brand-periwinkle transition mt-1 inline-block uppercase tracking-widest font-bold">New Space Intake</Link>
            </div>
        </div>
    </section>
);
