import { Link } from 'react-router-dom';

const TableRow = (props) => {
  const { policy } = props;

  return (
    <tr>
      <td>{policy.policyId}</td>
      <td>
        <Link to={`/policy/view/${policy.policyId}`}>{policy.policyName}</Link>
      </td>
      <td>{policy.policyAgentName}</td>
      <td>{policy.policyAge}</td>
    </tr>
  );
};

export default TableRow;
