export function useGetSessionData(key: string) {
    const storedData = sessionStorage.getItem(key);
    if (storedData) {
        const data = JSON.parse(storedData)
        return data;
    }
}

export default useGetSessionData;