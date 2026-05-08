package org.crudlang.dto;

public class AgentRequest {

    private String question;
    private String sessionId;
    private String modelId;

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getModelId() { return modelId; }
    public void setModelId(String modelId) { this.modelId = modelId; }
}
