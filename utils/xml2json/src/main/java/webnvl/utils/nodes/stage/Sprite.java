package webnvl.utils.nodes.stage;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "sprite")
public class Sprite {
	@XmlAttribute
	public String id;
	@XmlAttribute
	public String type;
	@XmlAttribute
	public String name;
	@XmlAttribute
	public String path;
	
	public Sprite() {}
	
	public Sprite(String id, String type, String name, String path) {
		this.id = id;
		this.type = type;
		this.name = name;
		this.path = path;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof Sprite) {
			Sprite sprite = (Sprite) obj;
			return id.equals(sprite.id) && name.equals(sprite.name) && path.equals(sprite.path);
		}
		return false;
	}
}
