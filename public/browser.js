function valueShow(item){
    return `
    <h1 data-id="${item._id}" id="saved" style="color: #E4E6EB; font-size: 46px; margin-left: 31px; margin-bottom: -3px" >Rp ${item.value}</h1>
    <button class="add-me" type="Button" style="background-color: #0E6B0E; width: 160px; height: 38px; border-radius: 18px; margin-top: 45px;  margin-left: 31px; border: 0px; color: #E4E6EB;"> + </button>
     <button class="sub-me" type="Button" style="background-color: #8E1600; width: 160px; height: 38px; border-radius: 18px; margin-top: 45px;  margin-left: 31px; border: 0px; color: #E4E6EB;""> - </button>`
}

let balance = items.map((item) => {
    return valueShow(item) 
}).join("") 

document.getElementById('showBalance').insertAdjacentHTML('afterend', balance)

document.addEventListener("click", (e) => {
    //ADD BALANCE COMMAND
    if(e.target.classList.contains("add-me")){
       let userInput = prompt("Add Balance into your Savings.")
       let numb = parseInt(userInput, 10)
        if(userInput){
            axios.post('/add', {value: numb}).then(() => {
                document.getElementById('saved').innerHTML = numb
            }).catch(() => {
                console.log(console.error())
            })
        }
    }

    //SUBTRACT BALANCE COMMAND
    if(e.target.classList.contains("sub-me")){
        let userInput = prompt("Take Balance out of your Savings.")
        let numb = parseInt(userInput, 10)
         if(userInput){
             axios.post('/sub', {value: numb}).then(() => {
                 document.getElementsByClassName("saved").innerHTML = numb
             }).catch(() => {
                 console.log(console.error())
             })
         }
     }
})