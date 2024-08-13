interface UMsgError {
  error: string;
}

interface MessagesStatistics {
  sent: number;
  queue: number;
  unsent: number;
  invalid: number;
  expired: number;
}

interface UMessage {
  id: number;
  referenceId: string | null;
  from: string;
  to: string;
  body: string;
  priority: number;
  status: string;
  ack: string;
  type: string;
  created_at: number;
  sent_at: number;
  metadata: {
    [key: string]: string;
  };
}

interface MessageSentResponse {
  sent: string;
  message: string;
  id: number;
}

declare module 'ultramsg-whatsapp-api' {
  export default class ultramsg {
    /**
     *
     * @param instance_id the instance id
     * @param token the token
     * @returns ultramsg
     */
    constructor(instance_id: string, token: string);
    instance_id: string;
    token: string;

    /**
     * @description Get the messages
     * @param page the page number
     * @param limit the limit of messages
     * @param status the status of the message
     * @param sort the sort of the message
     * @param id the id of the message
     * @param referenceId the reference id of the message
     * @param from the from of the message
     * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
     * @param ack the ack of the message
     * @returns Promise<UMsgError | { total: number, pages: number, limit: number, page: number }>
     */
    getMessages(
      page?: number,
      limit?: number,
      status?: string,
      sort?: string,
      id?: string,
      referenceId?: string,
      from?: string,
      to?: string,
      ack?: string
    ): Promise<
      | UMsgError
      | {
          total: number;
          pages: number;
          limit: number;
          page: number;
          messages: UMessage[];
        }
    >;

    /**
     * Get the message statistics
     * @returns Promise<UMsgError | { messages_statistics: MessagesStatistics }>
     */
    getMessageStatistics(): Promise<
      UMsgError | { messages_statistics: MessagesStatistics }
    >;

    /**
     *
     * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
     * @param body  Message text, UTF-8 or UTF-16 string with emoji. Max length : 4096 characters .
     * @param priority the message priority
     * @param referenceId the reference id
     * @returns Promise<UMsgError | MessageSentResponse>
     */
    sendChatMessage(
      to: string,
      body: string,
      priority?: number,
      referenceId?: string
    ): Promise<UMsgError | MessageSentResponse>;

    /**
       *
       * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
       * @param caption the caption of the image
       * @param image HTTP link image or base64-encoded file
                Supported extensions ( jpg , jpeg , gif , png , webp , bmp ) .
       
                Max file size : 16MB .
       
                Max Base64 length : 10,000,000
       
                example images links :
       
                jpg : https://file-example.s3-accelerate.amazonaws.com/images/test.jpg
       
                jpeg : https://file-example.s3-accelerate.amazonaws.com/images/test.jpeg
       
                png : https://file-example.s3-accelerate.amazonaws.com/images/test.png
       
                gif : https://file-example.s3-accelerate.amazonaws.com/images/test.gif
       
                bmp : https://file-example.s3-accelerate.amazonaws.com/images/test.bmp
       
                webp : https://file-example.s3-accelerate.amazonaws.com/images/test.webp
       * @param priority the message priority
       * @param referenceId the reference id
       * @param nocache the nocache
       * @returns Promise<UMessage | MessageSentResponse>
       */
    sendImageMessage(
      to: string,
      caption: string,
      image: string,
      priority?: number,
      referenceId?: string,
      nocache?: boolean
    ): Promise<UMsgError | MessageSentResponse>;

    /**
       *
       * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
       * @param filename the filename
       * @param document HTTP link file or base64-encoded file
            Supported most extensions like ( zip , xlsx , csv , txt , pptx , docx ....etc ) .
       
            Max file size : 30MB .
       
            Max Base64 length : 10,000,000
       
            example links :
       
            https://file-example.s3-accelerate.amazonaws.com/documents/cv.pdf
       * @param priority the message priority
       * @param referenceId the reference id
       * @param nocache the nocache
       * @returns Promise<UMessage | MessageSentResponse>
       */
    sendDocumentMessage(
      to: string,
      filename: string,
      document: string,
      priority?: number,
      referenceId?: string,
      nocache?: boolean
    ): Promise<UMsgError | MessageSentResponse>;

    /**
     *
     * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
     * @param audio HTTP link audio or base64-encoded file
     * @param priority the message priority
     * @param referenceId the reference id
     * @param nocache the nocache
     * @returns Promise<UMsgError | MessageSentResponse>
     */
    sendAudioMessage(
      to: string,
      audio: string,
      priority?: number,
      referenceId?: string,
      nocache?: boolean
    ): Promise<UMsgError | MessageSentResponse>;

    /**
     *
     * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
     * @param audio
     * @param priority
     * @param referenceId
     * @param nocache
     * @returns Promise<UMsgError | MessageSentResponse>
     */
    sendVoiceMessage(
      to: string,
      audio: string,
      priority?: number,
      referenceId?: string,
      nocache?: boolean
    ): Promise<UMsgError | MessageSentResponse>;

