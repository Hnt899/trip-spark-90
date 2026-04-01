import { Bus } from "lucide-react";
import busesData from "@/data/buses-content.json";
import { ReferenceArticleBody } from "@/components/reference/ReferenceArticleBody";

type BusesJson = typeof busesData;

export function BusArticleBody({ slug }: { slug: string }) {
  return <ReferenceArticleBody slug={slug} dataset={busesData as BusesJson} heroIcon={Bus} />;
}
