package webnvl.utils.nodes.stage;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import javax.xml.bind.annotation.XmlTransient;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class SpriteEvents {
	@XmlTransient
	public List<AddSprite> add = new ArrayList<AddSprite>();
	@XmlTransient
	public List<RemoveSprite> remove = new ArrayList<RemoveSprite>();
	
	@XmlTransient
	public List<AddSprite> getAdd() {
		if (add.isEmpty())
			return null;
		else
			return add;
	}

	public void setStart(List<AddSprite> add) {
		this.add = add;
	}
	
	@XmlTransient
	public List<RemoveSprite> getRemove() {
		if (remove.isEmpty())
			return null;
		else
			return remove;
	}

	public void setRemove(List<RemoveSprite> remove) {
		this.remove = remove;
	}
	
	@JsonIgnore
	public boolean isEmpty() {
		return add.isEmpty() && remove.isEmpty();
	}
	
	@JsonIgnore
	public List<SpriteEvent> get() {
		List<SpriteEvent> result = new LinkedList<SpriteEvent>();
		result.addAll(add);
		result.addAll(remove);
		return result;
	}
	
	public void set(List<SpriteEvent> events) {
		for (SpriteEvent e : events) {
			if (e instanceof AddSprite) {
				add.add((AddSprite)e);
			}
			if (e instanceof RemoveSprite) {
				remove.add((RemoveSprite)e);
			}
		}
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof SpriteEvents) {
			SpriteEvents evts = (SpriteEvents)obj;
			return (add == evts.add || add.equals(evts.add)) && (remove == evts.remove || remove.equals(evts.remove));
		}
		return false;
	}
}
