let images = [
  "http://s1.fotokto.ru/photo/full/43/434166.jpg",
  "https://drasler.ru/wp-content/uploads/2019/04/Обои-водопады-на-рабочий-стол-скачать-бесплатно-подборка-картинок-7.jpg",
  "https://drasler.ru/wp-content/uploads/2019/04/Обои-водопады-на-рабочий-стол-скачать-бесплатно-подборка-картинок-4.jpg"
];
let active = 0;
let slide = document.getElementById("gallery-photo");

function next(){
  active++;
  if(active >= images.length){
    active = 0;
  }
  slide.src = images[active];
}
function prev(){
  active--;
  if(active < 0){
    active = images.length-1;
  }
  slide.src = images[active];
}
