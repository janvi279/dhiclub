const TransactionDetails = ({ member }) => (
  <div className="grid  gap-x-8 gap-y-2">
    <div><span className="text-sm font-medium">Transaction ID :</span> <span className="ml-2 text-sm">{member.transactionId}</span></div>
    <div><span className="text-sm font-medium">Payment Type :</span> <span className="ml-2 text-sm">{member.paymentType}</span></div>
    <div><span className="text-sm font-medium">Net Amount :</span> <span className="ml-2 text-sm">{member.netAmount}</span></div>
    <div><span className="text-sm font-medium">Membership Duration :</span> <span className="ml-2 text-sm">{member.membershipDuration}</span></div>
  </div>
);

export default TransactionDetails;
    