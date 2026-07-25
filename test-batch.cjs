const text = 'Hello world ||| Good morning ||| How are you?';
fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURIComponent(text)}`)
  .then(res => res.json())
  .then(data => console.log(data[0].map(c => c[0]).join('')))
  .catch(console.error);
