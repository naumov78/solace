import AdvocateTableHeader from "./AdvocateTableHeader";
import AdvocateTableBody from "./AdvocateTableBody";

const AdvocateTable = ({
  advocates,
}: {
  readonly advocates: readonly Advocate[];
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
      <AdvocateTableHeader />
      <AdvocateTableBody advocates={advocates} />
    </table>
  </div>
);

export default AdvocateTable;
