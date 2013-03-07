package Scenario;

import javax.xml.bind.ValidationException;

public class Option extends Node {

	public String text;
	public String effect;
	public String id;
	
	public Option(Scenario scenario, String id, String text, String effect) {
		super(scenario);
		this.id = id;
		this.text = text;
		this.effect = effect;
	}

	@Override
	public void validate() throws ValidationException {
		// TODO Auto-generated method stub
		
	}

}
