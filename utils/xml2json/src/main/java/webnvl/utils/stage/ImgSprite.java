package webnvl.utils.stage;

public class ImgSprite extends Sprite {
	public String name;
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
