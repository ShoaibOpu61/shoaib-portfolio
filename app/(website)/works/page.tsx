import { getCaseStudies, getProjects, getPlayground } from "@/lib/api";
import WorksClient from "./WorksClient";

export default async function WorksPage() {
    const projectsDocs = await getProjects();
    const caseStudiesDocs = await getCaseStudies();
    const playgroundDocs = await getPlayground();

    return (
        <WorksClient
            initialProjects={projectsDocs}
            initialCaseStudies={caseStudiesDocs}
            initialPlayground={playgroundDocs}
        />
    );
}
