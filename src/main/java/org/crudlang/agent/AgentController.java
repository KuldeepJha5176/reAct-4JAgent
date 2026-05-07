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
    private StudentAgentService agentService;

    @PostMapping("/ask")
    public ResponseEntity<AgentResponse> ask(@RequestBody AgentRequest request) {
        String sessionId = request.getSessionId() != null ? request.getSessionId() : "default";
        try {
            String answer = agentService.chat(sessionId, request.getQuestion());
            return ResponseEntity.ok(AgentResponse.of(answer));
        } catch (RuntimeException e) {
            String msg = e.getMessage() != null ? e.getMessage() : "";
            if (msg.contains("429") || msg.contains("RESOURCE_EXHAUSTED") || msg.contains("quota")) {
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                        .body(AgentResponse.of(
                                "Gemini API daily quota exceeded (free tier: 20 requests/day). " +
                                "Please wait until tomorrow or upgrade to a paid API key at https://ai.google.dev"));
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(AgentResponse.of("Agent error: " + e.getMessage()));
        }
    }
}
