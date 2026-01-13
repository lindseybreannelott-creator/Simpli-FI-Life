// --- FULL HIGH-FIDELITY INTAKE FORM ---

const NewSpaceIntake = () => {
    usePageTitle("New Space Intake");
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '', reason: '', services: [], areas: [], priorityArea: '', managementScore: '5', emotions: [], lifeChanges: '', workedWithPro: '', pets: '', smoking: '', consent: false, hp_trap: ''
    });

    const handleCheckboxChange = (e, field) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const list = prev[field] || [];
            return checked ? { ...prev, [field]: [...list, value] } : { ...prev, [field]: list.filter(item => item !== value) };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.hp_trap !== '') return;
        const subject = `New Space Intake - ${formData.firstName} ${formData.lastName}`;
        const body = `INTAKE FORM DETAILS:\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nReason: ${formData.reason}\nServices: ${formData.services.join(', ')}\nAreas: ${formData.areas.join(', ')}\nManagement Score: ${formData.managementScore}/10\nEmotions: ${formData.emotions.join(', ')}\nSpouse Consent: ${formData.consent ? 'Yes' : 'No'}`;
        window.location.href = `mailto:lindsey@simpli-fi-life.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="bg-brand-base min-h-screen pt-44 pb-24 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#7178c8_1px,transparent_1px),linear-gradient(to_bottom,#7178c8_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h1 className="font-display font-bold text-4xl text-brand-dark mb-4 tracking-tight">New Space Intake</h1>
                    <p className="text-brand-medium">Tell us about your space so we can hit the ground running.</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-stone-200 p-8 md:p-12 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <input required placeholder="First Name *" className="w-full px-4 py-3 border rounded-lg bg-stone-50" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                        <input required placeholder="Last Name *" className="w-full px-4 py-3 border rounded-lg bg-stone-50" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                    
                    <div className="pt-6 border-t">
                        <label className="block text-lg font-bold text-brand-dark mb-2">How do you feel when you walk into your home?</label>
                        <div className="space-y-2">
                            {["peaceful + calm ☺️", "anxious 😬", "overwhelmed 😫", "drowning in stuff! 😵"].map(opt => (
                                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" value={opt} checked={formData.emotions.includes(opt)} onChange={e => handleCheckboxChange(e, 'emotions')} className="w-5 h-5 rounded border-stone-300 accent-brand-lemon" />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="py-6 border-y">
                        <label className="block text-lg font-bold text-brand-dark mb-4">How easy is it to manage your home right now? (1-10)</label>
                        <input type="range" min="1" max="10" className="w-full h-2 bg-stone-200 rounded-lg appearance-none accent-brand-periwinkle" value={formData.managementScore} onChange={e => setFormData({...formData, managementScore: e.target.value})} />
                        <div className="text-center font-bold text-xl mt-2">{formData.managementScore}</div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group pt-4">
                        <input type="checkbox" required className="mt-1 w-5 h-5 accent-brand-lemon" checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} />
                        <span className="text-sm text-brand-medium">I confirm that all legal adults in the home consent to the organizer accessing our shared space. *</span>
                    </label>

                    <div className="hidden"><input type="text" value={formData.hp_trap} onChange={e => setFormData({...formData, hp_trap: e.target.value})} /></div>
                    <button className="w-full bg-brand-periwinkle text-white py-4 rounded-xl font-display font-bold text-xl uppercase tracking-widest hover:bg-brand-lemon hover:text-brand-dark transition-all shadow-lg">Send Message</button>
                </form>
            </div>
        </div>
    );
};
