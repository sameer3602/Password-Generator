const inputslider=document.querySelector("#slider");
const lengthdisplay=document.querySelector(".nums");

const passdisplay=document.querySelector(".display");
const copybtn=document.querySelector("#icons");
const copymsg=document.querySelector(".span1");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#splchr");
const indicator=document.querySelector(".stg2");
const generatebtn=document.querySelector("#Generate");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");


let password="";
let passwordlength=10;
let checkcount=0;
const symbols='`!@#$%^&*()~<>?:";_+=-[]{}?/';
handleslider();

function handleslider(){
    inputslider.value=passwordlength;
    lengthdisplay.innerText=passwordlength;
}
function setindicator(color){
    indicator.style.backgroundColor=color;   
}
function getrandom(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generatenumber(){
    return getrandom(0,9);
}
function generatelowercase(){
    return String.fromCharCode(getrandom(97,123));
}
function generateuppercase(){
    return String.fromCharCode(getrandom(65,91));
}
function generatesymbol(){
    const randno=getrandom(0,symbols.length);
    return symbols.charAt(randno);
}
function checkstrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasUpper=true;
    if(numbersCheck.checked) hasUpper=true;
    if(symbolCheck.checked) hasUpper=true;
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength>=8){
        setindicator("#3D550C");
    }else if(
        (hasLower || hasUpper)&&
        (hasSym || hasNum) &&
        passwordlength>=6){
            setindicator("#ff0");
    }else{
            setindicator("#f00");
    }
}
async function copycontent(){
    try{
        await navigator.clipboard.writeText(passdisplay.value);
        copymsg.innerText="copied";
    }
    catch(e){
        copymsg.innerText="not copied";
    }
    //to make copy span visible
    copymsg.classList.add("active");

    setTimeout(()=>{
        copymsg.classList.remove("active");
    },2000);
}
function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkcount++;
    });
    if (passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handlecheckboxchange);
})

inputslider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleslider();
})
copybtn.addEventListener('click',()=>{
    if(passdisplay.value) 
        copycontent();
})
function shufflepassword(array){
    for (let i=array.length-1;i>0;i--){
        const j =Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let pass="";
    array.forEach((str)=>(pass+=str));
    return pass;
}
generatebtn.addEventListener('click',()=>{
    if (checkcount==0) return;
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
    password="";
    let funcarr=[];
    if (uppercaseCheck.checked)
        funcarr.push(generateuppercase);
    
    if (lowercaseCheck.checked)
        funcarr.push(generatelowercase);
    
    if (numbersCheck.checked)
        funcarr.push(generatenumber);
    
    if (symbolCheck.checked)
        funcarr.push(generatesymbol);
    
    for (let i=0;i<funcarr.length;i++){
        password+=funcarr[i]();
    }
    for (let i=0;i<passwordlength-funcarr.length;i++){
        let randind=getrandom(0,funcarr.length);
        console.log("random"+randind);
        password+=funcarr[randind]();
    }
    console.log("Aaaaa");
    //shuffle the password
    password=shufflepassword(Array.from(password));
    passdisplay.value=password;
    checkstrength();
})

