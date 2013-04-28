package Scenario;

import javax.xml.bind.ValidationException;

public class Branch extends Node {
	
	public String condition;
	public String effect;
	
	public Branch(Scenario scenario, String condition, String effect) {
		super(scenario);
		this.condition = condition;
		this.effect = effect;
	}
	
	@Override
	public void validate() throws ValidationException {
	}
}
