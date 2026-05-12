import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ui/ScrollProgress";

import {
  nav,
  hero,
  stats,
  features,
  industries,
  pricing,
  discounts,
  pricingIncludes,
  certifications,
  caseStudies,
  contact,
} from "./data/content";

export default function App() {
  return (
    <>
      <Navbar links={nav.links} />
      <main>
        <Hero {...hero} certifications={certifications} />
        <Stats items={stats} />
        <Features items={features} />
        <Services items={industries} />
        <CaseStudies items={caseStudies} />
        <Pricing rows={pricing} discounts={discounts} includes={pricingIncludes} />
        <Contact website={contact.website} email={contact.email} offices={contact.offices} />
      </main>
      <Footer />
      <ScrollProgress />
    </>
  );
}
