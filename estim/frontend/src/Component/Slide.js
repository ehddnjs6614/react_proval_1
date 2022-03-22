import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery'
import 'jquery-ui-dist/jquery-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import axios from 'axios'
import { API_URL } from '../_api/types'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Slide = ({ selectData, selectDatas, setSelectDatas, selectvalve }) => {
  let PROJECT = sessionStorage.getItem('PROJECT')
  const history = useHistory()
  const headDataRef = useRef()
  const [headData, setHeadData] = useState([])

  //bodyMaterial start
  const [Material, setMaterial] = useState([])
  const MaterialList = Material.map((size, index) => (
    <option key={index}>{size.NAME}</option>
  ))
  useEffect(() => {
    axios
      .get(`${API_URL}code/bodymaterial`)
      .then(res => {
        setMaterial(res.data.data[0].bodymaterial)
      })
      .catch()
  }, [])
  //bodyMaterial and

  //datapost api요청
  const postData = async data => {
    const res = await axios.post(`${API_URL}estimation/add`, { Tag: [data] }) //배열의 키지정.
    // headDataRef.current = res.data
    // console.log('res :', res.data)
    history.push('/qttncheck', {
      data: selectDatas,
      headData: res.data,
    })
  }

  //bodysize start
  const [Size, setSize] = useState([])
  const SizeList = Size.map((size, index) => (
    <option key={index}>{size.NAME}</option>
  ))
  useEffect(() => {
    axios
      .get(`${API_URL}code/bodysize`)
      .then(res => {
        setSize(res.data.data[0].bodysize)
      })
      .catch()
  }, [])
  //bodysize and

  //bodyRating start
  const [Rating, setRating] = useState([])
  const RatingList = Rating.map((list, i) => (
    <option key={i}>{list.NAME}</option>
  ))
  useEffect(() => {
    axios
      .get(`${API_URL}code/bodyrating`)
      .then(res => {
        setRating(res.data.data[0].bodyrating)
      })
      .catch()
  }, [])
  //bodyRating and

  //Trim Material start
  const [Trim, setTrim] = useState([])
  const TrimList = Trim.map((list, i) => <option key={i}>{list.NAME}</option>)
  useEffect(() => {
    axios
      .get(`${API_URL}code/trimmaterial`)
      .then(res => {
        setTrim(res.data.data[0].trimmaterial)
      })
      .catch()
  }, [])
  //Trim Material and

  //Q Unit start
  const [Qunit, setQunit] = useState([])
  const QunitList = Qunit.map((list, i) => <option key={i}>{list.NAME}</option>)
  useEffect(() => {
    axios
      .get(`${API_URL}code/qu`)
      .then(res => {
        setQunit(res.data.data[0].qu)
      })
      .catch()
  }, [])
  //Q Unit and

  //P1 Unit start
  const [P1unit, setP1unit] = useState([])
  const P1unitList = P1unit.map((list, i) => (
    <option key={i}>{list.NAME}</option>
  ))
  useEffect(() => {
    axios
      .get(`${API_URL}code/p1u`)
      .then(res => {
        setP1unit(res.data.data[0].p1u)
      })
      .catch()
  }, [])
  //P1 Unit and

  //P2 Unit start
  const [P2unit, setP2unit] = useState([])
  const P2unitList = P2unit.map((list, i) => (
    <option key={i}>{list.NAME}</option>
  ))
  useEffect(() => {
    axios
      .get(`${API_URL}code/p2u`)
      .then(res => {
        setP2unit(res.data.data[0].p2u)
      })
      .catch()
  }, [])
  //P2 Unit and

  //T1 Unit start
  const [T1Unit, setT1Unit] = useState([])
  const T1UnitList = T1Unit.map((list, i) => (
    <option key={i}>{list.NAME}</option>
  ))
  useEffect(() => {
    axios
      .get(`${API_URL}code/t1u`)
      .then(res => {
        setT1Unit(res.data.data[0].t1u)
      })
      .catch()
  }, [])
  //T1 Unit and

  //Density Unit start
  const [Density, setDensity] = useState([])
  const DensityList = Density.map((list, i) => (
    <option key={i}>{list.NAME}</option>
  ))
  useEffect(() => {
    axios
      .get(`${API_URL}code/density`)
      .then(res => {
        setDensity(res.data.data[0].density)
      })
      .catch()
  }, [])
  //Density Unit and

  //Molecular Unit start
  const [Molecular, setMolecular] = useState([])
  const MolecularList = Molecular.map((list, i) => (
    <option key={i}>{list.NAME}</option>
  ))
  useEffect(() => {
    axios
      .get(`${API_URL}code/molecular`)
      .then(res => {
        setMolecular(res.data.data[0].molecular)
      })
      .catch()
  }, [])
  //Molecular Unit and

  //Tag api
  const getTag = async () => {
    const res = await axios.get(`${API_URL}estimation/tag/2wayController`)
    const TAG_NO = res.data.data
    return TAG_NO
  }

  const getTag1 = async () => {
    const res = await axios.get(`${API_URL}estimation/tag/2way`)
    const TAG_NO = res.data.data
    return TAG_NO
  }

  const btn_up = () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]

      return [
        ...s.slice(0, selectvalve),
        { ...currentData, qset: selectData.qset + 1 },
        ...s.slice(selectvalve + 1),
      ]
    })
  }

  const btn_down = () => {
    if (selectData.qset === 1) return
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, qset: selectData.qset - 1 },
        ...s.slice(selectvalve + 1),
      ]
    })
  }

  const changevalvebyname = name => async () => {
    let TAG_NO = null

    //name과 toway가 같을때 gettag 실행.
    if (name === 'twoway') {
      TAG_NO = await getTag()
    }
    if (name === 'twoway1') {
      TAG_NO = await getTag1()
    }

    setSelectDatas(s => {
      const currentData = s[selectvalve]
      if (TAG_NO === null) {
        return [
          ...s.slice(0, selectvalve),
          { ...currentData, [name]: !currentData[name] },
          ...s.slice(selectvalve + 1),
        ]
      }
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, [name]: !currentData[name], TAG_NO },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const setValueByName = (key, value) => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, [key]: value },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  // const changeAccessory = name => () => {
  //   setSelectDatas(s => {
  //     const currentData = s[selectvalve]
  //     return [
  //       ...s.slice(0, selectvalve),
  //       { ...currentData, [name]: !currentData[name] },
  //       ...s.slice(selectvalve + 1),
  //     ]
  //   })
  // }
  const changeEndConnection = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, END_CONNECTION: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeSOLENOID_MFG = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, SOLENOID_MFG: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeLIMIT_MFG = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, LIMIT_MFG: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }

  const changeValveType = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, ValveType: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeAirSupply = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, AIR_SET_CONNECT_TYPE: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeElectrical = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, IP_CONDUIT_AIR_CONNECT: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changePneumatic = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, ACTUATOR_TYPE: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeHandle = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, Handle: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeIP_ENCLOSURE = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, IP_ENCLOSURE: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changePT_TRANSMIT = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, PT_TRANSMIT: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeSOLENOID_MATERIAL = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, SOLENOID_MATERIAL: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeIP_TYPE = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, IP_TYPE: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changecontrolvalve = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, VALVE: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeFluid = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, MEDIUM_1: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeProof = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, proof: name },
        ...s.slice(selectvalve + 1),
      ]
    })
  }
  const changeType = name => () => {
    setSelectDatas(s => {
      const currentData = s[selectvalve]
      return [
        ...s.slice(0, selectvalve),
        { ...currentData, SOLENOID_CONNECT_TYPE: name },
        ...s.slice(selectvalve + 1),
      ]
    })
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
      <div className="full_wrap_pd">
        <div className="company_title" value={PROJECT}>
          {PROJECT}
        </div>
        <div className="tag_box flex_box">
          <div className="tag_label ">
            <span className="num tag_btn">{selectvalve + 1}</span>
            <span className="tab_no">Tag No.</span>
          </div>
          <div className="tag_input">
            <input type="text" value={selectData.TAG_NO} />

            <button className="tag_btn tab_btn_sky">수정</button>
          </div>
        </div>
      </div>

      {/* <!-- Swiper --> */}

      <div className="swiper_btn_box">
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>

      <div className="swiper qttn_swiperr">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          <SwiperSlide>
            <div className="sub_box1">
              <div className="sub_title1">Body / Actuator Information</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sub_box1">
              <div className="sub_title1">Fluid Information</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sub_box1">
              <div className="sub_title1">Accessory Information</div>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* 여기서 부터 시작 */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoHeight
          scrollbar={{ draggable: true }}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {' '}
          {/* <!-- Swiper --> */}
          <div className="swiper-wrapper">
            <SwiperSlide>
              <div className="swiper_wrap">
                <div className="input_group">
                  <label htmlFor="">Q'ty(Set)</label>
                  <div className="mount_box">
                    <input type="text" value={selectData.qset} />
                    <div className="mount_btn">
                      <button className="btn_up" onClick={btn_up}></button>
                      <button className="btn_down" onClick={btn_down}></button>
                    </div>
                  </div>
                </div>
                <div className="input_group">
                  <div className="check_item w_50">
                    <input
                      type="radio"
                      id="conrolValve"
                      name="conrolValve"
                      value="conrolValve"
                      checked={selectData.VALVE === 'Control Valve'}
                      onClick={changecontrolvalve('Control Valve')}
                    />
                    <label htmlFor="conrolValve">Control Valve</label>
                  </div>
                  <div className="check_item w_50">
                    <input
                      type="radio"
                      id="conoffValve1"
                      name="conrolValve1"
                      value="conrolValve1"
                      checked={selectData.VALVE === 'On-Off Valve'}
                      onClick={changecontrolvalve('On-Off Valve')}
                    />
                    <label htmlFor="conoffValve1">On-Off Valve</label>
                  </div>
                </div>
                <div className="blue_box">
                  <div className="blue_title">Valve Type</div>
                  <div className="blue_cont">
                    <div className="input_group">
                      <div className="input_group w_50">
                        <div className="check_item w_50">
                          <input
                            type="radio"
                            id="onoffValve1"
                            checked={
                              selectData.twoway === null
                                ? false
                                : selectData.twoway
                            }
                            onClick={changevalvebyname('twoway', true)}
                          />
                          <label htmlFor="onoffValve1">2 way</label>
                        </div>
                        <div className="check_item w_50">
                          <input
                            type="radio"
                            name="onoffValve2"
                            id="onoffValve2"
                            value="onoffValve2"
                            checked={
                              selectData.twoway === null
                                ? false
                                : !selectData.twoway
                            }
                            onClick={changevalvebyname('twoway', true)}
                          />
                          <label htmlFor="onoffValve2">3 way</label>
                        </div>
                      </div>
                      <div className="w_50 bold">Control Globe</div>
                    </div>
                    <div className="input_group">
                      {/* 시작 */}
                      <div className="check_item bold">
                        <input
                          type="checkbox"
                          id="conrolValve2"
                          checked={
                            selectData.ValveType === null
                              ? false
                              : selectData.ValveType === 'Angle'
                          }
                          onClick={changeValveType('Angle')}
                        />
                        <label htmlFor="conrolValve2">Angle</label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="check_item bold">
                        <input
                          type="checkbox"
                          id="conrolValve3"
                          checked={
                            selectData.ValveType === null
                              ? false
                              : selectData.ValveType === 'Segmental Ball'
                          }
                          onClick={changeValveType('Segmental Ball')}
                        />
                        <label htmlFor="conrolValve3">Segmental Ball</label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="check_item bold">
                        <input
                          type="checkbox"
                          id="conrolValve4"
                          checked={
                            selectData.ValveType === null
                              ? false
                              : selectData.ValveType ===
                                'Hi-Performance Butterfly'
                          }
                          onClick={changeValveType('Hi-Performance Butterfly')}
                        />
                        <label htmlFor="conrolValve4">
                          Hi-Performance Butterfly
                        </label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="check_item bold">
                        <input
                          type="checkbox"
                          id="conrolValve5"
                          checked={
                            selectData.ValveType === null
                              ? false
                              : selectData.ValveType === 'Std. Butterfly'
                          }
                          onClick={changeValveType('Std. Butterfly')}
                        />
                        <label htmlFor="conrolValve5">Std. Butterfly</label>
                        {/* 끝 */}
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="input_group w_50">
                        <div className="check_item w_50">
                          <input
                            type="checkbox"
                            id="conrolValve6"
                            name="conrolValve6"
                            value="conrolValve6"
                            checked={
                              selectData.twoway1 === null
                                ? false
                                : selectData.twoway1
                            }
                            onClick={changevalvebyname('twoway1', false)}
                          />
                          <label htmlFor="conrolValve6">2 way</label>
                        </div>
                        <div className="check_item w_50">
                          <input
                            type="checkbox"
                            id="conrolValve7"
                            name="conrolValve7"
                            value="conrolValve7"
                            checked={
                              selectData.twoway1 === null
                                ? false
                                : !selectData.twoway1
                            }
                            onClick={changevalvebyname('twoway1', false)}
                          />
                          <label htmlFor="conrolValve7">3 way</label>
                        </div>
                      </div>
                      <div className="w_50 bold">Conventional Ball</div>
                    </div>
                  </div>
                </div>
                <div className="no_blue_box">
                  <div className="input_group">
                    <div className="w_50 vertical_group">
                      <label htmlFor="" className="bold">
                        Body Size
                      </label>

                      <select
                        name=""
                        id=""
                        value={selectData.BODY_SIZE}
                        onChange={e =>
                          setValueByName('BODY_SIZE', e.target.value)
                        }
                      >
                        {SizeList}
                      </select>
                    </div>
                    <div className="w_50 vertical_group">
                      <label htmlFor="" className="bold">
                        Body Material
                      </label>
                      <select
                        name=""
                        id=""
                        value={selectData.BODY}
                        onChange={e => setValueByName('BODY', e.target.value)}
                      >
                        {MaterialList}
                      </select>
                    </div>
                  </div>
                  <div className="input_group">
                    <div className="w_50 vertical_group">
                      <label htmlFor="" className="bold">
                        Body Rating
                      </label>
                      <select
                        name=""
                        id=""
                        value={selectData.RATING}
                        onChange={e => setValueByName('RATING', e.target.value)}
                      >
                        {RatingList}
                      </select>
                    </div>
                    <div className="w_50 vertical_group">
                      <label htmlFor="" className="bold">
                        Trim Material
                      </label>
                      <select
                        name=""
                        id=""
                        value={selectData.PLUG_DISC_BALL}
                        onChange={e =>
                          setValueByName('PLUG_DISC_BALL', e.target.value)
                        }
                      >
                        {TrimList}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="blue_box">
                  <div className="blue_title">End Connection</div>
                  <div className="blue_cont">
                    <div className="input_group check_more_box">
                      <div className="check_item w_50">
                        <input
                          type="checkbox"
                          id="conrolValve8"
                          name="conrolValve8"
                          value="conrolValve8"
                          checked={
                            selectData.END_CONNECTION === null
                              ? false
                              : selectData.END_CONNECTION === 'Flange'
                          }
                          onClick={changeEndConnection('Flange')}
                        />
                        <label htmlFor="conrolValve8">Flange</label>
                      </div>
                      <div className="check_item w_50">
                        <input
                          type="checkbox"
                          id="conrolValve9"
                          name="conrolValve9"
                          value="conrolValve9"
                          checked={
                            selectData.END_CONNECTION === null
                              ? false
                              : selectData.END_CONNECTION === 'Screw'
                          }
                          onClick={changeEndConnection('Screw')}
                        />
                        <label htmlFor="conrolValve9">Screw</label>
                      </div>
                      <div className="check_item w_50">
                        <input
                          type="checkbox"
                          id="conrolValve10"
                          name="conrolValve10"
                          value="conrolValve10"
                          checked={
                            selectData.END_CONNECTION === null
                              ? false
                              : selectData.END_CONNECTION === 'Socket welding'
                          }
                          onClick={changeEndConnection('Socket welding')}
                        />
                        <label htmlFor="conrolValve10">Socket welding</label>
                      </div>
                      <div className="check_item w_50">
                        <input
                          type="checkbox"
                          id="conrolValve11"
                          name="conrolValve11"
                          value="conrolValve11"
                          checked={
                            selectData.END_CONNECTION === null
                              ? false
                              : selectData.END_CONNECTION === 'Butt welding'
                          }
                          onClick={changeEndConnection('Butt welding')}
                        />
                        <label htmlFor="conrolValve11">Butt welding</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="no_blue_box">
                  <div className="title">Actuator</div>
                  <div className="input_group">
                    <div className="check_item w_33">
                      <input
                        type="checkbox"
                        id="conrolValve12"
                        name="conrolValve12"
                        value="conrolValve12"
                        checked={
                          selectData.ACTUATOR_TYPE === null
                            ? false
                            : selectData.ACTUATOR_TYPE === 'Pneumatic'
                        }
                        onClick={changePneumatic('Pneumatic')}
                      />
                      <label htmlFor="conrolValve12">Pneumatic</label>
                    </div>
                    <div className="check_item w_33">
                      <input
                        type="checkbox"
                        id="conrolValve13"
                        name="conrolValve13"
                        value="conrolValve13"
                        checked={
                          selectData.ACTUATOR_TYPE === null
                            ? false
                            : selectData.ACTUATOR_TYPE === 'Electric'
                        }
                        onClick={changePneumatic('Electric')}
                      />
                      <label htmlFor="conrolValve13">Electric</label>
                    </div>
                    <div className="check_item w_33">
                      <input
                        type="checkbox"
                        id="conrolValve14"
                        name="conrolValve14"
                        value="conrolValve14"
                        checked={
                          selectData.ACTUATOR_TYPE === null
                            ? false
                            : selectData.ACTUATOR_TYPE === 'Hydraulic'
                        }
                        onClick={changePneumatic('Hydraulic')}
                      />
                      <label htmlFor="conrolValve14">Hydraulic</label>
                    </div>
                  </div>
                </div>
                <div className="no_blue_box">
                  <div className="title">Handle</div>
                  <div className="input_group">
                    <div className="check_item w_50">
                      <input
                        type="checkbox"
                        id="conrolValve15"
                        name="conrolValve15"
                        value="conrolValve15"
                        checked={
                          selectData.Handle === null
                            ? false
                            : selectData.Handle === 'Yes'
                        }
                        onClick={changeHandle('Yes')}
                      />
                      <label htmlFor="conrolValve15">Yes</label>
                    </div>
                    <div className="check_item w_50">
                      <input
                        type="checkbox"
                        id="conrolValve16"
                        name="conrolValve16"
                        value="conrolValve16"
                        checked={
                          selectData.Handle === null
                            ? false
                            : selectData.Handle === 'No'
                        }
                        onClick={changeHandle('No')}
                      />
                      <label htmlFor="conrolValve16">No</label>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
          <SwiperSlide>
            <div className="swiper-slide" data-title="Fluid Information">
              <div className="swiper_wrap">
                <div className="blue_box">
                  <div className="blue_title">Fluid</div>
                  <div className="blue_cont">
                    <div className="input_group check_more_box">
                      <div className="check_item w_33">
                        <input
                          type="checkbox"
                          id="conrolValve17"
                          name="conrolValve17"
                          value="conrolValve17"
                          checked={selectData.MEDIUM_1 === 'Liquid'}
                          onClick={changeFluid('Liquid')}
                        />
                        <label htmlFor="conrolValve17">Liquid</label>
                      </div>
                      <div className="check_item w_33">
                        <input
                          type="checkbox"
                          id="conrolValve18"
                          name="conrolValve18"
                          value="conrolValve18"
                          checked={selectData.MEDIUM_1 === 'Stram'}
                          onClick={changeFluid('Stram')}
                        />
                        <label htmlFor="conrolValve18">Stram</label>
                      </div>
                      <div className="check_item w_33">
                        <input
                          type="checkbox"
                          id="conrolValve19"
                          name="conrolValve19"
                          value="conrolValve19"
                          checked={selectData.MEDIUM_1 === 'Gas'}
                          onClick={changeFluid('Gas')}
                        />
                        <label htmlFor="conrolValve19">Gas</label>
                      </div>
                      <table className="table_input bold">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Max</th>
                            <th>Normal</th>
                            <th>Min</th>
                            <th>Unit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Q</th>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <select
                                name=""
                                id=""
                                className="w_100"
                                value={selectData.FR_UNIT}
                                onChange={e =>
                                  setValueByName('FR_UNIT', e.target.value)
                                }
                              >
                                {QunitList}
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <th>P1</th>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <select
                                name=""
                                id=""
                                className="w_100"
                                value={selectData.IP_UNIT}
                                onChange={e =>
                                  setValueByName('IP_UNIT', e.target.value)
                                }
                              >
                                {P1unitList}
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <th>P2</th>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <select
                                name=""
                                id=""
                                className="w_100"
                                value={selectData.OP_UNIT}
                                onChange={e =>
                                  setValueByName('OP_UNIT', e.target.value)
                                }
                              >
                                {P2unitList}
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <th>T1</th>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <select
                                name=""
                                id=""
                                className="w_100"
                                value={selectData.IT_UNIT}
                                onChange={e =>
                                  setValueByName('IT_UNIT', e.target.value)
                                }
                              >
                                {T1UnitList}
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <th colspan="2">Density</th>
                            <td colspan="2">
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <select
                                name=""
                                id=""
                                className="w_100"
                                value={selectData.D_UNIT}
                                onChange={e =>
                                  setValueByName('D_UNIT', e.target.value)
                                }
                              >
                                {DensityList}
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <th colspan="2">Molecular</th>
                            <td colspan="2">
                              <input type="text" className="input_bk" />
                            </td>
                            <td>
                              <select
                                name=""
                                id=""
                                className="w_100"
                                value={selectData.MW_UNIT}
                                onChange={e =>
                                  setValueByName('MW_UNIT', e.target.value)
                                }
                              >
                                {MolecularList}
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="swiper-slide" data-title="Accessory Information">
              <div className="swiper_wrap">
                <div className="blue_box">
                  <div className="blue_title">Accessory</div>
                  <div className="blue_cont" aria-disabled>
                    <div className="input_group">
                      <div className="check_item bold">
                        <input
                          type="checkbox"
                          id="conrolValve100"
                          checked={selectData['IP_POSITIONER']}
                          onClick={changevalvebyname('IP_POSITIONER')}
                        />
                        <label htmlFor="conrolValve100">Positioner</label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="small_title w_25">Type</div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve20"
                          name="conrolValve20"
                          value="conrolValve20"
                          checked={selectData.SOLENOID_CONNECT_TYPE === 'P.P'}
                          onClick={changeType('P.P')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve20">P.P</label>
                      </div>

                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve21"
                          name="conrolValve21"
                          value="conrolValve21"
                          checked={selectData.SOLENOID_CONNECT_TYPE === 'E.P'}
                          onClick={changeType('E.P')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve21">E.P</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve22"
                          name="conrolValve22"
                          value="conrolValve22"
                          checked={selectData.SOLENOID_CONNECT_TYPE === 'Smart'}
                          onClick={changeType('Smart')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve22">Smart</label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="check_item w_50">
                        <div className="small_title">Explosion proof</div>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve23"
                          name="conrolValve23"
                          value="conrolValve23"
                          checked={selectData.IP_ENCLOSURE === 'Yes'}
                          onClick={changeIP_ENCLOSURE('Yes')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve23">Yes</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve24"
                          name="conrolValve24"
                          value="conrolValve24"
                          checked={selectData.IP_ENCLOSURE === 'No'}
                          onClick={changeIP_ENCLOSURE('No')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve24">No</label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="w_25"></div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve25"
                          name="conrolValve25"
                          value="conrolValve25"
                          checked={selectData.proof === '내압'}
                          onClick={changeProof('내압')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve25">내압</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve26"
                          name="conrolValve26"
                          value="conrolValve26"
                          checked={selectData.proof === '본질안전'}
                          onClick={changeProof('본질안전')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve26">본질안전</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve27"
                          name="conrolValve27"
                          value="conrolValve27"
                          checked={selectData.proof === '수소방폭'}
                          onClick={changeProof('수소방폭')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve27">수소방폭</label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="check_item w_50">
                        <div className="small_title">Communication</div>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve28"
                          name="conrolValve28"
                          value="conrolValve28"
                          checked={selectData.IP_TYPE === '+HART'}
                          onClick={changeIP_TYPE('+HART')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve28">+HART</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve29"
                          name="conrolValve29"
                          value="conrolValve29"
                          checked={selectData.IP_TYPE === '+Field-bus'}
                          onClick={changeIP_TYPE('+Field-bus')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve29">+Field-bus</label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="check_item w_50">
                        <div className="small_title">Transmitter</div>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve30"
                          name="conrolValve30"
                          value="conrolValve30"
                          checked={selectData.PT_TRANSMIT === 'Yes'}
                          onClick={changePT_TRANSMIT('Yes')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve30">Yes</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve31"
                          name="conrolValve31"
                          value="conrolValve31"
                          checked={selectData.PT_TRANSMIT === 'No'}
                          onClick={changePT_TRANSMIT('No')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve31">No</label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="check_item w_50">
                        <div className="small_title">Material</div>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve32"
                          name="conrolValve32"
                          value="conrolValve32"
                          checked={selectData.SOLENOID_MATERIAL === 'General'}
                          onClick={changeSOLENOID_MATERIAL('General')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve32">General</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve33"
                          name="conrolValve33"
                          value="conrolValve33"
                          checked={selectData.SOLENOID_MATERIAL === 'SUS'}
                          onClick={changeSOLENOID_MATERIAL('SUS')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve33">SUS</label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="check_item bold">
                        <input
                          type="checkbox"
                          id="conrolValve34"
                          checked={selectData.SOLENOID_MFG === 'Solenoid Valve'}
                          onClick={changeSOLENOID_MFG('Solenoid Valve')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve34">Solenoid Valve</label>
                      </div>
                    </div>
                    <div className="input_group">
                      <div className="check_item bold">
                        <input
                          type="checkbox"
                          id="conrolValve35"
                          checked={selectData.LIMIT_MFG === 'Linit Switch'}
                          onClick={changeLIMIT_MFG('Linit Switch')}
                          disabled={selectData.IP_POSITIONER === false}
                        />
                        <label htmlFor="conrolValve35">Linit Switch</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blue_box">
                  <div className="blue_title">Conduit Connection</div>
                  <div className="blue_cont">
                    <div className="input_group check_more_box">
                      <div className="small_title w_100">AirSupply</div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve36"
                          name="conrolValve36"
                          value="conrolValve36"
                          checked={selectData.AIR_SET_CONNECT_TYPE === 'PT'}
                          onClick={changeAirSupply('PT')}
                        />
                        <label htmlFor="conrolValve36">PT</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve37"
                          name="conrolValve37"
                          value="conrolValve37"
                          checked={selectData.AIR_SET_CONNECT_TYPE === 'PT.F'}
                          onClick={changeAirSupply('PT.F')}
                        />
                        <label htmlFor="conrolValve37">PT.F</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve38"
                          name="conrolValve38"
                          value="conrolValve38"
                          checked={selectData.AIR_SET_CONNECT_TYPE === 'NPT'}
                          onClick={changeAirSupply('NPT')}
                        />
                        <label htmlFor="conrolValve38">NPT</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve39"
                          name="conrolValve39"
                          value="conrolValve39"
                          checked={selectData.AIR_SET_CONNECT_TYPE === 'NPT.F'}
                          onClick={changeAirSupply('NPT.F')}
                        />
                        <label htmlFor="conrolValve39">NPT.F</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve40"
                          name="conrolValve40"
                          value="conrolValve40"
                          checked={selectData.AirSupply1}
                          onClick={changevalvebyname('AirSupply1')}
                        />
                        <label htmlFor="conrolValve40">1/2</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve41"
                          name="conrolValve41"
                          value="conrolValve41"
                          checked={!selectData.AirSupply1}
                          onClick={changevalvebyname('AirSupply1')}
                        />
                        <label htmlFor="conrolValve41">1/4</label>
                      </div>
                      <div className="w_50">
                        <input type="text" className="input_bk" />
                      </div>
                    </div>
                    <div className="input_group check_more_box">
                      <div className="small_title w_100">Electrical</div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve42"
                          name="conrolValve42"
                          value="conrolValve42"
                          checked={selectData.IP_CONDUIT_AIR_CONNECT === 'PT'}
                          onClick={changeElectrical('PT')}
                        />
                        <label htmlFor="conrolValve42">PT</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve43"
                          name="conrolValve43"
                          value="conrolValve43"
                          checked={selectData.IP_CONDUIT_AIR_CONNECT === 'PT.F'}
                          onClick={changeElectrical('PT.F')}
                        />
                        <label htmlFor="conrolValve43">PT.F</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve44"
                          name="conrolValve44"
                          value="conrolValve44"
                          checked={selectData.IP_CONDUIT_AIR_CONNECT === 'NPT'}
                          onClick={changeElectrical('NPT')}
                        />
                        <label htmlFor="conrolValve44">NPT</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve45"
                          name="conrolValve45"
                          value="conrolValve45"
                          checked={
                            selectData.IP_CONDUIT_AIR_CONNECT === 'NPT.F'
                          }
                          onClick={changeElectrical('NPT.F')}
                        />
                        <label htmlFor="conrolValve45">NPT.F</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve46"
                          name="conrolValve46"
                          value="conrolValve46"
                          checked={selectData.Electrical1}
                          onClick={changevalvebyname('Electrical1')}
                        />
                        <label htmlFor="conrolValve46">1/2</label>
                      </div>
                      <div className="check_item w_25">
                        <input
                          type="checkbox"
                          id="conrolValve47"
                          name="conrolValve47"
                          value="conrolValve47"
                          checked={!selectData.Electrical1}
                          onClick={changevalvebyname('Electrical1')}
                        />
                        <label htmlFor="conrolValve47">1/4</label>
                      </div>
                      <div className="w_50">
                        <input type="text" className="input_bk" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blue_box">
                  <div className="blue_title">Other requests</div>
                  <div className="blue_cont">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      className="input_bk"
                    ></textarea>
                  </div>
                </div>

                <button
                  to={{
                    pathname: '/qttncheck',
                    state: { data: selectDatas, headData: headDataRef.current },
                  }}
                  className="btn btn_100"
                  onClick={() => {
                    postData(selectData, headData)
                  }}
                >
                  정보 입력 완료
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Slide
