package Scenario;

public abstract class RouteNode extends Node {
	public String id;
	
	public RouteNode(Scenario scenario, String id) {
		super(scenario);
		this.id = id;
	}
}
