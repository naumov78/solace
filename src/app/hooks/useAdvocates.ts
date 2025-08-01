import { useState, useEffect } from "react";
import { Advocate, PaginatedApiResponse } from "@/app/types";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";

interface UseAdvocatesReturn {
  readonly advocates: readonly Advocate[];
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly pagination: PaginatedApiResponse["pagination"] | null;
  readonly setPage: (page: number) => void;
  readonly setPageSize: (pageSize: number) => void;
  readonly setSearchTerm: (searchTerm: string) => void;
  readonly performSearch: () => void;
  readonly resetSearch: () => void;
  readonly currentPage: number;
  readonly currentPageSize: number;
  readonly searchTerm: string;
}

const useAdvocates = (): UseAdvocatesReturn => {
  const [advocates, setAdvocates] = useState<readonly Advocate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<
    PaginatedApiResponse["pagination"] | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdvocates = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: currentPage.toString(),
          pageSize: currentPageSize.toString(),
        });

        if (activeSearchTerm.trim()) {
          params.append("search", activeSearchTerm.trim());
        }

        const response = await fetch(`/api/advocates?${params}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse: PaginatedApiResponse = await response.json();
        setAdvocates(jsonResponse.data);
        setPagination(jsonResponse.pagination);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch advocates"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvocates();
  }, [currentPage, currentPageSize, activeSearchTerm]);

  const setPage = (page: number): void => {
    setCurrentPage(page);
  };

  const setPageSize = (pageSize: number): void => {
    setCurrentPageSize(pageSize);
    setCurrentPage(1);
  };

  const handleSetSearchTerm = (term: string): void => {
    setSearchTerm(term);
  };

  const performSearch = (): void => {
    setActiveSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const resetSearch = (): void => {
    setSearchTerm("");
    setActiveSearchTerm("");
    setCurrentPage(1);
  };

  return {
    advocates,
    isLoading,
    error,
    pagination,
    setPage,
    setPageSize,
    setSearchTerm: handleSetSearchTerm,
    performSearch,
    resetSearch,
    currentPage,
    currentPageSize,
    searchTerm,
  };
};

export default useAdvocates;
