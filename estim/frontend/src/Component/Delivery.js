import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import '../css/form_big.css'

const Delivery = () => {
  return (
    <div>
      <header>
        <div class="logo_box">
          <h1>
            <Link to="main">
              <img src={logo} alt="proval로고" />
            </Link>
          </h1>
          <div class="page_title">배송관리</div>
        </div>
        <Link to="menu" class="gnb_btn">
          <span></span>
          <span></span>
          <span></span>
        </Link>
      </header>
      <div class="wrap big_padding bigform_page">
        <form action="post">
          <label for="">배송지</label>
          <input type="text" class="input_bk" />
          <label for="">수령인</label>
          <input type="text" class="input_bk" />
          <label for="">수령인 연락처</label>
          <input type="text" class="input_bk" value="" />
          <div class="label">배송 방법</div>
          <div class="check_box">
            <label for="">
              <input type="checkbox" /> 퀵
            </label>
            <label for="">
              <input type="checkbox" /> 화물
            </label>
            <label for="">
              <input type="checkbox" /> 독차
            </label>
            <label for="">
              <input type="checkbox" /> 기타
            </label>
          </div>
          <input type="text" class="input_bk" value="" />
          <button class="btn btn_100">저장</button>
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

export default Delivery
