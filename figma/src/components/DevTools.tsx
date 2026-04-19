/**
 * 🛠️ 개발자 도구 패널
 * 
 * 대화 검증, 캐릭터 매칭 테스트, 문제 노드 확인 등을 위한 도구
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Settings, Play, AlertTriangle, CheckCircle, Info, X, Database, User } from 'lucide-react';

// 기존 validator (캐릭터 매칭 특화)
import { 
  validateAllDialogues as validateDialogueMatching, 
  validateNode, 
  getProblematicNodes, 
  printValidationReport as printDialogueReport,
  ValidationReport as DialogueValidationReport,
  ValidationIssue 
} from '../utils/dialogueValidator';

// 새로운 validator (데이터 무결성 특화)
import {
  validateAllDialogues as validateDataIntegrity,
  printValidationReport as printIntegrityReport,
  getValidationSummary,
  ValidationReport as IntegrityValidationReport,
  ValidationError
} from '../utils/dialogue/validator';

import { testNodeParsing, findProblematicNodes, simulatePingPong, getStoryStats } from '../utils/parseTest';
import { storyData } from '../data/storyData';

type ValidationMode = 'dialogue' | 'integrity' | 'all';

export function DevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogueReport, setDialogueReport] = useState<DialogueValidationReport | null>(null);
  const [integrityReport, setIntegrityReport] = useState<IntegrityValidationReport | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const [showOnlyErrors, setShowOnlyErrors] = useState(true);
  const [validationMode, setValidationMode] = useState<ValidationMode>('all');

  const handleValidateAll = () => {
    console.log('🔍 Starting comprehensive validation...\n');
    
    if (validationMode === 'dialogue' || validationMode === 'all') {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📝 DIALOGUE & CHARACTER MATCHING VALIDATION');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      const dialogueRpt = validateDialogueMatching(storyData);
      setDialogueReport(dialogueRpt);
      printDialogueReport(dialogueRpt);
    }
    
    if (validationMode === 'integrity' || validationMode === 'all') {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔒 DATA INTEGRITY VALIDATION');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      const integrityRpt = validateDataIntegrity(storyData);
      setIntegrityReport(integrityRpt);
      printIntegrityReport(integrityRpt);
    }
    
    console.log('\n✅ Validation complete!\n');
  };

  const handleValidateNode = () => {
    if (!selectedNodeId) {
      alert('노드 ID를 입력하세요.');
      return;
    }
    validateNode(selectedNodeId, storyData);
    alert('콘솔을 확인하세요.');
  };

  const handleShowProblematicNodes = () => {
    const nodes = getProblematicNodes('warning', storyData);
    console.log('⚠️ 문제가 있는 노드 목록:', nodes);
    alert(`문제가 있는 노드: ${nodes.length}개\n콘솔을 확인하세요.`);
  };

  const handleTestParsing = () => {
    if (!selectedNodeId) {
      alert('노드 ID를 입력하세요.');
      return;
    }
    testNodeParsing(selectedNodeId, storyData);
    alert('콘솔에서 파싱 결과를 확인하세요.');
  };

  const handleFindProblems = () => {
    const problems = findProblematicNodes(storyData);
    alert(`${problems.length}개 문제 노드 발견\n콘솔을 확인하세요.`);
  };

  const handleGetStats = () => {
    getStoryStats(storyData);
    alert('스토리 통계를 콘솔에서 확인하세요.');
  };

  const getSeverityIcon = (severity: 'error' | 'warning' | 'info' | 'fatal') => {
    switch (severity) {
      case 'fatal':
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSeverityBadge = (severity: 'error' | 'warning' | 'info' | 'fatal') => {
    const variants: Record<string, string> = {
      fatal: 'bg-red-700/20 text-red-300 border-red-500/30',
      error: 'bg-red-500/10 text-red-500 border-red-500/20',
      warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      info: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    };
    return (
      <Badge className={variants[severity]}>
        {severity}
      </Badge>
    );
  };

  // 통합 에러 목록 생성
  const getAllErrors = (): Array<{
    nodeId: string;
    severity: 'error' | 'warning' | 'info' | 'fatal';
    message: string;
    details?: string;
    source: 'dialogue' | 'integrity';
  }> => {
    const errors: Array<any> = [];
    
    // Dialogue validation errors
    if (dialogueReport) {
      dialogueReport.issues.forEach(issue => {
        if (!showOnlyErrors || issue.severity === 'error') {
          errors.push({
            nodeId: issue.nodeId,
            severity: issue.severity,
            message: issue.message,
            details: issue.lineText || issue.suggestion,
            source: 'dialogue' as const
          });
        }
      });
    }
    
    // Integrity validation errors
    if (integrityReport) {
      const allIntegrityErrors = [
        ...integrityReport.fatals.map(e => ({ ...e, severity: 'fatal' as const })),
        ...integrityReport.errors,
        ...integrityReport.warnings
      ];
      
      allIntegrityErrors.forEach(error => {
        if (!showOnlyErrors || error.type === 'error' || error.type === 'fatal') {
          errors.push({
            nodeId: error.nodeId,
            severity: error.type,
            message: error.message,
            details: error.details,
            source: 'integrity' as const
          });
        }
      });
    }
    
    return errors;
  };

  const filteredErrors = getAllErrors();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50"
        aria-label="개발자 도구 열기"
      >
        <Settings className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-surface-container">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant">
          <div>
            <h2 className="text-2xl font-bold text-on-surface">🛠️ 개발자 도구</h2>
            <p className="text-sm text-on-surface-variant mt-1">대화 시스템 검증 및 디버깅</p>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-transparent hover:bg-surface-container-highest text-on-surface"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 검증 모드 선택 */}
          <section>
            <h3 className="font-semibold text-lg mb-3 text-on-surface">🎯 검증 모드</h3>
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => setValidationMode('dialogue')}
                className={validationMode === 'dialogue' 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}
              >
                <User className="w-4 h-4 mr-2" />
                캐릭터 매칭
              </Button>
              <Button
                onClick={() => setValidationMode('integrity')}
                className={validationMode === 'integrity' 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}
              >
                <Database className="w-4 h-4 mr-2" />
                데이터 무결성
              </Button>
              <Button
                onClick={() => setValidationMode('all')}
                className={validationMode === 'all' 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                전체 검증
              </Button>
            </div>
            <p className="text-xs text-on-surface-variant mt-2">
              {validationMode === 'dialogue' && '• 화자 감지, 캐릭터 매칭, 대화 형식 검증'}
              {validationMode === 'integrity' && '• 누락된 데이터, 끊어진 링크, 리소스 확인'}
              {validationMode === 'all' && '• 모든 검증을 한 번에 실행합니다'}
            </p>
          </section>

          {/* 검증 도구 */}
          <section>
            <h3 className="font-semibold text-lg mb-3 text-on-surface">📋 검증 도구</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleValidateAll}
                className="bg-primary hover:bg-primary/90 text-on-primary"
              >
                <Play className="w-4 h-4 mr-2" />
                모든 노드 검증
              </Button>
              <Button
                onClick={handleShowProblematicNodes}
                className="bg-secondary hover:bg-secondary/90 text-on-secondary"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                문제 노드 목록
              </Button>
            </div>
          </section>

          {/* 노드별 테스트 */}
          <section>
            <h3 className="font-semibold text-lg mb-3 text-on-surface">🧪 노드별 테스트</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={selectedNodeId}
                onChange={(e) => setSelectedNodeId(e.target.value)}
                placeholder="노드 ID 입력 (예: start)"
                className="w-full px-4 py-2 rounded-lg bg-surface-container-highest text-on-surface border border-outline focus:outline-none focus:border-primary"
              />
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleValidateNode}
                  disabled={!selectedNodeId}
                  className="bg-tertiary hover:bg-tertiary/90 text-on-tertiary disabled:opacity-50"
                >
                  노드 검증
                </Button>
                <Button
                  onClick={handleTestParsing}
                  disabled={!selectedNodeId}
                  className="bg-tertiary hover:bg-tertiary/90 text-on-tertiary disabled:opacity-50"
                >
                  파싱 테스트
                </Button>
                <Button
                  onClick={handleFindProblems}
                  className="bg-tertiary hover:bg-tertiary/90 text-on-tertiary"
                >
                  문제 찾기
                </Button>
                <Button
                  onClick={handleGetStats}
                  className="bg-tertiary hover:bg-tertiary/90 text-on-tertiary"
                >
                  통계 확인
                </Button>
              </div>
            </div>
          </section>

          {/* 검증 결과 */}
          {filteredErrors.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg text-on-surface">📊 검증 결과</h3>
                <label className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={showOnlyErrors}
                    onChange={(e) => setShowOnlyErrors(e.target.checked)}
                    className="rounded"
                  />
                  에러만 보기
                </label>
              </div>

              {/* 요약 */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="text-2xl font-bold text-red-500">{filteredErrors.filter(e => e.severity === 'error').length}</div>
                  <div className="text-sm text-on-surface-variant">에러</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="text-2xl font-bold text-yellow-500">{filteredErrors.filter(e => e.severity === 'warning').length}</div>
                  <div className="text-sm text-on-surface-variant">경고</div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-500">{filteredErrors.filter(e => e.severity === 'info').length}</div>
                  <div className="text-sm text-on-surface-variant">정보</div>
                </div>
              </div>

              {/* 이슈 목록 */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredErrors.length === 0 ? (
                  <div className="text-center py-8 text-on-surface-variant">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                    <p>문제가 발견되지 않았습니다!</p>
                  </div>
                ) : (
                  filteredErrors.map((issue, index) => (
                    <div
                      key={index}
                      className="bg-surface-container-highest border border-outline-variant rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        {getSeverityIcon(issue.severity)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm text-primary">{issue.nodeId}</span>
                            {getSeverityBadge(issue.severity)}
                          </div>
                          <p className="text-sm text-on-surface mb-2">{issue.message}</p>
                          {issue.details && (
                            <div className="bg-surface-container rounded p-2 mb-2">
                              <p className="text-xs font-mono text-on-surface-variant break-all">
                                {issue.details}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* 사용 팁 */}
          <section className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 text-on-surface">💡 사용 팁</h4>
            <ul className="text-xs text-on-surface-variant space-y-1">
              <li>• F12를 눌러 브라우저 콘솔을 열면 더 자세한 정보를 확인할 수 있습니다</li>
              <li>• 콘솔에서 <code className="bg-surface-container px-1 rounded">devTools.help()</code>를 입력하면 명령어 목록을 볼 수 있습니다</li>
              <li>• 모든 검증 결과는 자동으로 콘솔에도 출력됩니다</li>
            </ul>
          </section>
        </div>
      </Card>
    </div>
  );
}