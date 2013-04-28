package Scenario;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.ValidationException;

public class Scenario extends Node {
	
	public Map<String, Chapter> chapters = new HashMap<String, Chapter>();
	
	public Scenario() {
		super(null);
		scenario = this;
	}
	
	@Override
	public void validate() throws ValidationException {
		for (Chapter c : chapters.values()) {
			c.validate();
		}
	}
}
