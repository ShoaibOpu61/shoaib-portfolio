const LOCAL_MEDIA_API_PREFIX = "/api/media/file/";
const LOCAL_MEDIA_PUBLIC_PREFIX = "/media/";

export function normalizeMediaUrl(url: string) {
    if (url.startsWith(LOCAL_MEDIA_API_PREFIX)) {
        return url.replace(LOCAL_MEDIA_API_PREFIX, LOCAL_MEDIA_PUBLIC_PREFIX);
    }

    return url;
}
