package org.crudlang.agent;

import org.crudlang.dto.AgentRequest;
import org.crudlang.dto.AgentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agent")
public class AgentController {

    @Autowired
    private AgentConfig.AgentFactory agentFactory;

    @PostMapping("/ask")
    public ResponseEntity<AgentResponse> ask(@RequestBody AgentRequest request) {
        String sessionId = request.getSessionId() != null ? request.getSessionId() : "default";
        String modelId = request.getModelId() != null ? request.getModelId() : "gemini-2.5-flash-lite";
        try {
            String answer = agentFactory.getAgent(modelId).chat(sessionId, request.getQuestion());
            return ResponseEntity.ok(AgentResponse.of(answer));
        } catch (RuntimeException e) {
            String msg = e.getMessage() != null ? e.getMessage() : "";
            if (msg.contains("429") || msg.contains("RESOURCE_EXHAUSTED") || msg.contains("quota")) {
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                        .body(AgentResponse.of(
                                "API quota exceeded for this model. Try switching to a different model."));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(AgentResponse.of("Agent error: " + e.getMessage()));
        }
    }
}
