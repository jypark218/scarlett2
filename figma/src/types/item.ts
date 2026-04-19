/**
 * 아이템 타입 정의
 */

export interface ItemInfo {
  id: string;
  name: string;
  imageUrl: string;
  acquireMessage: string;
  description: string;
  summaryDescription: string; // 인벤토리용 짧은 설명
}
