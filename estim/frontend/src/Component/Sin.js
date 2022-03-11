import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { API_URL } from '../_api/types'

const Sin = () => {
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  //오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

  // 유효성 검사
  const [isName, setIsName] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

  const onSubmit = useCallback(
    async e => {
      e.preventDefault()
      try {
        await axios
          .post(`${API_URL}users/register`, {
            username: name,
            password: password,
            email: email,
          })
          .then(res => {
            console.log('response:', res)
            if (res.status === 200) {
            }
          })
      } catch (err) {
        console.error(err)
      }
    },
    [email, name, password]
  )

  // 이름
  const onChangeName = useCallback(e => {
    setName(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.')
      setIsName(false)
    } else {
      setNameMessage('올바른 이름 형식입니다 :)')
      setIsName(true)
    }
  }, [])

  // 이메일
  const onChangeEmail = useCallback(e => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value
    setEmail(emailCurrent)

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
      setIsEmail(false)
    } else {
      setEmailMessage('올바른 이메일 형식이에요 : )')
      setIsEmail(true)
    }
  }, [])

  // 비밀번호
  const onChangePassword = useCallback(e => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      )
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )')
      setIsPassword(true)
    }
  }, [])

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    e => {
      const passwordConfirmCurrent = e.target.value
      setPasswordConfirm(passwordConfirmCurrent)

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
        setIsPasswordConfirm(true)
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
        setIsPasswordConfirm(false)
      }
    },
    [password]
  )

  return (
    <>
      <div title="회원가입" className="loginMt" />

      <form css={''} onSubmit={onSubmit}>
        <div className="formbox">
          <div
            text="이름"
            type="text"
            typeName="name"
            onChange={onChangeName}
          />
          {name.length > 0 && (
            <span className={`message ${isName ? 'success' : 'error'}`}>
              {nameMessage}
            </span>
          )}
        </div>

        <div className="formbox">
          <div
            text="이메일"
            type="email"
            typeName="email"
            onChange={onChangeEmail}
          />
          {email.length > 0 && (
            <span className={`message ${isEmail ? 'success' : 'error'}`}>
              {emailMessage}
            </span>
          )}
        </div>

        <div className="formbox">
          <div
            onChange={onChangePassword}
            passwordText="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
            title="비밀번호"
            typeTitle="password"
          />
          {password.length > 0 && (
            <span className={`message ${isPassword ? 'success' : 'error'}`}>
              {passwordMessage}
            </span>
          )}
        </div>

        <div className="formbox">
          <div
            onChange={onChangePasswordConfirm}
            passwordText=" "
            title="비밀번호 확인"
            typeTitle="passwordConfirm"
          />
          {passwordConfirm.length > 0 && (
            <span
              className={`message ${isPasswordConfirm ? 'success' : 'error'}`}
            >
              {passwordConfirmMessage}
            </span>
          )}
        </div>

        {/* 이름, 이메일, 패스워드, 패스워드 확인이 다 맞다면 주황버튼으로 */}
        <div css={''}>
          <section>
            <div
              type="submit"
              footButtonType={''}
              disabled={!(isName && isEmail && isPassword && isPasswordConfirm)}
            >
              다음
            </div>
          </section>
        </div>
      </form>
    </>
  )
}

export default Sin
