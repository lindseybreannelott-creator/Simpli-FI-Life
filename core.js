const { useState, useEffect, useRef, useMemo } = React;
const { Link, useLocation } = ReactRouterDOM;

// --- 1. DATA: TESTIMONIALS ---
const TESTIMONIALS = [
    { quote: "Simpli-fi life has been a game changer in my home.", author: "Lauren V.", role: "" },
    { quote: "Working with Lindsey as my decluttering coach was so fun, I could not be more happy with the spaces we redefined.", author: "Lauren E.", role: "" },
    { quote: "You are truly pursuing something that you are gifted at. So kind and focused and intentional.", author: "Ashley M.", role: "" },
    { quote: "Before being with you, I could sit in those mess up spaces for years and just be melancholy... but meeting with you was about just so much awareness and clarity.", author: "Amanda B.", role: "" },
    { quote: "Our shop is useable, clean and organized for the first time in decades. Thank you Lindsey!", author: "Kevin T.", role: "Logistics Captain" }
];

// --- 2. TOOLS & ICONS ---
const usePageTitle = (title) => {
    useEffect(() => { document.title = `${title} | Simpli-FI Life`; }, [title]);
};

const Icon = ({ name, className }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (window.lucide && window.lucide.icons) {
            const toPascalCase = (str) => str.replace(/(^\w|-\w)/g, (c) => c.replace(/-/, "").toUpperCase());
            const iconNode = window.lucide.icons[toPascalCase(name)];
            if (iconNode && ref.current) {
                ref.current.innerHTML = iconNode.toSvg({ class: className });
            }
        }
    }, [name, className]);
    return <span ref={ref} style={{ display: 'contents' }}></span>;
};

// --- 3. ANIMATIONS (GRID BEAMS) ---
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
        spawn(); spawn(); 
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

// --- 4. INTRO LOADING SCREEN ---
const LoadingScreen = ({ onComplete }) => {
    useEffect(() => { 
        const t = setTimeout(onComplete, 4800); 
        return () => clearTimeout(t); 
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-brand-base flex items-center justify-center loader-exit overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] loading-grid-fade-in"></div>
            <div className="absolute inset-0 opacity-40">
                <GridBeams spawnRate={150} beamWidth={1.5} />
            </div>
            <div className="relative z-20 loading-logo-reveal text-center px-4">
                <h1 className="font-display text-4xl md:text-6xl tracking-[0.25em] text-brand-dark whitespace-nowrap">
                    <span className="font-bold">SIMPLI-FI</span> <span className="font-light text-brand-medium">LIFE</span>
                </h1>
            </div>
        </div>
    );
};

