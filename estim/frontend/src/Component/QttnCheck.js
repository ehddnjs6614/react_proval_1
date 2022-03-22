import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Link, useLocation } from 'react-router-dom'
import ValveController from './ValveController'
import { initValvestate } from '../datas/initValveState'
import Slide1 from './Slide1'
import axios from 'axios'
import { API_URL } from '../_api/types'

const QttnCheck = () => {
  const [number, setNumber] = useState(0)
  const [Selectvalve, setSelectvalve] = useState(0)

  const location = useLocation()
  console.log('location : ', location.state)
  const data = location.state?.data
  const headData = location.state?.headData.data
  console.log('qttn : ', data)
  console.log('headData : ', headData)

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
        <ValveController
          maxvalve={data.length}
          readonly
          setSelectvalve={setSelectvalve}
        />

        <Slide1 selectData={data[Selectvalve]} headData={headData} />
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
      {/* <!-- modalSave --> */}
      <div id="modalSave" className="modal">
        <div className="modal_wrap">
          <div className="modal_header">
            <button className="btn_cancle"></button>
          </div>
          <div className="modal_body">
            <div className="modal_cont">
              <div className="model_desc">견적 양식이 저장 되었습니다.</div>
              <a href="main.html" className="btn">
                홈으로
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modalSeccuess --> */}
      <div id="modalSeccuess" className="modal">
        <div className="modal_wrap">
          <div className="modal_header">
            <button className="btn_cancle"></button>
          </div>
          <div className="modal_body">
            <div className="modal_cont">
              <div className="model_desc">견적 요청이 완료 되었습니다.</div>
              <a href="main.html" className="btn">
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
