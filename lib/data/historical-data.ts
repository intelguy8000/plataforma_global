// Historical data for 24 months (Nov 2022 - Oct 2024)
// Realistic scale for education consulting business

import { addMonths, format, startOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';

export interface MonthlyMetrics {
  yearMonth: string;        // "2023-01"
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

// Seasonal multipliers based on Colombian education market
const SEASONAL_MULTIPLIERS: Record<string, { leads: number; conversion: number; revenue: number }> = {
  // Q4 2022
  nov: { leads: 1.0, conversion: 0.85, revenue: 0.90 },
  dec: { leads: 0.5, conversion: 0.70, revenue: 0.65 },

  // Q1 2023 - HIGH SEASON (New Year enrollments)
  jan: { leads: 1.6, conversion: 1.15, revenue: 1.25 },
  feb: { leads: 1.8, conversion: 1.20, revenue: 1.30 },
  mar: { leads: 1.5, conversion: 1.10, revenue: 1.20 },

  // Q2 2023
  apr: { leads: 0.7, conversion: 0.90, revenue: 0.85 },
  may: { leads: 1.1, conversion: 1.00, revenue: 1.05 },
  jun: { leads: 1.3, conversion: 1.05, revenue: 1.10 },

  // Q3 2023 - MID SEASON (Summer programs)
  jul: { leads: 1.4, conversion: 1.10, revenue: 1.15 },
  aug: { leads: 1.3, conversion: 1.08, revenue: 1.12 },
  sep: { leads: 1.0, conversion: 0.95, revenue: 1.00 },

  // Q4 2023
  oct: { leads: 1.1, conversion: 1.00, revenue: 1.05 },
};

// Growth model: 20% annual growth compounded
const ANNUAL_GROWTH_RATE = 1.20;

// Base numbers (November 2022)
const BASE_MONTHLY_LEADS = 420;
const BASE_CONVERSION_RATE = 0.10;  // 10%
const BASE_AVG_COMMISSION = 3_200_000;  // 3.2M COP per student

// Add random variance
function randomVariance(variance: number = 0.08): number {
  return 1 + (Math.random() - 0.5) * 2 * variance;
}

// Generate 24 months of historical data (Nov 2022 - Oct 2024)
export function generateHistoricalData(): MonthlyMetrics[] {
  const startDate = new Date('2022-11-01');
  const endDate = new Date('2024-10-31');
  const metrics: MonthlyMetrics[] = [];

  let currentDate = startOfMonth(startDate);

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const yearMonth = format(currentDate, 'yyyy-MM');
    const monthKey = format(currentDate, 'MMM').toLowerCase() as keyof typeof SEASONAL_MULTIPLIERS;
    const monthName = format(currentDate, 'MMMM', { locale: es });

    // Calculate cumulative growth
    const monthsFromStart = Math.floor((currentDate.getTime() - startDate.getTime()) / (30.44 * 24 * 60 * 60 * 1000));
    const cumulativeGrowth = Math.pow(ANNUAL_GROWTH_RATE, monthsFromStart / 12);

    // Get seasonal multiplier
    const seasonal = SEASONAL_MULTIPLIERS[monthKey] || { leads: 1.0, conversion: 1.0, revenue: 1.0 };

    // Calculate leads
    const leads = Math.round(
      BASE_MONTHLY_LEADS *
      cumulativeGrowth *
      seasonal.leads *
      randomVariance(0.10)
    );

    // Calculate conversion rate with gradual improvement
    const conversionRateImprovement = monthsFromStart * 0.002; // +0.2% per month
    const conversionRate = Math.min(
      0.16, // Cap at 16%
      (BASE_CONVERSION_RATE + conversionRateImprovement) * seasonal.conversion * randomVariance(0.08)
    );

    // Calculate conversions
    const conversions = Math.round(leads * conversionRate);

    // Calculate average commission with gradual increase
    const commissionGrowth = 1 + (monthsFromStart * 0.008); // +0.8% per month
    const avgCommission = Math.round(
      BASE_AVG_COMMISSION *
      commissionGrowth *
      seasonal.revenue *
      randomVariance(0.12)
    );

    // Calculate revenue
    const revenue = conversions * avgCommission;

    // Calculate costs (40% of revenue)
    const costs = Math.round(revenue * 0.40);
    const grossProfit = revenue - costs;
    const netProfit = Math.round(grossProfit * 0.75); // 75% net margin
    const marginPercentage = (grossProfit / revenue) * 100;

    // Calculate CAC
    const marketingCosts = Math.round(costs * 0.35); // 35% of costs go to marketing
    const cac = Math.round(marketingCosts / conversions);

    // Calculate growth rates
    const momGrowth = metrics.length > 0
      ? ((revenue - metrics[metrics.length - 1].revenue) / metrics[metrics.length - 1].revenue) * 100
      : 0;

    const yoyGrowth = metrics.length >= 12
      ? ((revenue - metrics[metrics.length - 12].revenue) / metrics[metrics.length - 12].revenue) * 100
      : 0;

    metrics.push({
      yearMonth,
      year,
      month,
      monthName,
      date: currentDate,
      revenue,
      costs,
      grossProfit,
      netProfit,
      marginPercentage,
      leads,
      conversions,
      conversionRate: conversionRate * 100,
      activeStudents: Math.round(conversions * 0.92), // 92% remain active
      averageCommission: avgCommission,
      cac,
      momGrowth,
      yoyGrowth
    });

    currentDate = addMonths(currentDate, 1);
  }

  return metrics;
}

// Get historical data (memoized)
let cachedHistoricalData: MonthlyMetrics[] | null = null;

export function getHistoricalData(): MonthlyMetrics[] {
  if (!cachedHistoricalData) {
    cachedHistoricalData = generateHistoricalData();
  }
  return cachedHistoricalData;
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
export function getYoYComparison(): { month: string; year2023: number; year2024: number }[] {
  const allData = getHistoricalData();
  const comparison: { month: string; year2023: number; year2024: number }[] = [];

  for (let month = 0; month < 12; month++) {
    const data2023 = allData.find(m => m.year === 2023 && m.month === month);
    const data2024 = allData.find(m => m.year === 2024 && m.month === month);

    if (data2023 || data2024) {
      comparison.push({
        month: data2023?.monthName || data2024?.monthName || '',
        year2023: data2023?.revenue || 0,
        year2024: data2024?.revenue || 0
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
