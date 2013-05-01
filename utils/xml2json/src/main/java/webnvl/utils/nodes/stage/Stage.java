package webnvl.utils.nodes.stage;

import java.util.List;
import java.util.LinkedList;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@XmlRootElement(name = "stage")
public class Stage {
	@XmlTransient
	public SpriteEvents background = new SpriteEvents();
	@XmlTransient
	public SpriteEvents foreground = new SpriteEvents();
	@XmlTransient
	public AnimationEvents animations = new AnimationEvents();
	
	/*
	 * 
	 */

	@JsonIgnore
	@XmlElementWrapper(name = "background")
	@XmlElements({ 
		@XmlElement(name = "add", type = AddSprite.class),
		@XmlElement(name = "remove", type = RemoveSprite.class) 
	})
	public List<SpriteEvent> getBackgroundXml() {
		if (background.isEmpty())
			return null;
		else
			return background.get();
	}

	public void setBackgroundXml(List<SpriteEvent> events) {
		this.background.set(events);
	}
	
	@XmlTransient
	@JsonProperty("background")
	public SpriteEvents getBackgroundJson() {
		if (background.isEmpty())
			return null;
		else
			return background;
	}

	public void setBackgroundJson(SpriteEvents anims) {
		this.background = anims;
	}
	
	/*
	 * 
	 */
	
	@JsonIgnore
	@XmlElementWrapper(name = "foreground")
	@XmlElements({ 
		@XmlElement(name = "add", type = AddSprite.class),
		@XmlElement(name = "remove", type = RemoveSprite.class) 
	})
	public List<SpriteEvent> getForegroundXml() {
		if (foreground.isEmpty())
			return null;
		else
			return foreground.get();
	}

	public void setForegroundXml(List<SpriteEvent> events) {
		this.foreground.set(events);
	}
	
	@XmlTransient
	@JsonProperty("foreground")
	public SpriteEvents getForegroundJson() {
		if (foreground.isEmpty())
			return null;
		else
			return foreground;
	}

	public void setForegroundJson(SpriteEvents anims) {
		this.foreground = anims;
	}
	
	/*
	 * 
	 */

	@JsonIgnore
	@XmlElementWrapper(name = "animations")
	@XmlElements({ 
		@XmlElement(name = "start", type = Animation.class),
		@XmlElement(name = "stop", type = StopAnimation.class) 
	})
	public List<AnimationEvent> getAnimationsXml() {
		if (animations.isEmpty())
			return null;
		else
			return animations.get();
	}

	public void setAnimationsXml(List<AnimationEvent> events) {
		this.animations.set(events);
	}
	
	@XmlTransient
	@JsonProperty("animations")
	public AnimationEvents getAnimationsJson() {
		if (animations.isEmpty())
			return null;
		else
			return animations;
	}

	public void setAnimationsJson(AnimationEvents anims) {
		this.animations = anims;
	}
}
