package webnvl.utils.node.stage;

import org.junit.Assert;
import org.junit.Test;

import webnvl.utils.nodes.stage.AddSprite;
import webnvl.utils.nodes.stage.Animation;
import webnvl.utils.nodes.stage.RemoveSprite;
import webnvl.utils.nodes.stage.Sprite;
import webnvl.utils.nodes.stage.Stage;

import com.fasterxml.jackson.core.JsonProcessingException;

public class JsonStageTest extends JsonTest {

	@Test
	public void noBgStageToJsonTest() throws JsonProcessingException {
		Stage stage = new Stage();
		
		stage.foreground.add.add(new AddSprite(new Sprite("testid1", "image", "testname", "test/charsprite.jpg"), new Animation("animtest", "animtest", "testid")));
		stage.foreground.remove.add(new RemoveSprite("testid2"));
		
		String result = mapper.writeValueAsString(stage);
		String expected = "{\"foreground\":{\"add\":[{"
		+ "\"transition\":{\"id\":\"animtest\",\"name\":\"animtest\",\"element\":\"testid\"}"
		+ ",\"sprite\":{\"id\":\"testid1\",\"type\":\"image\",\"name\":\"testname\",\"path\":\"test/charsprite.jpg\"}}],"
		+ "\"remove\":[{\"sprite\":\"testid2\"}]}}";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void noFgStageToJsonTest() throws JsonProcessingException {
		Stage stage = new Stage();
		
		stage.background.remove.add(new RemoveSprite("testid2"));
		
		String result = mapper.writeValueAsString(stage);
		String expected = "{\"background\":{\"remove\":[{\"sprite\":\"testid2\"}]}}";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void animStageToJsonTest() throws JsonProcessingException {
		Stage stage = new Stage();
		
		stage.animations.start.add(new Animation("anim1", "anim1", "nonexistingelement"));
		
		String result = mapper.writeValueAsString(stage);
		String expected = "{\"animations\":{\"start\":[{\"id\":\"anim1\",\"name\":\"anim1\",\"element\":\"nonexistingelement\"}]}}";
		
		Assert.assertEquals(expected, result);
	}
}
