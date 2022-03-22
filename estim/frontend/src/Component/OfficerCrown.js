import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import '../images/btn_date.png'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { getDateStr, getLastDay, getLastDayStr, getSubStr, getValidUserID } from '../Utils/EstimUtils'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { API_URL } from '../_api/types'

let date_to = new Date();
let date_from = new Date();
date_from.setDate(1);
date_from.setMonth(date_to.getMonth() - 1);

const OfficerCrown = () => {
  //0.........1........
  //0123456789012345678
  //2022-03-11 10:00:00
  let str_date_from = getSubStr(date_from.toISOString(), 0, 10);
  let arr_from = str_date_from.split('-');
  let str_from_y = arr_from[0];
  let str_from_m = arr_from[1];
  let str_from_d = arr_from[2];

  let str_date_to = getSubStr(date_to.toISOString(), 0, 10);
  let arr_to = str_date_to.split('-');
  let str_to_y = arr_to[0];
  let str_to_m = arr_to[1];
  let str_to_d = arr_to[2];

  /**
   * 조회옵션
   */
  let style_background_normal = {maxWidth:'70px',marginRight:'7px',backgroundColor:'gray'};
  let style_background_hilight = {maxWidth:'70px',marginRight:'7px',backgroundColor:'#113c8a'};

  let str_order_by = 'A';  /* A:최신순,D:과거순 */
  let str_est_clsfy = '1'; /* 1:신규,2:완료,3:리비전 */

  setOrderBy(str_order_by);

  let [estim_list, estim_setInputData] = useState([{
    PROJECT: '',
    EST_NO: '',
    M_IL: '',
    REV_NO: '',
  }]);
  let [estim_lastIdx, estim_setLastIdx] = useState(0);

  let [estim_details, details_setInputData] = useState([
  {
    COMP:'',
    FACT:'',
    EST_NO:'',
    REV_NO:'',
    TAG_NO:'',
    SERIAL_NO:'',
    BODY_TYPE:'',
    BODY_SIZE:'',
    BODY:'',
    RATING:'',
    PLUG_DISC_BALL:'',
    END_CONNECTION:'',
    ACTUATOR_TYPE:'',
    HAND_WHEEL:'',
    MEDIUM_1:'',
    FR_MAX:'',
    FR_NOR:'',
    FR_MIN :'',
    FR_UNIT:'',
    IP_MAX:'',
    IP_NOR:'',
    IP_MIN:'',
    IP_UNIT:'',
    OP_MAX:'',
    OP_NOR:'',
    OP_MIN:'',
    OP_UNIT:'',
    IT_MAX:'',
    IT_NOR:'',
    IT_MIN:'',
    IT_UNIT:'',
    D_NOR:'',
    D_UNIT:'',
    MW_NOR:'',
    MW_UNIT:'',
    IP_POSITIONER:'',
    SOLENOID_CONNECT_TYPE:'',
    IP_ENCLOSURE:'',
    IP_TYPE:'',
    PT_TRANSMIT:'',
    SOLENOID_MATERIAL:'',
    SOLENOID_MFG:'',
    LIMIT_MFG:'',
    AIR_SET_CONNECT_TYPE:'',
    IP_CONDUIT_AIR_CONNECT:'',
    OTHER_REQUEST:'',
    QTY:'',
    UNIT_PRICE:'',
    AMT:'',
    NOTE:'',
    STAT:'',
    M_ID:'',
    M_IL:'',
    U_ID:'',
    U_IL:''
  }]);
  let [details_lastIdx, details_setLastIdx] = useState(0);

  let [rev_list, rev_setInputData] = useState([{
    PROJECT: '',
    EST_NO: '',
    M_IL: '',
    REV_NO: '',
    CUR_REV_NO: '',
  }]);
  let [rev_lastIdx, rev_setLastIdx] = useState(0);

  let TAG_NO_selected = null;

  function makeSearchDate(){
    str_date_from = getSubStr(date_from.toISOString(), 0, 10);
    str_date_to = getSubStr(date_to.toISOString(), 0, 10);

    arr_from = str_date_from.split('-');
    str_from_y = arr_from[0];
    str_from_m = arr_from[1];
    str_from_d = arr_from[2];

    arr_to = str_date_to.split('-');
    str_to_y = arr_to[0];
    str_to_m = arr_to[1];
    str_to_d = arr_to[2];
  }

  function setOrderBy(od){
    if (od == 'A') {
      $("#sch_order_asc").css("backgroundColor", 'rgb(17, 60, 138)');
      $("#sch_order_desc").css("backgroundColor", 'rgb(128, 128, 128)');
    }
    else {
      $("#sch_order_asc").css("backgroundColor", 'rgb(128, 128, 128)');
      $("#sch_order_desc").css("backgroundColor", 'rgb(17, 60, 138)');
    }
  }

  function okSearchSettings() {
    date_from = new Date($("#searchStartDate").val());
    date_to = new Date($("#searchEndDate").val());

    if ($("#sch_order_desc").css("backgroundColor") == 'rgb(128, 128, 128)')
      str_order_by = 'A';
    else
      str_order_by = 'D';
    
    makeSearchDate();

    $("#modalDate").fadeOut();

    getEstimationList("from",0);
  }

  async function getEstimationList (target, dir=0) {
    const user_id = getValidUserID();
    if (!user_id) {
      alert('로그인 후 사용하세요!');
      return false;
    }

    if (target == 'from') {
      date_from.setDate(1);
      date_from.setMonth(date_from.getMonth()+(dir));
    } else if (target == 'to') {
      date_to.setMonth(date_to.getMonth()+(dir));
    }

    makeSearchDate();

    if (target == 'from') {
      $("span[id='sch_year_from']").text(arr_from[0]+'년');
      $("span[id='sch_month_from']").text(arr_from[1]+'월');
    } else if (target == 'to') {
      $("span[id='sch_year_to']").text(arr_to[0]+'년');
      $("span[id='sch_month_to']").text(arr_to[1]+'월');
    }

    $("ul[id='estim_list']").html("<div style='text-align:center;'>견적 자료 조회중...</div>");
    
    try {
      const res = await axios.post(`${API_URL}estimation/list`,{
        M_ID: user_id,
        fromdate: str_date_from,
        todate: str_date_to,
        orderby: str_order_by,
        EST_CLSFY: str_est_clsfy
      });
      if (res.data.result == 'success') {
        const rows = await res.data.data.map((rowData) => (
          estim_setLastIdx(estim_lastIdx+1),
          {
            PROJECT: rowData.PROJECT,
            EST_NO: rowData.EST_NO,
            M_IL: rowData.M_IL,
            REV_NO: rowData.REV_NO,
          })
        );
        $("ul[id='estim_list']").html("");
        estim_list = rows.slice();
        estim_setInputData(estim_list);
      } else {
        $("ul[id='estim_list']").html("<div style='text-align:center; color: red;'>견적 자료가 없습니다.</div>");
      }
    } catch (error) {
      alert(error);
    }
  }
  useEffect((e)=>{
    getEstimationList("from",0)
  },[]);

  async function getRevisionList (est_no, rev_no, project) {
    let modal_list = $("#modalRevision ul.revision_list");

    try {
      const res = await axios.get(`${API_URL}estimation/${est_no}/${rev_no}`);
      if (res.data.result == 'success') {
        //const rows = res.data.data;
        const rows = await res.data.data.map((rowData) => (
          rev_setLastIdx(rev_lastIdx+1),
          {
            PROJECT: project,
            EST_NO: rowData.EST_NO,
            M_IL: rowData.M_IL,
            REV_NO: rowData.REV_NO,
            CUR_REV_NO: rev_no,
          })
        );
        rev_list = rows.slice();
        rev_setInputData(rev_list);
      } else {
        $(modal_list).html("<div style='text-align:center; color: red;'>다른 리비전이 없습니다.</div>");
      }
    } catch (error) {
      alert(error);
    }
  }
  async function getEstimationRevision (est_no, rev_no, project) {
    $("#modalRevision").fadeOut();

    try {
        const res = await axios.post(`${API_URL}estimation/detail/${est_no}/${rev_no}`);
        if (res.data.result == 'success') {
          const rows = await res.data.data.map((rowData) => (
            estim_setLastIdx(estim_lastIdx+1),
            {
              PROJECT: project,
              EST_NO: rowData.EST_NO,
              M_IL: rowData.M_IL,
              REV_NO: rowData.REV_NO,
            })
          )
          estim_list = rows.slice();
          estim_setInputData(estim_list);
        } else {
          $("ul[id='estim_list']").html("<div style='text-align:center; color: red;'>견적 자료가 없습니다.</div>");
        }
    } catch (error) {
      alert(error);
    }
  }

  function getDetailStatus(target) {
    var toggleBox = $(target).closest('li').find('.toggle_box')
    if (toggleBox.hasClass('open_box') == true) {
      return "shown";
    } else {
      return "hidden";
    }
  }

  function toggleDetail(target){
      var toggleBox = $(target).closest('li').find('.toggle_box')
      toggleBox.toggleClass('open_box')
      if (toggleBox.hasClass('open_box')) {
        $(target).find('span').text('간단히')
        $(target).addClass('open_btn')
        return "shown";
      } else {
        $(target).find('span').text('상세정보조회')
        $(target).removeClass('open_btn')
        return "hidden";
      }
  }

  async function getEstimationDetails (target,est_no, rev_no, tag_no=null) {
    let target_button = $(target).parent("button");
    let target_li = $(target_button).parent("li");
    let target_ul = $(target_li).parent("ul");

    if ($(target).prop("tagName") == 'BUTTON') {
      target_button = target;
      target = $(target_button).children("span");
      target_li = $(target_button).parent("li");
      target_ul = $(target_li).parent("ul");
    }

    toggleDetail(target_button);

    //상세보기를 닫을 때는 조회하지 않고 리턴
    if (getDetailStatus(target_button) == "hidden") {
      return false;
    }

    $.each($(target_ul).children("li"),function(k,li){
      let btn = $(li).children("button.toggle_btn");
      if (getDetailStatus(btn) == "shown"){
        if ($(li).attr("id") != $(target_li).attr("id")) {
          toggleDetail(btn);
        }
      }
    });

    try {
      const res = await axios.post((!tag_no)?`${API_URL}estimation/detail/${est_no}/${rev_no}`:`${API_URL}estimation/detail/${est_no}/${rev_no}/${tag_no}`);
      if (res.data.result == 'success') {
        // const rows = await res.data.data.map((rowData) => (
        //   details_setLastIdx(details_lastIdx+1),
        //   {
        //     EST_NO: rowData.EST_NO,
        //     M_IL: rowData.M_IL,
        //     REV_NO: rowData.REV_NO,
        //   })
        // )
        // details_setInputData(estim_details.concat(rows));
        TAG_NO_selected = null;
        estim_details = res.data.data.slice()
        details_setInputData(estim_details);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  }
  /**
   * 주어진 TAG_NO를 현재 TAG_NO로 설정
   * @param {*} tag 
   * @returns 
   */
  function selectTAG(tag) {
    if (TAG_NO_selected == tag)
      return false;

    TAG_NO_selected = tag;
  }
  /**
   * 상세내역 배열 데이터에서 현재 선택된 TAG_NO에 해당하는 인덱스를 얻는다
   */
  function getDetailIndex() {
    for (let index = 0; index < estim_details.length; index++) {
      if (TAG_NO_selected == estim_details[index].TAG_NO)
        return index;
    }
  }

  $(function () {
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

    // 모달 =====================
    $('.modal_btn').on('click', function () {
      var modalID = $(this).attr('data-modal')
      $('#' + modalID)
        .fadeIn()
        .addClass('modal_show')
    })

    $('.modal .btn_cancle, .btn_modal_cancle').on('click', function () {
      $(this).closest('.modal').fadeOut().removeClass('modal_show')
    })

    // datepicker ==============================
    $.datepicker.setDefaults({
      dateFormat: 'yy-mm-dd', //날짜 포맷이다. 보통 yy-mm-dd 를 많이 사용하는것 같다.
      prevText: '이전 달', // 마우스 오버시 이전달 텍스트
      nextText: '다음 달', // 마우스 오버시 다음달 텍스트
      closeText: '닫기', // 닫기 버튼 텍스트 변경
      currentText: '오늘', // 오늘 텍스트 변경
      monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //한글 캘린더중 월 표시를 위한 부분
      monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'], //한글 캘린더 중 월 표시를 위한 부분
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

      var startDate = $.datepicker.formatDate('yy-mm-dd', today)
      $('#searchStartDate').val(startDate)

      // 종료일은 시작일 이전 날짜 선택하지 못하도록 비활성화
      $('#searchEndDate').datepicker('option', 'minDate', startDate)

      // 시작일은 종료일 이후 날짜 선택하지 못하도록 비활성화
      $('#searchStartDate').datepicker('option', 'maxDate', endDate)
    }
    // 벨브 관련 ==============================

    var valveLeng = 1
    // 벨브추가
    $('.add_valve').on('click', function (e) {
      e.preventDefault()
      valveLeng = valveLeng + 1

      $('.square_box')
        .find('.plus')
        .before('<li class="valve_default">' + valveLeng + '</li>')

      if (valveLeng === 2 || valveLeng === 3) {
        $('.blank_box')[0].remove()
      }
      squareBoxW()
    })

    // 벨브 클릭 시
    $('.square_box').on('click', '.valve_default', function () {
      $(this).siblings('li').removeClass('square_active')
      $(this).addClass('square_active')
    })

    // 벨브삭제
    $('.remove_valve').on('click', function (e) {
      e.preventDefault()

      if (valveLeng > 1) {
        valveLeng = valveLeng - 1
        $('.square_box').find('.plus').prev().remove()

        if (valveLeng === 1 || valveLeng === 2) {
          $('.square_box').append('<li class="blank_box"></li>')
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
        //console.log(offset)
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
      $(this).siblings('li').removeClass('tag_active')
      $(this).addClass('tag_active')
    })

    // 상세정보 버튼
    // $('.toggle_btn').on('click', function () {
    //   var toggleBox = $(this).closest('li').find('.toggle_box')
    //   toggleBox.toggleClass('open_box')
    //   if (toggleBox.hasClass('open_box')) {
    //     $(this).find('span').text('간단히')
    //     $(this).addClass('open_btn')
    //   } else {
    //     $(this).find('span').text('상세정보조회')
    //     $(this).removeClass('open_btn')
    //   }
    // })
    //  비밀번호 찾기 이메일 주소
    $('#findIdModal').on('click', function () {
      $('.find_email').text($('#findID').val())
    })
  })

  //////////////////////////////////////////////////////////////////////
  // HTML
  //////////////////////////////////////////////////////////////////////
  return (
    <div>
      <header>
        <div class="logo_box">
          <h1>
            <Link to="/main">
              <img src={logo} alt="proval로고" />
            </Link>
          </h1>
          <div class="page_title">견적관리</div>
        </div>
        <Link to="/menu" class="gnb_btn">
          <span></span>
          <span></span>
          <span></span>
        </Link>
      </header>
      <div class="wrap full_wrap">
        <div class="full_wrap_pd tab_btns">
          <Link to="/officerCrown" class="btn btn_gray tab_active">
            견적 진행중
          </Link>
          <button
            class="btn btn_gray"
            onClick={() => {
              window.location.replace('/estmtCmplt')
            }}
          >
            견적완료
          </button>
          {/* <Link to="/estmtCmplt" class="btn btn_gray">
            견적 완료
          </Link> */}
        </div>
        <div class="full_wrap_pd cont">
          <div class="flex_box date_box">
            <div class="left_box">
              <span class="year" id="sch_year_from" style={{marginRight:'10px'}}>{str_from_y}년</span>
              <div class="swiper_select_box">
                <button class="prev_btn" id="btn_prev_from" onClick={()=>getEstimationList('from',-1)}></button>
                <span class="swiper_cont" id="sch_month_from" style={{padding:'0 7px'}}>{str_from_m}월</span>
                <button class="next_btn" id="btn_next_from" onClick={()=>getEstimationList('from',1)}></button>
              </div>
              <span style={{marginLeft:'5px',marginRight:'5px'}}>~</span>
              <span class="year" id="sch_year_to" style={{marginRight:'10px'}}>{str_to_y}년</span>
              <div class="swiper_select_box">
                <button class="prev_btn" id="btn_prev_to" onClick={()=>getEstimationList('to',-1)}></button>
                <span class="swiper_cont" id="sch_month_to" style={{padding:'0 7px'}}>{str_to_m}월</span>
                <button class="next_btn" id="btn_next_to" onClick={()=>getEstimationList('to',1)}></button>
              </div>
            </div>
            <div class="right_box">
              {/* <!-- 아래버튼에 온클릭버튼을 넣어주고 모달css를 해서 한번 만들어보기. --> */}
              <button
                href=""
                class="btn_cog modal_btn"
                data-modal="modalDate"
              ></button>
            </div>
          </div>
          <div class="select_list">
            <ul id="estim_list">
              {/* ======================== 견적 목록 시작 ========================== */
              estim_list.map(function(row, index){
                return(
              <li id={`estim_${index+1}`} key={index+1}>
                <div class="list_li list_head">
                  <div class="table_title">PROJECT</div>
                  <div class="table_desc">{row.PROJECT}</div>
                </div>
                <div class="list_middle_box">
                  <div class="list_middle_left">
                    <div class="list_li">
                      <div class="table_title">견적 번호</div>
                      <div class="table_desc">{row.EST_NO}</div>
                    </div>
                    <div class="list_li">
                      <div class="table_title">견적 요청일</div>
                      <div class="table_desc">{row.M_IL}</div>
                    </div>
                  </div>
                  <div class="list_middle_right">
                    <button
                      class="btn btn_wh modal_btn"
                      data-modal="modalCancleConfirm"
                    >
                      견적
                      <br />
                      취소
                    </button>
                  </div>
                </div>
                <div class="list_li">
                  <div class="list_middle_left list_li">
                    <div class="table_title">리비전</div>
                    <div class="table_desc">{row.REV_NO}</div>
                  </div>
                  <div class="list_middle_right mini_btn_box">
                    <button class="btn btn_wh modal_btn" name="sch_rev_btn" data-modal="modalRevision" onClick={()=>getRevisionList(row.EST_NO,row.REV_NO,row.PROJECT)}>조회</button>
                    {/*<button class="btn btn_wh modal_btn" name="sch_rev_btn" data-modal="modalRevision">조회</button>*/}
                  </div>
                </div>
                <div class="toggle_box">
                  <div class="list_li">
                    <div class="table_title">TAG NO.</div>
                    <div class="table_desc tag_box">
                      <ul class="tag_list">
                      {
                        estim_details.map(function(row, index) {
                          if (!TAG_NO_selected) {
                            TAG_NO_selected = row.TAG_NO;
                          }
                          if (TAG_NO_selected == row.TAG_NO) {
                            return(
                              <li class="tag_active">
                                <button class="btn_tag" onClick={()=>selectTAG(row.TAG_NO)}>{row.TAG_NO}</button>
                              </li>
                            )
                          }else{
                            return(
                              <li>
                                <button class="btn_tag" onClick={()=>selectTAG(row.TAG_NO)}>{row.TAG_NO}</button>
                              </li>
                            )
                          }
                        })
                      }
                      </ul>
                    </div>
                  </div>
                  {/* start Swiper */}
                  <div class="swiper_btn_box">
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                  </div>

                  <div class="swiper officer_swiper">
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                    >
                      <SwiperSlide>
                        <div class="sub_box">
                          <div class="sub_title">
                            Body / Actuator Information
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="sub_box">
                          <div class="sub_title">Fluid Information</div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="sub_box">
                          <div class="sub_title">Accessory Information</div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                    {/* 여기서 부터 시작 */}
                    <Swiper
                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                      spaceBetween={50}
                      slidesPerView={1}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                      autoHeight
                      scrollbar={{ draggable: true }}
                    >
                      {/* <!-- Swiper --> */}

                      <SwiperSlide>
                        <div
                          class="swiper-slide"
                          data-title="Body / Actuator Information"
                        >
                          <div class="swiper_wrap">
                            <ul class="qttnCheck_box">
                              <li>
                                <div class="check_title">Valve type</div>
                                <div class="check_val">
                                  Controal Globe({estim_details[getDetailIndex()].BODY_TYPE})
                                </div>
                              </li>
                              <li>
                                <div class="check_title">Body Size</div>
                                <div class="check_val">{estim_details[getDetailIndex()].BODY_SIZE}</div>
                              </li>
                              <li>
                                <div class="check_title">Body Material</div>
                                <div class="check_val">{estim_details[getDetailIndex()].BODY}</div>
                              </li>
                              <li>
                                <div class="check_title">Body Rating</div>
                                <div class="check_val">{estim_details[getDetailIndex()].RATING}</div>
                              </li>
                              <li>
                                <div class="check_title">Trim Material</div>
                                <div class="check_val">{estim_details[getDetailIndex()].PLUG_DISC_BALL}</div>
                              </li>
                              <li>
                                <div class="check_title">End Connection</div>
                                <div class="check_val">{estim_details[getDetailIndex()].END_CONNECTION}</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        {' '}
                        <div
                          class="swiper-slide"
                          data-title="Fluid Information"
                        >
                          <div class="swiper_wrap">
                            <div class="etc_info">
                              <span class="bold">Fluid</span> : Liquid{' '}
                            </div>
                            <table class="table_input bold table_border_bk">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Max</th>
                                  <th>Normal</th>
                                  <th>Min</th>
                                  <th>Unit</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>Q</th>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <th>P1</th>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <th>P2</th>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <th>T1</th>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <th>Density</th>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <th>Molecular</th>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        {' '}
                        <div
                          class="swiper-slide"
                          data-title="Accessory Information"
                        >
                          <div class="swiper_wrap">
                            <div class="white_box_title">Positioner</div>
                            <ul class="qttnCheck_box white_box">
                              <li>
                                <div class="check_title">Type</div>
                                <div class="check_val">P.P </div>
                              </li>
                              <li>
                                <div class="check_title">Explosion proof</div>
                                <div class="check_val">본질안전</div>
                              </li>
                              <li>
                                <div class="check_title">Communication</div>
                                <div class="check_val">+HART</div>
                              </li>
                              <li>
                                <div class="check_title">Transmitter</div>
                                <div class="check_val">YES</div>
                              </li>
                              <li>
                                <div class="check_title">Material</div>
                                <div class="check_val">General</div>
                              </li>
                            </ul>
                            <div class="etc_info">Solenoid Valve </div>
                            <div class="etc_info">Conduit Connection</div>
                            <div class="white_box_title">Positioner</div>
                            <ul class="qttnCheck_box white_box">
                              <li>
                                <div class="check_title">Air Supply </div>
                                <div class="check_val">PT.F 1/2</div>
                              </li>
                              <li>
                                <div class="check_title">EElectrical</div>
                                <div class="check_val">NPT 1/2</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                  {/* <!-- // Swiper --> */}
                  <div class="officer_date_list">
                    <ul>
                      <li>
                        <div class="officer_title">견적접수</div>
                        <div class="officer_date">{estim_details[getDetailIndex()].M_IL}</div>
                      </li>
                      <li class="now_state">
                        <div class="officer_title">접수중</div>
                        <div class="officer_date">{estim_details[getDetailIndex()].M_IL}</div>
                      </li>
                      <li>
                        <div class="officer_title">견적완료</div>
                        <div class="officer_date">{estim_details[getDetailIndex()].M_IL}</div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <!-- // hide_box --> */}
                <button class="toggle_btn" onClick={(e)=>getEstimationDetails(e.target,row.EST_NO,row.REV_NO)}>
                  <span>상세정보조회</span>
                </button>
              </li>
                )
              })
              /* =============== 견적 목록 끝 =============== */}
            </ul>
          </div>
        </div>
      </div>
      <footer class="common_footer">
        <div class="footer_logo"></div>
        <div class="footer_info">
          <address>경기 시흥시 엠티브이 25로 20번길, 38</address>
          <div class="tel">
            <span>
              Tel : <a href="tel:0314994903">+82 (0)31-499-4903</a>
            </span>
            <span>FAX : +82 (0)31-499-0836</span>
          </div>
          <div class="email">
            Email :{' '}
            <a href="mailto:proval.md@proval.co.kr">proval.md@proval.co.kr</a>
          </div>
        </div>
      </footer>
      {/* <!-- modalDate --> */}
      <div id="modalDate" class="modal">
        <div class="modal_wrap">
          <div class="modal_header includ_title">
            조회옵션
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <div class="cont_group">
                <div class="modal_subtitle bold">조회기간</div>
                <div class="date_btns">
                  <button
                    class="btn btn_sm btn_dateDuration"
                    data-duration="1m"
                  >
                    1개월
                  </button>
                  <button
                    class="btn btn_sm btn_dateDuration"
                    data-duration="3m"
                  >
                    3개월
                  </button>
                  <button
                    class="btn btn_sm btn_dateDuration"
                    data-duration="6m"
                  >
                    6개월
                  </button>
                  <button
                    class="btn btn_sm btn_dateDuration"
                    data-duration="1y"
                  >
                    1년
                  </button>
                </div>
                <div class="date_selects">
                  <div class="datepick_item">
                    <input type="text" id="searchStartDate" class="datepick" value={str_date_from} />
                  </div>
                  <span class="dasi">-</span>
                  <div class="datepick_item">
                    <input type="text" id="searchEndDate" class="datepick" value={str_date_to} />
                  </div>
                </div>
              </div>
              <div class="cont_group">
                <div class="modal_subtitle bold">전체조회</div>
                {
                  (function() {
                    if (str_order_by == 'A') {
                      return(
                        <div class="all_searchs">
                          <button class="btn btn_sm" style={style_background_hilight} id="sch_order_asc" onClick={()=>setOrderBy('A')}>최신순</button>
                          <button class="btn btn_sm" style={style_background_normal} id="sch_order_desc" onClick={()=>setOrderBy('D')}>과거순</button>
                          <div class="btns_center">
                            <button class="btn btn_md btn_shadow" id="btn_setting_ok" onClick={()=>okSearchSettings()}>확인</button>
                          </div>
                        </div>
                      )
                      }else{
                        return(
                          <div class="all_searchs">
                            <button class="btn btn_sm" style={style_background_normal} id="sch_order_asc" onClick={()=>setOrderBy('A')}>최신순</button>
                            <button class="btn btn_sm" style={style_background_hilight} id="sch_order_desc" onClick={()=>setOrderBy('D')}>과거순</button>
                            <div class="btns_center">
                              <button class="btn btn_md btn_shadow" id="btn_setting_ok" onClick={()=>okSearchSettings()}>확인</button>
                            </div>
                          </div>
                        )
                      }
                  })()
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- modalCancleConfirm --> */}
      <div id="modalCancleConfirm" class="modal">
        <div class="modal_wrap">
          <div class="modal_header">
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <div class="model_desc">견적 요청을 취소 하시겠습니까?</div>
              <button
                class="btn btn_100 btn_shadow modal_btn btn_modal_cancle"
                data-modal="modalCancle"
              >
                YES
              </button>
              <button class="btn btn_100 btn_gray btn_shadow btn_modal_cancle">
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modalRevision--> */}
      <div id="modalRevision" class="modal">
        <div class="modal_wrap">
          <div class="modal_header includ_title">
            리비전 이력
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <ul class="revision_list">
              {
                rev_list.map(function(row, index) {
                  if (row.REV_NO == row.CUR_REV_NO) {
                    return(
                      <li class="now_revision">
                        <div class="revision_date">{row.M_IL}</div>
                        <div class="revision_cont_box">
                          <div class="revision_cont">{row.REV_NO}</div>
                        </div>
                      </li>
                    )
                  }else{
                    return(
                      <li>
                        <div class="revision_date">{row.M_IL}</div>
                        <div class="revision_cont_box">
                          <div class="revision_cont">{row.REV_NO}</div>
                          <div class="revision_btn">
                            <button class="btn btn_wh btn_show_rev" onClick={()=>getEstimationRevision(row.EST_NO, row.REV_NO, row.PROJECT)}>이동</button>
                          </div>
                        </div>
                      </li>
                    )
                  }
                })
              }
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modalCancle--> */}
      <div id="modalCancle" class="modal">
        <div class="modal_wrap">
          <div class="modal_header">
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <div class="model_desc">취소가 완료되었습니다.</div>
              <button class="btn btn_modal_cancle">확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfficerCrown
