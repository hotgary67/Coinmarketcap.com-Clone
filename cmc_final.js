$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

});


let BASE_URL = "https://api.coingecko.com/api/v3/";
let PRICE_BTC_MCAP = "/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true";
let COINS_MARKET = "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h";
let COINS_LIST = "/coins/list";
let BITCOIN_DOMINANCE = "/global";

let list_all_coins = BASE_URL + COINS_MARKET;
let count_number_of_coin = BASE_URL + COINS_LIST;
let bitcoin_dominance_fetch = BASE_URL + BITCOIN_DOMINANCE;
console.log(list_all_coins)
console.log(count_number_of_coin)
//https://anjandutta.com/extract-data-from-arrays-and-objects-in-javascript/ DIT IS DE PAGINA MET DE COMPLEXERE FOR LOOPS WAARMEE IN INFO KAN HALEN UIT DE ARRAY

$('.qty').each(function() {
  if (parseInt($(this).text()) < 1) {
      $(this).addClass('lowqty');
  }
});

var formatNumber = function (number) {
var splitNum;
number = Math.abs(number);
number = number.toFixed();
splitNum = number.split('.');
splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
return splitNum.join(".");
}

async function listAllCoins() {

    try {
    let dataListAllCoins = await fetch(list_all_coins);
    let dataListAllCoinsJson = await dataListAllCoins.json();
    let htmllistOfAllCoins = dataListAllCoinsJson;

  //[0] !!! HIER MOET IK IETS MEE DOEN, ALS IK [0] WEGHAAL DAN IS HET UNDEFINED, MAAR DAAR ZIT DE TRUUK IK DAT DEEL FIXEN DAN LOOPT IE ALLE NAMEN
  //htmllistOfAllCoins MET DEZE ALS i in ..... KRIJG IK DE NAAM BITCOIN ALLEEN

  var test;

  htmllistOfAllCoins.forEach(function(coin,index){

    $("#myTable").append('<tr> <th scope="row">' +'<span class="tablecontent"> ' + coin.market_cap_rank + '</span>'+ '</th>' +
    '<td class="filterdr">' + '<img src='+coin.image + 'width="18" height="18">' + " " + '<span class="tablecontentbold"> ' + coin.name + '</span>'+'</td>' +
    '<td class="filterMcap">' + '<span class="tablecontent">' +'$' + formatNumber(coin.market_cap) +'</span>'+ '</td>' +
    '<td class="filterPrice">' + '<span class="tablecontent"> ' + '<a href="#">'+ '$' + coin.current_price + '</a>'+'</span>'+'</td>' +
    '<td class="filterVolume">' +'<span class="tablecontent"> ' + '<a href="#">'+ '$' + formatNumber(coin.total_volume) + '</a>'+'</span>'+'</td>' +
    '<td class="filterCSupply">' +'<span class="tablecontent"> ' +  formatNumber(coin.circulating_supply) +  "  " + coin.symbol.toUpperCase() +'</span>'+ '</td>' +
    '<td class="filter24hChange">' +'<span class="tablecontent"> ' +  Math.round(coin.price_change_percentage_24h).toFixed(2)+ '%' +'</span>'+ '</td>' +
    '</tr>');


    $("#coinRank").append(coin.market_cap_rank +'<br>');
    $("#coinNames").append('<img src='+coin.image + 'width="18" height="18">' + " " + coin.name +'<br>');
    $("#coinMcap").append('$' + coin.market_cap +'<br>');
    $("#coinPrice").append('$' +coin.current_price +'<br>');
    $("#coin24Volume").append('$' +coin.total_volume +'<br>');
    $("#circulatingSupply").append(coin.circulating_supply +  "  " + coin.symbol.toUpperCase() + '<br>');
    $("#24HourChange").append( Math.round(coin.price_change_percentage_24h).toFixed(2)+ '%' +'<br>');
    $("#coinSymbol").append(coin.symbol + '%' +'<br>');

    //$("#priceGraph7d").append(..... +'<br>');

// start filter market cap function
//      marketCapList = coin.market_cap

//  function filterMarketCap(mCap) {
//      return mCap >=248159266;


//    function myFunction() {
//    document.getElementById("demo").innerHTML = ages.filter(checkAdult);
//  }

//  function getFilteredMarketCapData() {
//    var x = document.getElementById("lowamount","highamount");
//    var text = "";
//    var i;
//    for (i = 0; i < x.length ;i++) {
//      text += x.elements[i].value + "<br>";
//    }
//  document.getElementById("demo").innerHTML = text;
//    }

//      console.log(filterMarketCap(marketCapList))

    // end filter market cap function
});

  let dataNumberOfCoins = await fetch(count_number_of_coin);
  let dataNumberOfCoinsJson = await dataNumberOfCoins.json();
  let htmlaNumberOfCoins = dataNumberOfCoinsJson;
  console.log(htmlaNumberOfCoins);

  var count = Object.keys(htmlaNumberOfCoins).length;
   console.log(count);

  $("#numberOfCoins").html('<a href="LINKTOALLCOINS">' + formatNumber(count) + '</a>');

let bitcoin_dominance = await fetch(bitcoin_dominance_fetch);
let bitcoin_dominance_Json = await bitcoin_dominance.json();
let bitcoin_dominance_final = bitcoin_dominance_Json;
var btc_dominance = bitcoin_dominance_final.data.market_cap_percentage.btc;
var btc_number_of_markets = bitcoin_dominance_final.data.markets;
var btc_24_hour_volume = Math.round(bitcoin_dominance_final.data.total_volume.usd);
var btc_total_market_cap = Math.round(bitcoin_dominance_final.data.total_market_cap.usd);
var btc_dominance_rounded = Math.round(btc_dominance).toFixed(1)
console.log(btc_dominance_rounded);


$("#bitcoinDominance").html('<a href="LINKTOBTCDOMINANCE">' + btc_dominance_rounded +'%' + '</a>');
$("#numberofMarkets").html('<a href="LINKTOMARKETS">' + btc_number_of_markets + '</a>');
$("#totalMarketCap").html('$' + '<a href="LINKTOTOTALMARKETCAP">' + formatNumber(btc_total_market_cap) + '</a>');
$("#total24HourVolume").html('$' + '<a href="LINKTOTOTOTAL24HOURVOLUME">' + formatNumber(btc_24_hour_volume) + '</a>');
} catch(err) {
        $("#price").html("Some Error(s)!!!" + err)
        console.log(err)
      }
}

