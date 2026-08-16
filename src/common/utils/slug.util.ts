export function generateUniqueSlug(
    value: string,
    existingSlugs: string[] = [],
    separator = '-',
): string {
    const normalized = value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, separator)
        .replace(new RegExp(`${separator}{2,}`, 'g'), separator)
        .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

    const base = normalized || 'community';
    const lowerExistingSlugs = existingSlugs.map((slug) => slug.toLowerCase());

    if (!lowerExistingSlugs.includes(base)) {
        return base;
    }

    let suffix = 1;
    let candidate = `${base}${separator}${suffix}`;

    while (lowerExistingSlugs.includes(candidate)) {
        suffix += 1;
        candidate = `${base}${separator}${suffix}`;
    }

    return candidate;
}

export function generateFreshUniqueSlug(
    value: string,
    existingSlugs: string[] = [],
    separator = '-',
): string {
    const normalized = value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, separator)
        .replace(new RegExp(`${separator}{2,}`, 'g'), separator)
        .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

    const base = normalized || 'community';
    const lowerExistingSlugs = existingSlugs.map((slug) => slug.toLowerCase());

    if (!lowerExistingSlugs.includes(base)) {
        return base;
    }

    const timestamp = Date.now().toString().slice(-6);
    return `${base}${separator}${timestamp}`;
}
