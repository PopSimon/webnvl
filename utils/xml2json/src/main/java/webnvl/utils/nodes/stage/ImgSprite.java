package webnvl.utils.nodes.stage;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlSeeAlso;


@XmlSeeAlso(Sprite.class)
public class ImgSprite extends Sprite {
	@XmlAttribute
	public String name;
	@XmlAttribute
	public String path;
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof ImgSprite) {
			ImgSprite sprite = (ImgSprite) obj;
			return super.equals(obj) && name.equals(sprite.name) && path.equals(sprite.path); 
		}
		return false;
	}
}
