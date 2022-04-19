let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

//get the leads from the localStorage - PS: JSON.parse()
//Store it in a variable, leadsFromLocalStorage
//Log out the variable

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

//check if leadsfromLocalStorage is truthy
//Is So, set myLeads to its value and call renderLeads()

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// listen for clicks on tabBtn. grab the tab URL

tabBtn.addEventListener("click", function(){
    // Grab the URL of the current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads){
    let listItems = ""
    for(let i = leads.length - 1; i >= 0; i--){
        // listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a href='${leads[i]}' target='_blank'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}


//listen for double clicks on the delete button 
//when clicked, clear localStorage, myLeads, and 

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

})



// let date = d.getHours() + ":" + d.getMinutes() + " " + d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()

// for putting two different text on opposite ends
//https://stackoverflow.com/questions/40091515/how-to-have-two-items-on-opposite-sides-on-the-same-line