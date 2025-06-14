const signIn=document.querySelector('.sign-in');
const signUp=document.querySelector('.sign-up');
const register=document.querySelector('.Register');
const createAccount=document.querySelector('.create_Account')

register.addEventListener('click',function(){
	signIn.style.display='none';
	signUp.style.display='block';
})
createAccount.addEventListener('click',function(){
	signIn.style.display='block';
	signUp.style.display='none';
})
