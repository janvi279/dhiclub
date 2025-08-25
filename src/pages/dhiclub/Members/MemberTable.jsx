import DataTable from "react-data-table-component";

const customStyles = {
  headRow: {
    style: { backgroundColor: "#F5F8FD", borderRadius: "10px" },
  },
  headCells: {
    style: { fontSize: "14px", fontWeight: 600, color: "#061237" },
  },
  cells: {
    style: { fontSize: "13px", color: "#061237", fontWeight: 500 },
  },
};

const MemberTable = ({ data, columns }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      highlightOnHover
      striped
      customStyles={customStyles}
    />
  );
};

export default MemberTable;
