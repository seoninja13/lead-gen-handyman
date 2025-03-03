// Type guards for JSON fields
export function isCoordinates(json) {
    if (typeof json !== 'object' ||
        json === null ||
        !('lat' in json) ||
        !('lng' in json)) {
        return false;
    }
    return typeof json.lat === 'number' && typeof json.lng === 'number';
}
export function isServiceImage(json) {
    if (typeof json !== 'object' ||
        json === null ||
        !('url' in json) ||
        !('alt' in json) ||
        !('width' in json) ||
        !('height' in json)) {
        return false;
    }
    var img = json;
    return (typeof img.url === 'string' &&
        typeof img.alt === 'string' &&
        typeof img.width === 'number' &&
        typeof img.height === 'number');
}
export function isFAQ(json) {
    if (typeof json !== 'object' ||
        json === null ||
        !('question' in json) ||
        !('answer' in json)) {
        return false;
    }
    var faq = json;
    return typeof faq.question === 'string' && typeof faq.answer === 'string';
}
export function isTestimonial(json) {
    if (typeof json !== 'object' ||
        json === null ||
        !('author' in json) ||
        !('rating' in json) ||
        !('content' in json) ||
        !('date' in json)) {
        return false;
    }
    var testimonial = json;
    return (typeof testimonial.author === 'string' &&
        typeof testimonial.rating === 'number' &&
        typeof testimonial.content === 'string' &&
        typeof testimonial.date === 'string');
}
export function isMapsData(json) {
    if (typeof json !== 'object' ||
        json === null ||
        !('center' in json) ||
        !('zoom' in json)) {
        return false;
    }
    var mapsData = json;
    return (isCoordinates(mapsData.center) &&
        typeof mapsData.zoom === 'number' &&
        (!('markers' in mapsData) ||
            (Array.isArray(mapsData.markers) &&
                mapsData.markers.every(function (marker) {
                    return typeof marker === 'object' &&
                        marker !== null &&
                        isCoordinates(marker.position) &&
                        typeof marker.title === 'string';
                }))));
}
