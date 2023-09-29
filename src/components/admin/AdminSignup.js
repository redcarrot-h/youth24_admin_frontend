import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../apiurl';
import Alert from '../util/Alert';

const AdminSignup = () => {
  const navigator = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [adminIdValid, setAdminIdValid] = useState(false);
  const [usableId, setUsableId] = useState(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPasswordValid, setAdminPasswordValid] = useState(false);
  const [pwCheck, setPwCheck] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminNameValid, setAdminNameValid] = useState(false);
  const [addrPopuptwo, setAddrPopuptwo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = { headers: { 'Content-Type': 'application/json' } };

  const idCheck = async (e) => {
    e.preventDefault();
    console.log('관리자 아이디 중복체크');
    await axios
      .post(`${baseUrl}/admin/signup/idCheck`, { adminId: adminId }, config)
      .then((response) => {
        if (response.data === 'retry') {
        } else if (response.data === 'no') {
          setUsableId(false);
        } else if (response.data === 'ok') {
          setUsableId(true);
        }
      })
      .catch((err) => {
        console.log('실패.....');
        console.error(err.message);
      });
  };

  const idCheckReset = () => {
    setUsableId(null);
    setAdminId('');
    setAdminIdValid(false);
  };

  const onSubmit = async (e) => {
    console.log('시도');
    e.preventDefault();
    //if (!adminId || !adminPassword || !adminName) {
    if (isSubmitting) {
      // alert("작성하지 않은 항목이 있습니다.");
      return;
    }
    setIsSubmitting(true);
    await axios
      .post(
        `${baseUrl}/`,
        {
          adminId: adminId,
          adminPassword: adminPassword,
          adminName: adminName,
        },
        config
      )
      .then((response) => {
        // setAdmin({
        //   adminId: "",
        //   adminPassword: "",
        //   adminName: "",
        // });
        setAddrPopuptwo(true);
        console.log('성공');
      })
      .catch((err) => {
        console.log('실패');
        console.error(err.message);
      });
  };

  const handleIdChange = (e) => {
    const id = e.target.value;
    setAdminId(id);
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,12}$/i;
    if (regex.test(id)) {
      setAdminIdValid(true);
    } else {
      setAdminIdValid(false);
    }
  };

  const [checkPw, setCheckPw] = useState('');

  const handlePwChange = (e) => {
    e.preventDefault();
    const password = e.target.value;
    setAdminPassword(password);
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/i;
    if (regex.test(password)) {
      setAdminPasswordValid(true);
    } else {
      setAdminPasswordValid(false);
    }

    // // pwChange 함수를 호출할 때 e 매개변수를 이벤트 객체로 전달합니다.
    // pwChange({ preventDefault: () => {}, target: { value: pwCheck } });
  };

  const pwChange = (e) => {
    e.preventDefault();
    setPwCheck(e.target.value);
    setCheckPw(e.target.value);
    if (adminPassword !== e.target.value) {
      setPwCheck('※ 비밀번호가 일치하지 않습니다.');
    } else {
      setPwCheck('');
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setAdminName(name);
    //한글 유효성 검사
    const regex = /[^ㄱ-ㅎ|가-힣]/;
    if (regex.test(name)) {
      setAdminNameValid(false);
    } else {
      setAdminNameValid(true);
    }
  };

  return (
    <>
      <div className='col-md-6'>
        <div className='card '>
          <h5 className='card-header pt-3 pb-3'>회원가입</h5>
          <div className='card-body pt-4 pb-4'>
            <form className='row g-3' onSubmit={onSubmit}>
              <div className='col-md-9'>
                <label htmlFor='inputEmail4' className='form-label'>
                  아이디
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='adminId'
                  name='adminId'
                  placeholder='아이디를 입력하세요.'
                  value={adminId}
                  onChange={handleIdChange}
                  readOnly={usableId === true}
                />
                <div className='IdErrMessage'>
                  {!adminIdValid && adminId.length > 0 && (
                    <div>
                      아이디를 확인해주세요. (영문소문자/숫자 포함, 4~12자){' '}
                    </div>
                  )}
                </div>
                {usableId === null && (
                  <p className='fs-6 text-secondary mt-3'>
                    ※ 아이디 중복확인을 진행해주세요.
                  </p>
                )}
                {usableId === false && (
                  <p className='fs-6 text-danger mt-3'>
                    ※ 이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.
                  </p>
                )}
                {usableId === true && (
                  <p className='fs-6 text-success mt-3'>
                    ※ 사용 가능한 아이디입니다.
                  </p>
                )}
              </div>

              <div className='col-md-3'>
                <label className='form-label'>&nbsp;</label>
                <div className='d-grid gap-2'>
                  {usableId !== true && (
                    <button
                      type='submit'
                      className='btn btn-secondary'
                      disabled={!adminIdValid}
                      onClick={idCheck}
                    >
                      중복확인
                    </button>
                  )}
                  {usableId === true && (
                    <button
                      className='submit_btn'
                      type='submit'
                      onClick={idCheckReset}
                    >
                      아이디 재설정
                    </button>
                  )}
                </div>
              </div>

              <div className='col-md-12'>
                <label htmlFor='inputPassword5' className='form-label'>
                  비밀번호
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='adminPassword'
                  value={adminPassword}
                  placeholder='비밀번호를 입력하세요.'
                  onChange={handlePwChange}
                />
                {!adminPasswordValid && adminPassword.length > 0 && (
                  <div className='fs-6 text-warning mt-3'>
                    ※ 영문, 특수문자, 숫자 포함 8~16자
                  </div>
                )}
              </div>

              <div className='col-md-12'>
                <label htmlFor='inputPassword2' className='form-label'>
                  비밀번호 확인
                </label>
                <input
                  type='password'
                  className='form-control'
                  name='pwCheck'
                  placeholder='비밀번호를 한 번 더 입력하세요.'
                  onChange={pwChange}
                />
                <div className='fs-6 text-warning mt-3'>
                  {pwCheck && <span>{pwCheck}</span>}
                </div>
              </div>

              <div className='col-md-12'>
                <label
                  htmlFor='inputPassword1'
                  className='form-label'
                  name='adminName'
                >
                  회원명
                </label>
                <input
                  type='text'
                  className='form-control'
                  name='adminName'
                  value={adminName}
                  placeholder='성명을 입력하세요.'
                  onChange={handleNameChange}
                />
                {!adminNameValid && adminName.length > 0 && (
                  <div className='fs-6 text-warning mt-3'>
                    ※ 한글만 입력 가능합니다.
                  </div>
                )}
              </div>

              <div className='col-12 mt-5'>
                <div className='d-grid gap-2'>
                  <button
                    disabled={
                      !usableId || !adminPassword || !adminName || isSubmitting
                    }
                    type='submit'
                    className='btn btn-primary'
                  >
                    가입완료
                  </button>
                  {addrPopuptwo && (
                    <Alert
                      offAlert={setAddrPopuptwo}
                      text={'회원가입이 완료되었습니다.'}
                      btntext={<Link to='/'>확인</Link>}
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignup;
