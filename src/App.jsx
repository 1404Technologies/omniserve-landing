import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import WhyChooseUs from "./components/WhyChooseUs";
import CaseStudies from "./components/CaseStudies";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import {
  nav,
  hero,
  stats,
  features,
  services,
  pricing,
  discounts,
  pricingIncludes,
  certifications,
  testimonials,
  caseStudies,
  whyChoose,
  contact,
} from "./data/content";

export default function App() {
  return (
    <>
      <Navbar links={nav.links} />
      <main>
        <Hero {...hero} />
        <Stats items={stats} />
        <Features items={features} />
        <Services items={services} />
        <Pricing rows={pricing} discounts={discounts} includes={pricingIncludes} />
        <WhyChooseUs items={whyChoose} />
        <CaseStudies items={caseStudies} />
        <Testimonials items={testimonials} certifications={certifications} />
        <Contact website={contact.website} email={contact.email} phones={contact.phones} offices={contact.offices} />
      </main>
      <Footer />
    </>
  );
}
