package Scenario;

import java.util.Map;
import java.util.TreeMap;

import javax.xml.bind.ValidationException;

public class Selection extends InteractionNode {
	
	public Map<String, Option> options = new TreeMap<String, Option>();

	public Selection(Scenario scenario) {
		super(scenario);
	}

	@Override
	public void validate() throws ValidationException {
		for (Option o : options.values()) {
			o.validate();
		}
	}

}
