import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { policyActions } from '../../reduxs/actions/policy_action';
import { useState } from 'react';
import TableRowDB from './table_row_DB';
import { useEffect } from 'react';

const PolicyDBList = () => {
  const dispatch = useDispatch();
  //검색어 세팅
  const [searchWord, setSearchWord] = useState('');
  //검색필터 세팅
  const [searchKey, setSearchKey] = useState('');
  const { currentPage } = useParams();

  //검색결과 세팅
  const policyDBSearch2 = useSelector((state) => state.policy.policyDBSearch2);
  const pv = useSelector((state) =>
    state.policy.pv3 ? state.policy.pv3 : { currentPage: 1 }
  ); // 값이 있으면 state.board.pv 이걸로, 없으면 1페이지를 가져 오도록

  //페이징 처리
  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  //검색결과 가져오기
  const getPolicyDBSearch2 = (currentPage, searchWord, searchKey) => {
    console.log('currentPage3', currentPage);
    console.log('searchWord', searchWord);
    console.log('searchKey', searchKey);
    dispatch(
      policyActions.getPolicyDBSearch2(currentPage, searchWord, searchKey)
    );
  };

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

  //검색 버튼 클릭 시 처리
  const onSubmit = async (e) => {
    getPolicyDBSearch2(currentPage, searchWord, searchKey);
    console.log('policyDBSearch2', policyDBSearch2);
    console.log('pv', pv);
  };
  useEffect(() => {
    getPolicyDBSearch2(currentPage, searchWord, searchKey);
  }, []);
  return (
    <div>
      <h3 className='text-center'>게시판 목록</h3>
      <form onSubmit={onSubmit}>
        <div>
          <select className='searchKey' onChange={selectHandler}>
            <option value=''>전체</option>
            <option value='POLICY_NAME'>정책명</option>
            <option value='POLICY_INTRODUCE'>정책소개</option>
            <option value='POLICY_CONTENT'>정책내용</option>
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
          <col width='*' />
          <col width='12%' />
          <col width='12%' />
        </colgroup>

        <thead>
          <tr>
            <th>정책코드</th>
            <th>정책명</th>
            <th>기업명</th>
            <th>나이</th>
          </tr>
        </thead>

        <tbody>
          {policyDBSearch2 &&
            policyDBSearch2.map((policy) => {
              return <TableRowDB policy={policy} key={policy.policyKeynum} />;
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
                    getPolicyDBSearch2(
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
                      getPolicyDBSearch2(pnum, searchWord, searchKey)
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
                    getPolicyDBSearch2(
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

export default PolicyDBList;
