import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

// Generate static params for all projects
export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    // Logic for "You might also like" (Suggestions)
    // Filter out current project, take 2 random or next ones
    const otherProjects = projects
        .filter((p) => p.id !== id)
        .slice(0, 2);

    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen">
            <Navbar />

            <article className="pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
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
                        <div className="absolute inset-0 bg-white/5" />
                        {/* <Image src={project.image} fill className="object-cover" /> */}
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
                        <div key={i} className="aspect-video bg-zinc-800 rounded-lg overflow-hidden relative">
                            <div className="absolute inset-0 bg-white/5" />
                        </div>
                    ))}
                </div>

                {/* Suggestions */}
                <section className="border-t border-white/10 pt-24">
                    <h2 className="text-3xl md:text-4xl font-serif uppercase mb-12">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {otherProjects.map((p) => (
                            <Link key={p.id} href={`/works/${p.id}`} className="group block">
                                <div className={`aspect-[4/3] w-full ${p.color} mb-6 overflow-hidden relative rounded-sm`}>
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
