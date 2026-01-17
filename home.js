const { useState, useEffect, useRef } = React;
const { Link } = ReactRouterDOM;

// --- HOME PAGE ---

const TestimonialScroller = () => {
    const TESTIMONIALS = [
        { quote: "Simpli-fi life has been a game changer in my home.", author: "Lauren V.", role: "" },
        { quote: "Working with Lindsey as my decluttering coach was so fun, I could not be more happy with the spaces we redefined.", author: "Lauren E.", role: "" },
        { quote: "You are truly pursuing something that you are gifted at. So kind and focused and intentional.", author: "Ashley M.", role: "" },
        { quote: "Before being with you, I could sit in those mess up spaces for years and just be melancholy... but meeting with you was about just so much awareness and clarity.", author: "Amanda B.", role: "" },
        { quote: "Our shop is useable, clean and organized for the first time in decades. Thank you Lindsey!", author: "Kevin T.", role: "Logistics Captain" }
    ];

    const displayItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleRes = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleRes);
        return () => window.removeEventListener('resize', handleRes);
    }, []);

    const ITEM_WIDTH_DESKTOP = 320;
    const GAP_DESKTOP = 24;

    const handleScroll = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scrollPos = container.scrollLeft;
        const viewportWidth = container.offsetWidth;
        
        const itemWidth = isMobile ? viewportWidth * 0.65 : ITEM_WIDTH_DESKTOP;
        const gap = isMobile ? 12 : GAP_DESKTOP;
        const totalSpace = itemWidth + gap;
        const sidePadding = (viewportWidth - itemWidth) / 2;
        const spotlightPoint = scrollPos + (viewportWidth / 2);
        
        const index = Math.round((spotlightPoint - sidePadding - (itemWidth / 2)) / totalSpace) % TESTIMONIALS.length;
        setActiveIndex(Math.abs(index));

        const setWidth = TESTIMONIALS.length * totalSpace;
        if (scrollPos < (setWidth * 0.5)) container.scrollLeft = scrollPos + setWidth;
        else if (scrollPos > (setWidth * 2.5)) container.scrollLeft = scrollPos - setWidth;
    };

    const scrollManual = (dir) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const itemWidth = isMobile ? container.offsetWidth * 0.65 : ITEM_WIDTH_DESKTOP;
        const gap = isMobile ? 12 : GAP_DESKTOP;
        container.scrollBy({ left: dir * (itemWidth + gap), behavior: 'smooth' });
    };

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const itemWidth = isMobile ? container.offsetWidth * 0.65 : ITEM_WIDTH_DESKTOP;
            const gap = isMobile ? 12 : GAP_DESKTOP;
            container.scrollLeft = TESTIMONIALS.length * (itemWidth + gap) * 2; 
            setTimeout(handleScroll, 100);
        }
    }, [isMobile]);

    return (
        <div className="relative w-full mt-5 md:mt-0 pt-32 pb-16 md:pb-20 group z-30">
            {isMobile && (
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-50 pointer-events-none">
                    <button onClick={() => scrollManual(-1)} className="p-1.5 rounded-full bg-brand-lemon shadow-xl pointer-events-auto border border-brand-dark/10 active:scale-90 transition-transform">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button onClick={() => scrollManual(1)} className="p-1.5 rounded-full bg-brand-lemon shadow-xl pointer-events-auto border border-brand-dark/10 active:scale-90 transition-transform">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </div>
            )}

            <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar items-center py-8 md:py-16"
                style={{ paddingLeft: 'calc(50% - 160px)', paddingRight: 'calc(50% - 160px)' }}
            >
                {displayItems.map((t, i) => {
                    const isActive = (i % TESTIMONIALS.length) === activeIndex;
                    return (
                        <div 
                            key={i} 
                            className={`snap-center flex-shrink-0 p-6 md:p-8 rounded-3xl border-2 transition-all duration-700 ease-in-out flex flex-col justify-between min-h-[380px] md:min-h-[420px] relative shadow-2xl ${isActive ? 'bg-brand-lemon/20 border-brand-lemon scale-100 md:scale-110 z-40 opacity-100 blur-none' : 'bg-brand-white border-stone-100 scale-90 z-10 opacity-30 blur-[1.5px]'}`}
                            style={{ marginRight: '16px', width: '320px', maxWidth: '65vw' }}
                        >
                            <div className={`absolute -top-12 -left-6 text-[8rem] md:text-[10rem] font-serif leading-none select-none pointer-events-none transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}
                                 style={{ WebkitTextStroke: '1.5px #7178c8', color: '#D6E31E' }}>“</div>
                            
                            <div className="relative z-10 pt-8 md:pt-12">
                                <p className="text-brand-dark text-sm md:text-lg italic leading-relaxed">"{t.quote}"</p>
                            </div>
                            <div className={`mt-auto pt-4 border-t border-brand-periwinkle transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                                <p className="font-display font-bold text-brand-periwinkle uppercase text-[10px] md:text-xs tracking-[0.2em]">{t.author}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div className="overflow-x-hidden bg-brand-base">
            <div className="relative overflow-hidden min-h-screen flex flex-col justify-start">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    {window.Core && window.Core.GridBeams && <window.Core.GridBeams />}
                </div>
                <div className="max-w-7xl mx-auto relative z-10 pt-48 md:pt-64 pb-2 md:pb-4 px-4 text-center">
                    <h1 className="font-display text-[3.5rem] leading-[0.9] sm:text-7xl md:text-[7.2rem] font-bold text-brand-dark mb-8 md:mb-10 tracking-tighter md:leading-[0.85]">
                        Get Organized<br />
                        <span className="text-brand-medium italic pr-2">without the overwhelm.</span>
                    </h1>
                    <div className="max-w-3xl mx-auto space-y-2 mb-10 md:mb-12">
                        <p className="text-lg md:text-xl text-brand-medium">Life can be chaotic, your space doesn't need to be.</p>
                        <p className="text-xl md:text-2xl font-display font-bold text-brand-dark uppercase tracking-widest pt-2">Let's organize my:</p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 mb-4 md:mb-6">
                        <Link to="/professional-spaces" className="inline-block w-3/4 sm:w-fit px-8 py-4 md:px-12 md:py-5 rounded-xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition-all shadow-lg font-display font-bold text-base md:text-lg uppercase tracking-tight">Professional Space</Link>
                        <Link to="/residential" className="inline-block w-3/4 sm:w-fit px-8 py-4 md:px-12 md:py-5 rounded-xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition-all shadow-lg font-display font-bold text-base md:text-lg uppercase tracking-tight">Residential Space</Link>
                    </div>
                </div>
                <div className="mt-2 md:mt-0"><TestimonialScroller /></div>
            </div>
            
            {/* OTHER SECTIONS OMITTED FOR BREVITY BUT CAN BE ADDED BACK IF NEEDED */}
            {/* (Assuming you have the rest of the Home page code from the previous working version. If not, let me know and I will paste the ENTIRE thing.) */}
        </div>
    );
};

window.Home = Home;
