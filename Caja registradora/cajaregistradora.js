function checkCashRegister(price, cash, cid) {
    const denominations = [
        { name: "PENNY", value: 0.01 },
        { name: "NICKEL", value: 0.05 },
        { name: "DIME", value: 0.1 },
        { name: "QUARTER", value: 0.25 },
        { name: "ONE", value: 1.0 },
        { name: "FIVE", value: 5.0 },
        { name: "TEN", value: 10.0 },
        { name: "TWENTY", value: 20.0 },
        { name: "ONE HUNDRED", value: 100.0 },
    ];
    
    let costo = price;
    console.log(costo)
    let pagado = cash;
    console.log(pagado)
    let cambio = parseFloat((pagado - costo).toFixed(3))
    console.log(cambio)

    let cajaTotal = 0
    for(let i in cid){
        cajaTotal += cid[i][1]
    }
    cajaTotal = parseFloat(cajaTotal.toFixed(3))
    console.log(cajaTotal)
    let change ={status:"INSUFFICIENT_FUNDS" , change:[]}
    console.log(cajaTotal)
    console.log(cambio)
    if(cajaTotal<cambio){
        change.status = "INSUFFICIENT_FUNDS" 
    }
    else if(cajaTotal == cambio){
        change.status ='CLOSED'
        change.change = cid
    }
    else{
        //for que recorre el array que contiene los billetes q tiene la caja registradora
        for(let i=cid.length-1; i>=0;i--){
            console.log(i)
            //se divide cuanto cambio necesita el cliente entre las denominaciones principales para saber cuantos
            //billetes/monedas necesitamos dar de vuelto exacto
            let vueltoEx =Math.trunc(cambio/denominations[i].value) 
            console.log(vueltoEx)
            console.log(denominations[i].name,(vueltoEx*denominations[i].value))
            if(vueltoEx>0){
                console.log(cambio)
                change.status ='OPEN'
                if(cambio-cid[i][1]>0){
                    cambio-= parseFloat(cid[i][1])
                    change.change.push(cid[i])
                }
                else{
                    let total = cid[i][1]/cambio
                    console.log(total)
                    cid[i][1]=Math.trunc(total)*denominations[i].value
                    change.change.push(cid[i])
                    let total2 =Math.trunc(total%denominations[i].value).toFixed(3)
                    console.log(total2)
                    console.log(((total%denominations[i].value).toFixed(3)*denominations[i].value))
                    cambio -=parseFloat((total%denominations[i].value).toFixed()*denominations[i].value) 
                    console.log(parseFloat((total%denominations[i].value).toFixed()*denominations[i].value) )
                    cid[i][1]=parseFloat(parseFloat((total%denominations[i].value).toFixed()*denominations[i].value))
                    if(i<=3){
                        cid[i][1]=parseFloat(Math.trunc((cambio/denominations[i].value).toFixed(2))*denominations[i].value)
                        cambio-=parseFloat(Math.trunc((cambio/denominations[i].value).toFixed(2))*denominations[i].value)
                        
                    }
                }

            }
            console.log(cambio.toFixed(2))
            console.log(i)
            if(i==0){
                break
            }
            
        }
        if(cambio>0){
            change.status ='INSUFFICIENT_FUNDS'
            change.change = []
        }
    }
    
    console.log(change)
    
    return change;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])