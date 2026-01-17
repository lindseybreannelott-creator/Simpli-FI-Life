// --- PROFESSIONAL SPACES ---

(function() {
    const ProfessionalSpaces = () => {
        const React = window.React;
        const ReactDOM = window.ReactDOM; // Defined locally to prevent crash
        const { useState, useEffect } = React;
        const { Link } = window.ReactRouterDOM;

        useEffect(() => {
            if (window.Core && window.Core.usePageTitle) window.Core.usePageTitle("Professional Spaces");
            window.scrollTo(0, 0);
        }, []);

        // Internal Icons
        const CheckIcon = () => React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "#D6E31E", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("polyline", { points: "20 6 9 17 4 12" }));
        const ArrowRight = () => React.createElement("svg", { className: "ml-2 w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" }), React.createElement("polyline", { points: "12 5 19 12 12 19" }));
        const BarChartIcon = () => React.createElement("svg", { className: "w-20 h-20 text-[#7178c8]", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("line", { x1: "12", y1: "20", x2: "12", y2: "10" }), React.createElement("line", { x1: "18", y1: "20", x2: "18", y2: "4" }), React.createElement("line", { x1: "6", y1: "20", x2: "6", y2: "16" }));
        const CloseIcon = () => React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }));

        // Checklist Component
        const DisorganizationChecklist = () => {
            const [checks, setChecks] = useState({});
            const [showModal, setShowModal] = useState(false);
            
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
                const activeIds = Object.keys(checks).filter(k => checks[k]);
                const count = activeIds.length;
                const hasStockout = checks["stockout"];
                
                const lowLiabilityOnly = activeIds.every(id => id === "clutter" || id === "pileups");

                if (count === problems.length) return { level: "CRITICAL LIABILITY", color: "text-[#991B1B]", message: "Your operational friction is at maximum capacity. You are bleeding revenue daily through lost labor, duplicate inventory, and missed opportunities. Immediate intervention is required.", action: "Schedule Emergency Audit" };
                if (hasStockout) return { level: "HIGH LIABILITY", color: "text-[#D9534F]", message: "Running out of inventory is a direct hit to your reputation and revenue. Your current system is actively hindering your ability to serve your clients.", action: "Fix Inventory Systems" };
                if (count > 0 && lowLiabilityOnly) return { level: "LOW LIABILITY", color: "text-[#D6E31E]", message: "You have a baseline for order, but visual clutter is a silent stressor. Now is the time to refine your environment before it affects your workflow.", action: "Refine My Space" };
                return { level: "MODERATE LIABILITY", color: "text-[#F0AD4E]", message: "Friction is slowing your team's efficiency. You are likely over-spending on consumables and losing valuable team hours to 'searching' rather than 'serving'.", action: "Optimize Operations" };
            };

            const results = calculateRisk();

            return (
                <>
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100 text-left">
                        <div className="space-y-4">
                            {problems.map((p) => (
                                <button key={p.id} onClick={() => toggle(p.id)} className="w-full flex items-start md:items-center gap-4 p-3 md:p-4 rounded-xl hover:bg-[#fbf9f7] transition group text-left">
                                    <div className={`w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${checks[p.id] ? 'bg-[#2d2a26] border-[#2d2a26]' : 'border-stone-200 group-hover:border-[#7178c8]'}`}>
                                        {checks[p.id] && <CheckIcon />}
                                    </div>
                                    <span className={`text-[15px] md:text-lg leading-snug ${checks[p.id] ? 'text-[#2d2a26] font-medium' : 'text-[#57534e]'}`}>{p.text}</span>
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 text-center border-t border-stone-100 pt-8">
                            <button onClick={() => setShowModal(true)} className="w-full bg-[#D6E31E] text-[#2d2a26] hover:bg-[#7178c8] hover:text-white py-5 rounded-xl font-display font-bold text-xl uppercase tracking-widest transition-all shadow-lg">
                                Analyze My Operational Risk
                            </button>
                        </div>
                    </div>

                    {showModal && ReactDOM.createPortal(
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-[#2d2a26]/60 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)}></div>
                            <div className="relative bg-white rounded-[2.5rem] w-full max-w-md p-8 md:p-14 text-[#2d2a26] shadow-2xl border-4 border-[#7178c8] animate-fade-in-up overflow-hidden">
                                <button onClick={() => setShowModal(false)} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 hover:bg-[#7178c8] hover:text-white transition-colors z-50 group">
                                    <CloseIcon />
                                </button>
                                <div className="relative z-10 text-center">
                                    <div className="mb-6 flex justify-center opacity-20"><BarChartIcon /></div>
                                    <h3 className="font-display text-lg uppercase tracking-[0.2em] text-[#7178c8] mb-6 font-bold">Analysis Complete</h3>
                                    <div className="space-y-6 mb-10">
                                        <h4 className={`text-4xl md:text-5xl font-bold border-b border-[#7178c8]/20 pb-6 uppercase tracking-tight text-center leading-none ${results.color}`}>{results.level}</h4>
                                        <p className="text-lg text-[#57534e] leading-relaxed italic">{results.message}</p>
                                    </div>
                                    <Link to="/booking" state={{ service: "professional" }} className="inline-block w-full bg-[#D6E31E] text-[#2d2a26] py-5 rounded-full font-bold uppercase tracking-widest text-center hover:bg-[#7178c8] hover:text-white transition-all shadow-xl text-base transform hover:-translate-y-1">{results.action}</Link>
                                </div>
                            </div>
                        </div>,
                        document.body
                    )}
                </>
            );
        };

        return (
            <div className="bg-[#fbf9f7] overflow-x-hidden min-h-screen">
                {/* HERO SECTION */}
                <div className="bg-[#2d2a26] text-[#fbf9f7] pt-64 pb-[480px] px-4 text-center relative z-10">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    {window.Core && window.Core.GridBeams && <div className="absolute inset-0 pointer-events-none opacity-40"><window.Core.GridBeams beamColor="182, 188, 255" /></div>}
                    
                    <div className="relative z-10 max-w-7xl mx-auto">
                        <h1 className="font-display font-bold text-5xl md:text-[6.5rem] tracking-tighter mb-4 leading-[0.95] md:leading-[0.85]">
                            Your back-of-house is your
                        </h1>
                        <p className="font-handwriting font-light text-[#d4d7ff] lowercase text-5xl md:text-7xl mb-12 block">
                            Competitive Edge.
                        </p>
                        <p className="text-lg md:text-xl font-light text-stone-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                            We restructure back-of-house systems to save you money, recover lost labor hours, and reduce waste—helping you win no matter how you slice it.
                        </p>
                        <Link to="/booking?service=Professional Space Organization" className="inline-block bg-transparent text-[#D6E31E] border border-[#D6E31E] px-10 py-4 rounded-full font-bold hover:bg-[#D6E31E] hover:text-[#2d2a26] transition transform hover:-translate-y-1 font-display text-lg shadow-xl uppercase tracking-widest">
                            Inquire for your business
                        </Link>
                    </div>
                </div>

                <div className="relative z-30 bg-[#fbf9f7]">
                    <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#7178c8_1px,transparent_1px),linear-gradient(to_bottom,#7178c8_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                    {/* MADISON B CARD */}
                    <div className="max-w-5xl mx-auto px-4 relative -top-64 md:-top-80 z-40 overflow-visible">
                        <div className="bg-white rounded-3xl shadow-2xl border-2 border-brand-lemon p-12 text-center relative overflow-visible transition-transform duration-500 hover:scale-[1.01]">
                            <div className="absolute -top-12 -left-6 text-[12rem] font-serif leading-none select-none pointer-events-none z-0" style={{ WebkitTextStroke: '1.5px #7178c8', color: '#D6E31E', opacity: '1' }}>“</div>
                            <p className="text-2xl md:text-3xl font-light text-[#2d2a26] italic leading-relaxed relative z-10 px-4 pt-4">
                                Our storage units are...so functional thanks to YOU and your amazing work! <br /><br />
                                I am so grateful for you and your team! <span className="block mt-6 text-[32px] md:text-[42px] leading-tight">You helped us turn an <strong className="font-bold text-[#7178c8]">8 week</strong> set up and tear down into a <strong className="font-bold text-[#7178c8]">9 day</strong> set up and tear down!</span>
                            </p>
                            <div className="mt-10 flex flex-col items-center justify-center relative z-10">
                                <div className="w-24 h-1 bg-[#D6E31E] mb-6 rounded-full"></div>
                                <p className="font-display font-bold text-[#2d2a26] uppercase tracking-widest text-sm">- Madison B.</p>
                                <p className="text-xs text-[#57534e] font-bold uppercase tracking-wider mt-1">Non-Profit Organization</p>
                            </div>
                        </div>
                    </div>

                    {/* VIDEO GRID SECTION */}
                    <div className="w-full bg-[#EBEBFF] relative z-10 py-24 -mt-24"> 
                        <div className="max-w-7xl mx-auto px-4 text-center">
                            
                            {/* HEADLINE CHANGE: PERIWINKLE (#7178c8) */}
                            <h3 className="text-5xl md:text-7xl text-[#7178c8] mb-8 leading-tight">
                                <span className="block mb-2 md:mb-0">
                                    <span className="font-handwriting mr-3">No</span>
                                    <span className="font-display font-bold uppercase tracking-tight">Space Too Big,</span>
                                </span>
                                <span className="block">
                                    <span className="font-handwriting mr-3 ml-0 md:ml-4">No</span>
                                    <span className="font-display font-bold uppercase tracking-tight">Business Too&nbsp;Small</span>
                                </span>
                            </h3>
                            
                            <p className="text-xl md:text-2xl text-[#57534e] font-light max-w-6xl mx-auto mb-12 leading-relaxed">
                                Whether you're saving lives or serving lattes, your environment dictates your&nbsp;efficiency. <br /><br />
                                Here are a few industries that have benefited from our organizing—though to be clear, <span className="font-semibold italic text-[#2d2a26]">any business can benefit from better organizational systems.</span>
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Fire & Medical Services", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108.mp4", poster: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/79fce40a920ca914dea695477cf48735c3454acf/angie%20Storage%20Organized-Cover.jpg" },
                                    { label: "Restaurants & Hospitality", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108%20(2)(2).mp4", poster: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/YT-expected%20mess%20vs%20clutter.png" },
                                    { label: "Non Profit", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108%20(1).mp4", poster: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/YT-systems-chaos.png" }
                                ].map((item, i) => (
                                    <div key={i} className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[2/3] border border-stone-100 bg-[#fbf9f7] transition-all hover:shadow-2xl">
                                        <video className="w-full h-full object-cover transition duration-700 group-hover:scale-110 pointer-events-none" autoPlay loop muted playsInline webkit-playsinline="true" poster={item.poster} preload="auto" controlsList="nodownload"><source src={item.video} type="video/mp4" /></video>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#2d2a26]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                        <div className="absolute bottom-6 left-6"><div className="bg-[#7178c8] text-white px-5 py-2 rounded-full font-display font-bold tracking-widest text-xs uppercase shadow-md">{item.label}</div></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* HIDDEN COST */}
                    <section className="py-24 max-w-4xl mx-auto px-4 relative z-10">
                        <div className="bg-[#EBEBFF] rounded-[3rem] p-4 md:p-12 text-center border-2 border-[#7178c8] relative overflow-hidden shadow-2xl">
                            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tighter mb-4 text-[#2d2a26] relative z-10">The Hidden Cost of Disorganization</h2>
                            <p className="text-lg text-[#57534e] font-light mb-8 relative z-10">See what disorganization is costing you.<br />Check all that apply to your current operations:</p>
                            <div className="max-w-3xl mx-auto relative z-10 px-2"><DisorganizationChecklist /></div>
                        </div>
                    </section>

                    {/* FINAL CTA */}
                    <div className="mt-24 pb-40 max-w-5xl mx-auto px-4 text-center relative z-10">
                        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border-2 border-[#7178c8] relative overflow-hidden group">
                            <h3 className="font-display text-4xl md:text-6xl font-bold text-[#2d2a26] mb-10 tracking-tight leading-[1.1]">Organizing isn't a luxury for your business— <span className="text-[#7178c8] italic">it's essential.</span></h3>
                            <div className="text-[#57534e] text-xl leading-relaxed mb-12 space-y-6 max-w-3xl mx-auto font-light">
                                <p>Every minute your team spends searching for a tool or navigating a crowded stockroom is a minute of lost profit. Disorganization is a quiet tax on your&nbsp;growth.</p>
                                <p>Let's eliminate the friction in your inventory systems so you can get back to what you were meant to do: serve your customers and lead your mission with&nbsp;clarity.</p>
                            </div>
                            <Link to="/booking" state={{ service: "professional" }} className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-[#D6E31E] text-[#2d2a26] hover:bg-[#7178c8] hover:text-white transition shadow-2xl font-display font-bold text-xl uppercase tracking-tight transform hover:-translate-y-1">Book My Systems Strategy Call</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    window.ProfessionalSpaces = ProfessionalSpaces;
})();
