const buttonSearch = document.querySelector("#homePage main a");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#modal .modalHeader a");
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("modalHidden");

})


closeModal.addEventListener("click", () => {
    modal.classList.add("modalHidden");
})