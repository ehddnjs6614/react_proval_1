import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../images/logo.png'

const ProductStus = () => {
  let history = useHistory()
  return (
    <div>
      <header>
        <div class="logo_box">
          <h1>
            <Link to="/main">
              <img src={logo} alt="proval로고" />
            </Link>
          </h1>
          <div class="page_title">제작현황</div>
        </div>
        <Link to="/menu" class="gnb_btn">
          <span></span>
          <span></span>
          <span></span>
        </Link>
      </header>
      <div class="wrap full_wrap">
        <div class="full_wrap_pd back_box">
          <button
            onClick={() => {
              window.location.replace('/orderlist')
            }}
            class="btn_back"
          ></button>
          <span class="bold product_orderdate">주문일자</span> : 2021.10.31
        </div>
        <div class="full_wrap_pd">
          <div class="bold product_dead">납품예정일 2021. 11. 01</div>
          <div class="small product_order">Order No. - C210101-01</div>
          <div class="process_box">
            <ul>
              <li>
                <div class="process_num">공정1</div>
                <div class="process_right text_blue">2021. 01. 01 완료</div>
              </li>
              <li>
                <div class="process_num">공정2</div>
                <div class="process_right text_blue">2021. 01. 02 완료</div>
              </li>
              <li>
                <div class="process_num">공정3</div>
                <div class="process_right text_blue">2021. 01. 06 완료</div>
              </li>
              <li>
                <div class="process_num">공정4</div>
                <div class="process_right bold">진행중</div>
              </li>
              <li>
                <div class="process_num">공정5</div>
                <div class="process_right text_grey">2021. 01. 11 예정</div>
              </li>
              <li>
                <div class="process_num">공정6</div>
                <div class="process_right text_grey">2021. 01. 18 예정</div>
              </li>
            </ul>
            <div class="bold product_success">
              제품 예상 완성일 2021. 02 .08
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
    </div>
  )
}

export default ProductStus
