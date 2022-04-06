import React, { useEffect, useState } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import AccountMngmn from './Component/AccountMngmn'
import Calendar from './Component/Calendar'
import Delivery from './Component/Delivery'
import EstmtCmplt from './Component/EstmtCmplt'
import Forget from './Component/Forget'
import FormBox from './Component/FormBox'
import FormSelect from './Component/FormSelect'
import Index1 from './Component/Index1'
import Main from './Component/Main'
import Menu from './Component/Menu'
import OfficerCrown from './Component/OfficerCrown'
import OrderList from './Component/OrderList'
import ProductStus from './Component/ProductStus'
import QttnCheck from './Component/QttnCheck'
import QttnStart from './Component/QttnStart'
import Request from './Component/Request'
import Signup from './Component/Signup'
import Sin from './Component/Sin'
import Slide from './Component/Slide'
import Slide1 from './Component/Slide1'
import Test from './Component/Test'
import ValveController from './Component/ValveController'
import { initValvestate } from './datas/initValveState'
function App() {
  const [selectDatas, setSelectDatas] = useState([{ ...initValvestate }])
  const [headData, setHeadData] = useState(null)
  const [selectList, setSelectList] = useState([])

  const [isLogin, setIsLogin] = useState(false)

  // axios get요청

  useEffect(() => {
    if (sessionStorage.getItem('U_ID') === null) {
      // sessionStorage 에 U_ID 라는 key 값으로 저장된 값이 없다면
    } else {
      // sessionStorage 에 U_ID 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true)
    }
  }, [])
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Index1 />
        </Route>

        <Route exact path="/sin">
          <Sin />
        </Route>

        <Route exact path="/main">
          <Main />
        </Route>

        <Route path="/menu">
          <Menu isLogin={isLogin} />
        </Route>

        <Route exact path="/accountmngmn">
          <AccountMngmn />
        </Route>

        <Route exact path="/request">
          <Request />
        </Route>

        <Route exact path="/forget">
          <Forget />
        </Route>

        <Route exact path="/officercrown" component={OfficerCrown} />

        <Route exact path="/estmtcmplt">
          <EstmtCmplt />
        </Route>

        <Route exact path="/formbox">
          <FormBox />
        </Route>

        <Route exact path="/orderlist">
          <OrderList />
        </Route>

        <Route exact path="/productstus">
          <ProductStus />
        </Route>

        <Route exact path="/delivery">
          <Delivery />
        </Route>

        <Route exact path="/formselect">
          <FormSelect
            selectDatas={selectDatas}
            setSelectDatas={setSelectDatas}
            headData={headData}
            setHeadData={setHeadData}
            selectList={selectList}
            setSelectList={setSelectList}
          />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route path="/valve/" component={ValveController} />

        <Route exact path="/slide" component={Slide} />
        <Route exact path="/slide1" component={Slide1} />

        <Route exact path="/qttncheck">
          <QttnCheck
            selectDatas={selectDatas}
            setSelectDatas={setSelectDatas}
            headData={headData}
            setHeadData={setHeadData}
          />
        </Route>

        <Route path="/qttnstart">
          <QttnStart
            selectDatas={selectDatas}
            setSelectDatas={setSelectDatas}
            headData={headData}
            setHeadData={setHeadData}
            selectList={selectList}
            setSelectList={setSelectList}
          />
        </Route>

        <Route exact path="/test">
          <Test />
        </Route>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
      </Switch>
    </div>
  )
}

export default App
