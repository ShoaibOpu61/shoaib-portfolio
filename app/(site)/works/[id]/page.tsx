import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import BlocksRenderer from "@/components/BlocksRenderer";
import { getProjectById, getCaseStudyById, getProjects, getCaseStudies } from "@/lib/api";
import { getPreferredMediaUrl } from "@/lib/media";
import RichText, { type RichTextContent } from "@/components/RichText";

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

function renderImage(media: MediaField | undefined, alt: string, className = "block h-auto w-full") {
    return (
        <ImageWithSkeleton
            src={getMediaUrl(media)}
            alt={alt}
            width={getMediaDimensions(media).width}
            height={getMediaDimensions(media).height}
            unoptimized={true}
            className={className}
        />
    );
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
                {/* ─── CASE STUDY VIEW ─────────────────────────────── */}
                {isCaseStudy ? (
                    <div className="pt-32 pb-12">
                        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
                            <Link
                                href="/works"
                                className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to Works
                            </Link>
                        </div>

                        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
                            <h1 className="type-hero text-5xl md:text-8xl uppercase leading-[0.85] text-white mb-6">
                                {project.title}
                            </h1>
                            {project.description && (
                                <p className="max-w-3xl text-secondary text-base md:text-lg leading-relaxed">
                                    {project.description}
                                </p>
                            )}
                        </div>

                        {/* Flexible blocks (new) → sections (legacy) → images fallback */}
                        {project.blocks?.length ? (
                            <BlocksRenderer blocks={project.blocks as Record<string, unknown>[]} />
                        ) : project.sections?.length ? (
                            <div className="space-y-20">
                                {project.sections.map((section, sectionIndex) => (
                                    <section
                                        key={`${project.id}-section-${sectionIndex}`}
                                        className="max-w-[1600px] mx-auto px-6 md:px-12"
                                    >
                                        {(section.title || section.text) && (
                                            <div className="max-w-4xl mb-10">
                                                {section.title && (
                                                    <h2 className="type-section uppercase text-white mb-4">
                                                        {section.title}
                                                    </h2>
                                                )}
                                                {section.text && (
                                                    <p className="text-secondary text-base md:text-lg leading-relaxed">
                                                        {section.text}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        <div className="space-y-6">
                                            {section.images?.map((imgObj, imageIndex) => (
                                                <div
                                                    key={`${project.id}-s${sectionIndex}-i${imageIndex}`}
                                                    className="w-full relative bg-zinc-950 rounded-lg overflow-hidden"
                                                >
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
                        ) : (
                            <div className="w-full flex flex-col items-center">
                                {project.images?.map((imgObj, i: number) => (
                                    <div key={i} className="w-full max-w-[1920px] relative">
                                        {renderImage(imgObj.image, `${project.title} visual ${i + 1}`)}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24">
                            <h3 className="type-case-title text-2xl uppercase text-white mb-6 text-center">
                                End of Case Study
                            </h3>
                            <div className="flex justify-center">
                                <Link
                                    href="/works"
                                    className="px-8 py-3 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                >
                                    View Other Works
                                </Link>
                            </div>
                        </div>
                    </div>

                ) : (
                    /* ─── PROJECT VIEW ────────────────────────────────── */
                    <div className="pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
                        <Link
                            href="/works"
                            className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors uppercase tracking-widest text-sm mb-12"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Works
                        </Link>

                        {/* Title + meta */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <h1 className="type-hero text-5xl md:text-8xl uppercase leading-[0.85] text-white">
                                {project.title}
                            </h1>
                            <div className="flex flex-col items-end text-right">
                                {project.category && (
                                    <span className="type-label text-sm text-secondary block mb-1">
                                        {project.category}
                                    </span>
                                )}
                                {project.year && (
                                    <span className="type-label text-sm text-secondary/50 block">
                                        Year: {project.year}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Flexible blocks (new) → legacy hero + images fallback */}
                        {project.blocks?.length ? (
                            <div className="mt-8 mb-24">
                                <BlocksRenderer blocks={project.blocks as Record<string, unknown>[]} />
                            </div>
                        ) : (
                            <>
                                {/* Hero image */}
                                <div className="w-full h-[50vh] md:h-[70vh] bg-zinc-800 rounded-lg overflow-hidden relative mb-16">
                                    <ImageWithSkeleton
                                        src={getHeroImage(project)}
                                        alt={project.title}
                                        fill
                                        unoptimized={true}
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>

                                {/* Overview grid */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                                    <div className="md:col-span-4">
                                        <h3 className="type-label text-sm text-white mb-4">Overview</h3>
                                        {project.description && (
                                            <p className="text-secondary text-sm md:text-base leading-relaxed mb-6">
                                                {project.description}
                                            </p>
                                        )}
                                        <div className="space-y-3 text-sm text-secondary">
                                            {project.client && (
                                                <p><span className="text-white">Client:</span> {project.client}</p>
                                            )}
                                            {project.liveLink && (
                                                <p>
                                                    <span className="text-white">Live:</span>{" "}
                                                    <a
                                                        href={project.liveLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="hover:text-white underline underline-offset-4"
                                                    >
                                                        {project.liveLink}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="md:col-span-8">
                                        <h3 className="type-label text-sm text-white mb-4">Project Showcase</h3>
                                        <p className="text-secondary text-sm md:text-base leading-relaxed">
                                            This project page is intentionally light on text and focused on visuals, mockups, and key context.
                                        </p>
                                    </div>
                                </div>

                                {/* Legacy image gallery */}
                                {!!project.images?.length && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                                        {project.images.map((imgObj, i: number) => (
                                            <div
                                                key={i}
                                                className="aspect-video bg-zinc-800 rounded-lg overflow-hidden relative group"
                                            >
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
                            </>
                        )}
                    </div>
                )}

                {/* ─── YOU MIGHT ALSO LIKE — Premium card design matching Works page ─── */}
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
