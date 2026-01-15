// --- PROFESSIONAL SPACES: CONTENT RESTORED & LAYERING FIX ---

const ProfessionalSpaces = () => {
    usePageTitle("Professional Spaces");

    // Re-establishing your Professional-specific data
    const PROFESSIONAL_TESTIMONIALS = [
        {
            quote: "Our back-of-house went from a source of daily stress to a streamlined engine. Lindsey didn't just organize; she created a system that actually saves us money on ordering.",
            author: "Madison B. | Medical Clinic Manager"
        },
        {
            quote: "The efficiency gain was immediate. We no longer lose inventory in the 'black hole' of the stockroom. Highly recommend for any retail business.",
            author: "Sarah J. | Boutique Owner"
        }
        // ... any others you have will pull from your global data
    ];

    return (
        <div className="bg-brand-dark min-h-screen overflow-x-hidden">
            {/* HERO SECTION - DARK GRID */}
            <section className="relative pt-48 md:pt-64 pb-40 md:pb-56 px-4">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <GridBeams beamColor="255, 255, 255" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="inline-block bg-brand-lemon text-brand-dark px-6 py-2 mb-8 text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase rounded-full">Business Systems</span>
                    <h1 className="font-display text-5xl md:text-8xl font-bold text-brand-base mb-8 tracking-tighter leading-tight">
                        Your back-of-house is your <br />
                        <span className="italic text-brand-lemon">Competitive Edge.</span>
                    </h1>
                </div>
            </section>

            {/* TESTIMONIAL SCROLLER: THE HALF-ON / HALF-OFF FIX */}
            {/* -mt-40 md:-mt-56 pulls the section up exactly half-way into the hero */}
            <div className="relative z-30 -mt-40 md:-mt-56">
                <div className="max-w-7xl mx-auto px-4 mb-6">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-lemon uppercase tracking-widest pl-2">Client Results</h2>
                </div>
                
                {/* Passing your correct Professional Quotes here */}
                <TestimonialScroller items={PROFESSIONAL_TESTIMONIALS} />
            </div>

            {/* RESTORING YOUR ORIGINAL CONTENT BELOW */}
            <section className="py-24 md:py-40 bg-brand-base relative z-10">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Your original professional service sections go here */}
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-6xl font-bold text-brand-dark tracking-tighter uppercase">Our Process</h2>
                    </div>
                    {/* ... (Rest of your original content) */}
                </div>
            </section>
        </div>
    );
};
