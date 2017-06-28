import moment from 'moment';

export default function(date) {
  let timeString = new Date(date);
  let time = Math.floor((new Date - timeString)/864000/24/4);
  if(time < 365) {
    if(time < 2) {
      return moment(timeString, "YYYYMMDD").fromNow();
    } else {
      return `${timeString.getDate()} tháng ${timeString.getMonth() + 1} năm  ${timeString.getFullYear()}`
    }
  } else {
    let years = (new Date).getFullYear() - timeString.getFullYear();
    return `${years} năm trước`;
  }
}
