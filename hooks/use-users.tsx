"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function useUsers(limit: number) {
    const { data, error, isLoading, mutate } = useSWR(
        `/api/auth/user?limit=${limit}`,
        fetcher,
    );

    return {
        user: data,
        isError: error,
        isLoading,
        mutate,
    };
}
