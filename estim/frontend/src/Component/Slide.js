import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import $ from 'jquery'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import ValveController from './ValveController'

const Slide = props => {
  console.log(props)
  console.log(props.match.params.id)

  let CUST_NAMElData = sessionStorage.getItem('CUST_NAME')
  // let { title } = useParams()
  // console.log(title)

  //벨브추가 start

  // const addHandler = () => {
  //   IDX++

  //   newArr.push(IDX)

  //   setValve(newArr)
  // }

  // const deleteHandler = () => {
  //   if (valve.length === 1) {
  //     IDX = 1
  //   } else {
  //     IDX = 1

  //     let deleteArr = [...valve]

  //     deleteArr.pop()

  //     setValve(deleteArr)
  //   }
  // }
  //벨브추가 end

  //체크활성화

  //벨브 관련
  const inputRef = useRef('')
  const inputRef1 = useRef('')
  const inputRef2 = useRef('')
  const inputRef3 = useRef('')
  const inputRef4 = useRef('')
  const inputRef5 = useRef('')
  const inputRef6 = useRef('')
  const inputRef7 = useRef('')
  const inputRef8 = useRef('')
  const inputRef9 = useRef('')
  const inputRef10 = useRef('')
  const inputRef11 = useRef('')
  const inputRef12 = useRef('')
  const inputRef13 = useRef('')
  const inputRef14 = useRef('')
  const inputRef15 = useRef('')

  //체크활성화
  const handleFocus = e => {
    inputRef.current.disabled = false
    inputRef1.current.disabled = false
    inputRef2.current.disabled = false
    inputRef3.current.disabled = false
    inputRef4.current.disabled = false
    inputRef5.current.disabled = false
    inputRef6.current.disabled = false
    inputRef7.current.disabled = false
    inputRef8.current.disabled = false
    inputRef9.current.disabled = false
    inputRef10.current.disabled = false
    inputRef11.current.disabled = false
    inputRef12.current.disabled = false
    inputRef13.current.disabled = false
    inputRef14.current.disabled = false
    inputRef15.current.disabled = false

    alert('활성화')
  }
  //체크비활성화
  //   const handleReset = e => {
  //     inputRef.current.disabled = true
  //     inputRef.current.value = ''
  //   }

  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [q3, setQ3] = useState('')
  const [q4, setQ4] = useState('')
  const [q5, setQ5] = useState('')
  const [q6, setQ6] = useState('')
  const [q7, setQ7] = useState('')
  const [q8, setQ8] = useState('')
  const [q9, setQ9] = useState('')
  const [q10, setQ10] = useState('')
  const [q11, setQ11] = useState('')
  const [q12, setQ12] = useState('')
  const [q13, setQ13] = useState('')
  const [q14, setQ14] = useState('')
  const [q15, setQ15] = useState('')
  const [q16, setQ16] = useState('')
  const [q17, setQ17] = useState('')

  const changeRadioQ1 = e => {
    setQ1(e.target.value)
  }
  const changeRadioQ2 = e => {
    setQ2(e.target.value)
  }
  const changeRadioQ3 = e => {
    setQ3(e.target.value)
  }
  const changeRadioQ4 = e => {
    setQ4(e.target.value)
  }
  const changeRadioQ5 = e => {
    setQ5(e.target.value)
  }
  const changeRadioQ6 = e => {
    setQ6(e.target.value)
  }
  const changeRadioQ7 = e => {
    setQ7(e.target.value)
  }
  const changeRadioQ8 = e => {
    setQ8(e.target.value)
  }
  const changeRadioQ9 = e => {
    setQ9(e.target.value)
  }
  const changeRadioQ10 = e => {
    setQ10(e.target.value)
  }
  const changeRadioQ11 = e => {
    setQ11(e.target.value)
  }
  const changeRadioQ12 = e => {
    setQ12(e.target.value)
  }
  const changeRadioQ13 = e => {
    setQ13(e.target.value)
  }
  const changeRadioQ14 = e => {
    setQ14(e.target.value)
  }
  const changeRadioQ15 = e => {
    setQ15(e.target.value)
  }
  const changeRadioQ16 = e => {
    setQ16(e.target.value)
  }
  const changeRadioQ17 = e => {
    setQ17(e.target.value)
  }

  $(function () {
    // 컨텐츠 기본높이

    // 벨브 관련 ====================
    $('.square_box').on('click', '.valve_default', function () {
      $(this).siblings('li').removeClass('square_active')

      $(this).addClass('square_active')
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
  })

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
        <Link to="/menu" className="gnb_btn">
          <span></span>
          <span></span>
          <span></span>
        </Link>
      </header>
      <div className="wrap full_wrap">
        <ValveController />
        {/* <div className="full_wrap_pd flex_box valve_controller">
          <div className="left_box">
            <button className="btn btn_sm btn_wh" onClick={addHandler}>
              벨브추가
            </button>

            <button className="btn btn_sm btn_wh" onClick={deleteHandler}>
              삭제
            </button>
          </div>
          <div className="right_box">
            <button className="btn_dobleArrow_left btn_valve_prev"></button>
            <div className="square_box_wrap">
              <ul className="square_box">
                {valve.map((item, idx) => {
                  return (
                    <>
                      <li className="valve_default square_active" key={idx}>
                        <Link to="slide">{item}</Link>
                      </li>
                    </>
                  )
                })}

                <li className="plus">+</li>
              </ul>
            </div>
            <button className="btn_dobleArrow_right btn_valve_next"></button>
          </div>
        </div> */}
        <div className="full_wrap_pd">
          <div className="company_title">{CUST_NAMElData}</div>
          <div className="tag_box flex_box">
            <div className="tag_label ">
              <span className="num tag_btn">1</span>
              <span className="tab_no">Tag No.</span>
            </div>
            <div className="tag_input">
              <input type="text" value="FC603" />
              <button className="tag_btn tab_btn_sky">수정</button>
            </div>
          </div>
        </div>

        {/* <!-- Swiper --> */}

        <div className="swiper_btn_box">
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>

        <div className="swiper qttn_swiperr">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            <SwiperSlide>
              <div className="sub_box1">
                <div className="sub_title1">Body / Actuator Information</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="sub_box1">
                <div className="sub_title1">Fluid Information</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="sub_box1">
                <div className="sub_title1">Accessory Information</div>
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
            <div className="swiper-wrapper">
              <SwiperSlide>
                <div className="swiper_wrap">
                  <div className="input_group">
                    <label htmlFor="">Q'ty(Set)</label>
                    <div className="mount_box">
                      <input type="text" value="1" />
                      <div className="mount_btn">
                        <button className="btn_up"></button>
                        <button className="btn_down"></button>
                      </div>
                    </div>
                  </div>
                  <div className="input_group">
                    <div className="check_item w_50">
                      <input
                        type="radio"
                        id="conrolValve"
                        name="conrolValve"
                        value="conrolValve"
                        checked={q2 === 'conrolValve' ? true : false}
                        onChange={changeRadioQ2}
                      />
                      <label htmlFor="conrolValve">Control Valve</label>
                    </div>
                    <div className="check_item w_50">
                      <input
                        type="radio"
                        id="conoffValve1"
                        name="conrolValve1"
                        value="conrolValve1"
                        checked={q2 === 'conrolValve1' ? true : false}
                        onChange={changeRadioQ2}
                      />
                      <label htmlFor="conoffValve1">On-Off Valve</label>
                    </div>
                  </div>
                  <div className="blue_box">
                    <div className="blue_title">Valve Type</div>
                    <div className="blue_cont">
                      <div className="input_group">
                        <div className="input_group w_50">
                          <div className="check_item w_50">
                            <input
                              type="radio"
                              name="onoffValve1"
                              id="onoffValve1"
                              value="onoffValve1"
                              checked={q1 === 'onoffValve1' ? true : false}
                              onChange={changeRadioQ1}
                            />
                            <label htmlFor="onoffValve1">2 way</label>
                          </div>
                          <div className="check_item w_50">
                            <input
                              type="radio"
                              name="onoffValve2"
                              id="onoffValve2"
                              value="onoffValve2"
                              checked={q1 === 'onoffValve2' ? true : false}
                              onChange={changeRadioQ1}
                            />
                            <label htmlFor="onoffValve2">3 way</label>
                          </div>
                        </div>
                        <div className="w_50 bold">Control Globe</div>
                      </div>
                      <div className="input_group">
                        <div className="check_item bold">
                          <input type="checkbox" id="conrolValve2" />
                          <label htmlFor="conrolValve2">Angle</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="check_item bold">
                          <input type="checkbox" id="conrolValve3" />
                          <label htmlFor="conrolValve3">Segmental Ball</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="check_item bold">
                          <input type="checkbox" id="conrolValve4" />
                          <label htmlFor="conrolValve4">
                            Hi-Performance Butterfly
                          </label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="check_item bold">
                          <input type="checkbox" id="conrolValve5" />
                          <label htmlFor="conrolValve5">Std. Butterfly</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="input_group w_50">
                          <div className="check_item w_50">
                            <input
                              type="checkbox"
                              id="conrolValve6"
                              name="conrolValve6"
                              value="conrolValve6"
                              checked={q3 === 'conrolValve6' ? true : false}
                              onChange={changeRadioQ3}
                            />
                            <label htmlFor="conrolValve6">2 way</label>
                          </div>
                          <div className="check_item w_50">
                            <input
                              type="checkbox"
                              id="conrolValve7"
                              name="conrolValve7"
                              value="conrolValve7"
                              checked={q3 === 'conrolValve7' ? true : false}
                              onChange={changeRadioQ3}
                            />
                            <label htmlFor="conrolValve7">3 way</label>
                          </div>
                        </div>
                        <div className="w_50 bold">Conventional Ball</div>
                      </div>
                    </div>
                  </div>
                  <div className="no_blue_box">
                    <div className="input_group">
                      <div className="w_50 vertical_group">
                        <label htmlFor="" className="bold">
                          Body Size
                        </label>
                        <select name="" id="">
                          <option value="">-</option>
                        </select>
                      </div>
                      <div className="w_50 vertical_group">
                        <label htmlFor="" className="bold">
                          Body Material
                        </label>
                        <select name="" id="">
                          <option value="">-</option>
                        </select>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="w_50 vertical_group">
                        <label htmlFor="" className="bold">
                          Body Rating
                        </label>
                        <select name="" id="">
                          <option value="">-</option>
                        </select>
                      </div>
                      <div className="w_50 vertical_group">
                        <label htmlFor="" className="bold">
                          Trim Material
                        </label>
                        <select name="" id="">
                          <option value="">-</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="blue_box">
                    <div className="blue_title">End Connection</div>
                    <div className="blue_cont">
                      <div className="input_group check_more_box">
                        <div className="check_item w_50">
                          <input
                            type="checkbox"
                            id="conrolValve8"
                            name="conrolValve8"
                            value="conrolValve8"
                            checked={q4 === 'conrolValve8' ? true : false}
                            onChange={changeRadioQ4}
                          />
                          <label htmlFor="conrolValve8">Flange</label>
                        </div>
                        <div className="check_item w_50">
                          <input
                            type="checkbox"
                            id="conrolValve9"
                            name="conrolValve9"
                            value="conrolValve9"
                            checked={q4 === 'conrolValve9' ? true : false}
                            onChange={changeRadioQ4}
                          />
                          <label htmlFor="conrolValve9">Screw</label>
                        </div>
                        <div className="check_item w_50">
                          <input
                            type="checkbox"
                            id="conrolValve10"
                            name="conrolValve10"
                            value="conrolValve10"
                            checked={q4 === 'conrolValve10' ? true : false}
                            onChange={changeRadioQ4}
                          />
                          <label htmlFor="conrolValve10">Socket welding</label>
                        </div>
                        <div className="check_item w_50">
                          <input
                            type="checkbox"
                            id="conrolValve11"
                            name="conrolValve11"
                            value="conrolValve11"
                            checked={q4 === 'conrolValve11' ? true : false}
                            onChange={changeRadioQ4}
                          />
                          <label htmlFor="conrolValve11">Butt welding</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="no_blue_box">
                    <div className="title">Actuator</div>
                    <div className="input_group">
                      <div className="check_item w_33">
                        <input
                          type="checkbox"
                          id="conrolValve12"
                          name="conrolValve12"
                          value="conrolValve12"
                          checked={q5 === 'conrolValve12' ? true : false}
                          onChange={changeRadioQ5}
                        />
                        <label htmlFor="conrolValve12">Pneumatic</label>
                      </div>
                      <div className="check_item w_33">
                        <input
                          type="checkbox"
                          id="conrolValve13"
                          name="conrolValve13"
                          value="conrolValve13"
                          checked={q5 === 'conrolValve13' ? true : false}
                          onChange={changeRadioQ5}
                        />
                        <label htmlFor="conrolValve13">Electric</label>
                      </div>
                      <div className="check_item w_33">
                        <input
                          type="checkbox"
                          id="conrolValve14"
                          name="conrolValve14"
                          value="conrolValve14"
                          checked={q5 === 'conrolValve14' ? true : false}
                          onChange={changeRadioQ5}
                        />
                        <label htmlFor="conrolValve14">Hydraulic</label>
                      </div>
                    </div>
                  </div>
                  <div className="no_blue_box">
                    <div className="title">Handle</div>
                    <div className="input_group">
                      <div className="check_item w_50">
                        <input
                          type="checkbox"
                          id="conrolValve15"
                          name="conrolValve15"
                          value="conrolValve15"
                          checked={q6 === 'conrolValve15' ? true : false}
                          onChange={changeRadioQ6}
                        />
                        <label htmlFor="conrolValve15">Yes</label>
                      </div>
                      <div className="check_item w_50">
                        <input
                          type="checkbox"
                          id="conrolValve16"
                          name="conrolValve16"
                          value="conrolValve16"
                          checked={q6 === 'conrolValve16' ? true : false}
                          onChange={changeRadioQ6}
                        />
                        <label htmlFor="conrolValve16">No</label>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </div>
            <SwiperSlide>
              <div className="swiper-slide" data-title="Fluid Information">
                <div className="swiper_wrap">
                  <div className="blue_box">
                    <div className="blue_title">Fluid</div>
                    <div className="blue_cont">
                      <div className="input_group check_more_box">
                        <div className="check_item w_33">
                          <input
                            type="checkbox"
                            id="conrolValve17"
                            name="conrolValve17"
                            value="conrolValve17"
                            checked={q7 === 'conrolValve17' ? true : false}
                            onChange={changeRadioQ7}
                          />
                          <label htmlFor="conrolValve17">Liquid</label>
                        </div>
                        <div className="check_item w_33">
                          <input
                            type="checkbox"
                            id="conrolValve18"
                            name="conrolValve18"
                            value="conrolValve18"
                            checked={q7 === 'conrolValve18' ? true : false}
                            onChange={changeRadioQ7}
                          />
                          <label htmlFor="conrolValve18">Stram</label>
                        </div>
                        <div className="check_item w_33">
                          <input
                            type="checkbox"
                            id="conrolValve19"
                            name="conrolValve19"
                            value="conrolValve19"
                            checked={q7 === 'conrolValve19' ? true : false}
                            onChange={changeRadioQ7}
                          />
                          <label htmlFor="conrolValve19">Gas</label>
                        </div>
                        <table className="table_input bold">
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
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <select name="" id="" className="w_100">
                                  <option value="-">-</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <th>P1</th>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <select name="" id="" className="w_100">
                                  <option value="-">-</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <th>P2</th>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <select name="" id="" className="w_100">
                                  <option value="-">-</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <th>T1</th>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <select name="" id="" className="w_100">
                                  <option value="-">-</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <th colspan="2">Density</th>
                              <td colspan="2">
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <select name="" id="" className="w_100">
                                  <option value="-">-</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <th colspan="2">Molecular</th>
                              <td colspan="2">
                                <input type="text" className="input_bk" />
                              </td>
                              <td>
                                <select name="" id="" className="w_100">
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
              <div className="swiper-slide" data-title="Accessory Information">
                <div className="swiper_wrap">
                  <div className="blue_box">
                    <div className="blue_title">Accessory</div>
                    <div className="blue_cont" aria-disabled>
                      <div className="input_group">
                        <div className="check_item bold">
                          <input
                            type="checkbox"
                            id="conrolValve100"
                            onClick={handleFocus}
                          />
                          <label htmlFor="conrolValve100">Positioner</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="small_title w_25">Type</div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve20"
                            name="conrolValve20"
                            value="conrolValve20"
                            checked={q8 === 'conrolValve20' ? true : false}
                            onChange={changeRadioQ8}
                            disabled
                            ref={inputRef}
                          />
                          <label htmlFor="conrolValve20">P.P</label>
                        </div>

                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve21"
                            name="conrolValve21"
                            value="conrolValve21"
                            checked={q8 === 'conrolValve21' ? true : false}
                            onChange={changeRadioQ8}
                            disabled
                            ref={inputRef1}
                          />
                          <label htmlFor="conrolValve21">E.P</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve22"
                            name="conrolValve22"
                            value="conrolValve22"
                            checked={q8 === 'conrolValve22' ? true : false}
                            onChange={changeRadioQ8}
                            disabled
                            ref={inputRef2}
                          />
                          <label htmlFor="conrolValve22">Smart</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="check_item w_50">
                          <div className="small_title">Explosion proof</div>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve23"
                            name="conrolValve23"
                            value="conrolValve23"
                            checked={q9 === 'conrolValve23' ? true : false}
                            onChange={changeRadioQ9}
                            disabled
                            ref={inputRef3}
                          />
                          <label htmlFor="conrolValve23">Yes</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve24"
                            name="conrolValve24"
                            value="conrolValve24"
                            checked={q9 === 'conrolValve24' ? true : false}
                            onChange={changeRadioQ9}
                            disabled
                            ref={inputRef4}
                          />
                          <label htmlFor="conrolValve24">No</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="w_25"></div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve25"
                            name="conrolValve25"
                            value="conrolValve25"
                            checked={q10 === 'conrolValve25' ? true : false}
                            onChange={changeRadioQ10}
                            disabled
                            ref={inputRef5}
                          />
                          <label htmlFor="conrolValve25">내압</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve26"
                            name="conrolValve26"
                            value="conrolValve26"
                            checked={q10 === 'conrolValve26' ? true : false}
                            onChange={changeRadioQ10}
                            disabled
                            ref={inputRef6}
                          />
                          <label htmlFor="conrolValve26">본질안전</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve27"
                            name="conrolValve27"
                            value="conrolValve27"
                            checked={q10 === 'conrolValve27' ? true : false}
                            onChange={changeRadioQ10}
                            disabled
                            ref={inputRef7}
                          />
                          <label htmlFor="conrolValve27">수소방폭</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="check_item w_50">
                          <div className="small_title">Communication</div>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve28"
                            name="conrolValve28"
                            value="conrolValve28"
                            checked={q11 === 'conrolValve28' ? true : false}
                            onChange={changeRadioQ11}
                            disabled
                            ref={inputRef8}
                          />
                          <label htmlFor="conrolValve28">+HART</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve29"
                            name="conrolValve29"
                            value="conrolValve29"
                            checked={q11 === 'conrolValve29' ? true : false}
                            onChange={changeRadioQ11}
                            disabled
                            ref={inputRef9}
                          />
                          <label htmlFor="conrolValve29">+Field-bus</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="check_item w_50">
                          <div className="small_title">Transmitter</div>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve30"
                            name="conrolValve30"
                            value="conrolValve30"
                            checked={q12 === 'conrolValve30' ? true : false}
                            onChange={changeRadioQ12}
                            disabled
                            ref={inputRef10}
                          />
                          <label htmlFor="conrolValve30">Yes</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve31"
                            name="conrolValve31"
                            value="conrolValve31"
                            checked={q12 === 'conrolValve31' ? true : false}
                            onChange={changeRadioQ12}
                            disabled
                            ref={inputRef11}
                          />
                          <label htmlFor="conrolValve31">No</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="check_item w_50">
                          <div className="small_title">Material</div>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve32"
                            name="conrolValve32"
                            value="conrolValve32"
                            checked={q13 === 'conrolValve32' ? true : false}
                            onChange={changeRadioQ13}
                            disabled
                            ref={inputRef12}
                          />
                          <label htmlFor="conrolValve32">General</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve33"
                            name="conrolValve33"
                            value="conrolValve33"
                            checked={q13 === 'conrolValve33' ? true : false}
                            onChange={changeRadioQ13}
                            disabled
                            ref={inputRef13}
                          />
                          <label htmlFor="conrolValve33">SUS</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="check_item bold">
                          <input
                            type="checkbox"
                            id="conrolValve34"
                            disabled
                            ref={inputRef14}
                          />
                          <label htmlFor="conrolValve34">Solenoid Valve</label>
                        </div>
                      </div>
                      <div className="input_group">
                        <div className="check_item bold">
                          <input
                            type="checkbox"
                            id="conrolValve35"
                            disabled
                            ref={inputRef15}
                          />
                          <label htmlFor="conrolValve35">Linit Switch</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blue_box">
                    <div className="blue_title">Conduit Connection</div>
                    <div className="blue_cont">
                      <div className="input_group check_more_box">
                        <div className="small_title w_100">AirSupply</div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve36"
                            name="conrolValve36"
                            value="conrolValve36"
                            checked={q14 === 'conrolValve36' ? true : false}
                            onChange={changeRadioQ14}
                          />
                          <label htmlFor="conrolValve36">PT</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve37"
                            name="conrolValve37"
                            value="conrolValve37"
                            checked={q14 === 'conrolValve37' ? true : false}
                            onChange={changeRadioQ14}
                          />
                          <label htmlFor="conrolValve37">PT.F</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve38"
                            name="conrolValve38"
                            value="conrolValve38"
                            checked={q14 === 'conrolValve38' ? true : false}
                            onChange={changeRadioQ14}
                          />
                          <label htmlFor="conrolValve38">NPT</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve39"
                            name="conrolValve39"
                            value="conrolValve39"
                            checked={q14 === 'conrolValve39' ? true : false}
                            onChange={changeRadioQ14}
                          />
                          <label htmlFor="conrolValve39">NPT.F</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve40"
                            name="conrolValve40"
                            value="conrolValve40"
                            checked={q15 === 'conrolValve40' ? true : false}
                            onChange={changeRadioQ15}
                          />
                          <label htmlFor="conrolValve40">1/2</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve41"
                            name="conrolValve41"
                            value="conrolValve41"
                            checked={q15 === 'conrolValve41' ? true : false}
                            onChange={changeRadioQ15}
                          />
                          <label htmlFor="conrolValve41">1/4</label>
                        </div>
                        <div className="w_50">
                          <input type="text" className="input_bk" />
                        </div>
                      </div>
                      <div className="input_group check_more_box">
                        <div className="small_title w_100">Electrical</div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve42"
                            name="conrolValve42"
                            value="conrolValve42"
                            checked={q16 === 'conrolValve42' ? true : false}
                            onChange={changeRadioQ16}
                          />
                          <label htmlFor="conrolValve42">PT</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve43"
                            name="conrolValve43"
                            value="conrolValve43"
                            checked={q16 === 'conrolValve43' ? true : false}
                            onChange={changeRadioQ16}
                          />
                          <label htmlFor="conrolValve43">PT.F</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve44"
                            name="conrolValve44"
                            value="conrolValve44"
                            checked={q16 === 'conrolValve44' ? true : false}
                            onChange={changeRadioQ16}
                          />
                          <label htmlFor="conrolValve44">NPT</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve45"
                            name="conrolValve45"
                            value="conrolValve45"
                            checked={q16 === 'conrolValve45' ? true : false}
                            onChange={changeRadioQ16}
                          />
                          <label htmlFor="conrolValve45">NPT.F</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve46"
                            name="conrolValve46"
                            value="conrolValve46"
                            checked={q17 === 'conrolValve46' ? true : false}
                            onChange={changeRadioQ17}
                          />
                          <label htmlFor="conrolValve46">1/2</label>
                        </div>
                        <div className="check_item w_25">
                          <input
                            type="checkbox"
                            id="conrolValve47"
                            name="conrolValve47"
                            value="conrolValve47"
                            checked={q17 === 'conrolValve47' ? true : false}
                            onChange={changeRadioQ17}
                          />
                          <label htmlFor="conrolValve47">1/4</label>
                        </div>
                        <div className="w_50">
                          <input type="text" className="input_bk" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blue_box">
                    <div className="blue_title">Other requests</div>
                    <div className="blue_cont">
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        className="input_bk"
                      ></textarea>
                    </div>
                  </div>

                  <a href="/qttnCheck" className="btn btn_100">
                    정보 입력 완료
                  </a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
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
            Email :{' '}
            <a href="mailto:proval.md@proval.co.kr">proval.md@proval.co.kr</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Slide
