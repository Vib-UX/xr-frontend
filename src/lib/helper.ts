export function getFromLocalStorage(key: string): string | null {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
    }
    return null;
}

export function getFromSessionStorage(key: string): string | null {
    if (typeof sessionStorage !== 'undefined') {
        return sessionStorage.getItem(key);
    }
    return null;
}
export const generateCodeVerifier = (): string => {
    const array = new Uint8Array(64);
    crypto.getRandomValues(array);

    return Array.from(array, (byte) =>
        ('0' + byte.toString(16)).slice(-2)
    ).join('');
};

const sha256 = async (message: string): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return crypto.subtle.digest('SHA-256', data);
};

const base64UrlEncode = (arrayBuffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(arrayBuffer);
    const base64String = btoa(String.fromCharCode(...bytes));
    return base64String
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};
export const generateCodeChallenge = async (
    codeVerifier: string
): Promise<string> => {
    const hashedBuffer = await sha256(codeVerifier);
    return base64UrlEncode(hashedBuffer);
};
