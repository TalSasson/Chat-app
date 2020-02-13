const checkRTL = (string) => {
  const initialRTL = 'he'

  let rtlValue = false
  if (typeof string !== 'string') return initialRTL

  const foundRTL = [...string].some((c) => {
    if (c.toLowerCase() !== c.toUpperCase()) {
      rtlValue = false
      return true
    }
    if (/[\u0590-\u05FF]/.test(c)) {
      rtlValue = true
      return true
    }
    return false
  })

  if (foundRTL) {
    return rtlValue
  }
  return initialRTL
}

export default checkRTL
