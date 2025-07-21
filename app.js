// API KEY
const API_KEY="cur_live_vm5HnZzEK9iE7b894LkGwsTOWdQ2mB7mJeCayLXS";
//Base URL for api
const BASE_URL="https://api.currencyapi.com/v3/latest?";

const selects=document.querySelectorAll("select");
const to = document.querySelector(".to");
const from = document.querySelector(".from");
const btn=document.querySelector("button");
const msg = document.querySelector(".message");
const input = document.querySelector(".input");
const background = document.querySelector(".pic");


//promise for handling setTimeout
const wait=(delay)=>{
    return new Promise(resolve=>setTimeout(resolve, delay));
}

//transition in the background of Tanmay pic

background.addEventListener("click", ()=>{
    background.classList.add("animating");
    wait(200).then(()=>{
        background.classList.remove("animating");
    })
})


//change flag

const changeFlag=(event)=>{
    console.log("change flag")
    curr_code=event.value;
    let country_code = countryList[curr_code];
    let img = `https://flagsapi.com/${country_code}/flat/64.png`;
    if(to.children[2]==event){
        to.children[1].src=img;
    }else{
        from.children[1].src=img;
    }    
}



for(let select of selects){//adding currency codes
    for(let curr_code in countryList){
            console.log("add");
            const opt=document.createElement("option");
            opt.value=curr_code;
            opt.innerText=curr_code;
            select.append(opt);
        }
        select.addEventListener("change", (eve)=>{
            changeFlag(eve.target);
        })
    }

 //change Rate
const changeRate= async(from_curr_code,to_curr_code)=>{
    console.log("changerate");
    API=`${BASE_URL}apikey=${API_KEY}&base_currency=${from_curr_code}&currencies=${to_curr_code}`;
    let response = await fetch(API);
    let data = await response.json();
    return data.data[to_curr_code].value;

}

//displaying message with async function to fetch API
const displayMessage=async ()=>{
    console.log("display");
    let input_amount = input.children[0].value;
    let from_curr_code= from.children[2].value;
    let to_curr_code= to.children[2].value;
    rate= await changeRate(from_curr_code,to_curr_code);
    total_amount=parseFloat(input_amount)*Number(rate);
    console.log(typeof input_amount, typeof rate);
    msg.style.textAlign="center";
    msg.innerText=`${input_amount}${from_curr_code}=${total_amount}${to_curr_code}`;
}

//function for handling asyn programming
const wait2=(delay)=>{
    return new Promise(resolve=> setTimeout( resolve, delay));
}

//update exchange rate
btn.addEventListener("click", (eve)=>{
    eve.preventDefault(); //prevent the default behaviors of button like loading, etc.
    btn.classList.add("glow");
    wait2(200).then(()=>{
        btn.classList.remove("glow");
    });
    console.log("display message");
    displayMessage();
})

    

   