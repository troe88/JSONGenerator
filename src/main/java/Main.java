/**
 * Created by Dmitry_Lebedev1 on 10/19/2015.
 */

import org.jsoup.Jsoup;
import org.jsoup.helper.Validate;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;


public class Main {

    public static final String JDI_BUTTON = "jdi_button";
    public static final String JDI_TEXT_FIELD = "jdi_textField";

    public static void main(String[] args) throws IOException, URISyntaxException, ParserConfigurationException, TransformerException {
        Document doc = Jsoup.parse(new File(Main.class.getResource("index.html").toURI()), null);
        Elements buttons = doc.getElementsByAttribute(JDI_BUTTON);
        Elements texts = doc.getElementsByAttribute(JDI_TEXT_FIELD);

        DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
        org.w3c.dom.Document doc1 = docBuilder.newDocument();
        org.w3c.dom.Element rootElement = doc1.createElement("page");
        rootElement.setAttribute("url", "https://***.com");
        doc1.appendChild(rootElement);

        for (Element i : buttons){
            org.w3c.dom.Element button = doc1.createElement("button");
            button.setAttribute("css", String.format("["+ JDI_BUTTON +"='%s']", i.attr(JDI_BUTTON)));
            rootElement.appendChild(button);
        }

        for (Element i : texts){
            org.w3c.dom.Element text = doc1.createElement("text");
            text.setAttribute("css", String.format("["+ JDI_TEXT_FIELD +"='%s']", i.attr(JDI_TEXT_FIELD)));
            rootElement.appendChild(text);
        }

        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        DOMSource source = new DOMSource(doc1);
//        StreamResult result = new StreamResult(new File("C:\\Users\\Dmitry_Lebedev1\\file.xml"));

        // Output to console for testing
        StreamResult result = new StreamResult(System.out);

        transformer.transform(source, result);
    }




    private static void print(String msg, Object... args) {
        System.out.println(String.format(msg, args));
    }

    private static String trim(String s, int width) {
        if (s.length() > width)
            return s.substring(0, width - 1) + ".";
        else
            return s;
    }
}
