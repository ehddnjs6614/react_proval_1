import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

import axios from 'axios'
import { API_URL } from '../_api/types'
import { useHistory } from 'react-router-dom'

const Forget = () => {
  let history = useHistory()

  const [EMAIL1, setEMAIL] = useState('')

  const upEmail = e => {
    setEMAIL(e.target.value)
  }

  const onClickEmail = () => {
    axios
      .post(`${API_URL}account/forgot`, {
        EMAIL: EMAIL1,
      })
      .then(res => {
        console.log('dsa', res)
        console.log('=====', res.data.message)
        alert(res.data.message)
        document.location.href = '/'
      })
      .catch()
  }

  console.log(EMAIL1)

  return (
    <div className="forget_page">
      <header>
        <div class="logo_box">
          <h1>
            <Link to="/">
              <img src={logo} alt="proval로고" />
            </Link>
          </h1>
          {/* <!-- <div class="page_title">견적요청</div> --> */}
        </div>
        {/* <!-- <a href="menu.html" class="gnb_btn">
            <span></span>
            <span></span>
            <span></span>
        </a> --> */}
      </header>
      <div class="wrap big_padding">
        <form action="post">
          <label>회원정보에 등록한 이메일</label>
          <div class="input_button">
            <input type="text" id="findID" value={EMAIL1} onChange={upEmail} />
            <button
              // type="button"

              class="btn modal_btn"
              // data-modal="sendEmailModal"
              onClick={onClickEmail}
            >
              확인
            </button>
          </div>
        </form>
      </div>
      <footer>
        Professional
        <br />
        Control Valves{' '}
      </footer>

      {/* <!-- sendEmailModal --> */}
      {/* <div id="sendEmailModal" class="modal">
        <div class="modal_wrap">
          <div class="modal_header">
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              <div class="model_desc">
                <p class="text_blue find_email"></p>
                아이디와 비밀번호가 전송되었습니다.
              </div>

              <Link to="/" class="btn">
                확인
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Forget
