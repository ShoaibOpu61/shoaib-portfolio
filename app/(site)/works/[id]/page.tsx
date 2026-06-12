import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import BlocksRenderer from "@/components/BlocksRenderer";
import { getProjectById, getCaseStudyById, getProjects, getCaseStudies } from "@/lib/api";
import { getPreferredMediaUrl } from "@/lib/media";
type MediaField = string | {
    url?: string | null;
    thumbnailURL?: string | null;
    width?: number | null;
    height?: number | null;
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
    blocks?: unknown[] | null;
};

const FALLBACK_IMAGE = "/images/profile-photo.jpg";

function getMediaUrl(media?: MediaField) {
    return getPreferredMediaUrl(media, "original") || FALLBACK_IMAGE;
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

function getMediaDimensions(media?: MediaField) {
    if (media && typeof media === "object") {
        return { width: media.width || 1600, height: media.height || 1000 };
    }
    return { width: 1600, height: 1000 };
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

            <article className="min-h-screen pt-32 pb-12">
                {/* Unified Layout: Back Button */}
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8">
                    <Link
                        href="/works"
                        className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Works
                    </Link>
                </div>

                {/* 1. Hero Image */}
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
                    <div className="w-full h-[60vh] md:h-[75vh] bg-zinc-900 rounded-[2rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                        <ImageWithSkeleton
                            src={getHeroImage(project)}
                            alt={project.title}
                            fill
                            unoptimized={true}
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                </div>

                {/* 2. Metadata Section */}
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
                        <div className="flex-1 max-w-3xl">
                            <h1 className="type-hero text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] text-white mb-6">
                                {project.title}
                            </h1>
                            {project.description && (
                                <p className="text-secondary text-base md:text-xl leading-relaxed">
                                    {project.description}
                                </p>
                            )}
                        </div>

                        <div className="w-full md:w-80 flex flex-col gap-8 text-sm pt-2 md:pt-4">
                            {/* Render Category & Year */}
                            {(project.category || project.year) && (
                                <div className="flex flex-col gap-2 pb-6 border-b border-white/10">
                                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold">Details</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        {project.category && <span className="text-white text-base">{project.category}</span>}
                                        {project.category && project.year && <span className="text-white/30">•</span>}
                                        {project.year && <span className="text-secondary text-base">{project.year}</span>}
                                    </div>
                                </div>
                            )}

                            {/* Render Client */}
                            {project.client && (
                                <div className="flex flex-col gap-2 pb-6 border-b border-white/10">
                                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold">Client</span>
                                    <span className="text-white text-base mt-1">{project.client}</span>
                                </div>
                            )}

                            {/* Render Live Link */}
                            {project.liveLink && (
                                <div className="flex flex-col gap-2 pb-6 border-b border-white/10">
                                    <span className="text-white/40 uppercase tracking-widest text-xs font-semibold">Live Site</span>
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-cyan-400 hover:text-cyan-300 transition-colors mt-1 inline-flex items-center gap-1 text-base group w-fit"
                                    >
                                        Visit Project <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. Content Details Section (Preserving Safe Fallbacks) */}
                <div className="w-full">
                    {project.blocks?.length ? (
                        <div className="mb-32">
                            <BlocksRenderer blocks={project.blocks as Record<string, unknown>[]} />
                        </div>
                    ) : project.sections?.length ? (
                        /* Legacy Case Study Sections */
                        <div className="space-y-32 mb-32">
                            {project.sections.map((section, sectionIndex) => (
                                <section key={`${project.id}-section-${sectionIndex}`} className="max-w-[1200px] mx-auto px-6 md:px-12">
                                    {(section.title || section.text) && (
                                        <div className="max-w-4xl mb-16 mx-auto text-center">
                                            {section.title && <h2 className="type-section uppercase text-white mb-6 text-3xl md:text-5xl">{section.title}</h2>}
                                            {section.text && <p className="text-secondary text-base md:text-xl leading-relaxed">{section.text}</p>}
                                        </div>
                                    )}
                                    <div className="space-y-12">
                                        {section.images?.map((imgObj, imageIndex) => (
                                            <div key={`${project.id}-s${sectionIndex}-i${imageIndex}`} className="w-full relative bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
                                                <ImageWithSkeleton
                                                    src={getMediaUrl(imgObj.image)}
                                                    alt={`${project.title} section ${sectionIndex + 1} image ${imageIndex + 1}`}
                                                    width={getMediaDimensions(imgObj.image).width}
                                                    height={getMediaDimensions(imgObj.image).height}
                                                    unoptimized={true}
                                                    className="block h-auto w-full"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : project.images?.length ? (
                        /* Legacy Project Images Fallback */
                        <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-32">
                            <div className="space-y-16">
                                {project.images.map((imgObj, i: number) => (
                                    <div key={i} className="w-full bg-zinc-900 rounded-[2rem] overflow-hidden relative group shadow-2xl border border-white/5">
                                        <ImageWithSkeleton
                                            src={getMediaUrl(imgObj.image)}
                                            alt={`${project.title} visual ${i + 1}`}
                                            width={getMediaDimensions(imgObj.image).width}
                                            height={getMediaDimensions(imgObj.image).height}
                                            unoptimized={true}
                                            className="block h-auto w-full transition-transform duration-1000 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* End of Case Study Indicator */}
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32 border-t border-white/10 pt-24">
                    <h3 className="type-case-title text-xl md:text-2xl uppercase text-white mb-8 text-center opacity-60 tracking-widest">
                        End of Case Study
                    </h3>
                </div>

                {/* 4. Other Works */}
                <section className="border-t border-white/10 pt-24 px-6 md:px-12 max-w-[1400px] mx-auto pb-24">
                    <h2 className="type-section uppercase mb-12">You Might Also Like</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {otherProjects.map((p) => (
                            <Link key={p.id} href={getWorkHref(p)} className="group block">
                                <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-300/30 group-hover:bg-white/[0.055] group-hover:shadow-[0_26px_90px_rgba(34,211,238,0.08)] group-hover:-translate-y-2">
                                    {/* Hover gradient glow */}
                                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    {/* Image */}
                                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-950">
                                        <ImageWithSkeleton
                                            src={getListingImage(p)}
                                            alt={p.title}
                                            fill
                                            unoptimized={true}
                                            className="object-cover opacity-88 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                                        {/* Arrow button */}
                                        <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/75 shadow-[0_12px_30px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-300/50 group-hover:bg-cyan-300/10 group-hover:text-cyan-100 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                                            <ArrowUpRight className="h-4 w-4" />
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div className="relative z-10 flex flex-col px-2 pb-2 pt-4">
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            {p.category && (
                                                <span className="type-label rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[9px] text-white/62">
                                                    {p.category}
                                                </span>
                                            )}
                                            {p.year && (
                                                <span className="type-label rounded-full border border-cyan-200/15 bg-cyan-300/[0.045] px-3 py-1 text-[9px] text-cyan-100/68">
                                                    {p.year}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="type-case-title text-xl md:text-2xl uppercase leading-tight text-white transition-colors duration-300 group-hover:text-cyan-50">
                                            {p.title}
                                        </h3>
                                    </div>
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
