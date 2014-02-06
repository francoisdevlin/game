function strike(attacker,target){
	var diff = attacker.atk - target.def;
	var damage = attacker.qty * attacker.hit * attacker.atk / target.def;
	var mult = 1 - (0.5 * Math.random());
	damage *= mult;
	var isCrit = Math.random() < attacker.crit;
	if(isCrit){
		console.log("Critical hit!");
		damage *= 2;
	}
	console.log("Damage Dealt:");
	console.log(damage);
	var menLost = Math.floor(damage/target.hit);
	console.log(menLost);
	target.qty -= menLost;
}

function attack(attacker,target){
	strike(attacker,target);
	if(target.qty<=0){
		console.log("Target is dead");
		return;
	}
	if(target.counters>0){
		strike(target,attacker);
	}
	if(!target.alwaysCounter){
		target.counters--;
	}
	if(attacker.qty<=0){
		console.log("Attacker is dead");
		return;
	}

}

