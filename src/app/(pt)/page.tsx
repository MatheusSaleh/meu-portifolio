import { Portfolio } from "@/components/portfolio";
import { getContent } from "@/content";

export default async function Home() {
  return <Portfolio content={await getContent("pt")} />;
}
