const LOCAL_MEDIA_API_PREFIX = "/api/media/file/";
const LOCAL_MEDIA_PUBLIC_PREFIX = "/media/";

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

export function normalizeMediaUrl(url: string) {
    return url.startsWith(LOCAL_MEDIA_API_PREFIX)
        ? url.replace(LOCAL_MEDIA_API_PREFIX, LOCAL_MEDIA_PUBLIC_PREFIX)
        : url;
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
