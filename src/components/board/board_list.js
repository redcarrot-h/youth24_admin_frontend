import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { boardActions } from '../../reduxs/actions/board_action';
import TableRow from './table_row';
import PageNavigation from './page_nav';
import { useState } from 'react';

const BoardList = () => {
  const dispatch = useDispatch();
  const { currentPage } = useParams();
  //검색어 세팅
  const [searchWord, setSearchWord] = useState('');
  //검색필터 세팅
  const [searchKey, setSearchKey] = useState('');

  //검색결과 세팅
  const boardSearch = useSelector((state) => state.board.boardSearch);
  const pv = useSelector((state) =>
    state.board.pv2 ? state.board.pv2 : { currentPage: 1 }
  ); // 값이 있으면 state.board.pv 이걸로, 없으면 1페이지를 가져 오도록

  //검색결과 가져오기
  const getBoardSearch = (currentPage, searchWord, searchKey) => {
    console.log('currentPage', currentPage);
    console.log('searchWord', searchWord);
    console.log('searchKey', searchKey);
    dispatch(boardActions.getBoardSearch(currentPage, searchWord, searchKey));
  };

  const pageNumbers = [];
  //일반 script를 작성하는 곳이라 반복문 사용가능하다.
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }
  //검색필터 handler 세팅
  const selectHandler = (e) => {
    setSearchKey(e.target.value);
  };

  //검색어 handler 세팅
  const queryHandler = (e) => {
    //특수문자 제외
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    setSearchWord(e.target.value.replace(reg, ''));
  };

  //위의 내용들이 실행되고 그 뒤 return 안의 내용들이 실행되고 그 후 useEffect가 실행되므로,
  //return 안에서 BoardList.length를 넣으면 항상 0이 나온다.
  const onSubmit = async (e) => {
    getBoardSearch(currentPage, searchWord, searchKey);
    console.log('memberSearch', boardSearch);
    console.log('pv', pv);
  };

  useEffect(() => {
    getBoardSearch(currentPage, searchWord, searchKey);
  }, []);

  return (
    <div>
      <Link className='btn btn-danger' to='/board/write'>
        글쓰기
      </Link>
      <h3 className='text-center'>문의 게시판</h3>
      <form onSubmit={onSubmit}>
        <div>
          <select className='searchKey' onChange={selectHandler}>
            <option value=''>전체</option>
            <option value='USER_KEYNUM'>작성자</option>
            <option value='QNA_TITLE'>제목</option>
            <option value='QNA_CONTENT'>내용</option>
          </select>
          <input
            type='text'
            className='form-control'
            name='searchWord'
            onChange={queryHandler}
          />
          <button className='btn btn-primary' type='button' onClick={onSubmit}>
            검색
          </button>
        </div>
      </form>
      <table className='table table-striped' style={{ marginTop: 20 }}>
        <colgroup>
          <col width='8%' />
          <col width='8%' />
          <col width='*' />
          <col width='12%' />
          <col width='12%' />
        </colgroup>

        <thead>
          <tr>
            <th>번호</th>
            <th>답변여부</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>비밀글여부</th>
          </tr>
        </thead>

        <tbody>
          {boardSearch &&
            boardSearch.map((board) => {
              return <TableRow board={board} key={board.qnaKeynum} />;
            })}
        </tbody>
      </table>

      {pv ? (
        pv.blockCount === undefined ? null : (
          <nav arial-label='...'>
            <ul className='pagination'>
              <li
                className={
                  pv.startPage <= 1 ? 'page-item disabled' : 'page-item'
                }
              >
                {/*& react에서는 a href="#!" 이렇게 해줘야 함*/}
                <span
                  className='page-link'
                  onClick={async () =>
                    getBoardSearch(
                      pv.startPage - pv.blockPage,
                      searchWord,
                      searchKey
                    )
                  }
                >
                  &laquo;
                </span>
              </li>

              {/* 페이지 이동하는 것 구현 */}
              {pageNumbers.map((pnum, idx) => (
                <li
                  className={
                    pv.currentPage === pnum ? 'page-item active' : null
                  }
                  aria-current={pv.currentPage === pnum ? 'page' : null}
                  key={pnum} //반복되어 수행되는 부분이기에 key값 줌
                >
                  <span
                    className='page-link'
                    onClick={async () =>
                      getBoardSearch(pnum, searchWord, searchKey)
                    }
                  >
                    {pnum}
                  </span>
                </li>
              ))}

              <li
                className={
                  pv.endPage >= pv.totalPage
                    ? 'page-item disabled'
                    : 'page-item'
                }
              >
                <span
                  className='page-link'
                  onClick={async () =>
                    getBoardSearch(
                      pv.startPage + pv.blockPage,
                      searchWord,
                      searchKey
                    )
                  }
                >
                  &raquo;
                </span>
              </li>
            </ul>
          </nav>
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default BoardList;
