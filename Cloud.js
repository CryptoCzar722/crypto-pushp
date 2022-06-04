Moralis.settings.setAPIRateLimit({
  anonymous:200, authenticated:200, windowMs:60000
})

Moralis.Cloud.job("UpdateRecentCoinStats", (request) =>{
  const { params, headers, log, message } = request;
  message("updating coin statistics"); 
      
  Moralis.Cloud.httpRequest({
       method: "GET",
    url: 'https://fear-and-greed-index.p.rapidapi.com/v1/fgi',
    headers: {
          'X-RapidAPI-Host': 'fear-and-greed-index.p.rapidapi.com',
          'X-RapidAPI-Key': ''
    }
   }).then(function(httpResponse) {
      logger.info(httpResponse.text);
      const Coins = Moralis.Object.extend("FearGreed");
      const coins = new Coins();    
      coins.set("FearGreed", httpResponse.text);
      coins.save()
      message("recent coins updated in database");
    }, function(httpResponse) {
            message("failed");
              logger.error('Request failed with response code ' + httpResponse.status);
    });
  
  Moralis.Cloud.httpRequest({
       method: "GET",
    url: 'https://crypto-tracker.p.rapidapi.com/api/recentlyadded',
    headers: {
          'X-RapidAPI-Host': 'crypto-tracker.p.rapidapi.com',
        'X-RapidAPI-Key': ''
        }
   }).then(function(httpResponse) {
      logger.info(httpResponse.text);
      const Coins = Moralis.Object.extend("NewCoins");
      const coins = new Coins();    
      coins.set("NewCoins", httpResponse.text);
      coins.save()
      message("recent coins updated in database");
    }, function(httpResponse) {
            message("failed");
              logger.error('Request failed with response code ' + httpResponse.status);
    });
  
  
  Moralis.Cloud.httpRequest({
       method: "GET",
    url: 'https://crypto-tracker.p.rapidapi.com/api/toplosers',
    headers: {
          'X-RapidAPI-Host': 'crypto-tracker.p.rapidapi.com',
        'X-RapidAPI-Key': ''
        }
   }).then(function(httpResponse) {
      logger.info(httpResponse.text);
      const Coins = Moralis.Object.extend("TopLosers");
      const coins = new Coins();    
      coins.set("TopLosers", httpResponse.text);
      coins.save()
        message("top losers updated in database");
    }, function(httpResponse) {
            message("failed");
              logger.error('Request failed with response code ' + httpResponse.status);
    });
  
  Moralis.Cloud.httpRequest({
       method: "GET",
    url: 'https://crypto-tracker.p.rapidapi.com/api/topgainers',
    headers: {
          'X-RapidAPI-Host': 'crypto-tracker.p.rapidapi.com',
        'X-RapidAPI-Key': ''
        }
   }).then(function(httpResponse) {
      logger.info(httpResponse.text);
      const Coins = Moralis.Object.extend("TopGainers");
      const coins = new Coins();    
      coins.set("TopGainers", httpResponse.text);
      coins.save()
        message("top gainers updated in database");
    }, function(httpResponse) {
            message("failed");
              logger.error('Request failed with response code ' + httpResponse.status);
    });
  
  
  Moralis.Cloud.httpRequest({
       method: "GET",
    url: 'https://crypto-tracker.p.rapidapi.com/api/top10',
    headers: {
          'X-RapidAPI-Host': 'crypto-tracker.p.rapidapi.com',
        'X-RapidAPI-Key': ''
        }
   }).then(function(httpResponse) {
      logger.info(httpResponse.text);
      const Coins = Moralis.Object.extend("Top10");
      const coins = new Coins();    
      coins.set("Top10", httpResponse.text);
      coins.save()
        message("top 10 updated in database");
    }, function(httpResponse) {
            message("failed");
              logger.error('Request failed with response code ' + httpResponse.status);
    });
});

//Trading bot functions
Moralis.Cloud.beforeSave("Trades", async (request) =>{
      const logger = Moralis.Cloud.getLogger();
      const confirmed = request.object.get("confirmed");
    const token = request.object.get("token");
    const buyIn = request.object.get("buyIn");
      const amount = request.object.get("amount");
  
      let msg = `new buy ${token} coinage ${amount} for $5`;
      let data = {
         app_id: "",	//From OneSignal
        contents: {"en": msg},
        included_segments: ["Subscribed Users"], //Array of OneSignal Segements you wish to send sms to
        name: "SMS",
          sms_from: "+16077032996" //Your from SMS set up in Twilio
        }    
        //SMS post
   Moralis.Cloud.httpRequest({
       method: "POST",
    url: "https://onesignal.com/api/v1/notifications",
    body: data,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' //Add Rest API Key from OneSignal
        }
   }) 
})


/*Moralis.Cloud.beforeSave("Event", async (request) =>{
      const logger = Moralis.Cloud.getLogger();
      const confirmed = request.object.get("confirmed");
    const name = request.object.get("token");
    const address = request.object.get("address");
      
      const NewPrice = Moralis.Object.extend("NewPrice");
    const query = new Moralis.Query(NewPrice);
    const results = await query.find();
      let msg = `new token ${name} address ${address}`;
      let data = {
         app_id: "e8508aaf-3823-4991-a09b-6d1bba197d1a",	//From OneSignal
        contents: {"en": msg},
        included_segments: ["Subscribed Users"], //Array of OneSignal Segements you wish to send sms to
        name: "SMS",
          sms_from: "+16077032996" //Your from SMS set up in Twilio
        }    
        //SMS post
   Moralis.Cloud.httpRequest({
       method: "POST",
    url: "https://onesignal.com/api/v1/notifications",
    body: data,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic OTViZWI5ZWItMWM5YS00MWRhLTkwMzMtM2JiZTdiNzU0MjJk' //Add Rest API Key from OneSignal
        }
   }) 
})*/
