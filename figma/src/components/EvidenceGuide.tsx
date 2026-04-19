import { Card } from './ui/card';
import { Sparkles } from 'lucide-react';

interface EvidenceGuideProps {
  inventory: string[];
}

// 핵심 증거 목록
const CORE_EVIDENCE = [
  { id: '금고 비밀번호', name: '금고 비밀번호', location: '서재 일기장' },
  { id: 'locket', name: '루시의 로켓', location: '우물 근처' },
  { id: 'ledger', name: '1861년 장부', location: '서재 금고' },
  { id: 'will', name: '유언장', location: '2층 침실 책상' },
  { id: 'telegram', name: '은행 전보', location: '2층 옷장' }
];

export function EvidenceGuide({ inventory }: EvidenceGuideProps) {
  const missingEvidence = CORE_EVIDENCE.filter(
    evidence => !inventory.includes(evidence.id)
  );

  // 모든 증거를 수집했으면 표시하지 않음
  if (missingEvidence.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-600/30 backdrop-blur p-3 sm:p-4">
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="flex-shrink-0">
          <Sparkles className="size-4 sm:size-5 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-amber-300 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
            💡 단서 안내
          </h3>
          <p className="text-neutral-300 text-xs mb-2">
            최종 추리를 위해 다음 증거를 수집하세요:
          </p>
          <ul className="space-y-1">
            {missingEvidence.map((evidence) => (
              <li key={evidence.id} className="text-neutral-400 text-xs flex items-start gap-2">
                <span className="text-amber-500 flex-shrink-0">▪</span>
                <span>
                  <span className="text-amber-300 font-medium">{evidence.name}</span>
                  <span className="text-neutral-500 ml-1">- {evidence.location}에서 획득</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}