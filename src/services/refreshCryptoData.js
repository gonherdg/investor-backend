import axios from 'axios';
import Crypto from '../models/crypto.js';

const getCryptoData = async () => {
  const data = await axios({
    method: 'get',
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    responseType: 'json',
    headers: {
      'X-CMC_PRO_API_KEY': 'a3511bb6-0966-4f45-b8e6-5a333e7944cd',
      Accept: "application/json",
      "Accept-Encoding": "deflate, gzip"
    },
    qs: {
      'start': '1',
      'limit': '1000',
      'convert': 'USD'
    },
  })
  .then(function (response) {
    //console.log(response.data);
    return response.data;
  })
  .catch((error) => { 
    return { "error": error }
  });
  return data;
}

const refreshCryptoData = async () => {
  const cryptoData = await getCryptoData();  // status & data info
  console.log("CRYPTO DATA:", cryptoData.data[0].quote.USD.price);
  
  //if (!cryptoData) return;
  cryptoData.data.forEach(async item => {
    const dbData = await Crypto.findOne({ shortName: item.symbol }).exec();
    

    // Now update the data:
    if (dbData){
      //console.log('LO TENGO:', dbData);
      dbData.priceInUSD = item.quote.USD.price;
      dbData.save();
    }

  })

  setTimeout(refreshCryptoData, 288000);
};

export default refreshCryptoData;