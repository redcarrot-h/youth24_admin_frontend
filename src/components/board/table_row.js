import { Link } from 'react-router-dom';

const TableRow = (props) => {
  const { board } = props;

  return board.qnaStatus === 0 ? null : (
    <tr>
      <td>{board.qnaKeynum}</td>
      <td>{board.qnaStatus === 2 ? '답변완료' : '답변대기'}</td>
      <td>
        <Link to={`/board/view/${board.qnaKeynum}`}>{board.qnaTitle}</Link>
      </td>
      <td>{board.userKeynum}</td>
      <td>{board.qnaReadcount}</td>
      <td>{board.qnaSecret === 1 ? '비밀글' : '공개글'}</td>
    </tr>
  );
};

export default TableRow;
