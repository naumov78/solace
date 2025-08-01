"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import ErrorMessage from "@/app/components/ErrorMessage";
import SearchSection from "@/app/components/SearchSection";
import AdvocateTable from "@/app/components/AdvacatesTable/AdvocateTable";
import useAdvocates from "@/app/hooks/useAdvocates";
import useAdvocateSearch from "@/app/hooks/useAdvocateSearch";
import Page from "@/app/components/Page/Page";
import { Advocate } from "@/app/types";

const PAGE_TITLE = "Solace Advocates";
const NO_ADVOCATES_FOUND_MESSAGE =
  "No advocates found matching your search criteria.";

export default function Home() {
  const { advocates, isLoading, error } = useAdvocates();
  const { searchTerm, filteredAdvocates, setSearchTerm, resetSearch } =
    useAdvocateSearch(advocates);

  if (isLoading) {
    return (
      <Page pageTitle={PAGE_TITLE}>
        <LoadingSpinner />
      </Page>
    );
  }

  if (error) {
    return (
      <Page pageTitle={PAGE_TITLE}>
        <ErrorMessage message={error} />
      </Page>
    );
  }

  return (
    <Page pageTitle={PAGE_TITLE}>
      <div className="space-y-6">
        <SearchSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onReset={resetSearch}
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Advocates ({filteredAdvocates.length} of {advocates.length})
            </h2>
          </div>
          <div className="p-6">
            {filteredAdvocates.length > 0 ? (
              <AdvocateTable advocates={filteredAdvocates} />
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  {NO_ADVOCATES_FOUND_MESSAGE}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
