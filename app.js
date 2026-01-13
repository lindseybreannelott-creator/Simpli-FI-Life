const { useState, useEffect, useRef, useMemo } = React;
const { HashRouter, Routes, Route, Link, useLocation, useNavigate, useParams } = ReactRouterDOM;

// --- GLOBAL UTILITIES ---
const usePageTitle = (title) => {
    useEffect(() => { document.title = `${title} | Simpli-FI Life`; }, [title]);
};

// --- ICON COMPONENT (Lucide Restored) ---
const Icon = ({ name, className }) => {
    const ref = React.useRef(null);
    useEffect(() => {
        if (window.lucide && window.lucide.icons) {
            const toPascalCase = (str) => str.replace(/(^\w|-\w)/g, (clear) => clear.replace(/-/, "").toUpperCase());
            const iconName = toPascalCase(name);
            const iconNode = window.lucide.icons[iconName];
            if (iconNode && ref.current) {
                if (typeof iconNode.toSvg === 'function') {
                    const svgString = iconNode.toSvg({ class: className });
                    ref.current.innerHTML = svgString;
                }
            }
        }
    }, [name, className]);
    return <span ref={ref} style={{ display: 'contents' }}></span>;
};

const Menu = (p) => <Icon name="menu" {...p} />;
const X = (p) => <Icon name="x" {...p} />;
const Instagram = (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);
const Facebook = (p) => <Icon name="facebook" {...p} />;
const Youtube = (p) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
    </svg>
);
const Linkedin = (p) => <Icon name="linkedin" {...p} />;

// --- NAVBAR (Verbatim) ---
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isDarkHeader = location.pathname === '/professional-spaces';
    const textColorClass = isDarkHeader ? 'text-brand-base hover:text-brand-periwinkle-light' : 'text-brand-medium hover:text-brand-periwinkle';
    const logoColorClass = isDarkHeader ? 'text-brand-base' : 'text-brand-dark';
    const logoSubColorClass = isDarkHeader ? 'text-stone-400' : 'text-brand-medium';
    const menuButtonClass = isDarkHeader ? 'text-brand-base' : 'text-brand-medium';

    return (
        <nav className="absolute top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <span className={`font-display font-bold text-2xl tracking-tight ml-2 ${logoColorClass}`}>
                                SIMPLI-FI <span className={`font-light ${logoSubColorClass}`}>LIFE</span>
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={`${textColorClass} font-display font-normal transition text-lg tracking-tight uppercase`}>HOME</Link>
                        <Link to="/professional-spaces" className={`${textColorClass} font-display font-normal transition text-lg tracking-tight uppercase`}>PROFESSIONAL SPACES</Link>
                        <Link to="/residential" className={`${textColorClass} font-display font-normal transition text-lg tracking-tight uppercase`}>RESIDENTIAL SPACES</Link>
                        <Link to="/booking" className="bg-brand-lemon text-brand-dark px-6 py-2 rounded-full font-display font-bold hover:bg-brand-periwinkle hover:text-brand-white transition shadow-lg text-lg tracking-tight uppercase">BOOK CLARITY CALL</Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className={`${menuButtonClass} hover:opacity-80`}>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-brand-white border-t border-stone-100 absolute w-full left-0 shadow-lg z-50">
                    <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block py-3 text-brand-medium font-display font-normal text-lg tracking-tight uppercase">HOME</Link>
                        <Link to="/professional-spaces" onClick={() => setIsOpen(false)} className="block py-3 text-brand-medium font-display font-normal text-lg tracking-tight uppercase">PROFESSIONAL SPACES</Link>
                        <Link to="/residential" onClick={() => setIsOpen(false)} className="block py-3 text-brand-medium font-display font-normal text-lg tracking-tight uppercase">RESIDENTIAL SPACES</Link>
                        <Link to="/booking" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 mt-4 bg-brand-lemon text-brand-dark rounded-lg font-display font-bold text-lg tracking-tight uppercase">BOOK CLARITY CALL</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

// --- FOOTER (Verbatim) ---
const Footer = () => (
    <section className="bg-brand-dark text-brand-base py-12 border-t border-brand-dark mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
                <span className="font-display text-2xl font-bold tracking-tight uppercase">
                    Simpli-FI <span className="font-light text-stone-400">Life</span>
                </span>
                <p className="text-stone-400 text-sm mt-2">Serving the Greater DFW Area | Available Virtually</p>
            </div>
            <div className="flex gap-4">
                <a href="https://www.instagram.com/simpli_fi_life/" target="_blank" className="hover:text-brand-periwinkle transition"><Instagram className="w-5 h-5" /></a>
                <a href="https://www.facebook.com/Simpli.FI.Intention" target="_blank" className="hover:text-brand-periwinkle transition"><Facebook className="w-5 h-5" /></a>
                <a href="https://www.youtube.com/@Simpli_FI_Life_SHORTS" target="_blank" className="hover:text-brand-periwinkle transition"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="hover:text-brand-periwinkle transition"><Linkedin className="w-5 h-5" /></a>
            </div>
            <div className="text-center md:text-right">
                <p className="text-stone-500 text-xs">&copy; 2026 Simpli-FI Life LLC. All Rights Reserved.</p>
                <Link to="/new-space-intake" className="text-stone-600 text-[10px] hover:text-brand-periwinkle transition mt-1 inline-block">New Space Intake</Link>
            </div>
        </div>
    </section>
);

// --- MAIN APP COMPONENT ---
const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <HashRouter>
            {/* We will define LoadingScreen, Home, Professional, etc. as external components next */}
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            <div className="min-h-screen bg-brand-base text-brand-dark font-sans flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/professional-spaces" element={<ProfessionalSpaces />} />
                        <Route path="/residential" element={<Residential />} />
                        <Route path="/booking" element={<Booking />} />
                        <Route path="/new-space-intake" element={<NewSpaceIntake />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </HashRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
