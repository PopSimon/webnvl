package webnvl.utils.nodes.stage;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;

@XmlRootElement(name = "bgsprite")
@XmlSeeAlso(ImgSprite.class)
public class BgSprite extends ImgSprite {
//	public static final String type = "bgsprite";
	
	public BgSprite() {}
	
	public BgSprite(String id, String name, String path) {
		this.id = id;
		this.name = name;
		this.path = path;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof BgSprite) {
			return super.equals(obj); 
		}
		return false;
	}
}
