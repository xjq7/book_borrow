function formatDate(date){
  let arr = date.split('.')
  let time = (new Date(`${arr[0]}/${arr[1]}/${arr[2]}`)).getTime()
  return time
}
function borrowDate(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  return `${y}.${m}.${d}`
}
module.exports = {
  getTime: formatDate,
  borrowDate: borrowDate
}