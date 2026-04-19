// 주인공 캐릭터들
import { CharacterInfo } from '../characterInfoData';
import { createCharacter, createRelationship } from '../../utils/characterHelpers';

export const protagonists: CharacterInfo[] = [
  createCharacter({
    id: 'watson',
    name: '존 H. 왓슨',
    nameColor: 'text-blue-400',
    portraitUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    role: '주인공',
    description: '아프가니스탄 전쟁에서 부상당한 군의관. 홈즈의 룸메이트이자 조수로서 사건 해결에 동행한다. 성실하고 용감한 성격으로 홈즈를 보좌한다.',
    traits: ['성실함', '용감함', '의학 지식'],
    relationships: [
      createRelationship(
        'holmes',
        '셜록 홈즈',
        '동료',
        '홈즈의 룸메이트이자 사건 해결 파트너'
      ),
      createRelationship(
        'gregson',
        '그레그슨 형사',
        '협력자',
        '사건 조사를 함께하는 경찰 형사'
      )
    ]
  }),

  createCharacter({
    id: 'holmes',
    name: '셜록 홈즈',
    nameColor: 'text-purple-400',
    portraitUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    role: '명탐정',
    description: '런던 최고의 자문 탐정. 예리한 관찰력과 추리력으로 불가능해 보이는 사건도 해결한다. 냉철하고 논리적이지만 때로는 괴팍한 면모를 보인다.',
    traits: ['천재적 추리력', '관찰력', '바이올린 연주'],
    relationships: [
      createRelationship(
        'watson',
        '존 H. 왓슨',
        '동료',
        '신뢰하는 룸메이트이자 사건 해결 파트너'
      ),
      createRelationship(
        'gregson',
        '그레그슨 형사',
        '협력자',
        '종종 협력하는 경찰 형사'
      )
    ]
  }),

  createCharacter({
    id: 'gregson',
    name: '그레그슨 형사',
    nameColor: 'text-yellow-400',
    portraitUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    role: '경찰 형사',
    description: '스코틀랜드 야드의 베테랑 형사. 홈즈의 능력을 인정하면서도 경찰의 자존심을 지키려 노력한다. 성실하고 책임감 있는 인물.',
    traits: ['책임감', '정의감', '경찰 경험'],
    relationships: [
      createRelationship(
        'holmes',
        '셜록 홈즈',
        '협력자',
        '사건 해결을 의뢰한 명탐정'
      ),
      createRelationship(
        'watson',
        '존 H. 왓슨',
        '협력자',
        '홈즈의 동료이자 협력자'
      )
    ]
  })
];
