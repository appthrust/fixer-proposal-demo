import {
  aboutSection,
  backgroundSection,
  companySection,
  connectionSection,
  demoSection,
  nextSection,
  partnershipSection,
  questionsSection,
  rolesSection,
  ui,
} from "./content";
import { ArchitectureDiagram } from "./components/ArchitectureDiagram";
import { Background } from "./components/Background";
import { BuiltinApps } from "./components/BuiltinApps";
import { ChatPanel } from "./components/ChatPanel";
import { Company } from "./components/Company";
import { Connection } from "./components/Connection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { NextSteps } from "./components/NextSteps";
import { Partnership } from "./components/Partnership";
import { PocPlan } from "./components/PocPlan";
import { Questions } from "./components/Questions";
import { Roles } from "./components/Roles";
import { Section } from "./components/Section";
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
        <Section heading={backgroundSection}>
          <Background />
        </Section>
        <Section heading={aboutSection} tone="muted">
          <ArchitectureDiagram />
          <ValueProps />
          <BuiltinApps />
        </Section>
        <Section heading={connectionSection}>
          <Connection />
        </Section>
        <Section heading={demoSection} tone="muted">
          <ChatPanel />
        </Section>
        <Section heading={partnershipSection}>
          <Partnership />
        </Section>
        <Section heading={rolesSection} tone="muted">
          <Roles />
        </Section>
        <Section heading={questionsSection}>
          <Questions />
        </Section>
        <Section heading={nextSection} tone="muted">
          <PocPlan />
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
