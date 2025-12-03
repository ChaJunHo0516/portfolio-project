// init-db.js
const db = require('./db');

async function init() {
  try {
    const sql = `
      CREATE DATABASE IF NOT EXISTS portfolio_db
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
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO users (username, pass, display_name)
      VALUES ('junho', '1234', '차준호');

      INSERT INTO projects
      (user_id, title, period, tech, summary, github, team_text, mypart_text)
      VALUES
      (
        1,
        '재고 관리',
        '2024.06',
        'Java, Eclipse, MySQL',
        '재고 관리, 실시간 재고 확인, 로그인 기능 구현',
        'https://github.com/ChaJunHo0516/java_project',
        '차준호: 배송, 배달, UI, 재고 / 오혜광: 로그인, 메뉴, 환경설정',
        '- 상품, 재고, 배송, 배달 등 도메인을 고려해 테이블 구조를 설계하고 ERD를 작성했습니다.\n- 재고 등록/수정, 입출고 처리, 실시간 재고 조회 등 핵심 재고 관리 기능을 구현했습니다.\n- 배송/배달 상태와 연동되는 화면(UI)을 설계하고 구현했습니다.'
      ),
      (
        1,
        '게시판 & 로그인 시스템',
        '2025.11',
        'Node.js, Express, MySQL, EJS',
        '자유 게시판 / 공지사항, 로그인, 회원 관리, 프로필 수정 기능 구현',
        'https://github.com/ChaJunHo0516/Database-Project',
        '차준호: 백엔드, DB 설계',
        '- 게시판/로그인 전체 기능 흐름을 설계하고 서버 구조를 구성했습니다.\n- 회원가입, 로그인, 세션 관리, 프로필 수정 등 백엔드 인증 로직을 구현했습니다.\n- 자유/공지 게시판 CRUD, 검색, 페이지네이션, 조회수 증가 등의 핵심 기능을 개발했습니다.\n- MySQL 테이블 구조와 ERD를 설계하고 주요 SQL 쿼리를 작성·최적화했습니다.'
      ),
      (
        1,
        '양세찬 게임',
        '2025.12',
        'Node.js, WebSocket, JavaScript',
        '실시간 금지어 게임, 방 생성/입장, 관전자 모드, 자동 진행 로직 구현',
        'https://github.com/ChaJunHo0516/yang_game',
        '차준호: 봇 로직, 로그인, 기능, 유지 보수 / 오혜광: UI, 기능, 구조',
        '- 게임 진행을 자동으로 제어하는 봇 로직을 설계하고 구현했습니다.\n- 방 생성/입장/퇴장, 호스트 위임, 관전자 모드 등 방/참가자 관리 기능을 개발했습니다.\n- 실시간 금지어 체크와 게임 상태 관리(WebSocket 이벤트 흐름)를 설계했습니다.\n- 로그인 및 기본 기능 유지 보수를 맡아 전체 서비스가 안정적으로 동작하도록 관리했습니다.'
      );
    `;

    const statements = sql.split(';').map(s => s.trim()).filter(Boolean);
    for (const stmt of statements) {
      await db.query(stmt);
    }

    console.log('DB 초기화/샘플 데이터 INSERT 완료');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

init();
