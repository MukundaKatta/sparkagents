export type ToolCategory = 'search' | 'communication' | 'data' | 'integration' | 'utility' | 'custom';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  is_builtin: boolean;
  is_public: boolean;
  owner_id?: string;
  parameters: ToolParameter[];
  auth_config?: ToolAuthConfig;
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body_template?: string;
  response_mapping?: string;
  created_at: string;
  updated_at: string;
}

export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
  default?: unknown;
  enum?: string[];
}

export interface ToolAuthConfig {
  type: 'api_key' | 'oauth2' | 'bearer' | 'basic' | 'none';
  config: Record<string, string>;
}

export interface ToolExecution {
  tool_id: string;
  input: Record<string, unknown>;
  output: unknown;
  status: 'success' | 'error';
  duration_ms: number;
  error?: string;
}

export const BUILTIN_TOOLS: Omit<Tool, 'created_at' | 'updated_at'>[] = [
  {
    id: 'google-search',
    name: 'Google Search',
    description: 'Search the web using Google Search API. Returns top results with titles, snippets, and URLs.',
    category: 'search',
    icon: 'Search',
    is_builtin: true,
    is_public: true,
    parameters: [
      { name: 'query', type: 'string', description: 'Search query', required: true },
      { name: 'num_results', type: 'number', description: 'Number of results (1-10)', required: false, default: 5 },
    ],
  },
  {
    id: 'send-email',
    name: 'Send Email',
    description: 'Send an email via SendGrid. Supports HTML content and attachments.',
    category: 'communication',
    icon: 'Mail',
    is_builtin: true,
    is_public: true,
    parameters: [
      { name: 'to', type: 'string', description: 'Recipient email address', required: true },
      { name: 'subject', type: 'string', description: 'Email subject line', required: true },
      { name: 'body', type: 'string', description: 'Email body (HTML supported)', required: true },
    ],
  },
  {
    id: 'slack-message',
    name: 'Slack Message',
    description: 'Send a message to a Slack channel or user.',
    category: 'communication',
    icon: 'MessageSquare',
    is_builtin: true,
    is_public: true,
    parameters: [
      { name: 'channel', type: 'string', description: 'Slack channel or user ID', required: true },
      { name: 'message', type: 'string', description: 'Message text (Markdown supported)', required: true },
    ],
  },
  {
    id: 'read-spreadsheet',
    name: 'Read Spreadsheet',
    description: 'Read data from a Google Sheets spreadsheet.',
    category: 'data',
    icon: 'Table',
    is_builtin: true,
    is_public: true,
    parameters: [
      { name: 'spreadsheet_id', type: 'string', description: 'Google Sheets spreadsheet ID', required: true },
      { name: 'range', type: 'string', description: 'Cell range (e.g., Sheet1!A1:D10)', required: true },
    ],
  },
  {
    id: 'write-spreadsheet',
    name: 'Write Spreadsheet',
    description: 'Write data to a Google Sheets spreadsheet.',
    category: 'data',
    icon: 'FileSpreadsheet',
    is_builtin: true,
    is_public: true,
    parameters: [
      { name: 'spreadsheet_id', type: 'string', description: 'Google Sheets spreadsheet ID', required: true },
      { name: 'range', type: 'string', description: 'Cell range to write to', required: true },
      { name: 'values', type: 'array', description: 'Array of row arrays to write', required: true },
    ],
  },
  {
    id: 'http-request',
    name: 'HTTP Request',
    description: 'Make an HTTP request to any URL. Useful for calling APIs and webhooks.',
    category: 'integration',
    icon: 'Globe',
    is_builtin: true,
    is_public: true,
    parameters: [
      { name: 'url', type: 'string', description: 'Request URL', required: true },
      { name: 'method', type: 'string', description: 'HTTP method', required: true, enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
      { name: 'headers', type: 'object', description: 'Request headers', required: false },
      { name: 'body', type: 'string', description: 'Request body (JSON string)', required: false },
    ],
  },
  {
    id: 'web-scraper',
    name: 'Web Scraper',
    description: 'Extract text content from a web page URL.',
    category: 'search',
    icon: 'FileText',
    is_builtin: true,
    is_public: true,
    parameters: [
      { name: 'url', type: 'string', description: 'URL to scrape', required: true },
      { name: 'selector', type: 'string', description: 'CSS selector to extract (optional)', required: false },
    ],
  },
  {
    id: 'json-transform',
    name: 'JSON Transform',
    description: 'Transform JSON data using JSONPath expressions.',
    category: 'utility',
    icon: 'Braces',
    is_builtin: true,
    is_public: true,
    parameters: [
      { name: 'data', type: 'object', description: 'Input JSON data', required: true },
      { name: 'expression', type: 'string', description: 'JSONPath expression', required: true },
    ],
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Perform mathematical calculations and unit conversions.',
    category: 'utility',
    icon: 'Calculator',
    is_builtin: true,
    is_public: true,
    parameters: [
      { name: 'expression', type: 'string', description: 'Math expression to evaluate', required: true },
    ],
  },
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    description: 'Summarize long text into key points.',
    category: 'utility',
    icon: 'AlignLeft',
    is_builtin: true,
    is_public: true,
    parameters: [
      { name: 'text', type: 'string', description: 'Text to summarize', required: true },
      { name: 'max_length', type: 'number', description: 'Maximum summary length in words', required: false, default: 150 },
    ],
  },
];
