const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');

const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById("amount-two");

const rateText = document.getElementById('rate');
const swap = document.getElementById("btn");

currency_one.addEventListener('change',calculateMoney);
currency_two.addEventListener("change", calculateMoney);
amount_one.addEventListener('input', calculateMoney)
amount_two.addEventListener("input", calculateMoney);



function calculateMoney(){
    const one = currency_one.value;
    const two = currency_two.value;
    fetch(`https://v6.exchangerate-api.com/v6/3bd8238d5772b61cbb5dc7d7/latest/${one}`)
    .then(res=>res.json()) //รับมาเป็น json
    .then(data=>{ // เก็บใน data
        const rate=data.conversion_rates[two]; //ดึงค่าของสกุลเงินที่ตรงกับ two
        rateText.innerHTML=`1 ${one} = ${rate} ${two}`;
        amount_two.value=(amount_one.value*rate)
    }) 
}
swap.addEventListener('click',()=>{  //สลับค่าแต่สร้าง  temp มาเก็บชั่วคราวก่อน
    // USD => THB || THB => USD
    // TEMP -> USD || THB = TEMP (USD)
    const temp = currency_one.value; //ต้นทาง
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculateMoney()
})

calculateMoney();