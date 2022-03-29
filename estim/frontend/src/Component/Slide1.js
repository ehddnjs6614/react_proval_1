import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import axios from 'axios'
import { API_URL } from '../_api/types'
import { Link, useHistory } from 'react-router-dom'

const Slide1 = ({
  selectData,
  setSelectDatas,
  selectvalve,
  headData,
  setHeadData,
}) => {
  const history = useHistory()
  let PROJECT = sessionStorage.getItem('PROJECT')
  const [datas, setDatas] = useState([])

  const postData1 = async (EST_NO, REV_NO) => {
    const res = await axios.get(`${API_URL}estimation/add/${EST_NO}/${REV_NO}`)
    alert(res.data.message)
    console.log('res : ', res.data)
  }

  console.log('selectData11 :', selectData)

  // const updataData = async (EST_NO, REV_NO, TAG_NO) => {
  //   const res = await axios.post(
  //     `${API_URL}estimation/detail/update/${EST_NO}/${REV_NO}/${TAG_NO}`
  //   )
  //   alert(res.data.message)
  //   console.log('updataData :', res.data)
  // }

  // useEffect(
  //   () => {
  //     axios
  //       .get(`${API_URL}estimation/add/PV220311-009/A`)
  //       .then(res => console.log(res))
  //       .catch()
  //   },
  //   // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
  //   []
  // )

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
      <div className="full_wrap_pd">
        <div className="company_title" value={PROJECT}>
          {PROJECT}
        </div>
        <div className="tag_box flex_box">
          <div className="tag_label ">
            <span className="num tag_btn">1</span>
            <span className="tab_no">Tag No.</span>
          </div>
          <div className="tag_input">
            <input type="text" value={selectData.TAG_NO} />

            <button className="tag_btn tab_btn_sky">수정</button>
          </div>
        </div>
      </div>

      {/* <!-- Swiper --> */}

      <div className="swiper_btn_box">
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>

      <div className="noHwrap">
        <div className="swiper qttrCheck_swiper">
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
            simulateTouch={false} //마우스 터치 X
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            onSwiper={swiper => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {/* <!-- Swiper --> */}
            <div className="swiper-wrapper">
              <SwiperSlide>
                <div
                  className="swiper-slide"
                  data-title="Body / Actuator Information"
                >
                  <div className="swiper_wrap">
                    <ul className="qttnCheck_box">
                      <li>
                        <div className="check_title">Valve type</div>
                        <div className="check_val">{selectData.VALVE}</div>
                      </li>
                      <li>
                        <div className="check_title">Body Size</div>
                        <div className="check_val">{selectData.BODY_SIZE}</div>
                      </li>
                      <li>
                        <div className="check_title">Body Material</div>
                        <div className="check_val">{selectData.BODY}</div>
                      </li>
                      <li>
                        <div className="check_title">Body Rating</div>
                        <div className="check_val">{selectData.RATING}</div>
                      </li>
                      <li>
                        <div className="check_title">Trim Material</div>
                        <div className="check_val">
                          {selectData.PLUG_DISC_BALL}
                        </div>
                      </li>
                      <li>
                        <div className="check_title">End Connection</div>
                        <div className="check_val">
                          {selectData.END_CONNECTION}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            </div>
            <SwiperSlide>
              <div className="swiper-slide" data-title="Fluid Information">
                <div className="swiper_wrap">
                  <div className="etc_info">
                    <span className="bold">Fluid</span> : Liquid
                  </div>
                  <table className="table_input bold table_border_bk">
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
                        <td>{selectData.FR_MAX}</td>
                        <td>{selectData.FR_NOR}</td>
                        <td>{selectData.FR_NOR}</td>
                        <td>{selectData.FR_UNIT}</td>
                      </tr>
                      <tr>
                        <th>P1</th>
                        <td>{selectData.IP_MAX}</td>
                        <td>{selectData.IP_NOR}</td>
                        <td>{selectData.IP_MIN}</td>
                        <td>{selectData.IP_UNIT}</td>
                      </tr>
                      <tr>
                        <th>P2</th>
                        <td>{selectData.OP_MAX}</td>
                        <td>{selectData.OP_NOR}</td>
                        <td>{selectData.OP_MIN}</td>
                        <td>{selectData.OP_UNIT}</td>
                      </tr>
                      <tr>
                        <th>T1</th>
                        <td>{selectData.IT_MAX}</td>
                        <td>{selectData.IT_NOR}</td>
                        <td>{selectData.IT_MIN}</td>
                        <td>{selectData.IT_UNIT}</td>
                      </tr>
                      <tr>
                        <th>Density</th>
                        <td>{selectData.D_NOR}</td>
                        <td></td>
                        <td></td>
                        <td>{selectData.D_UNIT}</td>
                      </tr>
                      <tr>
                        <th>Molecular</th>
                        <td>{selectData.MW_NOR}</td>
                        <td></td>
                        <td></td>
                        <td>{selectData.MW_UNIT}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-slide" data-title="Accessory Information">
                <div className="swiper_wrap">
                  <div className="white_box_title">Positioner</div>
                  <ul className="qttnCheck_box white_box">
                    <li>
                      <div className="check_title">Type</div>
                      <div className="check_val">
                        {selectData.SOLENOID_CONNECT_TYPE}
                      </div>
                    </li>
                    <li>
                      <div className="check_title">Explosion proof</div>
                      <div className="check_val">{selectData.IP_ENCLOSURE}</div>
                    </li>
                    <li>
                      <div className="check_title">Communication</div>
                      <div className="check_val">{selectData.IP_TYPE}</div>
                    </li>
                    <li>
                      <div className="check_title">Transmitter</div>
                      <div className="check_val">{selectData.PT_TRANSMIT}</div>
                    </li>
                    <li>
                      <div className="check_title">Material</div>
                      <div className="check_val">
                        {selectData.SOLENOID_MATERIAL}
                      </div>
                    </li>
                  </ul>
                  <div className="etc_info">{selectData.SOLENOID_MFG} </div>
                  <div className="etc_info">
                    {selectData.IP_CONDUIT_AIR_CONNECT}
                  </div>
                  <div className="white_box_title">
                    {selectData.IP_POSITIONER}
                  </div>
                  <ul className="qttnCheck_box white_box">
                    <li>
                      <div className="check_title">Air Supply </div>
                      <div className="check_val">
                        {selectData.AIR_SET_CONNECT_TYPE}
                      </div>
                    </li>
                    <li>
                      <div className="check_title">EElectrical</div>
                      <div className="check_val">
                        {selectData.IP_CONDUIT_AIR_CONNECT}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="btns_wrap">
            <div className="text_center">입력하신 사양이 맞습니까?</div>
            <div className="btn_box">
              <div className="btns_center">
                <button
                  className="btn btn_skyblue btn_50"
                  onClick={() => history.goBack()}
                >
                  수정
                </button>
                <Link
                  to="/request"
                  className="btn btn_skyblue btn_50"
                  onClick={() => postData1(headData.EST_NO, headData.REV_NO)}
                >
                  견적요청
                </Link>
              </div>
              {/* <button
                  className="btn btn_skyblue btn_100 modal_btn"
                  data-modal="modalSave"
                >
                  견적요청
                </button>
                <button
                  className="btn btn_skyblue btn_100 modal_btn"
                  data-modal="modalSeccuess"
                >
                  견적양식저장
                </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slide1
