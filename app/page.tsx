import {
  aboutSection,
  column,
  companySection,
  currentSection,
  divisionSection,
  extendedUseCases,
  featuresSection,
  mappingSection,
  nextSection,
  packagesSection,
  pocSection,
  pricingSection,
  ui,
  useCasesSection,
} from "./content";
import { ArchitectureDiagram } from "./components/ArchitectureDiagram";
import { Challenges } from "./components/Challenges";
import { Company } from "./components/Company";
import { Column } from "./components/Column";
import { Comparison } from "./components/Comparison";
import { Division } from "./components/Division";
import { ExtendedUseCases } from "./components/ExtendedUseCases";
import { FactCards } from "./components/FactCards";
import { FeatureStatus } from "./components/FeatureStatus";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Mapping } from "./components/Mapping";
import { Nav } from "./components/Nav";
import { NextSteps } from "./components/NextSteps";
import { Packages } from "./components/Packages";
import { PocTimeline } from "./components/PocTimeline";
import { Pricing } from "./components/Pricing";
import { Section } from "./components/Section";
import { UseCases } from "./components/UseCases";
import { ValueProps } from "./components/ValueProps";

export default function Home() {
  return (
    <>
      <a
        href="#content"
        className="sr-only z-50 rounded-md bg-blue-700 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {ui.skipLink}
      </a>
      <Nav />
      <Hero />
      <main id="content">
        <Section heading={currentSection}>
          <FactCards />
          <Challenges />
        </Section>
        <Section heading={divisionSection} tone="muted">
          <Division />
        </Section>
        <Section heading={useCasesSection}>
          <UseCases />
          <Comparison />
        </Section>
        <Section heading={extendedUseCases.heading} tone="muted">
          <ExtendedUseCases />
        </Section>
        <Section heading={column.heading}>
          <Column />
        </Section>
        <Section heading={mappingSection} tone="muted">
          <Mapping />
        </Section>
        <Section heading={aboutSection}>
          <ArchitectureDiagram />
          <ValueProps />
        </Section>
        <Section heading={featuresSection} tone="muted">
          <FeatureStatus />
        </Section>
        <Section heading={packagesSection}>
          <Packages />
        </Section>
        <Section heading={pocSection} tone="muted">
          <PocTimeline />
        </Section>
        <Section heading={pricingSection}>
          <Pricing />
        </Section>
        <Section heading={nextSection} tone="muted">
          <NextSteps />
        </Section>
        <Section heading={companySection}>
          <Company />
        </Section>
      </main>
      <Footer />
    </>
  );
}
