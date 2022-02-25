import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import person from '../images/person.png'

const AccountMngmn = () => {
  return (
    <div>
      <header>
        <div class="logo_box">
          <h1>
            <Link to="/main">
              <img src={logo} alt="proval로고" />
            </Link>
          </h1>
          <div class="page_title"></div>
        </div>
        <Link to="/menu" class="gnb_btn">
          <span></span>
          <span></span>
          <span></span>
        </Link>
      </header>
      <div class="wrap">
        <div class="customer">
          <div class="customer_img">
            <img src={person} alt="" />
          </div>
          <div class="customer_name">대명계전</div>
        </div>
        <form action="post" class="form_acntMngmn">
          <div class="input_group label_basic">
            <label for="" class="form_label">
              고객명
            </label>
            <input type="text" class="form_input" value="대명계전" />
          </div>
          <div class="input_group label_basic">
            <label for="" class="form_label">
              비밀번호
            </label>
            <input type="password" class="form_input" value="1234" />
          </div>
          <div class="input_group label_basic">
            <label for="" class="form_label">
              이메일
            </label>
            <input
              type="email"
              class="form_input"
              value="proval.smt@proval.co.kr"
            />
          </div>
          <div class="input_group label_basic">
            <label for="" class="form_label">
              내선번호
            </label>
            <input type="tel" class="form_input" value="031 499 4903" />
          </div>
          <br />
          <div class="input_group label_basic">
            <label for="" class="form_label">
              담당자
            </label>
            <input type="text" class="form_input" value="홍길동" />
          </div>
          <div class="input_group label_basic">
            <label for="" class="form_label">
              직함
            </label>
            <input type="text" class="form_input" value="주임" />
          </div>
          <div class="input_group label_basic">
            <label for="" class="form_label">
              연락처
            </label>
            <input type="tel" class="form_input" value="010 1234 5678" />
          </div>
          <br />
          <div class="input_group label_basic">
            <label for="" class="form_label">
              수령인
            </label>
            <input type="text" class="form_input" value="김둘리" />
          </div>
          <div class="input_group label_basic">
            <label for="" class="form_label">
              주소
            </label>
            <input
              type="text"
              class="form_input"
              value="서울특별시 도봉구 쌍문동 2-2"
            />
          </div>
          <div class="input_group label_basic">
            <label for="" class="form_label">
              연락처
            </label>
            <input type="tel" class="form_input" value="010 4321 8765" />
          </div>
          <div class="btns_center">
            <button class="btn btn_md btn_shadow">저장</button>
          </div>
        </form>
      </div>
      <footer>
        Professional
        <br />
        Control Valves{' '}
      </footer>
    </div>
  )
}

export default AccountMngmn
