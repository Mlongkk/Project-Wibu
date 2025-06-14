const filerBtns= document.querySelectorAll('.conten-text');
const productCards=document.querySelectorAll('.item-list');

const overlay=document.getElementById('overlay');
overlay.addEventListener('click', closeViewDetail);

let images=JSON.parse(localStorage.getItem('images')) || [];

productCards.forEach(p => {
    p.addEventListener('click',(e) => {
        const target=e.target;
        if(target.classList.contains('down-item')){
            p.classList.add('active')
            overlay.style.display='block'
        }
        if(target.classList.contains('shopping')){
            const imgSrc=p.querySelector('img').src;
            const name=p.querySelector('.name').innerText;
            const newImages={
                imgSrc: imgSrc,
                name: name,
                quantity: 1
            }
            const existingItem =images.find(
                item => item.name === newImages.name
            );
            if(existingItem)
                existingItem.quantity++
            else
                images.unshift(newImages);
            localStorage.setItem('images',JSON.stringify(images));
            closeViewDetail()
            alert(`Đã thêm ${newImages.name} vào thư viện `)
        }
    })
})


function closeViewDetail(){
    productCards.forEach(p=>p.classList.remove('active'))
    overlay.style.display='none'
}

filerBtns.forEach(bth =>{
    bth.addEventListener('click',()=>{
        const bthType=bth.getAttribute('type')
        fillter(bthType);
    })
})
function fillter(type){
    productCards.forEach(p=>{
        if(type === 'all'){
            p.style.display='flex';
            return;
        }
        const productType=p.getAttribute('type');
        if(productType ===type){
            p.style.display='flex';
        }
        else{
            p.style.display='none'
        }
    })
}


   