export type EmailAddress = {
  name: string;
  address: string;
};

export type EmailReceiver =
  | string
  | EmailAddress
  | Array<string | EmailAddress>;

type Options = {
  subject?: string;
  from: string | EmailAddress;
  to: EmailReceiver;
  cc?: EmailReceiver;
  bcc?: EmailReceiver;
};

export type TextEmailOptions = {
  text: string;
} & Options;

export type HtmlEmailOptions = {
  html: string;
} & Options;

export type EmailOptions = TextEmailOptions | HtmlEmailOptions;
