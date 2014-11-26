using UnityEngine;
using System.Runtime.InteropServices;
public class Binding {
	[DllImport("__Internal")]
	private static extern void test_ ();
	public static void test () {
		if (Application.platform != RuntimePlatform.OSXEditor) {
			test_();
		}
	}
/*
	[DllImport("__Internal")]
	private static extern void _addMapView();


	public static void addMapView(){
		if (Application.platform != RuntimePlatform.OSXEditor) {
			_addMapView();
		}
	}
*/
}
