package webnvl.utils.nodes.stage;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import javax.xml.bind.annotation.XmlTransient;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class AnimationEvents {
	@XmlTransient
	public List<Animation> start = new ArrayList<Animation>();
	@XmlTransient
	public List<StopAnimation> stop = new ArrayList<StopAnimation>();
	
//	@XmlElementWrapper(name = "start")
	@XmlTransient
	public List<Animation> getStart() {
		if (start.isEmpty())
			return null;
		else
			return start;
	}

	public void setStart(List<Animation> start) {
		this.start = start;
	}
	
//	@XmlElementWrapper(name = "stop")
	@XmlTransient
	public List<StopAnimation> getStop() {
		if (stop.isEmpty())
			return null;
		else
			return stop;
	}

	public void setStop(List<StopAnimation> stop) {
		this.stop = stop;
	}
	
	@JsonIgnore
	public boolean isEmpty() {
		return start.isEmpty() && stop.isEmpty();
	}
	
	@JsonIgnore
	public List<AnimationEvent> get() {
		List<AnimationEvent> result = new LinkedList<AnimationEvent>();
		result.addAll(start);
		result.addAll(stop);
		return result;
	}
	
	public void set(List<AnimationEvent> anims) {
		for (AnimationEvent e : anims) {
			if (e instanceof Animation) {
				start.add((Animation)e);
			}
			if (e instanceof StopAnimation) {
				stop.add((StopAnimation)e);
			}
		}
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof AnimationEvents) {
			AnimationEvents anims = (AnimationEvents)obj;
			return (start == anims.start || start.equals(anims.start)) && (stop == anims.stop || stop.equals(anims.stop));
		}
		return false;
	}
}
