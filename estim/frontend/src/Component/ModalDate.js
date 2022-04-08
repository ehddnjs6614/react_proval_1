import React from 'react'

const ModalDate = ({
  str_date_from,
  str_date_to,
  style_background_hilight,
  style_background_normal,
  setOrderBy,
  okSearchSettings,
  str_order_by,
  setFromDate,
  setToDate,
}) => {
  return (
    <div id="modalDate" className="modal">
      <div className="modal_wrap">
        <div className="modal_header includ_title">
          조회옵션
          <button className="btn_cancle"></button>
        </div>
        <div className="modal_body">
          <div className="modal_cont">
            <div className="cont_group">
              <div className="modal_subtitle bold">조회기간</div>
              <div className="date_btns">
                <button
                  className="btn btn_sm btn_dateDuration"
                  data-duration="1m"
                >
                  1개월
                </button>
                <button
                  className="btn btn_sm btn_dateDuration"
                  data-duration="3m"
                >
                  3개월
                </button>
                <button
                  className="btn btn_sm btn_dateDuration"
                  data-duration="6m"
                >
                  6개월
                </button>
                <button
                  className="btn btn_sm btn_dateDuration"
                  data-duration="1y"
                >
                  1년
                </button>
              </div>
              <div className="date_selects">
                <div className="datepick_item">
                  <input
                    type="text"
                    id="searchStartDate"
                    className="datepick"
                    value={str_date_from}
                  />
                </div>
                <span className="dasi">-</span>
                <div className="datepick_item">
                  <input
                    type="text"
                    id="searchEndDate"
                    className="datepick"
                    value={str_date_to}
                  />
                </div>
              </div>
            </div>
            <div className="cont_group">
              {/* <div className="modal_subtitle bold">전체조회</div> */}
              {/* {(function () {
                if (str_order_by === 'A') {
                  return (
                    <div className="all_searchs">
                      <button
                        className="btn btn_sm"
                        style={style_background_hilight}
                        id="sch_order_asc"
                        onClick={() => setOrderBy('A')}
                      >
                        최신순
                      </button>
                      <button
                        className="btn btn_sm"
                        style={style_background_normal}
                        id="sch_order_desc"
                        onClick={() => setOrderBy('D')}
                      >
                        과거순
                      </button>
                      <div className="btns_center">
                        <button
                          className="btn btn_md btn_shadow"
                          id="btn_setting_ok"
                          onClick={() => okSearchSettings()}
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="all_searchs">
                      <button
                        className="btn btn_sm"
                        style={style_background_normal}
                        id="sch_order_asc"
                        onClick={() => setOrderBy('A')}
                      >
                        최신순
                      </button>
                      <button
                        className="btn btn_sm"
                        style={style_background_hilight}
                        id="sch_order_desc"
                        onClick={() => setOrderBy('D')}
                      >
                        과거순
                      </button>
                    </div>
                  )
                }
              })()} */}
              <div className="btns_center">
                <button
                  className="btn btn_md btn_shadow"
                  id="btn_setting_ok"
                  onClick={() => okSearchSettings()}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDate
