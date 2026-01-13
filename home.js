// --- COMPONENTS FOR HOME PAGE ---

const GridBeams = ({ beamColor = "182, 188, 255", spawnRate = 300, beamWidth = 1 }) => {
    const [beams, setBeams] = useState([]);
    const lemonLime = "214, 227, 30";
    useEffect(() => {
        let count = 0; let active = true;
        const spawn = () => {
            if (!active) return;
            const id = count++;
            const isHorizontal = Math.random() > 0.5;
            const isReverse = Math.random() > 0.5;
            const lineIndex = Math.floor(Math.random() * 100);
            const offset = lineIndex * 40;
            const beamDuration = 1.5 + Math.random() * 2;
            let specificBeamColor = (beamColor === "182, 188, 255" && id % 5 === 0) ? lemonLime : beamColor;
            setBeams(prev => [...prev, { id, isHorizontal, isReverse, offset, duration: beamDuration, color: specificBeamColor }]);
            setTimeout(() => { if (active) setBeams(prev => prev.filter(b => b.id !== id)); }, beamDuration * 1000);
        };
        const interval = setInterval(spawn, spawnRate);
        return () => { active = false; clearInterval(interval); };
    }, [beamColor, spawnRate]);
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {beams.map(b => (
                <div key={b.id} className="absolute" style={{
                    height: b.isHorizontal ? `${beamWidth}px` : '300px', width: b.isHorizontal ? '300px' : `${beamWidth}px`,
                    top: b.isHorizontal ? `${b.offset}px` : (b.isReverse ? '100%' : '-300px'),
                    left: !b.isHorizontal ? `${b.offset}px` : (b.isReverse ? '100%' : '-300px'),
                    filter: `drop-shadow(0 0 4px rgba(${b.color}, 0.8))`,
                    background: b.isHorizontal ? `linear-gradient(90deg, transparent, rgba(${b.color}, 1), transparent)` : `linear-gradient(180deg, transparent, rgba(${b.color}, 1), transparent)`,
                    animation: `${b.isHorizontal ? (b.isReverse ? 'beam-h-rev' : 'beam-h') : (b.isReverse ? 'beam-v-rev' : 'beam-v')} ${b.duration}s linear forwards`
                }} />
            ))}
        </div>
    );
};

const LoadingScreen = ({ onComplete }) => {
    useEffect(() => { const timer = setTimeout(onComplete, 4800); return () => clearTimeout(timer); }, [onComplete]);
    return (
        <div className="fixed inset-0 z-[100] bg-brand-base flex items-center justify-center loader-exit overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] loading-grid-fade-in"></div>
            <div className="absolute inset-0 opacity-40"><GridBeams spawnRate={150} beamWidth={1.5} /></div>
            <div className="relative z-20 loading-logo-reveal text-center px-4">
                <h1 className="font-display text-4xl md:text-6xl tracking-[0.25em] text-brand-dark whitespace-nowrap">
                    <span className="font-bold">SIMPLI-FI</span> <span className="font-light text-brand-medium">LIFE</span>
                </h1>
            </div>
        </div>
    );
};

