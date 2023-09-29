import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { boardActions } from '../../reduxs/actions/board_action';

const BoardUpdate = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { qnaKeynum } = useParams();

  const [inputs, setInputs] = useState({
    userKeynum: '',
    qnaTitle: '',
    qnaContent: '',
  });

  const [qnaSecret, setQnaSecret] = useState('');

  const { userKeynum, qnaTitle, qnaContent } = inputs;

  const board = useSelector((state) => state.board.boardDetail);
  const pv = useSelector((state) => state.board.pv);

  useEffect(() => {
    setInputs(board);
  }, []);

  const handleValueChange = (e) => {
    e.preventDefault();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setInputs((prev) => {
      return { ...prev, ...nextState };
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('qnaKeynum', qnaKeynum);
    formData.append('userKeynum', userKeynum);
    formData.append('qnaTitle', qnaTitle);
    formData.append('qnaContent', qnaContent);
    formData.append('qnaSecret', qnaSecret);
    formData.append('currentPage', pv.currentPage);

    await dispatch(boardActions.getBoardUpdate(formData));

    setInputs({
      userKeynum: '',
      qnaTitle: '',
      qnaContent: '',
    });
    setQnaSecret('');

    navigator(`/board/list/${pv.currentPage}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInputs(board);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigator(-1);
  };

  return (
    <div>
      <form name='frm' encType='multipart/form-data'>
        <table className='table table-striped' style={{ marginTop: 20 }}>
          <tbody>
            <tr>
              <th width='20%'>글쓴이</th>
              {/* <td>{board.writer}</td> */}
              <td>
                <input
                  type='text'
                  name='userKeynum'
                  id='userKeynum'
                  //  defaultValue={board.subject}
                  value={userKeynum}
                  onChange={handleValueChange}
                />
              </td>
              <th width='20%'>등록일</th>
              <td>{board.qnaRegdate}</td>
            </tr>

            <tr>
              <th width='20%'>제목</th>
              <td colSpan='1'>
                <input
                  type='text'
                  name='qnaTitle'
                  id='qnaTitle'
                  //  defaultValue={board.subject}
                  value={qnaTitle}
                  onChange={handleValueChange}
                />
              </td>
              <th width='20%'>글번호</th>
              <td>{board.qnaKeynum}</td>
            </tr>

            <tr>
              <th>내용</th>
              <td colSpan='3'>
                <textarea
                  name='qnaContent'
                  id='qnaContent'
                  rows='13'
                  cols='40'
                  //   defaultValue={board.content} //왜..???
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
                  name='qnaSecret'
                  id='공개글'
                  value='0'
                  defaultChecked={board.qnaSecret === 0 ? true : false}
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
                  defaultChecked={board.qnaSecret === 1 ? true : false}
                  onChange={(e) => {
                    checkOnlyOne(e);
                  }}
                />
                비밀글
              </td>
            </tr>
          </tbody>
        </table>

        <button className='btn btn-primary' onClick={handleUpdate}>
          수정
        </button>
        <button className='btn btn-primary' onClick={handleReset}>
          취소
        </button>
        <button className='btn btn-primary' onClick={handleBack}>
          뒤로
        </button>
      </form>
    </div>
  );
};

export default BoardUpdate;
