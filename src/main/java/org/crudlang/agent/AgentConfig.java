package org.crudlang.agent;

import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import dev.langchain4j.service.AiServices;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AgentConfig {

    @Value("${agent.gemini.api-key}")
    private String apiKey;

    @Value("${agent.gemini.model-name}")
    private String modelName;

    @Value("${agent.gemini.temperature}")
    private double temperature;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public ChatModel geminiChatModel() {
        return GoogleAiGeminiChatModel.builder()
                .apiKey(apiKey)
                .modelName(modelName)
                .temperature(temperature)
                .build();
    }

    @Bean
    public StudentAgentService studentAgentService(
            ChatModel chatModel,
            StudentTools studentTools) {
        return AiServices.builder(StudentAgentService.class)
                .chatModel(chatModel)
                .tools(studentTools)
                .chatMemoryProvider(memoryId -> MessageWindowChatMemory.withMaxMessages(40))
                .build();
    }
}
