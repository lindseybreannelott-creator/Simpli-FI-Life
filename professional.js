// --- PROFESSIONAL SPACES COMPONENTS ---

const DisorganizationChecklist = () => {
    const [checks, setChecks] = useState({});
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

    return (
        <div className="bg-brand-white rounded-3xl p-8 shadow-xl border border-stone-100 text-left transform transition-all duration-300">
            <div className="space-y-4">
                {problems.map((item, i) => (
                    <button key={i} onClick={() => toggle(i)} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-brand-base transition group text-left">
                        <div className={`w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${checks[i] ? 'bg-brand-lemon border-brand-lemon scale-110' : 'border-stone-200 group-hover:border-brand-periwinkle'}`}>
                            {checks[i] && <Icon name="check" className="w-5 h-5 text-brand-dark" />}
                        </div>
                        <span className={`text-lg transition-colors ${checks[i] ? 'text-brand-dark font-medium' : 'text-brand-medium'}`}>{item}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const ProfessionalSpaces = () => {
    usePageTitle("Professional Spaces");
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="bg-brand-base overflow-x-hidden min-h-screen">
            {/* HERO SECTION */}
            <div className="bg-brand-dark text-brand-base pt-44 pb-96 px-4 text-center relative z-10 overflow-visible">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#b6bcff_1px,transparent_1px),linear-gradient(to_bottom,#b6bcff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                <div className="absolute inset-0 pointer-events-none opacity-40"><GridBeams /></div>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <h1 className="font-display font-light text-5xl md:text-7xl tracking-tighter mb-6 leading-tight">Operational Excellence,<br/><span className="text-brand-periwinkle-light font-bold">Organized.</span></h1>
                    <p className="font-handwriting text-xl md:text-3xl text-brand-periwinkle-light mb-12 rotate-[-2deg] opacity-90 relative z-20">For Businesses & Institutions</p>
                    <p className="text-xl font-light text-stone-300 max-w-3xl mx-auto mb-10 leading-relaxed">We restructure back-of-house systems to save you money, recover lost labor hours, and reduce waste—helping you win no matter how you slice it.</p>
                    <Link to="/booking?service=Professional Space Organization" className="inline-block bg-transparent text-brand-lemon border border-brand-lemon px-10 py-4 rounded-full font-bold hover:bg-brand-lemon hover:text-brand-dark transition transform hover:-translate-y-1 font-display text-lg shadow-xl uppercase tracking-widest">Inquire for Business</Link>
                </div>
            </div>

            {/* CONTENT AREA WITH OVERLAP */}
            <div className="relative z-20">
                <div className="max-w-5xl mx-auto px-4 -mt-48 mb-24 relative overflow-visible">
                    <div className="bg-brand-white rounded-3xl shadow-2xl border border-stone-100 p-12 text-center relative overflow-visible">
                        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#fbf9f7_1px,transparent_1px),linear-gradient(to_bottom,#fbf9f7_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none rounded-3xl overflow-hidden"></div>
                        <div className="relative z-10">
                            <div className="absolute -top-24 -left-8 text-[12rem] font-serif leading-none select-none pointer-events-none opacity-80" style={{ WebkitTextStroke: '1px #7178c8', color: '#D6E31E' }}>“</div>
                            <p className="text-2xl md:text-3xl font-light text-brand-dark italic leading-relaxed relative z-10 px-4">
                                Our storage units are...so functional thanks to YOU and your amazing work! 
                                <br /><br />
                                I am so grateful for you and your team!
                                <br />
                                <span className="block mt-6 text-3xl md:text-4xl">You helped us turn an <strong className="font-bold text-brand-periwinkle">8 week</strong> set up and tear down into a <strong className="font-bold text-brand-periwinkle">9 day</strong> set up and tear down!</span>
                            </p>
                            <div className="mt-10 flex flex-col items-center justify-center">
                                <div className="w-24 h-1 bg-brand-lemon mb-6 rounded-full"></div>
                                <p className="font-display font-bold text-brand-dark uppercase tracking-widest text-sm">- Madison B.</p>
                                <p className="text-xs text-brand-medium font-bold uppercase tracking-wider mt-1">Non-Profit Organization</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* INDUSTRY VIDEOS */}
                <div className="max-w-7xl mx-auto px-4 relative mb-24">
                    <div className="text-center mb-12">
                        <h3 className="font-handwriting text-4xl md:text-5xl text-brand-dark mb-10 leading-loose">No Space Too Big,<br /> No Business Too Small</h3>
                        <p className="text-brand-medium text-lg leading-loose max-w-2xl mx-auto">Whether you're saving lives or serving lattes, your environment dictates your efficiency. Here are a few industries that have benefited from our organizing.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: "Fire & Medical Services", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108.mp4" },
                            { label: "Restaurants & Hospitality", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108%20(2)(2).mp4" },
                            { label: "Non Profit", video: "https://raw.githubusercontent.com/lindseybreannelott-creator/website-assets/main/0108%20(1).mp4" }
                        ].map((item, i) => (
                            <div key={i} className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[2/3] border border-stone-100 bg-brand-base">
                                <video className="w-full h-full object-cover" autoPlay loop muted playsInline controlsList="nodownload"><source src={item.video} type="video/mp4" /></video>
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80"></div>
                                <div className="absolute bottom-6 left-6">
                                    <div className="bg-brand-periwinkle text-brand-white px-5 py-2 rounded-full font-display font-bold tracking-widest text-xs uppercase shadow-md">{item.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ROI CHECKLIST */}
                <section className="py-24 max-w-7xl mx-auto px-4 relative">
                    <div className="bg-brand-periwinkle-light/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center shadow-xl border-2 border-brand-periwinkle/30 backdrop-blur-sm">
                        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tighter mb-6 text-brand-dark">The Hidden Cost of Disorganization</h2>
                        <p className="text-xl text-brand-medium font-light leading-relaxed mb-12">Check all that apply to your current operations:</p>
                        <div className="max-w-2xl mx-auto text-brand-dark"><DisorganizationChecklist /></div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <div className="mt-24 pb-24 max-w-5xl mx-auto px-4 text-center">
                    <div className="bg-brand-white p-10 md:p-16 rounded-[3rem] shadow-xl border-2 border-brand-periwinkle relative overflow-hidden">
                        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#fbf9f7_1px,transparent_1px),linear-gradient(to_bottom,#fbf9f7_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none rounded-3xl"></div>
                        <div className="relative z-10">
                            <h3 className="font-display text-4xl md:text-6xl font-bold text-brand-dark mb-10 tracking-tight">Organizing isn't a luxury for your business—<br className="hidden md:block" /> <span className="text-brand-periwinkle">it's essential.</span></h3>
                            <p className="text-brand-medium text-xl leading-relaxed mb-12 max-w-3xl mx-auto">Let's eliminate the friction in your inventory systems so you can get back to what you were meant to do: serve your customers.</p>
                            <Link to="/booking?service=Professional Space Organization" className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-brand-lemon text-brand-dark hover:bg-brand-periwinkle hover:text-brand-white transition shadow-2xl font-display font-bold text-xl uppercase tracking-tight transform hover:-translate-y-1">Book Clarity Call</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
