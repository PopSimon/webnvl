package webnvl.utils.node.stage;

import java.io.IOException;

import org.junit.Assert;
import org.junit.Test;

import webnvl.utils.nodes.stage.BgSprite;
import webnvl.utils.nodes.stage.CharSprite;
import webnvl.utils.nodes.stage.Sprite;

import com.fasterxml.jackson.core.JsonProcessingException;

public class JsonSpriteTest extends JsonTest {
	
	@Test
	public void charSpriteToJsonTest() throws JsonProcessingException {
		CharSprite sprite = new CharSprite("testid", "testname", "test/charsprite.jpg");
		
		String result = mapper.writeValueAsString((Sprite)sprite);
		String expected = "{\"type\":\"charsprite\",\"id\":\"testid\",\"name\":\"testname\",\"path\":\"test/charsprite.jpg\"}";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void charSpriteFromJsonTest() throws IOException {
		String json = "{\"type\":\"charsprite\",\"id\":\"testid\",\"name\":\"testname\",\"path\":\"test/charsprite.jpg\"}";
		CharSprite result = mapper.readValue(json, CharSprite.class);
		
		CharSprite expected = new CharSprite("testid", "testname", "test/charsprite.jpg");
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void bgSpriteToJsonTest() throws JsonProcessingException {
		BgSprite sprite = new BgSprite("testid", "testname", "test/bgsprite.jpg");
		
		String result = mapper.writeValueAsString((Sprite)sprite);
		String expected = "{\"type\":\"bgsprite\",\"id\":\"testid\",\"name\":\"testname\",\"path\":\"test/bgsprite.jpg\"}";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void bgSpriteFromJsonTest() throws IOException {
		String json = "{\"type\":\"bgsprite\",\"id\":\"testid\",\"name\":\"testname\",\"path\":\"test/bgsprite.jpg\"}";
		BgSprite result = mapper.readValue(json, BgSprite.class);
		
		BgSprite expected = new BgSprite("testid", "testname", "test/bgsprite.jpg");
		
		Assert.assertEquals(expected, result);
	}
}
