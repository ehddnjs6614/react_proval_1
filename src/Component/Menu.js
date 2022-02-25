import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import person from '../images/person.png'

const Menu = () => {
  let history = useHistory()

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
            <div className="customer_name">대명계전</div>
          </div>
          <Link to="/accountmngmn" className="btn btn_sky">
            계정관리
          </Link>
        </div>
        <div className="customer_infos">
          <div className="customer_info">
            <div className="customer_label">고객명</div>
            <div className="customer_value">대명계전</div>
          </div>
          <div className="customer_info">
            <div className="customer_label">비밀번호</div>
            <div className="customer_value">*******</div>
          </div>
          <div className="customer_info">
            <div className="customer_label">이메일</div>
            <div className="customer_value">proval.sd@proval.co.kr</div>
          </div>
          <div className="customer_info">
            <div className="customer_label">내선번호</div>
            <div className="customer_value">031 111 2222</div>
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
