function rand(n,m,decimals) {
  var random = n+(Math.random()*(m-n));
  if(decimals == undefined) {
    return Math.round(random);
  }
  else {
    return (Math.round(random*decimals*10))/(decimals*10);
  }
}
