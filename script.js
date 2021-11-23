//DOM elements
const burgerCheckBoxLabel = document.querySelector('.nav-toggle-label')
const burgerCheckBox = document.querySelector('#nav-toggle')
const overlay = document.querySelector('.overlay')
const backThisProjectButton = document.querySelector('.backThisProjectButton')
let totalNumberOfBackers = document.querySelector('.totalNumberOfBackers')
const pledgeRadio = document.getElementsByName('pledgeRadio')
const bottomParts = document.querySelectorAll('.modalDonationBottomPart')

let currentBackedAmount = document.querySelector('.backedAmountNumber')

const numberLeft = document.querySelectorAll('.numberLeft')

// Reward modal elements
const modalDonationBlock = document.querySelector('.modalDonationBlock')
const selectRewardButton = document.querySelectorAll('.selectRewardButton')
const progressBar = document.querySelector('.innerBar')
const continueButton = document.querySelectorAll('.continueButton')

const modalThanksSupport = document.querySelector('.modalThanksForSupport')
const gotItButton = document.querySelector('.gotItButton')

// Other variables
let formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal'
})

let bambooStandLeft = 50
let blackEditionStandLeft = 20
let mahoganySpecialEditionLeft = 10

//Initialiation
currentBackedAmount.textContent = formatter.format(localStorage.getItem('moneyBacked'))
totalNumberOfBackers.textContent = localStorage.getItem('totalBackers')
progressBarInitialization()
updateStock()
closeAllBottomParts()

//Event listeners part
burgerCheckBoxLabel.addEventListener('click', () => {
    overlay.classList.toggle('off')
})

document.addEventListener('click', (element) => {
    if (element.target.classList.contains('exitCross') ||
        element.target.classList.contains('overlay')) 
    {
        removeAllOnOverlayClick()
    }
})

backThisProjectButton.addEventListener('click', () => {
    callDonationModal()
})

selectRewardButton.forEach(element => {
    if (!element.closest('.donationElement.outOfStock')) {
        element.addEventListener('click', () => {
            callDonationModal()
        })
    }
})

continueButton.forEach(element => {
    if (!element.closest('.modalDonationElement.outOfStock')){
        element.addEventListener('click', () => {
            let inputNumber = element.closest('.donationInputs').querySelector('.inputPledge')
            updateProgressBar(Number(inputNumber.value))
            removeAllOnOverlayClick()
            showModalThankYou()
            inputNumber.value = ''
            if (element.closest('.modalDonationElement').className == ('bambooStand modalDonationElement')) {
                bambooStandLeft = bambooStandLeft - 1
                localStorage.setItem ('bambooStandLeft', bambooStandLeft)
            } else if (element.closest('.modalDonationElement').className == ('blackEditionStand modalDonationElement')) {
                blackEditionStandLeft = blackEditionStandLeft - 1
                localStorage.setItem ('blackEditionStandLeft', blackEditionStandLeft)
            } else if (element.closest('.modalDonationElement').className == ('mahoganySpecialEdition modalDonationElement')) {
                mahoganySpecialEditionLeft = mahoganySpecialEditionLeft - 1
                localStorage.setItem ('mahoganySpecialEditionLeft', mahoganySpecialEditionLeft)
            }
            updateStock()
        })
    }
})

gotItButton.addEventListener('click', () => {
    removeAllOnOverlayClick()
})

pledgeRadio.forEach(element => {
    element.addEventListener('click', () => {
        closeAllBottomParts()
        element.closest('.modalDonationElement').querySelector('.modalDonationBottomPart').classList.remove('off')
    })
})

//Main functions
function callDonationModal() {
    overlay.classList.toggle('off')
    modalDonationBlock.classList.toggle('off')
}

function removeAllOnOverlayClick() {
    overlay.classList.add('off')
    burgerCheckBox.checked = false
    modalDonationBlock.classList.add('off')
    modalThanksSupport.classList.add('off')
}

function updateProgressBar(newSum) {
    let newBackedAmount = Number(currentBackedAmount.textContent) + newSum
    currentBackedAmount.textContent = formatter.format(newBackedAmount)
    let currentProgress = Math.round((newBackedAmount/100000)*100) > 100 ? 100 : Math.round((newBackedAmount/100000)*100)
    progressBar.style.width=`${currentProgress}%`
    let numberOfBackers = Number(totalNumberOfBackers.textContent) + 1
    totalNumberOfBackers.textContent = numberOfBackers
    localStorage.setItem('moneyBacked', newBackedAmount)
    localStorage.setItem('totalBackers', numberOfBackers)
}

function progressBarInitialization() {
    let currentProgress = Math.round((Number(currentBackedAmount.textContent)/100000)*100)
    progressBar.style.width=`${currentProgress}%`
}

function showModalThankYou() {
    modalThanksSupport.classList.remove('off')
    overlay.classList.remove('off')
}

function updateStock() {

    numberLeft.forEach(element =>{

        if(element.closest('.bambooStand')) {
            if (localStorage.getItem('bambooStandLeft') != null) {
                element.textContent = localStorage.getItem('bambooStandLeft')
                bambooStandLeft = localStorage.getItem('bambooStandLeft')
            } else {
                console.log('hi')
                element.textContent = bambooStandLeft
            }
        } else if (element.closest('.blackEditionStand')) {
            if (localStorage.getItem('blackEditionStandLeft') != null) {
                element.textContent = localStorage.getItem('blackEditionStandLeft')
                blackEditionStandLeft = localStorage.getItem('blackEditionStandLeft')
            } else {
                element.textContent = blackEditionStandLeft
            }     
        } else if (element.closest('.mahoganySpecialEdition')) {
            if (localStorage.getItem('mahoganySpecialEditionLeft') != null) {
                element.textContent = localStorage.getItem('mahoganySpecialEditionLeft')
                mahoganySpecialEditionLeft = localStorage.getItem('mahoganySpecialEditionLeft')
            } else {
                element.textContent = mahoganySpecialEditionLeft
            } 
        }

        if (element.textContent == 0) {
            if (element.closest('.donationElement') != null) {
                element.closest('.donationElement').classList.add('outOfStock')
                element.closest('.donationElement').querySelector('.selectRewardButton').textContent = 'Out of Stock'
                element.closest('.donationElement').querySelector('.selectRewardButton').classList.add('outOfStock')
            } else if (element.closest('.modalDonationElement') != null) {
                element.closest('.modalDonationElement').classList.add('outOfStock')
                element.closest('.modalDonationElement').querySelector('.continueButton').textContent = 'No stock'
                element.closest('.modalDonationElement').querySelector('.continueButton').classList.add('outOfStock')
            }
        } else {
            if (element.closest('.donationElement') != null){         
                element.closest('.donationElement').classList.remove('outOfStock')
                element.closest('.donationElement').querySelector('.selectRewardButton').textContent = 'Select Reward'
                element.closest('.donationElement').querySelector('.selectRewardButton').classList.remove('outOfStock')
            } else if (element.closest('.modalDonationElement') != null){
                element.closest('.modalDonationElement').classList.remove('outOfStock')
                element.closest('.modalDonationElement').querySelector('.continueButton').textContent = 'Continue'
                element.closest('.modalDonationElement').querySelector('.continueButton').classList.remove('outOfStock')
            }
        }
    })
}

function closeAllBottomParts() {
    bottomParts.forEach (element => {
        element.classList.add('off')
    })
}