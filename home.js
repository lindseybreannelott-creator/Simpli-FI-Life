// --- HOME PAGE: FINAL AESTHETIC CALIBRATION ---

const TestimonialScroller = () => {
    const originalItems = typeof TESTIMONIALS !== 'undefined' ? TESTIMONIALS : [];
    const displayItems = [...originalItems, ...originalItems, ...originalItems];
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const CARD_WIDTH_VW = 18; 
    const GAP_VW = 2;

    const handleScroll = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scrollPos = container.scrollLeft;
        const width = container.offsetWidth;
        const centerLine = scrollPos + (width / 2);
        const cardFullWidth = (width * (CARD_WIDTH_VW / 100)) + (width * (GAP_VW / 100));
        
        const index = Math.round(centerLine / cardFullWidth) % originalItems.length;
        setActiveIndex(index);

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
                                    ? 'bg-brand-white border-brand-lemon scale-110 z-40 opacity-100 blur-none ring-8 ring-brand-lemon/5' 
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

const SocialHeader = ({ label, handle, link }) => (
    <div className="text-center py-16 bg-brand-base relative">
        <p className="font-sans text-xs font-bold tracking-[0.3em] text-brand-medium uppercase mb-3">Follow me on</p>
        <h3 className="font-display text-5xl font-bold text-brand-dark mb-4 uppercase tracking-tighter">{label}</h3>
        <a href={link} target="_blank" rel="noopener noreferrer" className="font-display text-brand-periwinkle font-bold hover:text-brand-lemon transition uppercase tracking-widest text-sm italic">
            {handle}
        </a>
    </div>
);

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
             <a href={link} target="_blank" className="block relative group bg-brand-periwinkle-light text-brand-dark px-12 py-4 font-display font-bold tracking-widest text-sm uppercase rounded-full shadow-xl hover:bg-white hover:scale-105 transition-all duration-300">
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
            <div className="relative overflow-hidden min-h-screen flex flex-col justify-center">
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
            <section className="py-32 relative z-10 border-t border-stone-100">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-brand-dark italic mb-24 leading-none">Make Room for More in Your....</h2>
                    <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                        <div className="group relative bg-brand-white rounded-3xl p-10 border-2 border-stone-100 flex flex-col items-center transition-all hover:shadow-2xl">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
                                <rect x="0" y="0" width="100%" height="100%" rx="24" fill="none" stroke="#D6E31E" strokeWidth="3.5" className="draw-border opacity-0 group-hover:opacity-100" />
                            </svg>
                            <Icon name="building-2" className="w-16 h-16 text-brand-dark mb-8 bg-stone-50 p-4 rounded-3xl" />
                            <h3 className="font-display text-4xl font-bold mb-6 text-brand-dark uppercase tracking-tight">Professional Spaces</h3>
                            <p className="text-brand-medium text-lg mb-10 leading-relaxed max-w-sm font-light">Your back-of-house should fuel your business, not slow it down. We transform chaotic stock rooms into efficient engines.</p>
                            <Link to="/professional-spaces" className="w-full bg-brand-periwinkle-light text-brand-dark px-6 py-4 rounded-2xl font-bold hover:bg-brand-periwinkle hover:text-brand-white transition-all uppercase tracking-widest text-xs shadow-md">Get Organized, Save Money</Link>
                        </div>
                        <div className="group relative bg-brand-white rounded-3xl p-10 border-2 border-stone-100 flex flex-col items-center transition-all hover:shadow-2xl">
                            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl z-20">
                                <rect x="0" y="0" width="100%" height="100%" rx="24" fill="none" stroke="#D6E31E" strokeWidth="3.5" className="draw-border opacity-0 group-hover:opacity-100" />
                            </svg>
                            <Icon name="home" className="w-16 h-16 text-brand-dark mb-8 bg-stone-50 p-4 rounded-3xl" />
                            <h3 className="font-display text-4xl font-bold mb-6 text-brand-dark uppercase tracking-tight">Residential Spaces</h3>
                            <p className="text-brand-medium text-lg mb-10 leading-relaxed max-w-sm font-light">Your home should be a sanctuary, not a source of stress. We create intuitive systems that clear the clutter and calm the chaos.</p>
                            <Link to="/residential" className="w-full bg-brand-periwinkle-light text-brand-dark px-6 py-4 rounded-2xl font-bold hover:bg-brand-periwinkle hover:text-brand-white transition-all uppercase tracking-widest text-xs shadow-md">Get Organized, Lose the Stress</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION: PERIWINKLE BACKGROUND & CITRON STATIC BUTTON */}
            <section className="py-40 relative overflow-hidden border-y border-stone-100 z-10">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-[0.9fr_1.1fr] gap-24 items-center relative z-10">
                    {/* PHOTO CARD: Periwinkle bg with Reverse Oatmeal Grid */}
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-periwinkle group">
                        {/* Oatmeal grid lines (#F9F6F0) over Periwinkle */}
                        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#F9F6F0_1px,transparent_1px),linear-gradient(to_bottom,#F9F6F0_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
                        <img 
                            src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/profile-stripedress-directlook.png" 
                            className="relative z-10 w-full aspect-[4/5] object-cover object-top mt-16 transform transition-transform duration-700 group-hover:scale-105" 
                            alt="Lindsey Lott" 
                        />
                    </div>
                    <div className="pt-12 lg:pt-0">
                        <span className="inline-block bg-brand-dark text-brand-lemon px-6 py-2 mb-8 text-xs font-bold tracking-[0.3em] uppercase rounded-full">The Founder</span>
                        <h2 className="font-display text-6xl md:text-7xl font-bold text-brand-periwinkle mb-8 tracking-tighter leading-none">Hi, I'm Lindsey.</h2>
                        <div className="text-stone-600 text-xl space-y-8 leading-relaxed font-light">
                            <p>My appreciation for organization began as a Pediatric Nurse in the ER where structure is essential. Transitioning to homeschooling four children truly refined that clinical precision.</p>
                            <p>Today, I help families and businesses eliminate chaos—saving you time and money so you have the margin to run your world.</p>
                        </div>
                        {/* BUTTON: Citron Static -> Light Periwinkle Hover */}
                        <Link to="/booking" className="mt-12 inline-flex items-center justify-center px-10 py-5 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle-light transition-all duration-300 font-display font-bold uppercase tracking-widest text-sm shadow-xl">
                            Book Clarity Call
                        </Link>
                    </div>
                </div>
            </section>

            {/* SOCIAL FEEDS */}
            <div className="bg-brand-base">
                <SocialHeader label="Instagram" handle="@simpli_fi_life" link="https://www.instagram.com/simpli_fi_life/" />
                <div className="grid grid-cols-2 md:grid-cols-5 border-t-4 border-brand-periwinkle-light">
                    {["IG-2026websiteTheSecrettoanEasyTidy-Up.jpeg", "IG-NoMoreMissingSocks-Cover.jpg", "IG-BeigeYTCovershorts.jpeg", "IG-stopkeepingmissingthings.jpg", "6.jpg"].map((img, i) => (
                        <a key={i} href="https://www.instagram.com/simpli_fi_life/" target="_blank" className="aspect-[9/16] overflow-hidden group relative border-r border-stone-100 last:border-r-0">
                            <img src={`https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/${img}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-brand-periwinkle/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Icon name="instagram" className="text-white w-8 h-8 drop-shadow-lg" /></div>
                        </a>
                    ))}
                </div>

                <div className="h-48 w-full relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    <GridBeams spawnRate={500} />
                </div>

                <SocialHeader label="YouTube" handle="@Simpli-FILife" link="https://www.youtube.com/@Simpli-FILife" />
                <div className="grid grid-cols-1 md:grid-cols-3 border-t-4 border-brand-periwinkle-light">
                    {["angie%20Storage%20Organized-Cover.jpg", "YT-systems-chaos.png", "YT-expected%20mess%20vs%20clutter.png"].map((img, i) => (
                        <a key={i} href="https://www.youtube.com/@Simpli-FILife" target="_blank" className="aspect-video overflow-hidden group relative border-r border-stone-100 last:border-r-0">
                            <img src={`https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/79fce40a920ca914dea695477cf48735c3454acf/${img}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-brand-periwinkle/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Icon name="youtube" className="text-white w-12 h-12 drop-shadow-lg" /></div>
                        </a>
                    ))}
                </div>
            </div>

            {/* FINAL CTA SECTION */}
            <section className="py-32 bg-brand-dark text-center px-4 relative overflow-hidden border-t border-brand-dark">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <h2 className="font-display font-bold text-5xl md:text-6xl text-brand-lemon mb-6 uppercase tracking-tighter drop-shadow-lg">Are you still here?</h2>
                    <p className="text-lg md:text-xl text-brand-base font-light leading-relaxed mb-12">Go ahead and get that free clarity call scheduled.</p>
                    
                    <div className="flex flex-col items-start space-y-6 mb-12">
                        {["0% Risk", "0% Pressure", "100% Possibility"].map((txt, i) => (
                            <div key={i} className="flex items-center gap-5">
                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg border-2 border-brand-periwinkle flex items-center justify-center flex-shrink-0 bg-transparent">
                                    <Icon name="check" className="w-5 h-5 text-brand-lemon" />
                                </div>
                                <span className="font-handwriting text-xl md:text-3xl text-brand-periwinkle text-left mt-1">{txt}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-base md:text-lg text-brand-base/80 font-light mb-10">All backed by my <span className="italic text-brand-periwinkle-light font-medium">Simpli-FI Life Satisfaction Guarantee</span>.</p>

                    <Link to="/booking" 
                          onMouseEnter={() => setCtaHover(true)}
                          onMouseLeave={() => setCtaHover(false)}
                          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle-light transition-all duration-300 shadow-2xl font-display font-bold text-lg uppercase tracking-tight transform hover:-translate-y-1">
                        {ctaHover ? "GREAT CHOICE!" : <><span className="mr-2">Let's Do This</span> <Icon name="arrow-right" className="w-5 h-5"/></>}
                    </Link>
                </div>
            </section>
        </div>
    );
};
