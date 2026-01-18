// --- NEW SPACE INTAKE FORM ---

const NewSpaceIntake = () => {
    usePageTitle("New Space Intake");
    
    // Scroll to top when page loads
    useEffect(() => { window.scrollTo(0, 0); }, []);
    
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        reason: '', services: [], spaceFeel: '', areas: [],
        priorityArea: '', priorityGoingWell: '', clutterToughness: '',
        managementScore: '5', emotions: [], emotionsOther: '', pastAttempts: '',
        hardestItems: '', motivationDeclutter: '5', motivationOrganize: '5',
        productType: '', aesthetic: '', lifeChanges: '',
        workedWithPro: '', pets: '', smoking: '', communication: [], filming: '',
        consent: false,
        hp_trap: '', // SECURITY: Honeypot field
        formLoadTime: Date.now() // SECURITY: Timestamp for bot detection
    });

    const handleCheckboxChange = (e, field) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const list = prev[field] || [];
            if (checked) return { ...prev, [field]: [...list, value] };
            return { ...prev, [field]: list.filter(item => item !== value) };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ========== SECURITY CHECKS ==========
        
        // 1. Honeypot check - bots fill hidden fields, humans don't see them
        if (formData.hp_trap !== '') {
            return; // Silently reject bot submission
        }

        // 2. Time-based check - humans take at least 15 seconds on this long form
        const timeSpent = Date.now() - formData.formLoadTime;
        if (timeSpent < 15000) {
            alert('Please take a moment to review your answers before submitting.');
            return;
        }

        // 3. Input sanitization - check for suspicious injection patterns
        const suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /onclick/i,
            /onerror/i,
            /onload/i,
            /http[s]?:\/\/.*http[s]?:\/\//i, // Multiple URLs (spam indicator)
            /\[url=/i,
            /\[link=/i,
            /<iframe/i,
            /<object/i,
            /<embed/i,
            /eval\(/i,
            /document\./i
        ];
        
        const allText = `${formData.firstName} ${formData.lastName} ${formData.email} ${formData.reason} ${formData.spaceFeel} ${formData.priorityArea} ${formData.priorityGoingWell} ${formData.clutterToughness} ${formData.hardestItems} ${formData.lifeChanges} ${formData.pets}`;
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(allText)) {
                alert('Your submission contains invalid characters. Please check your input.');
                return;
            }
        }

        // 4. Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // 5. Phone format validation (at least 10 digits)
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            alert('Please enter a valid phone number with at least 10 digits.');
            return;
        }

        // 6. Name validation - no numbers or special characters
        const namePattern = /^[a-zA-Z\s\-']+$/;
        if (!namePattern.test(formData.firstName) || !namePattern.test(formData.lastName)) {
            alert('Please enter a valid name (letters only).');
            return;
        }

        // ========== BUILD EMAIL ==========
        const subject = `New Space Intake - ${formData.firstName} ${formData.lastName}`;
        
        const body = `NEW CLIENT INTAKE FORM

CONTACT INFO
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

--------------------------------------------------

Q: Why are you seeking Simpli-FI Life services right now?
A: ${formData.reason || 'Not provided'}

Q: Which services would you like Simpli-FI Life's help with?
A: ${formData.services.length > 0 ? formData.services.join(', ') : 'Not selected'}

Q: How do you want your space to feel after it's decluttered/organized?
A: ${formData.spaceFeel || 'Not provided'}

Q: Which areas of your home are you itching to declutter/organize?
A: ${formData.areas.length > 0 ? formData.areas.join(', ') : 'Not selected'}

Q: Let's pretend time is limited. Which part of your home is your top priority?
A: ${formData.priorityArea || 'Not provided'}

Q: What's one thing going well in your priority space right now?
A: ${formData.priorityGoingWell || 'Not provided'}

Q: What's making your top clutter area so tough to declutter?
A: ${formData.clutterToughness || 'Not provided'}

Q: How easy is it for you to manage the items currently in your home right now? (1-10)
A: ${formData.managementScore}/10

Q: How do you feel when you walk into your home?
A: ${formData.emotions.length > 0 ? formData.emotions.join(', ') : 'Not selected'}${formData.emotionsOther ? ' - Other: ' + formData.emotionsOther : ''}

Q: Have you tried to declutter or organize your space in the past?
A: ${formData.pastAttempts || 'Not answered'}

Q: What items or types of stuff are hardest for you to declutter?
A: ${formData.hardestItems || 'Not provided'}

Q: How motivated are you to start decluttering your home? (1-10)
A: ${formData.motivationDeclutter}/10

Q: How motivated are you to start organizing your home? (1-10)
A: ${formData.motivationOrganize}/10

Q: In general, what type of organizing product do you need?
A: ${formData.productType || 'Not selected'}

Q: In general, what's your organizing aesthetic?
A: ${formData.aesthetic || 'Not selected'}

Q: Are there any big life changes or deadlines coming up that might affect your ability to declutter/get organized?
A: ${formData.lifeChanges || 'Not provided'}

Q: Have you worked with a decluttering coach or professional organizer before?
A: ${formData.workedWithPro || 'Not answered'}

Q: Do you have any indoor pets?
A: ${formData.pets || 'Not provided'}

Q: Is there smoking in the home?
A: ${formData.smoking || 'Not answered'}

Q: How do you prefer to stay in touch for our Organizing services?
A: ${formData.communication.length > 0 ? formData.communication.join(', ') : 'Not selected'}

Q: Are you okay with me filming our organizing sessions for professional use?
A: ${formData.filming || 'Not answered'}

Q: Consent given for organizer access?
A: ${formData.consent ? 'Yes - I agree' : 'No'}
`;
        
        // ========== EMAIL OBFUSCATION ==========
        // Email address is split and assembled via JavaScript to prevent
        // automated scrapers from harvesting it from the source code
        const emailParts = ['lin', 'dsey', '@', 'sim', 'pli-fi', '-life', '.com'];
        const recipientEmail = emailParts.join('');
        
        window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    // ========== HELPER COMPONENTS ==========
    const CheckGroup = ({ options, field, label }) => (
        <div className="mb-6">
            <label className="block text-brand-dark font-bold mb-3 text-lg">{label}</label>
            <div className="space-y-2">
                {options.map(opt => (
                    <label key={opt} className="flex items-start gap-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            value={opt} 
                            checked={formData[field].includes(opt)} 
                            onChange={(e) => handleCheckboxChange(e, field)} 
                            className="mt-1 appearance-none w-5 h-5 border-2 border-stone-300 rounded checked:bg-brand-lemon checked:border-brand-lemon transition-colors cursor-pointer flex-shrink-0" 
                        />
                        <span className="text-brand-medium group-hover:text-brand-dark transition-colors">{opt}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    const RadioGroup = ({ options, field, label, required = false }) => (
        <div className="mb-6">
            <label className="block text-brand-dark font-bold mb-3 text-lg">{label} {required && '*'}</label>
            <div className="space-y-3">
                {options.map(opt => (
                    <label key={opt} className="flex items-start gap-4 cursor-pointer group">
                        <input 
                            type="radio" 
                            name={field} 
                            value={opt} 
                            checked={formData[field] === opt} 
                            onChange={(e) => setFormData({...formData, [field]: e.target.value})} 
                            className="mt-[0.3rem] flex-shrink-0 appearance-none w-5 h-5 border-2 border-stone-300 rounded-full checked:border-brand-periwinkle checked:border-[6px] transition-all cursor-pointer" 
                        />
                        <span className="text-brand-medium group-hover:text-brand-dark transition-colors leading-relaxed">{opt}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    // ========== RENDER ==========
    return (
        <div className="bg-brand-base min-h-screen pt-44 pb-24 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-60 bg-[linear-gradient(to_right,#d4d7ff_1px,transparent_1px),linear-gradient(to_bottom,#d4d7ff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            
            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-dark mb-4 tracking-tight">New Space Intake</h1>
                    <p className="text-brand-medium">Tell us about your space so we can hit the ground running.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-brand-white rounded-3xl shadow-xl border border-stone-200 p-8 md:p-12 space-y-8">
                    
                    {/* CONTACT INFO */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-brand-dark mb-2">First Name *</label>
                            <input required className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-dark mb-2">Last Name *</label>
                            <input required className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-brand-dark mb-2">Email Address *</label>
                            <input required type="email" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-dark mb-2">Phone *</label>
                            <input required type="tel" className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                        </div>
                    </div>

                    {/* WHY SEEKING SERVICES */}
                    <div className="pt-6 border-t border-stone-100">
                        <label className="block text-lg font-bold text-brand-dark mb-2">Why are you seeking Simpli-FI Life services right now?</label>
                        <textarea className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" rows="3" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} placeholder="e.g. I keep tidying, but the clutter keeps coming back..."></textarea>
                    </div>

                    {/* SERVICES */}
                    <CheckGroup 
                        label="Which services would you like Simpli-FI Life's help with? *"
                        field="services"
                        options={[
                            "Decluttering",
                            "Finding 'Homes' for Things",
                            "Space Planning",
                            "Organizing (use what I own- I do not wish to purchase product)",
                            "Organizing (I would like to purchase new organizing products)",
                            "Packing for a Move",
                            "Unpacking From a Move",
                            "Legacy Documenting"
                        ]}
                    />

                    {/* SPACE FEEL */}
                    <div>
                        <label className="block text-lg font-bold text-brand-dark mb-2">How do you want your space to feel after it's decluttered/organized?</label>
                        <textarea className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" rows="3" value={formData.spaceFeel} onChange={e => setFormData({...formData, spaceFeel: e.target.value})} placeholder="e.g. Peaceful, functional, and easy to reset at the end of the day."></textarea>
                    </div>

                    {/* AREAS */}
                    <CheckGroup 
                        label="Which areas of your home are you itching to declutter/organize? *"
                        field="areas"
                        options={["Kitchen", "Living Room", "Dining Room", "Bedroom", "Bathroom", "Guest Room", "Office", "Laundry Room", "Kids Playroom", "Garage", "Other"]}
                    />

                    {/* PRIORITY QUESTIONS */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-bold text-brand-dark mb-2">Let's pretend time is limited. Which part of your home is your top priority?</label>
                            <input className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" value={formData.priorityArea} onChange={e => setFormData({...formData, priorityArea: e.target.value})} placeholder="Please specify the space and if you want to prioritize decluttering, organizing, or both." />
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-brand-dark mb-2">What's one thing going well in your priority space right now?</label>
                            <input className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" value={formData.priorityGoingWell} onChange={e => setFormData({...formData, priorityGoingWell: e.target.value})} placeholder="e.g. The layout works, or I like the furniture..." />
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-brand-dark mb-2">What's making your top clutter area so tough to declutter?</label>
                            <textarea className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" rows="2" value={formData.clutterToughness} onChange={e => setFormData({...formData, clutterToughness: e.target.value})} placeholder="e.g. I struggle with sentimental attachment, or I get overwhelmed by the volume of stuff."></textarea>
                        </div>
                    </div>

                    {/* MANAGEMENT SCORE SLIDER */}
                    <div className="py-6 border-y border-stone-100">
                        <label className="block text-lg font-bold text-brand-dark mb-4">How easy is it for you to manage the items currently in your home right now?</label>
                        <p className="text-sm text-brand-medium mb-4">1 (Really tough) - 10 (Super easy)</p>
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-brand-lemon">1</span>
                            <input type="range" min="1" max="10" className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-brand-periwinkle" value={formData.managementScore} onChange={e => setFormData({...formData, managementScore: e.target.value})} />
                            <span className="font-bold text-brand-periwinkle">10</span>
                        </div>
                        <div className="text-center font-bold text-xl mt-2 text-brand-dark">{formData.managementScore}</div>
                    </div>

                    {/* EMOTIONS */}
                    <CheckGroup 
                        label="How do you feel when you walk into your home?"
                        field="emotions"
                        options={[
                            "peaceful + calm ☺️",
                            "anxious 😬",
                            "overwhelmed 😫",
                            "drowning in stuff! 😵",
                            "I don't know where anything is",
                            "I don't know where anything goes",
                            "other"
                        ]}
                    />
                    {formData.emotions.includes('other') && (
                        <input 
                            placeholder="Please specify other..." 
                            className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50 -mt-4" 
                            value={formData.emotionsOther}
                            onChange={e => setFormData({...formData, emotionsOther: e.target.value})}
                        />
                    )}

                    {/* PAST ATTEMPTS */}
                    <RadioGroup 
                        label="Have you tried to declutter or organize your space in the past?"
                        field="pastAttempts"
                        options={["YES", "NO"]}
                    />

                    {/* HARDEST ITEMS */}
                    <div>
                        <label className="block text-lg font-bold text-brand-dark mb-2">What items or types of stuff are hardest for you to declutter?</label>
                        <textarea className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" rows="2" value={formData.hardestItems} onChange={e => setFormData({...formData, hardestItems: e.target.value})} placeholder="e.g. Sentimental items, kids' artwork, or expensive items I never used."></textarea>
                    </div>

                    {/* MOTIVATION SLIDERS */}
                    <div className="space-y-8">
                        <div>
                            <label className="block text-lg font-bold text-brand-dark mb-4">How motivated are you to start decluttering your home?</label>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold w-16 text-center">What Motivation?😩</span>
                                <input type="range" min="1" max="10" className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-brand-lemon" value={formData.motivationDeclutter} onChange={e => setFormData({...formData, motivationDeclutter: e.target.value})} />
                                <span className="text-xs font-bold w-16 text-center">Super Motivated👊</span>
                            </div>
                            <div className="text-center font-bold text-lg mt-1 text-brand-dark">{formData.motivationDeclutter}</div>
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-brand-dark mb-4">How motivated are you to start organizing your home?</label>
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold w-16 text-center">What Motivation?😩</span>
                                <input type="range" min="1" max="10" className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-brand-periwinkle" value={formData.motivationOrganize} onChange={e => setFormData({...formData, motivationOrganize: e.target.value})} />
                                <span className="text-xs font-bold w-16 text-center">Super Motivated👊</span>
                            </div>
                            <div className="text-center font-bold text-lg mt-1 text-brand-dark">{formData.motivationOrganize}</div>
                        </div>
                    </div>

                    {/* PRODUCT TYPE */}
                    <RadioGroup 
                        label="In general, what type of organizing product do you need?"
                        field="productType"
                        options={[
                            "Highly visible/See through (if I can't see it, I forget I own it!)",
                            "Hidden/Opaque (I get stressed when I see all my stuff out, I won't forget I have it if I don't see it, and I prefer it hidden)"
                        ]}
                    />

                    {/* AESTHETIC */}
                    <RadioGroup 
                        label="In general, what's your organizing aesthetic?"
                        field="aesthetic"
                        options={[
                            "Light and bright (think whites and warm woods)",
                            "Dark and moody (think blacks, dark woods)",
                            "Depends on the room/space"
                        ]}
                    />

                    {/* LIFE CHANGES */}
                    <div>
                        <label className="block text-lg font-bold text-brand-dark mb-2">Are there any big life changes or deadlines coming up that might affect your ability to declutter/get organized?</label>
                        <textarea className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" rows="2" value={formData.lifeChanges} onChange={e => setFormData({...formData, lifeChanges: e.target.value})}></textarea>
                    </div>

                    {/* WORKED WITH PRO */}
                    <RadioGroup 
                        label="Have you worked with a decluttering coach or professional organizer before?"
                        field="workedWithPro"
                        options={["YES", "NO"]}
                    />

                    {/* PETS & SMOKING - Moved to after workedWithPro, before communication */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-bold text-brand-dark mb-2">Do you have any indoor pets?</label>
                            <input className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-brand-periwinkle outline-none bg-stone-50" value={formData.pets} onChange={e => setFormData({...formData, pets: e.target.value})} placeholder="e.g. 2 cats, 1 dog" />
                        </div>
                        <div>
                            <label className="block text-lg font-bold text-brand-dark mb-2">Is there smoking in the home?</label>
                            <div className="flex gap-4 mt-3">
                                {["Yes", "No"].map(opt => (
                                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="smoking" 
                                            value={opt} 
                                            checked={formData.smoking === opt} 
                                            onChange={e => setFormData({...formData, smoking: e.target.value})} 
                                            className="appearance-none w-5 h-5 border-2 border-stone-300 rounded-full checked:border-brand-lemon checked:border-[6px] transition-all cursor-pointer" 
                                        />
                                        <span className="text-brand-medium">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COMMUNICATION */}
                    <CheckGroup 
                        label="How do you prefer to stay in touch for our Organizing services?"
                        field="communication"
                        options={["Email", "Text Message", "Phone Call"]}
                    />

                    {/* FILMING */}
                    <RadioGroup 
                        label="Are you okay with me filming our organizing sessions for professional use?"
                        field="filming"
                        options={[
                            "Yes—film and use freely🎥",
                            "Maybe—I need more details",
                            "No—I prefer being behind the camera, not in front 😉"
                        ]}
                    />

                    {/* PHOTO UPLOAD */}
                    <div>
                        <label className="block text-lg font-bold text-brand-dark mb-2">Please share photos of the priority space you want decluttered and organized.</label>
                        <p className="text-sm text-brand-medium mb-4">Upload pictures of the area(s) you'd like us to work on together. (JPEG, PNG, or HEIC files, up to 8MB each.)</p>
                        <div className="border-2 border-dashed border-brand-periwinkle/30 rounded-xl p-8 text-center bg-brand-base cursor-pointer hover:bg-brand-periwinkle/5 transition">
                            <div className="flex flex-col items-center">
                                <Icon name="upload" className="w-10 h-10 text-brand-periwinkle mb-2" />
                                <span className="font-bold text-brand-dark">Drag and Drop (or) Choose Files</span>
                                <p className="text-xs text-brand-medium mt-2">Note: Photos will need to be attached separately when your email client opens.</p>
                                <input type="file" multiple accept="image/*" className="hidden" />
                            </div>
                        </div>
                    </div>

                    {/* CONSENT */}
                    <div className="pt-6 border-t border-stone-100">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className={`mt-1 w-6 h-6 border-2 border-stone-300 rounded flex items-center justify-center transition-colors flex-shrink-0 ${formData.consent ? 'bg-brand-lemon border-brand-lemon' : 'bg-white'}`}>
                                {formData.consent && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                            <input type="checkbox" className="hidden" required checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} />
                            <span className="text-sm text-brand-medium">I confirm that I have informed my spouse/partner and all other legal adults in the home about Simpli-FI Life's services, and they consent to the organizer accessing our shared space. * <br/><span className="font-bold text-brand-dark">I agree</span></span>
                        </label>
                    </div>

                    {/* SECURITY: Honeypot field - invisible to humans, bots fill it */}
                    <div className="absolute -left-[9999px]" aria-hidden="true" tabIndex="-1">
                        <label>Leave this field empty</label>
                        <input 
                            type="text" 
                            name="website_url"
                            value={formData.hp_trap} 
                            onChange={e => setFormData({...formData, hp_trap: e.target.value})} 
                            tabIndex="-1" 
                            autoComplete="off" 
                        />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button className="w-full bg-brand-periwinkle text-brand-white py-4 rounded-xl font-display font-bold text-xl uppercase tracking-widest hover:bg-brand-lemon hover:text-brand-dark transition-all shadow-lg transform hover:-translate-y-1">
                        Send Message
                    </button>

                </form>
            </div>
        </div>
    );
};
