import React from 'react'
import $ from 'jquery'
import logo from '../images/logo.png'
import 'jquery-ui-dist/jquery-ui'
import { Swiper, SwiperSlide } from 'swiper/react'

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Link } from 'react-router-dom'

const QttnStart = () => {
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
      buttonImage: '../resources/images/btn_date.png', // 조그만한 아이콘 이미지
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

      if (valveLeng == 1 || valveLeng == 1) {
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
          <div class="page_title">견적요청</div>
        </div>
        <Link to="/menu" class="gnb_btn">
          <span></span>
          <span></span>
          <span></span>
        </Link>
      </header>
      <div class="wrap full_wrap">
        <form action="">
          <div class="full_wrap_pd flex_box valve_controller">
            <div class="left_box">
              <button class="btn btn_sm btn_wh add_valve">벨브추가</button>
              <button class="btn btn_sm btn_wh remove_valve">삭제</button>
            </div>
            <div class="right_box">
              <button class="btn_dobleArrow_left btn_valve_prev"></button>
              <div class="square_box_wrap">
                <ul class="square_box">
                  <li class="valve_default square_active">1</li>
                  <li class="plus">+</li>
                  <li class="blank_box"></li>
                  <li class="blank_box"></li>
                </ul>
              </div>
              <button class="btn_dobleArrow_right btn_valve_next"></button>
            </div>
          </div>
          <div class="full_wrap_pd">
            <div class="company_title">포스코</div>
            <div class="tag_box flex_box">
              <div class="tag_label ">
                <span class="num tag_btn">1</span>
                <span class="tab_no">Tag No.</span>
              </div>
              <div class="tag_input">
                <input type="text" value="FC603" />
                <button class="tag_btn tab_btn_sky">수정</button>
              </div>
            </div>
          </div>

          {/* <!-- Swiper --> */}

          <div class="swiper_btn_box">
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>

          <div class="swiper qttn_swiperr">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
            >
              <SwiperSlide>
                <div class="sub_box1">
                  <div class="sub_title1">Body / Actuator Information</div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="sub_box1">
                  <div class="sub_title1">Fluid Information</div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="sub_box1">
                  <div class="sub_title1">Accessory Information</div>
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
              <div class="swiper-wrapper">
                <SwiperSlide>
                  <div class="swiper_wrap">
                    <div class="input_group">
                      <label for="">Q'ty(Set)</label>
                      <div class="mount_box">
                        <input type="text" value="1" />
                        <div class="mount_btn">
                          <button class="btn_up"></button>
                          <button class="btn_down"></button>
                        </div>
                      </div>
                    </div>
                    <div class="input_group">
                      <div class="check_item w_50">
                        <input type="checkbox" id="conrolValve" />
                        <label for="conrolValve">Control Valve</label>
                      </div>
                      <div class="check_item w_50">
                        <input type="checkbox" id="onoffValve" />
                        <label for="onoffValve">On-Off Valve</label>
                      </div>
                    </div>
                    <div class="blue_box">
                      <div class="blue_title">Valve Type</div>
                      <div class="blue_cont">
                        <div class="input_group">
                          <div class="input_group w_50">
                            <div class="check_item w_50">
                              <input type="checkbox" id="conrolValve" />
                              <label for="conrolValve">2 way</label>
                            </div>
                            <div class="check_item w_50">
                              <input type="checkbox" id="conrolValve" />
                              <label for="conrolValve">3 way</label>
                            </div>
                          </div>
                          <div class="w_50 bold">Control Globe</div>
                        </div>
                        <div class="input_group">
                          <div class="check_item bold">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Angle</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="check_item bold">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Segmental Ball</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="check_item bold">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">
                              Hi-Performance Butterfly
                            </label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="check_item bold">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Std. Butterfly</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="input_group w_50">
                            <div class="check_item w_50">
                              <input type="checkbox" id="conrolValve" />
                              <label for="conrolValve">2 way</label>
                            </div>
                            <div class="check_item w_50">
                              <input type="checkbox" id="conrolValve" />
                              <label for="conrolValve">3 way</label>
                            </div>
                          </div>
                          <div class="w_50 bold">Conventional Ball</div>
                        </div>
                      </div>
                    </div>
                    <div class="no_blue_box">
                      <div class="input_group">
                        <div class="w_50 vertical_group">
                          <label for="" class="bold">
                            Body Size
                          </label>
                          <select name="" id="">
                            <option value="">-</option>
                          </select>
                        </div>
                        <div class="w_50 vertical_group">
                          <label for="" class="bold">
                            Body Material
                          </label>
                          <select name="" id="">
                            <option value="">-</option>
                          </select>
                        </div>
                      </div>
                      <div class="input_group">
                        <div class="w_50 vertical_group">
                          <label for="" class="bold">
                            Body Rating
                          </label>
                          <select name="" id="">
                            <option value="">-</option>
                          </select>
                        </div>
                        <div class="w_50 vertical_group">
                          <label for="" class="bold">
                            Trim Material
                          </label>
                          <select name="" id="">
                            <option value="">-</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="blue_box">
                      <div class="blue_title">End Connection</div>
                      <div class="blue_cont">
                        <div class="input_group check_more_box">
                          <div class="check_item w_50">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Flange</label>
                          </div>
                          <div class="check_item w_50">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Screw</label>
                          </div>
                          <div class="check_item w_50">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Socket welding</label>
                          </div>
                          <div class="check_item w_50">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Butt welding</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="no_blue_box">
                      <div class="title">Actuator</div>
                      <div class="input_group">
                        <div class="check_item w_33">
                          <input type="checkbox" id="conrolValve" />
                          <label for="conrolValve">Pneumatic</label>
                        </div>
                        <div class="check_item w_33">
                          <input type="checkbox" id="conrolValve" />
                          <label for="conrolValve">Electric</label>
                        </div>
                        <div class="check_item w_33">
                          <input type="checkbox" id="conrolValve" />
                          <label for="conrolValve">Hydraulic</label>
                        </div>
                      </div>
                    </div>
                    <div class="no_blue_box">
                      <div class="title">Handle</div>
                      <div class="input_group">
                        <div class="check_item w_50">
                          <input type="checkbox" id="conrolValve" />
                          <label for="conrolValve">Yes</label>
                        </div>
                        <div class="check_item w_50">
                          <input type="checkbox" id="conrolValve" />
                          <label for="conrolValve">No</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
              <SwiperSlide>
                <div class="swiper-slide" data-title="Fluid Information">
                  <div class="swiper_wrap">
                    <div class="blue_box">
                      <div class="blue_title">Fluid</div>
                      <div class="blue_cont">
                        <div class="input_group check_more_box">
                          <div class="check_item w_33">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Liquid</label>
                          </div>
                          <div class="check_item w_33">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Stram</label>
                          </div>
                          <div class="check_item w_33">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Gas</label>
                          </div>
                          <table class="table_input bold">
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
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <select name="" id="" class="w_100">
                                    <option value="-">-</option>
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <th>P1</th>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <select name="" id="" class="w_100">
                                    <option value="-">-</option>
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <th>P2</th>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <select name="" id="" class="w_100">
                                    <option value="-">-</option>
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <th>T1</th>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <select name="" id="" class="w_100">
                                    <option value="-">-</option>
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <th colspan="2">Density</th>
                                <td colspan="2">
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <select name="" id="" class="w_100">
                                    <option value="-">-</option>
                                  </select>
                                </td>
                              </tr>
                              <tr>
                                <th colspan="2">Molecular</th>
                                <td colspan="2">
                                  <input type="text" class="input_bk" />
                                </td>
                                <td>
                                  <select name="" id="" class="w_100">
                                    <option value="-">-</option>
                                  </select>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="swiper-slide" data-title="Accessory Information">
                  <div class="swiper_wrap">
                    <div class="blue_box">
                      <div class="blue_title">Accessory</div>
                      <div class="blue_cont">
                        <div class="input_group">
                          <div class="check_item bold">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Positioner</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="small_title w_25">Type</div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">P.P</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">E.P</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Smart</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="check_item w_50">
                            <div class="small_title">Explosion proof</div>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Yes</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">No</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="w_25"></div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">내압</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">본질안전</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">수소방폭</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="check_item w_50">
                            <div class="small_title">Communication</div>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">+HART</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">+Field-bus</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="check_item w_50">
                            <div class="small_title">Transmitter</div>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Yes</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">No</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="check_item w_50">
                            <div class="small_title">Material</div>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">General</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">SUS</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="check_item bold">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Solenoid Valve</label>
                          </div>
                        </div>
                        <div class="input_group">
                          <div class="check_item bold">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">Linit Switch</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="blue_box">
                      <div class="blue_title">Conduit Connection</div>
                      <div class="blue_cont">
                        <div class="input_group check_more_box">
                          <div class="small_title w_100">AirSupply</div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">PT</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">PT.F</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">NPT</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">NPT.F</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">1/2</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">1/4</label>
                          </div>
                          <div class="w_50">
                            <input type="text" class="input_bk" />
                          </div>
                        </div>
                        <div class="input_group check_more_box">
                          <div class="small_title w_100">Electrical</div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">PT</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">PT.F</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">NPT</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">NPT.F</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">1/2</label>
                          </div>
                          <div class="check_item w_25">
                            <input type="checkbox" id="conrolValve" />
                            <label for="conrolValve">1/4</label>
                          </div>
                          <div class="w_50">
                            <input type="text" class="input_bk" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="blue_box">
                      <div class="blue_title">Other requests</div>
                      <div class="blue_cont">
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          class="input_bk"
                        ></textarea>
                      </div>
                    </div>
                    <a href="qttnCheck.html" class="btn btn_100">
                      정보 입력 완료
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </form>
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
    </div>
  )
}

export default QttnStart
