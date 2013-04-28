package webnvl.utils.node.stage;

import java.io.StringReader;

import javax.xml.bind.JAXBException;

import org.junit.Assert;
import org.junit.Test;

import webnvl.utils.nodes.stage.BgSprite;
import webnvl.utils.nodes.stage.CharSprite;
import webnvl.utils.nodes.stage.Sprite;

public class XmlSpriteTest extends XmlTest {

	public XmlSpriteTest() throws JAXBException {
		super();
	}

	/**
	 * Because for subtypes the order of the attributes isn't customisable the charSpriteToXmlTest and
	 * charSpriteFromXmlTest is contracted.
	 * @throws JAXBException
	 */
	@Test
	public void charSpriteToFromXmlTest() throws JAXBException {
		Sprite sprite = new CharSprite("testid", "testname", "test/charsprite.jpg");
		m.marshal(sprite, sw);

		String strresult = sw.toString();
//		String expected = "<charsprite id=\"testid\" name=\"testname\" path=\"test/charsprite.jpg\"/>";
		
		StringReader reader = new StringReader(strresult);
		
		CharSprite result = (CharSprite)um.unmarshal(reader);
		
		Assert.assertEquals(sprite, result);
	}
	
	/**
	 * Because for subtypes the order of the attributes isn't customisable the charSpriteToXmlTest and
	 * charSpriteFromXmlTest is contracted.
	 * @throws JAXBException
	 */
	@Test
	public void bgSpriteToFromXmlTest() throws JAXBException {
		Sprite sprite = new BgSprite("testid", "testname", "test/bgsprite.jpg");
		m.marshal(sprite, sw);

		String strresult = sw.toString();
//		String expected = "<charsprite id=\"testid\" name=\"testname\" path=\"test/charsprite.jpg\"/>";
		
		StringReader reader = new StringReader(strresult);
		
		BgSprite result = (BgSprite)um.unmarshal(reader);
		
		Assert.assertEquals(sprite, result);
	}
}
