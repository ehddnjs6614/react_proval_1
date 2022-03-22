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
      <div className="wrap big_padding">
        <div className="main_list">
          <ul>
            <li className="main_item">
              <Link to="/request">
                <div className="main_img">
                  <img src={item1} alt="" />
                </div>
                <div className="item_title">견적 요청</div>
              </Link>
            </li>
            <li className="main_item">
              <Link
                onClick={() => {
                  window.location.replace('/officerCrown')
                }}
              >
                <div className="main_img">
                  <img src={item2} alt="" />
                </div>
                <div className="item_title">견적 관리</div>
              </Link>
            </li>
            <li className="main_item">
              <Link
                onClick={() => {
                  window.location.replace('/formBox')
                }}
              >
                <div className="main_img">
                  <img src={item3} alt="" />
                </div>

                <div className="item_title">견적양식 보관함</div>
              </Link>
            </li>
            <li className="main_item">
              <Link
                onClick={() => {
                  window.location.replace('/orderList')
                }}
              >
                <div className="main_img">
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
