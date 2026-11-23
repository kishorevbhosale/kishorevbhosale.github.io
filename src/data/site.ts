export const siteConfig = {
  name: "Aaradhya",
  legalName: "Aaradhya Management System Consultancy Services",
  shortDescriptor: "Management System Consultancy Services",
  tagline: "Your FSSAI Compliance Partner — Pan India",
  description:
    "Aaradhya Management System Consultancy Services is India's trusted FSSAI food licensing, food safety audit and regulatory compliance consultancy. Central & State FSSAI licence, registration, renewal, annual returns, labelling, FoSTaC training, FSSC 22000, ISO 22000, BRCGS and HACCP implementation across all 28 states and 8 union territories.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.aaradhyaconsultancy.com").replace(/\/$/, ""),
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "info@aaradhyaconsultancy.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  address: {
    line1: "Haware city, Ghodbunder road,",
    line2: "Kasarwadavali, Thane 400615",
    street: "Haware City, Ghodbunder Road, Kasarwadavali",
    locality: "Thane",
    region: "Maharashtra",
    postalCode: "400615",
    country: "IN",
  },
  geo: { lat: 19.2716, lng: 72.9706 },
  mapEmbed:
    "https://www.google.com/maps?q=Haware+City,+Ghodbunder+Road,+Kasarwadavali,+Thane+400615&output=embed",
  hours: "Mon – Sat, 10:00 AM – 7:00 PM",
  foundedYearsExperience: 18,
};

export const whatsappLink = (message = "Hello Aaradhya, I would like a free FSSAI compliance consultation.") =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "License Finder", href: "/fssai-license-finder" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const heroChips = ["FSSAI Registered", "Pan-India Operations", "18+ Years Experience", "500+ Licenses Obtained"];

export const stats = [
  { value: 18, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Licenses Obtained" },
  { value: 200, suffix: "+", label: "Food Businesses Served" },
  { value: 250, suffix: "+", label: "Food Handlers Trained (FoSTaC)" },
  { value: 500, suffix: "+", label: "Audit Man-days" },
  { value: 36, suffix: "", label: "States & UTs Covered" },
];

export const whyChooseUs = [
  {
    title: "Pan-India Reach",
    text: "Licensed to operate and assist clients across all 28 states and 8 union territories of India.",
  },
  {
    title: "End-to-End Support",
    text: "From document preparation to license issuance — we manage the entire process so you can focus on your business.",
  },
  {
    title: "Expert Team",
    text: "Our consultants are specialists in FSSAI regulations, food safety standards, and compliance requirements.",
  },
  {
    title: "Fast Turnaround",
    text: "Streamlined processes and direct government liaisons ensure the fastest possible license processing times.",
  },
];

export const founder = {
  role: "Founder & Principal Consultant",
  title: "Food Safety & Quality Professional",
  summary:
    "Nearly two decades of cross-functional experience in Food Safety, Regulatory Affairs and Operational Excellence.",
  expertise: ["FSSC 22000", "BRCGS", "USDA NOP Organic", "QMS", "FSMS"],
  auditManDays: "500+ audit man-days",
  impact:
    "Trained 250+ food handlers under the FoSTaC programme and supported FSSAI's Eat Right India initiative to promote food hygiene and safety awareness.",
  whyPartner: [
    "Integrated food safety and regulatory perspective",
    "Risk-based thinking and practical compliance support",
    "Focus on audit readiness and sustainable systems",
    "Business-oriented solutions that support operational excellence",
  ],
  purpose:
    "Transform food safety from a regulatory obligation into a culture of responsibility, consumer protection and business excellence.",
  roles: ["Food Safety & Regulatory Expert", "Auditor", "Trainer", "Consultant"],
};

export const processSteps = [
  {
    title: "Free Consultation",
    text: "We understand your food business, turnover, capacity and locations, and identify exactly which FSSAI licence or certification applies.",
  },
  {
    title: "Document Checklist",
    text: "You receive a tailored checklist. We draft Form A / Form B, the FSMS plan, layout, declarations and other annexures for you.",
  },
  {
    title: "Application Filing",
    text: "We file the application on FoSCoS with the correct product categories, KoB and fee, avoiding common rejection points.",
  },
  {
    title: "Inspection & Queries",
    text: "We prepare your premises for inspection, respond to Food Safety Officer queries and close any non-conformities quickly.",
  },
  {
    title: "License & Ongoing Compliance",
    text: "Licence issued. We then track renewals, annual returns, product testing and audits so you stay compliant year-round.",
  },
];

export const industries = [
  { name: "Food Manufacturers & Processors", icon: "Factory" },
  { name: "Restaurants, Cafés & Cloud Kitchens", icon: "UtensilsCrossed" },
  { name: "Importers & Exporters", icon: "Ship" },
  { name: "Dairy & Milk Products", icon: "Milk" },
  { name: "Bakery & Confectionery", icon: "Croissant" },
  { name: "E-commerce Food Sellers", icon: "ShoppingCart" },
  { name: "Caterers & Institutional Canteens", icon: "ChefHat" },
  { name: "Cold Storage, Warehousing & Transport", icon: "Warehouse" },
  { name: "Retailers, Distributors & Supermarkets", icon: "Store" },
  { name: "Packaged Drinking Water & Beverages", icon: "GlassWater" },
  { name: "Health Supplements & Nutraceuticals", icon: "Pill" },
  { name: "Organic Food Producers", icon: "Sprout" },
];

export const certifications = ["FSSC 22000", "ISO 22000", "BRCGS", "HACCP", "USDA NOP Organic", "ISO 9001", "GMP / GHP"];
