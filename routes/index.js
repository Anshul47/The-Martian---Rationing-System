var express = require('express');
var router = express.Router();
const supplies_model = require('../models/supplies_model');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var supplies = null;
  try {
    supplies = await supplies_model.getAllSupplies();    
  } catch (error) {
    supplies = error;
  }

  var limit = 0;
  var water_limit = 0;
  var food_limit = 0;

  var waterBagCount = 0;
  var waterLimit = 2;
  var waterArr = [];
  
  var foodBagCount = 0;
  var foodLimit = 2500;
  var foodArr = [];

  var date = '';
  var displaydate = '';

 
  var dateObj = new Date();
  var outputArr = [];

  do {

      date = dateObj.getFullYear()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getDate();;
      displaydate = dateObj.getDate()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getFullYear();
      
      var waterDailyArr = [];
      var waterSupplies = null;
      try {
        waterSupplies = await supplies_model.getWaterSupplies(waterArr);    
      } catch (error) {
        console.log(error);
      }

      var count = 0;
      var waterCount = 0;
      if(typeof(waterSupplies.data) != 'undefined'){
        count = waterSupplies.data.length;
        for(var i = 0; i < count; i++){
          if(waterCount >= waterLimit){
            break;
          }else{
            waterCount += parseInt(waterSupplies.data[i].qty_in_litres);
            waterArr.push(waterSupplies.data[i].sid);
            waterDailyArr.push({ packet_id: waterSupplies.data[i].packet_id, qty_in_litres: waterSupplies.data[i].qty_in_litres });
            
          }
        }
      }

      var foodDailyArr = [];
      var foodSupplies = null;
      try {
        foodSupplies = await supplies_model.getFoodSuppliesWithCurrentDate(date, foodArr);    
      } catch (error) {
        console.log(error);
      }
      var count = 0;
      var foodCount = 0;
      if(typeof(foodSupplies.data) != 'undefined'){
        count = foodSupplies.data.length;
        for(var i = 0; i < count; i++){
          foodCount += parseInt(foodSupplies.data[i].calories);
          foodArr.push(foodSupplies.data[i].sid);
          foodDailyArr.push({ packet_id: foodSupplies.data[i].packet_id, calories: foodSupplies.data[i].calories, packet_content: foodSupplies.data[i].packet_content, expiry_date: foodSupplies.data[i].expiry_date });
        }
      }

      if(foodCount < 2500){
          foodSupplies = null;
          try {
            foodSupplies = await supplies_model.getFoodSupplies(foodArr);    
          } catch (error) {
            console.log(error);
          }
          var count = 0;
          if(typeof(foodSupplies.data) != 'undefined'){
            count = foodSupplies.data.length;

            

            
            for(var i = 0; i < count; i++){
              var k = 0;
              var l = 0;
              foodCount += parseInt(foodSupplies.data[i].calories);
              foodArr.push(foodSupplies.data[i].sid);
              foodDailyArr.push({ packet_id: foodSupplies.data[i].packet_id, calories: foodSupplies.data[i].calories, packet_content: foodSupplies.data[i].packet_content, expiry_date: foodSupplies.data[i].expiry_date });
              var foodCountNew = 0;
              console.log('foodCount '+foodCount+' date '+displaydate);
              if(foodCount >= foodLimit){
                break;
              }else{

                
                for(var j = count-1; j > i+1; j--){
                  foodCountNew = foodCount + parseInt(foodSupplies.data[j].calories);
                  
                  
                  if(foodCountNew >= foodLimit){
                    // console.log('foodCountNew '+foodCountNew+' date '+displaydate);
                    foodCount += parseInt(foodSupplies.data[j].calories);
                    foodArr.push(foodSupplies.data[j].sid);
                    foodDailyArr.push({ packet_id: foodSupplies.data[j].packet_id, calories: foodSupplies.data[j].calories, packet_content: foodSupplies.data[j].packet_content, expiry_date: foodSupplies.data[j].expiry_date });
                    k = 1;
                    break;
                  }
                }

              }
              if(k == 1){
                break;
              }
            }

          }
      }

      

      if(waterCount < 2 || foodCount < 2500){
        limit = 1;
      }else{
        var outputObj = {
          date: displaydate,
          water: waterDailyArr,
          food: foodDailyArr
        };
        outputArr.push(outputObj)
      }

      dateObj.setDate(dateObj.getDate() + 1);
  }
  while (limit != 1);
  if(typeof(req.query.api) != 'undefined' && req.query.api == 1){
    res.json({supplies, output: outputArr});
  }else{
    res.render('index', { title: 'The Martian - Rationing System', supplies, output: outputArr });
  }
});


router.post('/food', async function(req, res, next) {
  var packet_id      = req.body.packet_id;
  var packet_content = req.body.packet_content;
  var expiry_date    = req.body.expiry_date;
  var calories       = parseInt(req.body.calories);
  var dateArr        = expiry_date.split('/');
  expiry_date        = dateArr[2]+'-'+dateArr[1]+'-'+dateArr[0];
  await supplies_model.insertSupplies(packet_id, 1, packet_content, calories, expiry_date, 0);
  res.redirect('/');

});

router.post('/water', async function(req, res, next) {
  var packet_id     = req.body.packet_id;
  var qty_in_litres = parseInt(req.body.qty_in_litres);
  await supplies_model.insertSupplies(packet_id, 2, '', 0, '0000-00-00', qty_in_litres);
  res.redirect('/');
});

router.get('/packet-delete/:sid', async function(req, res, next) {
  var sid     = req.params.sid;
  await supplies_model.deleteSupplies(sid);
  res.redirect('/');
});


module.exports = router;
