import React, { useState } from 'react'
import { getYear, getMonth } from 'date-fns' // getYear, getMonth
import DatePicker, { registerLocale } from 'react-datepicker' // 한국어적용
import 'react-datepicker/dist/react-datepicker.css'
import ko from 'date-fns/locale/ko' // 한국어적용
registerLocale('ko', ko) // 한국어적용
const _ = require('lodash')

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const years = _.range(1990, getYear(new Date()) + 1, 1) // 수정
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ]

  return (
    <>
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            ></button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            ></button>
          </div>
        )}
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        popperPlacement={'auto'}
        dateFormat={'yyyy-MM-dd'}
        locale={ko}
        onChange={date => setStartDate(date)}
      />
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            ></button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            ></button>
          </div>
        )}
        selected={endDate}
        selectsEnd
        startDate={startDate}
        minDate={startDate}
        dateFormat={'yyyy-MM-dd'}
        locale={ko}
        popperPlacement={'right'}
        onChange={date => setEndDate(date)}
      />
    </>
  )
}

export default Calendar
