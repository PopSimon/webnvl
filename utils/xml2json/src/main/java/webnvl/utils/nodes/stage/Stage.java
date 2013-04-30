package webnvl.utils.nodes.stage;

import java.util.List;
import java.util.LinkedList;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "stage")
public class Stage {
	@XmlElementWrapper(name = "background")
	@XmlElements({
        @XmlElement(name="add", type = AddSprite.class),
        @XmlElement(name="remove", type = RemoveSprite.class)
    })
	public List<SpriteEvent> background = new LinkedList<SpriteEvent>();
	@XmlElementWrapper(name = "foreground")
	@XmlElements({
        @XmlElement(name="add", type = AddSprite.class),
        @XmlElement(name="remove", type = RemoveSprite.class)
    })
	public List<SpriteEvent> foreground = new LinkedList<SpriteEvent>();
	@XmlElementWrapper(name = "animations")
	@XmlElements({
        @XmlElement(name="animation", type = Animation.class)
    })
	public List<Animation> animations = new LinkedList<Animation>();
}
