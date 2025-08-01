import { useState, useEffect } from "react";
import { Advocate } from "@/app/types";

interface UseAdvocatesReturn {
  readonly advocates: readonly Advocate[];
  readonly isLoading: boolean;
  readonly error: string | null;
}

const useAdvocates = (): UseAdvocatesReturn => {
  const [advocates, setAdvocates] = useState<readonly Advocate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvocates = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/advocates");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse: ApiResponse = await response.json();
        setAdvocates(jsonResponse.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch advocates"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

  return { advocates, isLoading, error };
};

export default useAdvocates;
