export interface CharacterInfo {
  id: string;
  name: string;
  nameColor: string;
  portraitUrl: string;
  role: string;
  description: string;
  traits: string[];
  relationships?: Array<{
    characterId: string;
    characterName: string;
    relation: string;
    description: string;
  }>;
}

export const characterInfoData: Record<string, CharacterInfo> = {
  watson: {
    id: 'watson',
    name: '존 H. 왓슨',
    nameColor: 'text-blue-400',
    portraitUrl: 'https://images.unsplash.com/photo-1746309820565-62455bdb68ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '주인공',
    description: '아프가니스탄 전쟁에서 부상당한 군의관. 홈즈의 룸메이트이자 조수로서 사건 해결에 동행한다. 성실하고 용감한 성격으로 홈즈를 보좌한다.',
    traits: ['성실함', '용감함', '의학 지식'],
    relationships: [
      {
        characterId: 'holmes',
        characterName: '셜록 홈즈',
        relation: '동료',
        description: '홈즈의 룸메이트이자 사건 해결 파트너'
      },
      {
        characterId: 'gregson',
        characterName: '그레그슨 형사',
        relation: '협력자',
        description: '사건 조사를 함께하는 경찰 형사'
      }
    ]
  },
  holmes: {
    id: 'holmes',
    name: '셜록 홈즈',
    nameColor: 'text-purple-400',
    portraitUrl: 'https://images.unsplash.com/photo-1632958983989-49773325c326?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '명탐정',
    description: '런던 최고의 자문 탐정. 예리한 관찰력과 추리력으로 불가능해 보이는 사건도 해결한다. 냉철하고 논리적이지만 때로는 괴팍한 면모를 보인다.',
    traits: ['천재적 추리력', '관찰력', '바이올린 연주'],
    relationships: [
      {
        characterId: 'watson',
        characterName: '존 H. 왓슨',
        relation: '동료',
        description: '신뢰하는 룸메이트이자 사건 해결 파트너'
      },
      {
        characterId: 'gregson',
        characterName: '그레그슨 형사',
        relation: '협력자',
        description: '종종 협력하는 경찰 형사'
      }
    ]
  },
  gregson: {
    id: 'gregson',
    name: '그레그슨 형사',
    nameColor: 'text-yellow-400',
    portraitUrl: 'https://images.unsplash.com/photo-1722461080536-2c2883c5a243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '경찰 형사',
    description: '스코틀랜드 야드의 베테랑 형사. 홈즈의 능력을 인정하면서도 경찰의 자존심을 지키려 노력한다. 성실하고 책임감 있는 인물.',
    traits: ['책임감', '정의감', '경찰 경험'],
    relationships: [
      {
        characterId: 'holmes',
        characterName: '셜록 홈즈',
        relation: '협력자',
        description: '사건 해결을 의뢰한 명탐정'
      },
      {
        characterId: 'watson',
        characterName: '존 H. 왓슨',
        relation: '협력자',
        description: '홈즈의 동료이자 협력자'
      }
    ]
  },
  count: {
    id: 'count',
    name: '모로 백작',
    nameColor: 'text-red-400',
    portraitUrl: 'https://images.unsplash.com/flagged/photo-1594170954639-ff95b015b546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '피해자',
    description: '거대한 저택의 주인이자 실종 사건의 피해자. 20년 전 유타에서 "영원한 구원 교단"의 카리스마 넘치는 설교자였으나, 루시 페리에의 죽음 이후 진짜 광신으로 빠져들었다. 지하실 제단에서 매일 밤 피로 속죄 의식을 행하며 20년간 스스로를 벌해왔다. 엘렌을 "루시의 환생"으로 믿는다.',
    traits: ['전직 교주', '광기', '속죄 강박', '신비주의'],
    relationships: [
      {
        characterId: 'stangerson',
        characterName: '조셉 스탠거슨',
        relation: '주인-집사',
        description: '백작을 오랫동안 섬긴 충직한 집사'
      },
      {
        characterId: 'drebber',
        characterName: '이노크 드레버',
        relation: '채권자',
        description: '백작에게 돈을 빌려준 사업가'
      },
      {
        characterId: 'hope',
        characterName: '제퍼슨 호프',
        relation: '마차꾼',
        description: '백작의 저택을 자주 방문하는 마차꾼'
      }
    ]
  },
  hope: {
    id: 'hope',
    name: '제퍼슨 호프',
    nameColor: 'text-orange-400',
    portraitUrl: 'https://images.unsplash.com/photo-1697634203747-5282f52a8585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '마차꾼',
    description: '백작의 저택을 자주 방문하는 마차꾼. 과묵하고 성실한 인물로 알려져 있다. 과거에 군인이었다고 하며, 체격이 건장하다.',
    traits: ['과묵함', '성실함', '군인 출신'],
    relationships: [
      {
        characterId: 'count',
        characterName: '모로 백작',
        relation: '고객',
        description: '백작의 저택을 자주 방문하는 마차꾼'
      },
      {
        characterId: 'lucy',
        characterName: '루시 페리에',
        relation: '연인',
        description: '1859년부터 3년간 사랑한 여인. 약혼자였다.'
      },
      {
        characterId: 'ellen',
        characterName: '엘렌',
        relation: '생부 (추정)',
        description: '루시의 딸. 호프는 왓슨이 알려줄 때까지 엘렌의 존재를 몰랐다.'
      },
      {
        characterId: 'stangerson',
        characterName: '조셉 스탠거슨',
        relation: '복수 대상',
        description: '루시의 의식을 막지 못한 의사. 20년 전 교단의 일원.'
      },
      {
        characterId: 'drebber',
        characterName: '이노크 드레버',
        relation: '복수 대상',
        description: '페리에를 파산시키고 의식에서 성경을 낭독한 공범.'
      }
    ]
  },
  stangerson: {
    id: 'stangerson',
    name: '조셉 스탠거슨',
    nameColor: 'text-green-400',
    portraitUrl: 'https://images.unsplash.com/photo-1749755417263-dc2af6f6bc52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '집사',
    description: '모로 백작을 오랫동안 섬긴 충직한 집사. 하지만 그 정체는... 20년 전 "영원한 구원 교단"에서 의사였다. 백작이 루시에게 "구마 의식"을 강행할 때 의료 대기를 했지만, "위험합니다"라고 경고했음에도 백작이 무시했고, 결국 루시가 산후 출혈로 사망하는 것을 막지 못했다. 20년간 악몽에 시달리며, 손이 멈추지 않고 떨린다.',
    traits: ['전직 의사', '죄책감', '손 떨림', '공포'],
    relationships: [
      {
        characterId: 'count',
        characterName: '모로 백작',
        relation: '집사',
        description: '백작을 오랫동안 섬긴 충직한 집사. 20년 전에는 교단의 의사였다.'
      },
      {
        characterId: 'lucy',
        characterName: '루시 페리에',
        relation: '희생자',
        description: '구마 의식 중 사망. 막지 못한 죄책감에 20년간 시달림.'
      },
      {
        characterId: 'hope',
        characterName: '제퍼슨 호프',
        relation: '두려움',
        description: '루시의 연인. 3개월 전 저택에 나타났고, 스탠거슨은 그를 알아봤다.'
      },
      {
        characterId: 'drebber',
        characterName: '이노크 드레버',
        relation: '과거 공범',
        description: '20년 전 교단에서 함께 의식에 참여했다. 약점이 많다.'
      },
      {
        characterId: 'ellen',
        characterName: '엘렌',
        relation: '비밀 공유',
        description: '루시의 딸. 아기 때부터 알고 있었지만 백작 명령으로 비밀 유지.'
      }
    ]
  },
  drebber: {
    id: 'drebber',
    name: '이노크 드레버',
    nameColor: 'text-cyan-400',
    portraitUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '사업가',
    description: '20년 전 "영원한 구원 교단"의 장로이자 재정 담당자. 겉으로는 경건한 신도였지만 실제로는 헌금을 횡령하고 투자 사기를 주도했다. 루시의 아버지 페리에를 파산시킨 장본인. 지금은 백작에게 돈을 빌려주며 과거를 숨기고 있다.',
    traits: ['전직 장로', '탐욕', '위선', '과거 은폐'],
    relationships: [
      {
        characterId: 'count',
        characterName: '모로 백작',
        relation: '채권자',
        description: '백작에게 돈을 빌려준 사업 파트너. 과거 교단의 장로였다.'
      },
      {
        characterId: 'lucy',
        characterName: '루시 페리에',
        relation: '피해자',
        description: '루시의 아버지를 파산시키고, 구마 의식에서 성경을 낭독했다.'
      },
      {
        characterId: 'hope',
        characterName: '제퍼슨 호프',
        relation: '잠재적 위협',
        description: '루시의 연인. 드레버는 호프의 정체를 모른다.'
      },
      {
        characterId: 'stangerson',
        characterName: '조셉 스탠거슨',
        relation: '과거 공범',
        description: '교단의 동료. 약점이 많아 이용하기 쉽다.'
      },
      {
        characterId: 'ellen',
        characterName: '엘렌',
        relation: '위협 대상',
        description: '백작의 유산 상속자. 3년 전 유언장을 통해 알게 됐다.'
      }
    ]
  },
  lucy: {
    id: 'lucy',
    name: '루시 페리에',
    nameColor: 'text-pink-300',
    portraitUrl: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '희생자',
    description: '20년 전 유타주 "영원한 구원 교단"의 비극적 희생자. 22세의 순수한 여성으로, 1859년 호프와 만나 1860년 약혼했다. 1860년 겨울 임신했고, 1861년 11월 20일 딸 엘렌을 출산했다. 하지만 백작이 "신의 계시"를 받아 그녀를 "영원한 신부 의식"에 선택했고, 거부하자 교단이 페리에 일가를 "악령에 씌었다"고 규정했다. 출산 닷새 후, 제단에서 "구마 의식"을 강행당했고 산후 과다출혈로 사망. 백작의 광신, 스탠거슨의 방관, 드레버의 묵인이 그녀를 죽였다.',
    traits: ['순수함', '희생자', '의식 사망', '비극'],
    relationships: [
      {
        characterId: 'hope',
        characterName: '제퍼슨 호프',
        relation: '연인',
        description: '20년 동안 그녀를 잊지 못한 남자'
      },
      {
        characterId: 'ferrier',
        characterName: '존 페리에',
        relation: '부녀',
        description: '루시의 양아버지'
      },
      {
        characterId: 'count',
        characterName: '모로 백작',
        relation: '가해자',
        description: '그녀를 죽음으로 몰고 간 장본인'
      }
    ]
  },
  ellen: {
    id: 'ellen',
    name: '엘렌',
    nameColor: 'text-cyan-400',
    portraitUrl: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '상속인',
    description: '모로 백작의 딸. 진짜 유언장에 명시된 유일한 상속자. 백작이 루시에 대한 죄책감으로 보호하려 했던 인물.',
    traits: ['신비로움', '상속권', '진실'],
    relationships: [
      {
        characterId: 'count',
        characterName: '모로 백작',
        relation: '부녀',
        description: '백작의 숨겨진 딸이자 진짜 상속자'
      }
    ]
  },
  narrator: {
    id: 'narrator',
    name: '내레이터',
    nameColor: 'text-gray-400',
    portraitUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '해설',
    description: '이야기의 해설자. 엔딩 장면에서 전체적인 상황을 정리하고 설명한다.',
    traits: ['객관적', '통찰력', '중립적']
  },
  unknown: {
    id: 'unknown',
    name: '???',
    nameColor: 'text-red-500',
    portraitUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '미확인',
    description: '정체를 알 수 없는 인물. 특정 장면에서 등장한다.',
    traits: ['수수께끼', '위협적', '정체불명']
  },
  ferrier: {
    id: 'ferrier',
    name: '존 페리에',
    nameColor: 'text-gray-500',
    portraitUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '부모',
    description: '루시 페리에의 아버지. 유타주에서 비극적으로 사망한 젊은 여성의 아버지. 그녀의 죽음에 대해 깊은 슬픔을 느낀다.',
    traits: ['슬픔', '부모', '비극적 운명'],
    relationships: [
      {
        characterId: 'lucy',
        characterName: '루시 페리에',
        relation: '부녀',
        description: '루시의 아버지'
      }
    ]
  },
  innkeeper: {
    id: 'innkeeper',
    name: '제임스 매튜스',
    nameColor: 'text-amber-400',
    portraitUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    role: '여관 주인',
    description: '그린 라이온 여관을 30년째 운영하는 베테랑 여관 주인. 온화하고 관찰력이 좋으며, 손님들의 행적을 잘 기억한다.',
    traits: ['친절함', '관찰력', '경험 많음'],
    relationships: [
      {
        characterId: 'drebber',
        characterName: '이노크 드레버',
        relation: '여관 손님',
        description: '3일 전부터 여관에 투숙 중인 손님'
      }
    ]
  }
};

// characterInfoList를 배열 형태로 export
export const characterInfoList: CharacterInfo[] = Object.values(characterInfoData);