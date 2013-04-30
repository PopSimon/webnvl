package webnvl.utils.node.stage;

import java.io.StringReader;

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
		
		stage.background.add(new AddSprite(new Sprite("testid", "image", "testname", "test/charsprite.jpg"), new Animation("animtest", "animtest", "testid")));
		
		m.marshal(stage, sw);

		String strresult = sw.toString();
//		String expected = "<charsprite id=\"testid\" name=\"testname\" path=\"test/charsprite.jpg\"/>";
		
		System.out.println(strresult);
	}
	
	@Test
	public void noBgStageToXmlTest() throws JAXBException {
		Stage stage = new Stage();
		
		stage.foreground.add(new AddSprite(new Sprite("testid", "image", "testname", "test/charsprite.jpg"), new Animation("animtest", "animtest", "testid")));
		stage.foreground.add(new AddSprite(new Sprite("testid", "video", "testname2", "test/vidsprite.webm")));
		
		m.marshal(stage, sw);

		String strresult = sw.toString();
//		String expected = "<charsprite id=\"testid\" name=\"testname\" path=\"test/charsprite.jpg\"/>";
		
		System.out.println(strresult);
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
