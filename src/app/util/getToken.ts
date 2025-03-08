export function getTokenFromCookies(): string | null {
    return sessionStorage.getItem('token');
}