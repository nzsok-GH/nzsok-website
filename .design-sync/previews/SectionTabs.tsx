import { SectionTabs } from "nzsok-website";

// Sticky in-page tab bar with scroll-spy. Each tab anchors to a section id on
// the page; here we show a representative About-page tab set.
const tabs = [
  { id: "intro", label: "학교 소개" },
  { id: "song", label: "교가" },
  { id: "board", label: "이사회 · 교직원" },
  { id: "campus", label: "캠퍼스" },
];

export const Default = () => <SectionTabs tabs={tabs} />;
