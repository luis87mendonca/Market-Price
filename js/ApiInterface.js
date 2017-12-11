function login(){
	
console.log("******************");
console.log("login");

var username = document.getElementById('username').value;
var pw =  document.getElementById('password').value;
		console.log(username);
		console.log(pw);
var data = new FormData();
data.append("_username", username);
data.append("_password", pw);

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
	
 if (this.readyState === 4) { //Pronto
 if(this.status=200){ //Login correcto
console.log(this.responseText);
console.log(this);

var responseObject = JSON.parse(this.response);

if (responseObject.token) {
	  document.body.innerHTML = "<div class=\"div_main\"><div class=\"div_head\"><div class=\"container_head w-container\"><img src=\"images/logo_mp2.svg\" width=\"177\"></div></div><div class=\"container_main w-container\"><div class=\"div_titulo\"><div class=\"text-block\">Energy price variation</div></div><div class=\"div_highchart\"><input type=\"hidden\" id=\"token\"></input><div id=\"grafico\" style=\"height: 400px; max-width: 800px; margin: 0 auto\"></div></div></div></div><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js\" type=\"text/javascript\"></script><script src=\"js/webflow.js\" type=\"text/javascript\"></script><!-- [if lte IE 9]><script src=\"https://cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js\"></script><![endif] -->";
      document.getElementById('token').value = responseObject.token;
	  
	  getData();
    } else {
      console.log("No token received");
    }
 }}});

xhr.open("POST", "http://staging-services.smartwatt.net/api/auth/login_check");
			
xhr.send(data);

}


function getData(){
	
console.log("******************");
console.log("getData");


var data = null;

//
var xhr = new XMLHttpRequest();
//xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
	  //*******************************
	  //inserção dos dados no gráfico
	  //*******************************
    console.log(this.responseText);
  }
});

var prev_days = 5;

var d = new Date; 


xhr.open("GET", "http://staging-services.smartwatt.net/api/market-price?connection=four_oobs");
//xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//xhr.setRequestHeader("connection", "four_oobs");


console.log(d);

//d.setDate(d.getDate() - prev_days);

console.log(d);


xhr.setRequestHeader("avaliable_date", 1513004982);
xhr.setRequestHeader("prevision_days", 5);
xhr.setRequestHeader("horizon_start", 24);
xhr.setRequestHeader("horizon_end", 48);
xhr.setRequestHeader("Authorization", "Bearer " + document.getElementById('token').value);

//************************************************************************************************************************
//Código criação do gráfico (Highcharts)
//************************************************************************************************************************

//************************************************************************************************************************
//Criação de dados aleatórios para demonstração

function getData(n) {
    var arr = [],
        i,
        a,
        b,
        c,
        spike;
    for (i = 0; i < n; i = i + 1) {
        if (i % 100 === 0) {
            a = 2 * Math.random();
        }
        if (i % 1000 === 0) {
            b = 2 * Math.random();
        }
        if (i % 10000 === 0) {
            c = 2 * Math.random();
        }
        if (i % 50000 === 0) {
            spike = 10;
        } else {
            spike = 0;
        }
        arr.push([
            i,
            2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
        ]);
    }
    return arr;
}
var n = 1000,
    data = getData(n);
//************************************************************************************************************************

//************************************************************************************************************************
//Criação do gráfico em si na div com id = grafico no html

console.time('line');
Highcharts.chart('grafico', {

    chart: {
        zoomType: 'x'
    },

    boost: {
        useGPUTranslations: true
    },

    title: {
        text: 'Highcharts drawing ' + n + ' points'
    },

    subtitle: {
        text: 'Using the Boost module'
    },

    tooltip: {
        valueDecimals: 2
    },

    series: [{
		//Dados para apresentar no gráfico
        data: data,
        lineWidth: 0.5
    }]

});
console.timeEnd('line');
//************************************************************************************************************************


console.log(xhr);
xhr.send(data);

}