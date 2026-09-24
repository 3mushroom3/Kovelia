import type { Locale } from "@/i18n/routing";
import type { Service, ServiceCategory } from "@/lib/cms/types";

// Source: "Каталог услуг". Served when Sanity is not configured.

export const categories: Record<Locale, ServiceCategory[]> = {
  ru: [
    {
      id: "ai",
      index: "01",
      label: "AI & ML",
      title: "Искусственный интеллект и машинное обучение",
      description: "Языковые модели, RAG-ассистенты и автономные агенты, обученные на данных вашей компании.",
      accent: "green",
    },
    {
      id: "data",
      index: "02",
      label: "Data",
      title: "Аналитические платформы и работа с данными",
      description: "Собираем данные из разрозненных источников в понятные платформы, дашборды и нишевые CRM.",
      accent: "blue",
    },
    {
      id: "infra",
      index: "03",
      label: "Infra",
      title: "Серверная инфраструктура и DevOps",
      description: "Серверы, VPN, CI/CD и мониторинг: настраиваем с нуля, документируем и сопровождаем.",
      accent: "amber",
    },
    {
      id: "systems",
      index: "04",
      label: "Systems",
      title: "Системное и встраиваемое ПО",
      description: "C++ под Linux, обработка сигналов и сенсорных данных, надёжные утилиты и демоны.",
      accent: "slate",
    },
  ],
  en: [
    {
      id: "ai",
      index: "01",
      label: "AI & ML",
      title: "Artificial intelligence & machine learning",
      description: "Language models, RAG assistants and autonomous agents trained on your company data.",
      accent: "green",
    },
    {
      id: "data",
      index: "02",
      label: "Data",
      title: "Analytics platforms & data engineering",
      description: "We bring scattered data together into clear platforms, dashboards and niche CRMs.",
      accent: "blue",
    },
    {
      id: "infra",
      index: "03",
      label: "Infra",
      title: "Server infrastructure & DevOps",
      description: "Servers, VPN, CI/CD and monitoring — set up from scratch, documented and maintained.",
      accent: "amber",
    },
    {
      id: "systems",
      index: "04",
      label: "Systems",
      title: "Systems & embedded software",
      description: "C++ on Linux, signal and sensor processing, reliable utilities and daemons.",
      accent: "slate",
    },
  ],
};

