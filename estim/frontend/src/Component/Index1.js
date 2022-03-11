import React, { useContext, useEffect, useState } from 'react'
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
import { ThemeContext } from '../context/ThemeContext'

const Index1 = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  // const [CUST_NAME, setCUST_NAME] = useState('')
  // const [EMAIL, setEMAIL] = useState('')
  // const [TEL_NO, setTEL_NO] = useState('')
  // const [HP_NO, setHP_NO] = useState('')
  // const [MAN_NAME, setMAN_NAME] = useState('')
  // const [MAN_POSI, setMAN_POSI] = useState('')
  // const [REC_NAME, setREC_NAME] = useState('')
  // const [REC_ADDR, setREC_ADDR] = useState('')
  // const [REC_CONT, setREC_CONT] = useState('')

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
        // CUST_NAME: CUST_NAME,
        // EMAIL: EMAIL,
        // TEL_NO: TEL_NO,
        // HP_NO: HP_NO,
        // MAN_NAME: MAN_NAME,
        // MAN_POSI: MAN_POSI,
        // REC_NAME: REC_NAME,
        // REC_ADDR: REC_ADDR,
        // REC_CONT: REC_CONT,
      })
      .then(res => {
        console.log(res)
        console.log('res.data.U_ID :: ', res.data.data.U_ID)
        console.log('res.data.U_PW :: ', res.data.data.U_PW)
        if (res.data.data.U_ID === undefined) {
          setId('') // 실패시 입력한 아이디값 초기화
          setPassword('') // 실패시 입력한 비밀번호값 초기화
          console.log('==========', res.data.message)
          alert(res.data.message)
        } else if (res.data.data.U_PW === null) {
          console.log('=========', '입력하신 비밀번호가 일치하지 않습니다.')
          alert('입력하신 비밀번호가 일치하지 않습니다.')
        } else if (res.data.data.U_ID === id) {
          console.log('===========', '로그인 성공')
          console.log('==========', res.data.message)
          alert(res.data.message)
          sessionStorage.setItem('U_ID', id)
          sessionStorage.setItem('U_PW', password)
          sessionStorage.setItem('CUST_NAME', res.data.data.CUST_NAME)
          sessionStorage.setItem('EMAIL', res.data.data.EMAIL)
          sessionStorage.setItem('TEL_NO', res.data.data.TEL_NO)
          sessionStorage.setItem('HP_NO', res.data.data.HP_NO)
          sessionStorage.setItem('MAN_NAME', res.data.data.MAN_NAME)
          sessionStorage.setItem('MAN_POSI', res.data.data.MAN_POSI)
          sessionStorage.setItem('REC_NAME', res.data.data.REC_NAME)
          sessionStorage.setItem('REC_ADDR', res.data.data.REC_ADDR)
          sessionStorage.setItem('REC_CONT', res.data.data.REC_CONT)

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
