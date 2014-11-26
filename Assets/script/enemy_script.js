#pragma strict

var player : GameObject;
var distance : float;
var range : float = 15;
var delta : Vector3;
var hitRange : float = 2.5;
var rotationSpeed : float = 5;
var damageTimer : float = 0;
var speed : float = 0.2;
var enemyDamage : float = 10;

function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	distance = Vector3.Distance(transform.position, player.transform.position);
	if(distance<=range){
		MoveTowards();
		RotateTowards();
		AttackPlayer();
	}
}

function MoveTowards(){
	delta = player.transform.position - transform.position;
	delta.Normalize();
	delta.y = 0;
	if(distance<=hitRange){
		return;
	}
	var moveSpeed = speed * Time.deltaTime;
	transform.position = transform.position + (delta * moveSpeed);
}

function RotateTowards(){
	transform.rotation = Quaternion.RotateTowards(transform.rotation,Quaternion.LookRotation(delta),rotationSpeed);
	transform.rotation = Quaternion.Euler(0,transform.eulerAngles.y,0);
}

function AttackPlayer(){
	damageTimer += Time.deltaTime;
	if(distance < hitRange && damageTimer > 1.5){
		damageTimer = 0;
		player.SendMessageUpwards("ApplyDamage", enemyDamage, SendMessageOptions.DontRequireReceiver);
	}
}