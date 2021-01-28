const condition = (conditionCode) => {
  let conditionTerm;
  switch (conditionCode) {
    case '00':
    case '01':
    case '30':
    case '31':
      conditionTerm = "nice";
      break;
    case '02':
    case '03':
    case '04':
    case '05':
    case '10':
    case '22':
    case '23':
    case '32':
    case '33':
    case '34':
    case '35':
      conditionTerm = "okay";
      break;
    case '06':
    case '07':
    case '08':
    case '12':
    case '13':
    case '15':
    case '16':
    case '19':
    case '24':
    case '28':
    case '36':
    case '37':
    case '38':
      conditionTerm = "precip";
      break;
    case '09':
    case '14':
    case '17':
    case '18':
    case '27':
    case '39':
    case '40':
    case '43':
    case '44':
      conditionTerm = "bad";
      break;
  default:
      conditionTerm = "unknown";
  }

  return conditionTerm;
}

export default condition;