// --- RESIDENTIAL SPACES PAGE ---

const Residential = () => {
    usePageTitle("Residential Services");
    useEffect(() => { window.scrollTo(0, 0); }, []);

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
        
        const getBookingLink = () => {
            const selectedServices = services
                .filter((_, i) => checks[i])
                .map(s => s.label + (s.sub ? " " + s.sub : ""))
                .join(', ');
            const notes = selectedServices ? `I'm interested in: ${selectedServices}` : '';
            return `/booking?service=Residential Space Organization&notes=${encodeURIComponent(notes)}`;
        };

        return (
            <div className="bg-brand-base rounded-3xl p-8 shadow-xl border border-stone-200 text-left">
                <div className="grid md:grid-cols-2 gap-4">
                    {services.map((item, i) => (
                        <button key={i} onClick={() => toggle(i)} className="w-full flex items-start gap-4 p-4 rounded-xl transition group text-left border border-transparent">
                            <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all mt-1 ${checks[i] ? 'bg-brand-lemon border-brand-lemon' : 'border-stone-400 group-hover:border-brand-periwinkle'}`}>
                                {checks[i] && <Icon name="check" className="w-4 h-4 text-brand-dark" />}
                            </div>
                            <div className={`text-lg ${checks[i] ? 'text-brand-dark font-medium' : 'text-brand-dark group-hover:text-brand-periwinkle group-hover:italic'}`}>
                                {item.label}
                                {item.sub && <span className="block text-base opacity-70 not-italic mt-0.5">{item.sub}</span>}
                            </div>
                        </button>
                    ))}
                </div>
                <div className={`overflow-hidden transition-all duration-700 ${hasChecks ? 'max-h-[500px] opacity-100 mt-8 pt-8 border-t border-stone-200 pb-4' : 'max-h-0 opacity-0'}`}>
                    <div className="text-center">
                        <Link to={getBookingLink()} className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle hover:text-brand-white transition shadow-lg font-display font-bold text-sm uppercase tracking-tight">
                            Discuss My Project <Icon name="arrow-right" className="ml-2 w-4 h-4"/>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-brand-base overflow-x-hidden min-h-screen">
            {/* HERO SECTION */}
            <div className="bg-brand-periwinkle-light text-brand-dark pt-44 pb-32 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="absolute inset-0 pointer-events-none opacity-60"><GridBeams beamColor="255, 255, 255" /></div>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <h1 className="font-display font-light text-5xl md:text-[6.5rem] tracking-tighter mb-8 leading-[0.95] text-brand-dark">
                        Your home should feel like your <span className="font-bold text-brand-white drop-shadow-sm">Sanctuary</span>,<br/> 
                        <span className="block mt-6 font-handwriting text-2xl md:text-4xl text-brand-periwinkle-dark rotate-[-2deg] drop-shadow-sm leading-normal">not a Storage Unit.</span>
                    </h1>
                    <p className="text-xl font-light text-brand-dark max-w-3xl mx-auto mb-10 leading-relaxed">At Simpli-FI Life we work with you to custom tailor systems that fit your unique needs, and season of life - giving you back your time and a home that feels easy to reset.</p>
                    <Link to="/booking?service=Residential Space Organization" className="inline-block bg-brand-periwinkle text-brand-white px-10 py-4 rounded-full font-bold hover:bg-brand-lemon hover:text-brand-dark transition transform hover:-translate-y-1 font-display uppercase tracking-widest text-sm shadow-xl border border-white/20">Ready for your peaceful space?</Link>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 opacity-60 bg-[linear-gradient(to_right,#d4d7ff_1px,transparent_1px),linear-gradient(to_bottom,#d4d7ff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                
                {/* VIDEO & TESTIMONIAL SECTION */}
                <div className="py-24 px-4 border-b border-stone-100 relative z-10">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
                        <div className="w-full md:w-1/2">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video border-[2.5px] border-brand-lemon bg-brand-dark">
                                <video className="w-full h-full object-cover" autoPlay loop muted playsInline controlsList="nodownload"><source src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/websalescopymov3.mov" type="video/mp4" /></video>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="bg-brand-base p-12 md:p-16 rounded-[2.5rem] shadow-2xl border-2 border-brand-lemon h-full flex flex-col justify-center relative">
                                <div className="absolute -top-10 -left-4 text-[12rem] font-serif leading-none select-none pointer-events-none opacity-80" style={{ WebkitTextStroke: '1px #7178c8', color: '#D6E31E' }}>“</div>
                                <div className="relative z-10 pt-8">
                                    <div className="text-brand-medium font-light leading-relaxed">
                                        <p className="text-lg md:text-xl italic">"I was so nervous about letting her into my closet, but her <span className="font-medium text-brand-periwinkle">encouraging, compassionate personality instantly put me at ease.</span><br/><br/>Lindsey's practical strategies have helped me create <span className="font-medium">systems out of chaos</span> and given me confidence in the process.<br/><br/><span className="font-medium text-brand-periwinkle">I can't communicate strongly enough what a great coach Lindsey has been.</span>"</p>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-brand-lemon"><p className="font-display font-bold text-brand-periwinkle uppercase tracking-wider text-sm">- Lauren V.</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PATHWAY SECTION */}
                <section className="py-24 max-w-7xl mx-auto px-4 relative z-10">
                    <div className="bg-brand-periwinkle-light/40 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl border-4 border-brand-periwinkle">
                        <h2 className="font-display font-bold text-4xl md:text-6xl text-brand-dark mb-8 tracking-tighter uppercase leading-[0.9]">Your Space Simpli-Fied,<br/><span className="text-brand-periwinkle-dark">Your Way</span></h2>
                        <div className="max-w-3xl mx-auto mb-12 text-brand-dark/80 font-medium text-lg leading-relaxed"><p>Your needs are unique—that's why we don't do "one-size-fits-all." Select your interests below and let's see how we can serve you best.</p></div>
                        <div className="max-w-3xl mx-auto text-brand-dark"><ServiceChecklist /></div>
                    </div>
                </section>
            </div>

            {/* LUXURY ESTATE MANAGEMENT */}
            <section id="private-client" className="py-32 bg-brand-dark relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 rounded-full bg-brand-white/5 border border-brand-white/10 backdrop-blur-sm">
                            <Icon name="gem" className="w-8 h-8 text-brand-periwinkle animate-spin-top" />
                        </div>
                    </div>
                    <span className="text-brand-periwinkle font-bold tracking-[0.25em] uppercase text-xs block mb-6">Private Client Services</span>
                    <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-8 text-brand-white">Luxury Estate Management</h2>
                    <p className="text-stone-300 text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">We offer white-glove, <span className="text-brand-white font-normal italic">done-for-you</span> service for clients who value their time above all else.</p>
                    <Link to="/booking?service=Residential Space Organization&notes=Inquiry regarding Luxury Estate Management" className="inline-block border border-brand-lemon text-brand-lemon hover:text-brand-periwinkle hover:border-brand-periwinkle px-10 py-5 rounded-full font-display font-bold transition-all uppercase tracking-widest text-sm shadow-xl">Inquire About Services</Link>
                </div>
            </section>
        </div>
    );
};
