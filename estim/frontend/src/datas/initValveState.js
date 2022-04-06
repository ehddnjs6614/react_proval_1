export const initValvestate = {
  CUST_NAME: sessionStorage.getItem('CUST_NAME'),
  PROJECT: sessionStorage.getItem('PROJECT'),
  EST_REQ_EMP: sessionStorage.getItem('REC_NAME'),
  VALVE: true, //Control valve / On-Off Valve
  BODY_TYPE: null, //Valve Type - 2wayControl Globe
  // ValveType: null, // angle ~ std.butterfly
  TAG_NO: '', //Tag 번호
  BODY_SIZE: '6 (1/4")',
  BODY: 'A216-WCB',
  RATING: 'KS(JIS)',
  PLUG_DISC_BALL: 'SUS304 (CF8) + (Stellited)',
  END_CONNECTION: null,
  ACTUATOR_TYPE: null,
  HAND_WHEEL: null,
  //
  MEDIUM_1: 'Liquid',
  FR_MAX: '',
  FR_NOR: '',
  FR_MIN: '',
  FR_UNIT: 'Kg/s',
  IP_MAX: '',
  IP_NOR: '',
  IP_MIN: '',
  IP_UNIT: 'bar(a)',
  OP_MAX: '',
  OP_NOR: '',
  OP_MIN: '',
  OP_UNIT: 'bar(a)',
  IT_MAX: '',
  IT_NOR: '',
  IT_MIN: '',
  IT_UNIT: 'K',
  D_NOR: '',
  D_UNIT: 'kg/l',
  MW_NOR: '',
  MW_UNIT: 'kg/kmol',
  //
  IP_POSITIONER: 'Positioner',
  SOLENOID_CONNECT_TYPE: 'P.P',
  IP_ENCLOSURE: 'Yes',
  IP_TYPE: '+HART',
  PT_TRANSMIT: 'Yes',
  SOLENOID_MATERIAL: 'General',
  SOLENOID_MFG: false,
  LIMIT_MFG: false,
  AIR_SET_CONNECT_TYPE: 'PT',
  IP_CONDUIT_AIR_CONNECT: 'PT',
  OTHER_REQUEST: '',
  M_ID: sessionStorage.getItem('U_ID'),
  qset: 1, //카운터

  //twoway1: null,
  // select: '',
  // angle: false,
  // segmentalBall: true,

  //proof: '내압',  디비에 없는값
  // Explosion: 'Yes',
  // AirSupply1: true,
  // Electrical1: true,
  //Molecular: 'kg/k',
}
