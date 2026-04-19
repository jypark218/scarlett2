/**
 * 장소별 노드 통합
 * 모든 location-related 노드를 여기서 export
 */

import { mainHubNodes } from './main-hub';
import { studyRoomNodes } from './study-room';
import { studyLayeredNodes } from './study-layered-investigation';
import { kitchenLayeredNodes } from './kitchen-layered';
import { bedroomLayeredNodes } from './bedroom-layered';
import { basementLayeredNodes } from './basement-layered';
import { backyardLayeredNodes } from './backyard-layered';
import { atticLayeredNodes } from './attic-layered';
import { upstairsNodes } from './upstairs-nodes';
import { backyardNodes } from './backyard-nodes';
import { diaryNodes } from './diary-nodes';
import { investigationHubNodes } from './investigation-hub';
import { innNodes } from './inn-nodes';
import { kitchenNodes } from './kitchen-nodes';
import { basementNodes } from './basement-nodes';

export const allLocationNodes = {
  ...mainHubNodes,
  ...studyRoomNodes,
  ...studyLayeredNodes,
  ...kitchenLayeredNodes,
  ...bedroomLayeredNodes,
  ...basementLayeredNodes,
  ...backyardLayeredNodes,
  ...atticLayeredNodes,
  ...upstairsNodes,
  ...backyardNodes,
  ...diaryNodes,
  ...investigationHubNodes,
  ...innNodes,
  ...kitchenNodes,
  ...basementNodes
};

// 개별 export도 제공
export {
  mainHubNodes,
  studyRoomNodes,
  studyLayeredNodes,
  kitchenLayeredNodes,
  bedroomLayeredNodes,
  basementLayeredNodes,
  backyardLayeredNodes,
  atticLayeredNodes,
  upstairsNodes,
  backyardNodes,
  diaryNodes,
  investigationHubNodes,
  innNodes,
  kitchenNodes,
  basementNodes
};