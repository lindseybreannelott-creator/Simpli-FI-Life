const { useState, useEffect, useRef, useMemo } = React;
const { HashRouter, Routes, Route, Link, useLocation, useNavigate, useParams } = ReactRouterDOM;

// --- FOUNDATION TOOLS ---
const usePageTitle = (title) => {
    useEffect(() => { document.title = `${title} | Simpli-FI Life`; }, [title]);
};

const Icon = ({ name, className }) => {
    const ref = React.useRef(null);
    useEffect(() => {
        if (window.lucide && window.lucide.icons) {
            const toPascalCase = (str) => str.replace(/(^\w|-\w)/g, (c) => c.replace(/-/, "").toUpperCase());
            const iconNode = window.lucide.icons[toPascalCase(name)];
            if (iconNode && ref.current && typeof iconNode.toSvg === 'function') {
                ref.current.innerHTML = iconNode.toSvg({ class: className });
            }
        }
    }, [name, className]);
    return <span ref={ref} style={{ display: 'contents' }}></span>;
};

// --- CALIBRATED GRID BEAMS ---
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
                    height: b.isHorizontal ? `${beamWidth}px` : '400px', width: b.isHorizontal ? '400px' : `${beamWidth}px`,
                    top: b.isHorizontal ? `${b.offset}px` : (b.isReverse ? '100%' : '-400px'),
                    left: !b.isHorizontal ? `${b.offset}px` : (b.isReverse ? '100%' : '-400px'),
                    filter: `drop-shadow(0 0 6px rgba(${b.color}, 0.6))`,
                    background: b.isHorizontal ? `linear-gradient(90deg, transparent, rgba(${b.color}, 1), transparent)` : `linear-gradient(180deg, transparent, rgba(${b.color}, 1), transparent)`,
                    animation: `${b.isHorizontal ? (b.isReverse ? 'beam-h-rev' : 'beam-h') : (b.isReverse ? 'beam-v-rev' : 'beam-v')} ${b.duration}s linear forwards`
                }} />
            ))}
        </div>
    );
};

// --- LOADING SCREEN: ABSOLUTE GRID LOCK ---
const LoadingScreen = ({ onComplete }) => {
    useEffect(() => { const t = setTimeout(onComplete, 4800); return () => clearTimeout(t); }, [onComplete]);
    return (
        <div className="fixed inset-0 z-[100] bg-brand-base loader-exit overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
            <GridBeams spawnRate={150} /> 
            
            {/* GRID MATH: 
                Container is exactly 480px high (12 grid squares). 
                Centered text inside forces the logo midline to sit exactly at 240px.
            */}
            <div className="absolute top-0 left-0 w-full h-[480px] flex items-center justify-center z-20 loading-logo-reveal px-4">
                <h1 className="font-display text-4xl md:text-6xl tracking-[0.25em] text-brand-dark uppercase">
                    <span className="font-bold">SIMPLI-FI</span> <span className="font-light text-brand-medium">LIFE</span>
                </h1>
            </div>
        </div>
    );
};

// --- NAVBAR: LOGO NUDGE & HAMBURGER CENTERING ---
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const loc = useLocation();
    const isDark = loc.pathname === '/professional-spaces';
    
    return (
        <nav className="absolute top-0 left-0 w-full z-50">
            {/* Header h-80px puts axis at 40px (1st grid line) */}
            <div className="max-w-7xl mx-auto px-6 h-[80px] flex justify-between items-center">
                
                {/* LOGO: added pl-1 on mobile specifically to nudge off the line */}
                <Link to="/" className="font-display font-bold text-2xl md:text-3xl tracking-tight flex items-center h-full pl-5 md:pl-4 transition-transform active:scale-95">
                    <span className={isDark ? 'text-brand-base' : 'text-brand-dark'}>
                        SIMPLI-FI <span className="font-light opacity-70">LIFE</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-10 h-full">
                    {['HOME', 'PROFESSIONAL SPACES', 'RESIDENTIAL SPACES'].map((name) => (
                        <Link 
                            key={name} 
                            to={name === 'HOME' ? '/' : `/${name.toLowerCase().replace(' ', '-')}`} 
                            className={`text-[15px] font-display font-medium tracking-[0.1em] uppercase transition-all duration-300 leading-none flex items-center ${
                                isDark ? 'text-brand-base hover:text-brand-periwinkle-light' : 'text-brand-medium hover:text-brand-periwinkle'
                            }`}
                        >
                            {name}
                        </Link>
                    ))}
                    <Link to="/booking" className="bg-brand-lemon text-brand-dark px-7 py-2 rounded-full font-display font-bold text-sm tracking-widest uppercase hover:bg-brand-periwinkle hover:text-brand-white transition-all shadow-lg active:scale-95 flex items-center">
                        BOOK CLARITY CALL
                    </Link>
                </div>

                {/* MOBILE HAMBURGER: w-12 h-12 container with flex-center for absolute symmetry */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center justify-center w-12 h-12 z-[60] relative" aria-label="Toggle Menu">
                    <div className="w-8 h-8 flex items-center justify-center">
                        {isOpen ? (
                            <svg className={`w-8 h-8 ${isDark ? 'text-brand-base' : 'text-brand-dark'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className={`w-8 h-8 ${isDark ? 'text-brand-base' : 'text-brand-dark'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </div>
                </button>
            </div>

            {/* MOBILE MENU */}
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

const Footer = () => (
    <section className="bg-brand-dark text-brand-base py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div><span className="font-display text-2xl font-bold uppercase tracking-tight">Simpli-FI <span className="font-light opacity-50">Life</span></span><p className="text-stone-400 text-sm mt-2">Serving the Greater DFW Area | Available Virtually</p></div>
            <div className="flex gap-6 items-center"><a href="https://www.instagram.com/simpli_fi_life/" target="_blank" className="hover:text-brand-lemon transition"><Icon name="instagram" className="w-5 h-5"/></a><a href="https://www.youtube.com/@Simpli-FILife" target="_blank" className="hover:text-brand-lemon transition"><Icon name="youtube" className="w-5 h-5"/></a></div>
            <div className="text-center md:text-right"><p className="text-stone-500 text-xs">&copy; 2026 Simpli-FI Life LLC. All Rights Reserved.</p><Link to="/new-space-intake" className="text-stone-600 text-[10px] hover:text-brand-periwinkle transition mt-1 inline-block uppercase tracking-widest font-bold">New Space Intake</Link></div>
        </div>
    </section>
);
