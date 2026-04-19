/**
 * 🔍 검증 상태 배지
 * 
 * 게임 화면에 현재 검증 상태를 표시하는 작은 배지
 * 개발 모드에서만 표시됨
 */

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { validateAllDialogues, ValidationReport } from '../utils/dialogue/validator';
import { storyData } from '../data/storyData';

export function ValidationBadge() {
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // 개발 모드가 아니면 렌더링하지 않음
    if (!import.meta.env.DEV) return;
    
    // 검증 실행
    const validationReport = validateAllDialogues(storyData);
    setReport(validationReport);
  }, []);
  
  // 프로덕션에서는 표시하지 않음
  if (!import.meta.env.DEV || !report) return null;
  
  const totalIssues = report.fatals.length + report.errors.length + report.warnings.length;
  const hasCritical = report.fatals.length > 0 || report.errors.length > 0;
  
  const getStatusColor = () => {
    if (report.fatals.length > 0) return 'bg-red-500/20 border-red-500/50 text-red-400';
    if (report.errors.length > 0) return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
    if (report.warnings.length > 0) return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
    return 'bg-green-500/20 border-green-500/50 text-green-400';
  };
  
  const getStatusIcon = () => {
    if (hasCritical) return <AlertCircle className="w-3 h-3" />;
    if (report.warnings.length > 0) return <AlertTriangle className="w-3 h-3" />;
    return <CheckCircle className="w-3 h-3" />;
  };
  
  const getStatusText = () => {
    if (totalIssues === 0) return 'All Clear';
    return `${totalIssues} ${totalIssues === 1 ? 'Issue' : 'Issues'}`;
  };
  
  return (
    <div className="fixed top-20 right-6 z-40">
      {/* 컴팩트 배지 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor()} backdrop-blur-sm transition-all hover:scale-105`}
        title="Click to see details"
      >
        {getStatusIcon()}
        <span className="text-xs font-medium">{getStatusText()}</span>
      </button>
      
      {/* 확장된 상세 정보 */}
      {isExpanded && (
        <div className="mt-2 p-3 rounded-lg border border-outline-variant bg-surface-container backdrop-blur-sm shadow-lg max-w-xs">
          <div className="text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant">Total Nodes:</span>
              <span className="text-on-surface font-mono">{report.totalNodes}</span>
            </div>
            
            {report.fatals.length > 0 && (
              <div className="flex items-center justify-between text-red-400">
                <span>Fatal Errors:</span>
                <span className="font-mono font-bold">{report.fatals.length}</span>
              </div>
            )}
            
            {report.errors.length > 0 && (
              <div className="flex items-center justify-between text-orange-400">
                <span>Errors:</span>
                <span className="font-mono font-bold">{report.errors.length}</span>
              </div>
            )}
            
            {report.warnings.length > 0 && (
              <div className="flex items-center justify-between text-yellow-400">
                <span>Warnings:</span>
                <span className="font-mono">{report.warnings.length}</span>
              </div>
            )}
            
            {totalIssues === 0 && (
              <div className="text-center text-green-400 py-2">
                ✅ All validations passed!
              </div>
            )}
            
            <div className="pt-2 border-t border-outline-variant text-on-surface-variant">
              Press F12 for details
            </div>
          </div>
        </div>
      )}
    </div>
  );
}