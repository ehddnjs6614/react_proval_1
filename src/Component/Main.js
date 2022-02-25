import React from 'react'
import logo from '../images/logo.png'
import item1 from '../images/item1.png'
import item2 from '../images/item2.png'
import item3 from '../images/item3.png'
import item4 from '../images/item4.png'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Main = () => {
  let history = useHistory()

  return (
    <div className="main_page">
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
      <div class="wrap big_padding">
        <div class="main_list">
          <ul>
            <li class="main_item">
              <Link to="/request">
                <div class="main_img">
                  <img src={item1} alt="" />
                </div>
                <div class="item_title">견적 요청</div>
              </Link>
            </li>
            <li class="main_item">
              <Link
                onClick={() => {
                  window.location.replace('/officerCrown')
                }}
              >
                <div class="main_img">
                  <img src={item2} alt="" />
                </div>
                <div class="item_title">견적 관리</div>
              </Link>
            </li>
            <li class="main_item">
              <Link
                onClick={() => {
                  window.location.replace('/formBox')
                }}
              >
                <div class="main_img">
                  <img src={item3} alt="" />
                </div>

                <div class="item_title">견적양식 보관함</div>
              </Link>
            </li>
            <li class="main_item">
              <Link
                onClick={() => {
                  window.location.replace('/orderList')
                }}
              >
                <div class="main_img">
                  <img src={item4} alt="" />
                </div>
                <div className="item_title">주문목록</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <footer>
        Professional
        <br />
        Control Valves{' '}
      </footer>
    </div>
  )
}

export default Main
