import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { boardActions } from '../../reduxs/actions/board_action';

const BoardWrite = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    userKeynum: '',
    qnaTitle: '',
    qnaContent: '',
    qnaSecret: '',
    qnaRef: '',
  });

  const [qnaSecret, setQnaSecret] = useState('');

  const { userKeynum, qnaTitle, qnaContent, qnaRef } = inputs;

  const { qnaKeynum } = useParams();

  const pv = useSelector((state) =>
    state.board.pv ? state.board.pv : { currentPage: 1 }
  );

  const boardDetail = useSelector((state) => state.board.boardDetail);

  const handleValueChange = (e) => {
    //하기와 같이 setInputs는 3가지 방법으로 쓸 수 있음
    // let nextState = {};
    // nextState[e.target.name] = e.target.value;
    // setInputs({ ...inputs, ...nextState });

    // setInputs({ ...inputs, [e.target.name]: e.target.value });

    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const checkOnlyOne = (id) => {
    // console.log('id', id);
    let checkPick = document.getElementsByName('qnaSecret');
    Array.prototype.forEach.call(checkPick, function (el) {
      // console.log('el', el);
      el.checked = false;
    });
    id.target.checked = true;
    setQnaSecret(id.target.defaultValue);
  };

  const onSubmit = async (e) => {
    if (qnaSecret === '') {
      alert('비밀글 여부를 체크해주세요!');
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append('qnaTitle', qnaTitle);
    formData.append('qnaContent', qnaContent);
    formData.append('qnaSecret', qnaSecret);
    formData.append('userKeynum', userKeynum);

    //답변글이면..
    if (qnaKeynum !== undefined) {
      formData.append('qnaKeynum', boardDetail.qnaKeynum);
      formData.append('qnaRef', boardDetail.qnaRef);
    }

    await dispatch(boardActions.getBoardWrite(formData));

    setInputs({
      qnaTitle: '',
      qnaContent: '',
      qnaSecret: '',
      qnaRef: '',
    });

    navigator(
      `/board/list/${pv.currentPage ? pv.currentPage : { currentPage: 1 }}`
    );
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td width='20%' align='center'>
                글쓴이
              </td>
              <td>
                <input
                  type='text'
                  value={userKeynum}
                  name='userKeynum'
                  onChange={handleValueChange}
                />
              </td>
            </tr>
            <tr>
              <td width='20%' align='center'>
                제목
              </td>
              <td>
                <input
                  type='text'
                  name='qnaTitle'
                  size='40'
                  value={qnaTitle}
                  placeholder={qnaKeynum !== undefined ? '답변' : null}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <td width='20%' align='center'>
                내용
              </td>
              <td>
                <textarea
                  name='qnaContent'
                  rows='13'
                  cols='40'
                  value={qnaContent}
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td width='20%' align='center'>
                비밀글 여부
              </td>
              <td>
                <input
                  type='checkbox'
                  id='공개글'
                  name='qnaSecret'
                  value='0'
                  onChange={(e) => {
                    checkOnlyOne(e);
                  }}
                />
                공개글
                <input
                  type='checkbox'
                  id='비밀글'
                  name='qnaSecret'
                  value='1'
                  onChange={(e) => {
                    checkOnlyOne(e);
                  }}
                />
                비밀글
              </td>
            </tr>
          </tbody>
        </table>
        <Link className='btn btn-primary' to={`/board/list/${pv.currentPage}`}>
          리스트
        </Link>
        <input type='submit' className='btn btn-primary' value='등록' />
      </form>
    </>
  );
};

export default BoardWrite;
