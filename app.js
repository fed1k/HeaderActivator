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

// Edit created h1 text
const edit = (createdHeader) => {
  const editInput = document.createElement('input');
  editInput.className = "editInput";
  createdHeader.replaceWith(editInput)
  editInput.defaultValue = createdHeader.textContent
  editInput.setSelectionRange(createdHeader.textContent.length, createdHeader.textContent.length)
  editInput.focus()
  editInput.addEventListener('keydown', (e)=>{
    if(e.key === "Enter" && e.target.value){
      editInput.replaceWith(createdHeader)
      createdHeader.textContent = e.target.value
    } 
      
    if(e.key === 'Escape') {
      editInput.replaceWith(createdHeader)
    }
  })
}

// Deactive header style
const changeBack = () => {
  if(input.value && input.placeholder === "Heading 1 (esc to cancel)") {
    const createdHeader = document.createElement('h2');
    createdHeader.style.color = "#212936FF"
    const editIcon = document.createElement('span');
    editIcon.className = "material-symbols-outlined";
    editIcon.textContent = "menu"
    createdHeader.textContent = input.value
    const headerContainer = document.createElement('div');
    headerContainer.append(editIcon, createdHeader);
    headerContainer.classList.add('edit')
    input.parentElement.insertBefore(headerContainer, input)
    editIcon.addEventListener('click', ()=>{
      edit(createdHeader)
    })
  }
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
    input.addEventListener('keydown', (event)=>{
      if(event.key === 'Escape') {
        popup.style.display = "none"
      }
    })
  }

  if(e.target.value.includes("/1")) {
    createH1Text()
    input.addEventListener('keypress', (event)=> {
      if(event.key === 'Enter' && input.value && input.placeholder === "Heading 1 (esc to cancel)" ) {
        changeBack()
        event.preventDefault()
        input.value = null
      }
    })

  }

  if(e.target.value === "") popup.style.display = "none"
});
