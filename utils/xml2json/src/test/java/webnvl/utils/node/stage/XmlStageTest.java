package webnvl.utils.node.stage;

import javax.xml.bind.JAXBException;

import org.junit.Assert;
import org.junit.Test;

import webnvl.utils.nodes.stage.AddSprite;
import webnvl.utils.nodes.stage.Animation;
import webnvl.utils.nodes.stage.Sprite;
import webnvl.utils.nodes.stage.Stage;

public class XmlStageTest extends XmlTest {

	public XmlStageTest() throws JAXBException {
		super();
	}
	
	
	@Test
	public void noFgStageToXmlTest() throws JAXBException {
		Stage stage = new Stage();
		
		stage.background.add.add(new AddSprite(new Sprite("testid", "image", "testname", "test/charsprite.jpg"), new Animation("animtest", "animtest", "testid")));
		
//		stage.preMarshalling();
		m.marshal(stage, sw);

		String strresult = sw.toString();
		String expected = "<stage><background><add><transition name=\"animtest\" element=\"testid\" id=\"animtest\"/>"
				+ "<sprite id=\"testid\" type=\"image\" name=\"testname\" path=\"test/charsprite.jpg\"/></add></background></stage>";
		
//		System.out.println(strresult);
		Assert.assertEquals(expected, strresult);
	}
	
	@Test
	public void noBgStageToXmlTest() throws JAXBException {
		Stage stage = new Stage();
		
		stage.foreground.add.add(new AddSprite(new Sprite("testid", "image", "testname", "test/charsprite.jpg"), new Animation("animtest", "animtest", "testid")));
		stage.foreground.add.add(new AddSprite(new Sprite("testid", "video", "testname2", "test/vidsprite.webm")));
		
//		stage.preMarshalling();
		m.marshal(stage, sw);

		String strresult = sw.toString();
		String expected = "<stage><foreground><add><transition name=\"animtest\" element=\"testid\" id=\"animtest\"/>"
				+ "<sprite id=\"testid\" type=\"image\" name=\"testname\" path=\"test/charsprite.jpg\"/></add>"
				+ "<add><sprite id=\"testid\" type=\"video\" name=\"testname2\" path=\"test/vidsprite.webm\"/></add></foreground></stage>";
		
//		System.out.println(strresult);
		Assert.assertEquals(expected, strresult);
	}
	
	@Test
	public void animStageToXmlTest() throws JAXBException {
		Stage stage = new Stage();
		
		stage.animations.start.add(new Animation("anim1", "anim1", "nonexistingelement"));
		
		m.marshal(stage, sw);
		String strresult = sw.toString();
//		String expected = "{\"animations\":{\"start\":[{\"id\":\"anim1\",\"name\":\"anim1\",\"element\":\"nonexistingelement\"}]}}";
		String expected = "<stage><animations><start name=\"anim1\" element=\"nonexistingelement\" id=\"anim1\"/></animations></stage>";
		
//		System.out.println(strresult);
		Assert.assertEquals(expected, strresult);
	}
//	@Test
//	public void stageToFromXmlTest() throws JAXBException {
//		Stage sprite = new CharSprite("testid", "testname", "test/charsprite.jpg");
//		m.marshal(sprite, sw);
//
//		String strresult = sw.toString();
////		String expected = "<charsprite id=\"testid\" name=\"testname\" path=\"test/charsprite.jpg\"/>";
//		
//		StringReader reader = new StringReader(strresult);
//		
//		CharSprite result = (CharSprite)um.unmarshal(reader);
//		
//		Assert.assertEquals(sprite, result);
//	}
	
}
