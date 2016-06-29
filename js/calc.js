
var looseRatio = 0.5;          // 0.5  //  0.5  //    0.5
var returnOfInvestment = 1.8;  // 1.7  //  1.7  //    1.8
var investmentIncrease = 2.25; //   3  //    3  //   2.25
var initialInvestment = 0.1;     //   1  //    1  //      1
var tries = 15;                //  10  //   15  //     20

var simulationRuns = 20;       //  10  //   10  //     20
var rounds = 1000;             // 100  // 1000  //  10000
var capital = 1000;            //   0  //    0  //  10000
var hitsInRound = [];
var moneyInRound = [];
var investmentInRound = [];

function init() {
  hitsInRound = [simulationRuns];
  moneyInRound = [simulationRuns];
  investmentInRound = [simulationRuns];
  for(var i = 0; i < simulationRuns; i++) {
    hitsInRound[i] = [tries];
    moneyInRound[i] = [rounds];
    moneyInRound[i][0] = capital;
    investmentInRound[i] = [rounds];
    for(var j = 0; j <= tries; j++) {
      hitsInRound[i][j] = 0;
    }
  }
}

function calc() {
  for(var l = 0; l < simulationRuns; l++) {
    for(var i = 1; i < rounds; i++) {
      var investment = initialInvestment;
      moneyInRound[l][i] = moneyInRound[l][i-1] - initialInvestment;
      for(var j = 0; j < tries; j++) {
        if(Math.random() >= looseRatio) { // win
          hitsInRound[l][j+1]++;
          var won = (investment * returnOfInvestment);
          moneyInRound[l][i] = Math.round((moneyInRound[l][i] + won) * 1000) / 1000;
          break;
        }
        investment *= investmentIncrease;
        moneyInRound[l][i] -= investment;
      }
      investmentInRound[l][i] = investment;
    }
  }
}

function printWinRatio() {
  var negative = 0;
  for(var i = 0; i < simulationRuns; i++) {
    if(moneyInRound[i][rounds-1] < 0) {
      negative++;
    }
  }
  var positive = simulationRuns - negative;
  console.log("Lost: " + negative + " Success: " + positive);
}

function renderMoneyInRound() {
  var chartData = [simulationRuns];
  for(var i = 0; i < simulationRuns; i++) {
    chartData[i] = {"values": moneyInRound[i]};
  }
  zingchart.render({
    id:'moneyInRound',
    data:{
      "type":"line",
      "series": chartData
    },
    height:400,
    width: 700
  });
}

function renderInvestmentInRound() {
  var chartData = [simulationRuns];
  for(var i = 0; i < simulationRuns; i++) {
    chartData[i] = {"values": investmentInRound[i]};
  }
  zingchart.render({
    id:'investmentInRound',
    data:{
      "type":"bar",
      "series": chartData
    },
    height:400,
    width: 700
  });
}

function renderHitsInRound() {
  var chartData = [simulationRuns];
  for(var i = 0; i < simulationRuns; i++) {
    chartData[i] = {"values": hitsInRound[i]};
  }
  zingchart.render({
    id:'hitsInRound',
    data:{
      "type":"bar",
      "series": chartData
    },
    height:400,
    width: 700
  });
}
