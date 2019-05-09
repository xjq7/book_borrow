function formatDate(date){
  let arr = date.split('.')
  let time = (new Date(`${arr[0]}/${arr[1]}/${arr[2]}`)).getTime()
  return time
}
module.exports = {
  getTime: formatDate
}