import React, { useState } from 'react'
import $ from 'jquery'
import logo from '../images/logo.png'
import 'jquery-ui-dist/jquery-ui'
import { Link } from 'react-router-dom'
import Slide from './Slide'
import ValveController from './ValveController'
import { initValvestate } from '../datas/initValveState'
import { useLocation } from 'react-router-dom'

const QttnStart = () => {
  const [selectDatas, setSelectDatas] = useState([{ ...initValvestate }])

  const [selectvalve, setSelectvalve] = useState(0)
  const [maxvalve, setmaxvalve] = useState(1)
  const PROJECT = useLocation()
  console.log('selectDatas : ', selectDatas)
  console.log('selectvalve : ', selectvalve)

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
        <ValveController
          maxvalve={maxvalve}
          setmaxvalve={setmaxvalve}
          setSelectDatas={setSelectDatas}
          setSelectvalve={setSelectvalve}
        />
        <Slide
          selectData={selectDatas[selectvalve]}
          setSelectDatas={setSelectDatas}
          selectvalve={selectvalve}
          PROJECT={PROJECT}
          selectDatas={selectDatas}
        />
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

export default QttnStart
