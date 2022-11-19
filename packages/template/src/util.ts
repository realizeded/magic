export const getUrl = (): string => {
    const isOnline = process.env.NODE_ENV !== 'development';

    // return window.isOnline ? 'http://150.158.141.76:8800' : 'http://localhost:8800';
    return isOnline ? 'http://www.lmagic.work:8800' : 'http://localhost:8800';
};
