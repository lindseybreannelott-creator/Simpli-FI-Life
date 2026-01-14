// --- HOME PAGE: DESIGN-LOCKED VERSION 2.0 ---

const TestimonialScroller = () => {
    // We ensure Lauren V is included in the rotation
    const originalItems = typeof TESTIMONIALS !== 'undefined' ? TESTIMONIALS : [];
    const displayItems = [...originalItems, ...originalItems, ...originalItems, ...originalItems, ...originalItems];
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const ITEM_WIDTH_VW = 22; 
    const GAP_PX = 24;

    const handleScroll = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scrollPos = container.scrollLeft;
        const cardFullWidth = (container.offsetWidth * (ITEM_WIDTH_VW / 100)) + GAP_PX;
        
        const center = scrollPos + (container.offsetWidth / 2);
        const index = Math.round(center / cardFullWidth) % originalItems.length;
        setActiveIndex(index);

        const maxScroll = container.scrollWidth - container.offsetWidth;
        if (scrollPos <= 10) {
            container.scrollLeft = cardFullWidth * originalItems.length * 2;
        } else if (scrollPos >= maxScroll - 10) {
            container.scrollLeft = cardFullWidth * originalItems.length * 2;
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const cardFullWidth = (container.offsetWidth * (ITEM_WIDTH_VW / 100)) + GAP_PX;
            container.scrollLeft = cardFullWidth * originalItems.length * 2;
        }
    }, [originalItems.length]);

    return (
        <div className="relative w-full py-12 group">
            <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar items-center py-24"
                style={{ paddingLeft: '5vw', paddingRight: '5vw' }}
            >
                {displayItems.map((t, i) => {
                    const isCenter = (i % originalItems.length) === activeIndex;
                    return (
                        <div 
                            key={i} 
                            className={`snap-center flex-shrink-0 p-8 rounded-3xl border-2 transition-all duration-700 flex flex-col justify-between relative shadow-xl
                                ${isCenter 
                                    ? 'bg-brand-lemon/20 border-brand-lemon scale-110 z-20 shadow-brand-lemon/30' 
                                    : 'bg-brand-white border-stone-100 scale-90 z-10 opacity-40 blur-[1px]'
                                }`}
                            style={{ 
                                marginRight: `${GAP_PX}px`, 
                                width: `${ITEM_WIDTH_VW}vw`, 
                                minWidth: '280px',
                                minHeight: '400px' 
                            }}
                        >
                            <div className="absolute -top-10 -left-4 text-[10rem] font-serif leading-none opacity-20 select-none pointer-events-none" 
                                 style={{ WebkitTextStroke: '1px #7178c8', color: '#D6E31E' }}>“</div>
                            
                            <div className="relative z-10 pt-8">
                                <p className="text-brand-dark text-lg italic leading-relaxed">
                                    "{t.quote}"
                                </p>
                            </div>
                            <div className={`mt-auto pt-4 border-t ${isCenter ? 'border-brand-lemon' : 'border-stone-100'}`}>
                                <p className="font-display font-bold text-brand-periwinkle uppercase text-xs tracking-[0.2em]">{t.author}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const InstagramFeed = () => {
    const images = [
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/IG-2026websiteTheSecrettoanEasyTidy-Up.jpeg",
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/IG-NoMoreMissingSocks-Cover.jpg",
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/IG-BeigeYTCovershorts.jpeg",
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/IG-stopkeepingmissingthings.jpg",
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/6.jpg",
    ];
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 border-t-8 border-brand-periwinkle-light">
            {images.map((img, i) => (
                <a key={i} href="https://www.instagram.com/simpli_fi_life/" target="_blank" className="aspect-[9/16] overflow-hidden group relative">
                    <img src={img} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                </a>
            ))}
        </div>
    );
};

const Home = () => {
    usePageTitle("Home");
    const [ctaHover, setCtaHover] = useState(false);

    return (
        <div className="overflow-x-hidden">
            {/* HERO SECTION */}
            <div className="relative bg-brand-base overflow-hidden min-h-screen flex flex-col justify-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <GridBeams />
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10 pt-44 pb-12 px-4 text-center">
                    <h1 className="font-display text-6xl sm:text-7xl md:text-9xl font-bold text-brand-dark mb-8 tracking-tighter leading-[0.85]">
                        Get Organized<br />
                        <span className="text-brand-medium italic font-light">without the overwhelm.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-medium mb-16 max-w-3xl mx-auto font-light">Life can be chaotic, your space doesn't need to be.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24">
                        <Link to="/professional-spaces" className="px-12 py-6 rounded-2xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition-all shadow-xl font-display font-bold text-xl uppercase tracking-tighter transform hover:-translate-y-1">Professional Space</Link>
                        <Link to="/residential" className="px-12 py-6 rounded-2xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition-all shadow-xl font-display font-bold text-xl uppercase tracking-tighter transform hover:-translate-y-1">Residential Space</Link>
                    </div>
                </div>
                {/* INFINITE SCROLLER */}
                <div className="relative z-10 w-full"><TestimonialScroller /></div>
            </div>

            {/* SERVICES SECTION WITH CONTINUED GRID */}
            <section className="py-32 bg-brand-base relative border-t border-stone-100">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="font-display text-6xl md:text-8xl font-bold tracking-tighter text-brand-dark italic leading-none">Make Room for More in Your....</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="group relative bg-brand-white rounded-[2rem] p-12 border-2 border-stone-100 transition-all duration-500 hover:shadow-2xl">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2rem]">
                                <rect x="0" y="0" width="100%" height="100%" rx="32" ry="32" fill="none" stroke="#D6E31E" strokeWidth="12" className="draw-border opacity-0 group-hover:opacity-100" />
                            </svg>
                            <h3 className="font-display text-5xl font-bold mb-8 text-brand-dark">Professional Spaces</h3>
                            <p className="text-brand-medium text-xl mb-12 font-light leading-relaxed">Your back-of-house should fuel your business, not slow it down. We transform chaotic supply rooms and offices into efficient engines.</p>
                            <Link to="/professional-spaces" className="inline-block bg-brand-periwinkle-light text-brand-dark px-10 py-5 rounded-2xl font-bold hover:bg-brand-periwinkle hover:text-brand-white transition-all uppercase tracking-tighter text-lg shadow-lg">Get Organized, Save Money</Link>
                        </div>

                        <div className="group relative bg-brand-white rounded-[2rem] p-12 border-2 border-stone-100 transition-all duration-500 hover:shadow-2xl">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2rem]">
                                <rect x="0" y="0" width="100%" height="100%" rx="32" ry="32" fill="none" stroke="#D6E31E" strokeWidth="12" className="draw-border opacity-0 group-hover:opacity-100" />
                            </svg>
                            <h3 className="font-display text-5xl font-bold mb-8 text-brand-dark">Residential Spaces</h3>
                            <p className="text-brand-medium text-xl mb-12 font-light leading-relaxed">Your home should be a sanctuary, not a source of stress. We create intuitive systems that clear the clutter and calm the chaos.</p>
                            <Link to="/residential" className="inline-block bg-brand-periwinkle-light text-brand-dark px-10 py-5 rounded-2xl font-bold hover:bg-brand-periwinkle hover:text-brand-white transition-all uppercase tracking-tighter text-lg shadow-lg">Get Organized, Lose the Stress</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="py-40 relative bg-brand-base overflow-hidden border-y border-stone-100">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-[0.9fr_1.1fr] gap-24 items-center relative z-10">
                    <img src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/profile-stripedress-directlook.png" className="relative rounded-[2.5rem] shadow-2xl w-full aspect-[4/5] object-cover" alt="Lindsey Lott" />
                    <div>
                        <span className="inline-block bg-brand-dark text-brand-lemon px-6 py-2 mb-8 text-xs font-bold tracking-[0.3em] uppercase rounded-full">The Founder</span>
                        <h2 className="font-display text-6xl md:text-7xl font-bold text-brand-periwinkle mb-10 tracking-tighter">Hi, I'm Lindsey.</h2>
                        <div className="text-stone-600 text-xl space-y-8 leading-relaxed font-light">
                            <p>My appreciation for organization began as a Pediatric Nurse in the ER where structure is essential. However, those skills were truly put to the test as I transitioned to raising and homeschooling our four children.</p>
                            <p>Today, I apply that clinical precision to help businesses and families eliminate friction—saving you time and money so you have the margin to run your world.</p>
                        </div>
                    </div>
                </div>
            </section>

            <InstagramFeed />

            {/* FINAL CTA */}
            <section className="py-48 bg-brand-dark text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <h2 className="font-display font-bold text-7xl md:text-9xl text-brand-lemon mb-12 uppercase tracking-tighter">Are you still here?</h2>
                    
                    <div className="font-handwriting text-3xl md:text-4xl text-brand-periwinkle-light mb-20 space-x-8">
                        <span className="inline-block transform -rotate-3">0% Risk.</span>
                        <span className="inline-block transform rotate-2">0% Pressure.</span>
                        <span className="inline-block transform -rotate-1 text-brand-periwinkle font-bold">100% Intention.</span>
                    </div>

                    <Link 
                        to="/booking" 
                        onMouseEnter={() => setCtaHover(true)} 
                        onMouseLeave={() => setCtaHover(false)} 
                        className="inline-flex items-center justify-center px-20 py-8 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-white transition-all shadow-2xl font-display font-bold text-3xl uppercase tracking-tighter transform hover:scale-110"
                    >
                        {ctaHover ? "GREAT CHOICE!" : "Let's Do This"}
                    </Link>
                </div>
            </section>
        </div>
    );
};
