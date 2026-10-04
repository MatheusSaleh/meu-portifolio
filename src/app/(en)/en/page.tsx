import { Portfolio } from "@/components/portfolio";
import { getContent } from "@/content";

export default async function EnglishHome() {
  return <Portfolio content={await getContent("en")} />;
}
