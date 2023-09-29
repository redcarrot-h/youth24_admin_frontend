import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { policyActions } from '../../reduxs/actions/policy_action';

const PolicyViewDB = () => {
  const { policyKeynum } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const policyDBDetail = useSelector((state) => state.policy.policyDBDetail);
  const pv = useSelector((state) => state.policy.pv);
  //console.log('policyKeynum', policyKeynum);

  //   download
  const handleDownload = async () => {
    const boardFile = await dispatch(
      policyActions.getPolicyDownload(policyDBDetail.policyImages)
    );

    const fileName = policyDBDetail.policyImages.substring(
      policyDBDetail.policyImages.indexOf('_') + 1
    );
    console.log(fileName);

    const url = window.URL.createObjectURL(new Blob([boardFile]), {
      type: 'application/octet-stream',
    });

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.style.cssText = 'display:none';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(policyActions.getPolicyDelete(policyKeynum));
    // navigator(`/board/list/${pv.currentPage}`);
    //안되면 window.location.replace 쓰기
    window.location.replace(`/policyDB/list/${pv.currentPage}`);
  };

  useEffect(() => {
    dispatch(policyActions.getPolicyDBDetail(policyKeynum));
    console.log('view', policyKeynum);
    console.log('policyDBDetail', policyDBDetail);
  }, [dispatch, policyKeynum]);

  return (
    <>
      <table className='table table-stribed' style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width='20%'>정책키번호</th>
            <td colSpan='5'>{policyKeynum}</td>
          </tr>
          <tr>
            <th width='20%'>정책아이디</th>
            <td colSpan='5'>{policyDBDetail.policyId}</td>
          </tr>
          <tr>
            <th width='20%'>기관 및 지자체 구분</th>
            <td colSpan='5'>{policyDBDetail.policyBizType}</td>
          </tr>
          <tr>
            <th width='20%'>정책유형코드</th>
            <td colSpan='5'>{policyDBDetail.policyBizTypeCode}</td>
          </tr>
          <tr>
            <th width='20%'>정책유형명</th>
            <td colSpan='5'>{policyDBDetail.policyBizTypeName}</td>
          </tr>
          <tr>
            <th width='20%'>정책명</th>
            <td colSpan='5'>{policyDBDetail.policyName}</td>
          </tr>

          <tr>
            <th width='20%'>정책소개</th>
            <td colSpan='5' style={{ whiteSpace: 'pre-wrap' }}>
              {policyDBDetail.policyIntroduce}
            </td>
          </tr>

          <tr>
            <th width='20%'>정책부서</th>
            <td colSpan='5'>{policyDBDetail.policyAgentName}</td>
          </tr>
          <tr>
            <th width='20%'>지원규모</th>
            <td colSpan='5'>{policyDBDetail.policyVolume}</td>
          </tr>
          <tr>
            <th width='20%'>지원내용</th>
            <td colSpan='5' style={{ whiteSpace: 'pre-wrap' }}>
              {policyDBDetail.policyContent}
            </td>
          </tr>
          <tr>
            <th width='20%'>연령</th>
            <td colSpan='5'>{policyDBDetail.policyAge}</td>
          </tr>
          <tr>
            <th width='20%'>취업상태</th>
            <td colSpan='5'>{policyDBDetail.policyEmpStatus}</td>
          </tr>
          <tr>
            <th width='20%'>학력</th>
            <td colSpan='5'>{policyDBDetail.policyEducation}</td>
          </tr>
          <tr>
            <th width='20%'>전공</th>
            <td colSpan='5'>{policyDBDetail.policyMajor}</td>
          </tr>

          <tr>
            <th width='20%'>특화분야</th>
            <td colSpan='5'>{policyDBDetail.policySplz}</td>
          </tr>

          <tr>
            <th width='20%'>정책부서</th>
            <td colSpan='5'>{policyDBDetail.policyAgentName}</td>
          </tr>

          <tr>
            <th width='20%'>신청기간</th>
            <td colSpan='5'>{policyDBDetail.policyRequestPeriod}</td>
          </tr>
          <tr>
            <th width='20%'>신청절차</th>
            <td colSpan='5'>{policyDBDetail.policyRequestProcess}</td>
          </tr>

          <tr>
            <th width='20%'>심사발표</th>
            <td colSpan='5'>{policyDBDetail.policyPrstnDtl}</td>
          </tr>

          <tr>
            <th width='20%'>사이트링크주소</th>
            <td colSpan='5'>{policyDBDetail.policyUrl}</td>
          </tr>

          <tr>
            <th width='20%'>정책이미지</th>
            <td colSpan='5'>
              <button onClick={handleDownload}>
                {policyDBDetail.policyImages
                  ? policyDBDetail.policyImages.substring(
                      policyDBDetail.policyImages.indexOf('_') + 1
                    )
                  : null}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Link className='btn btn-primary' to={`/policyDB/update/${policyKeynum}`}>
        수정
      </Link>
      <button className='btn btn-primary' onClick={handleDelete}>
        삭제
      </button>
      <button
        className='btn btn-outline-secondary'
        onClick={() => Navigate(-1)}
      >
        리스트
      </button>
    </>
  );
};

export default PolicyViewDB;
