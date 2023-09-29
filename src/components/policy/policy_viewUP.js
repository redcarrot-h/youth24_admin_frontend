import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../apiurl';
import { policyActions } from '../../reduxs/actions/policy_action';

const PolicyViewUP = () => {
  const { policyId } = useParams();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const pv = useSelector((state) =>
    state.policy.pv ? state.policy.pv : { currentPage: 1 }
  );
  // 👇️ create a ref for the file input
  const inputRef = useRef(null);

  const [inputs, setInputs] = useState({
    policyName: '',
    policyBizType: '',
    policyBizTypeCode: '',
    policyBizTypeName: '',
    policyIntroduce: '',
    policyVolume: '',
    policyContent: '',
    policyAge: '',
    policyEmpStatus: '',
    policyEducation: '',
    policyMajor: '',
    policySplz: '',
    policyAgentName: '',
    policyRequestPeriod: '',
    policyRequestProcess: '',
    policyPrstnDtl: '',
    policyUrl: '',
    filename: null,
  });

  const {
    policyName,
    policyBizType,
    policyBizTypeCode,
    policyBizTypeName,
    policyIntroduce,
    policyVolume,
    policyContent,
    policyAge,
    policyEmpStatus,
    policyEducation,
    policyMajor,
    policySplz,
    policyAgentName,
    policyRequestPeriod,
    policyRequestProcess,
    policyPrstnDtl,
    policyUrl,
    filename,
  } = inputs;

  const info = async () => {
    return await axios
      .get(`${baseUrl}/policy/viewUP/${policyId}`)
      .then((response) => {
        setInputs({ ...response.data });
      });
  };
  useEffect(() => {
    info();
  }, []);

  //file은 처리방법이 다름 files 컬렉션이라서 0번째를 가지고 옴
  const handleFileChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
  };

  const handleValueChange = (e) => {
    e.preventDefault();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    // setInputs((prev) => {
    //   return { ...prev, ...nextState };
    // });
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleReset = (e) => {
    e.preventDefault();
    info();
    // 👇️ reset input value
    inputRef.current.value = null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('policyId', policyId);
    formData.append('policyName', policyName);
    formData.append('policyBizType', policyBizType);
    formData.append('policyBizTypeCode', policyBizTypeCode);
    formData.append('policyBizTypeName', policyBizTypeName);
    formData.append('policyIntroduce', policyIntroduce);
    formData.append('policyAgentName', policyAgentName);
    formData.append('policyVolume', policyVolume);
    formData.append('policyContent', policyContent);
    formData.append('policyAge', policyAge);
    formData.append('policyEmpStatus', policyEmpStatus);
    formData.append('policyEducation', policyEducation);
    formData.append('policyMajor', policyMajor);
    formData.append('policySplz', policySplz);
    formData.append('policyRequestPeriod', policyRequestPeriod);
    formData.append('policyRequestProcess', policyRequestProcess);
    formData.append('policyPrstnDtl', policyPrstnDtl);
    formData.append('policyUrl', policyUrl);
    console.log('filename:', filename);
    if (filename != null) formData.append('filename', filename);

    await axios.post(`${baseUrl}/policy/write`, formData);

    setInputs({
      policyName: '',
      policyBizType: '',
      policyBizTypeCode: '',
      policyBizTypeName: '',
      policyIntroduce: '',
      policyVolume: '',
      policyContent: '',
      policyAge: '',
      policyEmpStatus: '',
      policyEducation: '',
      policyMajor: '',
      policySplz: '',
      policyAgentName: '',
      policyRequestPeriod: '',
      policyRequestProcess: '',
      policyPrstnDtl: '',
      policyUrl: '',
      filename: null,
    });

    navigator(
      `/policyDB/list/${pv.currentPage ? pv.currentPage : { currentPage: 1 }}`
    );
  };

  return (
    <>
      <h1>정책정보 등록</h1>
      <form onSubmit={onSubmit}>
        <table className='table table-striped' style={{ marginTop: 20 }}>
          <tbody>
            <tr>
              <th width='20%'>정책아이디</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyId'
                  id='policyId'
                  style={{ width: '95%' }}
                  value={policyId}
                  onChange={handleValueChange}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th width='20%'>기관 및 지자체 구분</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyBizType'
                  id='policyBizType'
                  style={{ width: '95%' }}
                  value={policyBizType}
                  onChange={handleValueChange}
                  readOnly
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>정책유형코드</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyBizTypeCode'
                  id='policyBizTypeCode'
                  style={{ width: '95%' }}
                  value={policyBizTypeCode}
                  onChange={handleValueChange}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th width='20%'>정책유형명</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyBizTypeName'
                  id='policyBizTypeName'
                  style={{ width: '95%' }}
                  value={policyBizTypeName}
                  onChange={handleValueChange}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th width='20%'>정책명</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyName'
                  id='policyName'
                  style={{ width: '95%' }}
                  value={policyName}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>정책소개</th>
              <td colSpan='5'>
                <textarea
                  name='policyIntroduce'
                  id='policyIntroduce'
                  rows='3'
                  cols='40'
                  style={{ width: '95%' }}
                  value={policyIntroduce}
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr>

            <tr>
              <th width='20%'>지원규모</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyVolume'
                  id='policyVolume'
                  style={{ width: '95%' }}
                  value={policyVolume}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>지원내용</th>
              <td colSpan='5'>
                <textarea
                  name='policyContent'
                  id='policyContent'
                  rows='3'
                  cols='40'
                  style={{ width: '95%' }}
                  value={policyContent}
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr>

            <tr>
              <th width='20%'>연령</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyAge'
                  id='policyAge'
                  style={{ width: '95%' }}
                  value={policyAge}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>취업상태</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyEmpStatus'
                  id='policyEmpStatus'
                  style={{ width: '95%' }}
                  value={policyEmpStatus}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>학력</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyEducation'
                  id='policyEducation'
                  style={{ width: '95%' }}
                  value={policyEducation}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>전공</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyMajor'
                  id='policyMajor'
                  style={{ width: '95%' }}
                  value={policyMajor}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>특화분야</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policySplz'
                  id='policySplz'
                  style={{ width: '95%' }}
                  value={policySplz}
                  onChange={handleValueChange}
                />
              </td>
            </tr>
            <tr>
              <th width='20%'>정책부서</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyAgentName'
                  id='policyAgentName'
                  style={{ width: '95%' }}
                  value={policyAgentName}
                  onChange={handleValueChange}
                />
              </td>
            </tr>
            <tr>
              <th width='20%'>신청기간</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyRequestPeriod'
                  id='policyRequestPeriod'
                  style={{ width: '95%' }}
                  value={policyRequestPeriod}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>신청절차</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyRequestProcess'
                  id='policyRequestProcess'
                  style={{ width: '95%' }}
                  value={policyRequestProcess}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>심사발표</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyPrstnDtl'
                  id='policyPrstnDtl'
                  style={{ width: '95%' }}
                  value={policyPrstnDtl}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>사이트링크주소</th>
              <td colSpan='5'>
                <input
                  type='text'
                  name='policyUrl'
                  id='policyUrl'
                  style={{ width: '95%' }}
                  value={policyUrl}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th width='20%'>정책이미지</th>
              <td colSpan='5'>
                <input
                  type='file'
                  name='filename'
                  id='filepath'
                  onChange={handleFileChange}
                  ref={inputRef}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input
          type='submit'
          className='btn btn-primary'
          value='정부정책 등록'
        />
        <button className='btn btn-outline-secondary' onClick={handleReset}>
          취소
        </button>
        <button
          className='btn btn-outline-secondary'
          onClick={() => navigator(`/policy/search2/1}`)}
        >
          LIST
        </button>
      </form>
    </>
  );
};

export default PolicyViewUP;
