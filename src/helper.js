
export function formattedDate(d = null) {
  if (!!d && typeof d === 'number') {
    d = new Date(d)
  } else {
    d = new Date()
  }

  return [d.getDate(), d.getMonth() + 1, d.getFullYear()].reverse()
    .map(n => n < 10 ? `0${n}` : `${n}`).join('-');
}

export function dateTimeTo12HourTime(datetime) {
  const time = datetime.split(' ').pop()
  
  const hours = parseInt(time.split(':')[0])
  const ampm = hours >= 12 ? 'pm' : 'am';
  const hours12 = (hours % 12)
  return `${hours12 !== 0? hours12 : hours}: 00 ${ampm}`
}