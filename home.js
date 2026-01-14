// --- HOME PAGE: SPOTLIGHT CALIBRATION VERSION ---

const TestimonialScroller = () => {
    const originalItems = typeof TESTIMONIALS !== 'undefined' ? TESTIMONIALS : [];
    const displayItems = [...originalItems, ...originalItems, ...originalItems, ...originalItems, ...originalItems];
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // FIXED GEOMETRY: 
    // ITEM_WIDTH = 320px
    // GAP = 24px
    const ITEM_WIDTH = 320;
    const GAP = 24;
    const TOTAL_CARD_SPACE = ITEM_WIDTH + GAP;

    const handleScroll = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        
        // Find the absolute horizontal center of the visible window
        const viewportCenter = container.offsetWidth / 2;
        
        // Find which card is currently crossing that center point
        // We add the current scroll position to the viewport center to get the "Global Center"
        const globalCenter = container.scrollLeft + viewportCenter;
        
        // Calculate index based on the center of the cards
        const index = Math.round((globalCenter - (viewportCenter)) / TOTAL_CARD_SPACE) % originalItems.length;
        
        // Only update if the index actually changes to prevent jitter
        setActiveIndex(Math.abs(index));

        // Infinite Loop Jump Logic
        const maxScroll = container.scrollWidth - container.offsetWidth;
        if (container.scrollLeft <= 100) {
            container.scrollLeft = TOTAL_CARD_SPACE * originalItems.length * 2;
        } else if (container.scrollLeft >= maxScroll - 100) {
            container.scrollLeft = TOTAL_CARD_SPACE * originalItems.length * 2;
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            // Initialize at the center of the multi-set
            container.scrollLeft = TOTAL_CARD_SPACE * originalItems.length * 2;
            // Initial call to set the center card on load
            handleScroll();
        }
    }, [originalItems.length]);

    return (
        <div className="relative w-full py-12 group z-30"> {/* High Z-Index to stay above beams */}
            <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar items-center py-24"
                style={{ 
                    paddingLeft: 'calc(50% - 160px)', 
                    paddingRight: 'calc(50% - 160px)',
                    perspective: '1000px' // Adds depth to the scale animation
                }}
            >
                {displayItems.map((t, i) => {
                    const isActive = (i % originalItems.length) === activeIndex;
                    return (
                        <div 
                            key={i} 
                            className={`snap-center flex-shrink-0 p-8 rounded-3xl border-2 transition-all duration-500 ease-out flex flex-col justify-between min-h-[400px] relative shadow-2xl
                                ${isActive 
                                    ? 'bg-brand-white border-brand-lemon scale-110 z-40 opacity-100 ring-4 ring-brand-lemon/10' 
                                    : 'bg-brand-white border-stone-100 scale-90 z-10 opacity-40 grayscale-[0.5] blur-[1px]'
                                }`}
                            style={{ 
                                marginRight: `${GAP}px`, 
                                width: `${ITEM_WIDTH}px`,
                                transformOrigin: 'center center'
                            }}
                        >
                            {/* Citron Glow Overlay */}
                            <div className={`absolute inset-0 bg-brand-lemon/5 rounded-2xl transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                            
                            <div className={`absolute -top-10 -left-4 text-[12rem] font-serif leading-none select-none pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-20'}`}
                                 style={{ WebkitTextStroke: '1px #7178c8', color: '#D6E31E' }}>“</div>
                            
                            <div className="relative z-10 pt-12">
                                <p className="text-brand-dark text-lg italic leading-relaxed">"{t.quote}"</p>
                            </div>
                            <div className={`mt-auto pt-4 border-t border-brand-lemon transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                <p className="font-display font-bold text-brand-periwinkle uppercase text-sm tracking-widest">{t.author}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const SocialSection = ({ platform, handle, link, children }) => (
    <div className="relative w-full bg-brand-base z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full text-center z-40">
            <p className="font-display font-light text-brand-dark leading-none">
                <span className="block text-sm mb-1 uppercase tracking-[0.3em] opacity-60">follow me on</span>
                <span className="text-3xl font-bold tracking-tight uppercase">{platform}</span>
            </p>
        </div>
        <div className="w-full h-1.5 bg-brand-periwinkle-light relative z-20"></div>
        {children}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
             <a href={link} target="_blank" className="block relative group bg-brand-periwinkle-light text-brand-dark px-12 py-4 font-display font-bold tracking-widest text-sm uppercase rounded-full shadow-xl hover:scale-105 transition-transform">
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-full overflow-visible">
                    <rect x="1.5" y="1.5" style={{ width: "calc(100% - 3px)", height: "calc(100% - 3px)" }} rx="26" fill="none" stroke="#D6E31E" strokeWidth="3" className="draw-border opacity-0 group-hover:opacity-100" />
                </svg>
                <span className="relative z-10">{handle}</span>
             </a>
        </div>
    </div>
);

const Home = () => {
    usePageTitle("Home");
    const [ctaHover, setCtaHover] = useState(false);

    return (
        <div className="overflow-x-hidden bg-brand-base">
            {/* HERO SECTION */}
            <div className="relative overflow-hidden min-h-screen flex flex-col justify-center border-b border-stone-100">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <GridBeams />
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10 pt-44 pb-12 px-4 text-center">
                    <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-brand-dark mb-8 tracking-tighter leading-[0.9]">
                        Get Organized<br />
                        <span className="text-brand-medium italic pr-2">without the overwhelm.</span>
                    </h1>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                        <Link to="/professional-spaces" className="px-10 py-5 rounded-xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition-all shadow-lg font-display font-bold text-lg uppercase tracking-tight">Professional Space</Link>
                        <Link to="/residential" className="px-10 py-5 rounded-xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition-all shadow-lg font-display font-bold text-lg uppercase tracking-
