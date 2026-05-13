# 뉴질랜드 한민족 한글학교 웹사이트

## 📁 폴더 구조

```
nzsok/
├── index.html          ← 메인 홈페이지
├── gallery/
│   └── index.html      ← 학교 앨범 페이지
├── admin/
│   ├── index.html      ← CMS 관리자 페이지 (/admin 접속)
│   └── config.yml      ← CMS 설정
├── _albums/            ← CMS가 여기에 앨범 파일 저장 (자동)
├── images/
│   └── albums/         ← 업로드된 사진들 저장 (자동)
├── build-albums.js     ← 빌드 스크립트 (자동 실행)
└── netlify.toml        ← Netlify 설정
```

---

## 🚀 배포 방법 (처음 1회)

### 1단계. GitHub 저장소 만들기
1. [github.com](https://github.com) 접속 → 로그인
2. 오른쪽 상단 **+** → **New repository**
3. Repository name: `nzsok-website`
4. **Create repository** 클릭
5. 모든 파일을 이 저장소에 업로드

### 2단계. Netlify 연동
1. [netlify.com](https://netlify.com) 접속 → GitHub로 로그인
2. **Add new site** → **Import an existing project**
3. **Deploy with GitHub** → `nzsok-website` 선택
4. Build command: `node build-albums.js`
5. Publish directory: `.`
6. **Deploy site** 클릭

### 3단계. Netlify Identity 활성화 (CMS 로그인용)
1. Netlify 대시보드 → **Site settings**
2. **Identity** 탭 → **Enable Identity**
3. **Git Gateway** → **Enable Git Gateway**
4. **Registration** → **Invite only** (보안!)

### 4단계. 관리자 계정 만들기
1. **Identity** 탭 → **Invite users**
2. 선생님 이메일 주소 입력 → **Send**
3. 이메일 확인 → 비밀번호 설정

---

## 📸 앨범 추가 방법 (선생님용)

1. **`사이트주소.netlify.app/admin`** 접속
2. 이메일/비밀번호로 로그인
3. 왼쪽 메뉴 **"📸 학교 앨범"** 클릭
4. **"New 앨범"** 버튼 클릭
5. 입력:
   - 앨범 제목 (예: "2025년 졸업식")
   - 날짜 선택
   - 행사 종류 선택
   - 대표 사진 업로드
   - 사진 목록에 사진 추가
6. **Publish** 클릭
7. 1~2분 후 사이트에 자동 반영! ✅

---

## 🔧 자주 묻는 질문

**Q. 사진을 잘못 올렸어요.**
A. /admin 에서 해당 앨범 클릭 → 수정 → Publish

**Q. 앨범을 숨기고 싶어요.**
A. 해당 앨범 → "사이트에 공개" 토글 끄기 → Publish

**Q. 도메인을 연결하고 싶어요.**
A. Netlify 대시보드 → Domain settings → Add custom domain

---

## 📞 기술 지원
admin@nzsok.school.nz
