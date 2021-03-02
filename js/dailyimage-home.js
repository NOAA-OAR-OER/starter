const date = Date.now(); 
const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
const mon = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
const fullDate = `${month} ${day}, ${year}`;
const imageName = `${year}${mon}${day}`;
console.log(imageName);
document.getElementById('iotd').innerHTML = '<a href="/multimedia/daily-image/media/'+imageName+'.html"><img src="/multimedia/daily-image/media/'+imageName+'-720x405.jpg" title="Image of the Day: '+fullDate+'" alt="Image of the Day: '+fullDate+'" /><h4>Image of the Day: '+fullDate+'</h4></a><p>Visit this page each day to view a new image from expeditions over the years.</p><a href="multimedia/daily-image/welcome.html" class="read-more">View more</a>';
