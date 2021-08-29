console.log("Client side js file!");
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

fetch('http://localhost:5000/weather?address=visakhapatnam').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return console.log(data.error);
        }
        console.log(data);
    })
})

const weatherForm =document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

  weatherForm.addEventListener('submit',(e)=>{
    msg1.textContent="Loading...";
    msg2.textContent='';
      if(!search){
          return console.log("PLease enter location");
      }
      var url = 'weather?address='+search.value;
      console.log(search.value);
      fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return msg1.textContent=data.error;
        }
        // console.log(data);
        msg1.textContent=data.Location;
        msg2.textContent=data.forecast.weather;
    })
})

    e.preventDefault();
    // console.log('testing');
})