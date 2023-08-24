const fetchData = ()=> {
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cdogecoin%2Ctether%2Cethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true')
    .then(res => res.json())
    .then(json => {

        const container = document.querySelector('.container');
        container.innerHTML = ''//display nothing so that it dosent add more html
        const coins = Object.getOwnPropertyNames(json);

        for(let coin of coins){//we can have loops if the objects have identical  datafor a certain item. 
            const coinInfo = json[coin]

            
            const price  = coinInfo.usd;
            const change = coinInfo.usd_24h_change.toFixed(5);
                        /*I would change the css of the container below, especially the placement of the condition here, 
                        it should be in the spans(coin-price), or I could  use classlist. */
            container.innerHTML += `
                <div class = 'coin ${change < 0 ? 'falling': 'rising'}'>
                    <div class ='coin-logo'>
                        <img src = './images/${coin}.jpg'>
                    </div>
                    <div class = 'coin-name'>
                        <h3>${coin}</h3>
                    </div>
                    <div class = coin-price'>
                        <span class = 'price'> Price: $${price}<span>
                        <span class = 'change' > change: $${change}<span>
                    </div>
                </div>
                    `; 

        }
    })
}

fetchData()
//initial call to start process
setInterval(fetchData, 60000)
/*(function needs to be called first before setinterval runs)
reruns every 10 minutes, since the api dosent change that fast */
