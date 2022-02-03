// Project 6

console.log("This file has been linked");


// Utility Functions
// 1. Functioon for converting string to DOM element
function stringToDOMElement(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Initialize Added param count
let addedParamCount = 1; 

// Hiding Parameters Box Initially
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

// If user clicks on params box hide JSON box
let paramRadio = document.getElementById('paramRadio');
paramRadio.addEventListener('click', ()=>{
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'block';
})

// If user clicks on json box hide params box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', ()=>{
    document.getElementById('parameterBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

// When user clicks on + button 
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=>{
    let params = document.getElementById('params');
    let string = `<div class="row g-3 my-1">
                    <label for="inputUrl" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 1}</label>
                    <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addedParamCount + 1}" placeholder="Enter Parameter ${addedParamCount + 1}">
                    </div>
                    <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${addedParamCount + 1}" placeholder="Enter Parameter ${addedParamCount + 1} value">
                    </div>
                    <button class="btn btn-info deleteParam" style="width: 45px;">-</button>
                </div>`;
    let paramElement = stringToDOMElement(string);
    params.appendChild(paramElement);

    //Add an event listner to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        item.addEventListener('click', (e)=>{
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
    // params.innerHTML += string;
})


// When user clicks submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    // Show user please wait in response box to request patience from the user 
    // document.getElementById('responseJsonText').value = 'Please wait... Fetching Response...';
    document.getElementById('responsePrism').innerHTML = 'Please wait... Fetching Response...';


    // Fetch all the values user has entered
    let url = document.getElementById('url').value;
    let contentType = document.querySelector("input[name='content']:checked").value;
    let requestType = document.querySelector("input[name='request']:checked").value;


    

    // If user has checked params option instead of json collect all the parameters in an object
    if(contentType == 'params'){
        data = {};
        for(i=0; i<addedParamCount + 1; i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
                let key = document.getElementById('parameterKey' + (i+1)).value;
                let value = document.getElementById('parameterValue' + (i+1)).value;

                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }

    // Loging data to console for debugging
    console.log(url, contentType, requestType, data);    

    // If the request type is GET invoke a fetch api request to create a GET request
    if(requestType=='GET'){
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }
    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then(response => response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        })
    }
})
