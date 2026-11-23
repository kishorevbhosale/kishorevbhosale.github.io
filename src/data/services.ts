export type IconName =
  | "FileCheck2"
  | "ShieldCheck"
  | "ClipboardList"
  | "RefreshCw"
  | "ClipboardCheck"
  | "FlaskConical"
  | "Scale"
  | "GraduationCap"
  | "Settings"
  | "SearchCheck"
  | "TestTubes"
  | "Tag"
  | "PackageCheck";

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  number: string;
  category: "licensing" | "compliance";
  icon: IconName;
  title: string;
  /** Card text shown on the home page grid */
  summary: string;
  heroDescription: string;
  overview: string[];
  whoNeeds: string[];
  documents: string[];
  process: { title: string; text: string }[];
  timeline: string;
  validity?: string;
  factsTitle?: string;
  facts?: { label: string; value: string }[];
  pitfalls: string[];
  deliverables: string[];
  faqs: Faq[];
  related: string[];
  keywords: string[];
};

const commonFboDocs = [
  "Photo identity & address proof of proprietor / partners / directors (Aadhaar, PAN)",
  "Proof of possession of premises (rent agreement, sale deed or NOC from owner)",
  "Constitution document — partnership deed, MoA/AoA or certificate of incorporation",
  "List of food categories / products to be handled",
];

