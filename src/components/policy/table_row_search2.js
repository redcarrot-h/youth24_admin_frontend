import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { baseUrl } from '../../apiurl';

const TableRowSH = (props) => {
  const { policy } = props;

  const [usableId, setUsableId] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const idCheck = async (e) => {
    e.preventDefault();
    // console.log('정책id 중복 확인');
    // console.log(policy.policyId);
    await axios
      .post(`${baseUrl}/policy/write/idCheck`, policy)
      .then((response) => {
        setIsCheck(true);
        console.log('isCheck', isCheck);
        if (response.data === 'ok') {
          // alert('정책 등록 가능');
          console.log('정책 등록 가능');
          setUsableId(true);
          console.log('ok usableId', usableId);
        } else {
          alert('해당 정책이 이미 등록 되어있습니다');
          console.log('등록 불가');
          setUsableId(false);
          console.log('no usableId', usableId);
        }
      })
      .catch((err) => {
        console.log('policy', policy);
        console.error(err.message);
        setIsCheck(true);
      });
  };

  useEffect(() => {
    const idCheckLogic = async (e) => {
      e.preventDefault();

      // console.log('정책id 중복 확인');
      // console.log(policy.policyId);
      await axios
        .post(`${baseUrl}/policy/write/idCheck`, policy)
        .then((response) => {
          setIsCheck(true);
          console.log('isCheck', isCheck);
          if (response.data === 'ok') {
            // alert('정책 등록 가능');
            console.log('정책 등록 가능');
            setUsableId(true);
            console.log('ok usableId', usableId);
          } else {
            // alert('정책 등록 불가합니다..');
            console.log('등록 불가');
            setUsableId(false);
            console.log('no usableId', usableId);
          }
        })
        .catch((err) => {
          console.error(err.message);
          setIsCheck(true);
        });
    };

    idCheckLogic();
  }, [isCheck, usableId]);

  return (
    <tr>
      <td>
        <button
          type='button'
          className='btn btn-outline-secondary'
          onClick={idCheck}
        >
          {!isCheck ? (
            <Link
              to={`/policy/viewUP/${policy.policyId}`}
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={(e) => e.preventDefault()}
            >
              선택
            </Link>
          ) : usableId ? (
            <Link
              to={`/policy/viewUP/${policy.policyId}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              등록
            </Link>
          ) : (
            <Link
              to={`/policy/viewUP/${policy.policyId}`}
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={(e) => e.preventDefault()}
            >
              등록불가
            </Link>
          )}
        </button>
      </td>
      <td>{policy.policyId}</td>
      <td>{policy.policyName}</td>
      <td>{policy.policyAgentName}</td>
      <td>{policy.policyAge}</td>
    </tr>
  );
};

export default TableRowSH;
