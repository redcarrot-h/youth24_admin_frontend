import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { baseUrl } from '../../apiurl';
import Alert from '../util/Alert';

const AdminLogin = () => {
  const navigator = useNavigate();
  const [loginForm, setLoginForm] = useState({
    adminId: '',
    adminPassword: '',
  });

  const { adminId, adminPassword } = loginForm;
  /* 아이디 기억하기 */
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberAdminId']);
  const [addrPopup, setAddrPopup] = useState(false);

  const validPassword =
    //  /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;
    /^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,16}$/;
  const isValidLogin = !(loginForm.id && validPassword.test(loginForm.pw));

  const handleLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const config = { headers: { 'Content-Type': 'application/json' } };

  useEffect(() => {
    if (cookies.rememberAdminId !== undefined) {
      setLoginForm({ ...loginForm, adminId: cookies.rememberAdminId });
      setIsRemember(true);
    }
  }, []);

  const handleOnChange = (e) => {
    //체크박스 상태 업데이트
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      //쿠키에 adminId 값 저장, 유효기간 2000초
      setCookie('rememberAdminId', loginForm.adminId, { maxAge: 2000 });
    } else {
      //체크 안 되어 있으면 쿠키 삭제
      removeCookie('rememberAdminId');
    }
  };

  //입력한 로그인 정보 보내기
  const onSubmit = async (e) => {
    console.log('로그인 시작할게요');
    e.preventDefault();
    await axios
      .post(`${baseUrl}/login`, loginForm, config)
      .then((response) => {
        console.log('response: ', response.data);
        let jwtToken = response.headers.get('Authorization');
        console.log(jwtToken);

        let jwtAdminName = response.data.adminName;
        let jwtAdminId = response.data.adminId;
        let jwtAuthRole = response.data.authRole;
        let jwtAdminKeynum = response.data.adminKeynum;

        localStorage.setItem('Authorization', jwtToken);
        localStorage.setItem('adminId', jwtAdminId);
        localStorage.setItem('adminName', jwtAdminName);
        localStorage.setItem('authRole', jwtAuthRole);
        localStorage.setItem('isAdminLogin', 'true');
        localStorage.setItem('adminKeynum', jwtAdminKeynum);

        setLoginForm({ adminId: '', adminPassword: '' });
        console.log(localStorage.adminId);
      })
      .then((response) => {
        //window.location.replace("/user");
        console.log(localStorage.adminId);
        console.log(localStorage.adminName);
        console.log(localStorage.adminKeynum);
        //alert("로그인에 성공했습니다.");
        navigator('/admin/searchUser/1');
        //window.location.href = "/";
      })
      .catch((err) => {
        console.error(err.message);
        setAddrPopup(true);
        //window.location.href = "/";
      });
  };

  return (
    <>
      <div className='col-md-6'>
        {/* <div className='card text-bg-dark mb-4'> */}
        <div className='card'>
          <h5 className='card-header pt-3 pb-3'>
            {/* ---------------------문자열 테스트--------------------- */}
            {/* {lang.login.replace('{name}', loginForm.id)} */}
            {loginForm.id}
          </h5>
          <div className='card-body pt-4 pb-4'>
            <form className='row g-3' onSubmit={onSubmit}>
              <div className='col-md-6'>
                <label htmlFor='inputId' className='form-label'>
                  아이디
                </label>
                <input
                  type='text'
                  placeholder='아이디'
                  className='form-control'
                  value={adminId}
                  name='adminId'
                  onChange={handleLoginForm}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='pw' className='form-label'>
                  비밀번호
                </label>
                <input
                  type='password'
                  placeholder='비밀번호'
                  className='form-control'
                  name='adminPassword'
                  value={adminPassword}
                  onChange={handleLoginForm}
                />
              </div>

              <div className='d-flex bd-highlight'>
                <div className='form-check'>
                  <input
                    className='form-check-input bd-highlight'
                    type='checkbox'
                    id='idCheck'
                    onChange={handleOnChange}
                    checked={isRemember}
                  />
                  <label
                    className='form-check-label p-1 bd-highlight'
                    htmlFor='idCheck'
                  >
                    아이디 저장
                  </label>
                </div>
                <button
                  type='submit'
                  className='btn btn-primary ms-auto p-2 bd-highlight'
                  //disabled={isValidLogin}
                >
                  로그인
                </button>
                {addrPopup && (
                  <Alert
                    offAlert={setAddrPopup}
                    text={'아이디 또는 비밀번호를 확인해주세요.'}
                    btntext={'닫기'}
                  />
                )}
                {/* {isValidLogin ? (
                  <span>{isValidLogin} == f</span>
                ) : (
                  <span>{isValidLogin} == t</span>
                )} */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
