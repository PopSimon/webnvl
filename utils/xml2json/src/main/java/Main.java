import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.xml.bind.ValidationException;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.codehaus.jackson.JsonFactory;
import org.codehaus.jackson.JsonGenerator;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;

import util.Parser;


public class Main {

	/**
	 * @param args
	 * @throws SAXException 
	 * @throws ParserConfigurationException 
	 * @throws ValidationException 
	 */
	public static void main(String[] args) throws ParserConfigurationException, SAXException, ValidationException {
		// TODO Auto-generated method stub
		JsonFactory f = new JsonFactory();
		
		String inputFile = args[0];
		String outputFile = args[1];
		
		if (inputFile == null || inputFile.isEmpty() || outputFile == null || outputFile.isEmpty()) {
			throw new ValidationException("Missing arguments");
		}
		
		SAXParserFactory spf = SAXParserFactory.newInstance();
	    spf.setNamespaceAware(true);
	    SAXParser saxParser = spf.newSAXParser();
	    XMLReader xmlReader = saxParser.getXMLReader();
	    
		try {
			FileOutputStream out = new FileOutputStream(outputFile);
			JsonGenerator jsonout = f.createJsonGenerator(out);
			xmlReader.setContentHandler(new Parser(jsonout));
			xmlReader.parse(inputFile);
			
			jsonout.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
