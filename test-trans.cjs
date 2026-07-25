const text = 'Hello world';
fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURIComponent(text)}`)
  .then(res => res.json())
  .then(data => console.log(data[0][0][0]))
  .catch(console.error);
