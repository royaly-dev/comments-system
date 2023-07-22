const w = document.querySelector('.comments-container')
const submitComments = document.querySelector('form')
const submitButton = document.querySelector('.submit-button')
const nameInput = document.querySelector('#value')
const textInput = document.querySelector('#value2')

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            getComments().then((e) => {
                if (e.ok) {
                    entry.target.remove()
                }
                observer.unobserve(entry.target)
            })
        }
        console.log(entry.isIntersecting)
    }
})

async function getComments() {
    const result = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
    const jsonR = await result.json()
    for(const com in jsonR) {
        const comments = document.createElement('div')
        comments.className = 'comments-section'
        comments.innerHTML = `
        <h3 class="username">${jsonR[com].name}</h3>
        <h5 class="comments">${jsonR[com].body}</h5>
        `
        w.append(comments)
    }
    const loader = document.createElement('div')
    loader.innerHTML = `
    <div class="loader">
        <img class="loader" src="loader.gif" alt="">
    </div>
    `
    w.append(loader)
    observer.observe(loader)
    return result
}

submitComments.addEventListener('submit', (e) => {
    e.preventDefault()
    submitButton.setAttribute('disabled', '')
    createNewComments()
})

async function createNewComments() {
    const data = {
        name: nameInput.value,
        text: textInput.value
    }
    try {
        const commentsResult = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    console.log(JSON.stringify(data))
    const resultC = await commentsResult.json()
    console.log(resultC)

    const createNewComments = document.createElement('div')
    createNewComments.className = 'comments-section'
    createNewComments.innerHTML = `
    <h3 class="username">${resultC.name}</h3>
    <h5 class="comments">${resultC.text}</h5>
    `
    w.prepend(createNewComments)
    submitButton.removeAttribute('disabled', '')
    } catch (e) {
        console.warn(e)
    }   
}
    



getComments()