document.addEventListener("click", (e) => {

    //ADD BALANCE COMMAND
    if(e.target.classList.contains("add-me")){
       let userInput = prompt("Add Balance into your Savings.")
       let numb = parseInt(userInput, 10)
        if(userInput){
            axios.post('/add', {value: numb}).then(() => {
                document.getElementsByClassName("saved").innerHTML = numb
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