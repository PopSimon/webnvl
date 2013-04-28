package webnvl.utils.node.stage;

import org.junit.Assert;
import org.junit.Test;

import webnvl.utils.nodes.stage.Animation;
import webnvl.utils.nodes.stage.BgSprite;
import webnvl.utils.nodes.stage.CharSprite;
import webnvl.utils.nodes.stage.Stage;

import com.fasterxml.jackson.core.JsonProcessingException;

public class JsonStageTest extends JsonTest {

	@Test
	public void noBgStageToJsonTest() throws JsonProcessingException {
		Stage stage = new Stage();
		
		stage.foreground.add(new CharSprite("testid1", "testname1", "test/charsprite1.jpg"));
		stage.foreground.add(new CharSprite("testid2", "testname2", "test/charsprite2.jpg"));
		
		String result = mapper.writeValueAsString(stage);
		String expected = "{\"foreground\":[{\"type\":\"charsprite\",\"id\":\"testid1\",\"name\":\"testname1\",\"path\":\"test/charsprite1.jpg\"},"
		+ "{\"type\":\"charsprite\",\"id\":\"testid2\",\"name\":\"testname2\",\"path\":\"test/charsprite2.jpg\"}]}";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void noFgStageToJsonTest() throws JsonProcessingException {
		Stage stage = new Stage();
		
		stage.background.add(new BgSprite("testid", "testname", "test/bgsprite.jpg"));
		
		String result = mapper.writeValueAsString(stage);
		String expected = "{\"background\":[{\"type\":\"bgsprite\",\"id\":\"testid\",\"name\":\"testname\",\"path\":\"test/bgsprite.jpg\"}]}";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void animStageToJsonTest() throws JsonProcessingException {
		Stage stage = new Stage();
		
		stage.animations.add(new Animation("anim1", "anim1", "nonexistingelement"));
		
		String result = mapper.writeValueAsString(stage);
		String expected = "{\"animations\":[{\"id\":\"anim1\",\"name\":\"anim1\",\"element\":\"nonexistingelement\"}]}";
		
		Assert.assertEquals(expected, result);
	}
}
