'use strict'

module.exports = function(value){
  let letter = [];

  value.forEach( data => {
    if(data.score > 85){
      letter.push('A')
    }else if (data.score > 70) {
      letter.push('B')
    }else if (data.score > 55) {
      letter.push('C')
    }else if (data.score <= 55 && data.score > 0) {
      letter.push('E')
    }else if(data.score == null){
      letter.push('empty')
    }else {
      letter.push('empty')
    }
  })

  return letter;
}
