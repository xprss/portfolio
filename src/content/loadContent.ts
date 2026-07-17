import rawContent from "./site-content.json";
import { SiteContent, type RawSiteContent } from "../models/portfolio";

export function getSiteContent() {
  return SiteContent.fromRaw(rawContent as RawSiteContent);
}