const TestimonialScroller = () => {
    const originalItems = typeof TESTIMONIALS !== 'undefined' ? TESTIMONIALS : [];
    const displayTestimonials = [...originalItems, ...originalItems, ...originalItems, ...originalItems];
    const [activeIndex, setActiveIndex] = useState(10);
    const containerRef = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const ITEM_WIDTH = 320; const GAP = 24; const TOTAL_ITEM_WIDTH = ITEM_WIDTH + GAP;
    const SET_WIDTH = originalItems.length * TOTAL_ITEM_WIDTH;

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isInitialized) { if(container) { container.scrollLeft = SET_WIDTH; setIsInitialized(true); } }
    }, [isInitialized, SET_WIDTH]);

    const handleScroll = () => {
        const container = containerRef.current; if (!container) return;
        const currentScroll = container.scrollLeft;
        if (currentScroll >= SET_WIDTH * 2) container.scrollLeft = currentScroll - SET_WIDTH;
        else if (currentScroll <= SET_WIDTH - 50) container.scrollLeft = currentScroll + SET_WIDTH;
    };

    return (
        <div className="relative w-full py-12 group">
            <div ref={containerRef} onScroll={handleScroll} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar items-center py-24" style={{ paddingLeft: 'calc(50% - 160px)', paddingRight: 'calc(50% - 160px)' }}>
                {displayTestimonials.map((t, i) => (
                    <div key={i} className="snap-center flex-shrink-0 p-8 rounded-2xl border-2 bg-brand-white border-stone-100 min-h-[400px] flex flex-col justify-between relative shadow-sm" style={{ marginRight: `${GAP}px`, width: `${ITEM_WIDTH}px` }}>
                        <div className="absolute -top-10 -left-4 text-[12rem] font-serif leading-none opacity-20 select-none pointer-events-none" style={{ WebkitTextStroke: '1px #7178c8', color: '#D6E31E' }}>“</div>
                        <div className="relative z-10 pt-12"><p className="text-brand-medium text-lg italic mb-6">"{t.quote}"</p></div>
                        <div className="mt-auto pt-4 border-t border-brand-lemon"><p className="font-display font-bold text-brand-periwinkle uppercase text-sm">{t.author}</p></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- INSTAGRAM FEED (Restored) ---
const InstagramFeed = () => {
    const images = [
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/IG-2026websiteTheSecrettoanEasyTidy-Up.jpeg",
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/IG-NoMoreMissingSocks-Cover.jpg",
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/IG-BeigeYTCovershorts.jpeg",
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/IG-stopkeepingmissingthings.jpg",
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/6.jpg",
    ];
    return (
        <div className="relative w-full bg-brand-base">
            <div className="w-full h-1.5 bg-brand-periwinkle-light relative z-20"></div>
            <div className="grid grid-cols-2 md:grid-cols-5">
                {images.map((img, i) => (
                    <a href="https://www.instagram.com/simpli_fi_life/" key={i} target="_blank" className="block relative group aspect-[9/16] overflow-hidden border-r border-stone-100 last:border-r-0 bg-stone-50">
                        <img src={img} className="w-full h-full object-contain transition duration-700 group-hover:scale-105" alt="Instagram Post" />
                    </a>
                ))}
            </div>
        </div>
    );
};

// --- YOUTUBE FEED (Restored) ---
const YouTubeFeed = () => {
    const thumbs = [
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/79fce40a920ca914dea695477cf48735c3454acf/angie%20Storage%20Organized-Cover.jpg",
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/79fce40a920ca914dea695477cf48735c3454acf/YT-systems-chaos.png",
        "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/79fce40a920ca914dea695477cf48735c3454acf/YT-expected%20mess%20vs%20clutter.png",
    ];
    return (
        <div className="relative w-full bg-brand-base">
            <div className="w-full h-1.5 bg-brand-periwinkle-light relative z-20"></div>
            <div className="grid grid-cols-3">
                {thumbs.map((img, i) => (
                    <a href="https://www.youtube.com/@Simpli-FILife" key={i} target="_blank" className="block relative group aspect-video overflow-hidden border-r border-stone-100 last:border-r-0">
                        <img src={img} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt="YouTube" />
                    </a>
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    usePageTitle("Home");
    const [ctaHover, setCtaHover] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('opacity-100', 'translate-y-0');
        }), { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <div className="relative bg-brand-base overflow-hidden">
                <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <GridBeams />
                </div>
                <div className="max-w-7xl mx-auto relative z-10 pt-44 pb-12 px-4 text-center">
                    <div className="max-w-5xl mx-auto mb-20"> 
                        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-brand-dark mb-8 tracking-tighter leading-[0.9]">
                            Get Organized<br />
                            <span className="text-brand-medium italic pr-2">without the overwhelm.</span>
                        </h1>
                        <p className="text-lg text-brand-medium mb-10 max-w-2xl mx-auto">Life can be chaotic, your space doesn't need to be.</p>
                        <p className="text-xl font-display font-normal text-brand-dark mb-6">Let's organize my:</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/professional-spaces" className="flex items-center justify-center px-8 py-4 rounded-xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition shadow-lg font-display font-bold text-lg uppercase tracking-tight">Professional Space</Link>
                            <Link to="/residential" className="flex items-center justify-center px-8 py-4 rounded-xl bg-brand-periwinkle-light text-brand-dark hover:bg-brand-lemon transition shadow-lg font-display font-bold text-lg uppercase tracking-tight">Residential Space</Link>
                        </div>
                    </div>
                </div>
                
                <div className="relative z-10 w-full mb-16"><TestimonialScroller /></div>

                <div id="services" className="relative z-10 pb-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16 reveal opacity-0 translate-y-10 duration-1000">
                            <h2 className="font-display text-6xl md:text-7xl font-bold tracking-tighter text-brand-dark italic">Make Room for More in Your....</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-brand-white rounded-2xl p-8 border-2 border-stone-100 reveal opacity-0 translate-y-10 flex flex-col relative group overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="font-display text-3xl font-bold mb-6 text-brand-dark">Professional Spaces</h3>
                                    <p className="text-brand-medium mb-8">Your back-of-house should fuel your business, not slow it down. We transform chaotic supply rooms, offices, and storage spaces into efficient engines.</p>
                                    <Link to="/professional-spaces" className="flex items-center justify-center w-full bg-brand-periwinkle-light text-brand-dark px-6 py-4 rounded-xl font-display font-bold hover:bg-brand-periwinkle hover:text-brand-white transition uppercase tracking-tight">Get Organized, Save Money</Link>
                                </div>
                            </div>
                            <div className="bg-brand-white rounded-2xl p-8 border-2 border-stone-100 reveal opacity-0 translate-y-10 flex flex-col relative group overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="font-display text-3xl font-bold mb-6 text-brand-dark">Residential Spaces</h3>
                                    <p className="text-brand-medium mb-8">Your home should be a sanctuary, not a source of stress. We create intuitive systems that clear the clutter and calm the chaos.</p>
                                    <Link to="/residential" className="flex items-center justify-center w-full bg-brand-periwinkle-light text-brand-dark px-6 py-4 rounded-xl font-display font-bold hover:bg-brand-periwinkle hover:text-brand-white transition uppercase tracking-tight">Get Organized, Lose the Stress</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="pt-24 pb-48 bg-brand-base border-y border-stone-100 reveal opacity-0 translate-y-10 relative">
                    <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center relative z-10">
                        <div className="relative mb-12 lg:mb-0 text-center lg:text-left z-20">
                            <img src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/profile-stripedress-directlook.png" className="relative z-10 rounded-2xl shadow-2xl w-full max-md:max-w-xs mx-auto lg:mx-0 aspect-[4/5] object-cover object-top" alt="Lindsey Lott" />
                        </div>
                        <div>
                            <span className="inline-block bg-brand-dark text-brand-lemon px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase relative">The Founder</span>
                            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-brand-periwinkle mb-6">Hi, I'm Lindsey.</h2>
                            <h3 className="text-xl text-brand-medium font-medium mb-6">I believe whether in business or at home, your space and the things in it should support your life—not be a source of stress.</h3>
                            <div className="text-stone-500 leading-relaxed mb-8 space-y-6">
                                <p>My appreciation for organization & systems began as a Pediatric Nurse in the ER where structure is essential. However, those skills were truly put to the test—and refined—as I transitioned to raising and homeschooling our four children.</p>
                                <p>Today, I apply that unique blend of clinical precision and practical space management to help families and businesses eliminate chaos and friction—saving you time and money so you have the margin to run your corner of the world.</p>
                            </div>
                            <Link to="/booking" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-periwinkle text-white hover:bg-brand-lemon hover:text-brand-dark transition shadow-lg font-display font-bold text-lg uppercase tracking-tight transform hover:-translate-y-1">Book Clarity Call</Link>
                        </div>
                    </div>
                </section>

                <InstagramFeed />
                <div className="h-[175px] w-full bg-brand-base relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                </div>
                <YouTubeFeed />

                <section className="py-32 bg-brand-dark text-center px-4 relative overflow-hidden border-t border-brand-dark">
                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                        <h2 className="font-display font-bold text-5xl md:text-7xl text-brand-lemon mb-6 uppercase tracking-tighter">Are you still here?</h2>
                        <p className="text-xl md:text-2xl text-brand-base font-light mb-12">Go ahead and get that free clarity call scheduled.</p>
                        <Link to="/booking" onMouseEnter={() => setCtaHover(true)} onMouseLeave={() => setCtaHover(false)} className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle-light transition-all shadow-2xl font-display font-bold text-xl uppercase tracking-tight transform hover:-translate-y-1 min-w-[280px]">
                            {ctaHover ? "GREAT CHOICE!" : "Let's Do This"}
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};
