const colorInputEl = document.querySelector('#color-input')
const selectModeEl = document.querySelector('#mode-select')
const submitBtn = document.querySelector('.submit-btn')
const colorColumns = document.querySelectorAll('.color-details')

const baseURL = 'https://www.thecolorapi.com/scheme'

submitBtn.addEventListener('click', function(event){

    let colorSchemaURL = `${baseURL}?hex=${colorInputEl.value.slice(1)}&mode=${selectModeEl.value}&count=4`

    fetch(colorSchemaURL)
        .then(res => res.json())
        .then(function(data){
            renderColors(data.colors)
        })

})

function renderColors(colors){

    colors.forEach((color, index) => {

        const column = colorColumns[index]

        column.addEventListener('click', () => {
           navigator.clipboard.writeText(color.hex.value)
        })

        column.querySelector('.color-shade').style.backgroundColor = color.hex.value
        column.querySelector('.color-hex-code').textContent = color.hex.value
    })
    
}

colorColumns.forEach((column) => {

    column.addEventListener('click', () => {

        const hexCode = column.querySelector('.color-hex-code').textContent
        navigator.clipboard.writeText(hexCode)
        
        const hexEl = column.querySelector('.color-hex-code')
        const original = hexEl.textContent
        hexEl.textContent = "Copied!"

        setTimeout(() => {
            hexEl.textContent = original
        }, 2000)
    })

})