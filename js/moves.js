function getTurnOrder(start,units){
	var moves = [];
	units.forEach(function(unit){
		for(var iter1 = 1; iter1 < 10; iter1++){
			moves.push([iter1*25/unit.init,unit]);
		}
	});
	moves.sort(turnSorter);
	return moves;
}

function turnSorter(a,b){
	var tA = a[0];
	var tB = b[0];
	if(tA<tB){
		return -1;
	}
	if(tA>tB){
		return 1;
	}
	return 0;
}

function drawTurnOrder(turnTable,moves){
	var tr = $("<tr>");
	turnTable.append(tr);
	moves.forEach(function(entry){
		var unit = entry[1];
		var td = $("<td>");
		td.append($("<img src='img/"+unit.id+"'.png>")
		.addClass("icon"));
		tr.append(td);
	});
}
