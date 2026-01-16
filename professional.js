// --- PROFESSIONAL SPACES: TYPOGRAPHY AIR & COPY RESTORATION ---

const DisorganizationChecklist = () => {
    const [checks, setChecks] = useState({});
    const [showResults, setShowResults] = useState(false);
    
    const problems = [
        { id: "stockout", text: "Have you ever run out of inventory and had to tell a customer/client no?", weight: 3 },
        { id: "duplicate", text: "Have you ever made a duplicate purchase because you didn't know what inventory you had?", weight: 3 },
        { id: "searching", text: "Do you or your staff ever have to search for items because you can't find what you're looking for?", weight: 2 },
        { id: "logistics", text: "Does your mission require you to frequently reorder consumables or manage expired inventory?", weight: 2 },
        { id: "pileups", text: "Do incoming deliveries turn into box 'pile ups'?", weight: 1 },
        { id: "surplus", text: "Do you have surplus assets sitting around that need to be auctioned or sold?", weight: 1 },
        { id: "safety", text: "Are you concerned about safety hazards or code violations due to clutter?", weight: 1 },
        { id: "clutter", text: "Is visual clutter creating an overstimulating work environment?", weight: 1 }
    ];

    const toggle = (id) => setChecks(p => ({...p, [id]: !p[id]}));

    const calculateRisk = () => {
        let totalWeight = 0;
        problems.forEach(p => { if (checks[p.id]) totalWeight += p.weight; });
        if (totalWeight >= 8) return { level: "High Priority", message: "Your business is currently leaking revenue through labor loss and inventory friction. Your systems are no longer supporting your growth—they are actively hindering it.", action: "Schedule Audit Immediately" };
        if (totalWeight >= 4) return { level: "Medium Priority", message: "Friction is slowing your team's efficiency. While you are operational, you are likely over-spending on consumables and losing hours to 'searching' rather than 'serving'.", action: "Discuss System Optimization" };
        return { level: "Low Priority", message: "You have a baseline for order, but your current systems may not be scalable. Now is the time to build the framework for your next level of growth.", action: "Explore Scalable Systems" };
    };

    const results = calculateRisk();

    return (
        <div className="relative min-h-[400px]">
            {!showResults ? (
                <div className="bg-white rounded-2xl p-4 md:p-8 shadow-xl border border-stone-100 text-left relative z-10">
                    <div className="space-y-1 md:space-y-2 mb-8">
                        {problems.map((p) => (
                            <button key={p.id} onClick={() => toggle(p.id)} className="w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-brand-base transition group text-left">
                                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${checks[p.id] ? 'bg-brand-dark border-brand-dark' : 'border-stone-200 group-hover:border-brand-periwinkle'}`}>
                                    {checks[p.id] && (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D6E31E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </div>
                                <span className={`text-[15px] md:text-lg leading-tight ${checks[p.id] ? 'text-brand-dark font-medium' : 'text-brand-medium'}`}>{p.text}</span>
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setShowResults(true)} className="w-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle hover:text-white py-4 md:py-5 rounded-xl font-display font-bold text-lg md:text-xl uppercase tracking-widest transition-all shadow-lg">
                        Analyze My Operational Risk
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 text-brand-dark shadow-2xl border-4 border-brand-periwinkle animate-fade-in-up relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#7178c8_1px,transparent_1px),linear-gradient(to_bottom,#7178c8_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    <div className="absolute top-0 right-0 p-8 opacity-10"><Icon name="bar-chart" className="w-32 h-32 text-brand-periwinkle" /></div>
                    <div className="relative z-10 text-center md:text-left">
                        <h3 className="font-display text-2xl uppercase tracking-[0.2em] text-brand-periwinkle mb-4">Risk Analysis Complete</h3>
                        <div className="space-y-6 max-w-xl">
                            <h4 className="text-4xl md:text-6xl font-bold border-b border-brand-periwinkle/20 pb-6 uppercase tracking-tight text-brand-dark">{results.level}</h4>
                            <p className="text-xl md:text-2xl text-brand-medium leading-relaxed italic">"{results.message}"</p>
                        </div>
                        <div className="mt-12 flex flex-col md:flex-row gap-6">
                            <Link to="/booking" className="bg-brand-lemon text-brand-dark px-10 py-5 rounded-full font-bold uppercase tracking-widest text-center hover:bg-brand-periwinkle hover:text-white transition-all shadow-xl text-lg">{results.action}</Link>
                            <button onClick={() => setShowResults(false)} className="text-brand-periwinkle/60 hover:text-brand-periwinkle underline underline-offset-4 text-sm font-medium">Retake Analysis</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfessionalSpaces = () => {
    usePageTitle("Professional Spaces");
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const playVideos = () => {
            const vids = document.querySelectorAll('video');
            vids.forEach(v => v.play().catch(() => {}));
        };
        document.body.addEventListener('touchstart', playVideos, {once: true});
        return () => document.body.removeEventListener('touchstart', playVideos);
    }, []);

    return (
        <div className="bg-brand-base overflow-x-hidden min-h-screen">
            {/* HERO SECTION */}
            <div className="bg-brand-dark text-brand-base pt-64 pb-[480px] px-4 text-center relative z-10">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <GridBeams beamColor="182, 188, 255" />
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto">
                    <h1 className="font-display font-bold text-5xl md:text-[6.5rem] tracking-tighter mb-4 leading-[0.95] md:leading-[0.85]">
                        Your back-of-house is your
                    </h1>
                    <p className="font-handwriting font-light text-brand-periwinkle lowercase text-5xl md:text-7xl mb-12 block">
                        Competitive Edge.
                    </p>
                    <p className="text-lg md:text-xl font-light text-stone-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                        We restructure back-of-house systems to save you money, recover lost labor hours, and reduce waste—helping you win no matter how you slice it.
                    </p>
                    <Link to="/booking" className="inline-block bg-transparent text-brand-lemon border border-brand-lemon px-10 py-4 rounded-full font-bold hover:bg-brand-lemon hover:text-brand-dark transition transform hover:-translate-y-1 font-display text-lg shadow-xl uppercase tracking-widest">Inquire for your business</Link>
                </div>
            </div>

            <div className="relative z-30 bg-brand-base">
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#7178c8_1px,transparent_1px),linear-gradient(to_bottom,#7178c8_1px,transparent_1px)] bg-[size:40px_4
