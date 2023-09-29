import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { policyActions } from '../../reduxs/actions/policy_action';

const PolicyUpdate = () => {
  const { policyId } = useParams();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const policyDetail = useSelector((state) => state.policy.policyDetail);
  const pv = useSelector((state) => state.policy.pv);

  useEffect(() => {
    dispatch(policyActions.getPolicyDetail(policyId));
    console.log('view', policyId);
  }, [dispatch, policyId]);
  return (
    <div>
      <table className='table table-stribed' style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width='20%'>정책아이디</th>
            <td>{policyDetail.policyId}</td>
          </tr>

          <tr>
            <th>정책명</th>
            <td colSpan='3'>{policyDetail.policyName}</td>
          </tr>

          <tr>
            <th>정책소개</th>
            <td colSpan='3'>{policyDetail.policyIntroduce}</td>
          </tr>

          <tr>
            <th>정책부서</th>
            <td colSpan='3' style={{ whiteSpace: 'pre-line' }}>
              {policyDetail.policyAgentName}
            </td>
          </tr>
        </tbody>
      </table>
      <Link className='btn btn-primary' to={`/policy/list/${pv.currentPage}`}>
        리스트
      </Link>
    </div>
  );
};

export default PolicyUpdate;
