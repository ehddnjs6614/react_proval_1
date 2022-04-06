import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../images/logo.png'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import { API_URL } from '../_api/types'
import {
  getDateStr,
  getLastDay,
  getLastDayStr,
  getSubStr,
  getValidUserID,
} from '../Utils/EstimUtils'
import axios from 'axios'

const FormSelect = ({ setSelectDatas, selectList, setSelectList }) => {
  const [reload, setReload] = useState(false)

  let [str_date_from, setFromDate] = useState(
    getSubStr(new Date().toISOString(), 0, 10)
  )
  let [str_date_to, setToDate] = useState(
    getSubStr(new Date().toISOString(), 0, 10)
  )

  let str_order_by = 'A' /* A:최신순,D:과거순 */
  let str_est_clsfy = '2' /* 1:신규,2:완료,3:리비전 */

  let U_IDData = sessionStorage.getItem('U_ID')
  // const [selectList, setSelectList] = useState([])

  const poststartList = async (EST_NO, REV_NO) => {
    const res = await axios.post(
      `${API_URL}estimation/detail/${EST_NO}/${REV_NO}`
    )
    setSelectDatas(res.data.data)
    console.log('poststartList :', res.data.data)
  }
  //모달 start
  let style_background_normal = {
    maxWidth: '70px',
    marginRight: '7px',
    backgroundColor: 'gray',
  }
  let style_background_hilight = {
    maxWidth: '70px',
    marginRight: '7px',
    backgroundColor: '#113c8a',
  }

  function setOrderBy(od) {
    if (od == 'A') {
      $('#sch_order_asc').css('backgroundColor', 'rgb(17, 60, 138)')
      $('#sch_order_desc').css('backgroundColor', 'rgb(128, 128, 128)')
    } else {
      $('#sch_order_asc').css('backgroundColor', 'rgb(128, 128, 128)')
      $('#sch_order_desc').css('backgroundColor', 'rgb(17, 60, 138)')
    }
  }

  function okSearchSettings() {
    str_date_from = new Date($('#searchStartDate').val())
    str_date_to = new Date($('#searchEndDate').val())

    $('#modalDate').fadeOut()
    getEstimationList('from', 1)
  }

  //모달 and

  //Refactoring start

  const [str_from_y, str_from_m] = str_date_from.split('-')
  const [str_to_y, str_to_m] = str_date_to.split('-')

  const timeFilter = a => {
    console.log('a : ', a)
    const [year, month, day] = a.EST_REQ_DT.split('-')
    console.log(+year, +str_from_y)
    console.log(+month, +str_from_m)
    console.log(+year, +str_to_y)
    console.log(+month, +str_to_m)
    return (
      +year >= +str_from_y &&
      +month >= +str_from_m &&
      +year <= +str_to_y &&
      +month <= +str_to_m
    )
  }

  const postDataList = async () => {
    const res = await axios.post(`${API_URL}estimation/list`, {
      M_ID: U_IDData,
      fromdate: str_date_from,
      todate: str_date_to,
      orderby: str_order_by,
      EST_CLSFY: str_est_clsfy,
    })
    setSelectList(res.data.data)
    console.log('setSelectList : ', res.data.data)
  }

  console.log('selectList :', selectList)
  console.log('dd', selectList)

  // let [estim_lastIdx, estim_setLastIdx] = useState(0)
  // let [estim_list, estim_setInputData] = useState([
  //   {
  //     PROJECT: '',
  //     EST_NO: '',
  //     M_IL: '',
  //     REV_NO: '',
  //   },
  // ])

  const dateplus = s => {
    const [year, month, date] = s.split('-')
    if (+month === 12) {
      return `${+year + 1}-01-${date}`
    }
    return `${year}-${+month + 1}-${date}`
  }

  const datemiuns = s => {
    const [year, month, date] = s.split('-')
    if (+month === 1) {
      return `${+year - 1}-12-${date}`
    }
    return `${year}-${+month - 1}-${date}`
  }

  useEffect(() => {
    if (+str_from_y < +str_to_y) {
      postDataList()
    } else if (+str_from_y === +str_to_y) {
      if (+str_from_m <= +str_to_m) {
        postDataList()
      }
    }
  }, [str_date_from, str_date_to])

  async function getEstimationList(target, dir = 0) {
    const user_id = getValidUserID()
    if (!user_id) {
      alert('로그인 후 사용하세요!')
      return false
    }

    if (target == 'from') {
      if (dir === 1) {
        setFromDate(dateplus)
      } else {
        setFromDate(datemiuns)
      }
    } else if (target == 'to') {
      if (dir === 1) {
        setToDate(dateplus)
      } else {
        setToDate(datemiuns)
      }
    }

    // if (target == 'from') {
    //   $("span[id='sch_year_from']").text(arr_from[0] + '년')
    //   $("span[id='sch_month_from']").text(arr_from[1] + '월')
    // } else if (target == 'to') {
    //   $("span[id='sch_year_to']").text(arr_to[0] + '년')
    //   $("span[id='sch_month_to']").text(arr_to[1] + '월')
    // }

    // const $ul = $("ul[id='estim_list']")
    //$ul.append("<li id='estim_0'><div style='text-align:center;'>견적 자료 조회중...</div></li>");

    console.log(1, {
      사용자: user_id,
      시작: str_date_from,
      종료: str_date_to,
      정렬: str_order_by,
      구분: str_est_clsfy,
    })
  }
  //Refactoring end

  $(function () {
    // 컨텐츠 기본높이

    // 모달 ==============
    $('.modal_btn').on('click', function () {
      let modalID = $(this).attr('data-modal')
      $('#' + modalID)
        .fadeIn()
        .addClass('modal_show')
    })

    $('.modal .btn_cancle, .btn_modal_cancle').on('click', function () {
      $(this).closest('.modal').fadeOut().removeClass('modal_show')
    })

    // datepicker ====================

    // firstDate = new Date(now.getFullYear(), now.getMonth(), 1)
    // lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    // $('#startdate').val($.datepicker.formatDate('yy-mm-dd', firstDate))
    // $('#enddate').val($.datepicker.formatDate('yy-mm-dd', lastDate))

    $.datepicker.setDefaults({
      dateFormat: 'yy-mm-dd', //날짜 포맷이다. 보통 yy-mm-dd 를 많이 사용하는것 같다.
      prevText: '이전 달', // 마우스 오버시 이전달 텍스트
      nextText: '다음 달', // 마우스 오버시 다음달 텍스트
      closeText: '닫기', // 닫기 버튼 텍스트 변경
      currentText: '오늘', // 오늘 텍스트 변경
      monthNames: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ], //한글 캘린더중 월 표시를 위한 부분
      monthNamesShort: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ], //한글 캘린더 중 월 표시를 위한 부분
      dayNames: ['일', '월', '화', '수', '목', '금', '토'], //한글 캘린더 요일 표시 부분
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'], //한글 요일 표시 부분
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], // 한글 요일 표시 부분
      showMonthAfterYear: true, // true : 년 월  false : 월 년 순으로 보여줌
      yearSuffix: '년', //
      showButtonPanel: true, // 오늘로 가는 버튼과 달력 닫기 버튼 보기 옵션
      buttonImageOnly: true, // input 옆에 조그만한 아이콘으로 캘린더 선택가능하게 하기
      buttonImage:
        'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif', // 조그만한 아이콘 이미지
      buttonText: 'Select date', // 조그만한 아이콘 툴팁,
      showOn: 'button',
    })

    $('#searchStartDate').datepicker()
    $('#searchEndDate').datepicker()

    // $('#searchStartDate').datepicker('setDate', 'today')
    // $('#searchEndDate').datepicker('setDate', '+1D')

    $('.btn_dateDuration').on('click', function () {
      let myDuration = $(this).attr('data-duration')
      setSearchDate(myDuration)
    })

    function setSearchDate(start) {
      let num = start.substring(0, 1)
      let str = start.substring(1, 2)
      let today = new Date()

      // let year = today.getFullYear()
      // let month = today.getMonth() + 1
      // let day = today.getDate()

      let endDate = $.datepicker.formatDate('yy-mm-dd', today)
      $('#searchEndDate').val(endDate)

      if (str === 'd') {
        today.setDate(today.getDate() - num)
      } else if (str === 'w') {
        today.setDate(today.getDate() - num * 7)
      } else if (str === 'm') {
        today.setMonth(today.getMonth() - num)
        today.setDate(today.getDate() + 1)
      } else if (str === 'y') {
        today.setFullYear(today.getFullYear() - num)
        today.setDate(today.getDate() + 1)
      }

      let startDate = $.datepicker.formatDate('yy-mm-dd', today)
      $('#searchStartDate').val(startDate)

      // 종료일은 시작일 이전 날짜 선택하지 못하도록 비활성화
      $('#searchEndDate').datepicker('option', 'minDate', startDate)

      // 시작일은 종료일 이후 날짜 선택하지 못하도록 비활성화
      $('#searchStartDate').datepicker('option', 'maxDate', endDate)
    }
    // 벨브 관련 ====================

    // 벨브 클릭 시

    // 벨브삭제

    // 벨브조절에 따른 넓이변화

    // tag 선택

    // 상세정보 버튼

    //  비밀번호 찾기 이메일 주소
  })

  let history = useHistory()

  return (
    <div>
      <header>
        <div className="logo_box">
          <h1>
            <Link to="main">
              <img src={logo} alt="proval로고" />
            </Link>
          </h1>
          <div className="page_title">견적요청</div>
        </div>
        <Link to="menu" className="gnb_btn">
          <span></span>
          <span></span>
          <span></span>
        </Link>
      </header>
      <div className="wrap full_wrap">
        <div className="full_wrap_pd back_box">
          <button
            onClick={() => {
              history.goBack()
            }}
            className="btn_back"
          ></button>
        </div>
        <div className="full_wrap_pd cont">
          <div className="flex_box date_box">
            <div className="left_box">
              <span
                className="year"
                id="sch_year_from"
                style={{ marginRight: '10px' }}
              >
                {str_from_y}년
              </span>
              <div className="swiper_select_box">
                <button
                  className="prev_btn"
                  id="btn_prev_from"
                  onClick={() => getEstimationList('from', -1)}
                ></button>
                <span
                  className="swiper_cont"
                  id="sch_month_from"
                  style={{ padding: '0 7px' }}
                >
                  {str_from_m}월
                </span>
                <button
                  className="next_btn"
                  id="btn_next_from"
                  onClick={() => getEstimationList('from', 1)}
                ></button>
              </div>
              <span style={{ marginLeft: '5px', marginRight: '5px' }}>~</span>
              <span
                className="year"
                id="sch_year_to"
                style={{ marginRight: '10px' }}
              >
                {str_to_y}년
              </span>
              <div className="swiper_select_box">
                <button
                  className="prev_btn"
                  id="btn_prev_to"
                  onClick={() => getEstimationList('to', -1)}
                ></button>
                <span
                  className="swiper_cont"
                  id="sch_month_to"
                  style={{ padding: '0 7px' }}
                >
                  {str_to_m}월
                </span>
                <button
                  className="next_btn"
                  id="btn_next_to"
                  onClick={() => getEstimationList('to', 1)}
                ></button>
              </div>
            </div>
            <div className="right_box">
              {/* <!-- 아래버튼에 온클릭버튼을 넣어주고 모달 만들어보기. --> */}
              <button
                className="btn_cog modal_btn"
                data-modal="modalDate"
              ></button>
            </div>
          </div>
          <div className="select_list">
            <ul>
              {selectList.filter(timeFilter).map(list => {
                return (
                  <li key={list.EST_NO}>
                    <div className="list_li list_head">
                      <div className="table_title">PROJECT</div>
                      <div className="table_desc">{list.PROJECT}</div>
                    </div>
                    <div className="list_middle_box">
                      <div className="list_middle_left">
                        <div className="list_li">
                          <div className="table_title">견적 번호</div>
                          <div className="table_desc">{list.EST_NO}</div>
                        </div>
                        <div className="list_li">
                          <div className="table_title">견적 요청일</div>
                          <div className="table_desc">{list.EST_REQ_DT}</div>
                        </div>
                      </div>
                      <div className="list_middle_right">
                        <Link
                          to="/qttnstart"
                          className="btn btn_wh"
                          onClick={() =>
                            poststartList(list.EST_NO, list.REV_NO)
                          }
                        >
                          불러
                          <br />
                          오기
                        </Link>
                        {/* <a href="qttnStart.html" class="btn btn_wh">
                        불러
                        <br />
                        오기
                      </a> */}
                      </div>
                    </div>
                    <div className="list_li">
                      <div className="table_title">리비전</div>
                      <div className="table_desc">{list.REV_NO}</div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <footer className="common_footer">
        <div className="footer_logo"></div>
        <div className="footer_info">
          <address>경기 시흥시 엠티브이 25로 20번길, 38</address>
          <div className="tel">
            <span>
              Tel : <a href="tel:0314994903">+82 (0)31-499-4903</a>
            </span>
            <span>FAX : +82 (0)31-499-0836</span>
          </div>
          <div className="email">
            Email :
            <a href="mailto:proval.md@proval.co.kr">proval.md@proval.co.kr</a>
          </div>
        </div>
      </footer>
      {/* <!-- modalDate --> */}
      <div id="modalDate" className="modal">
        <div className="modal_wrap">
          <div className="modal_header includ_title">
            조회옵션
            <button className="btn_cancle"></button>
          </div>
          <div className="modal_body">
            <div className="modal_cont">
              <div className="cont_group">
                <div className="modal_subtitle bold">조회기간</div>
                <div className="date_btns">
                  <button
                    className="btn btn_sm btn_dateDuration"
                    data-duration="1m"
                  >
                    1개월
                  </button>
                  <button
                    className="btn btn_sm btn_dateDuration"
                    data-duration="3m"
                  >
                    3개월
                  </button>
                  <button
                    className="btn btn_sm btn_dateDuration"
                    data-duration="6m"
                  >
                    6개월
                  </button>
                  <button
                    className="btn btn_sm btn_dateDuration"
                    data-duration="1y"
                  >
                    1년
                  </button>
                </div>
                <div className="date_selects">
                  <div className="datepick_item">
                    <input
                      type="text"
                      id="searchStartDate"
                      className="datepick"
                      defaultValue={str_date_from}
                    />
                  </div>
                  <span className="dasi">-</span>
                  <div className="datepick_item">
                    <input
                      type="text"
                      id="searchEndDate"
                      className="datepick"
                      defaultValue={str_date_to}
                    />
                  </div>
                </div>
              </div>
              <div className="cont_group">
                <div className="modal_subtitle bold">전체조회</div>
                {(function () {
                  if (str_order_by == 'A') {
                    return (
                      <div className="all_searchs">
                        <button
                          className="btn btn_sm"
                          style={style_background_hilight}
                          id="sch_order_asc"
                          onClick={() => setOrderBy('A')}
                        >
                          최신순
                        </button>
                        <button
                          className="btn btn_sm"
                          style={style_background_normal}
                          id="sch_order_desc"
                          onClick={() => setOrderBy('D')}
                        >
                          과거순
                        </button>
                        <div className="btns_center">
                          <button
                            className="btn btn_md btn_shadow"
                            id="btn_setting_ok"
                            onClick={() => okSearchSettings()}
                          >
                            확인
                          </button>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className="all_searchs">
                        <button
                          className="btn btn_sm"
                          style={style_background_normal}
                          id="sch_order_asc"
                          onClick={() => setOrderBy('A')}
                        >
                          최신순
                        </button>
                        <button
                          className="btn btn_sm"
                          style={style_background_hilight}
                          id="sch_order_desc"
                          onClick={() => setOrderBy('D')}
                        >
                          과거순
                        </button>
                        <div className="btns_center">
                          <button
                            className="btn btn_md btn_shadow"
                            id="btn_setting_ok"
                            onClick={() => okSearchSettings()}
                          >
                            확인
                          </button>
                        </div>
                      </div>
                    )
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormSelect
