package webnvl.utils.node.stage;

import java.io.IOException;

import org.junit.Assert;
import org.junit.Test;

import webnvl.utils.nodes.stage.Animation;

import com.fasterxml.jackson.core.JsonProcessingException;

public class JsonAnimationTest extends JsonTest {
	@Test
	public void animToJsonTest() throws JsonProcessingException {
		Animation anim = new Animation("animtest", "animtest", "testelement");
		
		String result = mapper.writeValueAsString(anim);
		String expected = "{\"id\":\"animtest\",\"name\":\"animtest\",\"element\":\"testelement\"}";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void animFromJsonTest() throws IOException {
		String json = "{\"id\":\"animtest\",\"name\":\"animtest\",\"element\":\"testelement\"}";
		Animation result = mapper.readValue(json, Animation.class);
		
		Animation expected = new Animation("animtest", "animtest", "testelement");
		
		Assert.assertEquals(expected, result);
	}
}
