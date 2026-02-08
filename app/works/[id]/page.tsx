import { notFound } from "next/navigation";
import { projects, caseStudies, getAllContent } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

// Generate static params for all projects AND case studies
export function generateStaticParams() {
    const allContent = getAllContent();
    return allContent.map((item) => ({
        id: item.id,
    }));
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const allContent = getAllContent();
    const project = allContent.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    // Determine if it's a Case Study based on ID or Category
    // (Assuming case studies have IDs starting with 'case-study' or we check the source array)
    const isCaseStudy = caseStudies.some(cs => cs.id === id);

    // Logic for "You might also like" (Suggestions)
    // Filter out current project, take 2 random or next ones from the SAME type
    const sourceArray = isCaseStudy ? caseStudies : projects;
    const otherProjects = sourceArray
        .filter((p) => p.id !== id)
        .slice(0, 2);

    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen">
            <Navbar />

            <article className="min-h-screen">
                {/* Visual Story Layout for Case Studies */}
                {isCaseStudy ? (
                    <div className="pt-32 pb-12 px-0 md:px-0">
                        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
                            <Link href="/works" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm">
                                <ArrowLeft className="w-4 h-4" /> Back to Works
                            </Link>
                        </div>

                        {/* Full Width Image Stack */}
                        <div className="w-full flex flex-col items-center">
                            {project.images?.map((img, i) => (
                                <div key={i} className="w-full max-w-[1920px] relative">
                                    {/* Using a natural aspect ratio container or just allowing height to be auto if image dimensions known. 
                                        Since we might not know dimensions, we'll use a standard Next.js Image with width/height prop or layout responsive.
                                        For "visual story", usually width=100%, height=auto. 
                                    */}
                                    <img
                                        src={img}
                                        alt={`${project.title} style ${i + 1}`}
                                        className="w-full h-auto block"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Bottom Navigation for Case Study */}
                        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24">
                            <h3 className="text-2xl font-serif uppercase text-white mb-6 text-center">End of Case Study</h3>
                            <div className="flex justify-center">
                                <Link href="/works" className="px-8 py-3 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                    View Other Works
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Standard Project Layout */
                    <div className="pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
                        <Link href="/works" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm mb-12">
                            <ArrowLeft className="w-4 h-4" /> Back to Works
                        </Link>

                        {/* Header */}
                        <div className="mb-16">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                                <h1 className="text-5xl md:text-8xl font-serif uppercase leading-[0.85] text-white">
                                    {project.title}
                                </h1>
                                <div className="flex flex-col items-end text-right">
                                    <span className="font-sans text-sm tracking-widest text-secondary uppercase block mb-1">
                                        {project.category}
                                    </span>
                                    <span className="font-sans text-sm tracking-widest text-secondary/50 uppercase block">
                                        Year: {project.year}
                                    </span>
                                </div>
                            </div>

                            <div className="w-full h-[50vh] md:h-[70vh] bg-zinc-800 rounded-lg overflow-hidden relative">
                                {/* Hero Image */}
                                <ImageWithSkeleton
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                            <div className="md:col-span-4">
                                <h3 className="text-sm font-sans uppercase tracking-widest text-white mb-4">The Challenge</h3>
                                <p className="text-secondary text-sm md:text-base leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                            <div className="md:col-span-8">
                                <h3 className="text-sm font-sans uppercase tracking-widest text-white mb-4">Overview</h3>
                                <p className="text-secondary text-lg md:text-xl leading-relaxed">
                                    {project.content}
                                </p>
                            </div>
                        </div>

                        {/* Gallery */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                            {project.images?.map((img, i) => (
                                <div key={i} className="aspect-video bg-zinc-800 rounded-lg overflow-hidden relative group">
                                    <ImageWithSkeleton
                                        src={img}
                                        alt={`${project.title} shot ${i + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Suggestions (Common for both) */}
                <section className="border-t border-white/10 pt-24 px-6 md:px-12 max-w-[1400px] mx-auto pb-24">
                    <h2 className="text-3xl md:text-4xl font-serif uppercase mb-12">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {otherProjects.map((p) => (
                            <Link key={p.id} href={`/works/${p.id}`} className="group block">
                                <div className={`aspect-[4/3] w-full ${p.color} mb-6 overflow-hidden relative rounded-sm px-0`}>
                                    <ImageWithSkeleton
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                                </div>
                                <div className="flex justify-between items-start border-t border-white/20 pt-4">
                                    <div>
                                        <span className="block text-sm font-sans tracking-widest text-secondary mb-2 uppercase">
                                            {p.category}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-serif uppercase group-hover:text-primary transition-colors">
                                            {p.title}
                                        </h3>
                                    </div>
                                    <ArrowUpRight className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </article>

            <Footer />
        </main>
    );
}
