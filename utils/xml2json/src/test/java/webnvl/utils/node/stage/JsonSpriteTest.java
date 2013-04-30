package webnvl.utils.node.stage;

import java.io.IOException;

import org.junit.Assert;
import org.junit.Test;

import webnvl.utils.nodes.stage.Sprite;

import com.fasterxml.jackson.core.JsonProcessingException;

public class JsonSpriteTest extends JsonTest {
	
	@Test
	public void charSpriteToJsonTest() throws JsonProcessingException {
		Sprite sprite = new Sprite("testid", "image", "testname", "test/charsprite.jpg");
		
		String result = mapper.writeValueAsString((Sprite)sprite);
		String expected = "{\"id\":\"testid\",\"type\":\"image\",\"name\":\"testname\",\"path\":\"test/charsprite.jpg\"}";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void charSpriteFromJsonTest() throws IOException {
		String json = "{\"id\":\"testid\",\"type\":\"image\",\"name\":\"testname\",\"path\":\"test/charsprite.jpg\"}";
		Sprite result = mapper.readValue(json, Sprite.class);
		
		Sprite expected = new Sprite("testid", "image", "testname", "test/charsprite.jpg");
		
		Assert.assertEquals(expected, result);
	}
}
