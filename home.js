const { useState, useEffect, useRef } = React;
const { Link } = ReactRouterDOM;

// --- HOME PAGE: QUOTE FIX (PT-32) ---

const TestimonialScroller = () => {
    // 1. Define Data Locally to prevent "undefined" errors
    const TESTIMONIALS = [
        { quote: "Simpli-fi life has been a game changer in my home.", author: "Lauren V.", role: "" },
        { quote: "Working with Lindsey as my decluttering coach was so fun, I could not be more happy with the spaces we redefined.", author: "Lauren E.", role: "" },
        { quote: "You are truly pursuing something that you are gifted at. So kind and focused and intentional.", author: "Ashley M.", role: "" },
        { quote: "Before being with you, I could sit in those mess up spaces for years and just be melancholy... but meeting with you was about just so much awareness and clarity.", author: "Amanda B.", role: "" },
        { quote: "Our shop is useable, clean and organized for the first time in decades. Thank you Lindsey!", author: "Kevin T.", role: "Logistics Captain" }
    ];

    const originalItems = TESTIMONIALS;
    // 5x Duplication to ensure full screen fill
    const displayItems = [...originalItems, ...originalItems, ...originalItems, ...originalItems, ...originalItems];
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
        if (!containerRef.current || originalItems.length === 0) return;
        
        const container = containerRef.current;
        const scrollPos = container.scrollLeft;
        const viewportWidth = container.offsetWidth;
        
        const itemWidth = isMobile ? viewportWidth * 0.65 : ITEM_WIDTH_DESKTOP;
        const gap = isMobile ? 12 : GAP_DESKTOP;
        const totalSpace = itemWidth + gap;
        const sidePadding = (viewportWidth - itemWidth) / 2;

        const viewportCenter = viewportWidth / 2;
        const spotlightPoint = scrollPos + viewportCenter;
        
        const index = Math.round((spotlightPoint - sidePadding - (itemWidth / 2)) / totalSpace) % originalItems.length;
        setActiveIndex(Math.abs(index));

        const setWidth = originalItems.length * totalSpace;
        if (scrollPos < (setWidth * 0.5)) {
            container.scrollLeft = scrollPos + setWidth;
        } else if (scrollPos > (setWidth * 2.5)) {
            container.scrollLeft = scrollPos - setWidth;
        }
    };

    const scrollManual = (dir) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const viewportWidth = container.offsetWidth;
        const itemWidth = isMobile ? viewportWidth * 0.65 : ITEM_WIDTH_DESKTOP;
        const gap = isMobile ? 12 : GAP_DESKTOP;
        container.scrollBy({ left: dir * (itemWidth + gap), behavior: 'smooth' });
    };

    useEffect(() => {
        if (containerRef.current && originalItems.length > 0) {
            const container = containerRef.current;
            const viewportWidth = container.offsetWidth;
            const itemWidth = isMobile ? viewportWidth * 0.65 : ITEM_WIDTH_DESKTOP;
            const gap = isMobile ? 12 : GAP_DESKTOP;
            const totalSpace = itemWidth + gap;
            container.scrollLeft = originalItems.length * totalSpace * 2; 
            setTimeout(handleScroll, 100);
        }
    }, [originalItems.length, isMobile]);

    if (originalItems.length === 0) return null;

    return (
        // UPDATE: Changed pt-20 to pt-32 to give the scaled-up quote mark room to breathe
        <div className="relative w-full mt-5 md:mt-0 pt-32 pb-16 md:pb-20 group z-30">
            {isMobile && (
                <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-50 pointer-events-none">
                    <button onClick={() => scrollManual(-1)} className="p-1.5 rounded-full bg-brand-lemon shadow-xl pointer-events-auto border border-brand-dark/10 active:scale-90 transition-transform">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button onClick={() => scrollManual(1)} className="p-1.5 rounded-full bg-brand-lemon shadow-xl pointer-events-auto border border-brand-dark/10 active:scale-90 transition-transform">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
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
                    const isActive = (i % originalItems.length) === activeIndex;
                    return (
                        <div 
                            key={i} 
                            className={`snap-center flex-shrink-0 p-6 md:p-8 rounded-3xl border-2 transition-all duration-700 ease-in-out flex flex-col justify-between min-h-[380px] md:min-h-[420px] relative shadow-2xl
                                ${isActive 
                                    ? 'bg-brand-lemon/20 border-brand-lemon scale-100 md:scale-110 z-40 opacity-100 blur-none' 
                                    : 'bg-brand-white border-stone-100 scale-90 z-10 opacity-30 blur-[1.5px]'
                                }`}
                            style={{ marginRight: '16px', width: '320px', maxWidth: '65vw' }}
                        >
                            {/* QUOTE MARK */}
                            <div className={`absolute -top-16 -left-6 text-[12rem] font-serif leading-none select-none pointer-events-none transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}
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

// --- REST OF HOME COMPONENT ---

const SocialSection = ({ platform, handle, link, children }) => (
    <div className="relative w-full bg-brand-base">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        <div className="relative z-10 pt-24 md:pt-40">
            <div className="text-center mb-10 md:mb-12 px-4">
                <p className="font-sans text-[10px] md:text-xs font-bold tracking-[0.4em] text-brand-medium uppercase mb-2 md:mb-3">Follow me on</p>
                <h3 className="font-display text-4xl md:text-6xl font-bold text-brand-dark uppercase tracking-tighter">{platform}</h3>
            </div>
            <div className="relative">
                <div className="w-full h-1.5 bg-brand-periwinkle-light relative z-20"></div>
                {children}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                     <a href={link} target="_blank" rel="noopener noreferrer" className="block relative group bg-brand-periwinkle-light text-brand-dark px-10 py-4 font-display font-bold tracking-widest text-[10px] md:text-sm uppercase rounded-full shadow-xl hover:bg-white hover:scale-105 transition-all duration-300">
                        <span className="relative z-10">{handle}</span>
                     </a>
                </div>
            </div>
        </div>
    </div>
);

const Home = () => {
    // Safe Beam Check
    const renderBeams = () => {
        if (window.Core && window.Core.GridBeams) {
            return <window.Core.GridBeams />;
        }
        return null;
    };

    return (
        <div className="overflow-x-hidden bg-brand-base">
            {/* HERO SECTION */}
            <div className="relative overflow-hidden min-h-screen flex flex-col justify-start">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    {renderBeams()}
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
                {/* FAILSAFE TESTIMONIAL SCROLLER */}
                <div className="mt-2 md:mt-0"><TestimonialScroller /></div>
            </div>

            {/* SERVICES SECTION */}
            <section className="py-20 md:py-32 relative z-10 border-t border-stone-100">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter text-brand-dark italic mb-16 md:mb-24 leading-none">Make Room for More in Your....</h2>
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto">
                        <div className="group relative bg-brand-white rounded-3xl p-8 md:p-10 border-2 border-stone-100 flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20"><rect x="0" y="0" width="100%" height="100%" rx="24" fill="none" stroke="#D6E31E" strokeWidth="3.5" className="draw-border opacity-0 group-hover:opacity-100" /></svg>
                            <h3 className="font-display text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-brand-dark uppercase tracking-tight">Professional Spaces</h3>
                            <div className="flex-grow flex flex-col justify-start"><p className="text-brand-medium text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-sm font-light">Your back-of-house should fuel your business, not slow it down. We transform chaotic stock rooms into efficient engines.</p></div>
                            <Link to="/professional-spaces" className="w-full bg-brand-periwinkle-light text-brand-dark px-6 py-4 rounded-2xl font-bold hover:bg-brand-periwinkle hover:text-brand-white transition-all uppercase tracking-widest text-[10px] md:text-xs shadow-md">Get Organized, Save Money</Link>
                        </div>
                        <div className="group relative bg-brand-white rounded-3xl p-8 md:p-10 border-2 border-stone-100 flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20"><rect x="0" y="0" width="100%" height="100%" rx="24" fill="none" stroke="#D6E31E" strokeWidth="3.5" className="draw-border opacity-0 group-hover:opacity-100" /></svg>
                            <h3 className="font-display text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-brand-dark uppercase tracking-tight">Residential Spaces</h3>
                            <div className="flex-grow flex flex-col justify-start"><p className="text-brand-medium text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-sm font-light">Your home should be a sanctuary, not a source of stress. We create intuitive systems that clear the clutter and calm the chaos.</p></div>
                            <Link to="/residential" className="w-full bg-brand-periwinkle-light text-brand-dark px-6 py-4 rounded-2xl font-bold hover:bg-brand-periwinkle hover:text-brand-white transition-all uppercase tracking-widest text-[10px] md:text-xs shadow-md">Get Organized, Lose the Stress</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="py-24 md:py-40 relative overflow-hidden border-y border-stone-100 z-10">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-24 items-center relative z-10">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-periwinkle group">
                        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#F9F6F0_1px,transparent_1px),linear-gradient(to_bottom,#F9F6F0_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
                        <img src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/profile-stripedress-directlook.png" className="relative z-10 w-full aspect-[4/5] object-cover object-top mt-10 md:mt-16 scale-[1.08] transform transition-transform duration-700 group-hover:scale-[1.15]" alt="Lindsey Lott" />
                    </div>
                    <div className="pt-8 lg:pt-0">
                        <span className="inline-block bg-brand-dark text-brand-lemon px-5 py-1.5 mb-6 md:mb-8 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase rounded-full">The Founder</span>
                        <h2 className="font-display text-5xl md:text-7xl font-bold text-brand-periwinkle mb-6 md:mb-8 tracking-tighter leading-none">Hi, I'm Lindsey.</h2>
                        <div className="text-stone-600 text-lg md:text-xl space-y-6 md:space-y-8 leading-relaxed font-light"><p>My appreciation for organization began as a Pediatric Nurse in the ER where structure is essential. Transitioning to homeschooling four children truly refined that clinical precision.</p><p>Today, I help families and businesses eliminate chaos—saving you time and money so you have the margin to run your world.</p></div>
                        <Link to="/booking" className="mt-10 md:mt-12 inline-flex items-center justify-center px-10 py-4 md:px-10 md:py-5 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle-light transition-all duration-300 font-display font-bold uppercase tracking-widest text-[10px] md:text-sm shadow-xl">Book Clarity Call</Link>
                    </div>
                </div>
            </section>

            {/* SOCIAL FEEDS */}
            <div className="bg-brand-base">
                <SocialSection platform="Instagram" handle="@simpli_fi_life" link="https://www.instagram.com/simpli_fi_life/">
                    <div className="grid grid-cols-2 md:grid-cols-5 relative z-10">
                        {["IG-2026websiteTheSecrettoanEasyTidy-Up.jpeg", "IG-NoMoreMissingSocks-Cover.jpg", "IG-BeigeYTCovershorts.jpeg", "IG-stopkeepingmissingthings.jpg", "6.jpg"].map((img, i) => (
                            <a key={i} href="https://www.instagram.com/simpli_fi_life/" target="_blank" className={`aspect-[9/16] overflow-hidden group relative border-r border-stone-100 last:border-r-0 ${i === 4 ? 'hidden md:block' : 'block'}`}>
                                <img src={`https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/${img}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-brand-periwinkle/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </div>
                            </a>
                        ))}
                    </div>
                </SocialSection>
                <SocialSection platform="YouTube" handle="@Simpli-FILife" link="https://www.youtube.com/@Simpli-FILife">
                    <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 border-t border-stone-100">
                        {["angie%20Storage%20Organized-Cover.jpg", "YT-systems-chaos.png", "YT-expected%20mess%20vs%20clutter.png"].map((img, i) => (
                            <a key={i} href="https://www.youtube.com/@Simpli-FILife" target="_blank" className="aspect-video overflow-hidden group relative border-r border-stone-100 last:border-r-0">
                                <img src={`https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/79fce40a920ca914dea695477cf48735c3454acf/${img}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-brand-periwinkle/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                                </div>
                            </a>
                        ))}
                    </div>
                </SocialSection>
            </div>

            {/* TRANSITION STRIP */}
            <div className="h-40 w-full relative overflow-hidden bg-brand-base">
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#7178c8_1px,transparent_1px),linear-gradient(to_bottom,#7178c8_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            </div>

            {/* FINAL CTA SECTION - FAILSAFE CHECKMARKS */}
            <section className="py-24 md:py-32 bg-brand-dark text-center px-4 relative overflow-hidden border-t border-brand-dark">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
                    <h2 className="font-display font-bold text-5xl md:text-[5rem] text-brand-lemon mb-6 uppercase tracking-tighter drop-shadow-lg leading-none">Are you still here?</h2>
                    <p className="text-lg md:text-xl text-brand-base font-light leading-relaxed mb-10 md:mb-12 px-4">Go ahead and get that free clarity call scheduled.</p>
                    <div className="flex flex-col items-start space-y-6 mb-10 md:mb-12">
                        {["0% Risk", "0% Pressure", "100% Possibility"].map((txt, i) => (
                            <div key={i} className="flex items-center gap-5">
                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg border-2 border-brand-periwinkle flex items-center justify-center flex-shrink-0 bg-brand-periwinkle/10">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D6E31E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <span className="font-handwriting text-xl md:text-3xl text-brand-periwinkle text-left mt-1">{txt}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm md:text-lg text-brand-base/80 font-light mb-8 md:mb-10 text-center px-4 uppercase tracking-widest">All backed by my <span className="italic text-brand-periwinkle-light font-medium">Simpli-FI Life Satisfaction Guarantee</span>.</p>
                    <Link to="/booking" className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-4 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle-light transition-all duration-300 shadow-2xl font-display font-bold text-base md:text-lg uppercase tracking-tight transform hover:-translate-y-1">
                        <span className="mr-2">Let's Do This</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                </div>
            </section>
        </div>
    );
};

// Expose to window
window.Home = Home;
