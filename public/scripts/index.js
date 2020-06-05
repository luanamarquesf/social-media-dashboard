const buttonSearch = document.querySelector("#page-home-dark a")
const modal = document.querySelector("#modal")
const closemodal = document.querySelector("#modal header a")
const inputmodal = document.querySelectorAll("#modal input")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

closemodal.addEventListener("click", () =>{
    modal.classList.add("hide")
})

