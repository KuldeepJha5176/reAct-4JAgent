package org.crudlang.agent;

import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.store.memory.chat.ChatMemoryStore;
import dev.langchain4j.store.memory.chat.InMemoryChatMemoryStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class AgentConfig {

    @Value("${agent.gemini.api-key}")
    private String geminiApiKey;

    @Value("${agent.gemini.temperature}")
    private double geminiTemperature;

    @Value("${agent.groq.api-key}")
    private String groqApiKey;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public ChatMemoryStore sharedMemoryStore() {
        return new InMemoryChatMemoryStore();
    }

    @Bean
    public AgentFactory agentFactory(StudentTools studentTools, ChatMemoryStore sharedMemoryStore) {
        return new AgentFactory(geminiApiKey, geminiTemperature, groqApiKey, studentTools, sharedMemoryStore);
    }

    public static class AgentFactory {

        private final String geminiApiKey;
        private final double geminiTemperature;
        private final String groqApiKey;
        private final StudentTools studentTools;
        private final ChatMemoryStore memoryStore;
        private final Map<String, StudentAgentService> cache = new ConcurrentHashMap<>();

        public AgentFactory(String geminiApiKey, double geminiTemperature, String groqApiKey,
                            StudentTools studentTools, ChatMemoryStore memoryStore) {
            this.geminiApiKey = geminiApiKey;
            this.geminiTemperature = geminiTemperature;
            this.groqApiKey = groqApiKey;
            this.studentTools = studentTools;
            this.memoryStore = memoryStore;
        }

        public StudentAgentService getAgent(String modelId) {
            return cache.computeIfAbsent(modelId, this::buildAgent);
        }

        private StudentAgentService buildAgent(String modelId) {
            ChatModel model = switch (modelId) {
                case "gemini-2.0-flash-lite" -> buildGemini("gemini-2.0-flash-lite");
                case "llama-3.3-70b-versatile" -> buildGroq("llama-3.3-70b-versatile");
                default -> buildGemini("gemini-2.5-flash-lite");
            };
            return AiServices.builder(StudentAgentService.class)
                    .chatModel(model)
                    .tools(studentTools)
                    .chatMemoryProvider(memoryId -> MessageWindowChatMemory.builder()
                            .id(memoryId)
                            .maxMessages(40)
                            .chatMemoryStore(memoryStore)
                            .build())
                    .build();
        }

        private ChatModel buildGemini(String name) {
            return GoogleAiGeminiChatModel.builder()
                    .apiKey(geminiApiKey)
                    .modelName(name)
                    .temperature(geminiTemperature)
                    .build();
        }

        private ChatModel buildGroq(String name) {
            return OpenAiChatModel.builder()
                    .baseUrl("https://api.groq.com/openai/v1")
                    .apiKey(groqApiKey)
                    .modelName(name)
                    .build();
        }
    }
}
