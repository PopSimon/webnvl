package webnvl.utils.node.stage;

import java.io.StringReader;

import javax.xml.bind.JAXBException;

import org.junit.Assert;
import org.junit.Test;

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
	public void spriteToFromXmlTest() throws JAXBException {
		Sprite sprite = new Sprite("testid", "image", "testname", "test/charsprite.jpg");
		m.marshal(sprite, sw);

		String strresult = sw.toString();
//		String expected = "<charsprite id=\"testid\" name=\"testname\" path=\"test/charsprite.jpg\"/>";
		
		StringReader reader = new StringReader(strresult);
		
		Sprite result = (Sprite)um.unmarshal(reader);
		
		Assert.assertEquals(sprite, result);
	}
}
