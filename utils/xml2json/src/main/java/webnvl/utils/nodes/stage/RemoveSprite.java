package webnvl.utils.nodes.stage;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;

import com.fasterxml.jackson.annotation.JsonProperty;

@XmlRootElement(name = "remove")
@XmlSeeAlso(value = SpriteEvent.class)
public class RemoveSprite extends SpriteEvent {
	@XmlElement(name = "sprite", required = true)
	@JsonProperty
	String sprite;
	
	public RemoveSprite() {}
	
	public RemoveSprite(String sprite) {
		super();
		this.sprite = sprite;
	}
	
	public RemoveSprite(String sprite, Animation transition) {
		super(transition);
		this.sprite = sprite;
	}
}
