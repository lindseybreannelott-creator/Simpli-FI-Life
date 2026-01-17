// --- RESIDENTIAL SPACES ---

(function() {
    // 1. Capture Global React
    const React = window.React;
    const { useState, useEffect } = React;
    const { Link } = window.ReactRouterDOM;

    // 2. Local Icons (Crash prevention)
    const CheckIcon = () => React.createElement("svg", { className: "w-4 h-4 text-[#2d2a26]", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("polyline", { points: "20 6 9 17 4 12" }));
    const ArrowIcon = () => React.createElement("svg", { className: "ml-2 w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" }), React.createElement("polyline", { points: "12 5 19 12 12 19" }));
    const GemIcon = () => React.createElement("svg", { className: "w-8 h-8 text-[#7178c8] animate-spin-top", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("path", { d: "M6 3h12l4 6-10 13L2 9Z" }), React.createElement("path", { d: "M11 3 8 9l4 13 4-13-3-6" }));

    // 3. Service Checklist Component
    const ServiceChecklist = () => {
        const [checks, setChecks] = useState({});
        
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
        
        const getLink = () => {
            const selected = services.filter((_, i) => checks[i]).map(s => s.label).join(', ');
            const note = selected ? "Interested in: " + selected : "";
            return "/booking?service=Residential%20Space%20Organization&notes=" + encodeURIComponent(note);
        };

        return (
            <div className="bg-[#fbf9f7] rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-stone-200 text-left transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-4">
                    {services.map((item, i) => (
                        <button key={i} onClick={() => toggle(i)} className="w-full flex items-start gap-4 p-4 rounded-xl transition group text-left border border-transparent hover:bg-white hover:shadow-sm">
                            <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 mt-1 ${checks[i] ? 'bg-[#D6E31E] border-[#D6E31E] scale-110' : 'border-stone-400 group-hover:border-[#7178c8]'}`}>
                                {checks[i] && <CheckIcon />}
                            </div>
                            <div className={`text-lg transition-all duration-200 ${checks[i] ? 'text-[#2d2a26] font-medium' : 'text-[#2d2a26] group-hover:text-[#7178c8]'}`}>
                                {item.label}
                                {item.sub && <span className="block text-base opacity-70 mt-0.5 font-normal">{item.sub}</span>}
                            </div>
                        </button>
                    ))}
                </div>
                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${hasChecks ? 'max-h-[500px] opacity-100 mt-8 pt-8 border-t border-stone-200' : 'max-h-0 opacity-0'}`}>
                    <div className="text-center animate-fade-in-up">
                        <p className="font-sans italic font-medium text-[#7178c8] text-[15px] mb-8 leading-relaxed max-w-xl mx-auto px-4">
                            "No need to tidy up before our call—leaving your space as-is actually gives us the clues we need to pinpoint exactly what needs to change. And we don't judge 😉"
                        </p>
                        <Link to={getLink()} className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#D6E31E] text-[#2d2a26] hover:bg-[#7178c8] hover:text-white transition shadow-lg font-display font-bold text-sm uppercase tracking-widest transform hover:-translate-y-1">
                            Discuss My Project <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    // 4. Main Residential Component
    const Residential = () => {
        useEffect(() => {
            if (window.Core && window.Core.usePageTitle) window.Core.usePageTitle("Residential Services");
            window.scrollTo(0, 0);
        }, []);

        return (
            <div className="bg-[#fbf9f7] overflow-x-hidden">
                <div className="bg-[#d4d7ff] text-[#2d2a26] pt-44 pb-32 px-4 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    <div className="absolute inset-0 pointer-events-none opacity-60">
                        {window.Core && window.Core.GridBeams && <window.Core.GridBeams beamColor="255, 255, 255" />}
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto">
                        <h1 className="font-display font-light text-5xl md:text-7xl tracking-tighter mb-8 leading-tight text-[#2d2a26]">
                            Your home should feel like your <span className="font-bold text-white drop-shadow-sm">Sanctuary</span>,<br/> 
                            <span className="block mt-6 font-handwriting text-xl md:text-3xl text-[#5a60a6] rotate-[-2deg] drop-shadow-sm leading-normal">not a Storage Unit.</span>
                        </h1>
                        <p className="text-xl font-light text-[#2d2a26] max-w-3xl mx-auto mb-12 leading-relaxed">
                            At Simpli-FI Life we work with you to custom tailor systems that fit your unique needs, and season of life—giving you back your time and a home that feels easy to reset.
                        </p>
                        <Link to="/booking?service=Residential%20Space%20Organization" className="inline-block bg-[#D6E31E] text-[#2d2a26] px-10 py-4 rounded-full font-bold hover:bg-[#7178c8] hover:text-white transition transform hover:-translate-y-1 font-display uppercase tracking-widest text-sm shadow-xl border border-white/20">
                            Ready for your peaceful space?
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 opacity-60 bg-[linear-gradient(to_right,#d4d7ff_1px,transparent_1px),linear-gradient(to_bottom,#d4d7ff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                    <div className="py-24 px-4 border-b border-stone-100 overflow-hidden relative z-10">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center relative gap-12">
                            <div className="w-full md:w-1/2 relative z-20">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-video border-[3px] border-[#D6E31E] bg-[#2d2a26] transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <video className="w-full h-full object-cover pointer-events-none" autoPlay loop muted playsInline controlsList="nodownload" preload="auto">
                                        <source src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/websalescopymov3.mov" type="video/mp4" />
                                        <source src="https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/websalescopymov3.mov" type="video/quicktime" />
                                    </video>
