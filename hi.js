
    //Animation waiting Screen
    let waitingScreen= document.getElementById('waitingScreen') //khối div chứa full screen
    let innerWaitingScreen= document.getElementById('innerWaitingScreen') //ảnh Gif waiting
    let imgBackground= document.getElementById('imgBackground') //video nền 
    let check2=0 //biến để thoát hàm resetGif


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

        setTimeout(()=>{
            changePic(a) //kích hoạt changePic ngay sau khi load trang    
        },7000)

        setTimeout(()=>{
           imgBackground.src= "gundam-witch-mercury.1920x1080.mp4"; 
        },10000)

        setTimeout(()=>{
            check2=1; 
            waitingScreen.innerHTML=''; waitingScreen.style.width='0px'; waitingScreen.style.height='0px'; 
        },3000)
        
    }
    waitingAnimation();


    //hàm auto chạy khi cửa sổ kéo xuống 200px, tác dụng: reset Video background
    // window.onscroll=()=>{
    //     if(document.body.scrollTop===200 || document.documentElement.scrollTop===200){
    //         imgBackground.src= "gundam-witch-mercury.1920x1080.mp4"
    //     }
    // }
    

    //hàm lấy ảnh ngẫu nhiên
    let q=0; let myRandomPic=[];

    let randomPic= (x,y)=>{
        if(x.length===0){
            for(let i=0;i<y.length;i++){
                q=Math.floor(Math.random() * y.length);
                if(q!==i){
                    [y[i],y[q]]=[y[q],y[i]]; //hoán vị
                    if(!x.includes(y[i])){
                        x.push(y[i])
                    }
                    
                    else x.push(y[q]); 
                }

                else if(q===i){
                    q=0; [y[i],y[q]]=[y[q],y[i]]; //hoán vị;
                    if(!x.includes(y[i])){
                        x.push(y[i])
                    }
                    
                    else x.push(y[q]); 
                }
            } 
        };

        return x
    }
    
    //lấy data ảnh từ file Json 
    let picContainer= document.getElementById('picContainer')
    let showPic= async ()=>{
        let response= await fetch('file_list.json');
        let data= await response.json();
        return randomPic(myRandomPic,data);
    }


    let v; let a=0; let b=0; let check1=18 //đây là các biến lưu trữ của hàm changePic()
    let changePic=(x)=>{
        document.body.scrollTop=0; document.documentElement.scrollTop=0;
        picContainer.innerHTML=''; check1=18;
        showPic().then(data=>{
            b=x; a=x;
            for(let i=1;i<10;i++){
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
                if(check1===18){
                    picContainer.innerHTML= `${picContainer.innerHTML} <h1 class='buttonNextprevious'style='float:right; padding:3%; cursor: pointer;' onclick='changePic(a-check1)'>&laquo; Back</h1>`
                }
                else{
                    picContainer.innerHTML= `${picContainer.innerHTML} <h1 class='buttonNextprevious' style='float:right; padding:3%; cursor: pointer;' onclick='changePic(a-check1-9)'>&laquo; Back</h1>`
                }
                
            }
        })
    }
    
    

    //khối chứa ảnh và hàm click thay ảnh trong Music
    let pic= document.getElementsByClassName('pic');
    let picBlock= document.getElementsByClassName('picBlock')
    let hoverPic=()=>{
        for(let i=0;i<9;i++){
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
    let myRandomMusic=[]; 
    let takeMusic= async()=>{
        let response= await fetch('myMusic.json')
        let myMusic= await response.json()
        return randomPic(myRandomMusic,myMusic)   
    }


    //music
    let music= ''; //audio khởi tạo
    takeMusic().then(myMusic=>{
        music= new Audio(`./music/${myMusic[0].name}.mp3`)
    })

    let checkTime=0; //thời gian nhạc hiện tại
    let autoRunRadio='Off'; //biến check điều kiện
    let musicTime= document.getElementById('musicTime'); //text chứa currentTime và endTime
    let timeContainer= document.getElementById('timeContainer') //khối chứa currentTime và endTime
    let x=0; //biến check điều kiện

    //hàm autoplay nhạc 
    let autoPlay=()=>{ 
        checkTime= parseInt(checkTime)
        musicTime.innerHTML= `Current time: ${checkTime}s <br>
                            End time: ${parseInt(music.duration)-3}s`;
        takeMusic().then(myMusic=>{
            if(musicButtonplay.innerHTML==='<p class="musicButton">⏸️</p>'){
                if(checkTime<parseInt(music.duration)-3){
                    checkTime+=1
                }
                else if(checkTime===parseInt(music.duration)-3){
                    checkTime+=1
                    if(n===myMusic.length){
                        x=1; 
                        alert('Đây đã là bài hát cuối cùng!')
                    }
                    nextSong();    
                }  
            }
        })
        
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
    let search= document.getElementById('search') //nút search
    let musicScreen= document.getElementById('musicScreen') //khối chứa các button playPause
    let exitButton= document.getElementById('exitButton') //nút thoát background nhạc
    let homeButton= document.getElementById('homeButton')// nút về trang chủ
    
    //hàm check background Music
    let check=1; // biến check điều kiện
    let checkBackground=(x)=>{
        if(check===1){
            listener.innerHTML= `<img class='backgroundMusic' src="folderWibu/66439076_p0.jpg" alt=""> <div class='backgroundMusic' style="position: absolute; background-color: rgba(0, 0, 0, 0.15);"></div>
        <h1 style='position:absolute; bottom:15%;'> <marquee behavior="sroll" direction="left"> Song ${n}: ${x[n-1].name} </marquee></h1>` 
        }
        else if(check===0){
            showPic().then(data=>{
                listener.innerHTML= `<img class='backgroundMusic' src="folderWibu/${data[v].name}" alt=""> <div class='backgroundMusic' style="position: absolute; background-color: rgba(0, 0, 0, 0.15);"></div>
            <h1 style='position:absolute; bottom:15%;'> <marquee behavior="sroll" direction="left"> Song ${n}: ${x[n-1].name} </marquee></h1>` 
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
        d=1; radioSetting()
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

    //check search function
    let check3=0;
    let checkSearch=(x)=>{
        if(x===0){
            takeMusic().then(myMusic=>{
                finder.value= `Song ${arrIndex[0]+1}: ${myMusic[arrIndex[0]].name}`;
                searchMusic()
            })   
        }
    }

    //hàm của nút 'Search'
    let filterSearch= document.getElementById('filterSearch'); 
    let searchMusic= ()=>{
        check3=0;
        if(finder.value!=='' && arrIndex.length===0){
           alert('Không thể tìm thấy kết quả') 
        }

        else if(finder.value!==''){
            filterSearch.innerText= (finder.value).toLowerCase();
            finder.value= ''; searchingResultsBlock.innerHTML=``;
            takeMusic().then(myMusic=>{
                for(let i=0; i<myMusic.length; i++){
                    if(filterSearch.innerText===(`Song ${i+1}: ${myMusic[i].name}`).toLowerCase()){
                        music.pause(); n=i; nextSong(); check3=1
                        if(d===0){
                          radioSetting()  
                        }
                        break;
                    } 
                }
                checkSearch(check3)              
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
    
    finder.addEventListener('keyup', function(e){
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

                if(arrIndex.length===5 && arrIndex.length<arrSearch.length){
                    searchingResultsBlock.innerHTML= `${searchingResultsBlock.innerHTML} <p style='float:right; padding-right:3%; cursor: pointer' onclick='clickNext(arrIndex[arrIndex.length-1])'>➡️</p>`
                } 
                
                //user bấm phím Enter chạy bài đầu tiên của list
                if(e.key==='Enter' && arrIndex.length>0){
                    finder.value= `Song ${arrIndex[0]+1}: ${myMusic[arrIndex[0]].name}`;
                    searchMusic()
                }

                if(e.key==='Enter' && arrIndex.length===0 && finder.value!==''){
                    alert('Không thể tìm thấy kết quả')
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
                    if(arrIndex[0]>4 && arrIndex[0]>arrSearch[0]){
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
                })    
            }
        })
    }
     
    
    //click to remove result
    let removeResult= ()=>{
        if(searchingResultsBlock.innerHTML!==''){
            searchingResultsBlock.innerHTML=''
        }
    };





    
    
    
