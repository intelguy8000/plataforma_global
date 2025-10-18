// Static historical data for 24 months (Nov 2023 - Oct 2025)
// Fixed data to ensure consistency across chat and dashboards

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export interface MonthlyMetrics {
  yearMonth: string;        // "2024-01"
  year: number;
  month: number;            // 0-11
  monthName: string;        // "Enero"
  date: Date;

  // Core Metrics
  revenue: number;          // COP
  costs: number;
  grossProfit: number;
  netProfit: number;
  marginPercentage: number;

  // Volume Metrics
  leads: number;
  conversions: number;
  conversionRate: number;   // percentage
  activeStudents: number;

  // Efficiency
  averageCommission: number;
  cac: number;              // Customer Acquisition Cost

  // Growth
  momGrowth: number;        // Month-over-month %
  yoyGrowth: number;        // Year-over-year %
}

// Static 24 months of data - Nov 2023 to Oct 2025
// These numbers are fixed to avoid inconsistencies between chat and dashboards
const STATIC_DATA: Omit<MonthlyMetrics, 'date' | 'monthName'>[] = [
  // Nov 2023 - LOW SEASON
  { yearMonth: '2023-11', year: 2023, month: 10, revenue: 105_000_000, costs: 50_400_000, grossProfit: 54_600_000, netProfit: 40_950_000, marginPercentage: 52, leads: 420, conversions: 42, conversionRate: 10, activeStudents: 39, averageCommission: 2_500_000, cac: 1_000_000, momGrowth: 0, yoyGrowth: 0 },

  // Dec 2023 - LOW SEASON (holidays) - Lower margin due to holidays
  { yearMonth: '2023-12', year: 2023, month: 11, revenue: 68_000_000, costs: 34_680_000, grossProfit: 33_320_000, netProfit: 24_990_000, marginPercentage: 37, leads: 210, conversions: 20, conversionRate: 9.5, activeStudents: 18, averageCommission: 3_400_000, cac: 1_360_000, momGrowth: -35.2, yoyGrowth: 0 },

  // Jan 2024 - HIGH SEASON - Peak margin
  { yearMonth: '2024-01', year: 2024, month: 0, revenue: 350_000_000, costs: 122_500_000, grossProfit: 227_500_000, netProfit: 170_625_000, marginPercentage: 65, leads: 672, conversions: 84, conversionRate: 12.5, activeStudents: 77, averageCommission: 4_167_000, cac: 1_667_000, momGrowth: 414.7, yoyGrowth: 0 },

  // Feb 2024 - HIGH SEASON - Good margin
  { yearMonth: '2024-02', year: 2024, month: 1, revenue: 365_000_000, costs: 131_400_000, grossProfit: 233_600_000, netProfit: 175_200_000, marginPercentage: 60, leads: 756, conversions: 88, conversionRate: 11.6, activeStudents: 81, averageCommission: 4_148_000, cac: 1_659_000, momGrowth: 4.3, yoyGrowth: 0 },

  // Mar 2024 - HIGH SEASON - Declining margin
  { yearMonth: '2024-03', year: 2024, month: 2, revenue: 315_000_000, costs: 119_700_000, grossProfit: 195_300_000, netProfit: 146_475_000, marginPercentage: 54, leads: 630, conversions: 75, conversionRate: 11.9, activeStudents: 69, averageCommission: 4_200_000, cac: 1_680_000, momGrowth: -13.7, yoyGrowth: 0 },

  // Apr 2024 - LOW SEASON - Low margin
  { yearMonth: '2024-04', year: 2024, month: 3, revenue: 135_000_000, costs: 66_150_000, grossProfit: 68_850_000, netProfit: 51_637_500, marginPercentage: 42, leads: 294, conversions: 35, conversionRate: 11.9, activeStudents: 32, averageCommission: 3_857_000, cac: 1_543_000, momGrowth: -57.1, yoyGrowth: 0 },

  // May 2024 - MID SEASON - Recovering margin
  { yearMonth: '2024-05', year: 2024, month: 4, revenue: 210_000_000, costs: 94_500_000, grossProfit: 115_500_000, netProfit: 86_625_000, marginPercentage: 48, leads: 462, conversions: 52, conversionRate: 11.3, activeStudents: 48, averageCommission: 4_038_000, cac: 1_615_000, momGrowth: 55.6, yoyGrowth: 0 },

  // Jun 2024 - MID SEASON - Improving
  { yearMonth: '2024-06', year: 2024, month: 5, revenue: 255_000_000, costs: 107_100_000, grossProfit: 147_900_000, netProfit: 110_925_000, marginPercentage: 56, leads: 546, conversions: 60, conversionRate: 11.0, activeStudents: 55, averageCommission: 4_250_000, cac: 1_700_000, momGrowth: 21.4, yoyGrowth: 0 },

  // Jul 2024 - HIGH SEASON - Strong margin
  { yearMonth: '2024-07', year: 2024, month: 6, revenue: 295_000_000, costs: 109_250_000, grossProfit: 185_750_000, netProfit: 139_312_500, marginPercentage: 63, leads: 588, conversions: 68, conversionRate: 11.6, activeStudents: 63, averageCommission: 4_338_000, cac: 1_735_000, momGrowth: 15.7, yoyGrowth: 0 },

  // Aug 2024 - HIGH SEASON - Slight dip
  { yearMonth: '2024-08', year: 2024, month: 7, revenue: 285_000_000, costs: 105_450_000, grossProfit: 179_550_000, netProfit: 134_662_500, marginPercentage: 58, leads: 546, conversions: 65, conversionRate: 11.9, activeStudents: 60, averageCommission: 4_385_000, cac: 1_754_000, momGrowth: -3.4, yoyGrowth: 0 },

  // Sep 2024 - MID SEASON - Declining
  { yearMonth: '2024-09', year: 2024, month: 8, revenue: 220_000_000, costs: 99_000_000, grossProfit: 121_000_000, netProfit: 90_750_000, marginPercentage: 45, leads: 420, conversions: 50, conversionRate: 11.9, activeStudents: 46, averageCommission: 4_400_000, cac: 1_760_000, momGrowth: -22.8, yoyGrowth: 0 },

  // Oct 2024 - MID SEASON - Recovering
  { yearMonth: '2024-10', year: 2024, month: 9, revenue: 240_000_000, costs: 103_200_000, grossProfit: 136_800_000, netProfit: 102_600_000, marginPercentage: 51, leads: 462, conversions: 55, conversionRate: 11.9, activeStudents: 51, averageCommission: 4_364_000, cac: 1_745_000, momGrowth: 9.1, yoyGrowth: 0 },

  // Nov 2024 - LOW SEASON
  { yearMonth: '2024-11', year: 2024, month: 10, revenue: 250_000_000, costs: 120_000_000, grossProfit: 130_000_000, netProfit: 97_500_000, marginPercentage: 52, leads: 504, conversions: 60, conversionRate: 11.9, activeStudents: 55, averageCommission: 4_167_000, cac: 1_667_000, momGrowth: 4.2, yoyGrowth: 138.1 },

  // Dec 2024 - LOW SEASON (holidays)
  { yearMonth: '2024-12', year: 2024, month: 11, revenue: 160_000_000, costs: 81_600_000, grossProfit: 78_400_000, netProfit: 58_800_000, marginPercentage: 49, leads: 252, conversions: 40, conversionRate: 15.9, activeStudents: 37, averageCommission: 4_000_000, cac: 1_600_000, momGrowth: -36.0, yoyGrowth: 135.3 },

  // Jan 2025 - HIGH SEASON
  { yearMonth: '2025-01', year: 2025, month: 0, revenue: 420_000_000, costs: 147_000_000, grossProfit: 273_000_000, netProfit: 204_750_000, marginPercentage: 65, leads: 806, conversions: 100, conversionRate: 12.4, activeStudents: 92, averageCommission: 4_200_000, cac: 1_680_000, momGrowth: 162.5, yoyGrowth: 20.0 },

  // Feb 2025 - HIGH SEASON
  { yearMonth: '2025-02', year: 2025, month: 1, revenue: 438_000_000, costs: 157_680_000, grossProfit: 280_320_000, netProfit: 210_240_000, marginPercentage: 64, leads: 907, conversions: 106, conversionRate: 11.7, activeStudents: 98, averageCommission: 4_132_000, cac: 1_653_000, momGrowth: 4.3, yoyGrowth: 20.0 },

  // Mar 2025 - HIGH SEASON
  { yearMonth: '2025-03', year: 2025, month: 2, revenue: 378_000_000, costs: 143_640_000, grossProfit: 234_360_000, netProfit: 175_770_000, marginPercentage: 62, leads: 756, conversions: 90, conversionRate: 11.9, activeStudents: 83, averageCommission: 4_200_000, cac: 1_680_000, momGrowth: -13.7, yoyGrowth: 20.0 },

  // Apr 2025 - LOW SEASON
  { yearMonth: '2025-04', year: 2025, month: 3, revenue: 162_000_000, costs: 79_380_000, grossProfit: 82_620_000, netProfit: 61_965_000, marginPercentage: 51, leads: 353, conversions: 42, conversionRate: 11.9, activeStudents: 39, averageCommission: 3_857_000, cac: 1_543_000, momGrowth: -57.1, yoyGrowth: 20.0 },

  // May 2025 - MID SEASON
  { yearMonth: '2025-05', year: 2025, month: 4, revenue: 252_000_000, costs: 113_400_000, grossProfit: 138_600_000, netProfit: 103_950_000, marginPercentage: 55, leads: 554, conversions: 62, conversionRate: 11.2, activeStudents: 57, averageCommission: 4_065_000, cac: 1_626_000, momGrowth: 55.6, yoyGrowth: 20.0 },

  // Jun 2025 - MID SEASON
  { yearMonth: '2025-06', year: 2025, month: 5, revenue: 306_000_000, costs: 128_520_000, grossProfit: 177_480_000, netProfit: 133_110_000, marginPercentage: 58, leads: 655, conversions: 72, conversionRate: 11.0, activeStudents: 66, averageCommission: 4_250_000, cac: 1_700_000, momGrowth: 21.4, yoyGrowth: 20.0 },

  // Jul 2025 - HIGH SEASON
  { yearMonth: '2025-07', year: 2025, month: 6, revenue: 354_000_000, costs: 130_980_000, grossProfit: 223_020_000, netProfit: 167_265_000, marginPercentage: 63, leads: 706, conversions: 82, conversionRate: 11.6, activeStudents: 75, averageCommission: 4_317_000, cac: 1_727_000, momGrowth: 15.7, yoyGrowth: 20.0 },

  // Aug 2025 - HIGH SEASON
  { yearMonth: '2025-08', year: 2025, month: 7, revenue: 342_000_000, costs: 129_960_000, grossProfit: 212_040_000, netProfit: 159_030_000, marginPercentage: 62, leads: 655, conversions: 78, conversionRate: 11.9, activeStudents: 72, averageCommission: 4_385_000, cac: 1_754_000, momGrowth: -3.4, yoyGrowth: 20.0 },

  // Sep 2025 - MID SEASON
  { yearMonth: '2025-09', year: 2025, month: 8, revenue: 264_000_000, costs: 118_800_000, grossProfit: 145_200_000, netProfit: 108_900_000, marginPercentage: 56, leads: 504, conversions: 60, conversionRate: 11.9, activeStudents: 55, averageCommission: 4_400_000, cac: 1_760_000, momGrowth: -22.8, yoyGrowth: 20.0 },

  // Oct 2025 - MID SEASON
  { yearMonth: '2025-10', year: 2025, month: 9, revenue: 288_000_000, costs: 123_840_000, grossProfit: 164_160_000, netProfit: 123_120_000, marginPercentage: 57, leads: 554, conversions: 66, conversionRate: 11.9, activeStudents: 61, averageCommission: 4_364_000, cac: 1_745_000, momGrowth: 9.1, yoyGrowth: 20.0 },
];

