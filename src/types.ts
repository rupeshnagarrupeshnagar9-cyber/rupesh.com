/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChatMessage {
  id: string;
  text: string;
  role: 'user' | 'model';
  timestamp: Date;
}

export interface StackLayer {
  id: string;
  name: string;
  type: 'presentation' | 'application' | 'database' | 'infrastructure';
  description: string;
  technology: string;
  status: 'active' | 'syncing' | 'idle';
  metric: string;
  color: string;
  offsetY: number; // 3D transform relative offset
}

export interface BusinessMetric {
  conversionRate: number;
  monthlyUsers: number;
  averageDealSize: number;
  aiAutomationPercent: number;
}
