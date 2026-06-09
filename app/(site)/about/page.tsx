import { getAboutItems } from "@/lib/api";
import AboutClient from "./AboutClient";

export default async function About() {
    // Fetch top 3 about projects to show in the footer
    const featuredProjects = await getAboutItems('projects', 3);

    return <AboutClient featuredProjects={featuredProjects} />;
}
