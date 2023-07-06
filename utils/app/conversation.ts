import { Conversation } from '@/types/chat';

export const updateConversation = (
  updatedConversation: Conversation,
  allConversations: Conversation[],
) => {
  const updatedConversations = allConversations.map((c) => {
    if (c.id === updatedConversation.id) {
      return updatedConversation;
    }

    return c;
  });

  saveConversation(updatedConversation);
  saveConversations(updatedConversations);

  return {
    single: updatedConversation,
    all: updatedConversations,
  };
};

export const saveConversation = (conversation: Conversation) => {
  localStorage.setItem('selectedConversation', JSON.stringify(conversation));
};

export const saveConversations = (conversations: Conversation[]) => {
  localStorage.setItem('conversationHistory', JSON.stringify(conversations));
};

/**
 * @param Array<string> 字符串
 * @param String type 想要获取的类型
 * 生成对应的数据项以及获取对应的数据
 * @returns string 对应的数据
 */
export const stringToStram=(str:string)=>{
  const textStream = new ReadableStream({
    start(controller) {
      controller.enqueue(str);
      controller.close();
    }
  });
  return textStream;
}