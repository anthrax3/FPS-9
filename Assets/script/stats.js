var MaxHealth = 100.0;
var health = MaxHealth;
var enemyHealth = 30;

private var timer = 0.0;

var regenTime = 10.0;
var regenSpeed = 1.0;
var Enemy : GameObject;
var damagedEffect : Transform;
var nextDamageParticle : float;

function Start(){
	Enemy = GameObject.FindGameObjectWithTag("Enemy");
}
function Update(){
	if(health<=0){
		die();
	}
	if(health > MaxHealth){
		health = MaxHealth;
	}
	if(health < MaxHealth){
		if(timer<regenTime){
			timer+=0.1;
		}else{
			health += regenSpeed/10;
		}
	}else{
		timer = 0.0;
	}
	
	if(enemyHealth<=0){
		Destroy(Enemy);
		Application.LoadLevel(0);
	}
}

function OnGUI(){
	GUI.Label(Rect(0,0,100,30),"HP " + health);
	GUI.Label(Rect(100,0,100,30),"enemy HP " + enemyHealth);
		
}

function ApplyDamage(enemyDamage : float){
	health -= enemyDamage;
	damagedEffect.particleSystem.Play();
}

function giveDamage(damage : float){
	enemyHealth -= damage;	
}

function die(){
	Application.LoadLevel(0);
}