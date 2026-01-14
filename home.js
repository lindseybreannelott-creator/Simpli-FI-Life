// --- HOME PAGE: SPOTLIGHT & GRID FIXES ---

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
        // We add a small offset (ITEM_WIDTH / 2) to ensure it triggers exactly when the *center* of the card hits the viewport center
        const index = Math.floor((globalCenter - (ITEM_WIDTH / 2)) / TOTAL_CARD_SPACE) % originalItems.length;
        
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
                        <Link to="/residential" className="px-10 py-5 rounded-xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition-all shadow-lg font-display font-bold text-lg uppercase tracking-tight">Residential Space</Link>
                    </div>
                </div>
                <TestimonialScroller />
            </div>

            {/* SERVICES SECTION */}
            <section className="py-32 relative z-10">
                {/* Grid Opacity set to 20% */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-brand-dark italic mb-24 leading-none">Make Room for More in Your....</h2>
                    <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                        <div className="group relative bg-brand-white rounded-3xl p-10 border-2 border-stone-100 flex flex-col items-center transition-all hover:shadow-2xl">
                            {/* SVG Border increased to 3.5 */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
                                <rect x="0" y="0" width="100%" height="100%" rx="24" fill="none" stroke="#D6E31E" strokeWidth="3.5" className="draw-border opacity-0 group-hover:opacity-100" />
                            </svg>
                            <Icon name="building-2" className="w-16 h-16 text-brand-dark mb-8 bg-stone-50 p-4 rounded-3xl" />
                            <h3 className="font-display text-4xl font-bold mb-6 text-brand-dark uppercase tracking-tight">Professional Spaces</h3>
                            <p className="text-brand-medium text-lg mb-10 leading-relaxed max-w-sm">Your back-of-house should fuel your business, not slow it down. We transform chaotic stock rooms into efficient engines.</p>
                            <Link to="/professional-spaces" className="w-full bg-brand-periwinkle-light text-brand-dark px-6 py-4 rounded-2xl font-bold hover:bg-brand-periwinkle hover:text-brand-white transition-all uppercase tracking-widest text-xs shadow-md">Get Organized, Save Money</Link>
                        </div>
                        <div className="group relative bg-brand-white rounded-3xl p-10 border-2 border-stone-100 flex flex-col items-center transition-all hover:shadow-2xl">
                            {/* SVG Border increased to 3.5 */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
                                <rect x="0" y="0" width="100%" height="100%" rx="24" fill="none" stroke="#D6E31E" strokeWidth="3.5" className="draw-border opacity-0 group-hover:opacity-100" />
                            </svg>
                            <Icon name="home" className="w-16 h-16 text-brand-dark mb-8 bg-stone-50 p-4 rounded-3xl" />
                            <h3 className="font-display text-4xl font-bold mb-6 text-brand-dark uppercase tracking-tight">Residential Spaces</h3>
                            <p className="text-brand-medium text-lg mb-10 leading-relaxed max-w-sm">Your home should be a sanctuary, not a source of stress. We create intuitive systems that clear the clutter and calm the chaos.</p>
                            <Link to="/residential" className="w-full bg-brand-periwinkle-light text-brand-dark px-6 py-4 rounded-2xl font-bold hover:bg-brand-periwinkle hover:text-brand-white transition-all uppercase tracking-widest text-xs shadow-md">Get Organized, Lose the Stress</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="py-40 relative overflow-hidden border-y border-stone-100 z-10">
                {/* Grid Opacity standardized to 20% to match section above */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-[0.8fr_1.2fr] gap-24 items-center relative z-10">
                    <img src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/profile-stripedress-directlook.png" className="relative rounded-[2rem] shadow-2xl w-full aspect-[4/5] object-cover object-top mt-16 transform -rotate-1 hover:rotate-0 transition-transform duration-700" alt="Lindsey Lott" />
                    <div className="pt-12 lg:pt-0">
                        <span className="inline-block bg-brand-dark text-brand-lemon px-6 py-2 mb-8 text-xs font-bold tracking-[0.3em] uppercase rounded-full">The Founder</span>
                        <h2 className="font-display text-6xl md:text-7xl font-bold text-brand-periwinkle mb-8 tracking-tighter">Hi, I'm Lindsey.</h2>
                        <div className="text-stone-600 text-xl space-y-8 leading-relaxed font-light">
                            <p>My appreciation for organization began as a Pediatric Nurse in the ER where structure is essential. Transitioning to homeschooling four children truly refined that clinical precision.</p>
                            <p>Today, I help families and businesses eliminate chaos—saving you time and money so you have the margin to run your world.</p>
                        </div>
                        <Link to="/booking" className="mt-12 inline-flex items-center justify-center px-10 py-5 rounded-full bg-brand-periwinkle text-brand-white hover:bg-brand-lemon hover:text-brand-dark transition-all font-display font-bold uppercase tracking-widest text-sm shadow-xl">Book Clarity Call</Link>
                    </div>
                </div>
            </section>

            {/* SOCIAL FEEDS */}
            <div className="pt-32 bg-brand-base">
                <SocialSection platform="Instagram" handle="@simpli_fi_life" link="https://www.instagram.com/simpli_fi_life/">
                    <div className="grid grid-cols-2 md:grid-cols-5 border-t border-stone-100">
                        {["IG-2026websiteTheSecrettoanEasyTidy-Up.jpeg", "IG-NoMoreMissingSocks-Cover.jpg", "IG-BeigeYTCovershorts.jpeg", "IG-stopkeepingmissingthings.jpg", "6.jpg"].map((img, i) => (
                            <a key={i} href="https://www.instagram.com/simpli_fi_life/" target="_blank" className="aspect-[9/16] overflow-hidden group relative border-r border-stone-100 last:border-r-0">
                                <img src={`https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/${img}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-brand-periwinkle/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Icon name="instagram" className="text-white w-8 h-8 drop-shadow-lg" /></div>
                            </a>
                        ))}
                    </div>
                </SocialSection>

                <div className="h-48 w-full relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    <GridBeams spawnRate={500} />
                </div>

                <SocialSection platform="YouTube" handle="@Simpli_FI_Life_SHORTS" link="https://www.youtube.com/@Simpli_FI_Life_SHORTS">
                    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-stone-100">
                        {["angie%20Storage%20Organized-Cover.jpg", "YT-systems-chaos.png", "YT-expected%20mess%20vs%20clutter.png"].map((img, i) => (
                            <a key={i} href="https://www.youtube.com/@Simpli_FI_Life_SHORTS" target="_blank" className="aspect-video overflow-hidden group relative border-r border-stone-100 last:border-r-0">
                                <img src={`https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/79fce40a920ca914dea695477cf48735c3454acf/${img}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-brand-periwinkle/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Icon name="youtube" className="text-white w-12 h-12 drop-shadow-lg" /></div>
                            </a>
                        ))}
                    </div>
                </SocialSection>
            </div>

            {/* FINAL CTA */}
            <section className="py-48 bg-brand-dark text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <h2 className="font-display font-bold text-6xl md:text-8xl text-brand-lemon mb-8 uppercase tracking-tighter">Are you still here?</h2>
                    <p className="text-xl md:text-2xl text-brand-base font-light mb-16 opacity-80">Go ahead and get that free clarity call scheduled.</p>
                    
                    <div className="flex flex-col items-center space-y-8 mb-20">
                        {["0% Risk", "0% Pressure", "100% Possibility"].map((txt, i) => (
                            <div key={i} className="flex items-center gap-6 group">
                                <div className="w-10 h-10 rounded border-2 border-brand-periwinkle flex items-center justify-center bg-brand-periwinkle/10 group-hover:bg-brand-periwinkle/30 transition-colors">
                                    <Icon name="check" className="w-6 h-6 text-brand-lemon" />
                                </div>
                                <span className="font-handwriting text-3xl md:text-5xl text-brand-periwinkle transform -rotate-1 group-hover:rotate-0 transition-transform">{txt}</span>
                            </div>
                        ))}
                    </div>

                    <Link to="/booking" 
                          onMouseEnter={() => setCtaHover(true)}
                          onMouseLeave={() => setCtaHover(false)}
                          className="inline-flex items-center justify-center px-16 py-6 rounded-full bg-brand-lemon text-brand-dark hover:bg-white transition-all shadow-2xl font-display font-bold text-2xl uppercase tracking-tighter transform hover:scale-110 active:scale-95">
                        {ctaHover ? "GREAT CHOICE!" : "Let's Do This"}
                    </Link>
                </div>
            </section>
        </div>
    );
};
