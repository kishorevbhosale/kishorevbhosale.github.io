export type Testimonial = { name: string; role: string; city: string; quote: string; rating: number };

/** Sample testimonials: replace with verified client feedback before going live. */
export const testimonials: Testimonial[] = [
  {
    name: "Rohit S.",
    role: "Director, Spices Manufacturing Unit",
    city: "Navi Mumbai",
    quote:
      "Our Central Licence application had been rejected twice before we approached Aaradhya. They corrected our product categories, rebuilt our FSMS plan and the licence was granted within weeks.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Founder, Cloud Kitchen Brand",
    city: "Pune",
    quote:
      "From State Licence to FoSTaC training for our staff, everything was handled smoothly. Their hygiene audit also helped us get a better Hygiene Rating on delivery apps.",
    rating: 5,
  },
  {
    name: "Anil K.",
    role: "Food Importer",
    city: "Ahmedabad",
    quote:
      "Very knowledgeable on import clearance and labelling. Their label review saved us from a costly sticker re-print at the port.",
    rating: 5,
  },
  {
    name: "Sneha D.",
    role: "QA Head, Dairy Processor",
    city: "Nashik",
    quote:
      "They implemented FSSC 22000 in a practical way that our team actually follows. We cleared the certification audit with zero major non-conformities.",
    rating: 5,
  },
  {
    name: "Imran H.",
    role: "Owner, Bakery Chain",
    city: "Thane",
    quote:
      "Renewals, annual returns, product testing — I no longer track any of it. Aaradhya sends reminders and takes care of everything on time.",
    rating: 5,
  },
  {
    name: "Kavita R.",
    role: "Co-founder, Health Snacks Start-up",
    city: "Bengaluru",
    quote:
      "Their team guided us on nutrition labelling and claims before our launch. Clear advice, fast responses and very fair pricing.",
    rating: 5,
  },
];
