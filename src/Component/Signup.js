import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import $ from 'jquery'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { API_URL } from '../_api/types'

const Signup = () => {
  let history = useHistory()

  const [U_ID, setU_ID] = useState('')
  const [EMAIL, setEMAIL] = useState('')
  const [U_PW, setU_PW] = useState('')
  const [U_PWconfirm, setU_PWconfirm] = useState('')

  const [U_IDError, setU_IDError] = useState(false)
  const [EMAILError, setEMAILError] = useState(false)
  const [U_PWError, setU_PWError] = useState(false)
  const [U_PWconfirmError, setU_PWconfirmError] = useState(false)

  const [CUST_NAME, setCUST_NAME] = useState('')
  const [TEL_NO, setTEL_NO] = useState('')
  const [HP_NO, setHP_NO] = useState('')

  const hendleU_ID = e => {
    const userIdRegex = /^[A-Za-z0-9+]{5,}$/
    if (!e.target.value || userIdRegex.test(e.target.value)) setU_IDError(false)
    else setU_IDError(true)
    setU_ID(e.target.value)
  }
  const hendleU_PW = e => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if (!e.target.value || passwordRegex.test(e.target.value))
      setU_PWError(false)
    else setU_PWError(true)

    if (!U_PWconfirmError || e.target.value === U_PWconfirmError)
      setU_PWconfirmError(false)
    else setU_PWconfirmError(true)
    setU_PW(e.target.value)
  }
  const hendleU_PWconfirm = e => {
    if (U_PW === e.target.value) setU_PWconfirmError(false)
    else setU_PWconfirmError(true)
    setU_PWconfirm(e.target.value)
  }

  const hendleCUST_NAME = e => {
    setCUST_NAME(e.target.value)
  }
  const hendleEMAIL = e => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/
    if (!e.target.value || emailRegex.test(e.target.value)) setEMAILError(false)
    else setEMAILError(true)
    setEMAIL(e.target.value)
  }
  const hendleTEL_NO = e => {
    setTEL_NO(e.target.value)
  }
  const hendleHP_NO = e => {
    setHP_NO(e.target.value)
  }

  const validation = () => {
    if (!U_ID) setU_IDError(true)
    if (!U_PW) setU_PWError(true)
    if (!U_PWconfirm) setU_PWconfirmError(true)
    if (!EMAIL) setEMAILError(true)

    if (U_ID && U_PW && U_PWconfirm && EMAIL) return true
    else return false
  }

  const onClickSignup = () => {
    if (U_PW !== U_PWconfirm) {
      setU_PW('')
      setU_PWconfirm('')
      return alert('두 비밀번호가 일치하지 않습니다')
    }

    console.log('click signiup')
    console.log('u_ID', U_ID)
    axios
      .post(`${API_URL}users/register`, {
        U_ID: U_ID,
        U_PW: U_PW,
        CUST_NAME: CUST_NAME,
        EMAIL: EMAIL,
        TEL_NO: TEL_NO,
        HP_NO: HP_NO,
      })
      .then(res => {
        history.push('/')
        alert('회원가입 완료')
      })
      .catch()
  }

  useEffect(
    () => {
      axios
        .get(`${API_URL}users/register`)
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    []
  )

  $(function () {
    var mount = 1

    $('.mount_btn .btn_up').on('click', function () {
      mount += 1
      $(this).closest('.mount_box').find('input').val(mount)
    })

    $('.mount_btn .btn_down').on('click', function () {
      if (mount > 1) {
        mount -= 1
        $(this).closest('.mount_box').find('input').val(mount)
      } else {
        mount = 1
      }
    })

    // 모달 ==============
    $('.modal_btn').on('click', function () {
      var modalID = $(this).attr('data-modal')
      $('#' + modalID)
        .fadeIn()
        .addClass('modal_show')
    })

    $('.modal .btn_cancle, .btn_modal_cancle').on('click', function () {
      $(this).closest('.modal').fadeOut().removeClass('.modal_show')
    })

    $('.btn_agree').on('click', function () {
      var thisInput = $(this).attr('data-agree')
      $(thisInput).prop('checked', 'checked')
      $(this).closest('.modal').fadeOut().removeClass('.modal_show')
    })
  })

  return (
    <div className="signup_page">
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
      <div class="wrap big_padding bigform_page">
        <form action="post">
          <label for="">아이디</label>
          <input
            type="text"
            class="input_bk"
            value={U_ID}
            onChange={hendleU_ID}
          />
          {U_IDError && (
            <div class="invalid-input">5글자 이상으로 입력해주세요</div>
          )}
          <br />
          <label for="">비밀번호</label>
          <input
            type="password"
            class="input_bk"
            value={U_PW}
            onChange={hendleU_PW}
          />
          {U_PWError && (
            <div class="invalid-input">
              숫자+영문자+특수문자 조합으로 <br />
              8자리 이상 입력해주세요!
            </div>
          )}
          <br />
          <label for="">비밀번호 확인</label>
          <input
            type="password"
            class="input_bk"
            value={U_PWconfirm}
            onChange={hendleU_PWconfirm}
          />
          {U_PWconfirmError && (
            <div class="invalid-input">비밀번호가 일치하지 않습니다.</div>
          )}

          <br />
          <label for="">업체명</label>
          <input
            type="text"
            class="input_bk"
            value={CUST_NAME}
            onChange={hendleCUST_NAME}
            placeholder="ex)PROVAL"
          />
          <label for="">이메일</label>
          <input
            type="email"
            class="input_bk"
            value={EMAIL}
            onChange={hendleEMAIL}
          />
          {EMAILError && (
            <div class="invalid-input">올바른 이메일 형식을 입력해주세요.</div>
          )}
          <br />
          <label for="">내선번호</label>
          <input
            type="tel"
            class="input_bk"
            value={TEL_NO}
            onChange={hendleTEL_NO}
          />
          <label for="">휴대번호</label>
          <input
            type="tel"
            class="input_bk"
            value={HP_NO}
            onChange={hendleHP_NO}
            placeholder="ex)010-0000-0000"
          />
          <label for="" class="modal_btn agree_input" data-modal="modalTerms">
            이용약관 동의 <small>(필수)</small>
            <input type="checkbox" id="agreeTerm" />
          </label>
          <label for="" class="modal_btn agree_input" data-modal="modalPrivacy">
            개인정보 수집 및 이용 동의 <small>(필수)</small>
            <input type="checkbox" />
          </label>

          <button
            type="button"
            class="btn btn_100"
            onClick={onClickSignup}
            disabled={!(U_ID && U_PW && U_PWconfirm && EMAIL)}
          >
            가입하기
          </button>
        </form>
      </div>
      <footer>
        Professional
        <br />
        Control Valves
      </footer>

      {/* <!-- modalTerms --> */}
      <div id="modalTerms" class="modal">
        <div class="modal_wrap">
          <div class="modal_header includ_title">
            이용약관 동의
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
              a similique deleniti enim magni, iure ab, tempora provident ut
              nemo ratione autem tenetur facere amet numquam nesciunt ducimus
              sunt vel.
              <button class="btn btn_agree" data-agree="#agreeTerm">
                동의
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modalPrivacy --> */}
      <div id="modalPrivacy" class="modal">
        <div class="modal_wrap">
          <div class="modal_header includ_title">
            개인정보 수집 및 이용 동의
            <button class="btn_cancle"></button>
          </div>
          <div class="modal_body">
            <div class="modal_cont">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              quasi provident consectetur laboriosam sequi accusantium commodi
              est ad eos neque facere repellendus corporis blanditiis dolor a
              esse quis, eaque veniam.
              <button class="btn btn_agree">동의</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
