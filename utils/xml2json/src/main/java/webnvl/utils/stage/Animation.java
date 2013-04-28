package webnvl.utils.stage;

public class Animation {
	public String id;
	public String name;
	public String element;
	public String duration;
	public String itercount;
	
	public Animation() {}
	
	public Animation(String id, String name, String element) {
		this.id = id;
		this.name = name;
		this.element = element;
	}
	
	public Animation(String id, String name, String element, String duration, String itercount) {
		this(id, name, element);
		this.duration = duration;
		this.itercount = itercount;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof Animation) {
			Animation anim = (Animation)obj;
			return id.equals(anim.id) && name.equals(anim.name) && element.equals(anim.element);
		}
		return false;
	}
}
