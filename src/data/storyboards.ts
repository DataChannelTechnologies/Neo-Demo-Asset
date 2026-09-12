import { Storyboard } from "../types/storyboard";

const baseGrid = {
  left: "3%",
  right: "4%",
  top: "10%",
  bottom: "10%",
  containLabel: true,
};

export const storyboards: Storyboard[] = [
  {
    id: "marketing-performance",
    title: "Marketing Performance",
    subtitle: "Ad platform spend, clicks & conversion trends",
    lastUpdated: "Updated 2 hours ago",
    mockup: "A",
    widgets: [
      {
        id: "mp-kpi-spend",
        type: "kpi",
        title: "Total Ad Spend (2024)",
        span: "half",
        kpiValue: "$363.9M",
        kpiLabel: "vs last year",
        kpiChange: "+8.2%",
        kpiTrend: "up",
      },
      {
        id: "mp-kpi-conversion",
        type: "kpi",
        title: "Avg. Conversion Value",
        span: "half",
        kpiValue: "$110,852",
        kpiLabel: "Google Ads · India",
        kpiChange: "+3.1%",
        kpiTrend: "up",
      },
      {
        id: "mp-chart-trend",
        type: "chart",
        title: "Conversion Value Trend",
        span: "full",
        chartOption: {
          grid: baseGrid,
          tooltip: { trigger: "axis" },
          xAxis: {
            type: "category",
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          },
          yAxis: { type: "value" },
          series: [
            {
              type: "line",
              smooth: true,
              areaStyle: {},
              data: [309, 313, 778, 408, 760, 427, 305, 371],
            },
          ],
        },
      },
      {
        id: "mp-chart-clicks",
        type: "chart",
        title: "Clicks by Platform",
        span: "half",
        chartOption: {
          grid: baseGrid,
          tooltip: { trigger: "item" },
          series: [
            {
              type: "pie",
              radius: ["40%", "65%"],
              itemStyle: { borderRadius: 8, borderColor: "#fff", borderWidth: 2 },
              label: { show: false },
              data: [
                { value: 60521187, name: "Facebook Ads" },
                { value: 19880107, name: "Google Ads" },
                { value: 14542769, name: "Amazon Ads" },
                { value: 2281959, name: "Flipkart Ads" },
              ],
            },
          ],
        },
      },
      {
        id: "mp-table-spend",
        type: "table",
        title: "Spend by Platform",
        span: "half",
        tableColumns: ["Platform", "Spend"],
        tableRows: [
          ["Facebook Ads", "$146.6M"],
          ["Amazon Ads", "$142.7M"],
          ["Google Ads", "$52.6M"],
          ["Flipkart Ads", "$22.1M"],
        ],
      },
    ],
  },
  {
    id: "sales-overview",
    title: "Sales Overview",
    subtitle: "Channel performance and top categories",
    lastUpdated: "Updated yesterday",
    mockup: "B",
    widgets: [
      {
        id: "so-kpi-sales",
        type: "kpi",
        title: "Marketplace Sales (Aug 2024)",
        span: "half",
        kpiValue: "$180.0M",
        kpiLabel: "vs prior month",
        kpiChange: "+5.4%",
        kpiTrend: "up",
      },
      {
        id: "so-kpi-online",
        type: "kpi",
        title: "Online Store Revenue",
        span: "half",
        kpiValue: "$1.3B",
        kpiLabel: "top sales channel",
        kpiChange: "+11.6%",
        kpiTrend: "up",
      },
      {
        id: "so-chart-channels",
        type: "chart",
        title: "Revenue by Sales Channel",
        span: "full",
        chartOption: {
          grid: baseGrid,
          tooltip: { trigger: "item" },
          legend: { bottom: 0 },
          series: [
            {
              type: "pie",
              radius: ["35%", "60%"],
              itemStyle: { borderRadius: 8, borderColor: "#fff", borderWidth: 2 },
              label: { show: false },
              data: [
                { value: 1304981464, name: "Online Store" },
                { value: 828587047, name: "Physical Store 1" },
                { value: 554615391, name: "Physical Store 2" },
                { value: 261803030, name: "Physical Store 3" },
              ],
            },
          ],
        },
      },
      {
        id: "so-chart-categories",
        type: "chart",
        title: "Top Ordered Categories",
        span: "half",
        chartOption: {
          grid: baseGrid,
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          xAxis: { type: "value" },
          yAxis: {
            type: "category",
            data: ["Serums", "Face Wash", "FMDC", "Sunscreen"],
          },
          series: [
            {
              type: "bar",
              data: [42937, 132816, 147525, 158085],
            },
          ],
        },
      },
      {
        id: "so-table-cities",
        type: "table",
        title: "Top Cities · California Shipments",
        span: "half",
        tableColumns: ["City", "Orders"],
        tableRows: [
          ["Los Angeles", "154,037"],
          ["San Francisco", "112,734"],
          ["Fresno", "78,834"],
          ["Sacramento", "28,444"],
        ],
      },
    ],
  },
  {
    id: "q3-executive-summary",
    title: "Q3 Executive Summary",
    subtitle: "Board-ready snapshot across marketing & sales",
    lastUpdated: "Updated 5 days ago",
    mockup: "C",
    widgets: [
      {
        id: "q3-kpi-spend",
        type: "kpi",
        title: "Total Ad Spend",
        span: "half",
        kpiValue: "$363.9M",
        kpiLabel: "FY 2024",
        kpiChange: "+8.2%",
        kpiTrend: "up",
      },
      {
        id: "q3-kpi-sales",
        type: "kpi",
        title: "Total Marketplace Sales",
        span: "half",
        kpiValue: "$180.0M",
        kpiLabel: "August 2024",
        kpiChange: "-2.3%",
        kpiTrend: "down",
      },
      {
        id: "q3-chart-trend",
        type: "chart",
        title: "Conversion Value Trend",
        span: "full",
        chartOption: {
          grid: baseGrid,
          tooltip: { trigger: "axis" },
          xAxis: {
            type: "category",
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          },
          yAxis: { type: "value" },
          series: [
            {
              type: "line",
              smooth: true,
              areaStyle: {},
              data: [309, 313, 778, 408, 760, 427, 305, 371],
            },
          ],
        },
      },
    ],
  },
];
