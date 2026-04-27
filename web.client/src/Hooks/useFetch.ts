import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    setData: React.Dispatch<React.SetStateAction<T | null>>;
}

const useFetch = <T>(url: string | null, options?: RequestInit): UseFetchResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) {
            setData(null);
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const headers = new Headers(options?.headers);
                headers.append('Accept', 'application/json');

                const response = await fetch(url, {
                    ...options,
                    headers,
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                if (err instanceof Error) {
                    if (err.name !== 'AbortError') {
                        setError(err.message);
                    }
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url, options]);

    return { data, loading, error, setData };
};

export default useFetch;