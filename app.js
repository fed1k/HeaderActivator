// References
const input = document.querySelector('textarea');
const popup = document.querySelector('.popup')
const main = document.querySelector('main')

// Open modal
const openPopup = ()=> {
  const selection = document.querySelectorAll('.selection')[0]
  popup.style.display = 'flex'
  selection.style.backgroundColor = "#F3F4F6FF"
}

// Deactive header style
const changeBack = () => {
  if(input.value && input.placeholder === "Heading 1 (esc to cancel)") {
    const createdHeader = document.createElement('h2');
    createdHeader.textContent = input.value
    input.parentElement.insertBefore(createdHeader, input)
  }
  input.value = ""
  input.placeholder = "Type / for blocks, @ to link docs or people";
  input.classList.remove('header-active')
}

// Activate Header style
const createH1Text = () => {
  popup.style.display = "none"
  input.value = null
  input.placeholder = "Heading 1 (esc to cancel)"
  input.classList.add('header-active')
  input.addEventListener('keydown', (e)=>{
    if(e.key === "Escape") {
      changeBack()
      const emptyH2 = document.querySelector('h2')
      main.removeChild(emptyH2)
    }
  })
}

// Initialiaze input event
input.addEventListener('input', (e)=>{
  if(e.target.value.includes("/")) {
    openPopup()
    input.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') {
        popup.style.display = "none"
      }
    })
  } 

  if(e.target.value.includes("/1")) {
    createH1Text()
    input.addEventListener('keypress', (e)=> {
      if(e.key === 'Enter') {
        changeBack()
      }
    })
  }

  if(e.target.value === "") popup.style.display = "none"
});