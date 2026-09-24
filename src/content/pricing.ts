import type { Locale } from "@/i18n/routing";
import type { PriceGroup } from "@/lib/cms/types";

// Source: "Каталог услуг" → «Ориентировочные цены». Prices exclude VAT; final cost after the briefing.

export const pricing: Record<Locale, PriceGroup[]> = {
  ru: [
    {
      title: "AI и автоматизация",
      items: [
        {
          title: "AI-агент / автоматизация бизнес-процесса",
          note: "Один агент с интеграцией в 1–2 внешних сервиса",
          price: "от 60 000 ₽",
          unit: "project",
          service: "ai-agents",
        },
        {
          title: "RAG-система / корпоративный ассистент",
          note: "Поиск по документам компании, база знаний",
          price: "от 120 000 ₽",
          unit: "project",
          service: "rag-assistants",
        },
        {
          title: "Файн-тюнинг LLM под отраслевую задачу",
          note: "Подготовка данных, обучение, оценка качества",
          price: "от 200 000 ₽",
          unit: "project",
          service: "llm-finetuning",
        },
        {
          title: "ML-модель детектирования (аудио / сигналы)",
          note: "Разработка, обучение, деплой на edge-устройство",
          price: "от 150 000 ₽",
          unit: "project",
          service: "anomaly-detection",
        },
      ],
    },
    {
      title: "Аналитика и данные",
      items: [
        {
          title: "Telegram-бот с бизнес-логикой",
          note: "Уведомления, команды, интеграция с БД",
          price: "от 40 000 ₽",
          unit: "project",
        },
        {
          title: "Аналитическая платформа для трейдеров / менеджеров",
          note: "Агрегация данных и веб-интерфейс",
          price: "от 100 000 ₽",
          unit: "project",
          service: "analytics-platforms",
        },
        {
          title: "Парсер / коллектор данных",
          note: "Сбор, очистка, хранение по расписанию",
          price: "30 000–80 000 ₽",
          unit: "project",
          service: "data-parsing",
        },
        {
          title: "Нишевая CRM / ERP-система",
          note: "Под конкретный процесс компании",
          price: "от 180 000 ₽",
          unit: "project",
          service: "custom-crm",
        },
      ],
    },
    {
      title: "Инфраструктура и системное ПО",
      items: [
        {
          title: "Настройка сервера / VPN / деплой приложения",
          note: "Разовые работы",
          price: "от 25 000 ₽",
          unit: "project",
          service: "servers-vpn",
        },
        {
          title: "Разработка C++ модуля / утилиты",
          note: "Производительность, надёжность, low-level",
          price: "от 80 000 ₽",
          unit: "project",
          service: "cpp-linux",
        },
        {
          title: "Сопровождение и поддержка инфраструктуры",
          note: "Мониторинг, обновления, оперативные правки",
          price: "от 25 000 ₽",
          unit: "month",
          service: "linux-admin",
        },
      ],
    },
    {
      title: "Почасовая ставка",
      items: [
        {
          title: "Консультация / техническая экспертиза",
          note: "Архитектура, выбор стека, аудит",
          price: "3 000–5 000 ₽",
          unit: "hour",
        },
        {
          title: "Time & material (разработка)",
          note: "Для задач с нечётким объёмом",
          price: "2 500–4 000 ₽",
          unit: "hour",
        },
      ],
    },
  ],
  en: [
    {
      title: "AI & automation",
      items: [
        {
          title: "AI agent / business process automation",
          note: "One agent integrated with 1–2 external services",
          price: "from ₽60,000",
          unit: "project",
          service: "ai-agents",
        },
        {
          title: "RAG system / corporate assistant",
          note: "Search across company documents, knowledge base",
          price: "from ₽120,000",
          unit: "project",
          service: "rag-assistants",
        },
        {
          title: "Industry-specific LLM fine-tuning",
          note: "Data preparation, training, quality evaluation",
          price: "from ₽200,000",
          unit: "project",
          service: "llm-finetuning",
        },
        {
          title: "Detection ML model (audio / signals)",
          note: "Development, training, deployment to an edge device",
          price: "from ₽150,000",
          unit: "project",
          service: "anomaly-detection",
        },
      ],
    },
    {
      title: "Analytics & data",
      items: [
        {
          title: "Telegram bot with business logic",
          note: "Notifications, commands, database integration",
          price: "from ₽40,000",
          unit: "project",
        },
        {
          title: "Analytics platform for traders / managers",
          note: "Data aggregation and web interface",
          price: "from ₽100,000",
          unit: "project",
          service: "analytics-platforms",
        },
        {
          title: "Scraper / data collector",
          note: "Scheduled collection, cleaning and storage",
          price: "₽30,000–80,000",
          unit: "project",
          service: "data-parsing",
        },
        {
          title: "Niche CRM / ERP system",
          note: "Built around a specific company process",
          price: "from ₽180,000",
          unit: "project",
          service: "custom-crm",
        },
      ],
    },
    {
      title: "Infrastructure & systems",
      items: [
        {
          title: "Server / VPN setup, app deployment",
          note: "One-off work",
          price: "from ₽25,000",
          unit: "project",
          service: "servers-vpn",
        },
        {
          title: "C++ module / utility development",
          note: "Performance, reliability, low-level",
          price: "from ₽80,000",
          unit: "project",
          service: "cpp-linux",
        },
        {
          title: "Infrastructure maintenance & support",
          note: "Monitoring, updates, quick fixes",
          price: "from ₽25,000",
          unit: "month",
          service: "linux-admin",
        },
      ],
    },
    {
      title: "Hourly rate",
      items: [
        {
          title: "Consulting / technical expertise",
          note: "Architecture, stack selection, audits",
          price: "₽3,000–5,000",
          unit: "hour",
        },
        {
          title: "Time & material (development)",
          note: "For tasks with an unclear scope",
          price: "₽2,500–4,000",
          unit: "hour",
        },
      ],
    },
  ],
};
