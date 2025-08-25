export const memberColumns = (setViewMember) => [
  { name: "Member Id", selector: (row) => row.memberId, sortable: true },
  { name: "Member Name", selector: (row) => row.memberName, sortable: true },
  { name: "Business Category", selector: (row) => row.businessCategory, sortable: true },
  { name: "Company Name", selector: (row) => row.companyName, sortable: true },
  { name: "Mobile Number", selector: (row) => row.mobile, sortable: true },
  { name: "Email Id", selector: (row) => row.email, sortable: true },
  { name: "Membership", selector: (row) => row.membership, sortable: true },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-[20px] py-[6px] text-xs rounded-full font-semibold ${
          row.status === "Active"
            ? "bg-primary-350 text-primary-400"
            : "bg-primary-450 text-primary-500"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "Actions",
    cell: (row) => (
      <button
        className="text-primary-200 text-base rounded-2xl p-2"
        onClick={() => setViewMember(row)}
      >
        👁
      </button>
    ),
  },
];
