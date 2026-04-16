import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { getProjectById, getCaseStudyById, getProjects, getCaseStudies } from "@/lib/api";
import { getPreferredMediaUrl } from "@/lib/media";

type MediaField = string | {
    url?: string | null;
    thumbnailURL?: string | null;
    sizes?: {
        thumbnail?: { url?: string | null } | null;
        card?: { url?: string | null } | null;
        tablet?: { url?: string | null } | null;
    } | null;
} | null;

type UploadedImage = {
    image?: MediaField;
};

type CaseStudySection = {
    title?: string | null;
    text?: string | null;
    images?: UploadedImage[] | null;
};

type WorkDoc = {
    id: string;
    slug?: string | null;
    numericId?: number | null;
    title: string;
    category?: string | null;
    year?: string | null;
    description?: string | null;
    client?: string | null;
    liveLink?: string | null;
    image?: MediaField;
    coverImage?: MediaField;
    heroImage?: MediaField;
    images?: UploadedImage[] | null;
    sections?: CaseStudySection[] | null;
};

const FALLBACK_IMAGE = "/images/profile-photo.jpg";

function getMediaUrl(media?: MediaField) {
    return getPreferredMediaUrl(media) || FALLBACK_IMAGE;
}

function getWorkHref(item: WorkDoc) {
    return `/works/${item.slug || item.numericId || item.id}`;
}

function getHeroImage(project: WorkDoc) {
    return getMediaUrl(project.heroImage || project.coverImage || project.image);
}

function getListingImage(project: WorkDoc) {
    return getMediaUrl(project.coverImage || project.image);
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let project = await getProjectById(id) as WorkDoc | undefined;
    let isCaseStudy = false;

    if (!project) {
        project = await getCaseStudyById(id) as WorkDoc | undefined;
        isCaseStudy = !!project;
    }

    if (!project) {
        notFound();
    }

    const sourceArray = (isCaseStudy ? await getCaseStudies() : await getProjects()) as WorkDoc[];
    const otherProjects = sourceArray
        .filter((p) => p.id !== project.id)
        .slice(0, 2);

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

                        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
                            <h1 className="text-5xl md:text-8xl font-serif uppercase leading-[0.85] text-white mb-6">{project.title}</h1>
                            {project.description && (
                                <p className="max-w-3xl text-secondary text-base md:text-lg leading-relaxed">{project.description}</p>
                            )}
                        </div>

                        {project.sections?.length ? (
                            <div className="space-y-20">
                                {project.sections.map((section, sectionIndex) => (
                                    <section key={`${project.id}-section-${sectionIndex}`} className="max-w-[1600px] mx-auto px-6 md:px-12">
                                        {(section.title || section.text) && (
                                            <div className="max-w-4xl mb-10">
                                                {section.title && (
                                                    <h2 className="text-3xl md:text-5xl font-serif uppercase text-white mb-4">{section.title}</h2>
                                                )}
                                                {section.text && (
                                                    <p className="text-secondary text-base md:text-lg leading-relaxed">{section.text}</p>
                                                )}
                                            </div>
                                        )}

                                        <div className="space-y-6">
                                            {section.images?.map((imgObj, imageIndex) => (
                                                <div key={`${project.id}-section-${sectionIndex}-image-${imageIndex}`} className="w-full relative bg-zinc-950 rounded-lg overflow-hidden">
                                                    <img
                                                        src={getMediaUrl(imgObj.image)}
                                                        alt={`${project.title} section ${sectionIndex + 1} image ${imageIndex + 1}`}
                                                        className="w-full h-auto block"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full flex flex-col items-center">
                                {project.images?.map((imgObj, i: number) => (
                                    <div key={i} className="w-full max-w-[1920px] relative">
                                        <img
                                            src={getMediaUrl(imgObj.image)}
                                            alt={`${project.title} visual ${i + 1}`}
                                            className="w-full h-auto block"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

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
                                    {project.category && (
                                        <span className="font-sans text-sm tracking-widest text-secondary uppercase block mb-1">
                                            {project.category}
                                        </span>
                                    )}
                                    {project.year && (
                                        <span className="font-sans text-sm tracking-widest text-secondary/50 uppercase block">
                                            Year: {project.year}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="w-full h-[50vh] md:h-[70vh] bg-zinc-800 rounded-lg overflow-hidden relative">
                                <ImageWithSkeleton
                                    src={getHeroImage(project)}
                                    alt={project.title}
                                    fill
                                    unoptimized={true}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                            <div className="md:col-span-4">
                                <h3 className="text-sm font-sans uppercase tracking-widest text-white mb-4">Overview</h3>
                                {project.description && (
                                    <p className="text-secondary text-sm md:text-base leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                )}
                                <div className="space-y-3 text-sm text-secondary">
                                    {project.client && <p><span className="text-white">Client:</span> {project.client}</p>}
                                    {project.liveLink && (
                                        <p>
                                            <span className="text-white">Live:</span>{" "}
                                            <a href={project.liveLink} target="_blank" rel="noreferrer" className="hover:text-white underline underline-offset-4">
                                                {project.liveLink}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-8">
                                <h3 className="text-sm font-sans uppercase tracking-widest text-white mb-4">Project Showcase</h3>
                                <p className="text-secondary text-sm md:text-base leading-relaxed">
                                    This project page is intentionally light on text and focused on visuals, mockups, and key context.
                                </p>
                            </div>
                        </div>

                        {!!project.images?.length && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                                {project.images?.map((imgObj, i: number) => (
                                    <div key={i} className="aspect-video bg-zinc-800 rounded-lg overflow-hidden relative group">
                                        <ImageWithSkeleton
                                            src={getMediaUrl(imgObj.image)}
                                            alt={`${project.title} shot ${i + 1}`}
                                            fill
                                            unoptimized={true}
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <section className="border-t border-white/10 pt-24 px-6 md:px-12 max-w-[1400px] mx-auto pb-24">
                    <h2 className="text-3xl md:text-4xl font-serif uppercase mb-12">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {otherProjects.map((p) => (
                            <Link key={p.id} href={getWorkHref(p)} className="group block">
                                <div className="aspect-[4/3] w-full bg-zinc-900 mb-6 overflow-hidden relative rounded-sm px-0">
                                    <ImageWithSkeleton
                                        src={getListingImage(p)}
                                        alt={p.title}
                                        fill
                                        unoptimized={true}
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                                </div>
                                <div className="flex justify-between items-start border-t border-white/20 pt-4">
                                    <div>
                                        <span className="block text-sm font-sans tracking-widest text-secondary mb-2 uppercase">
                                            {p.category || (isCaseStudy ? "Case Study" : "Project")}
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
