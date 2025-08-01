import { Advocate } from "@/app/types";

const AdvocateTableRow = ({
  advocate,
  index,
}: {
  readonly advocate: Advocate;
  readonly index: number;
}) => (
  <tr
    key={`${advocate.firstName}-${advocate.lastName}-${index}`}
    className="hover:bg-gray-50"
  >
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {advocate.firstName}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {advocate.lastName}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {advocate.city}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {advocate.degree}
    </td>
    <td className="px-6 py-4 text-sm text-gray-900">
      <div className="space-y-1">
        {advocate.specialties.map((specialty, specialtyIndex) => (
          <div
            key={specialtyIndex}
            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
          >
            {specialty}
          </div>
        ))}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {advocate.yearsOfExperience} years
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {advocate.phoneNumber}
    </td>
  </tr>
);

export default AdvocateTableRow;
