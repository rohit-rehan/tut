package com.intertech.lab1;

import org.springframework.integration.core.MessageSelector;
import org.springframework.messaging.Message;

public class CustomMessageFilter implements MessageSelector {

	public boolean accept(Message<?> message) {
		return message != null && message.getPayload().getClass().equals(String.class);
	}

}
