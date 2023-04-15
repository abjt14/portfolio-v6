import { experiments } from "@/data/experiments";

// dynamic imports are not working well with css modules in beta so doing it manually
import BorderHighlight from "./border-hightlight/BorderHighlight";
import LaserProgressBeam from "./laser-progress-beam/LaserProgressBeam";
import Searchlight from "./searchlight/Searchlight";

export default function ExperimentExport({ slug }: { slug: string }) {
  switch (slug) {
    case "border-highlight":
      return <BorderHighlight />;
    case "laser-progress-beam":
      return <LaserProgressBeam />;
    case "searchlight":
      return <Searchlight />;
    default:
      return <p>Could not find the requested component</p>;
  }
}