"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import ErrorMessage from "@/app/components/ErrorMessage";
import SearchSection from "@/app/components/SearchSection";
import AdvocateTable from "@/app/components/AdvacatesTable/AdvocateTable";
import Pagination from "@/app/components/Pagination/Pagination";
import useAdvocates from "@/app/hooks/useAdvocates";
import Page from "@/app/components/Page/Page";

const PAGE_TITLE = "Solace Advocates";
const NO_ADVOCATES_FOUND_MESSAGE =
  "No advocates found matching your search criteria.";

export default function Home() {
  const {
    advocates,
    isLoading,
    error,
    pagination,
    setPage,
    setPageSize,
    setSearchTerm,
    performSearch,
    resetSearch,
    currentPageSize,
    searchTerm,
  } = useAdvocates();

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
          onSearch={performSearch}
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Advocates{" "}
              {pagination
                ? `(${pagination.totalCount} total)`
                : `(${advocates.length})`}
            </h2>
          </div>
          <div className="p-6">
            {advocates.length > 0 ? (
              <AdvocateTable advocates={advocates} />
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  {NO_ADVOCATES_FOUND_MESSAGE}
                </div>
              </div>
            )}
          </div>
          {pagination && (
            <Pagination
              pagination={pagination}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              currentPageSize={currentPageSize}
            />
          )}
        </div>
      </div>
    </Page>
  );
}
