import { useSelector } from 'react-redux';

const PageNavigation = ({ getPolicyList }) => {
  const pv = useSelector((state) =>
    state.policy.pv ? state.policy.pv : { currentPage: 1 }
  ); //여기에서 pv 받아올 것임

  const pageNumbers = [];
  //일반 script를 작성하는 곳이라 반복문 사용가능하다.
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav arial-label='...'>
      <ul className='pagination'>
        <li className={pv.startPage <= 1 ? 'page-item disabled' : 'page-item'}>
          {/*& react에서는 a href="#!" 이렇게 해줘야 함*/}
          <span
            className='page-link'
            onClick={() => getPolicyList(pv.startPage - pv.blockPage)}
          >
            &laquo;
          </span>
        </li>

        {/* 페이지 이동하는 것 구현 */}
        {pageNumbers.map((pnum, idx) => (
          <li
            className={pv.currentPage === pnum ? 'page-item active' : null}
            aria-current={pv.currentPage === pnum ? 'page' : null}
            key={pnum} //반복되어 수행되는 부분이기에 key값 줌
          >
            <span className='page-link' onClick={() => getPolicyList(pnum)}>
              {pnum}
            </span>
          </li>
        ))}

        <li
          className={
            pv.endPage >= pv.totalPage ? 'page-item disabled' : 'page-item'
          }
        >
          <span
            className='page-link'
            onClick={() => getPolicyList(pv.startPage + pv.blockPage)}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;
