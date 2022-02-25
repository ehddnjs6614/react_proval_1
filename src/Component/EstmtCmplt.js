import React, { useState } from 'react'
import logo from '../images/logo.png'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'

const EstmtCmplt = () => {
  $(function () {
    $('.toggle_btn').on('click', function () {
      var toggleBox = $(this).closest('li').find('.toggle_box')
      toggleBox.toggleClass('open_box')
      if (toggleBox.hasClass('open_box')) {
        $(this).find('span').text('간단히')
        $(this).addClass('open_btn')
      } else {
        $(this).find('span').text('상세정보조회')
        $(this).removeClass('open_btn')
      }
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
        .addClass('modal_show')
    })

    $('.modal .btn_cancle, .btn_modal_cancle').on('click', function () {
      $(this).closest('.modal').fadeOut().removeClass('.modal_show')
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
        .before('<li class="valve_default">' + valveLeng + '</li>')

      if (valveLeng == 2 || valveLeng == 3) {
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

        if (valveLeng == 1 || valveLeng == 2) {
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
      $(this).siblings('li').removeClass('tag_active')
      $(this).addClass('tag_active')
    })

    // 상세정보 버튼

    //  비밀번호 찾기 이메일 주소
    $('#findIdModal').on('click', function () {
      $('.find_email').text($('#findID').val())
    })
  })

  return (
    <div>
      <header>
        <div class="logo_box">
          <h1>
            <Link to="main">
              <img src={logo} alt="proval로고" />
            </Link>
          </h1>
          <div class="page_title">견적관리</div>
        </div>
        <Link to="menu" class="gnb_btn">
          <span></span>
          <span></span>
          <span></span>
        </Link>
      </header>
      <div class="wrap full_wrap">
        <div class="full_wrap_pd tab_btns">
          <button
            class="btn btn_gray"
            onClick={() => {
              window.location.replace('/officerCrown')
            }}
          >
            견적 진행중
          </button>
          {/* <Link to="officerCrown" class="btn btn_gray">
            견적 진행중
          </Link> */}
          <Link to="estmtCmplt" class="btn btn_gray tab_active">
            견적 완료
          </Link>
        </div>
        <div class="full_wrap_pd cont">
          <div class="flex_box date_box">
            <div class="left_box">
              <span class="year">2021년</span>
              <div class="swiper_select_box">
                <button class="prev_btn"></button>
                <span class="swiper_cont">2월</span>
                <button class="next_btn"></button>
              </div>
            </div>
            <div class="right_box">
              <button
                href=""
                class="btn_cog modal_btn"
                data-modal="modalDate"
              ></button>
            </div>
          </div>
          <div class="select_list">
            <ul>
              <li>
                <div class="list_li list_head">
                  <div class="table_title">PROJECT</div>
                  <div class="table_desc">삼성물산 #1</div>
                </div>
                <div class="list_middle_box">
                  <div class="list_middle_left">
                    <div class="list_li">
                      <div class="table_title">견적 번호</div>
                      <div class="table_desc">YA211203-036</div>
                    </div>
                    <div class="list_li">
                      <div class="table_title">견적 요청일</div>
                      <div class="table_desc">21.02.15</div>
                    </div>
                  </div>
                  <div class="list_middle_right">
                    <button
                      class="btn btn_wh modal_btn"
                      data-modal="modalOrder"
                    >
                      주문
                      <br />
                      진행
                    </button>
                  </div>
                </div>
                <div class="list_li">
                  <div class="list_middle_left list_li">
                    <div class="table_title">리비전</div>
                    <div class="table_desc">D</div>
                  </div>
                  <div class="list_middle_right mini_btn_box">
                    <button
                      class="btn btn_wh modal_btn"
                      data-modal="modalRevision"
                    >
                      조회
                    </button>
                  </div>
                </div>
                <Box />
                {/* <!-- // hide_box --> */}
                <button class="toggle_btn">
                  <span>상세정보조회</span>
                </button>
              </li>
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
                    <input type="text" id="searchStartDate" class="datepick" />
                  </div>
                  <span class="dasi">-</span>
                  <div class="datepick_item">
                    <input type="text" id="searchEndDate" class="datepick" />
                  </div>
                </div>
              </div>
              <div class="cont_group">
                <div class="modal_subtitle bold">전체조회</div>
                <div class="all_searchs">
                  <button class="btn btn_sm">최신순</button>
                  <button class="btn btn_sm">과거순</button>
                </div>
              </div>
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
                <li>
                  <div class="revision_date">21.01.03</div>
                  <div class="revision_cont_box">
                    <div class="revision_cont">A</div>
                    <div class="revision_btn">
                      <button class="btn btn_wh btn_modal_cancle">이동</button>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="revision_date">21.01.03</div>
                  <div class="revision_cont_box">
                    <div class="revision_cont">B</div>
                    <div class="revision_btn">
                      <button class="btn btn_wh btn_modal_cancle">이동</button>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="revision_date">21.01.03</div>
                  <div class="revision_cont_box">
                    <div class="revision_cont">C</div>
                    <div class="revision_btn">
                      <button class="btn btn_wh btn_modal_cancle">이동</button>
                    </div>
                  </div>
                </li>
                <li class="now_revision">
                  <div class="revision_date">21.01.03</div>
                  <div class="revision_cont_box">
                    <div class="revision_cont">D</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modalOrder --> */}
      <div id="modalOrder" class="modal">
        <div class="modal_wrap">
          <div class="modal_header">
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <div class="model_desc">
                주문이 접수되었습니다.
                <br /> 감사합니다.
              </div>
              <Link to="main" class="btn">
                홈으로
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modalEmail --> */}
      <div id="modalEmail" class="modal">
        <div class="modal_wrap">
          <div class="modal_header">
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <div class="model_desc">
                <p class="text_blue">proval.sd@proval.co.kr</p>
                귀하의 메일로 견적서를 발송 하시겠습니까?
              </div>
              <div class="btns_center">
                <button
                  class="btn btn_50 modal_btn btn_modal_cancle"
                  data-modal="modalEmailConfirm"
                >
                  메일전송
                </button>
                <button
                  class="btn btn_50 btn_gray modal_btn btn_modal_cancle"
                  data-modal="modalEmailInput"
                >
                  다른메일
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modalEmailInput --> */}
      <div id="modalEmailInput" class="modal">
        <div class="modal_wrap">
          <div class="modal_header">
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <div class="model_desc">
                <input type="text" class="big_input" />
                <p>메일 주소를 입력해 주세요.</p>
              </div>
              <button
                class="btn modal_btn btn_modal_cancle"
                data-modal="modalEmailConfirm"
              >
                메일전송
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modalEmailConfirm --> */}
      <div id="modalEmailConfirm" class="modal">
        <div class="modal_wrap">
          <div class="modal_header">
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <div class="model_desc">
                <p class="text_blue">proval.sd@proval.co.kr</p>
                견적서가 발송되었습니다.
                <br /> 감사합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Box() {
  return (
    <div>
      <div class="toggle_box">
        <div class="list_li">
          <div class="table_title">TAG NO.</div>
          <div class="table_desc tag_box">
            <ul class="tag_list">
              <li>
                <button class="btn_tag">FC603</button>
              </li>
              <li class="tag_active">
                <button class="btn_tag">FC604</button>
              </li>
              <li>
                <button class="btn_tag">FC605</button>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- Swiper --> */}
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
                <div class="sub_title">Body / Actuator Information</div>
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
            onSwiper={swiper => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
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
                      <div class="check_val">Controal Globe(2way)</div>
                    </li>
                    <li>
                      <div class="check_title">Body Size</div>
                      <div class="check_val">50A</div>
                    </li>
                    <li>
                      <div class="check_title">Body Material</div>
                      <div class="check_val"></div>
                    </li>
                    <li>
                      <div class="check_title">Body Rating</div>
                      <div class="check_val"></div>
                    </li>
                    <li>
                      <div class="check_title">Trim Material</div>
                      <div class="check_val"></div>
                    </li>
                    <li>
                      <div class="check_title">End Connection</div>
                      <div class="check_val"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <div class="swiper-slide" data-title="Fluid Information">
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
              <div class="swiper-slide" data-title="Accessory Information">
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
              <div class="officer_date">2021.02.05</div>
            </li>
            <li>
              <div class="officer_title">접수중</div>
              <div class="officer_date">2021.02.05</div>
            </li>
            <li>
              <div class="officer_title">견적완료</div>
              <div class="officer_date">2021.02.05</div>
            </li>
          </ul>
        </div>
        <div class="skyblue_box">
          <div class="estmt_title bold">견적금액</div>
          <div class="estmt_cont">
            <div class="estmt_money">1,000,000</div>
            <button class="btn btn_wh modal_btn" data-modal="modalEmail">
              견적서
              <br />
              메일전송
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EstmtCmplt
