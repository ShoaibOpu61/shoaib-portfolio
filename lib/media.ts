type MediaSize = {
    url?: string | null;
};

type MediaLike = {
    url?: string | null;
    thumbnailURL?: string | null;
    sizes?: {
        thumbnail?: MediaSize | null;
        card?: MediaSize | null;
        tablet?: MediaSize | null;
    } | null;
};

const MEDIA_API_PREFIX = "/api/media/file/";
const MEDIA_PUBLIC_PREFIX = "/media/";

export function normalizeMediaUrl(url: string) {
    if (url.startsWith(MEDIA_API_PREFIX)) {
        return url.replace(MEDIA_API_PREFIX, MEDIA_PUBLIC_PREFIX);
    }

    try {
        const parsed = new URL(url);

        if (parsed.pathname.startsWith(MEDIA_API_PREFIX)) {
            return parsed.pathname.replace(MEDIA_API_PREFIX, MEDIA_PUBLIC_PREFIX);
        }
    } catch {
        // Ignore invalid absolute URLs and fall back to the original value.
    }

    return url;
}

export function getPreferredMediaUrl(media?: string | MediaLike | null) {
    if (typeof media === "string" && media.length > 0) {
        return normalizeMediaUrl(media);
    }

    if (!media || typeof media !== "object") {
        return null;
    }

    const candidateUrls = [
        media.sizes?.thumbnail?.url,
        media.thumbnailURL,
        media.sizes?.card?.url,
        media.sizes?.tablet?.url,
        media.url,
    ];

    const firstValidUrl = candidateUrls.find(
        (candidate): candidate is string => typeof candidate === "string" && candidate.length > 0,
    );

    return firstValidUrl ? normalizeMediaUrl(firstValidUrl) : null;
}
