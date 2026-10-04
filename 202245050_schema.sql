CREATE DATABASE portfolio_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE portfolio_db;

DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  display_name VARCHAR(50) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  period VARCHAR(50) NOT NULL,
  tech VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  github VARCHAR(255),
  team_text TEXT,
  mypart_text TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_projects_user
    FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE
);

-- 로그인 테스트용 유저 1명
INSERT INTO users (username, pass, display_name)
VALUES ('junho', '1234', '차준호');

-- 아래 프로젝트 3개는 네가 적어둔 내용 그대로 team/myPart를 텍스트로 합쳐서 넣은 것
INSERT INTO projects
(user_id, title, period, tech, summary, github, team_text, mypart_text)
VALUES
(
  1,
  '재고 관리',
  '2024.06',
  'Java, MySQL, Express',
  '재고 관리, 실시간 재고 확인, 로그인 기능 구현',
  'https://github.com/ChaJunHo0516/java_project',
  '차준호: 배송, 배달, UI, 재고 / 오혜광: 로그인, 메뉴, 환경설정',
  '- 상품, 재고, 배송, 배달 등 서비스 도메인을 분석하여 데이터베이스 구조와 ERD를 설계했습니다.\n- 재고 등록/수정, 입출고 처리, 실시간 재고 조회 등 핵심 기능을 구현했습니다.\n- 배송 및 배달 상태와 연동되는 UI를 설계하고 구현했습니다.'
),
(
  1,
  '게시판 & 로그인 시스템',
  '2025.12',
  'Node.js, Express, MySQL, EJS',
  '자유 게시판 / 공지사항, 로그인, 회원 관리, 프로필 수정 기능 구현',
  'https://github.com/ChaJunHo0516/Database-Project',
  '차준호: 백엔드, DB 설계',
  '- 게시판과 로그인 시스템의 전체 데이터 흐름을 설계하고 Node.js/Express 기반 서버를 구축했습니다.\n- 회원가입, 로그인, 세션 관리, 프로필 수정 등 사용자 인증 기능을 구현했습니다.\n- 자유게시판 및 공지사항의 CRUD, 검색, 페이지네이션, 조회수 증가 기능을 개발했습니다. \n- MySQL 데이터베이스 구조와 ERD를 설계하고 서비스에 필요한 SQL 쿼리를 작성했습니다.'
),
(
  1,
  '양세찬 게임',
  '2025.12',
  'Node.js, WebSocket, JavaScript, Express',
  '실시간 금지어 게임, 방 생성/입장, 관전자 모드, 자동 진행 로직 구현',
  'https://github.com/ChaJunHo0516/yang_game',
  '차준호: 봇 로직, 로그인, 기능, 유지 보수 / 오혜광: UI, 기능, 구조',
  '- WebSocket을 활용하여 실시간 게임 상태와 이벤트 흐름을 설계하고 구현했습니다. \n- 게임 진행을 자동으로 제어하는 봇 및 자동 진행 로직을 개발했습니다. \n- 방 생성, 입장, 퇴장, 호스트 위임, 관전자 모드 등 참가자 관리 기능을 구현했습니다. \n- 실시간 금지어 체크와 게임 상태 변경을 WebSocket 이벤트로 처리했습니다. \n- 로그인 및 주요 기능의 유지 보수를 담당하며 서비스의 안정적인 동작을 관리했습니다.'
),
(
  1,
  '스크린타임',
  '2026.06',
  'Node.js, AI, Python, MySQL, Express',
  '사용자 집중도 판별 및 상태 별로 넛지 단계 유도',
  'https://github.com/ChaJunHo0516/screentime',
  '차준호: 봇 로직, 대시보드, 서버, 추적 및 측정 기능, 기능, 유지 보수 / 오혜광: UI, 기능, 서버, 구조, 기획 / 명준영: db, 봇 로직, 서버, 랭킹, 기능, 구조, 유지보수',
  '- 사용자의 집중도 상태에 따라 적절한 넛지를 제공하는 봇 로직을 설계하고 구현했습니다. \n- 현재 사용자가 보고 있는 창 정보를 수집하여 집중 상태를 판단하고, 딴짓 방지를 위한 팝업 기능을 구현했습니다. \n- 관리자 대시보드에서 차단/해제/예외 설정과 사용자 랭킹 조회 기능을 개발했습니다. \n- Node.js/Express 서버 기능과 주요 기능의 유지 보수를 담당하여 서비스가 안정적으로 동작하도록 관리했습니다. \n- Python과 AI를 활용한 사용자 상태 분석 기능과 서버 간 연동을 진행했습니다.'
);
