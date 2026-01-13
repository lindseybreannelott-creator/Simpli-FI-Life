// --- HOME PAGE DRAWING ALL VERBATIM DETAILS ---

const TestimonialScroller = () => {
    // We use the data from data.js
    const originalItems = typeof TESTIMONIALS !== 'undefined' ? TESTIMONIALS : [];
    // We loop it so it's infinite
    const displayItems = [...originalItems, ...originalItems, ...originalItems];
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const ITEM_WIDTH = 340; 
    const GAP = 24;

    const handleScroll = () => {
        if (!containerRef.current) return;
        const scrollPos = containerRef.current.scrollLeft;
        const center = scrollPos + (containerRef.current.offsetWidth / 2);
        const index = Math.round(center / (ITEM_WIDTH + GAP)) % originalItems.length;
        setActiveIndex(index);
    };

    return (
        <div className="relative w-full py-12">
            <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar items-center py-20"
                style={{ paddingLeft: 'calc(50% - 170px)', paddingRight: 'calc(50% - 170px)' }}
            >
                {displayItems.map((t, i) => {
                    const isCenter = (i % originalItems.length) === activeIndex;
                    return (
                        <div 
                            key={i} 
                            className={`snap-center flex-shrink-0 p-8 rounded-2xl border-2 transition-all duration-500 flex flex-col justify-between relative shadow-xl
                                ${isCenter 
                                    ? 'bg-brand-white border-brand-lemon scale-110 z-20 shadow-brand-lemon/20' 
                                    : 'bg-brand-white/80 border-stone-100 scale-95 z-10 opacity-60'
                                }`}
                            style={{ marginRight: `${GAP}px`, width: `${ITEM_WIDTH}px`, minHeight: '420px' }}
                        >
                            {/* Citron Quote Highlight Logic */}
                            <div className="absolute -top-10 -left-4 text-[12rem] font-serif leading-none opacity-20 select-none pointer-events-none" 
                                 style={{ WebkitTextStroke: '1px #7178c8', color: '#D6E31E' }}>“</div>
                            
                            <div className="relative z-10 pt-12">
                                <p className={`text-brand-dark text-lg italic mb-6 leading-relaxed transition-colors ${isCenter ? 'text-brand-dark' : 'text-brand-medium'}`}>
                                    "{t.quote}"
                                </p>
                            </div>
                            <div className={`mt-auto pt-4 border-t ${isCenter ? 'border-brand-lemon' : 'border-stone-100'}`}>
                                <p className="font-display font-bold text-brand-periwinkle uppercase text-sm tracking-widest">{t.author}</p>
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
        <div className="grid grid-cols-2 md:grid-cols-5 border-t-4 border-brand-periwinkle-light">
            {images.map((img, i) => (
                <a key={i} href="https://www.instagram.com/simpli_fi_life/" target="_blank" className="aspect-[9/16] overflow-hidden group relative">
                    <img src={img} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-brand-periwinkle/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                
                <div className="max-w-7xl mx-auto relative z-10 pt-32 pb-12 px-4 text-center">
                    <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-brand-dark mb-8 tracking-tighter leading-[0.9]">
                        Get Organized<br />
                        <span className="text-brand-medium italic pr-2">without the overwhelm.</span>
                    </h1>
                    <p className="text-xl text-brand-medium mb-12 max-w-2xl mx-auto">Life can be chaotic, your space doesn't need to be.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/professional-spaces" className="px-10 py-5 rounded-xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition-all shadow-xl font-display font-bold text-xl uppercase tracking-tight">Professional Space</Link>
                        <Link to="/residential" className="px-10 py-5 rounded-xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition-all shadow-xl font-display font-bold text-xl uppercase tracking-tight">Residential Space</Link>
                    </div>
                </div>
                <div className="relative z-10 w-full mt-12"><TestimonialScroller /></div>
            </div>

            {/* SERVICES WITH CITRON BORDER ANIMATION */}
            <section className="py-24 bg-brand-base relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-brand-dark italic">Make Room for More in Your....</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* CARD 1 */}
                        <div className="group relative bg-brand-white rounded-2xl p-10 border-2 border-stone-100 overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#D6E31E" strokeWidth="8" className="draw-border" />
                            </svg>
                            <h3 className="font-display text-4xl font-bold mb-6 text-brand-dark relative z-10">Professional Spaces</h3>
                            <p className="text-brand-medium text-lg mb-8 relative z-10">Your back-of-house should fuel your business, not slow it down. We transform chaotic supply rooms and offices into efficient engines.</p>
                            <Link to="/professional-spaces" className="inline-block relative z-10 bg-brand-periwinkle-light text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-brand-periwinkle hover:text-brand-white transition-all uppercase tracking-tighter">Get Organized, Save Money</Link>
                        </div>
                        {/* CARD 2 */}
                        <div className="group relative bg-brand-white rounded-2xl p-10 border-2 border-stone-100 overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#D6E31E" strokeWidth="8" className="draw-border" />
                            </svg>
                            <h3 className="font-display text-4xl font-bold mb-6 text-brand-dark relative z-10">Residential Spaces</h3>
                            <p className="text-brand-medium text-lg mb-8 relative z-10">Your home should be a sanctuary, not a source of stress. We create intuitive systems that clear the clutter and calm the chaos.</p>
                            <Link to="/residential" className="inline-block relative z-10 bg-brand-periwinkle-light text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-brand-periwinkle hover:text-brand-white transition-all uppercase tracking-tighter">Get Organized, Lose the Stress</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT ME WITH CONTINUED GRID */}
            <section className="py-32 relative bg-brand-base overflow-hidden border-t border-stone-100">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-[0.8fr_1.2fr] gap-20 items-center relative z-10">
                    <img src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/profile-stripedress-directlook.png" className="rounded-3xl shadow-2xl w-full aspect-[4/5] object-cover" alt="Lindsey Lott" />
                    <div>
                        <span className="inline-block bg-brand-dark text-brand-lemon px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase">The Founder</span>
                        <h2 className="font-display text-5xl md:text-6xl font-bold text-brand-periwinkle mb-8">Hi, I'm Lindsey.</h2>
                        <div className="text-stone-600 text-lg space-y-6 leading-relaxed">
                            <p>My appreciation for organization began as a Pediatric Nurse in the ER where structure is essential. However, those skills were truly put to the test as I transitioned to raising and homeschooling our four children.</p>
                            <p>Today, I apply that clinical precision to help businesses and families eliminate friction—saving you time and money so you have the margin to run your world.</p>
                        </div>
                    </div>
                </div>
            </section>

            <InstagramFeed />

            {/* FINAL SECTION WITH LIGHT GRID AND ROCK SALT TEXT */}
            <section className="py-40 bg-brand-dark text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="font-display font-bold text-6xl md:text-8xl text-brand-lemon mb-10 uppercase tracking-tighter">Are you still here?</h2>
                    
                    {/* RESTORED PERIWINKLE ROCK SALT TEXT */}
                    <div className="font-handwriting text-2xl md:text-3xl text-brand-periwinkle-light mb-16 space-x-4">
                        <span className="inline-block transform -rotate-2">0% Risk.</span>
                        <span className="inline-block transform rotate-1">0% Pressure.</span>
                        <span className="inline-block transform -rotate-1 text-brand-periwinkle">100% Intention.</span>
                    </div>

                    <Link 
                        to="/booking" 
                        onMouseEnter={() => setCtaHover(true)} 
                        onMouseLeave={() => setCtaHover(false)} 
                        className="inline-flex items-center justify-center px-16 py-6 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-white transition-all shadow-2xl font-display font-bold text-2xl uppercase tracking-tighter transform hover:scale-105"
                    >
                        {ctaHover ? "GREAT CHOICE!" : "Let's Do This"}
                    </Link>
                </div>
            </section>
        </div>
    );
};
