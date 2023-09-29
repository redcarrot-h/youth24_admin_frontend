import { useState } from 'react';
import TableRow from './table_row_search2';
import axios from 'axios';
import { baseUrl } from '../../apiurl';
import { useEffect } from 'react';
import { useRef } from 'react';
import TableRowSH from './table_row_search2';

//더보기용 검색 페이지
const PolicySearch2 = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageforSrc, SetTotalPageforSrc] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //검색어
  const [query2, setQuery2] = useState('');

  const [pv2, setPV2] = useState([]);
  //지역
  const [srchPolyBizSecd2, setSrchPolyBizSecd2] = useState('');
  //정책유형
  const [bizTycdSel2, setBizTycdSel2] = useState('');

  const baseUrlforMoreLoading = `${baseUrl}/policy/search2/${page}`;

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
    }, deps);
  };

  //다중 지역 세팅
  const srchSingleCheck = (id) => {
    const checklist = 'input[name="srchPolyBizSecd"]:checked';
    const totallist = 'input[name="srchPolyBizSecd"]';
    const selectedEls = document.querySelectorAll(checklist);
    const totalEls = document.querySelectorAll(totallist);
    console.log('id', id.target.defaultValue);
    // 단일 선택 시 체크된 아이템을 배열에 추가
    let result = '';
    selectedEls.forEach((el) => {
      result += el.value + ',';
    });
    setSrchPolyBizSecd2(result);
    console.log('srchPolyBizSecd2', srchPolyBizSecd2);
    if (id.target.checked) {
      let checkPick = document.getElementsByName('srchPolyBizSecd_all');
      Array.prototype.forEach.call(checkPick, function (el) {
        el.checked = false;
      });
    }
    if (selectedEls.length === totalEls.length) {
      let checkPick = document.getElementsByName('srchPolyBizSecd_all');
      Array.prototype.forEach.call(checkPick, function (el) {
        el.checked = true;
      });
    } else {
      let checkPick = document.getElementsByName('srchPolyBizSecd_all');

      Array.prototype.forEach.call(checkPick, function (el) {
        el.checked = false;
      });
    }
  };
  //다중 지역 전체 체크 세팅
  const srchAllCheck = (e) => {
    const checklist = 'input[name="srchPolyBizSecd"]';
    if (e.target.checked) {
      const selectedEls = document.querySelectorAll(checklist);
      let result = '';
      selectedEls.forEach((el) => {
        result += el.value + ',';
      });
      setSrchPolyBizSecd2(result);
    } else {
      setSrchPolyBizSecd2('');
    }
    console.log('srchPolyBizSecd2', srchPolyBizSecd2);

    let checkPick = document.getElementsByName('srchPolyBizSecd');
    Array.prototype.forEach.call(checkPick, function (el) {
      // console.log('el', el);
      el.checked = false;
    });
  };

  //다중정책세팅
  const bizTySingleCheck = (id) => {
    const checklist = 'input[name="bizTycdSel"]:checked';
    const totallist = 'input[name="bizTycdSel"]';
    const selectedEls = document.querySelectorAll(checklist);
    const totalEls = document.querySelectorAll(totallist);
    console.log('id', id.target.defaultValue);
    // 단일 선택 시 체크된 아이템을 배열에 추가
    let result = '';
    selectedEls.forEach((el) => {
      result += el.value + ',';
    });
    setBizTycdSel2(result);
    console.log('bizTycdSel2', bizTycdSel2);
    if (id.target.checked) {
      let checkPick = document.getElementsByName('bizTycdSel_all');
      Array.prototype.forEach.call(checkPick, function (el) {
        el.checked = false;
      });
    }
    if (selectedEls.length === totalEls.length) {
      let checkPick = document.getElementsByName('bizTycdSel_all');
      Array.prototype.forEach.call(checkPick, function (el) {
        el.checked = true;
      });
    } else {
      let checkPick = document.getElementsByName('bizTycdSel_all');

      Array.prototype.forEach.call(checkPick, function (el) {
        el.checked = false;
      });
    }
  };

  //다중 정책 전체 체크세팅
  const bizTyAllCheck = (e) => {
    const checklist = 'input[name="bizTycdSel"]';
    if (e.target.checked) {
      const selectedEls = document.querySelectorAll(checklist);
      let result = '';
      selectedEls.forEach((el) => {
        result += el.value + ',';
      });
      setBizTycdSel2(result);
    } else {
      setBizTycdSel2('');
    }
    console.log('bizTycdSel2', bizTycdSel2);

    let checkPick = document.getElementsByName('bizTycdSel');
    Array.prototype.forEach.call(checkPick, function (el) {
      // console.log('el', el);
      el.checked = false;
    });
  };

  //검색어 세팅
  const queryHandler = (e) => {
    // radio 버튼에서는 e.preventDefault()를 하면 더블클릭을 해줘야 한다.
    // e.preventDefaul();
    setQuery2(e.target.value);
  };

  //검색 버튼 클릭 시 처리
  const onSubmit = async (e) => {
    // // console.log('onSubmit', query2);
    // console.log('onSubmit', srchPolyBizSecd2);
    setIsLoading(true);
    console.log('isLoading', isLoading);
    await axios
      .get(`${baseUrl}/policy/search2/1`, {
        params: {
          query: query2,
          srchPolyBizSecd: srchPolyBizSecd2,
          bizTycdSel: bizTycdSel2,
        },
      })
      .then((response) => {
        console.log('responese :', response.data);
        // setSearchList(response.data.aList);
        setResultData(response.data.aList);
        setPV2(response.data.pv ? response.data.pv : 1);
        SetTotalPageforSrc(
          (response.data.pv.totalPage = undefined
            ? 0
            : response.data.pv.totalPage)
        );
        setIsSearch(true);
      })
      .catch((err) => {
        console.error(err.message);
        setIsSearch(true);
      });

    setIsLoading(false);
    console.log('isLoading', isLoading);
  };

  useDidMountEffect(() => {
    const loadingMore = async (e) => {
      // console.log('before page', page);
      // console.log('loadingmore', query2);
      // console.log('loadingmore', srchPolyBizSecd2);
      setIsLoading(true);
      // console.log('isLoading', isLoading);
      await axios
        .get(`${baseUrlforMoreLoading}`, {
          params: {
            query: query2,
            srchPolyBizSecd: srchPolyBizSecd2,
            bizTycdSel: bizTycdSel2,
          },
        })
        .then((response) => {
          console.log('responese :', response.data);
          // setSearchList(response.data.aList);
          setResultData((pre) => [...pre, ...response.data.aList]);
          setPV2(response.data.pv ? response.data.pv : 1);
          SetTotalPageforSrc(
            (response.data.pv.totalPage = undefined
              ? 0
              : response.data.pv.totalPage)
          );
          setIsSearch(true);
        })
        .catch((err) => {
          console.error(err.message);
        });

      setIsLoading(false);
    };
    loadingMore();
  }, [page]);

  return (
    <div>
      <h3 className='text-center'>정책등록</h3>

      <div>
        <form onSubmit={onSubmit}>
          <h5>검색어</h5>
          <input
            type='text'
            className='form-control'
            name='query'
            onChange={queryHandler}
          />
          <h5>정책유형</h5>
          <input
            type='checkbox'
            id='bizTycdSel_all'
            name='bizTycdSel_all'
            value=''
            onChange={(e) => bizTyAllCheck(e)}
          />
          전체
          <input
            type='checkbox'
            id='004001'
            name='bizTycdSel'
            value='004001'
            onChange={(e) => bizTySingleCheck(e)}
          />
          취업지원
          <input
            type='checkbox'
            id='004002'
            name='bizTycdSel'
            value='004002'
            onChange={(e) => bizTySingleCheck(e)}
          />
          창업지원
          <input
            type='checkbox'
            id='004003'
            name='bizTycdSel'
            value='004003'
            onChange={(e) => bizTySingleCheck(e)}
          />
          주거·금융
          <input
            type='checkbox'
            id='004004'
            name='bizTycdSel'
            value='004004'
            onChange={(e) => bizTySingleCheck(e)}
          />
          생활·복지
          <input
            type='checkbox'
            id='004005'
            name='bizTycdSel'
            value='004005'
            onChange={(e) => bizTySingleCheck(e)}
          />
          정책참여
          <input
            type='checkbox'
            id='004006'
            name='bizTycdSel'
            value='004006'
            onChange={(e) => bizTySingleCheck(e)}
          />
          코로나19
          <h5>지역</h5>
          <input
            type='checkbox'
            id='srchPolyBizSecd_all'
            name='srchPolyBizSecd_all'
            value=''
            onChange={(e) => srchAllCheck(e)}
          />
          전체
          <input
            type='checkbox'
            id='003002001'
            name='srchPolyBizSecd'
            value='003002001'
            onChange={(e) => srchSingleCheck(e)}
          />
          서울
          <input
            type='checkbox'
            id='003002002'
            name='srchPolyBizSecd'
            value='003002002'
            onChange={(e) => srchSingleCheck(e)}
          />
          부산
          <input
            type='checkbox'
            id='003002003'
            name='srchPolyBizSecd'
            value='003002003'
            onChange={(e) => srchSingleCheck(e)}
          />
          대구
          <input
            type='checkbox'
            id='003002004'
            name='srchPolyBizSecd'
            value='003002004'
            onChange={(e) => srchSingleCheck(e)}
          />
          인천
          <input
            type='checkbox'
            id='003002005'
            name='srchPolyBizSecd'
            value='003002005'
            onChange={(e) => srchSingleCheck(e)}
          />
          광주
          <input
            type='checkbox'
            id='003002006'
            name='srchPolyBizSecd'
            value='003002006'
            onChange={(e) => srchSingleCheck(e)}
          />
          대전
          <input
            type='checkbox'
            id='003002007'
            name='srchPolyBizSecd'
            value='003002007'
            onChange={(e) => srchSingleCheck(e)}
          />
          울산
          <input
            type='checkbox'
            id='003002008'
            name='srchPolyBizSecd'
            value='003002008'
            onChange={(e) => srchSingleCheck(e)}
          />
          경기
          <input
            type='checkbox'
            id='003002009'
            name='srchPolyBizSecd'
            value='003002009'
            onChange={(e) => srchSingleCheck(e)}
          />
          강원
          <input
            type='checkbox'
            id='003002010'
            name='srchPolyBizSecd'
            value='003002010'
            onChange={(e) => srchSingleCheck(e)}
          />
          충북
          <input
            type='checkbox'
            id='003002011'
            name='srchPolyBizSecd'
            value='003002011'
            onChange={(e) => srchSingleCheck(e)}
          />
          충남
          <input
            type='checkbox'
            id='003002012'
            name='srchPolyBizSecd'
            value='003002012'
            onChange={(e) => srchSingleCheck(e)}
          />
          전북
          <input
            type='checkbox'
            id='003002013'
            name='srchPolyBizSecd'
            value='003002013'
            onChange={(e) => srchSingleCheck(e)}
          />
          전남
          <input
            type='checkbox'
            id='003002014'
            name='srchPolyBizSecd'
            value='003002014'
            onChange={(e) => srchSingleCheck(e)}
          />
          경북
          <input
            type='checkbox'
            id='003002015'
            name='srchPolyBizSecd'
            value='003002015'
            onChange={(e) => srchSingleCheck(e)}
          />
          경남
          <input
            type='checkbox'
            id='003002016'
            name='srchPolyBizSecd'
            value='003002016'
            onChange={(e) => srchSingleCheck(e)}
          />
          제주
          <input
            type='checkbox'
            id='003002017'
            name='srchPolyBizSecd'
            value='003002017'
            onChange={(e) => srchSingleCheck(e)}
          />
          세종
          <button className='btn btn-primary' type='button' onClick={onSubmit}>
            검색
          </button>
        </form>
      </div>

      <table className='table table-striped' style={{ marginTop: 20 }}>
        <colgroup>
          <col width='7%' />
          <col width='5%' />
          <col width='20%' />
          <col width='13%' />
          <col width='8%' />
        </colgroup>

        <thead>
          {isSearch ? (
            pv2 === 1 ? (
              <p>검색결과가 없습니다.</p>
            ) : (
              <tr>
                <th>선택</th>
                <th>정책코드</th>
                <th>정책명</th>
                <th>기업명</th>
                <th>나이</th>
              </tr>
            )
          ) : (
            <p>검색 조건을 입력하세요</p>
          )}
        </thead>

        <tbody>
          {resultData &&
            resultData.map((data) => {
              return <TableRowSH policy={data} key={data.policyId} />;
            })}
        </tbody>
      </table>
      {isSearch && pv2
        ? totalPageforSrc === undefined
          ? null
          : page < totalPageforSrc && (
              <button
                type='button'
                className='btn btn-outline-secondary'
                style={{ width: '100%' }}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                {isLoading ? '로딩중' : '더보기'}
              </button>
            )
        : null}
    </div>
  );
};

export default PolicySearch2;
