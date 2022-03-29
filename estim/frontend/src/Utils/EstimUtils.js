export const getDateStr = (now, dt) => {
  //0.........1........
  //0123456789012345678
  //2022-03-11 10:00:00
  let dtstr = new Date(now).toISOString().replace("T", " ").replace(/\..*/, '');
  console.log(dtstr);
  let result = '';
  if (dt == 'date') {
    result = dtstr.substring(0, 10);
  } else if (dt == 'time') {
    result = dtstr.substring(11, 8);
  } else if (dt == 'datetime') {
    result = dtstr;
  } else if (dt == 'year') {
    result = dtstr.substring(0, 4);
  } else if (dt == 'month') {
    result = dtstr.substring(5, 2);
  } else if (dt == 'day') {
    result = dtstr.substring(8, 2);
  } else if (dt == 'hour') {
    result = dtstr.substring(11, 2);
  } else if (dt == 'minute') {
    result = dtstr.substring(14, 2);
  } else if (dt == 'second') {
    result = dtstr.substring(17, 2);
  } else if (dt == 'millisecond') {
    result = '000';
  }
  return result;
}
export const getLastDay = (y, m) => {
  return new Date(Number(y), Number(m), 0).getDate();
}
export const getLastDayStr = (y, m) => {
  const ld = getLastDay(y,m);
  return (ld < 10) ? '0'+ld : ''+ld;
}
export const getSubStr = (str, start, len) => {
  let ret = '';

  //0....+....1....+....2....+
  //01234567890123456789012345
  //ABCDEFGHIJKLMNOPQRSTUVWXYZ
  //PV220317-008
  //length=12
  //start=9 ==> 12-3 = 9
  //len=-3
  //
  let new_start, new_len;

  if (len > 0) {
    new_start = start;
    new_len = len;
  }
  else if (len < 0) {
    new_start = (str+'').length + len;
    new_len = len*(-1);
  }

  ret = (str+'').substring(new_start, new_len);

  return ret;
}
export const getValidUserID = () => {
  return sessionStorage.getItem('U_ID');
}
