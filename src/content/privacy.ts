import type { Locale } from "@/i18n/routing";

// TODO(legal): review with a lawyer and add the operator's legal name, INN/OGRN and address (152-FZ, art. 18.1).

type Block = { heading: string; paragraphs: string[] };

export const privacy: Record<Locale, Block[]> = {
  ru: [
    {
      heading: "1. Общие положения",
      paragraphs: [
        "Настоящая политика определяет порядок обработки персональных данных посетителей сайта KOVELIA (далее — Сайт) в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».",
        "Отправляя заявку через форму на Сайте, пользователь подтверждает согласие с настоящей политикой.",
      ],
    },
    {
      heading: "2. Какие данные мы обрабатываем",
      paragraphs: [
        "Имя, адрес электронной почты, номер телефона (по желанию), выбранная услуга и текст сообщения, которые пользователь указывает в форме заявки.",
        "Сайт не использует рекламные трекеры. Технические данные (IP-адрес, тип браузера) могут временно храниться в журналах сервера для обеспечения безопасности.",
      ],
    },
    {
      heading: "3. Цели обработки",
      paragraphs: [
        "Ответ на заявку, подготовка коммерческого или технического предложения, заключение и исполнение договора.",
      ],
    },
    {
      heading: "4. Хранение и защита",
      paragraphs: [
        "Данные передаются по защищённому соединению (HTTPS) и хранятся не дольше, чем это необходимо для достижения целей обработки, либо до отзыва согласия.",
        "Доступ к данным имеют только сотрудники, непосредственно работающие с заявками.",
      ],
    },
    {
      heading: "5. Передача третьим лицам",
      paragraphs: [
        "Мы не продаём и не передаём персональные данные третьим лицам, за исключением сервисов доставки уведомлений о заявках (электронная почта, мессенджеры) и случаев, предусмотренных законодательством РФ.",
      ],
    },
    {
      heading: "6. Права пользователя",
      paragraphs: [
        "Пользователь вправе запросить сведения об обработке своих данных, потребовать их уточнения или удаления, а также отозвать согласие, написав на адрес электронной почты, указанный на Сайте.",
      ],
    },
  ],
  en: [
    {
      heading: "1. General",
      paragraphs: [
        "This policy describes how KOVELIA (the Website) processes the personal data of its visitors in accordance with Russian Federal Law No. 152-FZ “On Personal Data”.",
        "By submitting a request through the form on the Website, the user agrees to this policy.",
      ],
    },
    {
      heading: "2. Data we process",
      paragraphs: [
        "Name, email address, phone number (optional), the selected service and the message text the user provides in the request form.",
        "The Website uses no advertising trackers. Technical data (IP address, browser type) may be kept temporarily in server logs for security purposes.",
      ],
    },
    {
      heading: "3. Purposes",
      paragraphs: [
        "Replying to requests, preparing commercial or technical proposals, concluding and performing contracts.",
      ],
    },
    {
      heading: "4. Storage and protection",
      paragraphs: [
        "Data is transmitted over a secure connection (HTTPS) and stored no longer than needed for these purposes or until consent is withdrawn.",
        "Only staff who handle requests have access to the data.",
      ],
    },
    {
      heading: "5. Third parties",
      paragraphs: [
        "We do not sell or share personal data with third parties, except for services that deliver request notifications (email, messengers) and cases required by Russian law.",
      ],
    },
    {
      heading: "6. User rights",
      paragraphs: [
        "Users may request information about the processing of their data, ask for it to be corrected or deleted, or withdraw consent by writing to the email address listed on the Website.",
      ],
    },
  ],
};
