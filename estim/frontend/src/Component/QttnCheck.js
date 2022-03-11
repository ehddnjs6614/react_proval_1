import React from 'react'
import logo from '../images/logo.png'
import { Swiper, SwiperSlide } from 'swiper/react'

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Link } from 'react-router-dom'

const QttnCheck = () => {
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
        <div class="full_wrap_pd flex_box valve_controller">
          <div class="left_box">
            <button class="btn btn_sm btn_wh add_valve">벨브추가</button>
            <button class="btn btn_sm btn_wh remove_valve">삭제</button>
          </div>
          <div class="right_box">
            <button class="btn_dobleArrow_left btn_valve_prev"></button>
            <div class="square_box_wrap">
              <ul class="square_box">
                <li class="square_active">1</li>
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
        <div class="swiper_btn_box">
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
        <div class="noHwrap">
          <div class="swiper qttrCheck_swiper">
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
              </div>
              <SwiperSlide>
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
            <div class="btns_wrap">
              <div class="text_center">입력하신 사양이 맞습니까?</div>
              <div class="btn_box">
                <div class="btns_center">
                  <a href="qttnStart.html" class="btn btn_skyblue btn_50">
                    수정
                  </a>
                  <a href="qttnStart.html" class="btn btn_skyblue btn_50">
                    견적요청
                  </a>
                </div>
                {/* <button
                  class="btn btn_skyblue btn_100 modal_btn"
                  data-modal="modalSave"
                >
                  견적요청
                </button>
                <button
                  class="btn btn_skyblue btn_100 modal_btn"
                  data-modal="modalSeccuess"
                >
                  견적양식저장
                </button> */}
              </div>
            </div>
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
      {/* <!-- modalSave --> */}
      <div id="modalSave" class="modal">
        <div class="modal_wrap">
          <div class="modal_header">
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <div class="model_desc">견적 양식이 저장 되었습니다.</div>
              <a href="main.html" class="btn">
                홈으로
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modalSeccuess --> */}
      <div id="modalSeccuess" class="modal">
        <div class="modal_wrap">
          <div class="modal_header">
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <div class="model_desc">견적 요청이 완료 되었습니다.</div>
              <a href="main.html" class="btn">
                홈으로
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QttnCheck
