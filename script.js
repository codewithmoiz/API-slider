let productsData;
var counter = 0;
var totalSlides = 30;

fetch('https://dummyjson.com/products/')
  .then(res => res.json())
  .then(json => {
    productsData = json;
    document.querySelector('body').style.background = `rgba(0,0,0,0.5) url(${productsData.products[counter].thumbnail})`;

    productsData.products.forEach(function(product,idx){
        document.querySelector('.container').innerHTML += `<img class="slide" src="${product.thumbnail}" alt="">`
    });

    var slides = document.querySelectorAll('.slide');
    slides.forEach((slide,index)=>{
        slide.style.left = `${index * 100}%`
    })

    document.querySelector('#next').addEventListener('click', function(){
        counter++;
        slides.forEach((slide)=>{
            slide.style.transform = `translateX(-${counter * 100}%)`;
        });
        document.querySelector('body').style.background = `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.9)), url(${productsData.products[counter].thumbnail})`;
        document.querySelector('#previous').disabled = false;
        if (counter === slides.length - 1) {
            document.querySelector('#next').disabled = true;
        }
    });

    document.querySelector('#previous').addEventListener('click', function(){
        if(counter > 0){
            counter--;
        }
        else{
            counter = 0;
            document.querySelector('#previous').disabled = true;
        }
        slides.forEach((slide)=>{
            slide.style.transform = `translateX(-${counter * 100}%)`;
        });
        document.querySelector('body').style.background = `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.9)), url(${productsData.products[counter].thumbnail})`;
        if (counter < slides.length - 1) {
            document.querySelector('#next').disabled = false;
        }
    });
    document.querySelector('#previous').disabled = true;
  })
  .catch(err => {
    console.error('Error fetching data:', err);
  });