import { getCaseStudies, getPlaygroundEntries, getProjects } from "@/lib/api";
import WorksClient from "./WorksClient";

export default async function WorksPage() {
    const projectsDocs = await getProjects();
    const caseStudiesDocs = await getCaseStudies();
    const playgroundDocs = await getPlaygroundEntries();

    return <WorksClient initialProjects={projectsDocs} initialCaseStudies={caseStudiesDocs} initialPlayground={playgroundDocs} />;
}
