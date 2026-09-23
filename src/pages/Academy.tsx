import { useState } from "react";
import {
  ArrowLeft, Check, Download, FileText, Play, GraduationCap,
  ListChecks, ExternalLink, MonitorPlay,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type AcademyDownload = {
  label: string;
  file?: string;              // /docs/<file>-en.pdf / -es.pdf
  external?: string;          // opens in a new tab
  size?: string;
  langs?: ("en" | "es")[];
};

type AcademyModule = {
  id: number;
  title: string;
  track: string;
  duration: string;
  videoReady?: boolean;
  summary: string;
  topics: string[];
  downloads: AcademyDownload[];
};

const modules: AcademyModule[] = [
  {
    id: 1,
    title: "Discover GO",
    track: "Company Awareness",
    duration: "3–6 min",
    summary:
      "Get to know GO Galapagos by KleinTours: who we are, our mission and 38+ years of trajectory, our commitment to responsible tourism, and a complete tour of our portfolio — Legend & Coral fleet, GO as a DMC, GO Packages, GO Bespoke and GO Quito Hotel.",
    topics: [
      "Who we are — history, milestones, mission and 38+ years of experience",
      "Our commitment to sustainability — responsible tourism and recognitions",
      "Our portfolio at a glance: fleet, DMC, Packages, Bespoke and GO Quito Hotel",
    ],
    downloads: [
      { label: "GO Galapagos Corporate Brochure", external: "https://heyzine.com/flip-book/0d465b8317.html", size: "Flip book" },
      { label: "GO Portfolio Overview", file: "go-portfolio", size: "1.8 MB", langs: ["en", "es"] },
    ],
  },
  {
    id: 2,
    title: "Why Galápagos & Ecuador",
    track: "Market & Destination Awareness",
    duration: "3–6 min",
    summary:
      "Learn how to inspire your clients: the Galápagos experience as a natural laboratory and World Heritage site, Ecuador as a country of 4 combinable worlds, and the arguments that make GO stand out from the competition.",
    topics: [
      "The Galápagos experience — unique biodiversity, natural laboratory, World Heritage",
      "Ecuador, a country of 4 worlds — Amazon, Andes, Pacific Coast & Galápagos",
      "Why GO — trajectory, fleet, guide team, safety and high-content experiences",
    ],
    downloads: [
      { label: "Mainland Tours Brochure", file: "land-brochure", size: "3.2 MB", langs: ["en", "es"] },
ecutor]  },
];

const money = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

export default Academy;
