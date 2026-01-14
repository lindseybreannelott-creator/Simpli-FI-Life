// --- HOME PAGE: CINEMATIC 5-CARD STRIP VERSION ---

const TestimonialScroller = () => {
    const originalItems = typeof TESTIMONIALS !== 'undefined' ? TESTIMONIALS : [];
    // Triple the items for seamless infinite scrolling
    const displayItems = [...originalItems, ...originalItems, ...originalItems];
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // 5-ACROSS GEOMETRY
    // Screen is 100vw. 5 cards = ~18vw per card + gaps.
    const CARD_WIDTH_VW = 18; 
    const GAP_VW = 2;

    const handleScroll = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scrollPos = container.scrollLeft;
        const width = container.offsetWidth;
        
        // PHYSICAL CENTER LOCK
        // We find which card is mathematically overlapping the 50% line of the screen
        const centerLine = scrollPos + (width / 2);
        const cardFullWidth = (width * (CARD_WIDTH_VW / 100)) + (width * (GAP_VW / 100));
        
        const index = Math.round(centerLine / cardFullWidth) % originalItems.length;
        setActiveIndex(index);

        // INFINITE LOOP RESET
        const totalContentWidth = container.scrollWidth / 3;
        if (scrollPos < 10) {
            container.scrollLeft = totalContentWidth;
        } else if (scrollPos > (container.scrollWidth - width - 10)) {
            container.scrollLeft = totalContentWidth;
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            // Jump to the middle set immediately so the screen is FULL of cards
            const totalContentWidth = container.scrollWidth / 3;
            container.scrollLeft = totalContentWidth;
            handleScroll();
        }
    }, [originalItems.length]);

    return (
        <div className="relative w-full py-12 group z-30">
            <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar items-center py-24"
                style={{ paddingLeft: '2vw', paddingRight: '2vw' }}
            >
                {displayItems.map((t, i) => {
                    const isActive = (i % originalItems.length) === activeIndex;
                    return (
                        <div 
                            key={i} 
                            className={`snap-center flex-shrink-0 p-8 rounded-3xl border-2 transition-all duration-700 ease-in-out flex flex-col justify-between min-h-[420px] relative shadow-2xl
                                ${isActive 
                                    ? 'bg-brand-lemon/20 border-brand-lemon scale-110 z-40 opacity-100 blur-none ring-8 ring-brand-lemon/5' 
                                    : 'bg-brand-white border-stone-100 scale-90 z-10 opacity-40 blur-[1.5px]'
                                }`}
                            style={{ 
                                marginRight: `${GAP_VW}vw`, 
                                width: `${CARD_WIDTH_VW}vw`,
                                minWidth: '280px' 
                            }}
                        >
                            <div className={`absolute -top-10 -left-4 text-[10rem] font-serif leading-none select-none pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-10'}`}
                                 style={{ WebkitTextStroke: '1px #7178c8', color: '#D6E31E' }}>“</div>
                            
                            <div className="relative z-10 pt-12">
                                <p className="text-brand-dark text-lg italic leading-relaxed">"{t.quote}"</p>
                            </div>
                            <div className={`mt-auto pt-4 border-t border-brand-lemon transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                                <p className="font-display font-bold text-brand-periwinkle uppercase text-xs tracking-[0.2em]">{t.author}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ... Rest of home.js (SocialHeader, SocialSection, Home Component) stays the same
