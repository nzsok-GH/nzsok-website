// design-sync bundle entry — explicit named re-exports so default-exported
// components land on window.NZSOK.* (synth-entry `export *` drops defaults).
export { default as CampusSection } from "../src/components/CampusSection.tsx";
export { default as ClassDojoSection } from "../src/components/ClassDojoSection.tsx";
export { AboutIntroSong, AboutBoardStaffCampus } from "../src/components/AboutSections.tsx";
export { default as EducationSections } from "../src/components/EducationSections.tsx";
export { default as HeroSection } from "../src/components/HeroSection.tsx";
export { default as Navigation } from "../src/components/Navigation.tsx";
export { default as EnrolContent } from "../src/components/EnrolContent.tsx";
export { default as SectionTabs } from "../src/components/SectionTabs.tsx";
export { default as HistorySection } from "../src/components/HistorySection.tsx";
// LoadingScreen excluded: it's a one-shot intro overlay that self-hides
// (display:none after 1.35s), so its static preview card is always blank.
