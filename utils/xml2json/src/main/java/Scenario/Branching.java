package Scenario;

import java.util.LinkedList;
import java.util.List;

import javax.xml.bind.ValidationException;

public class Branching extends RouteNode {
	
	public List<Branch> branches = new LinkedList<Branch>();

	public Branching(Scenario scenario, String id) {
		super(scenario, id);
	}
	
	@Override
	public void validate() throws ValidationException {
		if (branches.size() < 2) {
			throw new ValidationException("branching " + this.id + " has no sufficient branches (at least 2 is needed)");
		}
		
		for (Branch b : branches) {
			b.validate();
		}
		
		if(branches.get(branches.size()).condition != null) {
			throw new ValidationException("No default branch in branching " + this.id + " (the last branch is default, must have no condition)")
		}
	}

}
