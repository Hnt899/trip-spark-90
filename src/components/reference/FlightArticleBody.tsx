import { Plane } from "lucide-react";
import flightsData from "@/data/flights-content.json";
import { ReferenceArticleBody } from "@/components/reference/ReferenceArticleBody";

type FlightsJson = typeof flightsData;

export function FlightArticleBody({ slug }: { slug: string }) {
  return (
    <ReferenceArticleBody slug={slug} dataset={flightsData as FlightsJson} heroIcon={Plane} />
  );
}
