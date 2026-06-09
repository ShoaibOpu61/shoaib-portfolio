import { getFeaturedProjects } from "@/lib/api";
import AboutClient from "./AboutClient";

export default async function AboutPage() {
    const featuredProjects = await getFeaturedProjects(3);

    return <AboutClient featuredProjects={featuredProjects} />;
}
