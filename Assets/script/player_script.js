#pragma strict

private var grounded = false;
var speed = 1;
var maxVelocityChange = 3.0;
var canJump = true;
var gravity = 10.0;
var sensitivity = 50.0;
var jumpHeight = 2.0;
var targetVelocity : Vector3;
@script RequireComponent(Rigidbody, CapsuleCollider)

function Awake(){
	rigidbody.freezeRotation = true;
	rigidbody.useGravity = false;

}


function FixedUpdate(){
	var hit : RaycastHit;
	for(var touch:Touch in Input.touches){
		if(touch.phase == TouchPhase.Began || touch.phase == TouchPhase.Stationary){
			var ray = Camera.main.ScreenPointToRay(touch.position);
			if(Physics.Raycast(ray.origin, ray.direction, hit, Mathf.Infinity)){
				if(hit.transform.gameObject.tag=="Top Button"){
					transform.Translate(Vector3.forward*Time.deltaTime*speed);
					Debug.Log(Vector3.forward);
				}		
			}
			if(Physics.Raycast(ray.origin, ray.direction, hit, Mathf.Infinity)){
				if(hit.transform.gameObject.tag=="Bottom Button"){
					transform.Translate(Vector3.back*Time.deltaTime*speed);
				}		
			}
			if(Physics.Raycast(ray.origin, ray.direction, hit, Mathf.Infinity)){
				if(hit.transform.gameObject.tag=="Left Button"){
					transform.Rotate(0,-1 * sensitivity * Time.deltaTime,0);
				}		
			}
			if(Physics.Raycast(ray.origin, ray.direction, hit, Mathf.Infinity)){
				if(hit.transform.gameObject.tag=="Right Button"){
					transform.Rotate(0, 1 * sensitivity * Time.deltaTime,0);
				}		
			}
								//Apply a force that attempts to reach our target Velocity
/*			var velocity = rigidbody.velocity;
			var velocityChange = (targetVelocity - velocity);
			Debug.Log(velocity);
			Debug.Log(velocityChange);
			Debug.Log(targetVelocity);
			velocityChange.x = Mathf.Clamp(velocityChange.x, - maxVelocityChange, maxVelocityChange);
			velocityChange.z = Mathf.Clamp(velocityChange.z, - maxVelocityChange, maxVelocityChange);
			velocityChange.y = 0;
			Debug.Log(velocityChange.x);
			Debug.Log(velocityChange.z);
			rigidbody.AddForce(velocityChange, ForceMode.VelocityChange);
*/
		}
	}
/*	transform.Rotate(0,Input.GetAxis("Horizontal") * sensitivity * Time.deltaTime,0);
	if(grounded){
		//Calculate how fast we should be moving
		if(transform.position.x>=22){
			targetVelocity = Vector3(0,0,0);
			transform.position.x=21.8;
			return;
		}else if(transform.position.z>=22){
			targetVelocity = Vector3(0,0,0);
			transform.position.z=21.8;
						return;
		}else if(transform.position.x<=-22){
			targetVelocity = Vector3(0,0,0);
			transform.position.x=-21.8;
						return;
		}else if(transform.position.z<=-22){
			targetVelocity = Vector3(0,0,0);
			transform.position.z=-21.8;
						return;
		}else{
			targetVelocity = Vector3(0,0,Input.GetAxis("Vertical"));
		}
		targetVelocity = transform.TransformDirection(targetVelocity);
		targetVelocity *= speed;
		
		//Apply a force that attempts to reach our target Velocity
		var velocity = rigidbody.velocity;
		var velocityChange = (targetVelocity - velocity);
		velocityChange.x = Mathf.Clamp(velocityChange.x, - maxVelocityChange, maxVelocityChange);
		velocityChange.z = Mathf.Clamp(velocityChange.z, - maxVelocityChange, maxVelocityChange);
		velocityChange.y = 0;
		rigidbody.AddForce(velocityChange, ForceMode.VelocityChange);
		
		//Jump
		if(canJump && Input.GetButton("Jump")){
			rigidbody.velocity = Vector3(velocity.x, CalculateJumpVerticalSpeed(), velocity.z);
		}
	}
*/	
	//We apply gravity manually for more tuning control
	rigidbody.AddForce(Vector3(0, -gravity * rigidbody.mass, 0));
	
	grounded = false;
}

function OnCollisionStay(){
	grounded = true;
}


function CalculateJumpVerticalSpeed(){
	return Mathf.Sqrt(2 * jumpHeight * gravity);
}
