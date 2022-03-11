import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Test = () => {
  const [users, setUser] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await axios.get('http://192.168.0.50:8090/users')
    setUser(response.data)
  }

  // const deleteUser = async U_ID => {
  //   await axios.delete(
  //     'http://' + SERVER_NAME + ':' + SERVER_PORT + '/users/${U_ID}'
  //   )
  //   getUsers()
  // }

  return (
    <div>
      <Link to="/main" className="button is-primary mt-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>번호</th>
            <th>아이디</th>
            <th>성명</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>이동전화</th>
            <th>생성일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.U_ID}>
              <td>{index + 1}</td>
              <td>{user.U_ID}</td>
              <td>{user.U_PW}</td>
              <td>{user.CUST_NAME}</td>
              <td>{user.EMAIL}</td>
              <td>{user.TEL_NO}</td>
              <td>{user.HP_NO}</td>
              <td>{user.M_IL}</td>
              <td>
                <Link
                  to={`/edit/${user.U_ID}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                {/* <button
                  onClick={() => deleteUser(user.U_ID)}
                  className="button is-small is-danger"
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Test
