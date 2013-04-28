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
        @XmlElement(name="bgsprite", type = BgSprite.class)
    })
	public List<Sprite> background = new LinkedList<Sprite>();
	@XmlElementWrapper(name = "foreground")
	@XmlElements({
        @XmlElement(name="charsprite", type = BgSprite.class)
    })
	public List<Sprite> foreground = new LinkedList<Sprite>();
	@XmlElementWrapper(name = "animations")
	@XmlElements({
        @XmlElement(name="animation", type = Animation.class)
    })
	public List<Animation> animations = new LinkedList<Animation>();
}
