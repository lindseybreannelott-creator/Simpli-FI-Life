// --- RESIDENTIAL SPACES: BULLETPROOF VERSION ---

(function() {
    // We wrap in a closure to avoid global variable conflicts
    const Residential = () => {
        const [showVideo, setShowVideo] = React.useState(true);

        // Safe Title Hook
        React.useEffect(() => {
            if (typeof usePageTitle === 'function') {
                usePageTitle("Residential Services");
            }
            window.scrollTo(0, 0);
        }, []);

        // --- LOCAL COMPONENTS (Prevents "Undefined" Crashes) ---
        
        const ArrowIcon = ({ className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        );

        const CheckIcon = ({ className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        );

        const GemIcon = ({ className }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/>
            </svg>
        );

        // Safe GridBeam Renderer
        const renderBeams = (color) => {
            if (window.GridBeams) {
                return React.createElement(window.GridBeams, { beamColor: color });
            }
            return null;
        };

        // --- INTERNAL CHECKLIST COMPONENT ---
        const ServiceChecklist = () => {
            const [checks, setChecks] = React.useState({});
            
            const services = [
                { label: "Decluttering Coaching", sub: "(Done with you)" },
                { label: "Decluttering", sub: "(Done for me)" },
                { label: "Organizing + Space Planning Coaching", sub: "(Done with you)" },
                { label: "Organizing + Space Planning", sub: "(Done for me)" },
                { label: "Unpacking From a Move", sub: null },
                { label: "Packing for a Move", sub: null },
                { label: "Finding 'Homes' for Things", sub: null },
                { label: "Legacy Documenting", sub: null }
            ];

            const toggle = (i) => setChecks(p => ({...p, [i]: !p[i]}));
            const hasChecks = Object.values(checks).some(Boolean);

            const getLinkState = () => {
                const selected = services.filter((_, i) => checks[i]).map(s => s.label).join(', ');
                return {
                    service: "Residential Space Organization",
                    notes: selected ? "Interested in: " + selected : ""
                };
            };

            return (
                <div className="bg-brand-base rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-stone-200 text-left transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-4">
                        {services.map((item, i) => (
                            <button key={i} onClick={() => toggle(i)} className="w-full flex items-start gap-4 p-4 rounded-xl transition group text-left border border-transparent hover:bg-white hover:shadow-sm">
                                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 mt-1 ${checks[i] ? 'bg-brand-lemon border-brand-lemon scale-110' : 'border-stone-400 group-hover:border-brand-periwinkle'}`}>
                                    {checks[i] && <CheckIcon className="w-3 h-3 text-brand-dark" />}
                                </div>
                                <div className={`text-lg transition-all duration-200 ${checks[i] ? 'text-brand-dark font-medium' : 'text-brand-dark group-hover:text-brand-periwinkle'}`}>
                                    {item.label}
                                    {item.sub && <span className="block text-base opacity-70 mt-0.5 font-normal">{item.sub}</span>}
                                </div>
                            </button>
                        ))}
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${hasChecks ? 'max-h-[500px] opacity-100 mt-8 pt-8 border-t border-stone-200' : 'max-h-0 opacity-0'}`}>
                        <div className="text-center animate-fade-in-up">
                            <p className="font-sans italic font-medium text-brand-periwinkle text-[15px] mb-8 leading-relaxed max-w-xl mx-auto px-4">
                                "No need to tidy up before our call—leaving your space as-is actually gives us the clues we need to pinpoint exactly what needs to change. And we don't judge&nbsp;😉"
                            </p>
                            <ReactRouterDOM.Link 
                                to="/booking" 
                                state={getLinkState()}
                                className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle hover:text-brand-white transition shadow-lg font-display font-bold text-sm uppercase tracking-widest transform hover:-translate-y-1"
                            >
                                Discuss My Project 
                                <ArrowIcon className="ml-2 w-4 h-4" />
                            </ReactRouterDOM.Link>
                        </div>
                    </div>
                </div>
            );
        };

        // --- MAIN RENDER ---
        return (
            <div className="bg-brand-base overflow-x-hidden">
                
                {/* HERO SECTION */}
                <div className="bg-brand-periwinkle-light text-brand-dark pt-44 pb-32 px-4 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    <div className="absolute inset-0 pointer-events-none opacity-60">
                        {renderBeams("255, 255, 255")}
                    </div>
                    
                    <div className="relative z-10 max-w-5xl mx-auto">
                        <h1 className="font-display font-light text-5xl md:text-7xl tracking-tighter mb-8 leading-tight text-brand-dark">
                            Your home should feel like your <span className="font-bold text-brand-white drop-shadow-sm">Sanctuary</span>,<br/> 
                            <span className="block mt-6 font-handwriting text-xl md:text-3xl text-brand-periwinkle-dark rotate-[-2deg] drop-shadow-sm leading-normal">not a Storage&nbsp;Unit.</span>
                        </h1>
                        <p className="text-xl font-light text-brand-dark max-w-3xl mx-auto mb-12 leading-relaxed">
                            At Simpli-FI Life we work with you to custom tailor systems that fit your unique needs, and season of life—giving you back your time and a home that feels easy to&nbsp;reset.
                        </p>
                        <ReactRouterDOM.Link 
                            to="/booking"
                            state={{ service: "Residential Space Organization" }} 
                            className="inline-block bg-brand-lemon text-brand-dark px-10 py-4 rounded-full font-bold hover:bg-brand-periwinkle hover:text-brand-white transition transform hover:-translate-y-1 font-display uppercase tracking-widest text-sm shadow-xl border border-white/20"
                        >
                            Ready for your peaceful space?
                        </ReactRouterDOM.Link>
                    </div>
                </div>

                {/* VIDEO & TESTIMONIAL SPLIT */}
                <div className="relative">
                    <div className="absolute inset-0 opacity-60 bg-[linear-gradient(to_right,#d4d7ff_1px,transparent_1px),linear-gradient(to_bottom,#d4d7ff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    <div className="py-24 px-4 border-b border-stone-100 overflow-hidden relative z-10">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center relative gap-12">
                            
                            {/* Video Side */}
                            <div className="w-full md:w-1/2 relative z-20">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-video border-[3px] border-brand-lemon bg-brand-dark transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <video 
                                        className="w-full h-full object-cover pointer-events-none" 
                                        autoPlay loop muted playsInline 
                                        controlsList="nodownload" 
                                        preload="auto"
                                    >
                                        <source src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/websalescopymov3.mov" type="video/mp4" />
                                        <source src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/websalescopymov3.mov" type="video/quicktime" />
                                    </video>
                                </div>
                            </div>

                            {/* Quote Side */}
                            <div className="w-full md:w-1/2 relative z-10">
                                <div className="bg-brand-base p-10 md:p-16 rounded-[2.5rem] shadow-2xl border-2 border-brand-lemon h-full flex flex-col justify-center relative transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <div className="absolute -top-12 -left-6 text-[12rem] font-serif leading-none select-none pointer-events-none opacity-80" style={{ WebkitTextStroke: '1.5px #7178c8', color: '#D6E31E' }}>“</div>
                                    <div className="relative z-10 pt-8">
                                        <div className="text-brand-medium font-light italic leading-relaxed space-y-6 text-lg">
                                            <p>"I was so nervous about letting her into my closet, to see the messiest space in my house, but her encouraging, compassionate personality instantly put me at ease.</p>
                                            <p>Instead of feeling overwhelmed, I felt empowered to take control of my space at my own pace.</p>
                                            <p>Lindsey’s practical strategies for organization have not only helped me create systems out of chaos, but have also given me confidence in the process of decluttering my house."</p>
                                        </div>
                                        <div className="mt-10 pt-8 border-t border-brand-lemon/30">
                                            <p className="font-display font-bold text-brand-periwinkle uppercase tracking-wider text-sm">- Lauren V.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SERVICE MENU SECTION */}
                    <section className="py-24 max-w-7xl mx-auto px-4 relative z-10">
                        <div className="bg-brand-periwinkle-light/40 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center shadow-2xl border-4 border-brand-periwinkle group hover:scale-[1.005] transition-transform duration-500">
                            <h2 className="font-display font-bold text-4xl md:text-6xl text-brand-dark mb-8 leading-[0.95] relative z-10 uppercase tracking-tighter">
                                Your Space Simpli-Fied,<br/><span className="text-brand-periwinkle-dark">Your&nbsp;Way</span>
                            </h2>
                            
                            <div className="w-24 h-1.5 bg-white mx-auto mb-10 rounded-full relative z-10 opacity-80"></div>
                            
                            <div className="max-w-3xl mx-auto mb-12 relative z-10 text-brand-dark/80 font-medium text-xl leading-relaxed space-y-6">
                                <p>Every home has a different rhythm. Because your needs, priorities, and season of life are unique, we don't believe in a "one-size-fits-all" approach.</p>
                                <p className="font-bold text-brand-dark pt-2">You know your needs best—so you decide how active a role you'd like to&nbsp;play:</p>
                            </div>
                            
                            <div className="max-w-4xl mx-auto relative z-10 text-brand-dark">
                                <ServiceChecklist />
                            </div>
                        </div>
                    </section>
                </div>

                {/* LUXURY ESTATE SECTION */}
                <section id="private-client" className="py-32 bg-brand-dark relative overflow-hidden text-center px-4">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
                        <div className="w-full h-full bg-brand-periwinkle/30 blur-[120px] rounded-full"></div>
                    </div>
                    
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="flex justify-center mb-8">
                            <div className="p-5 rounded-full bg-brand-white/5 border border-brand-white/10 backdrop-blur-sm">
                                <GemIcon className="w-8 h-8 text-brand-periwinkle animate-spin-top" />
                            </div>
                        </div>
                        
                        <span className="text-brand-periwinkle font-bold tracking-[0.25em] uppercase text-xs block mb-6">Private Client Services</span>
                        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 text-brand-white">Luxury Estate Management</h2>
                        
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-periwinkle to-transparent mx-auto mb-10 opacity-50"></div>
                        
                        <p className="text-stone-300 text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                            We offer white-glove, <span className="text-brand-white font-normal italic">done-for-you</span> service for clients who value their time above all&nbsp;else.
                        </p>
                        
                        <ReactRouterDOM.Link 
                            to="/booking" 
                            state={{ service: "Residential Space Organization", notes: "Inquiry regarding Luxury Estate Management" }}
                            className="inline-block border border-brand-periwinkle/50 text-brand-periwinkle hover:text-brand-lemon hover:border-brand-lemon px-12 py-5 rounded-full font-display font-bold transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-widest text-sm shadow-xl backdrop-blur-sm"
                        >
                            Inquire About Availability
                        </ReactRouterDOM.Link>
                    </div>
                </section>
            </div>
        );
    };

    // Expose to window so router can find it
    window.Residential = Residential;
})();
