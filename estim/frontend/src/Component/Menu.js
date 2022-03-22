import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import person from '../images/person.png'
import { API_URL } from '../_api/types'

const Menu = props => {
  let U_IDData = sessionStorage.getItem('U_ID')
  let U_PWData = sessionStorage.getItem('U_PW')
  let CUST_NAMElData = sessionStorage.getItem('CUST_NAME')
  let EMAILData = sessionStorage.getItem('EMAIL')
  let TEL_NOData = sessionStorage.getItem('TEL_NO')
  let history = useHistory()
  const [test1, setTest] = useState([])

  const isLogin = props.isLogin

  //로그아웃시 세션 삭제
  const onLogout = () => {
    sessionStorage.clear()
    // sessionStorage.removeItem('U_ID')
    // sessionStorage.removeItem('U_PW')
    // sessionStorage.removeItem('CUST_NAME')
    // sessionStorage.removeItem('EMAIL')
    // sessionStorage.removeItem('TEL_NO')
    // sessionStorage.removeItem('HP_NO')
    // sessionStorage.removeItem('MAN_NAME')
    // sessionStorage.removeItem('MAN_POSI')
    // sessionStorage.removeItem('REC_NAME')
    // sessionStorage.removeItem('REC_ADDR')
    // sessionStorage.removeItem('REC_CONT')
    // sessionStorage.removeItem('PROJECT')

    history.push('/')
  }
  console.log(props)

  useEffect(
    () => {
      axios
        .get(`${API_URL}users`)
        .then(res => console.log(res.data))
        .then(res => {
          setTest(res)
        })
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    []
  )

  return (
    <div>
      <header className="menu_header">
        <button
          onClick={() => {
            history.goBack()
          }}
          className="btn_back"
        ></button>
      </header>
      <div className="wrap">
        <div className="customer_box">
          <div className="customer">
            <div className="customer_img">
              <img src={person} alt="" />
            </div>
            <div className="customer_name">{U_IDData}</div>
          </div>
          <button
            className="btn btn_sky"
            onClick={onLogout}
            style={{ marginLeft: '60px' }}
          >
            로그아웃
          </button>

          <Link to="/accountmngmn" className="btn btn_sky">
            계정관리
          </Link>
        </div>
        <div className="customer_infos">
          <div className="customer_info">
            <div className="customer_label">회사명</div>
            <div className="customer_value">{CUST_NAMElData}</div>
          </div>
          <div className="customer_info">
            <div className="customer_label">비밀번호</div>
            <div className="customer_value">*****</div>
          </div>
          <div className="customer_info">
            <div className="customer_label">이메일</div>
            <div className="customer_value">{EMAILData}</div>
          </div>
          <div className="customer_info">
            <div className="customer_label">내선번호</div>
            <div className="customer_value">{TEL_NOData}</div>
          </div>
        </div>
        <div className="menu_list">
          <ul>
            <li className="menu_item">
              <Link to="request">
                <div className="item_title1">견적 요청</div>
              </Link>
            </li>
            <li className="menu_item">
              <Link
                onClick={() => {
                  window.location.replace('/officerCrown')
                }}
              >
                <div className="item_title1">견적 관리</div>
              </Link>
            </li>
            <li className="menu_item">
              <Link
                onClick={() => {
                  window.location.replace('/formbox')
                }}
              >
                <div className="item_title1">견적양식 보관함</div>
              </Link>
            </li>
            <li className="menu_item">
              <Link
                onClick={() => {
                  window.location.replace('/orderlist')
                }}
              >
                <div className="item_title1">주문목록</div>
              </Link>
            </li>
          </ul>
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
            Email :
            <a href="mailto:proval.md@proval.co.kr">proval.md@proval.co.kr</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Menu
