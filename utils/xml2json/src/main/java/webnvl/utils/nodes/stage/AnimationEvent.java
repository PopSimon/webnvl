package webnvl.utils.nodes.stage;

import javax.xml.bind.annotation.XmlAttribute;

public class AnimationEvent {
	@XmlAttribute
	public String id;
	@XmlAttribute
	public String delay;
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof AnimationEvent) {
			AnimationEvent anim = (AnimationEvent)obj;
			return (id == anim.id || id.equals(anim.id)) && (delay == anim.delay || delay.equals(anim.delay));
		}
		return false;
	}
}
