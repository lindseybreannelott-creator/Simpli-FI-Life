// --- APP.JS: THE ROUTING BRAIN ---
// This file only manages transitions between pages.

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <HashRouter>
            {/* The LoadingScreen is now globally available from core.js */}
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

// Start the Application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
