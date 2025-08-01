import AdvocateTableRow from "./AdvocateTableRow";
import { Advocate } from "@/app/types";

const AdvocateTableBody = ({
  advocates,
}: {
  readonly advocates: readonly Advocate[];
}) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {advocates.map((advocate, index) => (
      <AdvocateTableRow
        key={`${advocate.firstName}-${advocate.lastName}-${index}`}
        advocate={advocate}
        index={index}
      />
    ))}
  </tbody>
);

export default AdvocateTableBody;