// --- 5. TESTIMONIAL SCROLLER (FIXED MATH) ---
const TestimonialScroller = () => {
    // 6x Duplication to ensure full screen coverage on wide monitors
    const displayTestimonials = [
        ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, 
        ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS
    ]; 
    
    // Start index in the middle of the array
    const [activeIndex, setActiveIndex] = useState(TESTIMONIALS.length * 3); 
    const containerRef = useRef(null);
    
    // REDUCED WIDTH: 260px allows 5 items to fit on a standard 1440px screen
    const ITEM_WIDTH = 260; 
    const GAP = 24; 
    const TOTAL_ITEM_WIDTH = ITEM_WIDTH + GAP;
    
    // Width of one full set of original testimonials
    const SET_WIDTH = TESTIMONIALS.length * TOTAL_ITEM_WIDTH;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        // Initial Scroll Position: Center of the duplicated list
        // (Index * Width) - (Half Screen) + (Half Card)
        const initialPosition = (TESTIMONIALS.length * 3 * TOTAL_ITEM_WIDTH);
        container.scrollLeft = initialPosition;
    }, []);

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;
        
        const centerPoint = container.scrollLeft + (container.offsetWidth / 2);
        
        // Find card closest to center
        let minDistance = Infinity;
        let newIndex = activeIndex;

        Array.from(container.children).forEach((child, i) => {
            // Get center of the child element
            const childCenter = child.offsetLeft + (child.offsetWidth / 2);
            const distance = Math.abs(childCenter - centerPoint);
            
            if (distance < minDistance) {
                minDistance = distance;
                newIndex = i;
            }
        });

        if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
        }

        // Infinite Loop Jump Logic
        // If we scroll too far right (past 4th set), jump back to 2nd set
        if (container.scrollLeft >= SET_WIDTH * 4) {
            container.scrollLeft = container.scrollLeft - SET_WIDTH;
        } 
        // If we scroll too far left (start of list), jump forward to 2nd set
        else if (container.scrollLeft <= SET_WIDTH) {
            container.scrollLeft = container.scrollLeft + SET_WIDTH;
        }
    };

    return (
        <div className="relative w-full py-16 group overflow-hidden">
            <div 
                ref={containerRef} 
                onScroll={handleScroll} 
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar items-center py-12" 
                // PADDING FIX: Half screen width minus half card width = Perfect Center
                style={{ paddingLeft: `calc(50% - ${ITEM_WIDTH / 2}px)`, paddingRight: `calc(50% - ${ITEM_WIDTH / 2}px)` }}
            >
                {displayTestimonials.map((t, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <div 
                            key={i} 
                            className={`
                                snap-center flex-shrink-0 p-8 rounded-2xl border-2 transition-all duration-500 ease-out flex flex-col justify-between min-h-[380px] relative
                                ${isActive 
                                    ? 'scale-110 bg-brand-lemon/20 border-brand-lemon opacity-100 z-10 shadow-2xl' 
                                    : 'scale-90 bg-brand-white border-stone-100 opacity-60 grayscale-[0.8] blur-[0.5px]'
                                }
                            `}
                            style={{ marginRight: `${GAP}px`, width: `${ITEM_WIDTH}px` }}
                        >
                            <div className={`absolute -top-8 -left-2 text-6xl font-serif leading-none select-none pointer-events-none transition-all duration-500 ${isActive ? 'opacity-100 text-brand-periwinkle' : 'opacity-20 text-stone-300'}`}>“</div>
                            <div className="relative z-10 pt-4">
                                <p className="text-brand-medium text-[15px] leading-relaxed italic mb-6 relative">{t.quote}</p>
                            </div>
                            <div className={`mt-auto pt-4 border-t border-brand-lemon transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                <p className="font-display font-bold text-brand-periwinkle uppercase tracking-wider text-xs">{t.author}</p>
                                {t.role && <p className="text-[10px] text-brand-medium font-medium mt-1 uppercase tracking-wide">{t.role}</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- 6. NAV & FOOTER ---

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
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center justify-center w-12 h-12 z-[60] relative">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <Icon name={isOpen ? "x" : "menu"} className={`w-8 h-8 ${isDark && !isOpen ? 'text-brand-base' : 'text-brand-dark'}`} />
                    </div>
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

const Footer = () => (
    <section className="bg-brand-dark text-brand-base py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div><span className="font-display text-2xl font-bold uppercase tracking-tight">Simpli-FI <span className="font-light opacity-50">Life</span></span><p className="text-stone-400 text-sm mt-2">Serving the Greater DFW Area | Available Virtually</p></div>
            <div className="flex gap-6 items-center">
                <a href="https://www.instagram.com/simpli_fi_life/" target="_blank" className="hover:text-brand-lemon transition"><Icon name="instagram" className="w-5 h-5"/></a>
                <a href="https://www.youtube.com/@Simpli-FILife" target="_blank" className="hover:text-brand-lemon transition"><Icon name="youtube" className="w-5 h-5"/></a>
            </div>
            <div className="text-center md:text-right"><p className="text-stone-500 text-xs">&copy; 2026 Simpli-FI Life LLC. All Rights Reserved.</p><Link to="/new-space-intake" className="text-stone-600 text-[10px] hover:text-brand-periwinkle transition mt-1 inline-block uppercase tracking-widest font-bold">New Space Intake</Link></div>
        </div>
    </section>
);

// --- 7. EXPOSE TO WINDOW ---
window.Core = { Navbar, Footer, GridBeams, LoadingScreen, Icon, usePageTitle, TestimonialScroller };
