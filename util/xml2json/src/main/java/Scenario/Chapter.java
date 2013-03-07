package Scenario;

import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.ValidationException;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Chapter extends RouteNode {
	@JsonIgnore
	public Map<String, Branching> branchings = new HashMap<String, Branching>();
	@JsonIgnore
	public Map<String, Sequence> sequences = new HashMap<String, Sequence>();
	public Map<String, Node> content = new HashMap<String, Node>();
	
	public Chapter(Scenario scenario, String id) {
		super(scenario, id);
	}
	
	@Override
	public void validate() throws ValidationException {
		for (Node n : content.values()) {
			n.validate();
		}
	}
	
	public void addSequence(Sequence seq) {
		this.sequences.put(seq.id, seq);
		this.content.put(seq.id, seq);
	}
	
	public void addBranching(Branching br) {
		this.branchings.put(br.id, br);
		this.content.put(br.id, br);
	}
}
