import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../apiurl';
import { adminActions } from '../../reduxs/actions/admin_action';

const AdminAdmin = () => {
  const dispatch = useDispatch();
  const { currentPage } = useParams();
  //검색어 세팅
  const [searchWord, setSearchWord] = useState('');
  //검색필터 세팅
  const [searchKey, setSearchKey] = useState('');
  //검색결과 세팅
  const adminSearch = useSelector((state) => state.admin.adminSearch);

  const pv = useSelector((state) =>
    state.admin.pv ? state.admin.pv : { currentPage: 1 }
  );
  //페이징 번호 구하기
  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  //검색결과 가져오기
  const getAdminSearch = (currentPage, searchWord, searchKey) => {
    console.log('currentPage', currentPage);
    console.log('searchWord', searchWord);
    console.log('searchKey', searchKey);
    dispatch(adminActions.getAdminSearch(currentPage, searchWord, searchKey));
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
  const onSubmit = async () => {
    getAdminSearch(currentPage, searchWord, searchKey);
    if (!searchKey) {
      return;
    }
    //console.log("memberSearch", memberSearch);
    //console.log("pv", pv);
  };

  //렌더링 시 전체 보기
  useEffect(() => {
    getAdminSearch(currentPage, searchWord, searchKey);
  }, []);

  const config = { headers: { 'Content-Type': 'application/json' } };

  return (
    <>
      <title>Admin :: 청년24 - 회원관리</title>

      <div className='col-md-12'>
        <div className='card '>
          <h5 className='card-header pt-3 pb-3'>관리자현황</h5>

          <div className='card-body pt-4 pb-4 adminLineformBack'>
            <form className='adminLineform' onSubmit={onSubmit}>
              <div className='d-grid gap-2'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={onSubmit}
                  disabled={!searchKey}
                >
                  조회하기
                </button>
              </div>
              <input
                type='text'
                className='form-control'
                name='searchWord'
                onChange={queryHandler}
              />
              <select
                className='form-select'
                onChange={selectHandler}
                value={searchKey}
              >
                <option value=''>선택</option>
                <option value='ADMIN_ID'>아이디</option>
                <option value='ADMIN_NAME'>이름</option>
              </select>
            </form>
          </div>

          <table className='table  text-center'>
            <colgroup>
              <col style={{ width: '50px' }} />
              <col />
              <col />
              <col />
              <col style={{ width: '80px' }} />
              <col />
              <col />
              <col style={{ width: '200px' }} />
            </colgroup>
            <thead>
              <tr>
                <th scope='col' className='text-start'>
                  #
                </th>
                <th scope='col'></th>
                <th scope='col'>아이디</th>
                <th scope='col'></th>
                <th scope='col'>관리자명</th>
                <th scope='col'></th>
                <th scope='col'></th>
                <th scope='col' className='text-end'></th>
              </tr>
            </thead>

            <tbody>
              {adminSearch &&
                adminSearch.map((admin) => {
                  return (
                    <tr key={admin.adminKeynum}>
                      <td>{admin.adminKeynum}</td>
                      <td></td>
                      <td>{admin.adminId}</td>
                      <td></td>
                      <td>{admin.adminName}</td>
                      <td></td>
                      <td></td>
                      <td className='text-end'>
                        <Link to={`/admin/adminview/${admin.adminKeynum}`}>
                          <button
                            type='button'
                            className='btn btn-secondary me-2'
                          >
                            상세
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {pv ? (
            pv.blockCount === undefined ? null : (
              <nav arial-label='...'>
                <ul className='pagination justify-content-center pt-4 pb-4'>
                  <li
                    className={
                      pv.startPage <= 1 ? 'page-item disabled' : 'page-item'
                    }
                  >
                    {/*& react에서는 a href="#!" 이렇게 해줘야 함*/}
                    <a
                      className='page-link'
                      onClick={async () =>
                        getAdminSearch(
                          pv.startPage - pv.blockPage,
                          searchWord,
                          searchKey
                        )
                      }
                    >
                      &lt;&lt;
                    </a>
                  </li>
                  <li
                    className={
                      pv.currentPage > 1 ? 'page-item ' : 'page-item disabled'
                    }
                  >
                    <a
                      className='page-link'
                      onClick={async () =>
                        getAdminSearch(
                          pv.currentPage - 1,
                          searchWord,
                          searchKey
                        )
                      }
                    >
                      &lt;
                    </a>
                  </li>

                  {/* 페이지 이동하는 것 구현 */}
                  {pageNumbers.map((pnum, idx) => (
                    <li className='page-item' key={pnum}>
                      <a
                        className={
                          pv.currentPage === pnum
                            ? 'page-link active'
                            : 'page-link'
                        }
                        onClick={async () =>
                          getAdminSearch(pnum, searchWord, searchKey)
                        }
                      >
                        {pnum}
                      </a>
                    </li>
                  ))}

                  <li
                    className={
                      pv.currentPage < pv.totalPage
                        ? 'page-item'
                        : 'page-item disabled'
                    }
                  >
                    <a
                      className='page-link'
                      onClick={async () =>
                        getAdminSearch(
                          pv.currentPage + 1,
                          searchWord,
                          searchKey
                        )
                      }
                    >
                      &gt;
                    </a>
                  </li>

                  <li
                    className={
                      pv.endPage >= pv.totalPage
                        ? 'page-item disabled'
                        : 'page-item'
                    }
                  >
                    <a
                      className='page-link'
                      onClick={async () =>
                        getAdminSearch(
                          pv.startPage + pv.blockPage,
                          searchWord,
                          searchKey
                        )
                      }
                    >
                      &gt;&gt;
                    </a>
                  </li>
                </ul>
              </nav>
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default AdminAdmin;
