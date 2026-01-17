// --- PROFESSIONAL SPACES (STANDALONE) ---

(function() {
    const ProfessionalSpaces = () => {
        const React = window.React;
        const { useState, useEffect } = React;
        const { Link } = window.ReactRouterDOM;

        useEffect(() => {
            document.title = "Professional Spaces | Simpli-FI Life";
            window.scrollTo(0, 0);
        }, []);

        // --- LOCAL ASSETS (Crash-Proof) ---
        const CheckIcon = () => React.createElement("svg", { className: "w-5 h-5 text-[#2d2a26]", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("polyline", { points: "20 6 9 17 4 12" }));
        const ArrowRight = () => React.createElement("svg", { className: "ml-2 w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" }), React.createElement("polyline", { points: "12 5 19 12 12 19" }));
        
        // Local GridBeams (No external dependency)
        const GridBeams = () => {
            return React.createElement("div", { className: "absolute inset-0 pointer-events-none overflow-hidden" },
                React.createElement("div", { className: "absolute top-0 left-0 w-full h-full opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]" })
            );
        };

        const DisorganizationChecklist = () => {
            const [checks, setChecks] = useState({});
            const [showModal, setShowModal] = useState(false);
            
            const problems = [
                "Have you ever run out of inventory and had to tell a customer no?",
                "Have you ever made a duplicate purchase because you didn't know what inventory you had?",
                "Do staff have to search for items because they can't find what they're looking for?",
                "Does your mission require you to frequently reorder consumables?",
                "Do incoming deliveries turn into box 'pile ups'?",
                "Do you have surplus assets sitting around that need to be auctioned?",
                "Are you concerned about safety hazards or code violations?",
                "Is visual clutter creating an overstimulating work environment?"
            ];

            const toggle = (i) => setChecks(p => ({...p, [i]: !p[i]}));
            const selectedCount = Object.values(checks).filter(Boolean).length;
            const hasChecks = selectedCount > 0;

            const getScore = () => {
                if (selectedCount === 1) return { level: "LOW LIABILITY", color: "text-[#7178c8]", msg: "Your systems are generally healthy, but specific friction points are causing unnecessary stress." };
                if (selectedCount <= 3) return { level: "MODERATE LIABILITY", color: "text-[#F59E0B]", msg: "Even small inefficiencies compound significantly over a fiscal year." };
                if (selectedCount <= 5) return { level: "HIGH LIABILITY", color: "text-orange-600", msg: "Disorganization is likely costing you 10-15% in lost productivity annually." };
                return { level: "CRITICAL LIABILITY", color: "text-red-600", msg: "Your current systems are actively working against your bottom line and staff retention." };
            };

            const score = getScore();

            return (
                <>
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100 text-left">
                        <div className="space-y-4">
                            {problems.map((item, i) => (
                                <button key={i} onClick={() => toggle(i)} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[#fbf9f7] transition group text-left">
                                    <div className={`w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${checks[i] ? 'bg-[#D6E31E] border-[#D6E31E] scale-110' : 'border-stone-200 group-hover:border-[#7178c8]'}`}>
                                        {checks[i] && <CheckIcon />}
                                    </div>
                                    <span className={`text-lg transition-colors ${checks[i] ? 'text-[#2d2a26] font-medium' : 'text-[#57534e]'}`}>{item}</span>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 text-center border-t border-stone-100 pt-8">
                            <button onClick={() => setShowModal(true)} disabled={!hasChecks} className={`inline-flex items-center justify-center px-10 py-4 rounded-full font-display font-bold text-lg uppercase tracking-tight transition-all duration-300 shadow-lg transform ${hasChecks ? 'bg-[#D6E31E] text-[#2d2a26] hover:scale-105 hover:bg-[#7178c8] hover:text-white cursor-pointer' : 'bg-stone-100 text-stone-300 cursor-not-allowed'}`}>
                                See My Scorecard
                            </button>
                        </div>
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-[#2d2a26]/80 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                            <div className="bg-white rounded-[2rem] p-10 shadow-2xl relative max-w-md w-full animate-fade-in-up text-center border-4 border-[#D6E31E]">
                                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 text-[#2d2a26] hover:bg-stone-100 rounded-full">✕</button>
                                <div className="inline-block bg-[#d4d7ff] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-[#2d2a26] mb-6">Score Card Evaluator</div>
                                <p className={`font-display font-bold text-3xl md:text-4xl mb-6 ${score.color}`}>{score.level}</p>
                                <p className="text-[#2d2a26] font-medium text-lg mb-8 leading-relaxed">{score.msg}</p>
                                <Link to="/booking?service=Professional Space Organization" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#D6E31E] text-[#2d2a26] hover:bg-[#7178c8] hover:text-white transition shadow-xl font-display font-bold text-xs uppercase tracking-tight">Let's Talk Solutions <ArrowRight /></Link>
                            </div>
                        </div>
                    )}
                </>
            );
        };

        return (
            <div className="bg-[#fbf9f7] overflow-x-hidden min-h-screen">
                {/* Hero */}
                <div className="bg-[#2d2a26] text-[#fbf9f7] pt-44 pb-96 px-4 text-center relative z-10 overflow-visible">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    <div className="absolute inset-0 pointer-events-none opacity-40"><GridBeams /></div>
                    <div className="relative z-10 max-w-5xl mx-auto">
                        <h1 className="font-display font-light text-5xl md:text-7xl tracking-tighter mb-6 leading-tight">Operational Excellence,<br/><span className="text-[#d4d7ff] font-bold">Organized.</span></h1>
                        <p className="font-handwriting text-xl md:text-3xl text-[#d4d7ff] mb-12 rotate-[-2deg] opacity-90 relative z-20">For Businesses & Institutions</p>
                        <p className="text-xl font-light text-stone-300 max-w-3xl mx-auto mb-10 leading-relaxed">We restructure back-of-house systems to save you money, recover lost labor hours, and reduce waste—helping you win no matter how you slice it.</p>
                        <Link to="/booking?service=Professional Space Organization" className="inline-block bg-transparent text-[#D6E31E] border border-[#D6E31E] px-10 py-4 rounded-full font-bold hover:bg-[#D6E31E] hover:text-[#2d2a26] transition transform hover:-translate-y-1 font-display text-lg shadow-xl">First, Let's talk about your space</Link>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-20">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-x-0 bottom-0 top-[220px] bg-[#fbf9f7]">
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                        </div>
                    </div>

                    <div className="relative z-30">
                        {/* Testimonial */}
                        <div className="max-w-5xl mx-auto px-4 -mt-48 mb-24 relative overflow-visible">
                            <div className="bg-white rounded-3xl shadow-2xl border border-stone-100 p-12 text-center relative overflow-visible">
                                <div className="absolute -top-24 -left-8 text-[12rem] font-serif leading-none select-none pointer-events-none opacity-80" style={{ WebkitTextStroke: '1px #7178c8', color: '#D6E31E' }}>“</div>
                                <p className="text-2xl md:text-3xl font-light text-[#2d2a26] italic leading-relaxed relative z-10 px-4">
                                    Our storage units are...so functional thanks to YOU and your amazing work!<br /><br />
                                    I am so grateful for you and your team! <span className="block mt-6 text-3xl md:text-4xl">You helped us turn an <strong className="font-bold text-[#7178c8]">8 week</strong> set up and tear down into a <strong className="font-bold text-[#7178c8]">9 day</strong> set up and tear down!</span>
                                </p>
                                <div className="mt-10 flex flex-col items-center justify-center">
                                    <div className="w-24 h-1 bg-[#D6E31E] mb-6 rounded-full"></div>
                                    <p className="font-display font-bold text-[#2d2a26] uppercase tracking-widest text-sm">- Madison B.</p>
                                    <p className="text-xs text-[#57534e] font-bold uppercase tracking-wider mt-1">Non-Profit Organization</p>
                                </div>
                            </div>
                        </div>

                        {/* Industry Videos */}
                        <div className="max-w-7xl mx-auto px-4 relative mb-24">
                            <div className="text-center mb-12">
                                {/* COLOR CHANGE HERE: to #7178c8 (Periwinkle) */}
                                <h3 className="font-handwriting text-4xl md:text-5xl text-[#7178c8] mb-10 leading-loose">No Space Too Big,<br /> No Business Too Small</h3>
                                <div className="max-w-2xl mx-auto space-y-8">
                                    <p className="text-[#57534e] text-lg leading-loose">Whether you're saving lives or serving lattes, your environment dictates your efficiency. Here are a few industries that have benefited from our organizing.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                {[
                                    { label: "Fire & Medical Services", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108.mp4" },
                                    { label: "Restaurants & Hospitality", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108%20(2)(2).mp4" },
                                    { label: "Non Profit", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108%20(1).mp4" }
                                ].map((item, i) => (
                                    <div key={i} className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[2/3] border border-stone-100 cursor-pointer bg-[#fbf9f7]">
                                        <video className="w-full h-full object-cover transition duration-700 group-hover:scale-110 pointer-events-none" autoPlay loop muted playsInline controlsList="nodownload" preload="auto">
                                            <source src={item.video} type="video/mp4" />
                                        </video>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a26]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                        <div className="absolute bottom-6 left-6">
                                            <div className="bg-[#7178c8] text-white px-5 py-2 rounded-full font-display font-bold tracking-widest text-xs uppercase shadow-md">{item.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hidden Cost Section */}
                        <section id="roi" className="py-24 max-w-7xl mx-auto px-4 relative">
                            <div className="bg-[#d4d7ff]/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center shadow-xl border-2 border-[#d4d7ff]/30 backdrop-blur-sm">
                                <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tighter mb-6 text-[#2d2a26] relative z-10">The Hidden Cost of Disorganization</h2>
                                <div className="w-24 h-1 bg-[#7178c8] mx-auto mb-12 rounded-full relative z-10"></div>
                                <p className="text-xl text-[#57534e] font-light leading-relaxed mb-8 max-w-2xl mx-auto relative z-10">Check all that apply to your current operations:</p>
                                <div className="max-w-2xl mx-auto relative z-10 text-[#2d2a26]"><DisorganizationChecklist /></div>
                            </div>
                        </section>

                        {/* Investment Section */}
                        <div className="mt-24 pb-24 max-w-5xl mx-auto px-4">
                            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border-2 border-[#7178c8] text-center relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="font-display text-4xl md:text-6xl font-bold text-[#2d2a26] mb-10 leading-none tracking-tight">
                                        Organizing isn't a luxury for your business—<br className="hidden md:block" />
                                        <span className="text-[#7178c8]">it's essential.</span>
                                    </h3>
                                    <p className="text-[#57534e] text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
                                        Organizing can be an upfront investment, but we custom tailor your systems to your needs so they last for years to come... meaning you keep reaping the benefits of saved money, recovered time, and a better customer experience.
                                    </p>
                                    <Link to="/booking?service=Professional Space Organization" className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-[#D6E31E] text-[#2d2a26] hover:bg-[#7178c8] hover:text-white transition shadow-2xl font-display font-bold text-xl uppercase tracking-tight transform hover:-translate-y-1">
                                        Book Clarity Call <ArrowRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    window.ProfessionalSpaces = ProfessionalSpaces;
})();
