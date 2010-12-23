function rand(n,m,decimals) {
  var random = n+(Math.random()*(m-n));
  if(decimals == undefined) {
    return Math.round(random);
  }
  else {
    return (Math.round(random*decimals*10))/(decimals*10);
  }

  
}

function int_to_string(value,length) {
  var score = ''+Math.abs(value);
  var string_score = '';
  if(value < 0) {
    string_score += '-';
  }
  else {
    string_score += '  ';
  }
  for(i=0; i<length-score.length;i++) {
    string_score += '0';
  }
  string_score += Math.abs(value);
  return string_score;
}
