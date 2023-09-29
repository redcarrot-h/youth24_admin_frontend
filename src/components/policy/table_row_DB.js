import { Link, Navigate, NavLink } from 'react-router-dom';

const TableRowDB = (props) => {
  const { policy } = props;

  return (
    <tr>
      <td>{policy.policyId}</td>
      <td>
        <Link to={`/policyDB/view/${policy.policyKeynum}`}>
          {policy.policyName}
        </Link>
      </td>
      <td>{policy.policyAgentName}</td>
      <td>{policy.policyAge}</td>
    </tr>
  );
};

export default TableRowDB;
