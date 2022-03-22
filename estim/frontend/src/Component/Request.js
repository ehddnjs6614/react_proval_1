import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

export const Request = () => {
  const [PROJECT, setProject] = useState('')
  const hendleProjectname = e => {
    setProject(e.target.value)
  }
  sessionStorage.setItem('PROJECT', PROJECT)
  console.log(PROJECT)

  return (
    <div className="page_request">
      <header>
        <div className="logo_box">
          <h1>
            <Link to="/main">
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
        <div className="simple_footer">
          Professional
          <br />
          Control Valves{' '}
        </div>
        <div className="full_wrap_pd">
          <form action="post" className="text_center">
            <label htmlFor="">견적 프로젝트 명을 입력해주세요.</label>
            <input
              type="text"
              className="big_input"
              value={PROJECT}
              onChange={hendleProjectname}
            />
            <Link
              onClick={() => {
                window.location.replace('/qttnstart')
              }}
              className="btn btn_100"
            >
              <button className="btn btn_100">견적시작</button>
            </Link>

            <Link to="formselect" className="btn btn_sky btn_100">
              기존양식 불러오기
            </Link>
          </form>
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
            Email :{' '}
            <a href="mailto:proval.md@proval.co.kr">proval.md@proval.co.kr</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Request
