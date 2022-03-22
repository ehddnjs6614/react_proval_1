import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../images/logo.png'
import person from '../images/person.png'
import { API_URL } from '../_api/types'

const AccountMngmn = () => {
  let history = useHistory()

  let U_IDData = sessionStorage.getItem('U_ID')
  let U_PWData = sessionStorage.getItem('U_PW')
  let CUST_NAMElData = sessionStorage.getItem('CUST_NAME')
  let EMAILData = sessionStorage.getItem('EMAIL')
  let TEL_NOData = sessionStorage.getItem('TEL_NO')
  let HP_NOData = sessionStorage.getItem('HP_NO')
  let MAN_NAMEData = sessionStorage.getItem('MAN_NAME')
  let MAN_POSIData = sessionStorage.getItem('MAN_POSI')
  let REC_NAMEData = sessionStorage.getItem('REC_NAME')
  let REC_ADDRData = sessionStorage.getItem('REC_ADDR')
  let REC_CONTData = sessionStorage.getItem('REC_CONT')

  const [EMAIL, setEMAIL] = useState(EMAILData)
  const [U_ID, setU_ID] = useState('')
  const [U_PW, setU_PW] = useState(U_PWData)
  const [CUST_NAME, setCUST_NAME] = useState(CUST_NAMElData)
  const [TEL_NO, setTEL_NO] = useState(TEL_NOData)
  const [HP_NO, setHP_NO] = useState(HP_NOData)
  const [MAN_NAME, setMAN_NAME] = useState(MAN_NAMEData)
  const [MAN_POSI, setMAN_POSI] = useState(MAN_POSIData)
  const [REC_NAME, setREC_NAME] = useState(REC_NAMEData)
  const [REC_ADDR, setREC_ADDR] = useState(REC_ADDRData)
  const [REC_CONT, setREC_CONT] = useState(REC_CONTData)
  console.log(EMAIL)

  const updateCUST_NAME = e => {
    setCUST_NAME(e.target.value)
  }

  const updateU_PW = e => {
    setU_PW(e.target.value)
  }
  const updateEMAIL = e => {
    setEMAIL(e.target.value)
  }
  const updateTEL_NO = e => {
    setTEL_NO(e.target.value)
  }
  const updatesetHP_NO = e => {
    setHP_NO(e.target.value)
  }
  const updateMAN_NAME = e => {
    setMAN_NAME(e.target.value)
  }
  const updateMAN_POSI = e => {
    setMAN_POSI(e.target.value)
  }
  const updateREC_NAME = e => {
    setREC_NAME(e.target.value)
  }
  const updateREC_ADDR = e => {
    setREC_ADDR(e.target.value)
  }
  const updateREC_CONT = e => {
    setREC_CONT(e.target.value)
  }

  const onClickUpdate = () => {
    axios
      .post(`${API_URL}users/update/${U_IDData}`, {
        U_PW: U_PW,
        CUST_NAME: CUST_NAME,
        EMAIL: EMAIL,
        TEL_NO: TEL_NO,
        HP_NO: HP_NO,
        MAN_NAME: MAN_NAME,
        MAN_POSI: MAN_POSI,
        REC_NAME: REC_NAME,
        REC_ADDR: REC_ADDR,
        REC_CONT: REC_CONT,
      })
      .then(res => {
        console.log(res)
        sessionStorage.removeItem('U_ID')
        sessionStorage.removeItem('U_PW')
        sessionStorage.removeItem('CUST_NAME')
        sessionStorage.removeItem('EMAIL')
        sessionStorage.removeItem('TEL_NO')
        sessionStorage.removeItem('HP_NO')
        sessionStorage.removeItem('MAN_NAME')
        sessionStorage.removeItem('MAN_POSI')
        sessionStorage.removeItem('REC_NAME')
        sessionStorage.removeItem('REC_ADDR')
        sessionStorage.removeItem('REC_CONT')
        alert('수정완료 다시 로그인해주세요')

        document.location.href = '/'
      })
      .catch()
  }

  const onClickDELETE = () => {
    axios
      .post(`${API_URL}users/withdraw`, {
        U_ID: U_IDData,
      })
      .then(res => {
        console.log(res)
        sessionStorage.removeItem('U_ID')
        sessionStorage.removeItem('U_PW')
        sessionStorage.removeItem('CUST_NAME')
        sessionStorage.removeItem('EMAIL')
        sessionStorage.removeItem('TEL_NO')
        sessionStorage.removeItem('HP_NO')
        sessionStorage.removeItem('MAN_NAME')
        sessionStorage.removeItem('MAN_POSI')
        sessionStorage.removeItem('REC_NAME')
        sessionStorage.removeItem('REC_ADDR')
        sessionStorage.removeItem('REC_CONT')

        alert('회원탈퇴가 완료되었습니다. ')
        document.location.href = '/'
      })
      .catch()
  }

  return (
    <div>
      <header>
        <div className="logo_box">
          <h1>
            <Link to="/main">
              <img src={logo} alt="proval로고" />
            </Link>
          </h1>
          <div className="page_title"></div>
        </div>
        <Link to="/menu" className="gnb_btn">
          <span></span>
          <span></span>
          <span></span>
        </Link>
      </header>
      <div className="wrap">
        <div className="customer">
          <div className="customer_img">
            <img src={person} alt="" />
          </div>
          <div className="customer_name">{U_IDData}</div>
        </div>
        <form action="post" className="form_acntMngmn">
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              아이디
            </label>
            <input type="text" className="form_input" value={U_IDData} />
          </div>
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              업체명
            </label>
            <input
              type="text"
              className="form_input"
              value={CUST_NAME}
              onChange={updateCUST_NAME}
              placeholder={CUST_NAMElData}
            ></input>
          </div>
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              비밀번호
            </label>
            <input
              type="password"
              className="form_input"
              value={U_PW}
              onChange={updateU_PW}
              placeholder="******"
            />
          </div>
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              이메일
            </label>
            <input
              type="email"
              className="form_input"
              value={EMAIL}
              onChange={updateEMAIL}
              placeholder={EMAILData}
            />
          </div>
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              사무실전화번호
            </label>
            <input
              type="tel"
              className="form_input"
              value={TEL_NO}
              onChange={updateTEL_NO}
              placeholder={TEL_NOData}
            />
          </div>
          <br />
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              담당자
            </label>
            <input
              type="text"
              className="form_input"
              value={MAN_NAME}
              onChange={updateMAN_NAME}
              placeholder={MAN_NAMEData}
            />
          </div>
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              직함
            </label>
            <input
              type="text"
              className="form_input"
              value={MAN_POSI}
              onChange={updateMAN_POSI}
              placeholder={MAN_POSIData}
            />
          </div>
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              연락처
            </label>
            <input
              type="tel"
              className="form_input"
              value={HP_NO}
              onChange={updatesetHP_NO}
              placeholder={HP_NOData}
            />
          </div>
          <br />
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              수령인
            </label>
            <input
              type="text"
              className="form_input"
              value={REC_NAME}
              onChange={updateREC_NAME}
              placeholder={REC_NAMEData}
            />
          </div>
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              주소
            </label>
            <input
              type="text"
              className="form_input"
              value={REC_ADDR}
              onChange={updateREC_ADDR}
              placeholder={REC_ADDRData}
            />
          </div>
          <div className="input_group label_basic">
            <label htmlFor="" className="form_label">
              연락처
            </label>
            <input
              type="tel"
              className="form_input"
              value={REC_CONT}
              onChange={updateREC_CONT}
              placeholder={REC_CONTData}
            />
          </div>
          <div className="btns_center">
            <button
              className="btn btn_md btn_shadow"
              style={{ marginRight: '15px' }}
              onClick={onClickDELETE}
            >
              회원탈퇴
            </button>

            <button
              className="btn btn_md btn_shadow"
              onClick={onClickUpdate}
              // disabled={
              //   !(
              //     CUST_NAME &&
              //     U_PW &&
              //     EMAIL &&
              //     TEL_NO &&
              //     MAN_NAME &&
              //     MAN_POSI &&
              //     HP_NO &&
              //     REC_NAME &&
              //     REC_ADDR &&
              //     REC_CONT
              //   )
              // }
            >
              수정
            </button>
          </div>
        </form>
      </div>
      <footer>
        Professional
        <br />
        Control Valves
      </footer>
    </div>
  )
}

export default AccountMngmn
