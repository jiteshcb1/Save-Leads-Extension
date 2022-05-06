let myLeads = []
let date = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const dateFromLocalStorage = JSON.parse( localStorage.getItem("date"))

if(leadsFromLocalStorage && dateFromLocalStorage){
    date = dateFromLocalStorage
    myLeads = leadsFromLocalStorage
    render(myLeads, date)
}

tabBtn.addEventListener("click", function(){
    date.push(new Date().toLocaleString())
    localStorage.setItem("date", JSON.stringify(date))
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads, date)
    })
})

function render(leads, date){
    let listItems = ""
    for(let i = leads.length - 1; i >= 0; i--){
        listItems += `
            <li>
                <div id = "flex">
                    <span>
                        <span id = "clr">${(i+1) + ". "}</span>
                        <a href='${leads[i]}' target='_blank'>
                            ${leads[i]}
                        </a>
                    </span>
                    <span id = "clr">
                        ${date[i]} 
                    </span>

                </div>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}



deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    date = []
    render(myLeads, date)
})

inputBtn.addEventListener("click", function() {
    date.push(new Date().toLocaleString())
    localStorage.setItem("date", JSON.stringify(date))
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads, date)
})