listAllCoins();

/*
   Willmaster Table Sort
   Version 1.1
   August 17, 2016
   Updated GetDateSortingKey() to correctly sort two-digit months and days numbers with leading 0.
   Version 1.0, July 3, 2011

   Will Bontrager
   https://www.willmaster.com/
   Copyright 2011,2016 Will Bontrager Software, LLC

   This software is provided "AS IS," without
   any warranty of any kind, without even any
   implied warranty such as merchantability
   or fitness for a particular purpose.
   Will Bontrager Software, LLC grants
   you a royalty free license to use or
   modify this software provided this
   notice appears on all copies.
*/
//
// One placed to customize - The id value of the table tag.

var TableIDvalue = "myTable";

//
//////////////////////////////////////
var TableLastSortedColumn = -1;
function sortTable() {
var sortColumn = parseInt(arguments[0]);
var type = arguments.length > 1 ? arguments[1] : 'T';
var dateformat = arguments.length > 2 ? arguments[2] : '';
var table = document.getElementById(TableIDvalue);
var tbody = table.getElementsByTagName("tbody")[0];
var rows = tbody.getElementsByTagName("tr");
var arrayOfRows = new Array();
type = type.toUpperCase();
dateformat = dateformat.toLowerCase();
for(var i=0, len=rows.length; i<len; i++) {
	arrayOfRows[i] = new Object;
	arrayOfRows[i].oldIndex = i;
	var celltext = rows[i].getElementsByTagName("td")[sortColumn].innerHTML.replace(/<[^>]*>/g,"");
	if( type=='D' ) { arrayOfRows[i].value = GetDateSortingKey(dateformat,celltext); }
	else {
		var re = type=="N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
		arrayOfRows[i].value = celltext.replace(re,"").substr(0,25).toLowerCase();
		}
	}
if (sortColumn == TableLastSortedColumn) { arrayOfRows.reverse(); }
else {
	TableLastSortedColumn = sortColumn;
	switch(type) {
		case "N" : arrayOfRows.sort(CompareRowOfNumbers); break;
		case "D" : arrayOfRows.sort(CompareRowOfNumbers); break;
		default  : arrayOfRows.sort(CompareRowOfText);
		}
	}
var newTableBody = document.createElement("tbody");
for(var i=0, len=arrayOfRows.length; i<len; i++) {
	newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
	}
table.replaceChild(newTableBody,tbody);
} // function SortTable()

function CompareRowOfText(a,b) {
var aval = a.value;
var bval = b.value;
return( aval == bval ? 0 : (aval > bval ? 1 : -1) );
} // function CompareRowOfText()

function CompareRowOfNumbers(a,b) {
var aval = /\d/.test(a.value) ? parseFloat(a.value) : 0;
var bval = /\d/.test(b.value) ? parseFloat(b.value) : 0;
return( aval == bval ? 0 : (aval > bval ? 1 : -1) );
} // function CompareRowOfNumbers()

function GetDateSortingKey(format,text) {
if( format.length < 1 ) { return ""; }
format = format.toLowerCase();
text = text.toLowerCase();
text = text.replace(/^[^a-z0-9]*/,"");
text = text.replace(/[^a-z0-9]*$/,"");
if( text.length < 1 ) { return ""; }
text = text.replace(/[^a-z0-9]+/g,",");
var date = text.split(",");
if( date.length < 3 ) { return ""; }
var d=0, m=0, y=0;
for( var i=0; i<3; i++ ) {
	var ts = format.substr(i,1);
	if( ts == "d" ) { d = date[i]; }
	else if( ts == "m" ) { m = date[i]; }
	else if( ts == "y" ) { y = date[i]; }
	}
d = d.replace(/^0/,"");
if( d < 10 ) { d = "0" + d; }
if( /[a-z]/.test(m) ) {
	m = m.substr(0,3);
	switch(m) {
		case "jan" : m = String(1); break;
		case "feb" : m = String(2); break;
		case "mar" : m = String(3); break;
		case "apr" : m = String(4); break;
		case "may" : m = String(5); break;
		case "jun" : m = String(6); break;
		case "jul" : m = String(7); break;
		case "aug" : m = String(8); break;
		case "sep" : m = String(9); break;
		case "oct" : m = String(10); break;
		case "nov" : m = String(11); break;
		case "dec" : m = String(12); break;
		default    : m = String(0);
		}
	}
m = m.replace(/^0/,"");
if( m < 10 ) { m = "0" + m; }
y = parseInt(y);
if( y < 100 ) { y = parseInt(y) + 2000; }
return "" + String(y) + "" + String(m) + "" + String(d) + "";
} // function GetDateSortingKey()








//https://www.oreilly.com/library/view/javascript-cookbook/9781449390211/ch05.html  HANDIGE BESCRIJVING VERSCHILLENDE LOOPS OOK OVER MULTR
