
    //lấy data ảnh từ file Json 
    let picContainer= document.getElementById('picContainer')
    let showPic= async ()=>{
        let response= await fetch('file_list.json');
        let data= await response.json();
        return data;
    }

    let v; let a=0; let b=0; let check1=60 //đây là các biến lưu trữ của hàm changePic()
    let changePic=(x)=>{
        document.body.scrollTop=0; document.documentElement.scrollTop=0;
        picContainer.innerHTML=''; check1=60;
        showPic().then(data=>{
            b=x; a=x;
            for(let i=1;i<31;i++){
                a+=1; x+=1
                if(x<data.length){
                    picContainer.innerHTML= `${picContainer.innerHTML}<button class='picBlock'> <img class='pic' onmouseover='hoverPic()' src="./folderWibu/${data[x-1].name}" </button>` 
                
                }
                else{
                    check1=i; break;
                }
            }

            if(x<data.length){
                picContainer.innerHTML= `${picContainer.innerHTML} <h1 style='float:right; padding:3%; cursor: pointer' onclick='changePic(a)'>➡️</h1>`
            }

            if(x-check1>=0){
                if(check1===60){
                    picContainer.innerHTML= `${picContainer.innerHTML} <h1 style='float:right; padding:3%; cursor: pointer' onclick='changePic(a-check1)'>⬅️</h1>`
                }
                else{
                    picContainer.innerHTML= `${picContainer.innerHTML} <h1 style='float:right; padding:3%; cursor: pointer' onclick='changePic(a-check1-30)'>⬅️</h1>`
                }
                
            }
        })
    }
    
    //kích hoạt hàm ngay từ khi load trang
    changePic(a)
    

    //khối chứa ảnh và hàm click thay ảnh trong Music
    let pic= document.getElementsByClassName('pic');
    let picBlock= document.getElementsByClassName('picBlock')
    let hoverPic=()=>{
        for(let i=0;i<30;i++){
            if(i+b<a){
                pic[i].addEventListener('click', function(){
                    check=0; v=i+b
                    radioSetting()
                })  
            } 
            else break;
        }   
    }
 

    //list music
    let myMusic=[      
    {
        name:"Lemon"
    },
    {
        name:"Rokudenashi - One Voice"
    },
    {
        name:"Akie秋絵天ノ弱 -うぃんぐPiano Ver.- 歌ってみたオリジナルPV"
    },
    {
        name:"洛天依 嘘つきは恋のはじまり オリジナルMV"
    },
    {
        name:"Best friend"
    },
    {
        name:"Kakyoin's Theme"
    },
    {
        name:"Hotaru - Fujita Maiko"
    },
    {
        name:"Yume To Hazakura"
    },
    {
        name:"Omae Wa Mou"
    },
    {
        name:"Karakai Jouzu no Takagi-san OP 2"
    },
    {
        name:"Orange"
    },
    {
        name:"Silhouette"
    },
    {
        name:"Summertime"
    },
    {
        name:"Homura (炎)"
    },
    {
        name:"Peace Sign"
    },
    {
        name:"Fireworks"
    },
    {
        name:"可愛くてごめん (feat. かぴ)"
    },
    {
        name:"Yunomi - ジェリーフィッシュ (feat. ローラーガール)"
    },
    {
        name:"Yoru ni Kakeru夜に駆けるYOASOBI"
    },
    {
        name:"Bluebird (ブルーバード) - Ikimono Gakari"
    },
    {
        name:"Acoustic - Unravel"
    },
    {
        name:'Kanojo Wa Tabi Ni Deru-彼女は旅に出る - Sana-鎖那'
    }
]

    //lấy data Music từ file Json 
    let takeMusic= async()=>{
        let response= await fetch('myMusic.json')
        let data= await response.json()
        return data
    }
    

    //music
    let music= new Audio('./music/Lemon.mp3'); //audio khởi tạo
    let checkTime=0; //thời gian nhạc hiện tại
    let autoRunRadio='Off'; //biến check điều kiện
    let musicTime= document.getElementById('musicTime'); //khối chứa currentTime và endTime
    let x=0; //biến check điều kiện

    //hàm autoplay nhạc 
    let autoPlay=()=>{ 
            checkTime= parseInt(checkTime)
            musicTime.innerHTML= `Current time: ${checkTime}s <br>
                                End time: ${parseInt(music.duration)-5}s`;
            if(!music.paused){
                if(checkTime<parseInt(music.duration)-5){
                    checkTime+=1
                }
                else if(checkTime===parseInt(music.duration)-5){
                    checkTime+=1
                    if(n===myMusic.length){
                        x=1; 
                        alert('Đây đã là bài hát cuối cùng!')
                    }
                    nextSong();
                }  
            }
            setTimeout(autoPlay,1000);   
    };
    
    //hàm playPause music
    let playPause= ()=>{
        if(x===0){
            if(music.paused){
                music.play();
                musicButtonplay.innerHTML='<p class="musicButton">⏸️</p>'
            }
            else {
                music.pause();
                musicButtonplay.innerHTML='<p class="musicButton">▶️</p>'
            }  
        }   
    }



    //create event cho radio (gif)
    let radio= document.getElementById('gif');  //ảnh gif
    let listener= document.getElementById('listener'); //khối chứa ảnh nền của Music
    let contain2= document.getElementById('contain2') //khối div chứa các phần liên quan đến Music
    let finder= document.getElementById('finder') // thanh tìm kiếm nhạc
    let label = document.getElementById('label') //dòng text 'Tìm kiếm'
    let search= document.getElementById('search') //nút search
    let musicScreen= document.getElementById('musicScreen') //khối chứa các button playPause
    let exitButton= document.getElementById('exitButton') //nút thoát background nhạc
    let homeButton= document.getElementById('homeButton')
    
    //hàm check background Music
    let check=1; // biến check điều kiện
    let checkBackground=(x)=>{
        if(check===1){
            listener.innerHTML= `<img class='listenerImg' src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3fdfd8c5-0b8c-45a7-a8aa-ebc7752ae9b8/ddyndrq-1891f96b-4757-4cb8-b9c9-2ce9c044e244.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNmZGZkOGM1LTBiOGMtNDVhNy1hOGFhLWViYzc3NTJhZTliOFwvZGR5bmRycS0xODkxZjk2Yi00NzU3LTRjYjgtYjljOS0yY2U5YzA0NGUyNDQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Cf8VyFx_wqjsQvoLc75aUc22fwzJqAq59voj4g6zVCo" alt="">
        <h1 style='position:absolute; bottom:15%'> <marquee behavior="sroll" direction="left"> Song ${n}: ${x[n-1].name} </marquee></h1>` 
        }
        else if(check===0){
            showPic().then(data=>{
                listener.innerHTML= `<img id='backgroundMusic' src="folderWibu/${data[v].name}" alt="">
            <h1 style='position:absolute; bottom:15%'> <marquee behavior="sroll" direction="left"> Song ${n}: ${x[n-1].name} </marquee></h1>` 
            })   
        }
    }


    //hàm click radio
    let d=0; //biến điều kiện
    let radioSetting=()=>{
        if(d===0){
            takeMusic().then(myMusic=>{
                listener.style.height='100%'; listener.style.width='100%'
                contain2.style.width= '100%'; contain2.style.height= '100%';
                musicScreen.style.transition='all 1.5s'; musicScreen.style.bottom='2%'; 
                searchingResultsBlock.innerHTML=``; exitButton.innerHTML='❎'; homeButton.innerHTML=''
                if(autoRunRadio==="Off"){
                    autoRunRadio= 'On'
                    setTimeout(autoPlay,1000)
                }
                d=1; checkBackground(myMusic)
            })    
        }
        
        else{
            d=0;
            listener.style.width= '0'; listener.style.height= '0';
            contain2.style.width= '0'; contain2.style.height= '0';
            listener.innerHTML= ''; musicScreen.style.transition='all 0s'
            musicScreen.style.bottom='-50%'; exitButton.innerHTML=''
            searchingResultsBlock.innerHTML=``; homeButton.innerHTML='🏠︎'
        }
    }

    radio.addEventListener('click', radioSetting);
    exitButton.addEventListener('click', function(){
        listener.style.width= '0'; listener.style.height= '0';
        contain2.style.width= '0'; contain2.style.height= '0';
        listener.innerHTML= ''; musicScreen.style.transition='all 0s'
        musicScreen.style.bottom='-50%'; exitButton.innerHTML=''
        searchingResultsBlock.innerHTML=``; homeButton.innerHTML='🏠︎'
    })
    

    //hàm chuyển nhạc 
    let n=1;
    let nextSong=()=>{
           if (n<=myMusic.length-1){
                music.pause(); x=0
                n+=1; checkTime=0;
                music= new Audio(`./music/${myMusic[n-1].name}.mp3`); 
                checkBackground(myMusic)
                playPause(); 
            } 
        
    };

    let previousSong=()=>{
        if (n>1){
                music.pause(); x=0
                n-=1; checkTime=0;
                music= new Audio(`./music/${myMusic[n-1].name}.mp3`); 
                checkBackground(myMusic);
                playPause();
        }
    };


    //hàm của nút 'Search'
    let musicName=''; 
    let searchMusic= ()=>{
        if(finder.value!==''){
                musicName= finder.value;
                finder.value= '';
                for(let i=0; i<myMusic.length; i++){
                    if (musicName===`Song ${i+1}: ${myMusic[i].name}`){
                        music.pause(); 
                        n=i; 
                        nextSong()
                        break;
                    }            
                }     
        }
              
    };
    search.addEventListener('click', searchMusic);


    //edit hàm filter kết quả nhạc
    let searchingResultsBlock= document.getElementById('searchingResultsBlock'); //khối chứa các kết quả tìm kiếm
    let searchingResults= document.getElementsByClassName('searchingResults'); //các kết quả tìm kiếm nhạc
    let editName=''; let y=''; //đây là 2 biến dùng để filter tên nhạc
    let arrIndex=[]; let arrSearch=[]; //đây là 2 arr chứa các kết quả tìm kiếm thỏa mãn

    finder.addEventListener('keyup', function(){
        arrIndex=[]; arrSearch=[]; y=''
        searchingResultsBlock.innerHTML=``
        if(finder.value!==''){
            musicName= (finder.value).toLowerCase().trim().split(' ')

            //Bước 1: filter kết quả tìm kiếm
            for(let i=0; i<musicName.length; i++){
                y= `${y}${musicName[i]}`
            }
            musicName= y; 

            for(let i=0; i<myMusic.length; i++){
                //Bước 2: filter tên nhạc trong file Json
                editName=''; y= `Song ${i+1}: ${myMusic[i].name}`.toLowerCase().trim().split(' ')
                for(let z=0;z<y.length;z++){
                    editName=`${editName}${y[z]}`
                }

                //Bước 3: ktra điều kiện
                if(editName.includes(musicName)){
                    arrSearch.push(i); //arr chứa toàn bộ kết quả tìm kiếm thỏa mãn
                    if(arrIndex.length<5){
                        arrIndex.push(i); //arr hiển thị, chứa max là 5 kết quả
                        searchingResultsBlock.innerHTML= `${searchingResultsBlock.innerHTML}<div class="searchingResults" onmouseover="newResult()" style="padding:5%"> Song ${i+1}: ${myMusic[i].name}</div>`
                    }            
                }
            }
            if(arrIndex.length===5){
                searchingResultsBlock.innerHTML= `${searchingResultsBlock.innerHTML} <p style='float:right; padding-right:3%; cursor: pointer' onclick='clickNext(arrIndex[arrIndex.length-1])'>➡️</p>`
            } 
        }
                
    });

    //hàm click chuyển thanh kết quả nhạc
    let clickNext= (r)=>{
        if(arrIndex.length===5){
                arrIndex=[];
                searchingResultsBlock.innerHTML=``
                for(let i=1; i<6; i++){
                    if(arrSearch.indexOf(r)+i< arrSearch.length && arrIndex.length<5){
                        arrIndex.push(arrSearch[arrSearch.indexOf(r)+i]); 
                        searchingResultsBlock.innerHTML= `${searchingResultsBlock.innerHTML}<div class="searchingResults" onmouseover="newResult()" style="padding:5%"> Song ${arrSearch[arrSearch.indexOf(r)+i]+1}: ${myMusic[arrSearch[arrSearch.indexOf(r)+i]].name}</div>`    
                    }   
                }
                searchingResultsBlock.innerHTML= `${searchingResultsBlock.innerHTML}<p style='float:left; padding-left:3%; cursor:pointer' onclick='clickBack(arrIndex[0])'>⬅️</p>`
                if(arrIndex.length===5 && arrIndex[arrIndex.length-1]<arrSearch.length-1){
                    searchingResultsBlock.innerHTML= `${searchingResultsBlock.innerHTML} <p style='float:right; padding-right:3%; cursor: pointer' onclick='clickNext(arrIndex[arrIndex.length-1])'>➡️</p>`
                }    
        }       
    };

    let clickBack=(r)=>{
        if(r>4){
                arrIndex=[];
                searchingResultsBlock.innerHTML=``
                for(let i=-5; i<0; i++){
                    if(arrSearch.indexOf(r)+i< arrSearch.length && arrIndex.length<5){
                        arrIndex.push(arrSearch[arrSearch.indexOf(r)+i]); 
                        searchingResultsBlock.innerHTML= `${searchingResultsBlock.innerHTML}<div class="searchingResults" onmouseover="newResult()" style="padding:5%">Song ${arrSearch[arrSearch.indexOf(r)+i]+1}: ${myMusic[arrSearch[arrSearch.indexOf(r)+i]].name}</div>`
                    }        
                }
                searchingResultsBlock.innerHTML= `${searchingResultsBlock.innerHTML} <p style='float:right; padding-right:3%; cursor: pointer' onclick='clickNext(arrIndex[arrIndex.length-1])'>➡️</p>`    
                if(arrIndex[0]>4){
                    searchingResultsBlock.innerHTML= `${searchingResultsBlock.innerHTML}<p style='float:left; padding-left:3%; cursor:pointer' onclick='clickBack(arrIndex[0])'>⬅️</p>`
                } 
        }   
    }

    //hàm addEvent onclick cho các SearchingResult 
    let newResult= ()=>{
            for(let i=0; i<arrIndex.length; i++){
                searchingResults[i].addEventListener('click', function(){
                    finder.value= `Song ${arrIndex[i]+1}: ${myMusic[arrIndex[i]].name}`
                    searchingResultsBlock.innerHTML=``   
                })    
            }
    }
           

    


    
    
    
