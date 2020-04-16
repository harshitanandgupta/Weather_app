console.log("I am loaded")

function disperror(text){
    document.getElementById('loading').style.display='none'
    document.getElementById('err').innerHTML=text
    document.getElementById('err').style.display='inline'
    setTimeout(()=>{
    document.getElementById('err').style.display='none'
    },3000)
}
function dispdata(text){
    document.getElementById('p1').innerHTML=text;
    document.getElementById('loading').style.display='none'

}

document.getElementById('submit').addEventListener('click',(e) => {
    e.preventDefault();
    document.getElementById('p1').innerHTML='';
    var search_text=document.getElementById('text').value;
    if(search_text=== '')
    {
        disperror('Enter The Value to be Searched')
    }
    else{
        document.getElementById('loading').style.display='block'
        fetch(`/weather?location=${search_text}`).then((response)=>{
            response.json().then((data)=>{
                if(data.error)
                disperror(data.error)
                else
                dispdata(`The Current Weather for ${data.location} is ${data.description}.The current Temperature is ${data.temp} degrees Celcius.The humidity is ${data.humid}.`)
            })
        })
    }
})