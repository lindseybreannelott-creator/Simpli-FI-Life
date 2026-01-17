// --- RESIDENTIAL SPACES (STANDALONE) ---

(function() {
    // 1. Safe React Access
    const React = window.React;
    const { useState, useEffect } = React;
    const { Link } = window.ReactRouterDOM;

    // 2. Internal Icons (Crash Proof)
    const Icons = {
        Check: () => React.createElement("svg", { className: "w-4 h-4 text-[#2d2a26]", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "4" }, React.createElement("polyline", { points: "20 6 9 17 4 12" })),
        Arrow: () => React.createElement("svg", { className: "ml-2 w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" }), React.createElement("polyline", { points: "12 5 19 12 12 19" })),
        Gem: () => React.createElement("svg", { className: "w-8 h-8 text-[#7178c8]", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, React.createElement("path", { d: "M6 3h12l4 6-10 13L2 9Z" }), React.createElement("path", { d: "M11 3 8 9l4 13 4-13-3-6" }))
    };

    // 3. Checklist Component
    const ServiceChecklist = () => {
        const [checks, setChecks] = useState({});
        const services = [
            { label: "Decluttering Coaching", sub: "(Done with you)" },
            { label: "Decluttering", sub: "(Done for me)" },
            { label: "Organizing + Space Planning Coaching", sub: "(Done with you)" },
            { label: "Organizing + Space Planning", sub: "(Done for me)" },
            { label: "Unpacking From a Move" },
            { label: "Packing for a Move" },
            { label: "Finding 'Homes' for Things" },
            { label: "Legacy Documenting" }
        ];

        const toggle = (i) => setChecks(p => ({...p, [i]: !p[i]}));
        const hasChecks = Object.values(checks).some(Boolean);
        
        // Safe link generation
        const getLink = () => {
            const selected = services.filter((_, i) => checks[i]).map(s => s.label).join(', ');
            return "/booking?service=Residential%20Space%20Organization&notes=" + encodeURIComponent(selected ? "Interested in: " + selected : "");
        };

        return (
            <div className="bg-[#fbf9f7] rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-stone-200 text-left transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-4">
                    {services.map((item, i) => (
                        <button key={i} onClick={() => toggle(i)} className="w-full flex items-start gap-4 p-4 rounded-xl transition group text-left border border-transparent hover:bg-white hover:shadow-sm">
                            <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 mt-1 ${checks[i] ? 'bg-[#D6E31E] border-[#D6E31E] scale-110' : 'border-stone-400 group-hover:border-[#7178c8]'}`}>
                                {checks[i] && <Icons.Check />}
                            </div>
                            <div className={`text-lg transition-all duration-200 ${checks[i] ? 'text-[#2d2a26] font-medium' : 'text-[#2d2a26] group-hover:text-[#7178c8]'}`}>
                                {item.label}
                                {item.sub && <span className="block text-base opacity-70 mt-0.5 font-normal">{item.sub}</span>}
                            </div>
                        </button>
                    ))}
                </div>
                
                {hasChecks && (
                    <div className="mt-8 pt-8 border-t border-stone-200 text-center animate-fade-in-up">
                        <p className="font-sans italic font-medium text-[#7178c8] text-[15px] mb-8 leading-relaxed max-w-xl mx-auto px-4">
                            "No need to tidy up before our call... And we don't judge 😉"
                        </p>
                        <Link to={getLink()} className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#D6E31E] text-[#2d2a26] hover:bg-[#7178c8] hover:text-white transition shadow-lg font-display font-bold text-sm uppercase tracking-widest transform hover:-translate-y-1">
                            Discuss My Project <Icons.Arrow />
                        </Link>
                    </div>
                )}
            </div>
        );
    };

    // 4. Main Component
    const Residential = () => {
        useEffect(() => {
            document.title = "Residential Services | Simpli-FI Life";
            window.scrollTo(0, 0);
        }, []);

        return (
            <div className="bg-[#fbf9f7] overflow-x-hidden">
                {/* Hero */}
                <div className="bg-[#d4d7ff] text-[#2d2a26] pt-44 pb-32 px-4 text-center relative">
                    <div className="relative z-10 max-w-5xl mx-auto">
                        <h1 className="font-display font-light text-5xl md:text-7xl tracking-tighter mb-8 leading-tight">
                            Your home should feel like your <span className="font-bold text-white drop-shadow-sm">Sanctuary</span>,<br/> 
                            <span className="block mt-6 font-handwriting text-xl md:text-3xl text-[#5a60a6] rotate-[-2deg]">not a Storage Unit.</span>
                        </h1>
                        <p className="text-xl font-light max-w-3xl mx-auto mb-12 leading-relaxed">
                            At Simpli-FI Life we work with you to custom tailor systems that fit your unique needs...
                        </p>
                        <Link to="/booking?service=Residential%20Space%20Organization" className="inline-block bg-[#D6E31E] text-[#2d2a26] px-10 py-4 rounded-full font-bold hover:bg-[#7178c8] hover:text-white transition transform hover:-translate-y-1 font-display uppercase tracking-widest text-sm shadow-xl border border-white/20">
                            Ready for your peaceful space?
                        </Link>
                    </div>
                </div>

                {/* Video Split */}
                <div className="py-24 px-4 border-b border-stone-100 overflow-hidden relative z-10">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center relative gap-12">
                        <div className="w-full md:w-1/2 relative z-20">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-video border-[3px] border-[#D6E31E] bg-[#2d2a26] transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                <video className="w-full h-full object-cover pointer-events-none" autoPlay loop muted playsInline controlsList="nodownload" preload="auto">
                                    <source src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/websalescopymov3.mov" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 relative z-10">
                            <div className="bg-[#fbf9f7] p-10 md:p-16 rounded-[2.5rem] shadow-2xl border-2 border-[#D6E31E] h-full flex flex-col justify-center relative transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="absolute -top-12 -left-6 text-[12rem] font-serif leading-none select-none pointer-events-none opacity-80" style={{ WebkitTextStroke: '1.5px #7178c8', color: '#D6E31E' }}>“</div>
                                <div className="relative z-10 pt-8">
                                    <div className="text-[#57534e] font-light italic leading-relaxed space-y-6 text-lg">
                                        <p>"I was so nervous about letting her into my closet... but her encouraging, compassionate personality instantly put me at ease."</p>
                                    </div>
                                    <div className="mt-10 pt-8 border-t border-[#D6E31E]/30">
                                        <p className="font-display font-bold text-[#7178c8] uppercase tracking-wider text-sm">- Lauren V.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Menu */}
                <section className="py-24 max-w-7xl mx-auto px-4 relative z-10">
                    <div className="bg-[#d4d7ff]/40 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center shadow-2xl border-4 border-[#7178c8]">
                        <h2 className="font-display font-bold text-4xl md:text-6xl text-[#2d2a26] mb-8 leading-[0.95] uppercase tracking-tighter">
                            Your Space Simpli-Fied,<br/><span className="text-[#5a60a6]">Your Way</span>
                        </h2>
                        <div className="max-w-3xl mx-auto mb-12 text-[#2d2a26]/80 font-medium text-xl leading-relaxed">
                            <p>Every home has a different rhythm. You know your needs best—so you decide how active a role you'd like to play:</p>
                        </div>
                        <div className="max-w-4xl mx-auto relative z-10 text-[#2d2a26]">
                            <ServiceChecklist />
                        </div>
                    </div>
                </section>

                {/* Luxury Section */}
                <section id="private-client" className="py-32 bg-[#2d2a26] relative overflow-hidden text-center px-4">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="flex justify-center mb-8">
                            <div className="p-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Icons.Gem />
                            </div>
                        </div>
                        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white">Luxury Estate Management</h2>
                        <p className="text-stone-300 text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                            We offer white-glove, <span className="text-white font-normal italic">done-for-you</span> service for clients who value their time above all else.
                        </p>
                        <Link to="/booking?service=Residential%20Space%20Organization&notes=Luxury%20Estate" className="inline-block border border-[#7178c8]/50 text-[#7178c8] hover:text-[#D6E31E] hover:border-[#D6E31E] px-12 py-5 rounded-full font-display font-bold transition-all duration-300 uppercase tracking-widest text-sm shadow-xl">
                            Inquire About Availability
                        </Link>
                    </div>
                </section>
            </div>
        );
    };

    // 5. Expose to Window (Critical!)
    window.Residential = Residential;
})();
