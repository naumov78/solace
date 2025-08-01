import { useState } from "react";
import { Advocate } from "@/app/types";

interface UseAdvocateSearchReturn {
  readonly searchTerm: string;
  readonly filteredAdvocates: readonly Advocate[];
  readonly setSearchTerm: (term: string) => void;
  readonly resetSearch: () => void;
}

const useAdvocateSearch = (
  advocates: readonly Advocate[]
): UseAdvocateSearchReturn => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdvocates = advocates.filter((advocate) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      advocate.firstName.toLowerCase().includes(searchLower) ||
      advocate.lastName.toLowerCase().includes(searchLower) ||
      advocate.city.toLowerCase().includes(searchLower) ||
      advocate.degree.toLowerCase().includes(searchLower) ||
      advocate.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchLower)
      ) ||
      advocate.yearsOfExperience.toString().includes(searchTerm)
    );
  });

  const resetSearch = (): void => {
    setSearchTerm("");
  };

  return { searchTerm, filteredAdvocates, setSearchTerm, resetSearch };
};

export default useAdvocateSearch;
