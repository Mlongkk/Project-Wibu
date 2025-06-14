const searchInput = document.getElementById("searchInput");
const fruitList = document.getElementById("fruitList");
const fruits = fruitList.getElementsByTagName("li");
const noResult = document.getElementById("noResult");

const filerBtns= document.querySelectorAll('.conten-text, .comingSoon-text');
const productCards=document.querySelectorAll('.conten-item, .comingSoon-list');

const images=JSON.parse(localStorage.getItem('images'))

const overlay = document.getElementById('overlay')
overlay.addEventListener('click', closeViewDetail);


productCards.forEach(p=>{
  p.addEventListener('click',(e)=>{
    const target= e.target;
    if(target.classList.contains('down-item')){
      p.classList.add('active')
      overlay.style.display='block';
    }else if(target.classList.contains('see')){
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
  productCards.forEach(p => p.classList.remove('active'));
  overlay.style.display='none'
}


searchInput.addEventListener("keyup", function () {
  const filter = searchInput.value.toLowerCase().trim();
  let count = 0;

  // Nếu người dùng chưa gõ gì → ẩn danh sách và thông báo
  if (filter === "") {
    fruitList.style.display = "none";
    noResult.style.display = "none";
    return;
  }

  // Người dùng đã gõ → hiện danh sách
  fruitList.style.display = "block";

  for (let i = 0; i < fruits.length; i++) {
    const text = fruits[i].textContent.toLowerCase();

    if (text.includes(filter)) {
      fruits[i].style.display = "block";
      count++;
    } else {
      fruits[i].style.display = "none";
    }
  }

  // Hiện hoặc ẩn dòng "Không tìm thấy kết quả"
  noResult.style.display = count === 0 ? "block" : "none";
});
