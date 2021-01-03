/** 
  * This class is used to interact with the index.html page
  * 
  * Author: Adam Ely
  * Date: 01/03/2021
*/
//Creating constant variables to get certain elements from the page
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')

//Adding an event listener to open the navigation menu
navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

//For each link, that you click on, close the menu.
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})
