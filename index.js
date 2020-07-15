const baseUrl = 'https://www.thecolorapi.com'

const randomColor = Math.floor(Math.random()*16777215).toString(16)
const colorPicker = document.getElementById('color-picker')
colorPicker.value = `#${randomColor}`

const randomNumber = Math.floor(Math.random() * 8)
const colorSchemeSelect = document.getElementById('color-scheme')
colorSchemeSelect.selectedIndex = randomNumber

const getColorsButton = document.querySelector('button')
const colorResultDiv = document.getElementById('color-result')


const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text)
  alert(`Copied ${text}`)
}

const getColor = async () => {
  const color = colorPicker.value.slice(1)
  const scheme = colorSchemeSelect.value
  const amount = 5
  
  const url = `${baseUrl}/scheme?hex=${color}&mode=${scheme}&count=${amount}`
  const res = await fetch(url)
  const data = await res.json()
  const colors = data.colors.map(color => color.hex.value)

  const divs = colors.map(color => {
    const containerDiv = document.createElement('div')
    containerDiv.classList.add('color-container')
    const colorDiv = document.createElement('div')
    const textDiv = document.createElement('div')
    textDiv.classList.add('color-text')
    textDiv.innerText = color
    containerDiv.appendChild(colorDiv)
    containerDiv.appendChild(textDiv)
    colorResultDiv.appendChild(containerDiv)
    containerDiv.addEventListener('click', () => copyToClipboard(color))
    colorDiv.style.backgroundColor = color
    colorDiv.classList.add('color-box')
    return containerDiv
  })

  colorResultDiv.replaceChildren(...divs)
}

getColor()
getColorsButton.addEventListener('click', getColor)
