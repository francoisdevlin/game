function drawGuyTable(){
	var stack = this.currentGuy;
	var table = $("#guy-table");
	table.empty();
	if(stack==null){
		stack={};
	}
	var tr = $("<tr />");
	$("<td class='icon' colspan='2'/>")
		.append($("<img src='img/"+stack.id+"'.png>").addClass("icon"))
		.appendTo(tr);
	tr.appendTo(table);
	["qty","hit","atk","def"].forEach(function(entry){
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

function drawBattlefield(table){
	table.empty();

	var self = this;
	var listener = function(event){
		var theGuy = null;
		var x = event.target.game.x;
		var y = event.target.game.y;
		if(self.placement[x] && self.placement[x][y]){
			theGuy = self.placement[x][y];
		}
		self.drawGuyTable();
		if(self.mode && self.mode.name=="move"){
			if(event.target.className.match("shaded")){
				var origin = self.mode.origin;
				var guy = self.placement[origin.x][origin.y];
				delete self.placement[origin.x][origin.y];
				if(self.placement[x] === undefined){
					self.placement[x] = {};
				}
				self.placement[x][y] = guy;
				self.drawBattlefield($("#grid-table"));
			}else if(theGuy){
				var origin = self.mode.origin;
				var attacker = self.placement[origin.x][origin.y];
				attack(attacker,theGuy);
				if(theGuy.qty < 1){
					delete self.placement[x][y];
				}
				if(attacker.qty < 1){
					delete self.placement[origin.x][origin.y];
				}
				self.drawBattlefield($("#grid-table"));
			}
			self.mode = null;
		}

		self.setSelectedGuy(theGuy);
	};

	moves = [];
	Object.keys(self.placement).forEach(function(iter1){
		var row = self.placement[iter1];
		Object.keys(row).forEach(function(iter2){
			var guy = row[iter2];
			guy.moveTag = "tag-" + moves.length;
			moves.push(self.getMoves([parseInt(iter1),parseInt(iter2)],guy.range,self.getLocationIndexes()))
		})
	})

	for(var iter1=0; iter1<self.width;iter1++){
		var tr = $("<tr />");
		for(var iter2=0; iter2<self.height;iter2++){
			var coords ={x:parseInt(iter1),y:parseInt(iter2)} ;
			var obj = {};
			obj.class= "x-" + iter1 + " y-" + iter2;
			var td = $("<td />",obj);
			td.click(listener);
			td.prop({game:coords});

			var localGuy = null;
			if(self.placement[iter1] && self.placement[iter1][iter2]){
				localGuy = self.placement[iter1][iter2];
				td.append($("<img src='img/"+localGuy.id+"'.png>")
						.addClass("icon")
						.prop({game:coords})
						);
			}else{
				//obj.text = iter1 + "." + iter2;
			}
			
			for(var iter3=0;iter3<moves.length;iter3++){
				if(moves[iter3][iter1][iter2] > 0){
					td.addClass("tag-"+iter3);
				}
			}
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
	Object.keys(self.placement).forEach(function(x){
		var row = self.placement[x];
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
		width:11,
		height:16,
		setSelectedGuy : function(theGuy){
			$("#grid-table td").removeClass("shaded");
			var self = this;
			if(theGuy){
				var origin = {};
				console.log(self.placement);
				Object.keys(self.placement).forEach(function(x){
					var row = self.placement[x];
					console.log(row);
					Object.keys(row).forEach(function(y){
						if(row[y] == theGuy){
							origin={x:x,y:y};
						}
					})
				})
				$("."+theGuy.moveTag).addClass("shaded");
				self.mode = {
					name:"move",
					origin:origin,
					class:theGuy.moveTag
				};
			}
			self.currentGuy=theGuy;
			self.drawGuyTable();
		}
	};
	
	level.rocks = level.getRocks(40);

	return level;
}
