
    //edit màn hình 'Click to start'
    let screenBlock= document.getElementById('screen'); //khối chứa 
    let inScreen= document.getElementById('inScreen');  //dòng text 'Click to start'
    let imgBackground= document.getElementById('imgBackground') //ảnh nền 

    //Animation waiting Screen
    let waitingScreen= document.getElementById('waitingScreen') //khối div chứa full screen
    let innerWaitingScreen= document.getElementById('innerWaitingScreen') //ảnh Gif waiting
    let check2=0 //biến đê thoát hàm resetGif

    //do Gif hay bị lỗi nên phải tạo hàm để reset lại
    let resetGif=()=>{
        innerWaitingScreen.src='https://i.pinimg.com/originals/ef/ab/94/efab94beb0245948a128e4388f973988.gif' 
        if(check2===1){
            return
        }
        setTimeout(resetGif,2000)
    }
    resetGif()

    //hàm thoát waiting Screen
    let waitingAnimation=()=>{
        innerWaitingScreen.style.left='105%'
        setTimeout(()=>{
            check2=1
            screenBlock.style.right='0'
            screenBlock.innerHTML=`<img src="folderWibu/anime_Sword_Art_Online_anime_girls_sunset_Kirigaya_Kazuto_Yuuki_Asuna_Sun_clouds-243667.jpg" alt="" style="position: fixed; width: 100%; height: 100vh; object-fit: cover; object-position: 70% 40%;">
                    <div style="position: absolute; background-color: rgba(0, 0, 0, 0.4); width: 100%; height: 100vh; "></div>
            <h1 id="inScreen" style="position: absolute; "><b>&nbsp;&nbsp;Click <br>to start!</b></h1>` 
            
            setTimeout(()=>{
                radio.style.position='fixed';
                waitingScreen.innerHTML=''; waitingScreen.style.width='0px'; waitingScreen.style.height='0px';  
            },500)
            
        },6000)
        
    }
    waitingAnimation();


    //hàm auto chạy khi cửa sổ kéo xuống 200px, tác dụng: reset Video background
    window.onscroll=()=>{
        if(document.body.scrollTop===200 || document.documentElement.scrollTop===200){
            imgBackground.src= "gundam-witch-mercury.1920x1080.mp4"
        }
    }


    //event click
    screenBlock.addEventListener("click", function(){
        screenBlock.style.width= '0px'; screenBlock.style.height= '0px';
        screenBlock.innerHTML=''
        imgBackground.src= "gundam-witch-mercury.1920x1080.mp4"
    });
    

    
    //lấy data ảnh từ file Json 
    let picContainer= document.getElementById('picContainer')
    let showPic= async ()=>{
        let response= await fetch('file_list.json');
        let data= await response.json();
        return data;
    }

    let v; let a=0; let b=0; let check1=48 //đây là các biến lưu trữ của hàm changePic()
    let changePic=(x)=>{
        document.body.scrollTop=0; document.documentElement.scrollTop=0;
        picContainer.innerHTML=''; check1=48;
        showPic().then(data=>{
            b=x; a=x;
            for(let i=1;i<25;i++){
                a+=1; x+=1
                if(x<data.length){
                    picContainer.innerHTML= `${picContainer.innerHTML}<button class='picBlock'> <img class='pic' onmouseover='hoverPic()' src="./folderWibu/${data[x-1].name}" </button>` 
                
                }
                else{
                    check1=i; break;
                }
            }

            if(x<data.length){
                picContainer.innerHTML= `${picContainer.innerHTML} <h1 class='buttonNextprevious' style='float:right; padding:3%; cursor: pointer;' onclick='changePic(a)'>Next &raquo;</h1>`
            }

            if(x-check1>=0){
                if(check1===48){
                    picContainer.innerHTML= `${picContainer.innerHTML} <h1 class='buttonNextprevious'style='float:right; padding:3%; cursor: pointer;' onclick='changePic(a-check1)'>&laquo; Back</h1>`
                }
                else{
                    picContainer.innerHTML= `${picContainer.innerHTML} <h1 class='buttonNextprevious' style='float:right; padding:3%; cursor: pointer;' onclick='changePic(a-check1-24)'>&laquo; Back</h1>`
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
        for(let i=0;i<24;i++){
            if(i+b<a){
                pic[i].addEventListener('click', function(){
                    check=0; v=i+b
                    radioSetting()
                })  
            } 
            else break;
        }   
    }
 


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
    let musicTime= document.getElementById('musicTime'); //text chứa currentTime và endTime
    let timeContainer= document.getElementById('timeContainer') //khối chứa currentTime và endTime
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
                    takeMusic().then(myMusic=>{
                        if(n===myMusic.length){
                            x=1; 
                            alert('Đây đã là bài hát cuối cùng!')
                        }
                        nextSong(); 
                    })
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
    let homeButton= document.getElementById('homeButton')// nút về trang chủ
    
    //hàm check background Music
    let check=1; // biến check điều kiện
    let checkBackground=(x)=>{
        if(check===1){
            listener.innerHTML= `<img class='listenerImg' src="folderWibu/100988999_p0.png" alt="">
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
                searchingResultsBlock.innerHTML=``; exitButton.innerHTML='❎'; homeButton.innerHTML='';
                timeContainer.style.left='5%'
                if(autoRunRadio==="Off"){
                    autoRunRadio= 'On'
                    setTimeout(autoPlay,1000)
                }
                d=1; checkBackground(myMusic)
            })    
        }
        
        else{
            d=0; timeContainer.style.left='-50%';
            listener.style.width= '0'; listener.style.height= '0';
            contain2.style.width= '0'; contain2.style.height= '0';
            listener.innerHTML= ''; musicScreen.style.transition='all 0s'
            musicScreen.style.bottom='-100%'; exitButton.innerHTML=''
            searchingResultsBlock.innerHTML=``; homeButton.innerHTML=`<a href="index.html" >🏠︎</a>`
        }
    }

    radio.addEventListener('click', radioSetting);

    exitButton.addEventListener('click', function(){
        d=0; timeContainer.style.left='-50%';
        listener.style.width= '0'; listener.style.height= '0';
        contain2.style.width= '0'; contain2.style.height= '0';
        listener.innerHTML= ''; musicScreen.style.transition='all 0s'
        musicScreen.style.bottom='-100%'; exitButton.innerHTML=''
        searchingResultsBlock.innerHTML=``; homeButton.innerHTML=`<a href="index.html" >🏠︎</a>`
    })
    

    //hàm chuyển nhạc 
    let n=1;
    let nextSong=()=>{
        takeMusic().then(myMusic=>{
            if (n<=myMusic.length-1){
                music.pause(); x=0
                n+=1; checkTime=0;
                music= new Audio(`./music/${myMusic[n-1].name}.mp3`); 
                checkBackground(myMusic)
                playPause(); 
            }  
        })     
    };

    let previousSong=()=>{
        if (n>1){
            takeMusic().then(myMusic=>{
                music.pause(); x=0
                n-=1; checkTime=0;
                music= new Audio(`./music/${myMusic[n-1].name}.mp3`); 
                checkBackground(myMusic);
                playPause();
            })       
        }
    };


    //hàm của nút 'Search'
    let filterSearch= document.getElementById('filterSearch')
    let searchMusic= ()=>{
        if(finder.value!==''){
            filterSearch.innerText= (finder.value).toLowerCase();
            finder.value= '';
            takeMusic().then(myMusic=>{
                for(let i=0; i<myMusic.length; i++){
                    if (filterSearch.innerText===(`Song ${i+1}: ${myMusic[i].name}`).toLowerCase()){
                        music.pause(); n=i; 
                        searchingResultsBlock.innerHTML=``; radioSetting()
                        nextSong()
                        break;
                    }            
                } 
            })          
        }
              
    };
    search.addEventListener('click', searchMusic);


    //edit hàm filter kết quả nhạc
    let searchingResultsBlock= document.getElementById('searchingResultsBlock'); //khối chứa các kết quả tìm kiếm
    let searchingResults= document.getElementsByClassName('searchingResults'); //các kết quả tìm kiếm nhạc
    let arrIndex=[]; let arrSearch=[]; //đây là 2 arr chứa các kết quả tìm kiếm thỏa mãn
    
    //đây là 2 thẻ <p> giúp filter kết quả tìm kiếm
    let filter1= document.getElementById('filter1');
    let filter2= document.getElementById('filter2');
    
    finder.addEventListener('keyup', function(){
        arrIndex=[]; arrSearch=[];
        searchingResultsBlock.innerHTML=``;

        if(finder.value!==''){
            //Bước 1: filter kết quả tìm kiếm
            filter1.innerText= (finder.value).toLowerCase()
            
            //Bước 2: filter tên nhạc trong file Json
            takeMusic().then(myMusic=>{
                for(let i=0; i<myMusic.length; i++){
                    filter2.innerText= `Song ${i+1}: ${myMusic[i].name}`.toLowerCase()

                    //Bước 3: ktra điều kiện
                    if(filter2.innerText.includes(filter1.innerText)){
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
            })    
        }
                
    });

    //hàm click chuyển thanh kết quả nhạc
    let clickNext= (r)=>{
        if(arrIndex.length===5){
                arrIndex=[];
                searchingResultsBlock.innerHTML=``
                takeMusic().then(myMusic=>{
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
                })

        }       
    };

    let clickBack=(r)=>{
        if(r>4){
                arrIndex=[];
                searchingResultsBlock.innerHTML=``
                takeMusic().then(myMusic=>{
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
                })
        }   
    }

    //hàm addEvent onclick cho các SearchingResult 
    let newResult= ()=>{
        takeMusic().then(myMusic=>{
            for(let i=0; i<arrIndex.length; i++){
                searchingResults[i].addEventListener('click', function(){
                    finder.value= `Song ${arrIndex[i]+1}: ${myMusic[arrIndex[i]].name}`
                    searchingResultsBlock.innerHTML=``   
                })    
            }
        })
    }
           

    


    
    
    
