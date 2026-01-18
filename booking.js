// --- BOOKING FORM PAGE ---

const Booking = () => {
    usePageTitle("Book a Session");
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '', 
        businessName: '', 
        moveStatus: '', 
        type: 'Residential Space Organization', 
        message: '',
        availability: '', 
        preferredContact: 'Phone (Text)',
        hp_trap: '',      // SECURITY: Honeypot field
        formLoadTime: Date.now() // SECURITY: Timestamp to detect bots
    });
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const location = useLocation();

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const service = params.get('service');
        const notes = params.get('notes');

        if (service) {
            setFormData(prev => ({ 
                ...prev, 
                type: service,
                message: notes ? (prev.message ? prev.message + "\n" + notes : notes) : prev.message
            }));
        } else if (notes) {
             setFormData(prev => ({ 
                ...prev, 
                message: notes ? (prev.message ? prev.message + "\n" + notes : notes) : prev.message
            }));
        }
    }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');

        // ========== SECURITY CHECKS ==========
        
        // 1. Honeypot check - bots often fill hidden fields
        if (formData.hp_trap !== '') {
            return; // Silently reject bot submission
        }

        // 2. Time-based check - humans take at least 5 seconds to fill a form
        const timeSpent = Date.now() - formData.formLoadTime;
        if (timeSpent < 5000) { // Less than 5 seconds
            setErrorMsg('Please take a moment to review your information before submitting.');
            return;
        }

        // 3. Basic input sanitization - check for suspicious patterns
        const suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /onclick/i,
            /onerror/i,
            /http[s]?:\/\/.*http[s]?:\/\//i, // Multiple URLs
            /\[url=/i,
            /\[link=/i
        ];
        
        const allText = `${formData.name} ${formData.email} ${formData.message} ${formData.businessName}`;
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(allText)) {
                setErrorMsg('Your submission contains invalid characters. Please check your input.');
                return;
            }
        }

        // 4. Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }

        // 5. Phone format validation (basic - at least 10 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            setErrorMsg('Please enter a valid phone number with at least 10 digits.');
            return;
        }

        // ========== FORM SUBMISSION ==========
        setStatus('sending');
        
        const subject = `New Inquiry: ${formData.type} - ${formData.name}`;
        const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred Contact: ${formData.preferredContact}
Service: ${formData.type}
${formData.businessName ? `Business Name: ${formData.businessName}` : ''}
${formData.moveStatus ? `Move Date/Status: ${formData.moveStatus}` : ''}
Availability: ${formData.availability}

