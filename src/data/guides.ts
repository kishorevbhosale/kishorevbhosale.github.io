export type GuideBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; text: string };

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  updated: string;
  image: string;
  relatedService: string;
  body: GuideBlock[];
};

export const guides: Guide[] = [
  {
    slug: "which-fssai-license-do-i-need",
    title: "Which FSSAI Licence Do I Need? Registration vs State vs Central",
    excerpt:
      "A clear, practical breakdown of FSSAI Basic Registration, State Licence and Central Licence — eligibility by turnover, capacity and business activity.",
    category: "Licensing",
    readMinutes: 6,
    updated: "2026-11-01",
    image: "/images/produce.webp",
    relatedService: "central-food-license",
    body: [
      { type: "p", text: "Every food business in India — from a home baker to a multinational manufacturer — must be registered or licensed with the Food Safety and Standards Authority of India (FSSAI) under the Food Safety & Standards Act, 2006. Choosing the wrong category is the single most common reason for rejected applications." },
      { type: "h2", text: "The three FSSAI categories at a glance" },
      {
        type: "table",
        head: ["Category", "Annual turnover", "Typical businesses", "Form"],
        rows: [
          ["Basic Registration", "Up to ₹12 lakh", "Home kitchens, petty retailers, hawkers, small stalls", "Form A"],
          ["State Licence", "₹12 lakh – ₹20 crore", "Restaurants, mid-size manufacturers, distributors, hotels up to 4-star", "Form B"],
          ["Central Licence", "Above ₹20 crore", "Large manufacturers, importers, exporters, e-commerce, multi-state head offices", "Form B"],
        ],
      },
      { type: "h2", text: "Turnover is not the only criterion" },
      { type: "p", text: "Production capacity and the nature of activity can override turnover. For example:" },
      {
        type: "ul",
        items: [
          "All food importers need a Central Licence irrespective of turnover.",
          "Dairy units handling more than 50,000 litres per day need a Central Licence.",
          "Manufacturers (other than milk, meat and oil) producing more than 2 MT per day need a Central Licence.",
          "Businesses at airports, seaports and railway premises fall under the Central Licensing Authority.",
          "Head offices of companies operating in two or more states need a Central Licence.",
        ],
      },
      { type: "callout", text: "Not sure? Use our free FSSAI License Finder — answer three questions and get an instant recommendation with the document checklist." },
      { type: "h2", text: "One licence per premises" },
      { type: "p", text: "An FSSAI licence is linked to a specific address. If you run three outlets or a factory and two warehouses, each location needs its own registration or licence." },
    ],
  },
  {
    slug: "fssai-annual-return-form-d1",
    title: "FSSAI Annual Return (Form D1): Due Date, Who Must File & Penalties",
    excerpt: "Everything licensed manufacturers, importers and packers need to know about filing the FSSAI annual return before 31st May.",
    category: "Compliance",
    readMinutes: 4,
    updated: "2026-10-15",
    image: "/images/warehouse.webp",
    relatedService: "annual-return-submission",
    body: [
      { type: "p", text: "The FSSAI annual return is a declaration of the food categories and quantities you manufactured, imported, labelled or packed during the previous financial year. It is filed online on FoSCoS in Form D1." },
      { type: "h2", text: "Who must file?" },
      { type: "ul", items: ["Licensed manufacturers", "Importers", "Labellers and packers / repackers", "Milk and milk product manufacturers (additional half-yearly return, where applicable)"] },
      { type: "h2", text: "Due date and late fee" },
      { type: "p", text: "Form D1 for the financial year April–March must be filed on or before 31st May. A late fee of ₹100 per day is levied after the due date. A NIL return is required even if there was no production." },
      { type: "h2", text: "Common mistakes" },
      { type: "ol", items: ["Reporting products not endorsed on the licence", "Mixing units (kg vs MT)", "Missing the deadline because the licence holder changed staff"] },
      { type: "callout", text: "We file Form D1 for our clients every year and send reminders well before the deadline." },
    ],
  },
  {
    slug: "fostac-training-explained",
    title: "FoSTaC Training Explained: Who Needs It and Which Course to Choose",
    excerpt: "FSSAI's Food Safety Training & Certification programme is mandatory. Here's how Basic, Advanced and Special courses differ.",
    category: "Training",
    readMinutes: 5,
    updated: "2026-09-20",
    image: "/images/chef.webp",
    relatedService: "fostac-training",
    body: [
      { type: "p", text: "FoSTaC (Food Safety Training & Certification) is FSSAI's flagship programme for building food safety competence in the industry. FSSAI requires every licensed or registered business to have at least one trained and certified Food Safety Supervisor for every 25 food handlers on each premises." },
      { type: "h2", text: "Course levels" },
      {
        type: "table",
        head: ["Level", "Approx. duration", "Suitable for"],
        rows: [
          ["Basic", "~4 hours", "Street food vendors, small caterers, petty retailers, registration holders"],
          ["Advanced", "~8–12 hours", "Supervisors in licensed restaurants, manufacturing units, retail & distribution"],
          ["Special", "~12 hours", "Milk, meat & poultry, fish, edible oil, bakery, packaged water, health supplements"],
        ],
      },
      { type: "h2", text: "What is covered" },
      { type: "ul", items: ["Food safety hazards — biological, chemical, physical and allergens", "Personal hygiene and health of food handlers", "Cleaning, sanitation and pest control", "Temperature control, storage and cross-contamination", "Schedule 4 requirements and FSSAI regulations", "Documentation and record keeping"] },
      { type: "callout", text: "Our founder has trained 250+ food handlers under FoSTaC. We run on-site batches at your premises." },
    ],
  },
  {
    slug: "fssai-labelling-checklist-2020",
    title: "FSSAI Labelling Checklist: FSS (Labelling & Display) Regulations, 2020",
    excerpt: "A step-by-step checklist of every mandatory declaration on a pre-packaged food label in India.",
    category: "Labelling",
    readMinutes: 7,
    updated: "2026-08-28",
    image: "/images/packaging.webp",
    relatedService: "label-compliance",
    body: [
      { type: "p", text: "The Food Safety and Standards (Labelling and Display) Regulations, 2020 govern what must appear on every pre-packaged food label sold in India. Non-compliant labels can result in improvement notices, penalties and product recalls." },
      { type: "h2", text: "Mandatory declarations" },
      {
        type: "ol",
        items: [
          "Name of the food — true nature of the product",
          "List of ingredients in descending order of weight, with compound ingredients declared",
          "Nutritional information — energy, protein, carbohydrate, total & added sugars, total fat, saturated fat, trans fat, cholesterol and sodium",
          "Veg (green) or non-veg (brown) symbol of the prescribed size",
          "Food additives with functional class and INS number",
          "Allergen declaration — e.g. cereals containing gluten, crustaceans, milk, eggs, fish, peanuts, tree nuts, soybeans, sulphites",
          "Name and complete address of the manufacturer / packer / importer",
          "FSSAI logo and licence number",
          "Net quantity, retail sale price and consumer care details (Legal Metrology)",
          "Lot / batch number",
          "Date of manufacture or packing and 'Best Before' / 'Use By' date",
          "Country of origin for imported food",
          "Instructions for use and storage, where applicable",
        ],
      },
      { type: "h2", text: "Claims need evidence" },
      { type: "p", text: "Words like 'natural', 'fresh', 'pure', 'traditional' and health claims are regulated by the FSS (Advertising & Claims) Regulations, 2018. Use them only when your product meets the defined conditions." },
      { type: "callout", text: "Send us your artwork before printing — we return a marked-up compliance report in 2–4 working days." },
    ],
  },
  {
    slug: "fssc-22000-vs-iso-22000-vs-haccp",
    title: "FSSC 22000 vs ISO 22000 vs HACCP: Which Certification Is Right for You?",
    excerpt: "Understand the differences between the most common food safety certifications and choose the right one for your customers and markets.",
    category: "Certification",
    readMinutes: 6,
    updated: "2026-07-12",
    image: "/images/testing.webp",
    relatedService: "management-system-implementation",
    body: [
      { type: "p", text: "Buyers, exporters and modern retail increasingly ask for food safety certification. But which one? Here's how the most common schemes compare." },
      {
        type: "table",
        head: ["Standard", "What it is", "GFSI recognised", "Best for"],
        rows: [
          ["HACCP", "Hazard analysis & critical control points based on Codex principles", "No", "Small and mid-size units starting their food safety journey"],
          ["ISO 22000", "Food safety management system standard with HACCP + management system", "No", "Businesses wanting a structured FSMS"],
          ["FSSC 22000", "ISO 22000 + sector PRPs (ISO/TS 22002) + additional requirements", "Yes", "Manufacturers supplying global brands and exporters"],
          ["BRCGS", "Prescriptive global food safety standard", "Yes", "Suppliers to UK / EU retailers"],
        ],
      },
      { type: "h2", text: "How long does certification take?" },
      { type: "p", text: "With a committed team, HACCP can be implemented in 6–8 weeks, while FSSC 22000 or BRCGS usually takes 3–6 months including internal audits and the two-stage certification audit." },
      { type: "callout", text: "With 500+ audit man-days of experience, we know what certification auditors look for — and we implement systems your team will actually use." },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
