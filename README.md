# Todo List

Next.js와 TypeScript를 사용하여 구현한 할 일 관리 서비스입니다.
할 일을 추가하고, 진행 중인 항목과 완료된 항목을 구분하여 관리할 수 있습니다.
각 할 일의 상세 페이지에서는 이름, 완료 상태, 메모, 이미지를 수정할 수 있습니다.

## 배포 링크

- 배포 URL: https://codeit-todo-list-ten.vercel.app/

## GitHub Repository

- - Repository URL: https://github.com/chaco9513/codeit-todo-list.git

## 기술 스택

- Next.js
- TypeScript
- CSS Module
- REST API
- Vercel

## 주요 기능

### 할 일 목록 페이지

- 할 일 목록 조회
- 진행 중인 할 일과 완료된 할 일 구분
- 할 일 추가
- Enter 키로 할 일 추가
- 체크 버튼을 통한 완료 상태 변경
- 할 일 항목 클릭 시 상세 페이지 이동

### 할 일 상세 페이지

- 할 일 이름 수정
- 완료 상태 수정
- 메모 작성 및 수정
- 이미지 첨부
- 이미지 파일명 영어 여부 검사
- 이미지 파일 크기 5MB 이하 검사
- 수정 완료 시 목록 페이지로 이동
- 할 일 삭제
- 삭제 완료 시 목록 페이지로 이동

## 반응형 지원

디자인 시안을 기준으로 다음 화면 크기에 대응했습니다.

- Desktop: 1200px
- Tablet: 744px
- Mobile: 375px

## 실행 방법

프로젝트 의존성을 설치합니다.

```bash
npm install
```

개발 서버를 실행합니다.

```bash
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```bash
http://localhost:3000
```

프로덕션 빌드를 확인합니다.

```bash
npm run build
```

## 프로젝트 구조

```txt
app/
  page.tsx
  page.module.css
  items/
    [itemId]/
      page.tsx
      DetailPage.module.css

components/
  Header.tsx
  TodoInput.tsx
  TodoItemCard.tsx
  TodoSection.tsx

lib/
  api.ts

types/
  todo.ts

public/
  img/
```

## API

과제 테스트에서 제공된 Todo List API를 사용했습니다.

```txt
https://assignment-todolist-api.vercel.app/api/{tenantId}
```

구현에 사용한 주요 API는 다음과 같습니다.

- GET `/items` : 할 일 목록 조회
- POST `/items` : 할 일 추가
- GET `/items/{itemId}` : 할 일 상세 조회
- PATCH `/items/{itemId}` : 할 일 수정
- DELETE `/items/{itemId}` : 할 일 삭제
- POST `/images/upload` : 이미지 업로드
