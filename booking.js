// --- BOOKING FORM PAGE ---

const Booking = () => {
    usePageTitle("Book a Session");
    const [formData, setFormData] = useState({ 
        name: '', email: '', phone: '', businessName: '', moveStatus: '', 
        type: 'Residential Space Organization', message: '', availability: '', 
        preferredContact: 'Phone (Text)', hp_trap: '' 
    });
    const [status, setStatus] = useState('idle');
    const location = useLocation();

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const service = params.get('service');
        const notes = params.get('notes');
        if (service) setFormData(p => ({ ...p, type: service, message: notes ? (p.message ? p.message + "\n" + notes : notes) : p.message }));
        else if (notes) setFormData(p => ({ ...p, message: notes ? (p.message ? p.message + "\n" + notes : notes) : p.message }));
    }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.hp_trap !== '') return;
        setStatus('sending');
        const subject = `New Inquiry: ${formData.type} - ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPreferred Contact: ${formData.preferredContact}\nService: ${formData.type}\n${formData.businessName ? `Business Name: ${formData.businessName}` : ''}\n${formData.moveStatus ? `Move Date/Status: ${formData.moveStatus}` : ''}\nAvailability: ${formData.availability}\n\nProject Goals:\n${formData.message}`;
        window.location.href = `mailto:lindsey@simpli-fi-life.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setTimeout(() => setStatus('success'), 1500);
    };

    return (
        <div className="bg-brand-base min-h-screen pt-44 pb-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#7178c8_1px,transparent_1px),linear-gradient(to_bottom,#7178c8_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            <div className="max-w-4xl mx-auto mb-12 relative z-10 text-center">
                <div className="bg-brand-lemon/[.18] backdrop-blur-sm rounded-3xl p-10 shadow-xl border-2 border-brand-lemon">
                    <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-dark mb-4">Request a Clarity Call</h1>
                    <p className="text-xl text-brand-dark/90 leading-relaxed max-w-2xl mx-auto">A free 30 minute virtual call to share your vision. No pressure, no obligation.</p>
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden border-2 border-brand-periwinkle relative z-10">
                <div className="bg-brand-periwinkle-light/35 p-8 text-center backdrop-blur-sm">
                    <h2 className="font-display font-bold text-3xl text-brand-dark mb-8">Schedule in 3 Easy Steps</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center"><div className="w-10 h-10 rounded-full bg-white border-2 border-brand-periwinkle flex items-center justify-center font-bold mb-2">1</div><p className="text-xs font-bold uppercase">Share Details</p></div>
                        <div className="flex flex-col items-center"><div className="w-10 h-10 rounded-full bg-white border-2 border-brand-periwinkle flex items-center justify-center font-bold mb-2">2</div><p className="text-xs font-bold uppercase">Send Request</p></div>
                        <div className="flex flex-col items-center"><div className="w-10 h-10 rounded-full bg-white border-2 border-brand-periwinkle flex items-center justify-center font-bold mb-2">3</div><p className="text-xs font-bold uppercase">We Connect</p></div>
                    </div>
                </div>

                <div className="p-8 md:p-12 bg-brand-periwinkle/90 backdrop-blur-sm">
                    {status === 'success' ? (
                        <div className="text-center py-12 bg-white rounded-xl"><h3 className="text-2xl font-bold">Request Received!</h3><p>Talk soon.</p></div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <input required placeholder="Name" className="w-full px-4 py-3 rounded-lg bg-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                <input required type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-lg bg-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                            <input required type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                            <select className="w-full px-4 py-3 rounded-lg bg-white" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                <option>Residential Space Organization</option>
                                <option>Professional Space Organization</option>
                                <option>Packing / Unpacking Services</option>
                            </select>
                            <textarea rows="4" placeholder="Project Goals" className="w-full px-4 py-3 rounded-lg bg-white" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                            <div className="hidden"><input type="text" value={formData.hp_trap} onChange={e => setFormData({...formData, hp_trap: e.target.value})} /></div>
                            <button className="w-full bg-brand-lemon text-brand-dark py-4 rounded-xl font-bold uppercase tracking-tight shadow-lg hover:bg-white hover:text-brand-periwinkle transition">Request Consultation</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
