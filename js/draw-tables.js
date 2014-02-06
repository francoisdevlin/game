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

function drawBattlefield(table,positions){
	var guyTable = $("#guy-table");

	function clickListener(localGuy){
		return function(){
			drawGuyTable(guyTable,localGuy);
		};
	}

	for(var iter1=0; iter1<10;iter1++){
		var tr = $("<tr />");
		for(var iter2=0; iter2<10;iter2++){
			var obj = {};
			var localGuy = null;
			if(positions[iter1] && positions[iter1][iter2]){
				localGuy = positions[iter1][iter2];
				obj.text = localGuy.name;
			}else{
				//obj.text = iter1 + "." + iter2;
			}
			var td = $("<td />",obj);
			td.click(clickListener(localGuy));
			td.appendTo(tr);

		}
		tr.appendTo(table);
	}
}

