// --- PROFESSIONAL SPACES: HERO OVERLAP & UX LOCKDOWN ---

const ProfessionalSpaces = () => {
    usePageTitle("Professional Spaces");

    return (
        <div className="bg-brand-dark min-h-screen overflow-x-hidden">
            {/* HERO SECTION - DARK THEME */}
            <section className="relative pt-48 md:pt-64 pb-32 md:pb-48 px-4 border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    {/* The same grid and beams from core.js */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <GridBeams beamColor="255, 255, 255" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="inline-block bg-brand-lemon text-brand-dark px-6 py-2 mb-8 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase rounded-full">Business Systems</span>
                    <h1 className="font-display text-5xl md:text-8xl font-bold text-brand-base mb-8 tracking-tighter leading-tight">
                        Your back-of-house is your <br />
                        <span className="italic text-brand-lemon">Competitive Edge.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-brand-base/70 text-lg md:text-xl font-light leading-relaxed mb-12">
                        Chaotic stock rooms and disorganized inventory aren't just annoying—they’re expensive. 
                        We build efficient engines that save you time and protect your bottom line.
                    </p>
                </div>
            </section>

            {/* THE CARD SCROLLER - SITTING ON TOP */}
            {/* The '-mt-24 md:-mt-32' pulls this section UP over the hero above it */}
            <div className="relative z-30 -mt-24 md:-mt-32">
                <div className="max-w-7xl mx-auto px-4 mb-12 text-center md:text-left">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-lemon uppercase tracking-widest pl-2">Client Results</h2>
                </div>
                {/* Reusing the established TestimonialScroller component logic */}
                <TestimonialScroller category="professional" />
            </div>

            {/* SERVICE BREAKDOWN SECTION */}
            <section className="py-24 md:py-40 relative z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            {
                                title: "Inventory Flow",
                                desc: "Stop over-ordering and losing products. We create high-visibility systems so you know exactly what you have at a glance.",
                                icon: "package"
                            },
                            {
                                title: "Retail Efficiency",
                                desc: "Speed up restocking and order fulfillment. We optimize your layout to reduce foot traffic fatigue and maximize output.",
                                icon: "zap"
                            },
                            {
                                title: "Supply Management",
                                desc: "From medical clinics to creative studios, we organize the 'stuff' so your experts can focus on their expertise.",
                                icon: "layers"
                            }
                        ].map((s, i) => (
                            <div key={i} className="group relative bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/[0.08] transition-all duration-500 hover:scale-[1.03]">
                                <div className="w-16 h-16 bg-brand-lemon/10 rounded-2xl flex items-center justify-center mb-8">
                                    <Icon name={s.icon} className="w-8 h-8 text-brand-lemon" />
                                </div>
                                <h3 className="font-display text-2xl font-bold text-brand-base mb-4 uppercase tracking-tight">{s.title}</h3>
                                <p className="text-brand-base/60 leading-relaxed font-light">{s.desc}</p>
                                {/* Decorative border drawing effect from Home */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[2.5rem] z-20">
                                    <rect x="0" y="0" width="100%" height="100%" rx="40" fill="none" stroke="#D6E31E" strokeWidth="2" className="draw-border opacity-0 group-hover:opacity-100" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24 md:py-32 bg-brand-lemon text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-brand-dark mb-8 tracking-tighter uppercase leading-none">
                        Scale your business <br /> without the chaos.
                    </h2>
                    <Link to="/booking" className="inline-block bg-brand-dark text-brand-lemon px-12 py-5 rounded-full font-display font-bold text-lg uppercase tracking-widest hover:bg-brand-periwinkle transition-all shadow-2xl active:scale-95">
                        Schedule Site Visit
                    </Link>
                </div>
            </section>
        </div>
    );
};
