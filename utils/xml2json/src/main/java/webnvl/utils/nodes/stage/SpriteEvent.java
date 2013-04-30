package webnvl.utils.nodes.stage;

import javax.xml.bind.annotation.XmlElement;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
  @Type(value = AddSprite.class, name = "add"),
  @Type(value = RemoveSprite.class, name = "remove")
})
public class SpriteEvent {
	@XmlElement(name = "transition", required = false)
	@JsonProperty
	Animation transition;
	
	public SpriteEvent() {}
	
	public SpriteEvent(Animation transition) {
		this.transition = transition;
	}
}
