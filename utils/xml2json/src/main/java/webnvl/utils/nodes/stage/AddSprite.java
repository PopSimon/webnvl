package webnvl.utils.nodes.stage;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;

import com.fasterxml.jackson.annotation.JsonProperty;

@XmlRootElement(name = "add")
@XmlSeeAlso(value = SpriteEvent.class)
public class AddSprite extends SpriteEvent {
	@XmlElement(name = "sprite", required = true)
	@JsonProperty
	Sprite sprite;
	
	public AddSprite() {}
	
	public AddSprite(Sprite sprite) {
		super();
		this.sprite = sprite;
	}
	
	public AddSprite(Sprite sprite, Animation transition) {
		super(transition);
		this.sprite = sprite;
	}
}
