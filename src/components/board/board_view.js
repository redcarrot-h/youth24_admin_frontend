import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { boardActions } from '../../reduxs/actions/board_action';

const BoardView = () => {
  const { qnaKeynum } = useParams();
  const dispatch = useDispatch();
  const [qnaContent, setQnaContent] = useState('');

  const boardDetail = useSelector((state) => state.board.boardDetail);
  //   const boardFile = useSelector((state) => state.board.boardFile);
  const pv = useSelector((state) => state.board.pv);
  const boardAdminDetail = useSelector((state) => state.board.boardAdminDetail);
  const handleValueChange = (e) => {
    setQnaContent(e.target.value);
  };

  useEffect(() => {
    dispatch(boardActions.getBoardDetail(qnaKeynum));
    dispatch(boardActions.getBoardAdminDetail(qnaKeynum));
  }, [dispatch, qnaKeynum]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(boardActions.getBoardDelete(qnaKeynum));
    //진짜 삭제하려면
    //dispatch(boardActions.getBoardRealDelete(qnaKeynum));
    window.location.replace(`/board/list/${pv.currentPage}`);
  };

  const handleAdminDelete = (e) => {
    e.preventDefault();
    dispatch(boardActions.getBoardAdminDelete(qnaKeynum));
    //진짜 삭제하려면
    //dispatch(boardActions.getBoardRealDelete(qnaKeynum));
    window.location.replace(`/board/list/${pv.currentPage}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('qnaContent', qnaContent);
    formData.append('userKeynum', boardDetail.userKeynum);
    formData.append('qnaTitle', '답변글');
    formData.append('adminKeynum', localStorage.getItem('adminKeynum'));
    console.log(localStorage.getItem('adminKeynum'));
    //답변글이면..
    if (qnaKeynum !== undefined) {
      formData.append('qnaKeynum', boardDetail.qnaKeynum);
      formData.append('qnaRef', boardDetail.qnaRef);
      formData.append('qnaSecret', boardDetail.qnaSecret);
    }

    await dispatch(boardActions.getBoardAdminWrite(formData));

    setQnaContent('');
    window.location.replace(`/board/view/${qnaKeynum}`);
  };

  return (
    <>
      <div>
        <table className='table table-stribed' style={{ marginTop: 20 }}>
          <tbody>
            <tr>
              <th width='20%'>글쓴이</th>
              <td>
                {boardDetail.membersDTO === undefined
                  ? null
                  : boardDetail['membersDTO']['userId']}
              </td>
              <th width='20%'>조회수</th>
              <td>{boardDetail.qnaReadcount}</td>
            </tr>

            <tr>
              <th>제목</th>
              <td colSpan='3'>{boardDetail.qnaTitle}</td>
            </tr>

            <tr>
              <th>내용</th>
              <td colSpan='3' style={{ whiteSpace: 'pre-line' }}>
                {boardDetail.qnaContent}
              </td>
            </tr>
            <tr>
              <th>비밀글 여부</th>
              <td colSpan='3' style={{ whiteSpace: 'pre-line' }}>
                {boardDetail.qnaSecret === 1 ? '비밀글' : '공개글'}
              </td>
            </tr>
          </tbody>
        </table>
        <Link className='btn btn-primary' to={`/board/list/${pv.currentPage}`}>
          리스트
        </Link>
        <button className='btn btn-primary' onClick={handleDelete}>
          게시글 삭제
        </button>
        {boardAdminDetail && boardAdminDetail.qnaStatus !== 0 ? (
          <>
            <table>
              <tbody>
                <tr>
                  <td width='20%' align='center'>
                    내용
                  </td>
                  <td>{boardAdminDetail.qnaContent}</td>
                </tr>
              </tbody>
            </table>

            <button className='btn btn-primary' onClick={handleAdminDelete}>
              답변 삭제
            </button>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            <table>
              <tbody>
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
              </tbody>
            </table>

            <input
              type='submit'
              className='btn btn-primary'
              value='댓글 등록'
            />
          </form>
        )}
      </div>
    </>
  );
};

export default BoardView;
