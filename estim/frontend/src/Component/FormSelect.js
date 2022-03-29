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

const FormSelect = ({
  selectData,
  selectDatas,
  setSelectDatas,
  selectvalve,
  setHeadData,
  headData,
  selectList,
  setSelectList,
}) => {
  let date_to = new Date()
  let date_from = new Date()
  let str_date_from = getSubStr(date_from.toISOString(), 0, 10)
  let arr_from = str_date_from.split('-')
  let str_from_y = arr_from[0]
  let str_from_m = arr_from[1]
  let str_from_d = arr_from[2]

  let str_date_to = getSubStr(date_to.toISOString(), 0, 10)
  let arr_to = str_date_to.split('-')
  let str_to_y = arr_to[0]
  let str_to_m = arr_to[1]
  let str_to_d = arr_to[2]

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
  useEffect(() => {
    postDataList()
  }, [])

  $(function () {
    $('.btn_back').on('click', function () {
      window.history.back()
    })

    // 컨텐츠 기본높이
    function contentHeight() {
      var headerH = $('header').outerHeight()
      // var footerH = $("footer").outerHeight();
      var footerH = $('footer').outerHeight()
      var warpH = $(window).height() - (headerH + footerH)
      // $(".wrap").css("min-height", warpH + "px");
    }
    setTimeout(function () {
      contentHeight()
    }, 100)
    $(window).on('resize', function () {
      contentHeight()
    })

    var mount = 1

    $('.mount_btn .btn_up').on('click', function () {
      mount += 1
      $(this).closest('.mount_box').find('input').val(mount)
    })

    $('.mount_btn .btn_down').on('click', function () {
      if (mount > 1) {
        mount -= 1
        $(this).closest('.mount_box').find('input').val(mount)
      } else {
        mount = 1
      }
    })

    // 모달 ==============
    $('.modal_btn').on('click', function () {
      var modalID = $(this).attr('data-modal')
      $('#' + modalID)
        .fadeIn()
        .addclassName('modal_show')
    })

    $('.modal .btn_cancle, .btn_modal_cancle').on('click', function () {
      $(this).closest('.modal').fadeOut().removeclassName('.modal_show')
    })

    // datepicker ====================
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
    $('#searchStartDate').datepicker({})
    $('#searchEndDate').datepicker({})

    $('.btn_dateDuration').on('click', function () {
      var myDuration = $(this).attr('data-duration')
      setSearchDate(myDuration)
    })

    function setSearchDate(start) {
      var num = start.substring(0, 1)
      var str = start.substring(1, 2)
      var today = new Date()

      var year = today.getFullYear()
      var month = today.getMonth() + 1
      var day = today.getDate()

      var endDate = $.datepicker.formatDate('yy-mm-dd', today)
      $('#searchEndDate').val(endDate)

      if (str == 'd') {
        today.setDate(today.getDate() - num)
      } else if (str == 'w') {
        today.setDate(today.getDate() - num * 7)
      } else if (str == 'm') {
        today.setMonth(today.getMonth() - num)
        today.setDate(today.getDate() + 1)
      } else if (str == 'y') {
        today.setFullYear(today.getFullYear() - num)
        today.setDate(today.getDate() + 1)
      }

      var startDate = $.datepicker.formatDate('yy-mm-dd', today)
      $('#searchStartDate').val(startDate)

      // 종료일은 시작일 이전 날짜 선택하지 못하도록 비활성화
      $('#searchEndDate').datepicker('option', 'minDate', startDate)

      // 시작일은 종료일 이후 날짜 선택하지 못하도록 비활성화
      $('#searchStartDate').datepicker('option', 'maxDate', endDate)
    }
    // 벨브 관련 ====================

    var valveLeng = 1
    // 벨브추가
    $('.add_valve').on('click', function (e) {
      e.preventDefault()
      valveLeng = valveLeng + 1

      $('.square_box')
        .find('.plus')
        .before('<li className="valve_default">' + valveLeng + '</li>')

      if (valveLeng == 2 || valveLeng == 3) {
        $('.blank_box')[0].remove()
      }
      squareBoxW()
    })

    // 벨브 클릭 시
    $('.square_box').on('click', '.valve_default', function () {
      $(this).siblings('li').removeclassName('square_active')
      $(this).addclassName('square_active')
    })

    // 벨브삭제
    $('.remove_valve').on('click', function (e) {
      e.preventDefault()

      if (valveLeng > 1) {
        valveLeng = valveLeng - 1
        $('.square_box').find('.plus').prev().remove()

        if (valveLeng == 1 || valveLeng == 2) {
          $('.square_box').append('<li className="blank_box"></li>')
        }
        squareBoxW()
      }
    })
    squareBoxW()

    // 벨브조절에 따른 넓이변화
    function squareBoxW() {
      var liMount = $('.square_box').find('li').length
      var liW = 23
      $('.square_box').css('width', liMount * liW)
    }

    var offset = 0
    $('.btn_valve_prev').on('click', function (e) {
      e.preventDefault()
      if ($('.square_box_wrap').width() < $('.square_box').width()) {
        if (offset <= 0) {
          offset = 0
        } else {
          offset = offset - $('.square_box_wrap').width()
        }
        console.log(offset)
        $('.square_box').css('transform', 'translateX(' + -offset + 'px)')
      }
    })
    $('.btn_valve_next').on('click', function (e) {
      e.preventDefault()
      if ($('.square_box_wrap').width() < $('.square_box').width()) {
        if (offset < 0) {
          offset = 0
        } else if (
          offset + $('.square_box_wrap').width() >=
          $('.square_box').width()
        ) {
          // 제일 끝에 닿았을 때
          offset = $('.square_box').width() - $('.square_box_wrap').width()
        } else {
          offset = offset + $('.square_box_wrap').width()
        }

        $('.square_box').css('transform', 'translateX(' + -offset + 'px)')
      }
    })

    // tag 선택
    $('.tag_list').on('click', 'li', function () {
      $(this).siblings('li').removeclassName('tag_active')
      $(this).addclassName('tag_active')
    })

    // 상세정보 버튼
    $('.toggle_btn').on('click', function () {
      var toggleBox = $(this).closest('li').find('.toggle_box')
      toggleBox.toggleclassName('open_box')
      if (toggleBox.hasclassName('open_box')) {
        $(this).find('span').text('간단히')
        $(this).addclassName('open_btn')
      } else {
        $(this).find('span').text('상세정보조회')
        $(this).removeclassName('open_btn')
      }
    })
    //  비밀번호 찾기 이메일 주소
    $('#findIdModal').on('click', function () {
      $('.find_email').text($('#findID').val())
    })
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
              <span className="year">2021년</span>
              <div className="swiper_select_box">
                <button className="prev_btn"></button>
                <span className="swiper_cont">2월</span>
                <button className="next_btn"></button>
              </div>
            </div>
            <div className="right_box">
              <button
                href=""
                className="btn_cog modal_btn"
                data-modal="modalDate"
              ></button>
            </div>
          </div>
          <div className="select_list">
            <ul>
              {selectList.map(list => {
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
                    />
                  </div>
                  <span className="dasi">-</span>
                  <div className="datepick_item">
                    <input
                      type="text"
                      id="searchEndDate"
                      className="datepick"
                    />
                  </div>
                </div>
              </div>
              <div className="cont_group">
                <div className="modal_subtitle bold">전체조회</div>
                <div className="all_searchs">
                  <button className="btn btn_sm">최신순</button>
                  <button className="btn btn_sm">과거순</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormSelect
