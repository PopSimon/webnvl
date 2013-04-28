package webnvl.utils.node.stage;

import java.io.StringReader;

import javax.xml.bind.JAXBException;

import org.junit.Assert;
import org.junit.Test;

import webnvl.utils.nodes.stage.Animation;

public class XmlAnimationTest extends XmlTest {
	public XmlAnimationTest() throws JAXBException {
		super();
	}

	@Test
	public void animToXmlTest() throws JAXBException {
		Animation anim = new Animation("animtest", "animtest", "testelement");
		m.marshal(anim, sw);
		
		String result = sw.toString();
		String expected = "<animation id=\"animtest\" name=\"animtest\" element=\"testelement\"/>";
		
		Assert.assertEquals(expected, result);
	}
	
	@Test
	public void animFromXmlTest() throws JAXBException {
		StringReader reader = new StringReader("<animation id=\"animtest\" name=\"animtest\" element=\"testelement\"/>");
		
		Animation expected = new Animation("animtest", "animtest", "testelement");
		Animation result = (Animation)um.unmarshal(reader);
		
		Assert.assertEquals(expected, result);
	}
}
