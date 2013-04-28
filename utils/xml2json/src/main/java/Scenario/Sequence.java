package Scenario;

import javax.xml.bind.ValidationException;

public class Sequence extends RouteNode {
	public Sequence(Scenario scenario, String id) {
		super(scenario, id);
	}

	@Override
	public void validate() throws ValidationException {
		
	}
}
