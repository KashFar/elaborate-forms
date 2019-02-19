const userCreateForm = document.getElementById('user-create-form')
const userCreateSubmitButton = userCreateForm.querySelector(
  "button[type='submit']"
)

userCreateSubmitButton.addEventListener('click', function submitHander(event) {
  event.preventDefault()

  let userInput = document.getElementsByTagName('input')
  let inputValues = [] // this is just ONE WAY to combine all the inputs.
  // [whole_name].value is for loop syntax, we use it.

  for (let currentInput of userInput) {
    console.log(currentInput)
    console.log(currentInput.value)

    inputValues.push(currentInput.value)
  }

  // it doesn't grab this information from the form in HTML
  // can make these whatever I want. You just made brand new variables.

  let radios = document.getElementsByName('comm')
  let commChoice

  for (let radio of radios){
    if(radio.checked) {
      commChoice = radio.value
    }
  }

let checkBoxes = document.getElementsByClassName('device-check')
let checkChoices = []

for (let checkBox of checkBoxes){
  if (checkBox.checked){
    checkChoices.push(checkBox.value)
  }
}

let selectOptions = document.getElementById('selection').select
let selectedIndex = selectOptions.selectedIndex
let selectedTitle
console.log(selectedIndex)

if (selectedIndex != -1){
  selectedTitle = selectOptions[selectedIndex].value
} else {
  selectedTitle = 'none'
 }

 let dateValue = document.getElementById('date')

const newUser = new User(inputValues, commChoice, checkChoices, selectedTitle, dateValue)

  // stack overflow: https://stackoverflow.com/questions/39565706/post-request-with-fetch-api
  fetch("/api/user/", {
    // this is in the readme, receive post received at the pathin instructions
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
    // we already stringified our json, otherwise we would do this with all our fields.
    //  body: JSON.stringify({
    //   name: myName,
    //   email: myEmail
    // etc etc
    // })
  }).then(response => {
    //do something awesome that makes the world a better place
    if (response.status === 201) {
      alert('Success!')
    } else if (response.status === 409) {
      alert('Username is Taken fool!')
    }
  }).then((data) =>{
    if(data){
      console.log(data)
    }
  })
  console.log('hi')
})

// MAKE NEW CLASSES IN A DIFFERENT FILE ON THE JOB

class User {
  constructor (inputValues, commChoice, checkChoices, selectedTitle, dateValue) {
    this.username = inputValues[0]
    this.email = inputValues[1]
    this.happyplace = inputValues[2]
    this.firstpet = inputValues[3]
    this.phone = inputValues[4]
    this.media = inputValues[5]
    this.comm = commChoice
    this.devices = checkChoices
    this.title = selectedTitle
    this.birthdate = dateValue
  }
}
