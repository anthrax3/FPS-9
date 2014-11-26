using UnityEngine;
using System.Collections;

public class Top : MonoBehaviour {

	// Use this for initialization
	void Start () {
		Binding.test();
		//Binding.addMapView();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void OnGUI(){

		if(GUI.Button(new Rect(100,100,100,100),"Tap to Start")){
			Application.LoadLevel(1);
		}
	}

		
}
