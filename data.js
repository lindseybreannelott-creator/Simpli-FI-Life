// This file holds the "Information" for your website
// Moving this here makes your main file much smaller!

const TESTIMONIALS = [
    {
        quote: "Simpli-fi life has been a game changer in my home.",
        author: "Lauren V.",
        role: ""
    },
    {
        quote: "Working with Lindsey as my decluttering coach was so fun, I could not be more happy with the spaces we redefined. I'm loving my space!!! It's so happy and I love what we did!",
        author: "Lauren E.",
        role: ""
    },
    {
        quote: "You are truly pursuing something that you are gifted at. So kind and focused and intentional. I feel the load lessen a lot just from what we accomplished.",
        author: "Ashley M.",
        role: ""
    },
    {
        quote: "Before being with you, I could sit in those mess up spaces for years and just be melancholy... but meeting with you was about just so much awareness and clarity.",
        author: "Amanda B.",
        role: ""
    },
    {
        quote: "Our shop is useable, clean and organized for the first time in decades. Thank you Lindsey for your excellent work!",
        author: "Kevin T.",
        role: "Logistics Captain, Fire Department"
    }
];

const ARTICLES_MOCK = [
    {
        id: '1',
        title: 'The T.R.I.M. Method Explained',
        excerpt: 'How to edit your belongings without losing your mind. The step-by-step guide to lasting organization.',
        content: `
            <p>Organization isn't about buying expensive bins; it's about editing. The <strong>T.R.I.M.</strong> method stands for Trash, Relocate, Inventory, and Maintain.</p>
            <h2>1. Trash</h2>
            <p>The first step is always removal. You cannot organize clutter. We focus on removing items that are broken, expired, or no longer serve your current season of life.</p>
            <h2>2. Relocate</h2>
            <p>Items often accumulate in the wrong rooms. We create "transit zones" to move items back to their logical homes.</p>
            <h2>3. Inventory</h2>
            <p>Once you know what you're keeping, we group like with like. This is where the magic happens—seeing exactly how many batteries or spatulas you actually own.</p>
            <h2>4. Maintain</h2>
            <p>The final step is building a system that requires minimal effort to keep up. Labels are key here, not for aesthetics, but for accountability.</p>
        `,
        author: 'Lindsey Lott', date: 'Oct 12, 2024', category: 'Mindset',
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '2',
        title: 'Commercial Kitchen Workflow',
        excerpt: 'We helped a DFW coffee shop reduce restocking time by 40% simply by moving three shelves.',
        content: `
            <p>In a high-volume coffee shop, seconds count. When we audited a local DFW cafe, we noticed baristas were walking 15 steps to the back fridge for milk alternatives during rush hour.</p>
            <h2>The Audit</h2>
            <p>We tracked movement patterns for three days. The data showed that 30% of movement was "travel time" rather than "prep time."</p>
            <h2>The Solution</h2>
            <p>We implemented a "Point of Use" inventory system. By installing under-counter refrigeration and reorganizing the dry storage to prioritize high-velocity items at eye level, we reduced travel time significantly.</p>
            <h2>The Result</h2>
            <p>Restocking time dropped by 40%, and ticket times improved by an average of 45 seconds per order.</p>
        `,
        author: 'Simpli-FI Team', date: 'Sep 28, 2024', category: 'Commercial',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '3',
        title: 'Why Your Pantry Gets Messy Again',
        excerpt: 'The secret isn\'t better labels, it\'s better zones. Learn how to zone your pantry for kids.',
        content: `
            <p>The number one complaint we hear is: "I organized it, but my kids destroyed it in a week."</p>
            <p>The problem usually isn't the kids—it's the system complexity. If a child has to unstack a box to put away a snack, they won't do it.</p>
            <h2>The "Decanting" Trap</h2>
            <p>Pouring everything into clear jars looks beautiful on Instagram, but it creates a high barrier to maintenance. If you have to find a funnel to put away cereal, the box will end up sitting on the counter.</p>
            <h2>Zone Defense</h2>
            <p>We recommend broad categories in open bins. A "Snack" bin allows a child to toss a granola bar in without needing to line it up perfectly. Success is about lowering the barrier to entry.</p>
        `,
        author: 'Lindsey Lott', date: 'Sep 15, 2024', category: 'Residential',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
];
