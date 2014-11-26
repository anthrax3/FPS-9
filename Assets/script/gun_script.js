#pragma strict

public enum GunType{Automatic, SemiAutomatic, ShotGun, BurstFire};
var type : GunType;

var Sparks : Transform;
var Flash : Transform;
var player : GameObject;
var damage : float = 1;
var spread : float = 50.0;
var recoil : float = 4.0;
var weight : float = 1.0;

var fireRate : float = 0.1;
var fireRateShotGun : float = 0.5;
var fireRateBurst : float = 1;

var MagSize : int;
var ammo : int;
var numberOfShot : int = 10;

private var mag : int;
private var nextFire : float = 0.0;
private var sparkArray : Transform[];
private var bulletLeft : int;
private var nextShot : float = 0.0;

private var zAdd = 0.0;
private var dampX = 3.0;
private var dampY = 3.0;
private var dampZ = 3.0;
private var lockPosition : Vector3;

function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
	sparkArray = new Transform[numberOfShot];
	for(var i=0; i<sparkArray.Length ; i++){
		sparkArray[i] = Instantiate(Sparks, Sparks.position, Sparks.rotation);
	}
	lockPosition = transform.localPosition;
	bulletLeft = numberOfShot;
}

function Update () {
	transform.localPosition.x = Mathf.SmoothDamp(transform.localPosition.x, lockPosition.x, dampX, weight/20.5);
	transform.localPosition.y = Mathf.SmoothDamp(transform.localPosition.y, lockPosition.y, dampY, weight/20.5);
	transform.localPosition.z = Mathf.SmoothDamp(transform.localPosition.z, lockPosition.z - zAdd, dampZ, weight/20.5);
	switch(type){
		case GunType.Automatic :
			if(Input.GetButton("Fire1")){	
				if(Time.time > nextFire){
					nextFire = Time.time + fireRate;
					FireA();
				}else{
					zAdd = 0.0;
				}
			}else{
				Flash.particleSystem.Stop();
				Sparks.particleSystem.Stop();			
			}
			break;
		case GunType.SemiAutomatic :
			if(Input.GetButtonUp("Fire1")){			
				if(Time.time > nextFire){
					nextFire = Time.time + fireRate;
					FireA();
				}else{
					zAdd = 0.0;
				}
			}else{
				Flash.particleSystem.Stop();
				Sparks.particleSystem.Stop();				
			}
			break;
		case GunType.ShotGun :
			if(Input.GetButton("Fire1")){
				if(Time.time > nextFire){
					nextFire = Time.time + fireRateShotGun;
					FireShotGun();
				}else{
					zAdd = 0.0;
				}
			}else{
				Flash.particleSystem.Stop();
				for(var i = 0;i<sparkArray.Length; i++){
					sparkArray[i].particleSystem.Stop();
				}
			}
			break;
		case GunType.BurstFire :
			if(Input.GetButton("Fire1") && Time.time > nextFire && bulletLeft <=0){
					nextFire = Time.time + fireRateBurst*numberOfShot;
					bulletLeft = numberOfShot;
					zAdd = 0.0;
			}
			if(Input.GetButton("Fire1") && bulletLeft >0){		
				if(Time.time > nextFire){
					FireBurst();	
				}
			}else{
				Flash.particleSystem.Stop();
				Sparks.particleSystem.Stop();			
			}
			break;
	}
}

function FireBurst(){
	if(bulletLeft > 0){
		if(Time.time > nextShot){
			nextShot = Time.time + fireRateBurst;
			FireA();
			bulletLeft--;
		}else{
			zAdd = 0.0;
		}
	}else{
		Flash.particleSystem.Stop();
	}
}


function FireShotGun(){
	for(var i = 0;i<sparkArray.Length; i++){
		var hit : RaycastHit;
		var bulletDirection  = transform.TransformDirection(new Vector3(Random.Range(-spread,spread)*0.002, Random.Range(-spread,spread)*0.001,1));
		if(Physics.Raycast(transform.position, bulletDirection, hit, Mathf.Infinity)){
			if(hit.transform.gameObject.tag=="Enemy"){
				player.transform.SendMessage("giveDamage", damage, SendMessageOptions.DontRequireReceiver);
			}
			sparkArray[i].position = hit.point;
			sparkArray[i].particleSystem.Play();
		}
	}
	Flash.particleSystem.Play();
	zAdd = recoil;
	mag--;	
}


function FireA(){
	var hit : RaycastHit;
	var bulletDirection  = transform.TransformDirection(new Vector3(Random.Range(-spread,spread)*0.002, Random.Range(-spread,spread)*0.001,1));
	Flash.particleSystem.Play();
	
	if(Physics.Raycast(transform.position, bulletDirection, hit, Mathf.Infinity)){
		if(hit.transform.gameObject.tag=="Enemy"){
			player.transform.SendMessage("giveDamage", damage, SendMessageOptions.DontRequireReceiver);
		}
		Sparks.position = hit.point;
		Sparks.particleSystem.Play();
	}
	zAdd = recoil;
	mag--;
}