export interface QuizQuestion {
  id: string;
  module: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface EditorChallenge {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  validator: (code: string, domResult?: Document) => boolean | string;
  validationMessage: string;
}
