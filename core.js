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
            const iconNode = window.lucide.icons[name.charAt(0).toUpperCase() + name.slice(1).replace(/-./g, x=>x[1].toUpperCase())];
            if (iconNode && ref.current) ref.current.innerHTML = iconNode.toSvg({ class: className });
        }
    }, [name, className]);
    return <span ref={ref} style={{ display: 'contents' }}></span>;
};

// --- 3. ANIMATIONS ---
const GridBeams = ({ beamColor = "182, 188, 255" }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
    );
};

const LoadingScreen = ({ onComplete }) => {
    useEffect(() => { const t = setTimeout(onComplete, 1000); return () => clearTimeout(t); }, [onComplete]);
    return (
        <div className="fixed inset-0 z-[100] bg-brand-base flex items-center justify-center">
            <h1 className="font-display text-4xl text-brand-dark tracking-widest animate-pulse">LOADING...</h1>
        </div>
    );
};

// --- 4. TESTIMONIAL SCROLLER (FIXED: 5-Card Layout) ---
const TestimonialScroller = () => {
    // Duplicate array to ensure infinite scroll feel and enough items for 5-across
    const displayItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]; 
    const [activeIndex, setActiveIndex] = useState(10); // Start in middle
    const containerRef = useRef(null);
    
    // Adjusted width to fit ~5 items on a standard desktop screen (1400px / 5 = ~280px)
    const CARD_WIDTH = 280; 
    const GAP = 32;

    const handleScroll = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const center = container.scrollLeft + (container.offsetWidth / 2);
        
        // Find which card is closest to the center
        let closestIndex = 0;
        let minDistance = Infinity;

        Array.from(container.children).forEach((child, index) => {
            const childCenter = child.offsetLeft + (child.offsetWidth / 2);
            const dist = Math.abs(childCenter - center);
            if (dist < minDistance) {
                minDistance = dist;
                closestIndex = index;
            }
        });

        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
        }
    };

    // Auto-scroll to middle on load
    useEffect(() => {
        if (containerRef.current) {
            const middleCard = containerRef.current.children[10];
            if (middleCard) {
                const scrollPos = middleCard.offsetLeft - (containerRef.current.offsetWidth / 2) + (CARD_WIDTH / 2);
                containerRef.current.scrollLeft = scrollPos;
            }
        }
    }, []);

    return (
        <div className="relative w-full py-20 overflow-hidden">
            <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto no-scrollbar py-12 px-[50vw]" // Large padding allows first/last items to center
                style={{ scrollSnapType: 'x mandatory', gap: `${GAP}px` }}
            >
                {displayItems.map((t, i) => {
                    const isActive = i === activeIndex;
                    // Logic to scale neighbors slightly? 
                    // Simple logic: Active is big, others small.
                    return (
                        <div 
                            key={i}
                            className={`flex-shrink-0 rounded-2xl p-8 border-2 transition-all duration-500 ease-out flex flex-col justify-between
                                ${isActive 
                                    ? 'w-[340px] scale-110 bg-brand-lemon/10 border-brand-lemon opacity-100 z-10 shadow-2xl' 
                                    : 'w-[280px] scale-90 bg-white border-stone-100 opacity-50 grayscale-[0.8]'
                                }
                            `}
                            style={{ scrollSnapAlign: 'center' }}
                        >
                            <div className="text-4xl text-brand-lemon font-serif leading-none mb-4">“</div>
                            <p className="text-brand-medium italic text-lg leading-relaxed mb-6">{t.quote}</p>
                            <div className="mt-auto border-t border-brand-lemon/30 pt-4">
                                <p className="font-bold text-brand-periwinkle uppercase text-sm tracking-wider">{t.author}</p>
                                {t.role && <p className="text-xs text-brand-medium mt-1">{t.role}</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- 5. LAYOUT COMPONENTS ---

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const loc = useLocation();
    const isDark = loc.pathname === '/professional-spaces';
    
    return (
        <nav className="absolute top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 h-[80px] flex justify-between items-center">
                <Link to="/" className="font-display font-bold text-2xl md:text-3xl tracking-tight flex items-center h-full">
                    <span className={isDark ? 'text-brand-base' : 'text-brand-dark'}>
                        SIMPLI-FI <span className="font-light opacity-70">LIFE</span>
                    </span>
                </Link>
                <div className="hidden md:flex items-center space-x-10 h-full">
                    <Link to="/" className={`text-sm font-bold tracking-widest uppercase ${isDark ? 'text-white' : 'text-brand-dark'}`}>Home</Link>
                    <Link to="/professional-spaces" className={`text-sm font-bold tracking-widest uppercase ${isDark ? 'text-white' : 'text-brand-dark'}`}>Professional</Link>
                    <Link to="/residential" className={`text-sm font-bold tracking-widest uppercase ${isDark ? 'text-white' : 'text-brand-dark'}`}>Residential</Link>
                    <Link to="/booking" className="bg-brand-lemon text-brand-dark px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white transition-all shadow-lg">Book Call</Link>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-brand-dark">
                    <Icon name={isOpen ? "x" : "menu"} className={`w-8 h-8 ${isDark && !isOpen ? 'text-white' : 'text-brand-dark'}`} />
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8">
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-bold uppercase">Home</Link>
                    <Link to="/professional-spaces" onClick={() => setIsOpen(false)} className="text-2xl font-bold uppercase">Professional</Link>
                    <Link to="/residential" onClick={() => setIsOpen(false)} className="text-2xl font-bold uppercase">Residential</Link>
                    <Link to="/booking" onClick={() => setIsOpen(false)} className="bg-brand-lemon px-8 py-3 rounded-full text-xl font-bold uppercase">Book Call</Link>
                    <button onClick={() => setIsOpen(false)} className="mt-8 text-sm uppercase tracking-widest border-b border-black">Close</button>
                </div>
            )}
        </nav>
    );
};

const Footer = () => (
    <section className="bg-brand-dark text-brand-base py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div><span className="font-bold uppercase tracking-widest text-xl">Simpli-FI Life</span></div>
            <div className="text-xs text-stone-500">&copy; 2026 Simpli-FI Life LLC.</div>
        </div>
    </section>
);

// EXPOSE TO WINDOW
window.Core = { Navbar, Footer, GridBeams, LoadingScreen, Icon, usePageTitle, TestimonialScroller };