    /**
     *
     * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
     * @param caption the caption of the video
     * @param video HTTP link video or base64-encoded file
     * @param priority the message priority
     * @param referenceId the reference id
     * @param nocache the nocache
     * @returns Promise<UMsgError | MessageSentResponse>
     */
    sendVideoMessage(
      to: string,
      caption: string,
      video: string,
      priority?: number,
      referenceId?: string,
      nocache?: boolean
    ): Promise<UMsgError | MessageSentResponse>;

    /**
     *
     * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
     * @param link the link
     * @param priority the message priority
     * @param referenceId
     * @returns Promise<UMsgError | MessageSentResponse>
     */
    sendLinkMessage(
      to: string,
      link: string,
      priority?: number,
      referenceId?: string
    ): Promise<UMsgError | MessageSentResponse>;

    /**
       *
       * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
       * @param contact ontact ID or Contact IDs array example :
              14000000001@c.us
              or
              14000000001@c.us,14000000002@c.us,14000000003@c.us
              Max length : 300 char , almost 15 contacts
       * @param priority the message priority
       * @param referenceId the reference id
       * @returns Promise<UMsgError | MessageSentResponse>
       */
    sendContactMessage(
      to: string,
      contact: string,
      priority?: number,
      referenceId?: string
    ): Promise<UMsgError | MessageSentResponse>;

    /**
       *
       * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
       * @param address Text under the location.
                  Supports two lines. To use two lines, use the \n symbol.
                  Max length : 300 char
       * @param lat
       * @param lng
       * @param priority
       * @param referenceId
       * @returns Promise<UMsgError | MessageSentResponse>
       */
    sendLocationMessage(
      to: string,
      address: string,
      lat: number,
      lng: number,
      priority?: number,
      referenceId?: string
    ): Promise<UMsgError | MessageSentResponse>;

    /**
       *
       * @param to Phone with international format e.g. +1408XXXXXXX , or chatID for contact or group
       * @param vcard Text value vcard 3.0
              Max length : 4096 char
              Example :
              BEGIN:VCARD\nVERSION:3.0\nN:lastname;firstname\nFN:firstname lastname\nTEL;TYPE=CELL;waid=14000000001:14000000002\nNICKNAME:nickname\nBDAY:01.01.1987\nX-GENDER:M\nNOTE:note\nADR;TYPE=home:;;;;;;\nADR;TYPE=work_:;;;;;;\nEND:VCARD
       * @param priority the message priority
       * @param referenceId the reference id
       */
    sendVcardMessage(
      to: string,
      vcard: string,
      priority?: number,
      referenceId?: string
    ): Promise<UMessage | MessageSentResponse>;

    /**
     *
     * @param status
     *
     * queue : delete all queue messages
     *
     * sent : delete all sent messages
     *
     * unsent : delete all unsent messages
     *
     * invalid : delete all invalid messages
     *
     * @returns Promise<UMsgError | {status: string} { success: 'done' }>
     */
    sendClearMessage(status: 'queue' | 'sent' | 'unsent' | 'invalid'): Promise<
      | UMsgError
      | { status: string }
      | {
          success: 'done';
        }
    >;

    /**
     *
     * @param status
     *
     * unsent : resend all unsent messages
     *
     * expired : resend all expired messages
     */
    resendByStatus(status: 'unsent' | 'expired'): Promise<any>;

    /**
     *
     * @param id the id of the message
     * @returns Promise<UMsgError | { success: 'done' }>
     */
    resendById(id: number): Promise<UMsgError | { success: 'done' }>;
    /**
     * @description Get the instance status
     */
    getInstanceStatus(): Promise<
      | UMsgError
      | {
          status: {
            accountStatus: {
              status: string;
              substatus: string;
            };
          };
        }
    >;

    /**
     * @description Get the instance qr code
     */
    getInstanceQr(): Promise<any>;

    /**
     * @description Get the instance screenshot
     */
    getInstanceQrCode(): Promise<any>;

    /**
     *
     * @param encoding the encoding
     */
    getInstanceScreenshot(encoding?: string): Promise<any>;

    /**
     * @description Get the instance me
     */
    getInstanceMe(): Promise<any>;

    /**
     * @description Get the instance settings
     */
    getInstanceSettings(): Promise<any>;

    sendInstanceTakeover(): Promise<any>;
    sendInstanceLogout(): Promise<any>;
    sendInstanceRestart(): Promise<any>;
    sendInstanceSettings(
      sendDelay?: string,
      webhook_url?: string,
      webhook_message_received?: boolean,
      webhook_message_create?: boolean,
      webhook_message_ack?: boolean,
      webhook_message_download_media?: boolean
    ): Promise<any>;
    sendInstanceClear(): Promise<any>;
    getChats(): Promise<any>;
    getChatsMessages(chatId: any, limit?: number): Promise<any>;
    getContacts(): Promise<any>;
    getContact(chatId: any): Promise<any>;
    getBlockedContacts(): Promise<any>;
    checkContact(chatId: any): Promise<any>;
    blockContact(chatId: any): Promise<any>;
    unblockContact(chatId: any): Promise<any>;
    sendRequest(method: any, path: any, params?: object): Promise<any>;
    queryParams(params: any): string;
  }
}
