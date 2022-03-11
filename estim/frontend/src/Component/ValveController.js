import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { Route } from 'react-router-dom'
import Slide from './Slide'
import { useParams } from 'react-router-dom'

let IDX = 1
const ValveController = props => {
  let id = useParams()
  console.log(IDX)
  console.log(props)
  const [valve, setValve] = useState([1])

  const addHandler = () => {
    IDX++

    let newArr = [...valve]

    newArr.push(IDX)

    setValve(newArr)
  }

  const deleteHandler = () => {
    if (valve.length === 1) {
      IDX = 1
    } else {
      IDX = 1

      let deleteArr = [...valve]

      deleteArr.pop()

      setValve(deleteArr)
    }
  }

  $(function () {
    // 컨텐츠 기본높이

    // 벨브 관련 ====================
    $('.square_box').on('click', '.valve_default', function () {
      $(this).siblings('li').removeClass('square_active')

      $(this).addClass('square_active')
    })

    squareBoxW()

    // 벨브조절에 따른 넓이변화
    function squareBoxW() {
      var liMount = $('.square_box').find('li').length
      var liW = 23
      $('.square_box').css('width', liMount * liW)
    }

    var offset = 0
    $('.btn_valve_prev').on('click', function (e) {
      e.preventDefault()
      if ($('.square_box_wrap').width() < $('.square_box').width()) {
        if (offset <= 0) {
          offset = 0
        } else {
          offset = offset - $('.square_box_wrap').width()
        }
        console.log(offset)
        $('.square_box').css('transform', 'translateX(' + -offset + 'px)')
      }
    })
    $('.btn_valve_next').on('click', function (e) {
      e.preventDefault()
      if ($('.square_box_wrap').width() < $('.square_box').width()) {
        if (offset < 0) {
          offset = 0
        } else if (
          offset + $('.square_box_wrap').width() >=
          $('.square_box').width()
        ) {
          // 제일 끝에 닿았을 때
          offset = $('.square_box').width() - $('.square_box_wrap').width()
        } else {
          offset = offset + $('.square_box_wrap').width()
        }

        $('.square_box').css('transform', 'translateX(' + -offset + 'px)')
      }
    })

    // tag 선택
    $('.tag_list').on('click', 'li', function () {
      $(this).siblings('li').removeClass('tag_active')
      $(this).addClass('tag_active')
    })
  })

  return (
    <div>
      <div className="full_wrap_pd flex_box valve_controller">
        <div className="left_box">
          <button className="btn btn_sm btn_wh" onClick={addHandler}>
            벨브추가
          </button>

          <button className="btn btn_sm btn_wh" onClick={deleteHandler}>
            삭제
          </button>
        </div>
        <div className="right_box">
          <button className="btn_dobleArrow_left btn_valve_prev"></button>
          <div className="square_box_wrap">
            <ul className="square_box">
              {valve.map((item, idx) => {
                return (
                  <>
                    <li className="valve_default square_active" key={idx}>
                      {item}
                    </li>
                  </>
                )
              })}

              <li className="plus">+</li>
            </ul>
          </div>
          <button className="btn_dobleArrow_right btn_valve_next"></button>
        </div>
      </div>
    </div>
  )
}

export default ValveController
