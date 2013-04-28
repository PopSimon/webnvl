package webnvl.utils.node.stage;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

public abstract class JsonTest {
	public ObjectMapper mapper = new ObjectMapper();
	
	public JsonTest() {
		mapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
	}
}