Project Goals:
${formData.message}`;

        // EMAIL OBFUSCATION: Assembling address via script to hide from bot harvesters
        const u = "lindsey";
        const d = "simpli-fi-life.com";
        const mailtoLink = `mailto:${u}@${d}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <div className="bg-brand-base min-h-screen pt-44 pb-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-60 bg-[linear-gradient(to_right,#d4d7ff_1px,transparent_1px),linear-gradient(to_bottom,#d4d7ff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto mb-12">
                <div className="bg-brand-lemon/[.18] backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl border-2 border-brand-lemon text-center">
                    <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-dark mb-4 tracking-tight">Request a Clarity Call</h1>
                    <p className="text-base md:text-xl text-brand-dark/90 max-w-2xl mx-auto leading-relaxed">
                        A free 30 minute virtual call to share your vision.<br /> No pressure, no obligation—just a good old chat to see if we're a fit.
                        <span className="font-bold mt-4 block text-[8px] md:text-[10px] tracking-widest uppercase opacity-80 whitespace-nowrap">***All services backed by our Simpli-FI Satisfaction Guarantee.***</span>
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden border-2 border-brand-periwinkle relative z-10">
                <div className="bg-brand-periwinkle-light/35 p-8 md:p-10 border-b border-brand-periwinkle/10 text-center backdrop-blur-sm relative">
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark mb-8 tracking-tight">Schedule in 3 Easy Steps</h2>
                    
                    {/* Connecting line across all 3 steps (desktop only) */}
                    <div className="hidden md:block absolute top-[8.5rem] left-[20%] right-[20%] h-0.5 bg-brand-periwinkle/30 -z-0"></div>
                    
                    <div className="grid md:grid-cols-3 gap-8 px-2 relative z-10">
                        <div className="flex flex-col items-center group">
                            <div className="w-12 h-12 rounded-full bg-brand-white border-2 border-brand-periwinkle text-brand-periwinkle flex items-center justify-center font-display font-bold text-lg mb-3 shadow-sm transition-transform group-hover:scale-110">1</div>
                            <h3 className="font-bold text-brand-dark text-base mb-1">Share Details</h3>
                            <p className="text-brand-dark/80 text-xs leading-relaxed max-w-[200px]">Fill out the inquiry form below with your goals.</p>
                        </div>
                        <div className="flex flex-col items-center relative group">
                            <div className="w-12 h-12 rounded-full bg-brand-white border-2 border-brand-periwinkle text-brand-periwinkle flex items-center justify-center font-display font-bold text-lg mb-3 shadow-sm transition-transform group-hover:scale-110">2</div>
                            <h3 className="font-bold text-brand-dark text-base mb-1">Send Request</h3>
                            <p className="text-brand-dark/80 text-xs leading-relaxed max-w-[200px]">Click the button to generate & send your email.</p>
                        </div>
                        <div className="flex flex-col items-center relative group">
                            <div className="w-12 h-12 rounded-full bg-brand-white border-2 border-brand-periwinkle text-brand-periwinkle flex items-center justify-center font-display font-bold text-lg mb-3 shadow-sm transition-transform group-hover:scale-110">3</div>
                            <h3 className="font-bold text-brand-dark text-base mb-1">We Connect</h3>
                            <p className="text-brand-dark/80 text-xs leading-relaxed max-w-[200px]">We'll reply within 24 hours to schedule your call.</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 bg-brand-periwinkle/90 backdrop-blur-sm">
                    {status === 'success' ? (
                        <div className="text-center py-12 bg-white rounded-xl">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <h3 className="font-display text-3xl font-bold tracking-tight mb-4 text-brand-dark">Request Received</h3>
                            <p className="text-brand-medium">We will be in touch within 24 hours to schedule your consultation.</p>
                            <button onClick={() => { setStatus('idle'); setFormData(prev => ({...prev, formLoadTime: Date.now()})); }} className="mt-8 text-brand-periwinkle font-bold underline">Send another request</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {errorMsg && (
                                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {errorMsg}
                                </div>
                            )}
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-brand-white mb-2">Name *</label>
                                    <input required className="w-full px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-brand-lemon outline-none transition bg-brand-white text-brand-dark shadow-md" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-brand-white mb-2">Phone *</label>
                                    <input required type="tel" className="w-full px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-brand-lemon outline-none transition bg-brand-white text-brand-dark shadow-md" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-brand-white mb-2">Email *</label>
                                <input required type="email" className="w-full px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-brand-lemon outline-none transition bg-brand-white text-brand-dark shadow-md" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-white mb-2">Service Interest</label>
                                <select className="w-full px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-brand-lemon outline-none transition bg-brand-white text-brand-dark shadow-md" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                    <option>Residential Space Organization</option>
                                    <option>Professional Space Organization</option>
                                    <option>Packing / Unpacking Services</option>
                                    <option>Market-Ready (Ready to List / Move Ready)</option>
                                </select>
                            </div>

                            {formData.type === 'Professional Space Organization' && (
                                <div className="animate-fade-in-up">
                                    <label className="block text-sm font-bold text-brand-white mb-2">Business / Organization Name</label>
                                    <input type="text" className="w-full px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-brand-lemon outline-none transition bg-brand-white text-brand-dark shadow-md" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
                                </div>
                            )}

                            {(formData.type === 'Packing / Unpacking Services' || formData.type === 'Market-Ready (Ready to List / Move Ready)') && (
                                <div className="animate-fade-in-up">
                                    <label className="block text-sm font-bold text-brand-white mb-2">Do you have a set move date?</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Closing Oct 15th, In Contract, Just Looking..."
                                        className="w-full px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-brand-lemon outline-none transition bg-brand-white text-brand-dark shadow-md" 
                                        value={formData.moveStatus} 
                                        onChange={e => setFormData({...formData, moveStatus: e.target.value})} 
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-brand-white mb-2">Project Overview & Goals</label>
                                <textarea rows="4" className="w-full px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-brand-lemon outline-none transition bg-brand-white text-brand-dark shadow-md" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-white mb-2">Preferred Availability</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Mon/Wed mornings, or any weekday after 4pm"
                                    className="w-full px-4 py-3 border border-transparent rounded-lg focus:ring-2 focus:ring-brand-lemon outline-none transition bg-brand-white text-brand-dark shadow-md" 
                                    value={formData.availability} 
                                    onChange={e => setFormData({...formData, availability: e.target.value})} 
                                />
                                <p className="text-xs text-brand-white/80 mt-2">Let us know what days/times generally work best for you (or don't work at all).</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-white mb-2">Preferred Communication</label>
                                <div className="flex flex-wrap gap-6 pt-1">
                                    {['Email', 'Phone (Call)', 'Phone (Text)'].map((option) => (
                                        <label key={option} className="inline-flex items-center cursor-pointer group">
                                            <input 
                                                type="radio" 
                                                name="preferredContact" 
                                                value={option}
                                                checked={formData.preferredContact === option}
                                                onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
                                                className="appearance-none w-5 h-5 border-2 border-transparent rounded-full checked:border-brand-lemon checked:border-[6px] transition-all duration-200 outline-none cursor-pointer bg-brand-white shadow-sm"
                                            />
                                            <span className={`ml-2 transition-colors ${formData.preferredContact === option ? 'text-brand-white font-bold' : 'text-brand-white/80 group-hover:text-brand-white'}`}>
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            {/* SECURITY: Honeypot - invisible to humans, bots fill it */}
                            <div className="absolute -left-[9999px]" aria-hidden="true" tabIndex="-1">
                                <label>Leave this empty</label>
                                <input 
                                    type="text" 
                                    name="website_url" 
                                    value={formData.hp_trap} 
                                    onChange={e => setFormData({...formData, hp_trap: e.target.value})} 
                                    tabIndex="-1" 
                                    autoComplete="off" 
                                />
                            </div>

                            <button disabled={status === 'sending'} className="w-full bg-brand-lemon text-brand-dark py-4 rounded-xl font-bold hover:bg-brand-white hover:text-brand-periwinkle transition transform hover:-translate-y-1 shadow-lg font-display uppercase tracking-tight disabled:opacity-50 disabled:cursor-not-allowed">
                                {status === 'sending' ? 'Sending...' : 'Request Consultation'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
