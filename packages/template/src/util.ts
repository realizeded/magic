export const getUrl = (): string => {
    return window.isOnline ? 'http://150.158.141.76:8800' : 'http://localhost:8800';
};