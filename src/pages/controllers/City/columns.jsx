import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export const cityColumns = ({ setEditData, deleteCity }) => [
  {
    name: "No.",
    selector: (_, index) => index + 1,
  },
  {
    name: "City Name",
    selector: (row) => row.cityName,
    sortable: true,
  },
  {
    name: "City Code",
    selector: (row) => row.cityCode,
    sortable: true,
  },

  {
    name: "Actions",
    cell: (row) => (
      <div className="flex gap-3">
        <button
          className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          onClick={() => setEditData(row)}
        > <FaRegEdit /></button>
        <button
          className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          onClick={() => deleteCity(row.id)}
        ><MdDeleteOutline /></button>
        <button
          className="text-primary-400 px-2 py-1 border-primary-400 border  font-semibold rounded-full whitespace-nowrap"
          onClick={() => deleteState(index)}
        >
          Active
        </button>
        <button
          className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap"
          onClick={() => deleteState(index)}
        >
          Deactive
        </button>
      </div>
    ),
  },
];
