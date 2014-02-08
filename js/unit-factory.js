var baseStats = {
	dragon:{
		name:"Dragon",
		crit:0.15,
		hit:100,
		atk:20,
		def:18,
		range:8,
		counters:1
	},
	rock:{
		name:"Rock",
		crit:0.05,
		hit:1000,
		atk:20,
		def:50,
		range:0,
		counters:0
	},
	peasant:{
		name:"Peasant",
		crit:0.05,
		hit:5,
		atk:3,
		def:2,
		range:3,
		counters:1
	},
	gargoyle:{
		name:"Gargoyle",
		crit:0.05,
		hit:10,
		atk:6,
		def:6,
		range:4,
		counters:1
	},
}

function factory(name){
	var obj = baseStats[name];
	obj.id = name;
	return obj;
}

function getStack(name,qty){
	var stack = factory(name);
	stack.qty = qty;
	return stack;
}