// Convert static data to full MonthlyMetrics with Date objects
export function getHistoricalData(): MonthlyMetrics[] {
  return STATIC_DATA.map(item => ({
    ...item,
    date: new Date(item.yearMonth + '-01'),
    monthName: format(new Date(item.yearMonth + '-01'), 'MMMM', { locale: es })
  }));
}

// Get data for specific time range
export function getDataForRange(startMonth: string, endMonth: string): MonthlyMetrics[] {
  const allData = getHistoricalData();
  return allData.filter(m => m.yearMonth >= startMonth && m.yearMonth <= endMonth);
}

// Get most recent month
export function getCurrentMonthData(): MonthlyMetrics {
  const allData = getHistoricalData();
  return allData[allData.length - 1];
}

// Get YoY comparison
export function getYoYComparison(): { month: string; year2024: number; year2025: number }[] {
  const allData = getHistoricalData();
  const comparison: { month: string; year2024: number; year2025: number }[] = [];

  for (let month = 0; month < 12; month++) {
    const data2024 = allData.find(m => m.year === 2024 && m.month === month);
    const data2025 = allData.find(m => m.year === 2025 && m.month === month);

    if (data2024 || data2025) {
      comparison.push({
        month: data2024?.monthName || data2025?.monthName || '',
        year2024: data2024?.revenue || 0,
        year2025: data2025?.revenue || 0
      });
    }
  }

  return comparison;
}

// Get last N months
export function getLastNMonths(n: number): MonthlyMetrics[] {
  const allData = getHistoricalData();
  return allData.slice(-n);
}

// Calculate totals for a range
export function calculateTotals(data: MonthlyMetrics[]) {
  return {
    totalRevenue: data.reduce((sum, m) => sum + m.revenue, 0),
    totalLeads: data.reduce((sum, m) => sum + m.leads, 0),
    totalConversions: data.reduce((sum, m) => sum + m.conversions, 0),
    avgConversionRate: data.reduce((sum, m) => sum + m.conversionRate, 0) / data.length,
    totalProfit: data.reduce((sum, m) => sum + m.grossProfit, 0)
  };
}
