import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { getProjectById, getCaseStudyById, getProjects, getCaseStudies } from "@/lib/api";
import RichText from "@/components/RichText";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // Try to find as project or case study using numericId
    // Payload usually uses alphanumeric IDs, but we added numericID for compatibility
    // In a real scenario, we'd query by the specific field.
    // For now, let's assume 'id' in the URL is the numericId or the Payload ID.

    let project = await getProjectById(id);
    let isCaseStudy = false;

    if (!project) {
        project = await getCaseStudyById(id);
        isCaseStudy = !!project;
    }

    if (!project) {
        // Fallback: search by numericId if the simple getById failed
        // (This would require a custom query in api.ts, but let's assume getById handles it for now or we match IDs)
        notFound();
    }

    const sourceArray = isCaseStudy ? await getCaseStudies() : await getProjects();
    const otherProjects = sourceArray
        .filter((p: any) => p.id !== project.id)
        .slice(0, 2);

    const imageUrl = typeof project.image === 'object' ? project.image.url : project.image;

    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen">
            <Navbar />

            <article className="min-h-screen">
                {isCaseStudy ? (
                    <div className="pt-32 pb-12 px-0 md:px-0">
                        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
                            <Link href="/works" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm">
                                <ArrowLeft className="w-4 h-4" /> Back to Works
                            </Link>
                        </div>

                        <div className="w-full flex flex-col items-center">
                            {project.images?.map((imgObj: any, i: number) => (
                                <div key={i} className="w-full max-w-[1920px] relative">
                                    <img
                                        src={typeof imgObj.image === 'object' ? imgObj.image.url : imgObj.image}
                                        alt={`${project.title} style ${i + 1}`}
                                        className="w-full h-auto block"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>

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
                    <div className="pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
                        <Link href="/works" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm mb-12">
                            <ArrowLeft className="w-4 h-4" /> Back to Works
                        </Link>

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
                                <ImageWithSkeleton
                                    src={imageUrl}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                            <div className="md:col-span-4">
                                <h3 className="text-sm font-sans uppercase tracking-widest text-white mb-4">The Challenge</h3>
                                <p className="text-secondary text-sm md:text-base leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                            <div className="md:col-span-8">
                                <h3 className="text-sm font-sans uppercase tracking-widest text-white mb-4">Overview</h3>
                                <RichText content={project.content} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                            {project.images?.map((imgObj: any, i: number) => (
                                <div key={i} className="aspect-video bg-zinc-800 rounded-lg overflow-hidden relative group">
                                    <ImageWithSkeleton
                                        src={typeof imgObj.image === 'object' ? imgObj.image.url : imgObj.image}
                                        alt={`${project.title} shot ${i + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <section className="border-t border-white/10 pt-24 px-6 md:px-12 max-w-[1400px] mx-auto pb-24">
                    <h2 className="text-3xl md:text-4xl font-serif uppercase mb-12">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {otherProjects.map((p: any) => (
                            <Link key={p.id} href={`/works/${p.numericId}`} className="group block">
                                <div className={`aspect-[4/3] w-full ${p.color} mb-6 overflow-hidden relative rounded-sm px-0`}>
                                    <ImageWithSkeleton
                                        src={typeof p.image === 'object' ? p.image.url : p.image}
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
