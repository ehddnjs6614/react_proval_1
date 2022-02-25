import { Route } from 'react-router-dom'
import { BrowserRouter, Switch } from 'react-router-dom'
import AccountMngmn from './Component/AccountMngmn'
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
import QttnStart from './Component/QttnStart'
import Request from './Component/Request'
import Signup from './Component/Signup'
import Sin from './Component/Sin'
import Test from './Component/Test'

function App() {
  return (
    <>
      <BrowserRouter>
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

          <Route exact path="/menu">
            <Menu />
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
            <FormSelect />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/qttnstart">
            <QttnStart />
          </Route>
          <Route exact path="/test">
            <Test />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
