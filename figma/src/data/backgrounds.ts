/**
 * 배경 이미지 데이터 (순수 데이터만)
 */

import { BackgroundImage } from '../types/dialogue';

export const backgrounds: Record<string, BackgroundImage> = {
  mansion_exterior: {
    id: 'mansion_exterior',
    name: '저택 외관',
    url: 'https://images.unsplash.com/photo-1717250265213-c2886f17ab0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjBnb3RoaWMlMjBtYW5zaW9uJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NTY5MDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1920',
    description: '으스스한 빅토리아 시대 저택의 외관'
  },
  mansion_entrance: {
    id: 'mansion_entrance',
    name: '저택 현관',
    url: 'https://images.unsplash.com/photo-1725711362381-5eb2961bd500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjBtYW5zaW9uJTIwaGFsbCUyMGludGVyaW9yJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NTY5MDU4Mnww&ixlib=rb-4.1.0&q=80&w=1920',
    description: '웅장한 저택의 현관 홀'
  },
  library: {
    id: 'library',
    name: '서재',
    url: 'https://images.unsplash.com/photo-1760038030267-9a65c2d94682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbGlicmFyeSUyMGJvb2tzJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NTY5MDU4Mnww&ixlib=rb-4.1.0&q=80&w=1920',
    description: '오래된 책들 가득한 어두운 서재'
  },
  study_room: {
    id: 'study_room',
    name: '연구실',
    url: 'https://images.unsplash.com/photo-1763668193380-3e9ccc4bc80d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjBzdHVkeSUyMHJvb20lMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzY1NjkwNTgzfDA&ixlib=rb-4.1.0&q=80&w=1920',
    description: '신비로운 연구 도구들이 있는 방'
  },
  dining_room: {
    id: 'dining_room',
    name: '식당',
    url: 'https://images.unsplash.com/photo-1739999063943-8eb0ed3df5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3RoaWMlMjBkaW5pbmclMjByb29tJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NTY5MDU4M3ww&ixlib=rb-4.1.0&q=80&w=1920',
    description: '긴 테이블이 있는 고풍스러운 식당'
  },
  bedroom: {
    id: 'bedroom',
    name: '침실',
    url: 'https://images.unsplash.com/photo-1763668193434-6abd23c3722c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjBiZWRyb29tJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NTY5MDU4M3ww&ixlib=rb-4.1.0&q=80&w=1920',
    description: '호화로운 빅토리아 시대 침실'
  },
  basement: {
    id: 'basement',
    name: '지하실',
    url: 'https://images.unsplash.com/photo-1752572515417-8448a893b7ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmFzZW1lbnQlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzY1NjkwNTg0fDA&ixlib=rb-4.1.0&q=80&w=1920',
    description: '어둡고 음산한 지하실'
  },
  secret_passage: {
    id: 'secret_passage',
    name: '비밀 통로',
    url: 'https://images.unsplash.com/photo-1699135187444-936feb8614d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNyZXQlMjBwYXNzYWdlJTIwY29ycmlkb3IlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzY1NjkwNTg3fDA&ixlib=rb-4.1.0&q=80&w=1920',
    description: '좁고 어두운 비밀 통로'
  },
  garden: {
    id: 'garden',
    name: '정원',
    url: 'https://images.unsplash.com/photo-1763669029597-345195952a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjBnYXJkZW4lMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzY1NjkwNTg3fDA&ixlib=rb-4.1.0&q=80&w=1920',
    description: '황량한 저택의 뒷정원'
  },
  backyard: {
    id: 'backyard',
    name: '뒷뜰',
    url: 'https://images.unsplash.com/photo-1624800466035-13a911f4c1f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjBnb3RoaWMlMjBiYWNreWFyZCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjU5NzQ1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '음산한 저택의 뒷뜰 - 빅토리안 고딕 일러스트'
  },
  well: {
    id: 'well',
    name: '우물',
    url: 'https://images.unsplash.com/photo-1714421200433-00de70230e55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBzdG9uZSUyMHdlbGwlMjBkYXJrfGVufDF8fHx8MTc2NTcwNjQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '오래된 돌 우물'
  },
  london_street: {
    id: 'london_street',
    name: '런던 거리',
    url: 'https://images.unsplash.com/photo-1581156974991-ef44820e396a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBzdHJlZXQlMjBmb2clMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzY1NjkwNTg3fDA&ixlib=rb-4.1.0&q=80&w=1920',
    description: '안개 낀 빅토리아 시대 런던 거리'
  },
  baker_street: {
    id: 'baker_street',
    name: '베이커 스트리트 221B',
    url: 'https://images.unsplash.com/photo-1739999063964-bcea4632a113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGV0ZWN0aXZlJTIwb2ZmaWNlJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NTcwNDUyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '홈즈와 왓슨의 거실 - 빅토리아 시대 탐정 사무실 일러스트'
  },
  courtroom: {
    id: 'courtroom',
    name: '법정',
    url: 'https://images.unsplash.com/photo-1582125169815-2f2be6122754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VydHJvb20lMjB2aWN0b3JpYW4lMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzY1NjkwNTg4fDA&ixlib=rb-4.1.0&q=80&w=1920',
    description: '엄숙한 빅토리아 시대 법정'
  },
  ritual_chamber: {
    id: 'ritual_chamber',
    name: '의식실',
    url: 'https://images.unsplash.com/photo-1704120788860-2df8688bf807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXR1YWwlMjBjaGFtYmVyJTIwbXlzdGVyaW91cyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjU2OTA1ODh8MA&ixlib=rb-4.1.0&q=80&w=1920',
    description: '신비로운 의식을 위한 비밀 방'
  },
  dark_corridor: {
    id: 'dark_corridor',
    name: '어두운 복도',
    url: 'https://images.unsplash.com/photo-1661808766618-8a94b38072a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY29ycmlkb3IlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzY1NjkwNTg5fDA&ixlib=rb-4.1.0&q=80&w=1920',
    description: '길고 어두운 저택의 복도'
  },
  kitchen: {
    id: 'kitchen',
    name: '부엌',
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjBraXRjaGVufGVufDF8fHx8MTc2NTk3NDU4MHww&ixlib=rb-4.1.0&q=80&w=1920',
    description: '오래된 저택의 부엌'
  },
  inn_lobby: {
    id: 'inn_lobby',
    name: '그린 라이온 여관',
    url: 'https://images.unsplash.com/photo-1763668193202-1553a2f67347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBpbm4lMjB0YXZlcm4lMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzY1NjkwNTg5fDA&ixlib=rb-4.1.0&q=80&w=1920',
    description: '낡은 나무 바닥과 오래된 가구가 있는 여관 로비'
  },
  default: {
    id: 'default',
    name: '기본 배경',
    url: 'https://images.unsplash.com/photo-1717250265213-c2886f17ab0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWN0b3JpYW4lMjBnb3RoaWMlMjBtYW5zaW9uJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2NTY5MDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1920',
    description: '기본 배경'
  }
};