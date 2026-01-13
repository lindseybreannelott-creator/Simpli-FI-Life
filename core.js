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

const GridBeams = ({ beamColor = "182, 188, 255", spawnRate = 300, beamWidth = 1 }) => {
    const [beams, setBeams] = useState([]);
    useEffect(() => {
        let count = 0; let active = true;
        const spawn = () => {
            if (!active) return;
            const id = count++;
            const beamDuration = 1.5 + Math.random() * 2;
            const isHorizontal = Math.random() > 0.5;
            setBeams(prev => [...prev, { id, isHorizontal, isReverse: Math.random() > 0.5, offset: Math.floor(Math.random() * 100) * 40, duration: beamDuration, color: (id % 5 === 0) ? "214, 227, 30" : beamColor }]);
            setTimeout(() => { if (active) setBeams(prev => prev.filter(b => b.id !== id)); }, beamDuration * 1000);
        };
        const interval = setInterval(spawn, spawnRate);
        return () => { active = false; clearInterval(interval); };
    }, [beamColor, spawnRate]);
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {beams.map(b => (
                <div key={b.id} className="absolute" style={{
                    height: b.isHorizontal ? `${beamWidth}px` : '300px', width: b.isHorizontal ? '300px' : `${beamWidth}px`,
                    top: b.isHorizontal ? `${b.offset}px` : (b.isReverse ? '100%' : '-300px'),
                    left: !b.isHorizontal ? `${b.offset}px` : (b.isReverse ? '100%' : '-300px'),
                    filter: `drop-shadow(0 0 4px rgba(${b.color}, 0.8))`,
                    background: b.isHorizontal ? `linear-gradient(90deg, transparent, rgba(${b.color}, 1), transparent)` : `linear-gradient(180deg, transparent, rgba(${b.color}, 1), transparent)`,
                    animation: `${b.isHorizontal ? (b.isReverse ? 'beam-h-rev' : 'beam-h') : (b.isReverse ? 'beam-v-rev' : 'beam-v')} ${b.duration}s linear forwards`
                }} />
            ))}
        </div>
    );
};

const LoadingScreen = ({ onComplete }) => {
    useEffect(() => { const t = setTimeout(onComplete, 4800); return () => clearTimeout(t); }, [onComplete]);
    return (
        <div className="fixed inset-0 z-[100] bg-brand-base flex items-center justify-center loader-exit overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] loading-grid-fade-in opacity-20"></div>
            <div className="relative z-20 loading-logo-reveal text-center px-4">
                <h1 className="font-display text-4xl md:text-6xl tracking-[0.25em] text-brand-dark uppercase">
                    <span className="font-bold">SIMPLI-FI</span> <span className="font-light text-brand-medium">LIFE</span>
                </h1>
            </div>
        </div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const loc = useLocation();
    const isDark = loc.pathname === '/professional-spaces';
    return (
        <nav className="absolute top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
                <Link to="/" className="font-display font-bold text-2xl tracking-tight text-brand-dark">
                    <span className={isDark ? 'text-brand-base' : 'text-brand-dark'}>SIMPLI-FI <span className="font-light opacity-70">LIFE</span></span>
                </Link>
                <div className="hidden md:flex space-x-8">
                    {['HOME', 'PROFESSIONAL SPACES', 'RESIDENTIAL SPACES'].map((name) => (
                        <Link key={name} to={name === 'HOME' ? '/' : `/${name.toLowerCase().replace(' ', '-')}`} className={`text-lg font-display tracking-tight uppercase transition ${isDark ? 'text-brand-base hover:text-brand-periwinkle-light' : 'text-brand-medium hover:text-brand-periwinkle'}`}>{name}</Link>
                    ))}
                    <Link to="/booking" className="bg-brand-lemon text-brand-dark px-6 py-2 rounded-full font-display font-bold hover:bg-brand-periwinkle hover:text-brand-white transition shadow-lg">BOOK CLARITY CALL</Link>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2"><Icon name={isOpen ? "x" : "menu"} className={isDark ? "text-brand-base" : "text-brand-dark"} /></button>
            </div>
            {isOpen && (
                <div className="md:hidden bg-brand-white border-t p-4 space-y-4 absolute w-full shadow-xl">
                    <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-lg uppercase">Home</Link>
                    <Link to="/professional-spaces" onClick={() => setIsOpen(false)} className="block py-2 text-lg uppercase">Professional Spaces</Link>
                    <Link to="/residential" onClick={() => setIsOpen(false)} className="block py-2 text-lg uppercase">Residential Spaces</Link>
                    <Link to="/booking" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 bg-brand-lemon rounded-lg font-bold">BOOK CLARITY CALL</Link>
                </div>
            )}
        </nav>
    );
};

const Footer = () => (
    <section className="bg-brand-dark text-brand-base py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div><span className="font-display text-2xl font-bold uppercase">Simpli-FI <span className="font-light opacity-50">Life</span></span><p className="text-stone-400 text-sm mt-2">Serving the Greater DFW Area | Available Virtually</p></div>
            <div className="text-center md:text-right">
                <p className="text-stone-500 text-xs">&copy; 2026 Simpli-FI Life LLC. All Rights Reserved.</p>
                <Link to="/new-space-intake" className="text-stone-600 text-[10px] hover:text-brand-periwinkle transition mt-1 inline-block">New Space Intake</Link>
            </div>
        </div>
    </section>
);
