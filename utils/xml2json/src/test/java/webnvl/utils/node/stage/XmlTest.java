package webnvl.utils.node.stage;

import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import webnvl.utils.nodes.stage.Animation;
import webnvl.utils.nodes.stage.BgSprite;
import webnvl.utils.nodes.stage.CharSprite;
import webnvl.utils.nodes.stage.ImgSprite;
import webnvl.utils.nodes.stage.Sprite;
import webnvl.utils.nodes.stage.Stage;

public abstract class XmlTest {
	JAXBContext context;
	Marshaller m;
	Unmarshaller um;
	StringWriter sw = new StringWriter();
	
	public XmlTest() throws JAXBException {
		context = JAXBContext.newInstance(
				Animation.class, 
				Sprite.class, 
				ImgSprite.class, 
				CharSprite.class,
				BgSprite.class,
				Stage.class);
		m = context.createMarshaller();
		um = context.createUnmarshaller();
		m.setProperty(Marshaller.JAXB_FRAGMENT, true); // to have no <?xml... at the beginning
		// um.setProperty(, value)
	}
}
