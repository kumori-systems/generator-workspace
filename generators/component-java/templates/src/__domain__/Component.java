package <%= reversedomain %>;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import kumori.BaseComponent;
import kumori.ComponentConfig;
import kumori.Utils;
import kumori.channels.Reply;
import kumori.messages.Message;
import kumori.messages.MessageFactory;

public class Component extends BaseComponent {

	private Reply replyChannel;

	@Override
	public void init(ComponentConfig config) {
		super.init(config);
	}

	@SuppressWarnings("unchecked")
	@Override
	public void run() {
	  replyChannel = (Reply) provides.get("entrypoint");

		replyChannel.setHandler((Message request) -> {
			System.out.println("Component.Processing request");
			CompletableFuture<Message> future = CompletableFuture.supplyAsync(() -> {
				// Do something... and resolve
				Message responseMsg = MessageFactory.newMessage("Hello World");
				System.out.println("Component. Sending response");
				return responseMsg;
			});
			System.out.println("Component. Response sent");
			return future;
		});

	}


}
