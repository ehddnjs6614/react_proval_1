import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

const Request = () => {
  return (
    <div className="page_request">
      <header>
        <div class="logo_box">
          <h1>
            <Link to="/main">
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
        <div class="simple_footer">
          Professional
          <br />
          Control Valves{' '}
        </div>
        <div class="full_wrap_pd">
          <form action="post" class="text_center">
            <label for="">견적 프로젝트 명을 입력해주세요.</label>
            <input type="text" class="big_input" />
            <Link to="/qttnstart" id="" class="btn btn_100">
              견적 시작
            </Link>

            <Link to="formselect" class="btn btn_sky btn_100">
              기존양식 불러오기
            </Link>
          </form>
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

export default Request
