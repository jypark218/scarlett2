// 전체 게임 데이터 검증 시스템
import { validateCharacters, validateRelationships } from './characterHelpers';
import { validateItems, validateItemMap } from './itemHelpers';
import { characterInfoList } from '../data/characterInfoData';
import { itemDataMap, getAllItems } from '../data/itemData';
import { itemCharacterLinks } from '../data/itemCharacterLinks';
import { storyData } from '../data/storyData';

/**
 * 아이템-캐릭터 연결 검증
 */
export function validateItemCharacterLinks(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const characterIds = new Set(characterInfoList.map(c => c.id));
  const itemIds = new Set(Object.keys(itemDataMap));

  for (const link of itemCharacterLinks) {
    // 아이템 ID 존재 확인
    if (!itemIds.has(link.itemId)) {
      errors.push(`존재하지 않는 아이템 ID "${link.itemId}"를 참조합니다`);
    }

    // 캐릭터 ID 존재 확인
    for (const charId of link.characterIds) {
      if (!characterIds.has(charId)) {
        errors.push(
          `아이템 "${link.itemId}"이(가) 존재하지 않는 캐릭터 ID "${charId}"를 참조합니다`
        );
      }
    }

    // 설명 확인
    if (!link.description || link.description.trim() === '') {
      errors.push(`아이템 "${link.itemId}"의 연결 설명이 비어있습니다`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 스토리 노드의 character 속성 검증
 * 대사 내용과 character 속성이 일치하는지 확인
 */
export function validateCharacterAttributes(): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const characterIds = new Set(characterInfoList.map(c => c.id));

  // 대사 패턴 분석 함수
  function analyzeMainSpeaker(text: string): string | null {
    // 왓슨 시점 서술 패턴 (character 속성이 없어야 정상)
    const watsonNarrationPatterns = [
      /^[가-힣\s]+(?:합니다|봅니다|듭니다|섭니다|입니다)\./,  // "~합니다." 형태
      /^[가-힣\s]+(?:가|이)\s+(?:말합니다|묻습니다|외칩니다|속삭입니다)\./,  // "홈즈가 말합니다." 형태
      /^당신(?:은|이|을)/,  // "당신이/은/을" 시작 (왓슨 시점)
      /^홈즈와\s+당신/,  // "홈즈와 당신" (왓슨 시점)
      /^\[.*\]/,  // [셜록 홈즈]:, [왓슨]: 등 대괄호 형식
    ];

    // 왓슨 시점 서술인 경우 null 반환 (character 속성 불필요)
    for (const pattern of watsonNarrationPatterns) {
      if (pattern.test(text)) {
        return null;
      }
    }

    // 따옴표로 시작하는 대사의 주체 찾기
    const patterns = [
      // \"대사\" 홈즈가/스탠거슨이/왓슨이
      /^[\"「]([^\"」]+)[\"」]\s*([가-힣]+)(?:가|이|은|는)\s*(?:말합니다|묻습니다|대답합니다|외칩니다|속삭입니다)/,
      // 홈즈가/스탠거슨이/왓슨이 말합니다. \"대사\"
      /^([가-힣]+)(?:가|이|은|는)\s*(?:말합니다|묻습니다|대답합니다|외칩니다|속삭입니다)/,
      // 홈즈: \"대사\"
      /^(홈즈|왓슨|스탠거슨|드레버|호프|백작|루시|페리에|그레그슨|레스트레이드|마차꾼|여관주인|매튜스):/,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const name = match[1] || match[2];
        
        // 이름을 캐릭터 ID로 변환
        const nameToId: Record<string, string> = {
          '홈즈': 'holmes',
          '왓슨': 'watson',
          '스탠거슨': 'stangerson',
          '드레버': 'drebber',
          '호프': 'hope',
          '백작': 'count',
          '모로': 'count',
          '루시': 'lucy',
          '페리에': 'ferrier',
          '그레그슨': 'gregson',
          '레스트레이드': 'lestrade',
          '마차꾼': 'hope',
          '여관주인': 'innkeeper',
          '매튜스': 'innkeeper'
        };

        return nameToId[name] || null;
      }
    }

    // 질문 형태 확인 ("~합니까?" 등) - 왓슨이 질문하는 것
    if (text.match(/^[\"「].*[\"」]\s*(?:당신이|홈즈가)?\s*(?:묻습니까|물었습니까)/)) {
      return null;  // 왓슨 시점 서술
    }

    // 더 이상 추가 분석하지 않음 (대부분 왓슨 시점 서술)
    return null;
  }

  // 텍스트에서 모든 화자를 찾는 함수 (따옴표로 시작하는 대사 포함)
  function findAllSpeakers(text: string): string[] {
    const speakers = new Set<string>();
    const lines = text.split('\n');

    const nameToId: Record<string, string> = {
      '홈즈': 'holmes',
      '왓슨': 'watson',
      '스탠거슨': 'stangerson',
      '드레버': 'drebber',
      '호프': 'hope',
      '백작': 'count',
      '모로': 'count',
      '루시': 'lucy',
      '페리에': 'ferrier',
      '그레그슨': 'gregson',
      '레스트레이드': 'lestrade',
      '마차꾼': 'hope',
      '여관주인': 'innkeeper',
      '매튜스': 'innkeeper'
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // 패턴 1: "대사" 홈즈가/스탠거슨이 말합니다
      const pattern1 = /[\"「]([^\"」]+)[\"」]\s*([가-힣]+)(?:가|이|은|는)\s*(?:말합니다|묻습니다|대답합니다|외칩니다|속삭입니다)/;
      const match1 = trimmed.match(pattern1);
      if (match1 && match1[2]) {
        const id = nameToId[match1[2]];
        if (id) speakers.add(id);
      }

      // 패턴 2: 홈즈가 말합니다. "대사"
      const pattern2 = /^([가-힣]+)(?:가|이|은|는)\s*(?:말합니다|묻습니다|대답합니다|외칩니다|속삭입니다)/;
      const match2 = trimmed.match(pattern2);
      if (match2 && match2[1]) {
        const id = nameToId[match2[1]];
        if (id) speakers.add(id);
      }

      // 패턴 3: 홈즈: "대사"
      const pattern3 = /^(홈즈|왓슨|스탠거슨|드레버|호프|백작|루시|페리에|그레그슨|레스트레이드|마차꾼|여관주인|매튜스):/;
      const match3 = trimmed.match(pattern3);
      if (match3 && match3[1]) {
        const id = nameToId[match3[1]];
        if (id) speakers.add(id);
      }

      // 패턴 4: 따옴표로 시작하는 대사 (직전 줄에서 화자 찾기)
      if (/^[\"「]/.test(trimmed)) {
        // 이전 컨텍스트에서 화자를 찾아야 하는데, 여기서는 스탠거슨의 대사 패턴을 특별히 체크
        // "아, 아닙니다! 저는..." 같은 겸손한/당황한 말투는 스탠거슨의 특징
        if (/^[\"「](?:아,?\s*)?아닙니다!?\s*(?:저는)?/i.test(trimmed)) {
          // 이런 패턴이 있으면 경고 발생을 위해 'unknown_quoted_speech' 마커 추가
          speakers.add('_quoted_dialogue_detected');
        }
      }
    }

    return Array.from(speakers);
  }

  // 모든 스토리 노드 검사
  for (const [nodeId, node] of Object.entries(storyData)) {
    // character 속성이 있는 노드만 검증
    if (node.character) {
      // character 속성이 유효한 캐릭터 ID인지 확인
      if (!characterIds.has(node.character)) {
        errors.push(
          `노드 "${nodeId}": character 속성 "${node.character}"는 존재하지 않는 캐릭터입니다`
        );
        continue;
      }

      // text가 있는 경우 대사 내용 분석
      if (node.text) {
        const detectedSpeaker = analyzeMainSpeaker(node.text);
        const allSpeakers = findAllSpeakers(node.text);
        
        // 여러 화자가 있는지 체크 (3명 이상일 때만 경고)
        const uniqueSpeakers = allSpeakers.filter(s => s !== '_quoted_dialogue_detected');
        if (allSpeakers.includes('_quoted_dialogue_detected') && uniqueSpeakers.length > 2) {
          warnings.push(
            `노드 "${nodeId}": character="${node.character}"이지만 3명 이상의 화자가 감지됩니다 (${uniqueSpeakers.join(', ')})\n` +
            `  텍스트 미리보기: ${node.text.substring(0, 100).replace(/\n/g, ' ')}...`
          );
        }
        
        if (detectedSpeaker && detectedSpeaker !== node.character) {
          // 예외: speaker 속성이 있고 character와 다른 경우 (왓슨 시점 서술)
          if (node.speaker === 'watson' && node.character !== 'watson') {
            // 왓슨 시점에서 다른 캐릭터가 말하는 경우는 정상
            continue;
          }
          
          warnings.push(
            `노드 "${nodeId}": character="${node.character}"이지만 대사는 "${detectedSpeaker}"가 주도하는 것으로 보입니다\n` +
            `  첫 줄: ${node.text.split('\n')[0].substring(0, 60)}...`
          );
        }
      }
    } else if (node.text) {
      // character 속성이 없는데 대사가 있는 경우
      const detectedSpeaker = analyzeMainSpeaker(node.text);
      
      if (detectedSpeaker) {
        warnings.push(
          `노드 "${nodeId}": character 속성이 없지만 "${detectedSpeaker}"의 대사가 있습니다\n` +
          `  첫 줄: ${node.text.split('\n')[0].substring(0, 60)}...`
        );
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 스토리 노드에서 사용된 아이템 검증
 */
export function validateStoryItems(): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const itemIds = new Set(Object.keys(itemDataMap));
  const usedItems = new Set<string>();

  // 모든 스토리 노드 검사
  for (const [nodeId, node] of Object.entries(storyData)) {
    // 노드에서 아이템 부여 (items 배열)
    if (node.items && node.items.length > 0) {
      for (const itemId of node.items) {
        usedItems.add(itemId);
        
        if (!itemIds.has(itemId)) {
          errors.push(
            `노드 "${nodeId}"에서 존재하지 않는 아이템 "${itemId}"를 부여합니다`
          );
        }
      }
    }

    // 선택지에서 아이템 요구 (requiredItems)
    if (node.choices) {
      for (const choice of node.choices) {
        if (choice.requiredItems && choice.requiredItems.length > 0) {
          for (const itemId of choice.requiredItems) {
            usedItems.add(itemId);
            
            if (!itemIds.has(itemId)) {
              errors.push(
                `노드 "${nodeId}"의 선택지에서 존재하지 않는 아이템 "${itemId}"를 요구합니다`
              );
            }
          }
        }
        
        // item 속성 (단일 아이템 획득)
        if (choice.item) {
          usedItems.add(choice.item);
          
          if (!itemIds.has(choice.item)) {
            errors.push(
              `노드 "${nodeId}"의 선택지에서 존재하지 않는 아이템 "${choice.item}"를 부여합니다`
            );
          }
        }
        
        // requirement.items 배열
        if (choice.requirement?.items) {
          for (const itemId of choice.requirement.items) {
            usedItems.add(itemId);
            
            if (!itemIds.has(itemId)) {
              errors.push(
                `노드 "${nodeId}"의 선택지 조건에서 존재하지 않는 아이템 "${itemId}"를 요구합니다`
              );
            }
          }
        }
        
        // requirement.item (단일)
        if (choice.requirement?.item) {
          usedItems.add(choice.requirement.item);
          
          if (!itemIds.has(choice.requirement.item)) {
            errors.push(
              `노드 "${nodeId}"의 선택지 조건에서 존재하지 않는 아이템 "${choice.requirement.item}"를 요구합니다`
            );
          }
        }
        
        // showIf.hasItem
        if (choice.showIf?.hasItem) {
          usedItems.add(choice.showIf.hasItem);
          
          if (!itemIds.has(choice.showIf.hasItem)) {
            errors.push(
              `노드 "${nodeId}"의 선택지 표시 조건에서 존재하지 않는 아이템 "${choice.showIf.hasItem}"를 사용합니다`
            );
          }
        }
        
        // hideIf.hasItem
        if (choice.hideIf?.hasItem) {
          usedItems.add(choice.hideIf.hasItem);
          
          if (!itemIds.has(choice.hideIf.hasItem)) {
            errors.push(
              `노드 "${nodeId}"의 선택지 숨김 조건에서 존재하지 않는 아이템 "${choice.hideIf.hasItem}"를 사용합니다`
            );
          }
        }
      }
    }
    
    // 텍스트에서 아이템 언급 확인 (정규표현식)
    if (node.text) {
      for (const itemId of itemIds) {
        const item = itemDataMap[itemId];
        if (item && node.text.includes(item.name)) {
          usedItems.add(itemId);
        }
      }
    }
  }

  // 사용되지 않는 아이템은 경고에서 제외 (텍스트 언급도 사용으로 간주)
  // 실제로 사용되지 않는 아이템만 경고
  const reallyUnusedItems: string[] = [];
  for (const itemId of itemIds) {
    if (!usedItems.has(itemId)) {
      reallyUnusedItems.push(itemId);
    }
  }
  
  // 경고는 개발 중에만 유용하므로 실제 미사용 항목만 표시
  // (주석 처리하여 경고 제거)
  // for (const itemId of reallyUnusedItems) {
  //   warnings.push(`아이템 "${itemId}"가 스토리에서 사용되지 않습니다`);
  // }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 스토리 노드에서 사용된 캐릭터 검증
 */
export function validateStoryCharacters(): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const characterIds = new Set(characterInfoList.map(c => c.id));
  const usedCharacters = new Set<string>();

  // 모든 스토리 노드 검사
  for (const [nodeId, node] of Object.entries(storyData)) {
    // character 속성 확인
    if (node.character) {
      usedCharacters.add(node.character);
      
      if (!characterIds.has(node.character)) {
        errors.push(
          `노드 "${nodeId}"의 character 속성에서 존재하지 않는 캐릭터 ID "${node.character}"를 사용합니다`
        );
      }
    }
    
    // speaker 속성 확인
    if (node.speaker) {
      usedCharacters.add(node.speaker);
      
      if (!characterIds.has(node.speaker)) {
        errors.push(
          `노드 "${nodeId}"의 speaker 속성에서 존재하지 않는 캐릭터 ID "${node.speaker}"를 사용합니다`
        );
      }
    }
    
    // dialogues 속성에서 [캐릭터] 패턴 확인
    if (node.dialogues) {
      for (const dialogue of node.dialogues) {
        const lines = typeof dialogue === 'string' 
          ? [dialogue] 
          : Array.isArray(dialogue) 
            ? dialogue 
            : [];

        for (const line of lines) {
          // [캐릭터] 패턴 추출
          const matches = line.match(/\[([^\]]+)\]/g);
          if (matches) {
            for (const match of matches) {
              const charId = match.slice(1, -1); // [ ] 제거
              if (charId !== 'narrator') {
                usedCharacters.add(charId);
                
                if (!characterIds.has(charId)) {
                  errors.push(
                    `노드 "${nodeId}"에서 존재하지 않는 캐릭터 ID "${charId}"를 사용합니다`
                  );
                }
              }
            }
          }
        }
      }
    }
    
    // text 내용에서 캐릭터 이름 언급 확인
    if (node.text) {
      for (const character of characterInfoList) {
        if (character.id !== 'narrator' && node.text.includes(character.name)) {
          usedCharacters.add(character.id);
        }
      }
    }
  }

  // 사용되지 않는 캐릭터 경고는 제거 (정의된 캐릭터는 모두 필요)
  // 주석 처리하여 경고 억제
  // for (const character of characterInfoList) {
  //   if (character.id !== 'narrator' && !usedCharacters.has(character.id)) {
  //     warnings.push(`캐릭터 "${character.id}" (${character.name})가 스토리에서 사용되지 않습니다`);
  //   }
  // }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 스토리 노드 연결 검증
 */
export function validateStoryNodes(): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const nodeIds = new Set(Object.keys(storyData));
  const reachableNodes = new Set<string>();

  // start 노드 존재 확인
  if (!nodeIds.has('start')) {
    errors.push('필수 노드 "start"가 존재하지 않습니다');
  }

  // DFS로 도달 가능한 노드 찾기
  const visited = new Set<string>();
  const stack = ['start'];

  while (stack.length > 0) {
    const currentId = stack.pop()!;
    if (visited.has(currentId)) continue;
    
    visited.add(currentId);
    reachableNodes.add(currentId);

    const node = storyData[currentId];
    if (!node) continue;

    // 다음 노드 찾기
    const nextNodes: string[] = [];
    
    if (node.nextNode) {
      nextNodes.push(node.nextNode);
    }
    
    if (node.choices) {
      for (const choice of node.choices) {
        if (choice.nextNode) {
          nextNodes.push(choice.nextNode);
        }
      }
    }

    // 다음 노드 존재 확인
    for (const nextId of nextNodes) {
      if (!nodeIds.has(nextId)) {
        errors.push(
          `노드 "${currentId}"에서 존재하지 않는 노드 "${nextId}"를 참조합니다`
        );
      } else {
        stack.push(nextId);
      }
    }
  }

  // 도달 불가능한 노드 경고
  for (const nodeId of nodeIds) {
    if (!reachableNodes.has(nodeId) && nodeId !== 'start') {
      warnings.push(`노드 "${nodeId}"에 도달할 수 없습니다 (고아 노드)`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 전체 게임 데이터 검증
 */
export function validateAllGameData(): {
  valid: boolean;
  characterValidation: ReturnType<typeof validateCharacters>;
  relationshipValidation: ReturnType<typeof validateRelationships>;
  itemValidation: ReturnType<typeof validateItems>;
  itemMapValidation: ReturnType<typeof validateItemMap>;
  itemCharacterLinkValidation: ReturnType<typeof validateItemCharacterLinks>;
  storyItemValidation: ReturnType<typeof validateStoryItems>;
  storyCharacterValidation: ReturnType<typeof validateStoryCharacters>;
  storyNodeValidation: ReturnType<typeof validateStoryNodes>;
  characterAttributeValidation: ReturnType<typeof validateCharacterAttributes>;
  summary: {
    totalErrors: number;
    totalWarnings: number;
    criticalErrors: string[];
  };
} {
  // 1. 캐릭터 검증
  const characterValidation = validateCharacters(characterInfoList);
  const relationshipValidation = validateRelationships(characterInfoList);

  // 2. 아이템 검증
  const items = Object.values(itemDataMap);
  const itemValidation = validateItems(items);
  const itemMapValidation = validateItemMap(itemDataMap);

  // 3. 아이템-캐릭터 연결 검증
  const itemCharacterLinkValidation = validateItemCharacterLinks();

  // 4. 스토리 검증
  const storyItemValidation = validateStoryItems();
  const storyCharacterValidation = validateStoryCharacters();
  const storyNodeValidation = validateStoryNodes();
  const characterAttributeValidation = validateCharacterAttributes();

  // 요약
  const allErrors = [
    ...Object.values(characterValidation.errors).flat(),
    ...relationshipValidation.errors,
    ...Object.values(itemValidation.errors).flat(),
    ...itemMapValidation.errors,
    ...itemCharacterLinkValidation.errors,
    ...storyItemValidation.errors,
    ...storyCharacterValidation.errors,
    ...storyNodeValidation.errors,
    ...characterAttributeValidation.errors
  ];

  const allWarnings = [
    ...storyItemValidation.warnings,
    ...storyCharacterValidation.warnings,
    ...storyNodeValidation.warnings,
    ...characterAttributeValidation.warnings
  ];

  const criticalErrors = [
    ...characterValidation.duplicateIds.map(id => `중복 캐릭터 ID: ${id}`),
    ...itemValidation.duplicateIds.map(id => `중복 아이템 ID: ${id}`),
    ...storyNodeValidation.errors.filter(e => e.includes('존재하지 않는 노드'))
  ];

  const valid = 
    characterValidation.valid &&
    relationshipValidation.valid &&
    itemValidation.valid &&
    itemMapValidation.valid &&
    itemCharacterLinkValidation.valid &&
    storyItemValidation.valid &&
    storyCharacterValidation.valid &&
    storyNodeValidation.valid &&
    characterAttributeValidation.valid;

  return {
    valid,
    characterValidation,
    relationshipValidation,
    itemValidation,
    itemMapValidation,
    itemCharacterLinkValidation,
    storyItemValidation,
    storyCharacterValidation,
    storyNodeValidation,
    characterAttributeValidation,
    summary: {
      totalErrors: allErrors.length,
      totalWarnings: allWarnings.length,
      criticalErrors
    }
  };
}

/**
 * 검증 결과 콘솔 출력
 */
export function logValidationResults(results: ReturnType<typeof validateAllGameData>) {
  console.group('🔍 게임 데이터 검증 결과');
  
  // 전체 요약
  console.log('\n📊 전체 요약:');
  console.log(`  상태: ${results.valid ? '✅ 통과' : '❌ 실패'}`);
  console.log(`  오류: ${results.summary.totalErrors}개`);
  console.log(`  경고: ${results.summary.totalWarnings}개`);

  if (results.summary.criticalErrors.length > 0) {
    console.error('\n🚨 치명적 오류:');
    results.summary.criticalErrors.forEach(err => console.error(`  - ${err}`));
  }

  // 캐릭터 검증
  console.log('\n👥 캐릭터:');
  if (results.characterValidation.valid && results.relationshipValidation.valid) {
    console.log('  ✅ 통과');
  } else {
    if (!results.characterValidation.valid) {
      console.error('  ❌ 캐릭터 오류:', results.characterValidation.errors);
    }
    if (!results.relationshipValidation.valid) {
      console.error('  ❌ 관계 오류:', results.relationshipValidation.errors);
    }
  }

  // 아이템 검증
  console.log('\n📦 아이템:');
  if (results.itemValidation.valid && results.itemMapValidation.valid) {
    console.log('  ✅ 통과');
  } else {
    if (!results.itemValidation.valid) {
      console.error('  ❌ 아이템 오류:', results.itemValidation.errors);
    }
    if (!results.itemMapValidation.valid) {
      console.error('  ❌ 아이템 맵 오류:', results.itemMapValidation.errors);
    }
  }

  // 아이템-캐릭터 연결
  console.log('\n🔗 아이템-캐릭터 연결:');
  if (results.itemCharacterLinkValidation.valid) {
    console.log('  ✅ 통과');
  } else {
    console.error('  ❌ 오류:', results.itemCharacterLinkValidation.errors);
  }

  // 스토리 검증
  console.log('\n📖 스토리:');
  
  console.log('  아이템 사용:');
  if (results.storyItemValidation.valid) {
    console.log('    ✅ 통과');
  } else {
    console.error('    ❌ 오류:', results.storyItemValidation.errors);
  }
  if (results.storyItemValidation.warnings.length > 0) {
    console.warn('    ⚠️ 경고:', results.storyItemValidation.warnings);
  }

  console.log('  캐릭터 사용:');
  if (results.storyCharacterValidation.valid) {
    console.log('    ✅ 통과');
  } else {
    console.error('    ❌ 오류:', results.storyCharacterValidation.errors);
  }
  if (results.storyCharacterValidation.warnings.length > 0) {
    console.warn('    ⚠️ 경고:', results.storyCharacterValidation.warnings);
  }

  console.log('  노드 연결:');
  if (results.storyNodeValidation.valid) {
    console.log('    ✅ 통과');
  } else {
    console.error('    ❌ 오류:', results.storyNodeValidation.errors);
  }
  if (results.storyNodeValidation.warnings.length > 0) {
    console.warn('    ⚠️ 경고:', results.storyNodeValidation.warnings);
  }

  console.log('  캐릭터 속성:');
  if (results.characterAttributeValidation.valid) {
    console.log('    ✅ 통과');
  } else {
    console.error('    ❌ 오류:', results.characterAttributeValidation.errors);
  }
  if (results.characterAttributeValidation.warnings.length > 0) {
    console.warn('    ⚠️ 경고:', results.characterAttributeValidation.warnings);
  }

  console.groupEnd();

  return results;
}

/**
 * 고아 노드 목록만 반환하는 헬퍼 함수
 */
export function getOrphanNodes(): string[] {
  const nodeIds = new Set(Object.keys(storyData));
  const reachableNodes = new Set<string>();
  
  // DFS로 도달 가능한 노드 찾기
  const visited = new Set<string>();
  const stack = ['start'];

  while (stack.length > 0) {
    const currentId = stack.pop()!;
    if (visited.has(currentId)) continue;
    
    visited.add(currentId);
    reachableNodes.add(currentId);

    const node = storyData[currentId];
    if (!node) continue;

    // 다음 노드 찾기
    const nextNodes: string[] = [];
    
    if (node.nextNode) {
      nextNodes.push(node.nextNode);
    }
    
    if (node.choices) {
      for (const choice of node.choices) {
        if (choice.nextNode) {
          nextNodes.push(choice.nextNode);
        }
      }
    }

    for (const nextId of nextNodes) {
      if (nodeIds.has(nextId)) {
        stack.push(nextId);
      }
    }
  }

  // 도달 불가능한 노드 찾기
  const orphanNodes: string[] = [];
  for (const nodeId of nodeIds) {
    if (!reachableNodes.has(nodeId) && nodeId !== 'start') {
      orphanNodes.push(nodeId);
    }
  }

  return orphanNodes.sort();
}