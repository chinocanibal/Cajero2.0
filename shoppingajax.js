var dataFruit = {},
    unitCost =[],
    itemName=[];
var basket =(function(){

    var addItem,
        newItem,
        checkProdutcs,
        lengthProducts,
        quantitySelected,
        itemSelected,
        billProducts,
        conta = 0,
        totalValue = 0,
        receiptProducts, 
        VAT,
        basketProducts=[],
        totalCost =[],
        totalValue = 0;
    
       

    

    checkProdutcs = function(){
        return lengthProducts = itemName.length;
    };

    billProducts = function (){
        totalValue = 0;
        var  VATValue = 5;
            
       
        for ( var i=0 in dataFruit.items ){
            let mo = dataFruit ["items"][i]["fruit" + i]["uCost"]
            unitCost.push (mo)
        };
        
        totalCost = totalProducts.map((item,index)=>{

           let value = item * unitCost[index];
           totalValue = totalValue + value;
           return  value ;  
            
        });

       
        VAT = VATValue / 100 * totalValue;
        VAT = Number(VAT.toFixed(2));
        totalValue = totalValue + VAT;
        totalValue = Number(totalValue.toFixed(2));
       
    };

     // Create the table of the selected items
    receiptProducts = function(){
        let info = document.getElementById('receiptProduct'),
          
            VATPosi,
            totalPosi,
            posi;

            if (conta > 0){
                for(var i=1;i < conta+1; i++){
                    mierda = document.getElementById('reta'+i);
                    mierda.setAttribute('class' , 'hide');
                    mierda.removeAttribute("id");
                }
            };
         
           conta = 0;

        totalProducts.forEach ((receipt, index)=>{
           
                
                if(receipt > 0){

                    conta = conta + 1;
                    
                    posi = document.getElementById ('receiptFixed');
                    let row = document.createElement ('tr');

                    let produt0 = document.createElement ('th'),
                        produt1 = document.createElement ('th'),
                        produt2 = document.createElement ('th'),
                        produt3 = document.createElement ('th');
  
                    posi.insertAdjacentElement('afterEnd', row);
                    row.insertAdjacentElement ('afterBegin' , produt0)
                    produt0.insertAdjacentElement('afterEnd', produt1);
                    produt1.insertAdjacentElement('afterEnd', produt2);
                    produt2.insertAdjacentElement('afterEnd', produt3);
                
                    produt0.innerHTML = itemName[index];
                    produt1.innerHTML = unitCost[index];
                    produt2.innerHTML = totalProducts[index];
                    produt3.innerHTML = totalCost[index];
                    
                    
                    row.setAttribute('id', 'reta'+ conta );
                    
                };
                
            });


        
        VATPosi = document.getElementById ('tax');
        VATPosi.innerHTML ="VAT: " + VAT + " £";
        totalPosi = document.getElementById('totalh');
        totalPosi.innerHTML ="Total: " + totalValue + " £";
       
    };   
         
    getData = function(source){
        
        return new Promise ((resolve, reject)=> {
        var xhr = new XMLHttpRequest ();
       
        xhr.open('GET', source, true);

        xhr.onload = function(){
            
            if (this.status == 200){
               resolve (dataFruit = JSON.parse (this.responseText));
               
                
            } else if (this.status == 404){
                alert("Data not found !!!!!!!");
            }
        
        };

        xhr.onerror = function (){
            document.getElementById('error').innerHTML = "Request Error!!!!!"
        }
        xhr.send();
    })
       
    }

    showData = function (){
                 
        
            var pop = document.getElementById('popUpId');
            pop.classList.toggle('show');
            let option = 0,
                option1 = 1;
            
           let local = document.getElementById('local');
           local.addEventListener('click', ()=>{ dataSource(option)});

            let remote = document.getElementById('remote');
            remote.addEventListener('click',()=>{ dataSource(option1)} );
            
            async function dataSource (cho){
               
                let source ="";
                if (cho == 0) {
                    source = 'fruits.json';
                    pop.classList.toggle('hide');
                } else {
                    source = 'https://api.myjson.com/bins/8nyp1';
                    pop.classList.toggle('hide');
                };
                
                await getData(source);
                bottonData.classList.toggle('hide');

                let createData =[];
                for(var i=0 in dataFruit.items) {
                    let mo=dataFruit ["items"][i]["fruit"+i]["type"];
            
                    itemName.push(mo)
                    createData.push(  "<p> " + mo + "  </p><input id =" + mo +" > Kg");
                };

                let dataPosi = document.getElementById('rootData'),
                cadena = createData.join("");
        
                dataPosi.innerHTML = cadena;
            }
             
        
        
    };

    return {
        add: addItem,
        check: checkProdutcs,
        bill: billProducts,
        receipt: receiptProducts,
        Data: showData
    }
})();

var bottonData = document.getElementById('bData');
bottonData.addEventListener('click', basket.Data);






var button,
    checkProdutcsBasket,
    totalProducts = [];



button = document.getElementById('b');
button.addEventListener ('click', takeQuanty );

function takeQuanty (){
    
    

    
    checkProdutcsBasket = basket.check();
    totalProducts = [];
    let ch = 0;
        
    for(i = 0 ; i < checkProdutcsBasket ; i++){
        let a = document.getElementById (itemName[i]);
        a = Number (a.value);
        
        ch = ch + a;
        
        totalProducts.push(a); 
        
        
      };
   
    
    if (ch >0){
    
      
        basket.bill();
        basket.receipt();
    } else {
        alert ("Please choose any item")
    }
 };





 

      




