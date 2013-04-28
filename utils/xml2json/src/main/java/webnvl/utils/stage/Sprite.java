package webnvl.utils.stage;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use=JsonTypeInfo.Id.NAME, include=JsonTypeInfo.As.PROPERTY, property="type")
@JsonSubTypes({
    @Type(value=CharSprite.class,name="charsprite"),
    @Type(value=BgSprite.class,name="bgsprite")
})
public class Sprite {
	public String id;
	
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof Sprite) {
			return id.equals(((Sprite)obj).id);
		}
		return false;
	}
}
