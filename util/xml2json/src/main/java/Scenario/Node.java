package Scenario;

import javax.xml.bind.ValidationException;

public abstract class Node {
	public Scenario scenario;
	
	public Node(Scenario scenario) {
		this.scenario = scenario;
	}
	
	public abstract void validate() throws ValidationException;
}
