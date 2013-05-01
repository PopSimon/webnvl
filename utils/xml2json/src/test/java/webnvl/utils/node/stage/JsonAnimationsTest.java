package webnvl.utils.node.stage;

import java.io.IOException;

import org.junit.Assert;
import org.junit.Test;

import webnvl.utils.nodes.stage.Animation;
import webnvl.utils.nodes.stage.AnimationEvents;
import webnvl.utils.nodes.stage.StopAnimation;

import com.fasterxml.jackson.core.JsonProcessingException;

public class JsonAnimationsTest extends JsonTest {
	@Test
	public void animsStartToJsonTest() throws JsonProcessingException {
		AnimationEvents anims = new AnimationEvents();
		
		anims.start.add(new Animation("animtest", "animtest", "testelement"));
		
		String result = mapper.writeValueAsString(anims);
		String expected = "{\"start\":[{\"id\":\"animtest\",\"name\":\"animtest\",\"element\":\"testelement\"}]}";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void animsStartFromJsonTest() throws IOException {
		String json = "{\"start\":[{\"id\":\"animtest\",\"name\":\"animtest\",\"element\":\"testelement\"}]}";
		AnimationEvents result = mapper.readValue(json, AnimationEvents.class);
		
		AnimationEvents expected = new AnimationEvents();
		expected.start.add(new Animation("animtest", "animtest", "testelement"));
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void animsToJsonTest() throws JsonProcessingException {
		AnimationEvents anims = new AnimationEvents();
		
		anims.start.add(new Animation("animtest", "animtest", "testelement"));
		anims.stop.add(new StopAnimation("animtest"));
		anims.stop.add(new StopAnimation("animtest2"));
		
		String result = mapper.writeValueAsString(anims);
		String expected = "{\"start\":[{\"id\":\"animtest\",\"name\":\"animtest\",\"element\":\"testelement\"}],\"stop\":[{\"id\":\"animtest\"},{\"id\":\"animtest2\"}]}";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void animsFromJsonTest() throws IOException {
		String json = "{\"start\":[{\"name\":\"animtest\",\"id\":\"animtest\",\"element\":\"testelement\"}],\"stop\":[{\"id\":\"animtest\"},{\"id\":\"animtest2\"}]}";
		AnimationEvents result = mapper.readValue(json, AnimationEvents.class);
		
		AnimationEvents expected = new AnimationEvents();
		expected.start.add(new Animation("animtest", "animtest", "testelement"));
		expected.stop.add(new StopAnimation("animtest"));
		
		Assert.assertEquals(expected, result);
	}
}