export const services: Service[] = [
  {
    slug: "central-food-license",
    number: "01",
    category: "licensing",
    icon: "FileCheck2",
    title: "Central Food License",
    summary:
      "For businesses with turnover above ₹20 crore or operating across multiple states. Full application support and follow-up.",
    heroDescription:
      "End-to-end FSSAI Central Licence for large manufacturers, importers, exporters, e-commerce platforms and multi-state food businesses — issued by the Central Licensing Authority through FoSCoS.",
    overview: [
      "An FSSAI Central Licence is mandatory for large-scale Food Business Operators (FBOs) and for specific activities that fall under the Central Licensing Authority, irrespective of turnover — such as food imports, exports, operations at airports and seaports, and head offices of businesses operating in more than one state.",
      "Our team prepares the complete Form B application, classifies your products under the correct Food Category System (FCS), drafts your Food Safety Management System (FSMS) plan and follows up with the Designated Officer until the licence is granted.",
    ],
    whoNeeds: [
      "Food businesses with annual turnover above ₹20 crore",
      "Importers of food products, including food ingredients and additives (IEC mandatory)",
      "Exporters of food products",
      "Head office / registered office of FBOs operating in two or more states",
      "Manufacturers: dairy units above 50,000 litres/day, meat processing above 2 MT/day, vegetable oil above 2 MT/day, other food manufacturing above 2 MT/day",
      "FBOs in Central Government premises — airports, seaports, railways, defence",
      "E-commerce food business operators, 100% Export Oriented Units, 5-star and above hotels",
      "Manufacturers of nutraceuticals, health supplements and novel / non-specified foods",
    ],
    documents: [
      "Form B duly completed and signed by the proprietor / partner / authorised signatory",
      "Blueprint / layout plan of the processing unit showing dimensions and operation-wise area allocation",
      "List of directors / partners with full address and contact details",
      "Name and list of equipment and machinery with number, installed capacity and horsepower",
      "Authority letter nominating a responsible person with name and address",
      "Analysis report (chemical & bacteriological) of water used as ingredient, from an NABL / FSSAI-notified lab",
      "Proof of turnover or transportation (where applicable) and IEC code for importers / exporters",
      "Food Safety Management System (FSMS) plan or certificate",
      "Source of milk / meat / raw material (for relevant categories) and recall plan",
      "NOC from municipality / panchayat, and Ministry of Tourism certificate for hotels (where applicable)",
      ...commonFboDocs,
    ],
    process: [
      { title: "Eligibility & category mapping", text: "We confirm Central jurisdiction and map every product to the correct FCS category and Kind of Business (KoB)." },
      { title: "Document preparation", text: "We draft Form B, the FSMS plan, recall plan, layout and all declarations in the format FSSAI expects." },
      { title: "FoSCoS filing & fee", text: "Application filed online on FoSCoS with the correct licence fee and tenure (1 to 5 years)." },
      { title: "Scrutiny & inspection", text: "We respond to deficiency letters and prepare your unit for the Food Safety Officer's inspection." },
      { title: "Licence grant", text: "Licence issued by the Central Licensing Authority; we hand over a compliance calendar for renewals and returns." },
    ],
    timeline: "Typically 30–60 days from complete application, depending on inspection and query resolution.",
    validity: "1 to 5 years, as chosen at the time of application",
    facts: [
      { label: "Government fee (Central Licence)", value: "₹7,500 per year (indicative, as per FSSAI)" },
      { label: "Tenure", value: "1 – 5 years; fee is multiplied by years selected" },
    ],
    pitfalls: [
      "Wrong product category or KoB selected, leading to rejection or a licence that does not cover your products",
      "Layout plan without dimensions or without operation-wise area marking",
      "Water analysis report older than six months or from a non-NABL laboratory",
      "Missing IEC for importers / exporters or mismatch between entity names across documents",
      "No reply to FoSCoS deficiency letters within 30 days, causing automatic rejection",
    ],
    deliverables: ["Eligibility assessment", "Complete Form B file", "FSMS plan", "FoSCoS filing & follow-up", "Inspection readiness support", "Post-licence compliance calendar"],
    faqs: [
      { q: "Is a Central Licence required for importers even with low turnover?", a: "Yes. All food importers require an FSSAI Central Licence irrespective of turnover, along with a valid Import Export Code (IEC)." },
      { q: "We operate in three states — do we need three Central Licences?", a: "Your head office needs a Central Licence. Each manufacturing or operational unit needs its own State or Central Licence depending on its capacity and turnover." },
      { q: "Can I convert my State Licence to a Central Licence?", a: "Yes. When your turnover crosses ₹20 crore or you start importing, you must apply for a Central Licence. We manage the transition so there is no gap in compliance." },
    ],
    related: ["state-food-license", "annual-return-submission", "product-coa-labeling-compliance"],
    keywords: ["FSSAI central license", "central food license consultant", "FSSAI import license", "FSSAI license for exporters"],
  },
  {
    slug: "state-food-license",
    number: "02",
    category: "licensing",
    icon: "ShieldCheck",
    title: "State Food License",
    summary:
      "For medium-scale food businesses operating within a single state with turnover between ₹12 lakh and ₹20 crore.",
    heroDescription:
      "FSSAI State Licence for manufacturers, restaurants, hotels, caterers, distributors and storage units operating within one state — prepared, filed and followed up by our compliance specialists.",
    overview: [
      "A State Food Licence is issued by the State Food Safety Commissionerate for medium-sized food businesses. It applies to most restaurants, manufacturers, wholesalers, distributors, cold storages, caterers and hotels whose annual turnover is between ₹12 lakh and ₹20 crore.",
      "Capacity also matters: a manufacturing unit can fall under the State category based on its daily production volume even when turnover is low. We assess both criteria before filing to avoid rejection.",
    ],
    whoNeeds: [
      "Food businesses with annual turnover between ₹12 lakh and ₹20 crore",
      "Manufacturers up to 2 MT/day (other than milk, meat and oil), dairy units 500 – 50,000 litres/day",
      "Restaurants, cafés, cloud kitchens, caterers and canteens above the registration threshold",
      "Hotels up to 4-star category",
      "Wholesalers, distributors, retailers, storage and transporters operating within one state",
      "Repackers and relabellers operating within the state",
    ],
    documents: [
      "Form B duly completed and signed",
      "Layout plan of the premises with dimensions",
      "List of directors / partners / proprietor with contact details",
      "List of equipment and machinery with capacity (for manufacturers)",
      "Water analysis report from an NABL-accredited laboratory (where water is used as ingredient)",
      "Food Safety Management System (FSMS) plan",
      "NOC from local municipal body / gram panchayat (where applicable)",
      ...commonFboDocs,
    ],
    process: [
      { title: "Business assessment", text: "We check turnover, capacity and activities to confirm State jurisdiction and the right KoB." },
      { title: "Documentation", text: "We prepare Form B, FSMS plan and all annexures, and review your existing documents for gaps." },
      { title: "Online filing", text: "Application submitted on FoSCoS with the correct fee and tenure." },
      { title: "Inspection support", text: "Pre-inspection hygiene checklist and on-call support during the FSO visit." },
      { title: "Licence issuance", text: "State Licence issued; we set reminders for annual returns and renewal." },
    ],
    timeline: "Usually 30–60 days, subject to state authority inspection schedules.",
    validity: "1 to 5 years",
    facts: [
      { label: "Manufacturers above 1 MT/day, 3-star+ hotels", value: "₹5,000 per year (indicative)" },
      { label: "Manufacturers below 1 MT/day, dairy 10,001–50,000 L/day", value: "₹3,000 per year (indicative)" },
      { label: "Restaurants, caterers, traders, storage & others", value: "₹2,000 per year (indicative)" },
    ],
    pitfalls: [
      "Applying under Registration when turnover or capacity requires a State Licence",
      "Incorrect premises address or mismatch with the rent agreement",
      "Not adding all product categories, leading to future modification applications",
      "Missing FSMS plan or a generic plan not specific to your process",
    ],
    deliverables: ["Category & KoB assessment", "Form B file", "FSMS plan", "FoSCoS filing", "Inspection support", "Renewal & return reminders"],
    faqs: [
      { q: "My restaurant turnover is ₹15 lakh. Which licence do I need?", a: "A State FSSAI Licence, because your turnover is above the ₹12 lakh registration limit and below ₹20 crore." },
      { q: "Do I need a separate licence for each outlet?", a: "Yes. FSSAI licences are premises-specific, so every outlet, kitchen or warehouse needs its own registration or licence." },
      { q: "Can I sell on Swiggy / Zomato with a State Licence?", a: "Yes. A valid State Licence (or registration, if eligible) displayed on your listing is required by all food delivery aggregators." },
    ],
    related: ["central-food-license", "fssai-registration", "license-modification-renewal"],
    keywords: ["FSSAI state license", "state food license consultant", "FSSAI license for restaurant", "food license Maharashtra"],
  },
  {
    slug: "fssai-registration",
    number: "03",
    category: "licensing",
    icon: "ClipboardList",
    title: "Registration Category",
    summary: "For small food businesses with annual turnover up to ₹12 lakh. Quick, hassle-free registration process.",
    heroDescription:
      "Basic FSSAI Registration (Form A) for petty food businesses, home kitchens, small retailers, street vendors and start-ups — fast, affordable and done right the first time.",
    overview: [
      "Basic FSSAI Registration is meant for petty food business operators — small manufacturers, retailers, hawkers, home-based food businesses, temporary stalls and small caterers — whose annual turnover does not exceed ₹12 lakh.",
      "It is the entry point into the FSSAI system. A 14-digit registration number must be displayed at the premises and printed on packaged food labels.",
    ],
    whoNeeds: [
      "Food businesses with annual turnover up to ₹12 lakh",
      "Home bakers, tiffin services, home chefs and cloud kitchens below the threshold",
      "Petty retailers, hawkers, street food vendors and temporary stall holders",
      "Production capacity up to 100 kg/litre per day (other than milk and meat)",
      "Milk collection / chilling up to 500 litres per day",
      "Small slaughtering units: up to 2 large animals, 10 small animals or 50 poultry birds per day",
    ],
    documents: [
      "Form A (application for registration)",
      "Passport-size photograph of the applicant",
      "Photo identity proof (Aadhaar / PAN / Voter ID)",
      "Proof of possession of premises",
      "List of food products to be handled",
      "Self-declaration of compliance with Schedule 4 hygiene requirements",
    ],
    process: [
      { title: "Eligibility check", text: "We confirm turnover and capacity so you don't over-pay for a licence or under-apply." },
      { title: "Form A preparation", text: "We fill Form A with the right food categories and upload documents." },
      { title: "Filing & fee payment", text: "Application filed on FoSCoS; government fee paid online." },
      { title: "Registration certificate", text: "Registration certificate issued — usually without inspection." },
    ],
    timeline: "Typically 7–15 working days.",
    validity: "1 to 5 years",
    facts: [{ label: "Government fee (Registration)", value: "₹100 per year (indicative, as per FSSAI)" }],
    pitfalls: [
      "Using a registration when turnover has grown beyond ₹12 lakh — a punishable offence",
      "Blurred or mismatched identity documents",
      "Forgetting to print the registration number on product labels",
    ],
    deliverables: ["Eligibility check", "Form A filing", "Registration certificate", "Display & labelling guidance"],
    faqs: [
      { q: "Is FSSAI registration mandatory for home bakers?", a: "Yes. Every food business, including home-based bakers and tiffin services, must hold at least a Basic FSSAI Registration before selling food." },
      { q: "What happens when my turnover crosses ₹12 lakh?", a: "You must upgrade to a State Licence. We can file the upgrade so your business stays compliant without interruption." },
      { q: "Is there an inspection for registration?", a: "Generally no, but the Registering Authority may inspect your premises at any time." },
    ],
    related: ["state-food-license", "fostac-training", "label-compliance"],
    keywords: ["FSSAI registration", "basic FSSAI registration", "food license for home business", "FSSAI registration online"],
  },
  {
    slug: "license-modification-renewal",
    number: "04",
    category: "licensing",
    icon: "RefreshCw",
    title: "Modification & Renewal",
    summary:
      "Timely renewal of existing licenses and modification of license details — address, product category, or business type.",
    heroDescription:
      "Never let your FSSAI licence lapse. We track expiry dates, file renewals on time and manage every modification — address, products, KoB, capacity or ownership changes.",
    overview: [
      "An FSSAI licence or registration is valid only for the tenure chosen at the time of application. Operating with an expired licence is treated as operating without a licence and can attract penalties, product seizure and closure.",
      "Modification is required whenever details on the licence change — such as adding new food products, changing the premises address within the same jurisdiction, changing ownership / directors, increasing production capacity or adding a new Kind of Business.",
    ],
    whoNeeds: [
      "FBOs whose licence or registration is nearing expiry",
      "Businesses adding new products or food categories",
      "Businesses changing address, constitution, directors or nominated person",
      "Manufacturers increasing capacity or adding machinery",
      "FBOs moving between Registration, State and Central categories",
    ],
    documents: [
      "Existing FSSAI licence / registration copy",
      "Self-declaration that there is no change (for renewal) or supporting documents for each change",
      "Updated layout, equipment list or product list (for modification)",
      "Board resolution / revised partnership deed (for constitution changes)",
      "Latest water analysis report (for manufacturers, where applicable)",
    ],
    process: [
      { title: "Licence health check", text: "We review your current licence, product list and filings for gaps." },
      { title: "Renewal / modification filing", text: "We file on FoSCoS well before expiry to avoid late fees." },
      { title: "Query resolution", text: "We handle deficiency letters and any inspection requirement." },
      { title: "Updated licence", text: "Renewed / modified licence downloaded and shared; calendar updated." },
    ],
    timeline: "Renewal: typically 15–30 days. Modification: 30–60 days depending on the change.",
    facts: [
      { label: "Renewal fee", value: "Same as the applicable licence / registration fee per year" },
      { label: "Late renewal", value: "Late fee of ₹100 per day of delay may apply (indicative)" },
      { label: "Modification", value: "Fee for one year of licence, where change requires it (indicative)" },
    ],
    pitfalls: [
      "Filing renewal after the expiry date, attracting daily late fees or requiring a fresh licence",
      "Selling products that are not endorsed on the licence",
      "Changing address to another state — this needs a fresh licence, not a modification",
    ],
    deliverables: ["Licence expiry tracking", "Renewal filing", "Modification filing", "Updated licence", "Compliance calendar"],
    faqs: [
      { q: "When should I apply for renewal?", a: "We recommend filing at least 30–60 days before the expiry date. Renewal filed after expiry can attract a late fee and, beyond the permitted window, a fresh application." },
      { q: "Can I add new products to my existing licence?", a: "Yes, through a modification application on FoSCoS. You should not manufacture or sell a new product until it is endorsed on your licence." },
    ],
    related: ["central-food-license", "state-food-license", "annual-return-submission"],
    keywords: ["FSSAI license renewal", "FSSAI modification", "food license renewal online", "add product FSSAI license"],
  },
  {
    slug: "annual-return-submission",
    number: "05",
    category: "licensing",
    icon: "ClipboardCheck",
    title: "Annual Return Submission",
    summary:
      "Mandatory annual return filing for all FSSAI license holders. We ensure accurate, on-time submission every year.",
    heroDescription:
      "Accurate, on-time FSSAI Annual Return (Form D1) filing for manufacturers, importers, labellers and packers — avoid ₹100/day late fees and licence actions.",
    overview: [
      "Under the FSS (Licensing & Registration of Food Businesses) Regulations, every licensed manufacturer, importer, labeller and packer must file an Annual Return in Form D1 for each financial year, declaring the quantity and value of each food category handled.",
      "The return for the previous financial year (April–March) is due by 31st May. Delayed filing attracts a late fee of ₹100 per day, and persistent non-filing can affect renewal of your licence.",
    ],
    whoNeeds: [
      "All FSSAI State and Central licence holders engaged in manufacturing",
      "Importers of food products",
      "Labellers, packers and repackers",
      "Milk and milk product manufacturers (additional half-yearly return, where applicable)",
    ],
    documents: [
      "FSSAI licence number and FoSCoS login",
      "Product-wise production / import quantity and value for the financial year",
      "Product-wise sales / despatch data",
      "Details of any changes during the year",
    ],
    process: [
      { title: "Data collection", text: "We share a simple template to capture product-wise quantities and values." },
      { title: "Reconciliation", text: "We reconcile data with your licence categories to avoid mismatches." },
      { title: "Form D1 filing", text: "Return filed on FoSCoS before the 31st May deadline." },
      { title: "Acknowledgement", text: "Filing acknowledgement shared and archived for audits and renewals." },
    ],
    timeline: "Filed within 2–3 working days of receiving data. Due date: 31st May every year.",
    facts: [
      { label: "Filing fee", value: "No government fee if filed on time" },
      { label: "Late filing", value: "₹100 per day of delay (indicative, as per FSSAI)" },
    ],
    pitfalls: [
      "Missing the 31st May deadline",
      "Reporting products that are not endorsed on the licence",
      "Quantities in wrong units (kg vs MT, litres vs KL)",
    ],
    deliverables: ["Data template", "Reconciliation", "Form D1 filing", "Acknowledgement & reminders"],
    faqs: [
      { q: "Is the annual return required if there was no production?", a: "Yes. A NIL return must be filed even when there was no manufacturing or import during the year." },
      { q: "Do restaurants need to file Form D1?", a: "Form D1 is primarily for manufacturers, importers, labellers and packers. Restaurants and caterers generally do not file D1, but must comply with other licence conditions." },
    ],
    related: ["central-food-license", "state-food-license", "license-modification-renewal"],
    keywords: ["FSSAI annual return", "Form D1 FSSAI", "FSSAI annual return due date", "FSSAI return filing"],
  },
  {
    slug: "product-coa-labeling-compliance",
    number: "06",
    category: "licensing",
    icon: "FlaskConical",
    title: "Product CoA & Labeling Compliance",
    summary:
      "Bi-annual Product Certificate of Analysis submission and full labeling compliance review as per FSSAI regulations.",
    heroDescription:
      "Six-monthly product testing through NABL / FSSAI-notified laboratories, Certificate of Analysis upload on FoSCoS, and a complete label review under the FSS (Labelling & Display) Regulations, 2020.",
    overview: [
      "As a condition of licence, food manufacturers must get their products tested at least once every six months from an FSSAI-notified, NABL-accredited laboratory, and maintain / submit the Certificate of Analysis (CoA). Results must meet the standards laid down in the FSS (Food Products Standards & Food Additives) Regulations and the contaminants and residue limits.",
      "We plan your annual testing schedule, coordinate sampling with accredited labs, review results against FSSAI standards and upload CoAs. Alongside, we audit every label so that your packaging is fully compliant before it goes to print.",
    ],
    whoNeeds: [
      "All licensed food manufacturers and repackers",
      "Brand owners using contract / third-party manufacturers",
      "Importers relabelling products for the Indian market",
      "E-commerce sellers listing packaged food",
    ],
    documents: ["FSSAI licence with product list", "Product specifications / recipes", "Label artwork (draft or final)", "Previous lab reports, if any"],
    process: [
      { title: "Testing plan", text: "Product-wise test parameters mapped to FSSAI standards (physical, chemical, microbiological, contaminants)." },
      { title: "Sampling & lab coordination", text: "Samples dispatched to NABL / FSSAI-notified labs with correct parameters." },
      { title: "Report review", text: "We interpret results and advise corrective action for any non-conformity." },
      { title: "CoA upload & label review", text: "CoA submitted on FoSCoS; labels reviewed and corrected before printing." },
    ],
    timeline: "Testing: 7–15 days depending on parameters. Label review: 2–4 working days per SKU.",
    pitfalls: [
      "Testing only a few parameters instead of the full FSSAI standard",
      "Using non-accredited laboratories",
      "Nutrition values on label not matching laboratory analysis",
      "Missing allergen or veg / non-veg declarations",
    ],
    deliverables: ["Annual testing calendar", "Lab coordination", "Result interpretation", "CoA upload", "Label compliance report"],
    faqs: [
      { q: "How often must products be tested?", a: "Manufacturers must test each product at least once every six months through an FSSAI-notified, NABL-accredited laboratory." },
      { q: "Can I use the CoA from my raw material supplier?", a: "Supplier CoAs are useful for raw-material control but do not replace finished-product testing of your own products." },
    ],
    related: ["label-compliance", "testing-solutions", "annual-return-submission"],
    keywords: ["FSSAI product testing", "certificate of analysis FSSAI", "NABL food testing", "FSSAI labelling compliance"],
  },
  {
    slug: "regulatory-compliance",
    number: "07",
    category: "compliance",
    icon: "Scale",
    title: "FSSAI Licensing & Regulatory Compliances",
    summary:
      "Complete regulatory compliance support — Schedule 4 hygiene, product approvals, import clearance, recalls and FSO inspections.",
    heroDescription:
      "Beyond the licence: we keep your business continuously compliant with the Food Safety & Standards Act, 2006 and all FSSAI regulations — so inspections, notices and audits never catch you off guard.",
    overview: [
      "Holding an FSSAI licence is only the beginning. The Food Safety & Standards Act, 2006 and its regulations place ongoing obligations on every food business — hygiene and sanitary practices (Schedule 4), product standards, contaminant limits, packaging, labelling, advertising claims, recall and traceability.",
      "We act as your outsourced regulatory affairs department: interpreting new FSSAI notifications, preparing for inspections, replying to improvement notices and helping you obtain product approvals for non-specified or novel foods.",
    ],
    whoNeeds: [
      "Manufacturers launching new products or formulations",
      "Importers needing FSSAI import clearance (FICS) at ports",
      "FBOs that received an improvement notice or adverse sample report",
      "Health supplement and nutraceutical companies",
      "Businesses wanting a monthly compliance retainer",
    ],
    documents: ["FSSAI licence", "Product formulations & specifications", "Existing SOPs and records", "Any notices received from authorities"],
    process: [
      { title: "Compliance gap audit", text: "We audit your premises and records against Schedule 4 and applicable standards." },
      { title: "Action plan", text: "A prioritised corrective action plan with SOPs, records and training needs." },
      { title: "Implementation", text: "We help implement documentation, traceability, recall and hygiene programmes." },
      { title: "Ongoing support", text: "Regulatory updates, inspection support, notice replies and authority liaison." },
    ],
    timeline: "Gap audit within 1 week; implementation 4–8 weeks; ongoing retainer as required.",
    pitfalls: [
      "Ignoring FSSAI notifications and amendments to standards",
      "No documented recall plan or traceability records",
      "Unapproved health claims on packaging or advertisements",
    ],
    deliverables: ["Gap audit report", "SOPs & record formats", "Recall & traceability plan", "Notice replies", "Regulatory update alerts"],
    faqs: [
      { q: "What is Schedule 4?", a: "Schedule 4 of the FSS (Licensing & Registration) Regulations lays down the general hygienic and sanitary practices every food business must follow — premises, personal hygiene, pest control, water, cleaning, storage and more." },
      { q: "Do you help with FSSAI improvement notices?", a: "Yes. We analyse the notice, implement corrective actions and draft a technically sound reply within the stipulated time." },
    ],
    related: ["third-party-auditing", "management-system-implementation", "central-food-license"],
    keywords: ["FSSAI compliance consultant", "food regulatory consultant India", "Schedule 4 FSSAI", "FSSAI import clearance"],
  },
  {
    slug: "fostac-training",
    number: "08",
    category: "compliance",
    icon: "GraduationCap",
    title: "FoSTaC Training",
    summary:
      "FSSAI-mandated Food Safety Training & Certification for supervisors and food handlers — Basic, Advanced and Special courses.",
    heroDescription:
      "FSSAI's Food Safety Training & Certification (FoSTaC) programme for your Food Safety Supervisors and food handlers — on-site or at our training centre, by experienced FoSTaC trainers.",
    overview: [
      "FSSAI requires every licensed and registered food business to have at least one trained and certified Food Safety Supervisor (FSS) for every 25 food handlers, or part thereof, on each premises. FoSTaC is the official FSSAI training programme that delivers this certification.",
      "Our founder has trained 250+ food handlers under FoSTaC and supported FSSAI's Eat Right India initiative. We deliver engaging, practical sessions in English, Hindi and Marathi with real-life case studies from kitchens and factories.",
    ],
    whoNeeds: [
      "Every FSSAI licensed / registered food business (1 FSS per 25 food handlers)",
      "Restaurants, hotels, caterers, canteens and cloud kitchens",
      "Manufacturing and processing units",
      "Retail, distribution, storage and transport businesses",
      "Street food vendors (Basic level)",
    ],
    documents: ["List of participants with ID proof", "FSSAI licence / registration number", "Preferred course level and sector"],
    process: [
      { title: "Course selection", text: "We match the right course — Basic, Advanced or Special — to your business type." },
      { title: "Batch scheduling", text: "On-site or classroom batches scheduled at your convenience." },
      { title: "Training & assessment", text: "Interactive training followed by FSSAI assessment." },
      { title: "Certification", text: "FoSTaC certificates issued through the FSSAI portal." },
    ],
    timeline: "Basic: ~4 hours, Advanced: ~8–12 hours, Special: ~12 hours. Certificates typically within 2–3 weeks.",
    factsTitle: "Course levels",
    facts: [
      { label: "Basic level", value: "Catering, Manufacturing, Retail & Distribution, Street Food" },
      { label: "Advanced level", value: "Catering, Manufacturing, Retail & Distribution" },
      { label: "Special level", value: "Milk & milk products, meat & poultry, fish, edible oil, bakery, packaged water, health supplements & more" },
    ],
    pitfalls: [
      "No trained FSS on each shift or premises",
      "Certificates not renewed / refreshed periodically",
      "Training not cascaded to all food handlers",
    ],
    deliverables: ["Training needs assessment", "FoSTaC training", "Assessment", "FSSAI certificates", "In-house handler training"],
    faqs: [
      { q: "Is FoSTaC training mandatory?", a: "Yes. As per FSSAI, every licensed or registered food business must have at least one trained and certified Food Safety Supervisor for every 25 food handlers on each premises." },
      { q: "Can training be conducted at our premises?", a: "Yes. We conduct on-site batches for groups, which is often the most practical option for restaurants and factories." },
    ],
    related: ["third-party-auditing", "regulatory-compliance", "management-system-implementation"],
    keywords: ["FoSTaC training", "food safety supervisor training", "FoSTaC certificate", "food handler training Thane Mumbai"],
  },
  {
    slug: "management-system-implementation",
    number: "09",
    category: "compliance",
    icon: "Settings",
    title: "Management System Implementation",
    summary:
      "FSSC 22000, ISO 22000, BRCGS, HACCP, ISO 9001 and USDA NOP Organic — from gap analysis to successful certification.",
    heroDescription:
      "Certification-ready food safety and quality management systems — FSSC 22000, ISO 22000, BRCGS, HACCP, ISO 9001 QMS and USDA NOP Organic — designed around your process, not a template.",
    overview: [
      "Global retailers, exporters and large B2B buyers expect GFSI-benchmarked certifications such as FSSC 22000 and BRCGS. A well-designed management system also reduces recalls, wastage and customer complaints.",
      "With 500+ audit man-days of experience, our consultants know exactly what certification body auditors look for. We implement practical, risk-based systems and stay with you through the certification audit.",
    ],
    whoNeeds: [
      "Exporters supplying to the EU, US, Middle East and global retailers",
      "Manufacturers supplying to QSR chains, FMCG brands and modern trade",
      "Organic producers targeting the US market (USDA NOP)",
      "Businesses wanting structured quality and food safety systems",
    ],
    documents: ["Process flow diagrams", "Existing SOPs and records", "Product specifications", "Organisation chart"],
    process: [
      { title: "Gap analysis", text: "On-site assessment against the chosen standard with a detailed gap report." },
      { title: "System design & documentation", text: "HACCP plan, PRPs, OPRPs, food defence, food fraud, allergen management, manuals and SOPs." },
      { title: "Training & implementation", text: "Team training, internal auditor training and record implementation." },
      { title: "Internal audit & MRM", text: "Internal audit and management review to verify readiness." },
      { title: "Certification audit support", text: "Support during Stage 1 and Stage 2 audits and closure of non-conformities." },
    ],
    timeline: "Typically 3–6 months depending on the standard and site readiness.",
    factsTitle: "Standards we implement",
    facts: [
      { label: "FSSC 22000 / ISO 22000", value: "GFSI-recognised food safety management system" },
      { label: "BRCGS Food Safety", value: "Preferred by UK / EU retailers" },
      { label: "HACCP", value: "Codex-based hazard analysis & critical control points" },
      { label: "ISO 9001 QMS", value: "Quality management system" },
      { label: "USDA NOP Organic", value: "Organic certification for the US market" },
    ],
    pitfalls: [
      "Copy-paste documentation that does not reflect actual operations",
      "Weak hazard analysis and CCP validation",
      "No verification or trend analysis of records",
    ],
    deliverables: ["Gap analysis report", "Complete documentation", "HACCP / FSMS plan", "Training", "Internal audit", "Certification audit support"],
    faqs: [
      { q: "What is the difference between ISO 22000 and FSSC 22000?", a: "FSSC 22000 combines ISO 22000 with sector-specific prerequisite programmes (ISO/TS 22002 series) and additional requirements. It is GFSI-benchmarked, while ISO 22000 alone is not." },
      { q: "Do you issue the certificate?", a: "No. As consultants we implement the system and prepare you for audit. Certificates are issued by independent accredited certification bodies, which keeps the process impartial." },
    ],
    related: ["third-party-auditing", "testing-solutions", "fostac-training"],
    keywords: ["FSSC 22000 consultant", "ISO 22000 consultant India", "BRCGS consultant", "HACCP certification consultant", "USDA organic consultant"],
  },
  {
    slug: "third-party-auditing",
    number: "10",
    category: "compliance",
    icon: "SearchCheck",
    title: "3rd Party Auditing",
    summary:
      "Independent hygiene, supplier, gap and mock audits, FSSAI Hygiene Rating and Eat Right readiness by experienced auditors.",
    heroDescription:
      "Independent, unbiased food safety audits — FSSAI Hygiene Rating readiness, Eat Right Campus / Station, supplier audits, Schedule 4 audits and mock certification audits.",
    overview: [
      "Under the FSS (Food Safety Auditing) Regulations, 2018, FSSAI recognises third-party audits to verify compliance of food businesses. Brands, aggregators and retailers also rely on independent audits to evaluate kitchens and suppliers.",
      "Our auditors bring certification-body experience and 500+ audit man-days. Every audit ends with a clear, scored report, photographs, root-cause analysis and a corrective action plan.",
    ],
    whoNeeds: [
      "Restaurants and caterers seeking FSSAI Hygiene Rating (1 to 5 smileys)",
      "Campuses, hospitals, railway stations and places of worship under Eat Right India",
      "Brands auditing co-manufacturers and raw material suppliers",
      "Aggregators and QSR chains auditing kitchen partners",
      "Manufacturers preparing for FSSC 22000 / BRCGS certification audits",
    ],
    documents: ["FSSAI licence", "Existing records and SOPs", "Audit scope / checklist (if client-specific)"],
    process: [
      { title: "Scope & checklist", text: "Agree the audit standard — FSSAI Schedule 4, Hygiene Rating, client checklist or GFSI standard." },
      { title: "On-site audit", text: "Facility walk-through, document review, staff interviews and evidence collection." },
      { title: "Report", text: "Scored report with photographs, non-conformities and risk ranking within 3 working days." },
      { title: "CAPA follow-up", text: "Corrective and preventive action verification and closure." },
    ],
    timeline: "Audit: 1–2 days per site. Report: within 3 working days.",
    pitfalls: [
      "Treating audits as a one-time event instead of continuous improvement",
      "Closing non-conformities without root-cause analysis",
    ],
    deliverables: ["Audit checklist", "On-site audit", "Scored report with photos", "CAPA plan", "Follow-up verification"],
    faqs: [
      { q: "What is the FSSAI Hygiene Rating?", a: "It is an FSSAI scheme for food service establishments that rates hygiene on a scale of 1 to 5 based on an audit by an FSSAI-empanelled agency. A high rating builds customer trust and is displayed on delivery platforms." },
      { q: "Can you audit our suppliers across India?", a: "Yes. We conduct supplier audits pan-India against your specifications or a recognised standard." },
    ],
    related: ["management-system-implementation", "fostac-training", "regulatory-compliance"],
    keywords: ["food safety audit", "third party food audit India", "FSSAI hygiene rating", "supplier audit food", "Eat Right campus audit"],
  },
  {
    slug: "testing-solutions",
    number: "11",
    category: "compliance",
    icon: "TestTubes",
    title: "Testing Solutions",
    summary:
      "Food, water, shelf-life, nutritional, microbiological and contaminant testing through NABL-accredited partner laboratories.",
    heroDescription:
      "One-stop food testing coordination — finished products, raw materials, water, swabs, shelf life and nutritional analysis through NABL-accredited and FSSAI-notified laboratories.",
    overview: [
      "Testing is the backbone of food safety verification. FSSAI standards specify limits for microbiological contamination, heavy metals, pesticide residues, mycotoxins, antibiotics and additives — and your labels must reflect accurate nutritional values.",
      "We design a risk-based testing plan, coordinate sampling with NABL-accredited partner laboratories and translate lab reports into clear actions for your team.",
    ],
    whoNeeds: [
      "Manufacturers requiring six-monthly product testing",
      "Brands creating nutrition panels for new labels",
      "Businesses validating shelf life of new products",
      "Kitchens verifying water quality and surface hygiene",
    ],
    documents: ["Product list and specifications", "Intended shelf life and storage conditions", "Previous test reports"],
    process: [
      { title: "Testing plan", text: "Parameters selected as per FSSAI standards and product risk." },
      { title: "Sampling", text: "Correct sampling, packing and dispatch to the laboratory." },
      { title: "Analysis", text: "Testing at NABL-accredited / FSSAI-notified laboratories." },
      { title: "Interpretation", text: "Report review with compliance verdict and recommendations." },
    ],
    timeline: "Most parameters: 5–15 working days. Shelf-life studies run for the intended shelf life.",
    factsTitle: "Tests we coordinate",
    facts: [
      { label: "Microbiological", value: "TPC, yeast & mould, coliforms, E. coli, Salmonella, Listeria, S. aureus" },
      { label: "Chemical & contaminants", value: "Heavy metals, pesticide residues, aflatoxins, preservatives, colours" },
      { label: "Nutritional", value: "Energy, protein, carbohydrates, sugars, fat, saturated & trans fat, sodium" },
      { label: "Water", value: "Potable water as per IS 10500" },
    ],
    pitfalls: ["Testing too few parameters", "Using non-accredited labs", "Not validating shelf-life claims"],
    deliverables: ["Testing plan", "Lab coordination", "Reports", "Compliance interpretation"],
    faqs: [
      { q: "Which labs do you work with?", a: "We coordinate with NABL-accredited and FSSAI-notified laboratories, choosing the best lab for each parameter and location." },
      { q: "Can you help determine the shelf life of my product?", a: "Yes. We design real-time or accelerated shelf-life studies and help you set a defensible best-before date." },
    ],
    related: ["product-coa-labeling-compliance", "label-compliance", "management-system-implementation"],
    keywords: ["food testing lab India", "NABL food testing", "shelf life testing", "nutritional analysis food label"],
  },
  {
    slug: "label-compliance",
    number: "12",
    category: "compliance",
    icon: "Tag",
    title: "Label Compliances",
    summary:
      "Label design review as per FSS (Labelling & Display) Regulations 2020, Legal Metrology and FSS Advertising & Claims rules.",
    heroDescription:
      "Get your packaging right before it goes to print. A line-by-line label review against the FSS (Labelling & Display) Regulations, 2020, Legal Metrology (Packaged Commodities) Rules and FSS (Advertising & Claims) Regulations, 2018.",
    overview: [
      "Labelling errors are among the most common reasons for FSSAI notices, product recalls and marketplace delistings. A reprint can cost lakhs — a review costs a fraction.",
      "We check every mandatory declaration, the size and placement of logos, nutrition tables, allergen statements and claims, and give you a marked-up artwork with corrections.",
    ],
    whoNeeds: ["New brands launching packaged food", "Existing brands updating packaging", "Importers creating India-specific stickers", "E-commerce sellers"],
    documents: ["Label artwork (PDF / AI)", "Recipe / ingredient list with percentages", "Nutritional analysis report", "FSSAI licence number"],
    process: [
      { title: "Artwork review", text: "Each mandatory element checked against the 2020 regulations." },
      { title: "Claims review", text: "Health, nutrition and marketing claims checked against the Advertising & Claims Regulations." },
      { title: "Marked-up report", text: "Corrections marked directly on the artwork with references." },
      { title: "Final sign-off", text: "Re-review of corrected artwork before printing." },
    ],
    timeline: "2–4 working days per SKU.",
    factsTitle: "What we check",
    facts: [
      { label: "Mandatory declarations", value: "Name of food, ingredients in descending order, nutrition, veg / non-veg logo, additives with INS numbers" },
      { label: "Also checked", value: "Allergens, manufacturer / packer details, FSSAI logo & licence no., net quantity, batch, date marking, storage & usage instructions" },
    ],
    pitfalls: [
      "Nutrition panel missing added sugar or trans-fat values",
      "Wrong veg / non-veg symbol size or colour",
      "Unsubstantiated claims like 'natural', 'fresh' or 'immunity booster'",
      "FSSAI logo or licence number missing or illegible",
    ],
    deliverables: ["Label compliance checklist", "Marked-up artwork", "Claims assessment", "Final sign-off"],
    faqs: [
      { q: "Can I use the word 'natural' on my label?", a: "Only if the product meets the conditions defined in the FSS (Advertising & Claims) Regulations, 2018. Misuse of such terms is a common reason for notices." },
      { q: "Do you design labels?", a: "We review and correct artwork for compliance and can work alongside your designer to finalise a compliant layout." },
    ],
    related: ["product-coa-labeling-compliance", "testing-solutions", "production-packaging-solutions"],
    keywords: ["FSSAI labelling regulations 2020", "food label compliance", "food label review India", "nutrition label FSSAI"],
  },
  {
    slug: "production-packaging-solutions",
    number: "13",
    category: "compliance",
    icon: "PackageCheck",
    title: "Production & Packaging Solutions",
    summary:
      "Hygienic plant layout, process validation, food-grade packaging compliance and new product development support.",
    heroDescription:
      "Build it right from day one — hygienic factory layouts, process design and validation, food-contact packaging compliance and new product development support.",
    overview: [
      "Most food safety problems are designed in. A poor layout with crossing raw and cooked flows, inadequate drainage or wrong materials creates contamination risks that are expensive to fix later.",
      "We support new and expanding food units with hygienic design, process validation and packaging compliance under the FSS (Packaging) Regulations, 2018 — so your plant passes FSSAI inspection and certification audits first time.",
    ],
    whoNeeds: ["New food manufacturing units and cloud kitchens", "Units expanding capacity", "Brands developing new products", "Businesses selecting packaging materials"],
    documents: ["Proposed layout / site plan", "Product list and process flow", "Packaging material specifications"],
    process: [
      { title: "Concept review", text: "Product, process and capacity requirements understood." },
      { title: "Hygienic layout", text: "Zoning, unidirectional flow, personnel and material movement, drainage and utilities." },
      { title: "Process & packaging", text: "Process validation, food-contact material compliance and migration testing guidance." },
      { title: "Commissioning support", text: "Pre-production audit and readiness for licence inspection." },
    ],
    timeline: "Layout design: 1–2 weeks. Full project support: as per project timeline.",
    pitfalls: [
      "Raw and finished product flows crossing",
      "Non food-grade packaging or recycled plastic in direct food contact",
      "Inadequate hand-wash, changing room and pest-proofing provisions",
    ],
    deliverables: ["Hygienic layout", "Process flow & validation", "Packaging compliance review", "Pre-production audit"],
    faqs: [
      { q: "What do the FSS Packaging Regulations cover?", a: "They specify general and specific requirements for food-contact packaging materials, including conformity to Indian Standards and restrictions such as not using newspaper or recycled plastic for direct food contact." },
      { q: "Can you help us before we build the factory?", a: "Yes — that is the best time. Getting the layout right before construction saves significant cost and helps with licensing and certification later." },
    ],
    related: ["management-system-implementation", "label-compliance", "central-food-license"],
    keywords: ["food factory layout design", "food packaging regulations India", "food plant hygienic design", "new food product development consultant"],
  },
];

export const licensingServices = services.filter((s) => s.category === "licensing");
export const complianceServices = services.filter((s) => s.category === "compliance");

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Short labels used for the 7 pillar icons on the brand banner slide */
export const pillars: { label: string; slug: string; icon: IconName; color: string }[] = [
  { label: "FSSAI Licensing & Regulatory Compliances", slug: "regulatory-compliance", icon: "FileCheck2", color: "bg-leaf-600" },
  { label: "FoSTaC Training", slug: "fostac-training", icon: "GraduationCap", color: "bg-crimson-600" },
  { label: "Management System Implementation", slug: "management-system-implementation", icon: "Settings", color: "bg-brand-500" },
  { label: "3rd Party Auditing", slug: "third-party-auditing", icon: "SearchCheck", color: "bg-navy-600" },
  { label: "Testing Solutions", slug: "testing-solutions", icon: "TestTubes", color: "bg-purple-600" },
  { label: "Label Compliances", slug: "label-compliance", icon: "Tag", color: "bg-cyan-600" },
  { label: "Production & Packaging Solutions", slug: "production-packaging-solutions", icon: "PackageCheck", color: "bg-leaf-700" },
];
