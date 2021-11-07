import './sass/main.scss';
import ApiService from './js/fetchService';
import ImagesList from './templates/templ.hbs';
import * as basicLightbox from 'basiclightbox';
import Notiflix from 'notiflix';
const apiService = new ApiService()
const refs = {
    ul: document.querySelector('.gallery'),
    input: document.querySelector('.search-inp'),
    form: document.querySelector('.search-form'),
    loadButton: document.getElementById('my-element-selector'),
    submitBtn: document.getElementById('btn-sub')
}

refs.loadButton.addEventListener('click', onloadMoreImg)
refs.submitBtn.addEventListener('click', onSearchImages)
refs.input.addEventListener('keydown', onSearchByEnter)
refs.ul.addEventListener('click', onImgClick);

function onImgClick(e) {
  e.preventDefault() 

  const isGalleryItemEl = e.target.classList.contains('gallery__image');
  if (!isGalleryItemEl) {
    return;
  }
    const swatchedEl =  e.target.getAttribute('src');
  const instance = basicLightbox.create(`
    <img src="${swatchedEl}">
`)
  
    instance.show()
};

function onSearchImages(e) {
  e.preventDefault()
  
  apiService.query = refs.form.elements.query.value;
  if (apiService.query === '') { return Notiflix.Notify.warning('Incorrect query. Write the correct value!') }
  if( apiService.query.length > 10) {return Notiflix.Notify.warning('Too many matches found. Please enter a more specific query')}
  apiService.fetchList().then(data => {
    
    if(data.total > 0) addClassName()
    renderListImages(data)
  })
  
  apiService.resetPage()
 
  clearForm()
 

}

function onSearchByEnter(e) {
  if (e.keyCode == 13) {
     onSearchImages(e)
    }
}
function onloadMoreImg() {
    apiService.fetchList().then(renderListImages)
}


function renderListImages(images) {
  refs.ul.insertAdjacentHTML('beforeend',ImagesList(images))
}

function clearForm() {
    refs.ul.innerHTML = ''
}
function addClassName() {
    refs.loadButton.classList.add("btn-show") 
}
