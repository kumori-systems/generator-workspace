function sendForm() {
    let output = document.getElementById('output')
    let formData = new FormData(document.getElementById('uploadForm'))
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'image', true)
    xhr.onload = () => {
        output.innerHTML = xhr.responseText
    }
    xhr.send(formData)
}

function setLogo() {
    let output = document.getElementById('output')
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'image?filename=kumori_logo.png', true)
    xhr.onload = () => {
        output.innerHTML = xhr.responseText
    }
    xhr.send()
}

window.addEventListener("load", function() {
    let form = document.getElementById('uploadForm')
    form.addEventListener('submit', function(event) {
        event.preventDefault()
        sendForm()
    })
    setLogo()
})