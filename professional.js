// --- PROFESSIONAL SPACES PAGE ---

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

    const toggle = (i) => setChecks(p => ({...p, [i]: !p[i]}));
    const score = Object.values(checks).filter(Boolean).length;

    const getScoreMessage = () => {
        if (score >= 6) return { title: "Critical Friction", desc: "Your current systems are actively costing you significant revenue and labor hours. Immediate intervention is recommended." };
        if (score >= 3) return { title: "Operational Leakage", desc: "You have 'leaks' in your efficiency. These small frictions are compounding into major annual waste." };
        return { title: "Preventative Stage", desc: "You have a solid foundation, but scaling will likely break your current manual processes." };
    };

    return (
        <div className="relative">
            {!showResults ? (
                <div className="bg-brand-white rounded-3xl p-8 shadow-xl border border-stone-100 text-left">
                    <div className="space-y-4 mb-8">
                        {problems.map((item, i) => (
                            <button key={i} onClick={() => toggle(i)} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-brand-base transition group text-left">
                                <div className={`w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${checks[i] ? 'bg-brand-dark border-brand-dark' : 'border-stone-200 group-hover:border-brand-periwinkle'}`}>
                                    {checks[i] && <Icon name="check" className="w-5 h-5 text-brand-lemon" />}
                                </div>
                                <span className={`text-lg ${checks[i] ? 'text-brand-dark font-medium' : 'text-brand-medium'}`}>{item}</span>
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => setShowResults(true)}
                        className="w-full bg-brand-periwinkle text-white py-4 rounded-xl font-display font-bold text-xl uppercase tracking-widest hover:bg-brand-lemon hover:text-brand-dark transition-all"
                    >
                        Analyze Operational Risk
                    </button>
                </div>
            ) : (
                <div className="bg-brand-dark text-brand-base rounded-3xl p-10 shadow-2xl border-2 border-brand-lemon animate-fade-in-up">
                    <h3 className="font-display text-2xl uppercase tracking-widest text-brand-lemon mb-2">Your Results:</h3>
                    <div className="text-5xl font-bold mb-6 font-display">{score}/8 <span className="text-lg font-light text-stone-400">Risk Factors</span></div>
                    <div className="border-t border-white/10 pt-6">
                        <h4 className="text-2xl font-bold text-brand-periwinkle-light mb-2">{getScoreMessage().title}</h4>
                        <p className="text-stone-300 leading-relaxed mb-8">{getScoreMessage().desc}</p>
                        <div className="flex gap-4">
                            <button onClick={() => setShowResults(false)} className="text-sm underline opacity-50 hover:opacity-100">Reset Test</button>
                            <Link to="/booking" className="bg-brand-lemon text-brand-dark px-6 py-2 rounded-lg font-bold text-sm uppercase">Fix My Systems</Link>
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
            {/* HERO SECTION */}
            <div className="bg-brand-dark text-brand-base pt-44 pb-96 px-4 text-center relative z-10">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="absolute inset-0 pointer-events-none opacity-40"><GridBeams /></div>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <h1 className="font-display font-light text-5xl md:text-7xl tracking-tighter mb-6 leading-tight">Operational Excellence,<br/><span className="text-brand-periwinkle-light font-bold">Organized.</span></h1>
                    <p className="font-handwriting text-xl md:text-3xl text-brand-periwinkle-light mb-12 rotate-[-2deg] opacity-90">For Businesses & Institutions</p>
                    <p className="text-xl font-light text-stone-300 max-w-3xl mx-auto mb-10 leading-relaxed">We restructure back-of-house systems to save you money, recover lost labor hours, and reduce waste—helping you win no matter how you slice it.</p>
                    <Link to="/booking?service=Professional Space Organization" className="inline-block bg-transparent text-brand-lemon border border-brand-lemon px-10 py-4 rounded-full font-bold hover:bg-brand-lemon hover:text-brand-dark transition transform hover:-translate-y-1 font-display text-lg shadow-xl uppercase tracking-widest">Inquire for Business</Link>
                </div>
            </div>

            {/* CONTENT AREA WITH PERIWINKLE GRID CONTINUITY */}
            <div className="relative z-20 bg-brand-base">
                {/* THIS IS THE GRID YOU WERE MISSING */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#7178c8_1px,transparent_1px),linear-gradient(to_bottom,#7178c8_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                <div className="max-w-5xl mx-auto px-4 -mt-48 mb-24 relative">
                    <div className="bg-brand-white rounded-3xl shadow-2xl border border-stone-100 p-12 text-center relative">
                        <div className="absolute -top-24 -left-8 text-[12rem] font-serif leading-none select-none pointer-events-none opacity-80" style={{ WebkitTextStroke: '1px #7178c8', color: '#D6E31E' }}>“</div>
                        <p className="text-2xl md:text-3xl font-light text-brand-dark italic leading-relaxed relative z-10 px-4">
                            Our storage units are...so functional thanks to YOU and your amazing work! <br /><br />
                            I am so grateful for you and your team!<br />
                            <span className="block mt-6 text-3xl md:text-4xl">You helped us turn an <strong className="font-bold text-brand-periwinkle">8 week</strong> set up and tear down into a <strong className="font-bold text-brand-periwinkle">9 day</strong> set up and tear down!</span>
                        </p>
                        <div className="mt-10 flex flex-col items-center justify-center">
                            <div className="w-24 h-1 bg-brand-lemon mb-6 rounded-full"></div>
                            <p className="font-display font-bold text-brand-dark uppercase tracking-widest text-sm">- Madison B.</p>
                            <p className="text-xs text-brand-medium font-bold uppercase tracking-wider mt-1">Non-Profit Organization</p>
                        </div>
                    </div>
                </div>

                {/* INDUSTRY VIDEOS */}
                <div className="max-w-7xl mx-auto px-4 mb-24 relative z-10">
                    <div className="text-center mb-12">
                        <h3 className="font-handwriting text-4xl md:text-5xl text-brand-dark mb-10 leading-loose">No Space Too Big,<br /> No Business Too Small</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: "Fire & Medical Services", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108.mp4" },
                            { label: "Restaurants & Hospitality", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108%20(2)(2).mp4" },
                            { label: "Non Profit", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108%20(1).mp4" }
                        ].map((item, i) => (
                            <div key={i} className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[2/3] border border-stone-100 bg-brand-base">
                                <video className="w-full h-full object-cover" autoPlay loop muted playsInline controlsList="nodownload"><source src={item.video} type="video/mp4" /></video>
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-6 left-6"><div className="bg-brand-periwinkle text-brand-white px-5 py-2 rounded-full font-display font-bold tracking-widest text-xs uppercase shadow-md">{item.label}</div></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ROI CHECKLIST SECTION */}
                <section className="py-24 max-w-7xl mx-auto px-4 relative z-10">
                    <div className="bg-brand-periwinkle-light/20 rounded-[3rem] p-8 md:p-16 text-center border-2 border-brand-periwinkle/30 backdrop-blur-sm">
                        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tighter mb-6 text-brand-dark">The Hidden Cost of Disorganization</h2>
                        <p className="text-xl text-brand-medium font-light mb-12">Check all that apply to your current operations:</p>
                        <div className="max-w-2xl mx-auto"><DisorganizationChecklist /></div>
                    </div>
                </section>

                {/* FINAL CALL TO ACTION - RESTORED FULL TEXT */}
                <div className="mt-24 pb-24 max-w-5xl mx-auto px-4 text-center relative z-10">
                    <div className="bg-brand-white p-10 md:p-16 rounded-[3rem] shadow-xl border-2 border-brand-periwinkle relative overflow-hidden">
                        <h3 className="font-display text-4xl md:text-6xl font-bold text-brand-dark mb-10 tracking-tight leading-[1.1]">Organizing isn't a luxury for your business— <span className="text-brand-periwinkle italic">it's essential.</span></h3>
                        <div className="text-brand-medium text-xl leading-relaxed mb-12 space-y-6 max-w-3xl mx-auto font-light">
                            <p>Every minute your team spends searching for a tool or navigating a crowded stockroom is a minute of lost profit. Disorganization is a quiet tax on your growth.</p>
                            <p>Let's eliminate the friction in your inventory systems so you can get back to what you were meant to do: serve your customers and lead your mission with clarity.</p>
                        </div>
                        <Link to="/booking?service=Professional Space Organization" className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle hover:text-brand-white transition shadow-2xl font-display font-bold text-xl uppercase tracking-tight transform hover:-translate-y-1">Book My Systems Audit</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
