function drawGuyTable(table,stack){
	table.empty();
	if(stack==null){
		stack={};
	}
	["name","qty","hit","atk","def"].forEach(function(entry){
		var tr = $("<tr />");
		$("<td />",{
			text:entry
		}).appendTo(tr);
		$("<td />",{
			text:stack[entry]
		}).appendTo(tr);
		tr.appendTo(table);
	})
}

function getRandom(min, max) {
	    return min + Math.floor(Math.random() * (max - min + 1));
}

function getRocks(rockCount){
	var output = [];
	var self = this;
	for(var iter1=0;iter1<rockCount;iter1++){
		var x = getRandom(0,self.width-1);
		var y = getRandom(1,self.height-2);
		output.push([x,y]);
	}
	return output;
}

function drawBattlefield(table,positions){
	var guyTable = $("#guy-table");

	var self = this;
	var listener = function(event){
		var theGuy = null;
		var x = event.target.x;
		var y = event.target.y;
		if(self.location[x] && self.location[x][y]){
			theGuy = self.location[x][y];
		}
		drawGuyTable(guyTable,theGuy);
		$("#grid-table td").removeClass("shaded");
		if(theGuy){
			$("."+theGuy.moveTag).addClass("shaded");
		}
	};

	moves = [];
	Object.keys(self.location).forEach(function(iter1){
		var row = self.location[iter1];
		Object.keys(row).forEach(function(iter2){
			var guy = row[iter2];
			guy.moveTag = "tag-" + moves.length;
			moves.push(self.getMoves([parseInt(iter1),parseInt(iter2)],guy.range,self.getLocationIndexes()))
		})
	})

	for(var iter1=0; iter1<self.width;iter1++){
		var tr = $("<tr />");
		for(var iter2=0; iter2<self.height;iter2++){
			var obj = {};
			var localGuy = null;
			if(positions[iter1] && positions[iter1][iter2]){
				localGuy = positions[iter1][iter2];
				obj.text = localGuy.name;
			}else{
				//obj.text = iter1 + "." + iter2;
			}
			obj.class= "x-" + iter1 + " y-" + iter2;
			
			for(var iter3=0;iter3<moves.length;iter3++){
				if(moves[iter3][iter1][iter2] > 0){
					obj.class+=" tag-"+iter3;
				}
			}
			var td = $("<td />",obj);
			td.click(listener);
			td.prop({x:iter1,y:iter2});
			td.appendTo(tr);

		}
		tr.appendTo(table);
	}
}

function getMoves(start,distance,immobiles){
	var output = [];
	var self = this;
	//Initialize
	for(var iter1=0;iter1<self.width;iter1++){
		output[iter1] = [];
		for(var iter2=0;iter2<self.height;iter2++){
			output[iter1][iter2] = undefined;
		}
	}

	//Place everything you can't pass through
	for(var iter1 = 0; iter1< immobiles.length; iter1++){
		var entry = immobiles[iter1];
		output[entry[0]][entry[1]] = -1;

	}
	output[start[0]][start[1]] = 0;
	//var distance = 10;
	var previousEntries = [start];
	for(var iter1 = 0; iter1<distance; iter1++){
		var currentEntries = [];
		previousEntries.forEach(function(entry){
			var x = entry[0];
			var y = entry[1];
			if(x < self.width-1) currentEntries.push([x+1,y]);
			if(x > 0) currentEntries.push([x-1,y]);
			if(y < self.height-1) currentEntries.push([x,y+1]);
			if(y > 0) currentEntries.push([x,y-1]);
		});
		previousEntries = [];
		for(var iter2=0 ; iter2 < currentEntries.length ; iter2++){
			var entry = currentEntries[iter2];
			var x = entry[0];
			var y = entry[1];
			if(output[x][y] === undefined){
				output[x][y] = iter1+1;
				previousEntries.push(entry);
			}
		}
	}
	//console.log(output);
	return output;
}

function getLocationIndexes(){
	var output = [];
	var self = this;
	Object.keys(self.location).forEach(function(x){
		var row = self.location[x];
		Object.keys(row).forEach(function(y){output.push([x,y])})
	})
	return output;
}

function getLevel(){
	var level = {
		drawBattlefield:drawBattlefield,
		drawGuyTable:drawGuyTable,
		getMoves:getMoves,
		getRocks:getRocks,
		getLocationIndexes:getLocationIndexes,
		width:13,
		height:20,
		name:"Bacon"
	};
	
	level.rocks = level.getRocks(40);

	return level;
}
