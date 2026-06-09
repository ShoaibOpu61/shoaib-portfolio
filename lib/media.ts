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
    if (!url) return url;

    // If it's an absolute URL (like Vercel Blob or a full API proxy URL), leave it as is.
    // This ensures that Payload can handle the redirect to Blob storage correctly.
    if (url.startsWith('http')) {
        return url;
    }

    // Only normalize relative API paths to public media paths if they start with the prefix.
    if (url.startsWith(MEDIA_API_PREFIX)) {
        return url.replace(MEDIA_API_PREFIX, MEDIA_PUBLIC_PREFIX);
    }

    return url;
}

export function getPreferredMediaUrl(
    media?: string | MediaLike | null,
    preferSize: 'thumbnail' | 'card' | 'tablet' | 'original' = 'thumbnail'
) {
    if (typeof media === "string" && media.length > 0) {
        return normalizeMediaUrl(media);
    }

    if (!media || typeof media !== "object") {
        return null;
    }

    let candidateUrls: (string | null | undefined)[] = [];

    if (preferSize === 'card') {
        candidateUrls = [media.sizes?.card?.url, media.sizes?.tablet?.url, media.url, media.sizes?.thumbnail?.url, media.thumbnailURL];
    } else if (preferSize === 'tablet') {
        candidateUrls = [media.sizes?.tablet?.url, media.url, media.sizes?.card?.url, media.sizes?.thumbnail?.url, media.thumbnailURL];
    } else if (preferSize === 'original') {
        candidateUrls = [media.url, media.sizes?.tablet?.url, media.sizes?.card?.url, media.sizes?.thumbnail?.url, media.thumbnailURL];
    } else {
        candidateUrls = [
            media.sizes?.thumbnail?.url,
            media.thumbnailURL,
            media.sizes?.card?.url,
            media.sizes?.tablet?.url,
            media.url,
        ];
    }

    const firstValidUrl = candidateUrls.find(
        (candidate): candidate is string => typeof candidate === "string" && candidate.length > 0,
    );

    return firstValidUrl ? normalizeMediaUrl(firstValidUrl) : null;
}
