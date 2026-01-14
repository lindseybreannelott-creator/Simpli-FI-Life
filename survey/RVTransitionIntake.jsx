import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Coffee, 
  Bed, 
  Bath, 
  Sparkles, 
  Compass,
  Layout,
  Send,
  Tent,
  Gem
} from 'lucide-react';

const App = () => {
  const [answers, setAnswers] = useState({});
  const [items, setItems] = useState({});
  const [itemDetails, setItemDetails] = useState({}); 
  const [notes, setNotes] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Brand Colors mapped for easy use
  const colors = {
    oatmeal: '#fbf9f7',
    darkGreige: '#2d2a26',
    softerGreige: '#57534e',
    white: '#ffffff',
    periwinkle: '#7178c8',
    periwinkleLight: '#d4d7ff',
    periwinkleDark: '#5a60a6',
    lemon: '#D6E31E'
  };

  const handleItemSelect = (category, item, status) => {
    setItems(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [item]: status
      }
    }));
  };

  const handleDetailChange = (item, value) => {
    setItemDetails(prev => ({ ...prev, [item]: value }));
  };

  const handleNoteChange = (category, value) => {
    setNotes(prev => ({ ...prev, [category]: value }));
  };

  const OptionButton = ({ label, value, current, onClick }) => (
    <button
      onClick={() => onClick(value)}
      style={{
        borderColor: current === value ? colors.periwinkle : '#e2e8f0',
        backgroundColor: current === value ? colors.periwinkleLight : colors.white,
        color: current === value ? colors.darkGreige : colors.softerGreige
      }}
      className="w-full p-4 mb-3 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between shadow-sm"
    >
      <span className="font-medium text-sm leading-snug">{label}</span>
      {current === value && <CheckCircle2 className="w-5 h-5 flex-shrink-0 ml-2" style={{ color: colors.periwinkle }} />}
    </button>
  );

  const ItemRow = ({ category, item, showQty = false, detailLabel = "", detailPlaceholder = "" }) => {
    const statuses = [
      { id: 'bring', label: "I'll Bring", activeBg: colors.periwinkleLight, activeText: colors.darkGreige },
      { id: 'unneeded', label: 'Not Needed', activeBg: '#f1f5f9', activeText: colors.softerGreige },
      { id: 'buy_me', label: 'Please Buy', activeBg: colors.periwinkle, activeText: colors.white },
      { id: 'buy_self', label: 'I\'ll Purchase', activeBg: '#dcfce7', activeText: '#166534' }
    ];

    const currentStatus = items[category]?.[item];

    return (
      <div style={{ backgroundColor: colors.white }} className="mb-4 p-4 rounded-2xl border border-slate-100 shadow-sm">
        <p style={{ color: colors.darkGreige }} className="font-semibold mb-3 text-sm">{item}</p>
        <div className="grid grid-cols-2 gap-2">
          {statuses.map((s) => (
            <button
              key={s.id}
              onClick={() => handleItemSelect(category, item, s.id)}
              style={{
                backgroundColor: currentStatus === s.id ? s.activeBg : '#f8fafc',
                color: currentStatus === s.id ? s.activeText : '#94a3b8'
              }}
              className="text-[11px] py-2 px-1 rounded-lg font-bold transition-all uppercase tracking-tight"
            >
              {s.label}
            </button>
          ))}
        </div>
        
        {/* Conditional input for specific item details (Qty or Type) */}
        {currentStatus === 'buy_me' && (showQty || detailLabel) && (
          <div className="mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
            <label style={{ color: colors.softerGreige }} className="text-[10px] font-bold uppercase tracking-wider mb-1 block ml-1">
              {detailLabel || "Quantity Preference (Recommended 2-4)"}
            </label>
            <input 
              type="text"
              placeholder={detailPlaceholder || "Enter details..."}
              style={{ backgroundColor: colors.oatmeal }}
              className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-200 outline-none"
              value={itemDetails[item] || ''}
              onChange={(e) => handleDetailChange(item, e.target.value)}
            />
          </div>
        )}
      </div>
    );
  };

  const SectionHeader = ({ icon: Icon, title, description, customBlock }) => (
    <div className="pt-10 mb-6 border-t border-slate-200 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3 mb-2">
        <div style={{ backgroundColor: colors.periwinkleLight, color: colors.periwinkle }} className="p-2 rounded-lg">
          <Icon size={20} />
        </div>
        <h2 style={{ color: colors.darkGreige }} className="text-xl font-bold">{title}</h2>
      </div>
      {description && <p style={{ color: colors.softerGreige }} className="text-sm italic ml-11 mb-2">{description}</p>}
      {customBlock && (
        <div style={{ backgroundColor: colors.white, color: colors.softerGreige, borderLeft: `4px solid ${colors.lemon}` }} className="ml-11 p-4 rounded-xl text-sm leading-relaxed italic shadow-sm">
          {customBlock}
        </div>
      )}
    </div>
  );

  if (isSubmitted) {
    return (
      <div style={{ backgroundColor: colors.oatmeal }} className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md animate-in zoom-in duration-300">
          <div style={{ backgroundColor: colors.periwinkleLight }} className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" style={{ color: colors.periwinkle }} />
          </div>
          <h2 style={{ color: colors.darkGreige }} className="text-3xl font-bold mb-4">All Set!</h2>
          <p style={{ color: colors.softerGreige }} className="mb-8 leading-relaxed text-sm">
            I've received your preferences. I'll get to work on the sourcing and organization so you don't have to worry about a thing.
          </p>
        </div>
      </div>
    );
  }

  const isCook = answers.cook_plan === 'yes' || answers.cook_plan === 'sometimes';

  return (
    <div style={{ backgroundColor: colors.oatmeal }} className="min-h-screen font-sans pb-32">
      <div style={{ backgroundColor: `${colors.white}e6` }} className="sticky top-0 backdrop-blur-md border-b border-slate-200 z-10 p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 style={{ color: colors.darkGreige }} className="font-bold text-lg">RV Transition Essentials</h1>
          <span style={{ backgroundColor: colors.periwinkleLight, color: colors.periwinkle }} className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Concierge Intake</span>
        </div>
      </div>

      <main className="max-w-2xl mx-auto p-6 space-y-2">
        
        <SectionHeader icon={Layout} title="General Preferences" />
        
        <div className="space-y-6">
          <section>
            <h3 style={{ color: colors.softerGreige }} className="text-xs font-bold uppercase tracking-wider mb-3">1) Organizing Preferences</h3>
            <OptionButton 
              label="Highly visible / See through (If I can't see it, I forget I own it!)" 
              value="visible" 
              current={answers.org_type}
              onClick={(v) => setAnswers({...answers, org_type: v})}
            />
            <OptionButton 
              label="Hidden / Opaque (I prefer items tucked away and out of sight; I won't forget what I own.)" 
              value="hidden" 
              current={answers.org_type}
              onClick={(v) => setAnswers({...answers, org_type: v})}
            />
            <OptionButton 
              label="Not sure" 
              value="unsure" 
              current={answers.org_type}
              onClick={(v) => setAnswers({...answers, org_type: v})}
            />
            <OptionButton 
              label="No preference" 
              value="no_preference" 
              current={answers.org_type}
              onClick={(v) => setAnswers({...answers, org_type: v})}
            />
          </section>

          <section>
            <h3 style={{ color: colors.softerGreige }} className="text-xs font-bold uppercase tracking-wider mb-3">2) Do you have organizing aesthetic preferences?</h3>
            <OptionButton 
              label="Light and bright (think whites and warm woods)" 
              value="light" 
              current={answers.aesthetic}
              onClick={(v) => setAnswers({...answers, aesthetic: v})}
            />
            <OptionButton 
              label="Dark and moody (think blacks, dark woods)" 
              value="dark" 
              current={answers.aesthetic}
              onClick={(v) => setAnswers({...answers, aesthetic: v})}
            />
            <OptionButton 
              label="No preference" 
              value="none" 
              current={answers.aesthetic}
              onClick={(v) => setAnswers({...answers, aesthetic: v})}
            />
          </section>

          <section>
            <h3 style={{ color: colors.softerGreige }} className="text-xs font-bold uppercase tracking-wider mb-1">3) Leisure & Hobbies</h3>
            <p style={{ color: colors.softerGreige }} className="text-xs mb-3">Do you have any items for hobbies you want to prioritize space for?</p>
            <textarea 
              style={{ backgroundColor: colors.white }}
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-periwinkle outline-none min-h-[100px] text-sm shadow-sm"
              placeholder="e.g. Reading, watching TV, games, outdoor hobbies, no priority."
              value={answers.leisure || ''}
              onChange={(e) => setAnswers({...answers, leisure: e.target.value})}
            />
          </section>

          <section>
            <h3 style={{ color: colors.softerGreige }} className="text-xs font-bold uppercase tracking-wider mb-3">4) Will you be working from the RV?</h3>
            <OptionButton 
              label="Yes, I need to prioritize office organization" 
              value="yes" 
              current={answers.work}
              onClick={(v) => setAnswers({...answers, work: v})}
            />
            {answers.work === 'yes' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <p style={{ color: colors.softerGreige }} className="text-xs mb-2 ml-1 italic">Please list priority items that need organized:</p>
                <textarea 
                  style={{ backgroundColor: colors.white }}
                  className="w-full p-4 mb-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-periwinkle outline-none text-sm shadow-sm"
                  placeholder="e.g. Laptop, desktop, files, inventory, etc."
                  value={answers.work_details || ''}
                  onChange={(e) => setAnswers({...answers, work_details: e.target.value})}
                />
              </div>
            )}
            <OptionButton 
              label="No office space needed" 
              value="no" 
              current={answers.work}
              onClick={(v) => setAnswers({...answers, work: v})}
            />
          </section>

          <section>
            <h3 style={{ color: colors.softerGreige }} className="text-xs font-bold uppercase tracking-wider mb-1">5) Professional Use</h3>
            <p style={{ color: colors.softerGreige }} className="text-xs mb-3">Are you okay with me filming the organizing sessions for professional use (testimonials or marketing)?</p>
            <OptionButton 
              label="Yes—film and use freely" 
              value="yes" 
              current={answers.film}
              onClick={(v) => setAnswers({...answers, film: v})}
            />
            <OptionButton 
              label="Maybe—I need more details" 
              value="maybe" 
              current={answers.film}
              onClick={(v) => setAnswers({...answers, film: v})}
            />
            <OptionButton 
              label="No" 
              value="no" 
              current={answers.film}
              onClick={(v) => setAnswers({...answers, film: v})}
            />
          </section>

          <section className="pt-4">
            <h3 style={{ color: colors.softerGreige }} className="text-xs font-bold uppercase tracking-wider mb-1">6) Sourcing & Quality Preference</h3>
            <p style={{ color: colors.softerGreige }} className="text-xs mb-3">Help me understand the quality level you'd like me to target for new items.</p>
            <OptionButton 
              label="Standard & Functional (Reliable, high-quality essentials)" 
              value="standard" 
              current={answers.quality}
              onClick={(v) => setAnswers({...answers, quality: v})}
            />
            <OptionButton 
              label="Premium & Elevated (Upgraded materials and recognized brands)" 
              value="premium" 
              current={answers.quality}
              onClick={(v) => setAnswers({...answers, quality: v})}
            />
            <OptionButton 
              label="Top of the Line (The absolute 'best of the best' / Luxury options)" 
              value="luxury" 
              current={answers.quality}
              onClick={(v) => setAnswers({...answers, quality: v})}
            />
          </section>
        </div>

        <div className="pt-10 border-t border-slate-200">
          <div style={{ backgroundColor: colors.white, borderLeft: `4px solid ${colors.lemon}` }} className="p-4 rounded-xl text-sm leading-relaxed mb-6 italic shadow-sm">
            "Here is a general list of things you may have/want to consider having in the RV. I'm happy to source any items you may need but not currently have if it would be of help to you."
          </div>
        </div>

        <SectionHeader icon={Coffee} title="Kitchen & Dining" />
        
        <div style={{ backgroundColor: colors.periwinkleLight }} className="p-4 rounded-2xl border border-indigo-100 mb-6 shadow-sm">
          <h3 style={{ color: colors.periwinkleDark }} className="text-xs font-bold uppercase tracking-wider mb-3">Do you plan to cook in the RV?</h3>
          <div className="grid grid-cols-3 gap-2">
            {['yes', 'sometimes', 'no'].map((opt) => (
              <button
                key={opt}
                onClick={() => setAnswers({...answers, cook_plan: opt})}
                style={{
                  backgroundColor: answers.cook_plan === opt ? colors.periwinkle : colors.white,
                  color: answers.cook_plan === opt ? colors.white : colors.periwinkle,
                  borderColor: answers.cook_plan === opt ? colors.periwinkle : colors.periwinkleLight
                }}
                className="py-2 px-1 rounded-lg text-xs font-bold uppercase tracking-tight transition-all border shadow-sm"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <ItemRow category="kitchen" item="Plates, bowls, cups" showQty={true} />
        <ItemRow category="kitchen" item="Silverware set" />
        <ItemRow category="kitchen" item="Sharp knives set" />
        <ItemRow category="kitchen" item="Cutting board" />
        
        {isCook && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-2 mb-4 px-1 mt-2">
              <div className="h-px bg-slate-200 flex-grow"></div>
              <span style={{ color: colors.softerGreige }} className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Cooking Essentials</span>
              <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            <ItemRow category="kitchen" item="Skillet" />
            <ItemRow category="kitchen" item="Small pot" />
            <ItemRow category="kitchen" item="Instant Pot" />
            <ItemRow category="kitchen" item="Air Fryer" />
            <ItemRow category="kitchen" item="Blender" />
            <ItemRow category="kitchen" item="Toaster" />
            <ItemRow category="kitchen" item="Essential Spices" />
            <ItemRow category="kitchen" item="Colander" />
          </div>
        )}

        <ItemRow 
          category="kitchen" 
          item="Coffee maker" 
          detailLabel="Preference (Keurig/Pods, Pour Over, Drip, Other)"
          detailPlaceholder="e.g. Drip coffee maker, Keurig, etc."
        />
        <ItemRow category="kitchen" item="Reusable storage containers" />
        <ItemRow category="kitchen" item="Dish drainer (if hand washing)" />
        <ItemRow category="kitchen" item="Dish towels & hot pads" />
        <ItemRow category="kitchen" item="Can opener" />
        <ItemRow category="kitchen" item="Lighter / Matches" />
        <ItemRow category="kitchen" item="Trash bags" />

        <textarea 
          style={{ backgroundColor: colors.white }}
          className="w-full p-4 mb-8 rounded-xl border border-slate-200 outline-none text-sm shadow-sm"
          placeholder="Share any preferences here: brands, likes/dislikes, colors, etc."
          value={notes.kitchen || ''}
          onChange={(e) => handleNoteChange('kitchen', e.target.value)}
        />

        <SectionHeader icon={Bed} title="Bedroom & Sleep" />
        <ItemRow 
          category="bedroom" 
          item="Bedding (Sheets, comforter/duvet)" 
          detailLabel="Bed Size (King or Queen)" 
          detailPlaceholder="e.g. Queen, King..."
        />
        <ItemRow 
          category="bedroom" 
          item="Pillows & extra blanket" 
          detailLabel="Pillow Preference (Memory foam, down, firm, etc.)" 
          detailPlaceholder="e.g. Memory foam, hypoallergenic..."
        />
        <ItemRow category="bedroom" item="Under-mattress pad (Anti-mold for humidity)" />
        
        <textarea 
          style={{ backgroundColor: colors.white }}
          className="w-full p-4 mb-8 rounded-xl border border-slate-200 outline-none text-sm shadow-sm"
          placeholder="Share any preferences here..."
          value={notes.bedroom || ''}
          onChange={(e) => handleNoteChange('bedroom', e.target.value)}
        />

        <SectionHeader icon={Bath} title="Bathroom" />
        <ItemRow category="bathroom" item="Towel sets" />
        <ItemRow 
          category="bathroom" 
          item="Wall dispenser for shower toiletries" 
          detailLabel="Confirm contents (Soap, shampoo, conditioner, etc.)" 
          detailPlaceholder="e.g. All three, or just shampoo and soap..."
        />
        <ItemRow category="bathroom" item="Toiletries (Shampoo, soap, conditioner, deodorant, etc.)" />
        <ItemRow category="bathroom" item="RV-safe toilet paper" />
        
        <textarea 
          style={{ backgroundColor: colors.white }}
          className="w-full p-4 mb-8 rounded-xl border border-slate-200 outline-none text-sm shadow-sm"
          placeholder="Share any preferences here..."
          value={notes.bathroom || ''}
          onChange={(e) => handleNoteChange('bathroom', e.target.value)}
        />

        <SectionHeader icon={Sparkles} title="Cleaning & Comfort" />
        {[
          'Cleaning supplies kit',
          'Cordless vacuum',
          'Small Dehumidifier',
          'Safe space heater',
          'Fire extinguisher'
        ].map(item => <ItemRow key={item} category="cleaning" item={item} />)}
        
        <textarea 
          style={{ backgroundColor: colors.white }}
          className="w-full p-4 mb-8 rounded-xl border border-slate-200 outline-none text-sm shadow-sm"
          placeholder="Share any preferences here..."
          value={notes.cleaning || ''}
          onChange={(e) => handleNoteChange('cleaning', e.target.value)}
        />

        <SectionHeader icon={Compass} title="Outdoor Hobbies & Extras" description="Gear for your active lifestyle outside the RV." />
        {[
          'Outdoor Hobby Storage (Specific for gear/tools)',
          'Portable Grill or Camp Stove',
          'Hammock or Outdoor Relaxation Gear',
          'Outdoor Rug',
          'Premium Camping Chairs',
          'First Aid Kit + Basic Meds',
          'Bug Spray & Sunscreen Station'
        ].map(item => <ItemRow key={item} category="extras" item={item} />)}
        
        <textarea 
          style={{ backgroundColor: colors.white }}
          className="w-full p-4 mb-8 rounded-xl border border-slate-200 outline-none text-sm shadow-sm"
          placeholder="Share preferences for outdoor gear..."
          value={notes.extras || ''}
          onChange={(e) => handleNoteChange('extras', e.target.value)}
        />

        <div className="pt-10 pb-10">
          <button 
            onClick={() => setIsSubmitted(true)}
            style={{ backgroundColor: colors.lemon, color: colors.darkGreige }}
            className="w-full py-5 font-bold rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 border border-slate-200"
          >
            <Send size={20} />
            Complete Questionnaire
          </button>
          <p style={{ color: colors.softerGreige }} className="text-center text-xs mt-4">I'll receive these selections immediately once you hit complete.</p>
        </div>

      </main>
    </div>
  );
};

export default App;
