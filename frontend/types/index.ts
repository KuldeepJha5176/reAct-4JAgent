export interface Student {
  rollno: number;
  name: string;
  className: string;
  age: number;
  marks: number;
}

export interface CreateStudentPayload {
  rollno: number;
  name: string;
  className: string;
  age: number;
  marks: number;
}

export type MessageRole = "user" | "ai";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  modelId?: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}
