package Scenario;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Text extends Screen {
	@JsonProperty("character")
	public String charid;
	public String avatar;
	public String text;
}
