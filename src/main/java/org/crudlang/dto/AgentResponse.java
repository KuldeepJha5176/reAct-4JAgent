package org.crudlang.dto;

public class AgentResponse {

    private String answer;

    public static AgentResponse of(String answer) {
        AgentResponse r = new AgentResponse();
        r.answer = answer;
        return r;
    }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
}
