

const weatherform=document.querySelector("form");
const search=document.querySelector("input")
const message1=document.querySelector("#message-1")
const message2=document.querySelector("#message-2")


weatherform.addEventListener("submit",(e)=>{
    e.preventDefault();
    message1.textContent="...Loading"
    message2.textContent="";
    fetch(`http://localhost:3000/weather?address=${search.value}`).then(response=>{
        return response.json()
    }).then(data=>{
        if(data.error){
        message1.textContent=data.error
    }
        else{
            message1.textContent=data.location;
            message2.textContent=data.forecast;
        }
    })
})