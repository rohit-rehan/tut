package com.intertech.lab3;

import java.io.File;

import org.springframework.integration.core.MessageSelector;
import org.springframework.messaging.Message;

public class CustomMessageSelector implements MessageSelector {

	public boolean accept(Message<?> message) {
		return message.getPayload() instanceof File && ((File) message.getPayload()).getName().startsWith("msg");
	}

}
