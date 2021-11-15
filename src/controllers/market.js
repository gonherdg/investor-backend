import axios from 'axios';
import scrapeIt from 'scrape-it';
import Crypto from '../models/crypto.js';

const getMarketPrices = async (req, res) => {
  const user = req.user;

  const dbCryptos = await Crypto.find();
  console.log("dbCryptos", dbCryptos);
  res.json({info:"dbCryptos", data: dbCryptos});
};

const getMarketPricesOLD = async (req, res) => {
  const user = req.user;

  let all = {};
  
  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      'start': '1',
      'limit': '5000',
      'convert': 'USD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': 'a3511bb6-0966-4f45-b8e6-5a333e7944cd'
    },
    json: true,
    gzip: true
  };
/*
  axios({
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
    console.log(response.data);
    res.json(response.data);
  });
  */

  // Callback interface
  
  scrapeIt("https://ionicabizau.net", {
      // Fetch the articles
      articles: {
          listItem: ".article"
        , data: {

              // Get the article date and convert it into a Date object
              createdAt: {
                  selector: ".date"
                , convert: x => new Date(x)
              }

              // Get the title
            , title: "h1" //"a.article-title"

              // Nested list
            , tags: {
                  listItem: ".tags > span"
              }

              // Get the content
              /*
            , content: {
                  selector: ".article-content"
                , how: "html"
              }
*/
              // Get attribute value of root listItem by omitting the selector
            , classes: {
                  attr: "class"
              }
          }
      }

      // Fetch the blog pages
    , pages: {
          listItem: "li.page"
        , name: "pages"
        , data: {
              title: "a"
            , url: {
                  selector: "a"
                , attr: "href"
              }
          }
      }

      // Fetch some other data from the page
    , title: ".header h1"
    , desc: ".header h2"
    , avatar: {
          selector: ".header img"
        , attr: "src"
      }
  }, (err, { data }) => {
      console.log("_");
      console.log("IONICA");
      //console.log(err || data)
      all.ionica = {};
      all.ionica.data = err || data;
  });


  /*
  scrapeIt("https://coinmarketcap.com/", {
    topInfo: {
      listItem: ".jrJack.cmc-global-stats__content",
      data: {
        text: ".jbbfeR"
      }
    },

    asd: {
      selector: "tbody",
      how: "html",
    },

    tbody: {
      listItem: "tbody",
      data: {
        qwe: ".dNOTPP.coin-item-symbol"
      },
    }
  }, (err, obj) => {
    console.log("_");
    console.log("COINMARKETCAP");
    console.log(err || obj);
    //res.json(err || data);
    const ndata = obj ? obj.data : null;
    all.coinmarket = {};
    all.coinmarket.data = err || ndata.data;
  });
  */
  
  
  scrapeIt("http://gonsoft.com.ar/", {
    simpleDiv: "a",
    qwe: {
      selector: "a", //".sm\\:text-2xl",
      how: "html"
    },
    contact: { 
      selector: ".flex.justify-center.relative.animate-enterTitleFromLeftFast",
      how: "html"
    }
  }, (err, w) => {
    console.log("_");
    console.log("GONSOFT");
    console.log(err || w.data);
    //res.json(err || w.data);
    all.gonsoft = {};
    all.gonsoft.data = err || w.data;
  });

  scrapeIt("https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3", {
    plainlist: {
      listItem: ".plainlist",
      data: ".mw-parser-output",
    }
  }, (err, {data}) => {
    console.log(err || data);
  });
  
  res.json(all);

  /*
  scrapeIt("https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3", {
    countries: ".plainlist"
  }, (err, w) => {
    console.log(err || w.data);
    res.json(err || w.data);
  });
  */
};


export { 
  getMarketPrices
};