export const services: Record<Locale, Service[]> = {
  ru: [
    {
      slug: "llm-finetuning",
      category: "ai",
      title: "Дообучение и файн-тюнинг LLM",
      summary:
        "Адаптируем языковые модели (Llama, Mistral, Qwen и др.) под вашу предметную область: обучение на корпоративных данных, специализированные ассистенты, отраслевые чат-боты.",
      tags: ["LoRA / QLoRA", "RLHF", "RAG", "vLLM"],
    },
    {
      slug: "rag-assistants",
      category: "ai",
      title: "RAG-системы и корпоративные ассистенты",
      summary:
        "Интеграция LLM с внутренней базой знаний: поиск по документам, регламентам и базам данных. Ответы в контексте вашего бизнеса, а не общая информация из интернета.",
      tags: ["LlamaIndex", "LangChain", "векторные БД"],
    },
    {
      slug: "ai-agents",
      category: "ai",
      title: "AI-агенты и автоматизация процессов",
      summary:
        "Агенты, которые выполняют задачи автономно: собирают данные, пишут отчёты, работают с API, мониторят рынок. Оркестрация через MCP, AutoGen и собственные фреймворки.",
      tags: ["MCP", "AutoGen", "API-интеграции"],
    },
    {
      slug: "anomaly-detection",
      category: "ai",
      title: "Детектирование аномалий и событий",
      summary:
        "ML-модели для обнаружения звуков и паттернов в реальном времени: промышленные объекты, охранные системы, акустический мониторинг. Работают на edge-устройствах.",
      tags: ["PyTorch", "ONNX", "edge ML", "SBC"],
    },
    {
      slug: "analytics-platforms",
      category: "data",
      title: "Платформы для трейдеров и менеджеров",
      summary:
        "Агрегируем рыночные и операционные данные из разных источников в единый интерфейс: фильтры, уведомления и история в одном месте, без Excel-таблиц.",
      tags: ["PostgreSQL", "FastAPI", "React", "WebSocket"],
    },
    {
      slug: "data-parsing",
      category: "data",
      title: "Парсинг и сбор данных",
      summary:
        "Автоматический сбор информации с сайтов, API, Telegram-каналов и биржевых лент. Очистка, структурирование и хранение в удобном формате. Умеем работать с антибот-защитой.",
      tags: ["Playwright", "Scrapy", "Selenium"],
    },
    {
      slug: "custom-crm",
      category: "data",
      title: "CRM / ERP для нишевых задач",
      summary:
        "Когда стандартные системы не подходят, пишем свою под конкретный процесс: зерновой трейдинг, логистику, производство. Только то, что действительно нужно вашей команде.",
      tags: ["custom DB", "roles & ACL", "REST API"],
    },
    {
      slug: "dashboards",
      category: "data",
      title: "Дашборды и аналитические панели",
      summary:
        "KPI, отчёты в реальном времени и исторические графики. Интеграция с 1С, Google Sheets и внутренними БД. Доступ из браузера без установки ПО.",
      tags: ["Grafana", "Recharts", "Metabase"],
    },
    {
      slug: "servers-vpn",
      category: "infra",
      title: "Развёртывание серверов и VPN",
      summary:
        "Серверы под любые задачи: деплой приложений, корпоративный VPN, проксирование трафика. Настройка с нуля, документация и передача под ваше управление.",
      tags: ["WireGuard", "Nginx", "Docker", "Ubuntu/Debian"],
    },
    {
      slug: "linux-admin",
      category: "infra",
      title: "Администрирование Linux-серверов",
      summary:
        "Настройка и сопровождение Linux-окружений: безопасность, мониторинг, резервное копирование, автоматические обновления. Аудит текущей инфраструктуры с рекомендациями.",
      tags: ["systemd", "Prometheus", "Fail2Ban"],
    },
    {
      slug: "ci-cd",
      category: "infra",
      title: "CI/CD и автоматизация деплоя",
      summary:
        "Пайплайны автоматической сборки, тестирования и деплоя. Код попадает на сервер по одной кнопке, без ручных операций.",
      tags: ["GitHub Actions", "Docker", "Ansible"],
    },
    {
      slug: "cpp-linux",
      category: "systems",
      title: "Разработка на C++ под Linux",
      summary:
        "Высокопроизводительные приложения, системные утилиты, демоны и модули ядра, когда важны скорость и предсказуемое поведение.",
      tags: ["C++17/20", "POSIX", "multithreading"],
    },
    {
      slug: "signal-processing",
      category: "systems",
      title: "Обработка сигналов и сенсорных данных",
      summary:
        "Приём, фильтрация и анализ данных с датчиков, микрофонов, SDR-приёмников и промышленных интерфейсов (UART, I2C, SPI) в реальном времени с низкими задержками.",
      tags: ["DSP", "FFT", "embedded Linux"],
    },
    {
      slug: "cli-tools",
      category: "systems",
      title: "Desktop-утилиты и CLI-инструменты",
      summary:
        "Внутренние инструменты: конвертеры, мониторы, автоматизаторы задач. Работают стабильно, без GUI-зависимостей, подходят для скриптов и серверов.",
      tags: ["CLI", "ncurses", "systemd service"],
    },
  ],
  en: [
    {
      slug: "llm-finetuning",
      category: "ai",
      title: "LLM fine-tuning",
      summary:
        "We adapt language models (Llama, Mistral, Qwen and others) to your domain: training on corporate data, specialised assistants, industry chatbots.",
      tags: ["LoRA / QLoRA", "RLHF", "RAG", "vLLM"],
    },
    {
      slug: "rag-assistants",
      category: "ai",
      title: "RAG systems & corporate assistants",
      summary:
        "LLMs connected to your internal knowledge base: search across documents, policies and databases. Answers grounded in your business, not generic internet content.",
      tags: ["LlamaIndex", "LangChain", "vector DBs"],
    },
    {
      slug: "ai-agents",
      category: "ai",
      title: "AI agents & process automation",
      summary:
        "Agents that work autonomously: collect data, write reports, call APIs, monitor markets. Orchestrated with MCP, AutoGen and custom frameworks.",
      tags: ["MCP", "AutoGen", "API integrations"],
    },
    {
      slug: "anomaly-detection",
      category: "ai",
      title: "Anomaly & event detection",
      summary:
        "Real-time ML models that detect sounds and patterns: industrial sites, security systems, acoustic monitoring. Runs on edge devices.",
      tags: ["PyTorch", "ONNX", "edge ML", "SBC"],
    },
    {
      slug: "analytics-platforms",
      category: "data",
      title: "Platforms for traders & managers",
      summary:
        "Market and operational data from many sources in one interface: filters, alerts and history in one place — no more spreadsheets.",
      tags: ["PostgreSQL", "FastAPI", "React", "WebSocket"],
    },
    {
      slug: "data-parsing",
      category: "data",
      title: "Web scraping & data collection",
      summary:
        "Automated collection from websites, APIs, Telegram channels and market feeds. Cleaning, structuring and storage in a usable format. Anti-bot protection handled.",
      tags: ["Playwright", "Scrapy", "Selenium"],
    },
    {
      slug: "custom-crm",
      category: "data",
      title: "CRM / ERP for niche workflows",
      summary:
        "When off-the-shelf systems don't fit, we build one around your process: grain trading, logistics, manufacturing. Only what your team actually needs.",
      tags: ["custom DB", "roles & ACL", "REST API"],
    },
    {
      slug: "dashboards",
      category: "data",
      title: "Dashboards & analytics panels",
      summary:
        "KPIs, real-time reports and historical charts. Integrations with 1C, Google Sheets and internal databases. Works in the browser, nothing to install.",
      tags: ["Grafana", "Recharts", "Metabase"],
    },
    {
      slug: "servers-vpn",
      category: "infra",
      title: "Servers & VPN deployment",
      summary:
        "Servers for any workload: app deployment, corporate VPN, traffic proxying. Set up from scratch, documented and handed over to you.",
      tags: ["WireGuard", "Nginx", "Docker", "Ubuntu/Debian"],
    },
    {
      slug: "linux-admin",
      category: "infra",
      title: "Linux server administration",
      summary:
        "Setting up and maintaining Linux environments: security, monitoring, backups, automatic updates. Audits of existing infrastructure with recommendations.",
      tags: ["systemd", "Prometheus", "Fail2Ban"],
    },
    {
      slug: "ci-cd",
      category: "infra",
      title: "CI/CD & deployment automation",
      summary:
        "Pipelines for automated builds, tests and deployments. Your code reaches the server in one click, with no manual steps.",
      tags: ["GitHub Actions", "Docker", "Ansible"],
    },
    {
      slug: "cpp-linux",
      category: "systems",
      title: "C++ development for Linux",
      summary:
        "High-performance applications, system utilities, daemons and kernel modules — when speed and predictable behaviour matter.",
      tags: ["C++17/20", "POSIX", "multithreading"],
    },
    {
      slug: "signal-processing",
      category: "systems",
      title: "Signal & sensor data processing",
      summary:
        "Acquisition, filtering and analysis of data from sensors, microphones, SDR receivers and industrial buses (UART, I2C, SPI) in real time with low latency.",
      tags: ["DSP", "FFT", "embedded Linux"],
    },
    {
      slug: "cli-tools",
      category: "systems",
      title: "Desktop utilities & CLI tools",
      summary:
        "Internal tools: converters, monitors, task automators. Stable, free of GUI dependencies, ready for scripting and servers.",
      tags: ["CLI", "ncurses", "systemd service"],
    },
  ],
};
