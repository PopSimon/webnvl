package webnvl.utils.node.stage;

import java.io.StringReader;

import javax.xml.bind.JAXBException;

import org.junit.Assert;
import org.junit.Test;

import webnvl.utils.nodes.stage.BgSprite;
import webnvl.utils.nodes.stage.CharSprite;
import webnvl.utils.nodes.stage.Stage;

public class XmlStageTest extends XmlTest {

	public XmlStageTest() throws JAXBException {
		super();
	}
	
	
	@Test
	public void noFgStageToXmlTest() throws JAXBException {
		Stage stage = new Stage();
		
		stage.background.add(new BgSprite("testid", "testname", "test/bgsprite.jpg"));
		
		m.marshal(stage, sw);

		String strresult = sw.toString();
//		String expected = "<charsprite id=\"testid\" name=\"testname\" path=\"test/charsprite.jpg\"/>";
		
		System.out.println(strresult);
	}
	
	@Test
	public void noBgStageToXmlTest() throws JAXBException {
		Stage stage = new Stage();
		
		stage.foreground.add(new CharSprite("testid1", "testname1", "test/charsprite1.jpg"));
		stage.foreground.add(new CharSprite("testid2", "testname2", "test/charsprite2.jpg"));
		
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
