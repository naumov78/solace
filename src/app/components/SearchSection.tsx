const SearchSection = ({
  searchTerm,
  onSearchChange,
  onReset,
  onSearch,
}: {
  readonly searchTerm: string;
  readonly onSearchChange: (value: string) => void;
  readonly onReset: () => void;
  readonly onSearch: () => void;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="space-y-4">
      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Search Advocates
        </label>
        <div className="flex gap-3">
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, city, degree, specialties, or experience..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
          />
          <button
            onClick={onSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Search
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SearchSection;
