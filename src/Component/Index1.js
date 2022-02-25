import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import '../css/reset.css'
import '../css/common.css'
// import '../css/form_big.css'
import '../css/form.css'
import '../css/main.css'
import '../css/menu.css'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../_api/types'

const Index1 = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleId = e => {
    setId(e.target.value)
  }
  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const onClickLogin = () => {
    console.log('click login')
    console.log('ID : ', id)
    console.log('PW : ', password)
    axios
      .post(`${API_URL}account/login`, {
        U_ID: id,
        U_PW: password,
      })
      .then(res => {
        console.log(res)
        console.log('res.data.U_ID :: ', res.data.data.U_ID1)
        console.log('res.data.U_PW :: ', res.data.data.U_PW)
        if (res.data.data.U_ID === undefined) {
          setId('') // 실패시 입력한 아이디값 초기화
          setPassword('') // 실패시 입력한 비밀번호값 초기화
          console.log('==========', res.data.message)
          alert('사용자의 계정을 확인해주세요.')
        } else if (res.data.data.U_ID === null) {
          console.log('=========', '입력하신 비밀번호가 일치하지 않습니다.')
          alert('입력하신 비밀번호가 일치하지 않습니다.')
        } else if (res.data.data.U_ID === id) {
          console.log('===========', '로그인 성공')
          sessionStorage.setItem('U_ID', id)
          document.location.href = '/main'
        }
      })

      .catch()
  }

  useEffect(
    () => {
      axios
        .get(`${API_URL}users`)
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    []
  )

  return (
    <div className="login_page">
      <div class="wrap big_padding ">
        <div class="logo">
          <img src={logo} alt="프로발 로고" />
        </div>
        <form action="post" class="form_logo">
          <div class="input_group label_color">
            <label for="">아이디</label>
            <input type="text" value={id} onChange={handleId} />
          </div>
          <div class="input_group label_color">
            <label for="">비밀번호</label>
            <input type="password" value={password} onChange={handlePassword} />
          </div>

          <div class="signin_etc_box input_group">
            <div class="check_item">
              <input id="autoSignin" type="checkbox" />
              <label for="autoSignin">자동로그인</label>
            </div>
            <Link to="/forget" class="btn_forget">
              아이디 ・ 비밀번호 찾기
            </Link>
          </div>

          <button type="button" class="btn btn_99" onClick={onClickLogin}>
            로그인
          </button>

          {/* <Link to="/main" id="signIn" class="btn btn_99">
            로그인
          </Link> */}
        </form>

        <div class="signin_footer">
          <Link to="signup" class="btn btn_sky btn_99">
            회원가입
          </Link>

          {/* <!-- <div class="signin_etc">
                <a href="forget.html">비밀번호 분실</a>
                <a href="help.html">도움페이지</a>
            </div> --> */}
        </div>
      </div>
      <footer class="simple_footer">
        Professional
        <br />
        Control Valves
      </footer>
    </div>
  )
}

export default Index1
