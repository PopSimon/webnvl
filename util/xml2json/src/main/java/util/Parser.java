package util;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class Parser extends DefaultHandler {
	private static final String CHAPTER = "chapter";
	private static final String SCENE = "scene";
	private static final String CONDITIONAL = "conditional";

	private JsonGenerator json;

	public Parser(JsonGenerator json) {
		this.json = json;
	}

	@Override
	public void startDocument() throws SAXException {
	}

	@Override
	public void endDocument() throws SAXException {
		try {
			json.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	protected void writeBodyStart(String type, Attributes atts)
			throws JsonGenerationException, IOException {
		json.writeStartObject();
		json.writeStringField("type", type);
		writeAttributes(atts);
		json.writeArrayFieldStart("content");
	}
	
	protected void writeBodyEnd(String type)
			throws JsonGenerationException, IOException {
		json.writeEndArray(); // end of content
		json.writeEndObject(); // end of the object
	}

	protected void writeAttributes(Attributes atts)
			throws JsonGenerationException, IOException {
		for (int i = 0; i < atts.getLength(); ++i) {
			String name = atts.getQName(i);
			String value = atts.getValue(i);
			json.writeStringField(name, value);
		}
	}

	@Override
	public void startElement(String namespaceURI, String localName,
			String qName, Attributes atts) throws SAXException {
		
		System.out.println(localName);
		try {
			switch (localName) {
			case CHAPTER:
				writeBodyStart(CHAPTER, atts);
				break;
			case SCENE:
				writeBodyStart(localName, atts);
			}
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void endElement(String uri, String localName, String qName) throws SAXException {
		try {
			System.out.println("/" + localName);
			writeBodyEnd(localName);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
