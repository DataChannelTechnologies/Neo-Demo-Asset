export interface StoryboardWidget {
  id: string;
  type: "chart" | "kpi" | "table";
  title: string;
  span?: "half" | "full";
  chartOption?: any;
  kpiValue?: string;
  kpiLabel?: string;
  kpiChange?: string;
  kpiTrend?: "up" | "down";
  tableColumns?: string[];
  tableRows?: (string | number)[][];
}

export interface Storyboard {
  id: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  mockup: "A" | "B" | "C";
  widgets: StoryboardWidget[];
}
