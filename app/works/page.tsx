import { getCaseStudies, getProjects } from "@/lib/api";
import WorksClient from "./WorksClient";

export default async function WorksPage() {
    const projectsDocs = await getProjects();
    const caseStudiesDocs = await getCaseStudies();

    // Map Payload docs back to the format the UI expects if necessary
    // or pass them directly if the UI is updated to handle Payload types.

    return <WorksClient initialProjects={projectsDocs} initialCaseStudies={caseStudiesDocs} />;
}
