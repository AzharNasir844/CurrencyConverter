const base_url = "https://latest.currency-api.pages.dev/v1/currencies";
let input = document.querySelector(".input");
let dropdown = document.querySelectorAll(".dropdown select");
let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
let btn=document.querySelector(".btn");
for(let select of dropdown){
    for(let code in countryList){
        let newoption=document.createElement("option");
        newoption.value=code;
        newoption.innerText=code;
        if(select.name=="from"&&code=="USD"){
            newoption.selected=true;
        }else if(select.name=="to"&&code=="PKR"){
            newoption.selected=true;
        }
        select.appendChild(newoption);
           select.addEventListener("change",(evt)=>{  
        updateflag(evt.target);
    });
        
    }
}
    const updateflag=(element)=>{
        let cucode=element.value;
        let countrycode=countryList[cucode];
        let src=`https://flagsapi.com/${countrycode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");
        img.src=src;
    }

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=input.value;
    if(amount==="" || amount<1){
         input.value=1;
        amount=1;
      
    }
 
        let url=`${base_url}/${fromcurr.value.toLowerCase()}.json`;
        let response=await fetch(url);
        let data=await response.json();
        let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
        let total=amount*rate;
        msg.innerText=`${amount} ${fromcurr.value} = ${total} ${tocurr.value}`;
    });
 
