import React from "react"
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton"
import { getPreferredMediaUrl } from "@/lib/media"

// Blocks come from Payload as plain objects — we cast per-block-type at render time.
// Using Record<string, unknown> satisfies @typescript-eslint/no-explicit-any.
type Block = Record<string, unknown>

type MediaLike = {
    url?: string | null
    width?: number | null
    height?: number | null
    thumbnailURL?: string | null
    sizes?: {
        thumbnail?: { url?: string | null } | null
        card?: { url?: string | null } | null
        tablet?: { url?: string | null } | null
    } | null
} | string | null | undefined

function toMedia(v: unknown): MediaLike {
    return v as MediaLike
}

function toStr(v: unknown): string {
    return typeof v === "string" ? v : ""
}

export default function BlocksRenderer({ blocks }: { blocks?: Block[] | null }) {
    if (!blocks || blocks.length === 0) return null

    return (
        <div className="space-y-16">
            {blocks.map((block, index) => {
                const key = `${String(block.blockType)}-${index}`

                switch (block.blockType) {
                    case "text": {
                        const content = block.content as Record<string, unknown> | undefined
                        if (!content) return null
                        const html = typeof content.html === "string" ? content.html : JSON.stringify(content)
                        return (
                            <div key={key} className="max-w-[1400px] mx-auto px-6 md:px-12">
                                <div
                                    className="prose prose-invert max-w-4xl prose-p:text-secondary prose-p:text-base md:prose-p:text-lg"
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
                            </div>
                        )
                    }

                    case "image": {
                        const img = toMedia(block.image)
                        const caption = toStr(block.caption)
                        const src = getPreferredMediaUrl(img, "original") || ""
                        const w = (img && typeof img === "object" && "width" in img ? img.width : null) || 1600
                        const h = (img && typeof img === "object" && "height" in img ? img.height : null) || 1000
                        return (
                            <div key={key} className="max-w-[1600px] mx-auto px-6 md:px-12">
                                <div className="w-full relative bg-zinc-950 rounded-lg overflow-hidden group">
                                    <ImageWithSkeleton
                                        src={src}
                                        alt={caption || "Image"}
                                        width={Number(w)}
                                        height={Number(h)}
                                        unoptimized={true}
                                        className="block h-auto w-full"
                                    />
                                    {caption && (
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            {caption}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }

                    case "gallery": {
                        const images = (block.images as Array<Record<string, unknown>> | undefined) ?? []
                        return (
                            <div key={key} className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {images.map((imgObj, i: number) => {
                                    const img = toMedia(imgObj.image)
                                    const src = getPreferredMediaUrl(img, "original") || ""
                                    const w = (img && typeof img === "object" && "width" in img ? img.width : null) || 800
                                    const h = (img && typeof img === "object" && "height" in img ? img.height : null) || 600
                                    return (
                                        <div key={`${key}-${i}`} className="w-full relative bg-zinc-950 rounded-lg overflow-hidden">
                                            <ImageWithSkeleton
                                                src={src}
                                                alt={`Gallery image ${i + 1}`}
                                                width={Number(w)}
                                                height={Number(h)}
                                                unoptimized={true}
                                                className="block h-auto w-full"
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }

                    case "sectionTitle":
                        return (
                            <div key={key} className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24 mb-10 text-center">
                                {Boolean(block.title) && (
                                    <h2 className="type-section uppercase text-white mb-4">{toStr(block.title)}</h2>
                                )}
                                {Boolean(block.subtitle) && (
                                    <p className="text-secondary text-base md:text-lg">{toStr(block.subtitle)}</p>
                                )}
                            </div>
                        )

                    case "featureList": {
                        const features = (block.features as Array<Record<string, unknown>> | undefined) ?? []
                        return (
                            <div key={key} className="max-w-[1400px] mx-auto px-6 md:px-12">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {features.map((f, i: number) => (
                                        <li key={`${key}-${i}`} className="text-secondary flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span className="text-base md:text-lg">{toStr(f.text)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }

                    case "externalLink":
                        return (
                            <div key={key} className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-center mt-12">
                                <a
                                    href={toStr(block.url)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-8 py-3 border border-white/20 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                >
                                    {toStr(block.label)}
                                </a>
                            </div>
                        )

                    default:
                        return null
                }
            })}
        </div>
    )
}
