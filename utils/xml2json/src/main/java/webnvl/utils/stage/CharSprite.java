package webnvl.utils.stage;

public class CharSprite extends ImgSprite {
//	public static final String type = "charsprite";
	
	public CharSprite() {}
	
	public CharSprite(String id, String name, String path) {
		this.id = id;
		this.name = name;
		this.path = path;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof CharSprite) {
			return super.equals(obj); 
		}
		return false;
	}
}
