// --- PROFESSIONAL SPACES: TARGETED EMPHASIS LOCKDOWN ---

const DisorganizationChecklist = () => {
    const [checks, setChecks] = useState({});
    const [showResults, setShowResults] = useState(false);
    
    const problems = [
        "Have you ever run out of inventory and had to tell a customer/client no?",
        "Have you ever made a duplicate purchase because you didn't know what inventory you had?",
        "Do you or your staff ever have to search for items because you/they cant find what you're looking for?",
        "Does your mission require you to frequently reorder consumables or manage expired inventory?",
        "Do incoming deliveries turn into box 'pile ups'?",
        "Do you have surplus assets sitting around that need to be auctioned or sold?",
        "Are you concerned about safety hazards or code violations due to clutter?",
        "Is visual clutter creating an overstimulating work environment?"
    ];

    const toggle = (item) => setChecks(p => ({...p, [item]: !p[item]}));
    const score = Object.values(checks).filter(Boolean).length;

    const getResults = () => {
        if (score >= 6) return { 
            level: "High Priority", 
            message: "Your business is currently leaking revenue through labor loss and inventory friction. Your systems are no longer supporting your growth—they are actively hindering it.",
            action: "Schedule Audit Immediately" 
        };
        if (score >= 3) return { 
            level: "Medium Priority", 
            message: "Friction is slowing your team's efficiency. While you are operational, you are likely over-spending on consumables and losing hours to 'searching' rather than 'serving'.",
            action: "Discuss System Optimization" 
        };
        return { 
            level: "Low Priority", 
            message: "You have a baseline for order, but your current systems may not be scalable. Now is the time to build the framework for your next level of growth.",
            action: "Explore Scalable Systems" 
        };
    };

    return (
        <div className="relative min-h-[500px]">
            {!showResults ? (
                <div className="bg-brand-white rounded-3xl p-8 shadow-xl border border-stone-100 text-left">
                    <div className="space-y-4 mb-8">
                        {problems.map((item, i) => (
                            <button key={i} onClick={() => toggle(item)} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-brand-base transition group text-left">
                                <div className={`w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${checks[item] ? 'bg-brand-dark border-brand-dark' : 'border-stone-200 group-hover:border-brand-periwinkle'}`}>
                                    {checks[item] && (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D6E31E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </div>
                                <span className={`text-lg ${checks[item] ? 'text-brand-dark font-medium' : 'text-brand-medium'}`}>{item}</span>
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => setShowResults(true)}
                        className="w-full bg-brand-periwinkle text-white py-5 rounded-xl font-display font-bold text-xl uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg"
                    >
                        Analyze My Operational Risk
                    </button>
                </div>
            ) : (
                <div className="bg-brand-periwinkle rounded-[2.5rem] p-10 md:p-16 text-brand-white shadow-2xl border-4 border-brand-lemon animate-fade-in-up relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><Icon name="bar-chart" className="w-32 h-32" /></div>
                    <div className="relative z-10">
                        <h3 className="font-display text-2xl uppercase tracking-[0.2em] text-brand-lemon mb-4">Risk Analysis Complete</h3>
                        <div className="text-6xl md:text-8xl font-bold mb-8 font-display tracking-tighter">
                            {score}<span className="text-3xl opacity-50 ml-2">/ 8</span>
                        </div>
                        <div className="space-y-6 max-w-xl">
                            <h4 className="text-3xl font-bold border-b border-white/20 pb-4">{getResults().level}</h4>
                            <p className="text-xl text-brand-periwinkle-light leading-relaxed italic">
                                "{getResults().message}"
                            </p>
                        </div>
                        <div className="mt-12 flex flex-col md:flex-row gap-6">
                            <Link to="/booking" className="bg-brand-lemon text-brand-dark px-10 py-4 rounded-full font-bold uppercase tracking-widest text-center hover:scale-105 transition-transform shadow-xl">
                                {getResults().action}
                            </Link>
                            <button onClick={() => setShowResults(false)} className="text-white/60 hover:text-white underline underline-offset-4 text-sm font-medium">
                                Retake Analysis
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfessionalSpaces = () => {
    usePageTitle("Professional Spaces");
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-brand-base overflow-x-hidden min-h-screen">
            {/* HERO SECTION - REVERTED TYPOGRAPHY */}
            <div className="bg-brand-dark text-brand-base pt-64 pb-[480px] px-4 text-center relative z-10">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <GridBeams beamColor="182, 188, 255" />
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto">
                    <h1 className="font-display font-bold text-5xl md:text-[6.5rem] tracking-tighter mb-4 leading-[0.95] md:leading-[0.85]">
                        Your back-of-house is your
                    </h1>
                    <p className="font-handwriting font-normal text-brand-periwinkle-light lowercase text-4xl md:text-6xl mb-12 block">
                        Competitive Edge.
                    </p>
                    <p className="text-lg md:text-xl font-light text-stone-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                        We restructure back-of-house systems to save you money, recover lost labor hours, and reduce waste—helping you win no matter how you slice it.
                    </p>
                    <Link to="/booking" className="inline-block bg-transparent text-brand-lemon border border-brand-lemon px-10 py-4 rounded-full font-bold hover:bg-brand-lemon hover:text-brand-dark transition transform hover:-translate-y-1 font-display text-lg shadow-xl uppercase tracking-widest">Inquire for your business</Link>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="relative z-30 bg-brand-base">
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#7178c8_1px,transparent_1px),linear-gradient(to_bottom,#7178c8_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                <div className="max-w-5xl mx-auto px-4 relative -top-64 md:-top-80 z-40 overflow-visible">
                    <div className="bg-brand-white rounded-3xl shadow-2xl border-2 border-brand-lemon p-12 text-center relative overflow-visible transition-transform duration-500 hover:scale-[1.01]">
                        
                        <div className="absolute -top-12 -left-6 text-[12rem] font-serif leading-none select-none pointer-events-none z-0" 
                             style={{ WebkitTextStroke: '1.5px #7178c8', color: '#D6E31E', opacity: '1' }}>“</div>
                        
                        <p className="text-2xl md:text-3xl font-light text-brand-dark italic leading-relaxed relative z-10 px-4 pt-4">
                            Our storage units are...so functional thanks to YOU and your amazing work! <br /><br />
                            I am so grateful for you and your team!<br />
                            {/* BUMPED: This line is now 32px on mobile / 42px on desktop */}
                            <span className="block mt-6 text-[32px] md:text-[42px] leading-tight">You helped us turn an <strong className="font-bold text-brand-periwinkle">8 week</strong> set up and tear down into a <strong className="font-bold text-brand-periwinkle">9 day</strong> set up and tear down!</span>
                        </p>
                        <div className="mt-10 flex flex-col items-center justify-center relative z-10">
                            <div className="w-24 h-1 bg-brand-lemon mb-6 rounded-full"></div>
                            <p className="font-display font-bold text-brand-dark uppercase tracking-widest text-sm">- Madison B.</p>
                            <p className="text-xs text-brand-medium font-bold uppercase tracking-wider mt-1">Non-Profit Organization</p>
                        </div>
                    </div>
                </div>

                {/* VIDEO GRID */}
                <div className="max-w-7xl mx-auto px-4 -mt-32 md:-mt-40 mb-24 relative z-10 text-center">
                    <h3 className="font-handwriting text-4xl md:text-5xl text-brand-dark mb-10 leading-loose">No Space Too Big,<br /> No Business Too Small</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: "Fire & Medical Services", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108.mp4" },
                            { label: "Restaurants & Hospitality", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108%20(2)(2).mp4" },
                            { label: "Non Profit", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108%20(1).mp4" }
                        ].map((item, i) => (
                            <div key={i} className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[2/3] border border-stone-100 bg-brand-base transition-all hover:shadow-2xl">
                                <video className="w-full h-full object-cover" autoPlay loop muted playsInline controlsList="nodownload"><source src={item.video} type="video/mp4" /></video>
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-6 left-6">
                                    <div className="bg-brand-periwinkle text-brand-white px-5 py-2 rounded-full font-display font-bold tracking-widest text-xs uppercase shadow-md">{item.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CHECKLIST */}
                <section className="py-24 max-w-7xl mx-auto px-4 relative z-10">
                    <div className="bg-brand-periwinkle-light/20 rounded-[3rem] p-8 md:p-16 text-center border-2 border-brand-periwinkle/30 backdrop-blur-sm">
                        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tighter mb-6 text-brand-dark">The Hidden Cost of Disorganization</h2>
                        <p className="text-xl text-brand-medium font-light mb-12">Check all that apply to your current operations:</p>
                        <div className="max-w-2xl mx-auto"><DisorganizationChecklist /></div>
                    </div>
                </section>

                {/* FINAL PROCESS CTA */}
                <div className="mt-24 pb-40 max-w-5xl mx-auto px-4 text-center relative z-10">
                    <div className="bg-brand-white p-10 md:p-16 rounded-[3rem] shadow-xl border-2 border-brand-periwinkle relative overflow-hidden group">
                        <h3 className="font-display text-4xl md:text-6xl font-bold text-brand-dark mb-10 tracking-tight leading-[1.1]">Organizing isn't a luxury for your business— <span className="text-brand-periwinkle italic">it's essential.</span></h3>
                        <div className="text-brand-medium text-xl leading-relaxed mb-12 space-y-6 max-w-3xl mx-auto font-light">
                            <p>Every minute your team spends searching for a tool or navigating a crowded stockroom is a minute of lost profit. Disorganization is a quiet tax on your growth.</p>
                            <p>Let's eliminate the friction in your inventory systems so you can get back to what you were meant to do: serve your customers and lead your mission with clarity.</p>
                        </div>
                        <Link to="/booking" className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle hover:text-brand-white transition shadow-2xl font-display font-bold text-xl uppercase tracking-tight transform hover:-translate-y-1">Book My Systems Audit</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
