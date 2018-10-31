package <%= reversedomain %>;

import java.util.concurrent.ExecutionException;

import kumori.BaseComponent;
import kumori.ComponentConfig;
import kumori.Slap.LOG_LEVEL;

public class Component extends BaseComponent {

	@Override
	public void init(ComponentConfig config) {
		super.init(config);
	}

	public String doRequest() {
  	return "Hello world";
	}

}
