console.log('CS JS Loaded')

// Select the form element

const addressForm = document.querySelector('form');
const enteredAddress = document.querySelector('input');
const success = document.querySelector('#success');
const errorResult = document.querySelector('#error');

addressForm.addEventListener('submit', (e) => {
    const location = enteredAddress.value;
    e.preventDefault();
    success.innerHTML = '';
    errorResult.innerHTML = '';
    //console.log(location);
    
        const url = `http://localhost:3000/weather?address=${location}`
        fetch(url).then((response) => {
        response.json().then((data) => {
                if(data.error) {
                    errorResult.innerHTML = `
                    <p class="alert alert-danger" role="alert"><strong>Error in forecast: ${data.error}</strong></p>
                    `
                } else {
                    
                    success.innerHTML = `
                    <p><strong>Weather forecast for : ${data.location}</strong></p>
                    <p>${data.forecast}</p>`
                    console.log(data.location);
                }
            })
        })
    
})
